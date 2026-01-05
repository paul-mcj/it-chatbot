"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import bash from "react-syntax-highlighter/dist/esm/languages/hljs/bash";

SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("bash", bash);

const generatePrompts = [
  // --- Infrastructure Insights (Inspect & Status) ---
  "Run a system check to verify NetBox connectivity and version.",
  "How full is our 10.0.0.0/24 subnet right now?",
  "Give me a utilization report for the prefix network.",
  "Is the NetBox API heartbeat healthy?",

  // --- Automated Provisioning (The "Agent" Logic) ---
  "Reserve the next available IP for a 'Production-Web-Server'.",
  "Reserve the next available IP for an 'IoT-Gateway'.",
  "Reserve the next available IP for a 'Remote-Soundbar'.",
  "I need a new address for a 'Management Router' in the demo network.",
  "Provision an IP for a 'Temp-User-Workstation' with a 'reserved' status.",
  "Provision an IP for an office 'Temperature Sensor' with a 'active' status.",
  "Find a free gap in 10.0.0.0/24 and assign it to 'Backup-Vault'.",
  "Find a free gap in 10.0.0.0/24 and assign it to 'Conference Room C Projector'.",

  // --- Search & Discovery ---
  "Who is currently assigned to the IP 10.0.0.2?",
  "Who is currently assigned to the IP 10.0.0.5?",
  "Who is currently assigned to the IP 10.0.0.12?",
  "Search the database for any devices labeled 'Scanner'.",
  "Search the database for any devices labeled 'Server'.",
  "Find all IP records that contain the string 'IoT'.",

  // --- Maintenance & Modification (PATCH) ---
  "Update IP ID 3: Change the status to 'deprecated'.",
  "Modify the description for IP ID 5 to 'Legacy Hardware'.",
  "Mark IP ID 1 as 'offline' in the system.",
  "Mark IP ID 10 as 'offline' in the system.",
  "Change the label of the last provisioned IP to 'Decommissioned'.",

  // --- Audit & Forensics (The Logs) ---
  "Show me the last 5 changes made to the network topology.",
  "Who was the last operator to modify an IP address?",
  "What happened in the audit log over the last few minutes?",
];

