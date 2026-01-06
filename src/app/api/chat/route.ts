import { NextRequest } from "next/server";
// @ts-ignore
import { getRequestContext } from "@cloudflare/next-on-pages";
import { SYSTEM_PROMPT, NETBOX_TOOLS } from "./tools";
import { netboxQuery, netboxProvision, netboxUpdate } from "./helpers";

interface NetBoxArgs {
  description?: string;
  prefixId?: number;
  query?: string;
  id?: number;
  status?: string;
  limit?: number;
}

export const runtime = "edge";

export async function HEAD() {
  return new Response(null, { status: 200 });
}

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

export async function POST(req: NextRequest) {
  try {
    const { message } = (await req.json()) as { message: string };
    const context = getRequestContext();
    const ai =
      (context?.env as any)?.AI || ((req as any).context?.env as any)?.AI;
    const token =
      (context?.env as any)?.NETBOX_TOKEN || process.env.NETBOX_TOKEN;

    // 1. Intent Detection
    const response = await ai.run("@cf/meta/llama-3.1-8b-instruct", {
      tools: NETBOX_TOOLS, // Use 'tools' key
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
    });

    // Handle nested Cloudflare response
    const result = response.result || response;
    const toolCalls = result.tool_calls || [];

    if (toolCalls.length > 0) {
      const toolCall = toolCalls[0];
      const args = toolCall.arguments as NetBoxArgs;

      // --- RE-INITIALIZE toolResult HERE ---
      let toolResult = "";

      switch (toolCall.name) {
        case "netbox_system_status":
          toolResult = JSON.stringify(await netboxQuery("/api/status/", token));
          break;
        case "netbox_inspect_prefix":
          toolResult = JSON.stringify(
            await netboxQuery(
              `/api/ipam/prefixes/${args.prefixId || 1}/`,
              token
            )
          );
          break;
        case "netbox_search":
          toolResult = JSON.stringify(
            await netboxQuery(
              `/api/ipam/ip-addresses/?q=${args.query || ""}`,
              token
            )
          );
          break;
        case "netbox_reserve_next_ip":
          toolResult = JSON.stringify(
            await netboxProvision(
              token,
              undefined,
              args.description,
              args.prefixId
            )
          );
          break;
        case "netbox_update_ip":
          if (args.id === undefined) {
            toolResult = JSON.stringify({
              error: "Missing required ID for update.",
            });
          } else {
            toolResult = JSON.stringify(
              await netboxUpdate(token, args.id, {
                description: args.description,
                status: args.status,
              })
            );
          }
          break;
        case "netbox_get_history":
          toolResult = JSON.stringify(
            await netboxQuery(
              `/api/extras/object-changes/?limit=${args.limit || 5}`,
              token
            )
          );
          break;
        default:
          toolResult = JSON.stringify({
            error: `Unknown tool: ${toolCall.name}`,
          });
          break;
      }

      // 2. Final Synthesis (The Summary)
      // Note: We don't pass 'tools' here because we want a text response, not a new tool call.
      const finalResponse = await ai.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          {
            role: "system",
            content: `You are the NetBox Architect.
//       CRITICAL: The tool execution is COMPLETE. Your job is simply to summarize what has been done. The data provided in the 'tool' role is the final result from the database.
//       DO NOT suggest new commands. DO NOT use technical flags like '--ip' or '--q'.
//       Your task:
//       1. Review the finalResponse.result provided below.
//       2. Explain that outcome to the user in natural, professional language.
//       3. If the data shows a success, confirm the specific IP, status change, etc, whatever details are necessary and natural.
//       4. If the data processed results in an error, explain the technical reason why -- do NOT give instructions/steps/commands/ etc. to the user, only explain what the error is.
//       Always speak as if you just finished performing the task yourself. NEVER tell the user to run another command EVER!`,
          },
          { role: "user", content: message },
          { role: "assistant", content: "", tool_calls: [toolCall] },
          {
            role: "tool",
            name: toolCall.name,
            tool_call_id: toolCall.id,
            content: toolResult,
          },
        ],
      });

      const finalResult = finalResponse.result || finalResponse;
      return Response.json({
        response: finalResult.response || "Action complete.",
      });
    }

    // Fallback if no tool was called
    return Response.json({
      response: result.response || "I'm not sure how to help with that.",
    });
  } catch (e: any) {
    console.error("Route Error:", e.message);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
