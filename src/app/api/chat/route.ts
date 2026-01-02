// TODO: 1.
// import { NextRequest } from 'next/server';

// export const runtime = 'edge'; // Crucial for Cloudflare Workers AI

// export async function POST(req: NextRequest) {
//   const { prompt } = await req.json();

//   // @ts-ignore - The AI binding is provided by Cloudflare env
//   const ai = process.env.AI;

//   const response = await ai.run('@cf/meta/llama-3.1-8b-instruct', {
//     messages: [
//       {
//         role: 'system',
//         content: `You are an expert IT Infrastructure and Networking Assistant.
//                   When asked for configs, always provide valid JSON.
//                   Focus on best practices for CI/CD, security, and low-latency networking.`
//       },
//       { role: 'user', content: prompt }
//     ],
//   });

//   return new Response(JSON.stringify(response), {
//     headers: { 'Content-Type': 'application/json' },
//   });
// }

// TODO: 2.
// import { NextRequest } from 'next/server';

// export const runtime = 'edge';

// export async function POST(req: NextRequest) {
//   try {
//     const { message } = await req.json();

//     // Access the binding from the Cloudflare environment
//     // @ts-ignore
//     const ai = process.env.AI;

//     if (!ai) {
//       return new Response("AI Binding not found", { status: 500 });
//     }

//     const response = await ai.run('@cf/meta/llama-3.1-8b-instruct', {
//       messages: [
//         {
//           role: 'system',
//           content: `You are a Senior Infrastructure Engineer.
//           When users ask about networking or IT:
//           1. Provide clear, professional explanations.
//           2. Always include a code block with a sample configuration (YAML, JSON, or Cisco CLI) if applicable.
//           3. Keep security best practices (like Zero Trust) in mind.`
//         },
//         { role: 'user', content: message }
//       ],
//     });

//     return new Response(JSON.stringify(response), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (e: any) {
//     return new Response(e.message, { status: 500 });
//   }
// }

// TODO: 3.
import { NextRequest } from "next/server";

export const runtime = "edge";

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
          content:
            "You are an expert IT Infrastructure Assistant. Provide JSON configs when asked.",
        },
        { role: "user", content: message },
      ],
    });

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    // By using 'any' in the catch or casting here,
    // we stop the "Property message does not exist on type unknown" error.
    console.error("Worker Error:", e.message);

    return new Response(
      JSON.stringify({ error: e.message || "An unknown error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