export function ChatBot() {
  type Status = "online" | "updating" | "error";

  const [status, setStatus] = useState<Status>("online");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [input, setInput] = useState("");
  const [inputSnapshot, setInputSnapshot] = useState(input);
  const [response, setResponse] = useState("");
  const [conversation, setConversation] = useState<
    { input: string; response: string }[]
  >([]);

  const handleGeneratePrompt = async () => {
    const randomPrompt =
      generatePrompts[Math.floor(Math.random() * generatePrompts.length)];
    setInput("");
    for (let i = 0; i <= randomPrompt.length; i++) {
      setInput(randomPrompt.slice(0, i));
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  };

  const askBot = async (directInput?: string) => {
    const messageToSend = directInput || input;

    // Guard clause: stop if empty or already working
    if (!messageToSend || isLoading) return;

    setInputSnapshot(messageToSend);
    setInput(""); // Clear input immediately for better UX
    setIsFetching(() => true);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = (await res.json()) as { response?: string; error?: string };

      const botResponse = data.response || data.error || JSON.stringify(data);

      setConversation((prev) => [
        ...prev,
        {
          input: messageToSend,
          response: botResponse,
        },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);

      // Provide visual feedback for the error in the chat history
      setConversation((prev) => [
        ...prev,
        {
          input: messageToSend,
          response:
            "⚠️ Error: Couldn't connect to the NetBox AI service. Please check your connection.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch("/api/chat", { method: "HEAD" });
        if (res.ok) setStatus("online");
        else setStatus("updating");
      } catch (e) {
        setStatus("error");
      }
    };
    checkStatus();
  }, []);

  const statusConfig = {
    online: {
      color: "bg-green-500",
      text: "Edge Network: Online",
      glow: "shadow-[0_0_8px_#22c55e]",
    },
    updating: {
      color: "bg-orange-500",
      text: "System: Maintenance",
      glow: "shadow-[0_0_8px_#f97316]",
    },
    error: {
      color: "bg-red-500",
      text: "Edge Network: Offline",
      glow: "shadow-[0_0_8px_#ef4444]",
    },
  };

  const current = statusConfig[status];

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans">
      <header className="flex-none pt-12 pb-12 px-6 border-gray-800/50 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl text-[44px] tracking-tight">
            NetBox ChatOps: Your Network's AI Architect
          </h1>
          <h2 className="mb-5 md:text-md font-bold">
            Bridge the gap between natural language and your infrastructure.
          </h2>
          <p className="md:text-md text-sm max-w-xl mx-auto leading-relaxed">
            This agentic interface allows you to query real-time IPAM data and
            provision new resources directly through chat on a demo NetBox
            Prefix network assigned to 10.0.0.0/24. The agent ensures that the
            NetBox "Source of Truth" is always up to date without touching a
            single API docs page. Built on Cloudflare's{" "}
            <Link
              href="https://www.cloudflare.com/en-ca/network/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              global network
            </Link>{" "}
            for zero-latency IT support.
          </p>

          <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8 ">
            <Link
              href="http://localhost:8000/ipam/prefixes/1/ip-addresses/"
              className="font-bold text-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default">View NetBox</Button>
            </Link>
            <Button
              className="h-9 px-5 bg-gradient-to-br from-red-600 to-blue-600 shadow-lg ring-1 ring-white/10 hover:brightness-110"
              onClick={handleGeneratePrompt}
            >
              ⚡ Generate Request
            </Button>
          </div>
        </div>
      </header>
      {/* --- SCROLLABLE CONVERSATION AREA --- */}
      <main className="flex-1 flex-col-reverse overflow-y-auto py-10 px-72">
        <div className="max-w-4xl mx-auto flex flex-col gap-10 pb-56">
          {isFetching && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
              {/* User Input: Nice rounded card to the top right */}
              <div className="self-end max-w-[80%] px-5 py-3 rounded-2xl rounded-tr-none bg-blue-600 text-white text-[15px] shadow-xl shadow-blue-900/20">
                <span className="opacity-60 text-[10px] uppercase font-black block mb-1 tracking-widest">
                  Operator
                </span>
                {inputSnapshot}
              </div>

              {/* Bot Response: Loading State */}
              <div
                className={`w-full p-6 border rounded-2xl bg-gray-900/40 shadow-inner font-mono text-[14px] text-gray-200 border-l-8 border-l-yellow-500 backdrop-blur-sm animate-pulse`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-yellow-500">
                    NetBox-AI System
                  </span>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed opacity-95">
                  Processing request...
                </div>
              </div>
            </div>
          )}
          {conversation.length === 0 && !isFetching ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500/50 border-2 border-dashed border-gray-800 rounded-3xl">
              <p className="font-medium text-center">
                System Idle. Awaiting Operator Instruction. Please issue network
                command below...
              </p>
            </div>
          ) : (
            conversation.toReversed().map((msg, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-500"
              >
                {/* User Input: Nice rounded card to the top right */}
                <div className="self-end max-w-[80%] px-5 py-3 rounded-2xl rounded-tr-none bg-blue-600 text-white text-[15px] shadow-xl shadow-blue-900/20">
                  <span className="opacity-60 text-[10px] uppercase font-black block mb-1 tracking-widest">
                    Operator
                  </span>
                  {msg.input}
                </div>

                {/* Bot Response: Taking up the entire width allowed */}
                <div
                  className={`w-full p-6 border rounded-2xl bg-gray-900/40 shadow-inner font-mono text-[14px] text-gray-200 border-l-8 border-l-green-500 backdrop-blur-sm ${
                    msg.response.startsWith("⚠️ Error")
                      ? "border-l-red-500 border-red-500"
                      : "border-l-green-500 border-green-500"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        msg.response.startsWith("⚠️ Error")
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    />
                    <span
                      className={`text-[11px] font-bold uppercase tracking-widest ${
                        msg.response.startsWith("⚠️ Error")
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      NetBox-AI System
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap leading-relaxed opacity-95">
                    {msg.response}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* --- FIXED BOTTOM INPUT CONSOLE (WITH X-PADDING AND MAX-WIDTH) --- */}
      <footer className="flex-none fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0b0f1a] via-[#0b0f1a]/70 to-transparent pt-8 pb-10 z-30 px-72">
        {/* <footer className="flex-none fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0b0f1a] via-[#0b0f1a]/70 to-transparent pt-16 pb-10 z-30 px-6"> */}
        <div className="max-w-4xl mx-auto">
          {/* Status Bar */}
          <div className="flex items-center gap-3 mb-4 px-1">
            <div className="flex items-center gap-2 bg-gray-900/90 px-4 py-1.5 rounded-full border border-gray-800 shadow-xl">
              <span
                className={`inline-block w-2 h-2 rounded-full animate-pulse ${current.color} ${current.glow}`}
              ></span>
              <span
                className={`text-[11px] font-bold uppercase tracking-widest ${
                  status === "error" ? "text-red-500" : "text-gray-300"
                }`}
              >
                {current.text}
              </span>
            </div>

            <span className="text-[11px] font-bold uppercase tracking-widest ml-auto hidden sm:block bg-gray-900/90 px-4 py-1.5 rounded-full border border-gray-800 shadow-xl text-gray-300">
              V1.1.2 // SECURE_NODE // REGION: GLOBAL
            </span>
          </div>

          {/* Input Field Container */}
          <div className="relative group shadow-2xl shadow-black/50">
            <input
              className="bg-gray-900/90 backdrop-blur-2xl w-full p-5 pr-36 outline-none border border-gray-700 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder:text-gray-600"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askBot()}
              placeholder={`${
                isLoading ? "Processing request..." : "Issue network command"
              }`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Button
                className={`h-12 px-8 bg-gradient-to-br from-red-600 to-blue-600 font-bold rounded-xl transition-all duration-300 uppercase ${
                  !input
                    ? "opacity-20 grayscale"
                    : "hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                }`}
                disabled={isLoading}
                onClick={() => askBot()}
              >
                Execute
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
