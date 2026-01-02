"use client";
import { useState } from "react";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const askBot = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });
    const data = (await res.json()) as { response?: string };
    // Cloudflare Workers AI returns an object; adjust based on your route's return
    setResponse(data.response || JSON.stringify(data));
  };

  return (
    <div className="p-4 border rounded-lg bg-black text-green-400 font-mono">
      <div className="mb-4 h-64 overflow-y-auto whitespace-pre-wrap border-b border-gray-700">
        {response || "System Ready. Awaiting IT Infrastructure Query..."}
      </div>
      <input
        className="bg-gray-900 w-full p-2 outline-none border border-gray-700"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && askBot()}
        placeholder="Ask about VLANs, CI/CD, or Firewalls..."
      />
    </div>
  );
}
