import { NextRequest } from "next/server";

export const runtime = "edge";

export async function HEAD() {
  return new Response(null, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { message } = (await req.json()) as { message: string };
    const ai = (process.env as any).AI;

    if (!ai) {
      return new Response(JSON.stringify({ error: "AI binding not found" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await ai.run("@cf/meta/llama-3.1-8b-instruct", {
      messages: [
        {
          role: "system",
          content: `
You are an expert IT Infrastructure and Network Engineer. 
Your goal is to provide production-ready, technically accurate configurations and troubleshooting steps.

### OUTPUT GUIDELINES:
1. FORMATTING: Use Markdown code blocks for all CLI commands, JSON, or scripts. 
2. COPY-PASTE READY: Ensure code blocks contain only valid syntax. Do not include line numbers or conversational text inside the code block.
3. STRUCTURE: 
   - Start with a 1-sentence summary of the solution.
   - Provide the primary Configuration/Code block.
   - Follow with a "Verification" section (how to check it works).
   - End with a brief "Best Practices" or "Security Note."
4. DEFAULTS: If the user doesn't specify a brand, assume Cisco IOS for networking or Linux (Bash) for server tasks.

### CONSTRAINTS:
- Do not explain basic concepts unless asked.
- If a task is dangerous (e.g., reloading a switch), include a '⚠️ WARNING' prefix.
- Use professional, concise technical language.
`,
        },
        { role: "user", content: message },
      ],
    });

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("Worker Error:", e.message);

    return new Response(
      JSON.stringify({ error: e.message || "An unknown error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
