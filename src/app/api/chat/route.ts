import { NextRequest } from "next/server";
// @ts-ignore
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function HEAD() {
  return new Response(null, { status: 200 });
}

// --- REVISED TOOL HELPERS WITH ERROR CATCHING ---
async function getAvailableIps(prefixId: number, token: string) {
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/ipam/prefixes/${prefixId}/available-ips/`,
      {
        headers: {
          Authorization: `Token ${token}`,
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) return "Error: NetBox returned an error code.";
    const data = (await res.json()) as unknown[];
    return JSON.stringify(data.slice(0, 10));
  } catch (e) {
    return "Error: Could not reach NetBox.";
  }
}

async function getChangelog(token: string) {
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/extras/object-changes/?limit=5`,
      {
        headers: {
          Authorization: `Token ${token}`,
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) return "Error: NetBox returned an error code.";
    const data = (await res.json()) as any;
    return JSON.stringify(
      data.results.map((r: any) => ({
        time: r.time,
        user: r.user_name,
        action: r.action,
        object: r.changed_object_type,
      }))
    );
  } catch (e) {
    return "Error: Could not reach NetBox.";
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message } = (await req.json()) as { message: string };
    const context = getRequestContext();
    const ai =
      (context?.env as any)?.AI || ((req as any).context?.env as any)?.AI;
    const token =
      (context?.env as any)?.NETBOX_TOKEN || process.env.NETBOX_TOKEN;

    const tools = [
      {
        name: "getAvailableIps",
        description:
          "Fetch available IP addresses from NetBox. Use ID 1 for demo.",
        parameters: {
          type: "object",
          properties: { prefixId: { type: "number" } },
          required: ["prefixId"],
        },
      },
      {
        name: "getChangelog",
        description: "Fetch the most recent configuration changes from NetBox.",
        parameters: { type: "object", properties: {} },
      },
    ];

    // 1. Initial Call
    const response = await ai.run("@cf/meta/llama-3.1-8b-instruct", {
      tools,
      messages: [
        {
          role: "system",
          content: "You are an IT Assistant. Use tools to get data.",
        },
        { role: "user", content: message },
      ],
    });

    // 2. Handle Tool Call
    if (response.tool_calls && response.tool_calls.length > 0) {
      const toolCall = response.tool_calls[0];
      let toolResult = "";

      if (toolCall.name === "getAvailableIps") {
        toolResult = await getAvailableIps(
          toolCall.arguments.prefixId || 1,
          token
        );
      } else if (toolCall.name === "getChangelog") {
        toolResult = await getChangelog(token);
      }

      // 3. Final Synthesis - FIXING THE 5006 ERROR
      // We must pass the role, content, AND tool_call_id
      const finalResponse = await ai.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          {
            role: "system",
            content: "Summarize this NetBox data for the user.",
          },
          { role: "user", content: message },
          {
            role: "assistant",
            content: "", // Content must exist even if empty
            tool_calls: [toolCall],
          },
          {
            role: "tool",
            name: toolCall.name,
            tool_call_id: toolCall.id, // ID is often required in newer models
            content: toolResult,
          },
        ],
      });

      return new Response(JSON.stringify(finalResponse));
    }

    return new Response(JSON.stringify(response));
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
