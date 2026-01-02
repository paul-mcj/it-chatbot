"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import bash from "react-syntax-highlighter/dist/esm/languages/hljs/bash";
import atomOneDark from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark";

SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("bash", bash);

const itQuestions = [
  "How do I configure a trunk port on a Cisco Catalyst switch?",
  "What are the best practices for setting up a redundant pfSense firewall?",
  "Explain the difference between Layer 2 and Layer 3 switches.",
  "How do I calculate a subnet mask for 500 hosts?",
  "Provide a guide for troubleshooting a 'Flapping' fiber optic link.",
  "How do I set up a WireGuard VPN peer on a Linux server?",
  "Explain the 3-way handshake in TCP/IP for a junior tech.",
  "What is the impact of MTU size on network latency?",
  "Generate a Docker Compose file for a Ghost blog with a MySQL database.",
  "How do I set up a Cloudflare Tunnel to expose a local web server?",
  "Write a GitHub Action script to deploy a Next.js app to Pages.",
  "Explain the benefits of Infrastructure as Code (IaC) using Terraform.",
  "How do I configure a load balancer to use the Least Connections algorithm?",
  "What is a 'Blue-Green' deployment strategy, and how do I implement it?",
  "Provide a Kubernetes manifest for a simple Nginx deployment.",
  "What are the first 5 steps to take after detecting a DDoS attack?",
  "Provide a bash script to audit open ports on a Linux server using Nmap.",
  "How do I implement Fail2Ban to protect against SSH brute-force attacks?",
  "Explain the principle of 'Least Privilege' in Active Directory.",
  "How do I generate and install a Let's Encrypt SSL certificate manually?",
  "Write a policy for strong password rotation in an enterprise environment.",
  "What is the difference between Symmetric and Asymmetric encryption?",
  "Write a PowerShell script to list all users who haven't logged in for 30 days.",
  "How do I troubleshoot a 'DNS_PROBE_FINISHED_NXDOMAIN' error?",
  "Explain the RAID 5 vs RAID 10 trade-offs for a database server.",
  "How do I recover a corrupted GRUB bootloader on Ubuntu?",
  "What are the signs of a failing NVMe SSD in a production server?",
  "Provide a template for a Weekly IT Infrastructure Status Report.",
  "How do I optimize a SQL database that is hitting 100% CPU usage?",
  "Write an email template for notifying users of a scheduled server maintenance window.",
];

export function ChatBot() {
  type Status = "online" | "updating" | "error";

  const [status, setStatus] = useState<Status>("online");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleGenerateInquiry = async () => {
    const randomPrompt =
      itQuestions[Math.floor(Math.random() * itQuestions.length)];
    setInput("");
    for (let i = 0; i <= randomPrompt.length; i++) {
      setInput(randomPrompt.slice(0, i));
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  };

  const askBot = async (directInput?: string) => {
    const messageToSend = directInput || input;
    if (!messageToSend) return;

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: messageToSend }),
    });
    const data = (await res.json()) as { response?: string };
    setResponse(data.response || JSON.stringify(data));
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

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedText(code);
    setTimeout(() => setCopiedText(null), 2000);
  };

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
    <>
      <section className="px-[5%] py-16 md:py-24 lg:py-28 ">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-lg">
              <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl text-[44px]">
                Master Your Infrastructure with an AI Networking Lead.
              </h1>
              <p className="md:text-md">
                Instant VLAN configurations, Cisco/Juniper CLI generation, and
                real-time troubleshooting at the Edge. Built on Cloudflare's
                global network for zero-latency IT support.
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8 ">
                <Link
                  href="https://github.com/paul-mcj/it-chatbot"
                  className="font-bold text-xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">GitHub Repo</Button>
                </Link>
                <Button
                  className="bg-gradient-to-br from-red-600 to-blue-600 shadow-lg ring-1 ring-white/20 ring-inset transition-all duration-300 ease-out hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:brightness-110"
                  onClick={handleGenerateInquiry}
                >
                  ⚡ Auto-Generate Inquiry
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-16 p-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`inline-block w-2 h-2 rounded-full animate-pulse ${current.color} ${current.glow}`}
              ></span>
              <span
                className={`text-sm font-medium ${
                  status === "error" && "text-red-500"
                }`}
              >
                {current.text}
              </span>
            </div>

            <div className="p-4 border border-gray-700 rounded-lg bg-gray-900 font-mono">
              <div
                className={`mb-4 h-96 overflow-y-auto border-b border-gray-800 pb-2 ${
                  status === "error" ? "text-red-500" : "text-gray-100"
                }`}
              >
                {status === "error" ? (
                  "CRITICAL ERROR: Unable to reach Cloudflare Edge."
                ) : response ? (
                  <ReactMarkdown
                    components={{
                      code({
                        node,
                        inline,
                        className,
                        children,
                        ...props
                      }: any) {
                        const match = /language-(\w+)/.exec(className || "");
                        const codeContent = String(children).replace(/\n$/, "");
                        return !inline && match ? (
                          <div className="relative group my-4">
                            <button
                              onClick={() => handleCopy(codeContent)}
                              className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-700 text-[10px] uppercase tracking-widest text-white px-2 py-1 rounded border border-gray-600"
                            >
                              {copiedText === codeContent ? "Copied!" : "Copy"}
                            </button>
                            <SyntaxHighlighter
                              {...props}
                              style={atomOneDark}
                              language={match[1]}
                              PreTag="div"
                              className="rounded-md !bg-black/50 border border-gray-800"
                            >
                              {codeContent}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code
                            className="bg-black/40 px-1 rounded text-blue-400"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {response}
                  </ReactMarkdown>
                ) : (
                  <span className="text-green-500">
                    System Ready. Awaiting IT Inquiry...
                  </span>
                )}
              </div>
              <div className="text-xs uppercase tracking-widest text-gray-500">
                Console v1.0.4 - Region: Global
              </div>
            </div>

            <div className="relative w-full">
              <input
                className="bg-gray-900 w-full p-4 pr-32 outline-none border border-gray-700 rounded-lg focus:border-blue-500 transition-colors text-white"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && askBot()}
                placeholder="Provide your IT infrastructure question..."
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                <Button
                  className="bg-gradient-to-br from-red-600 to-blue-600 shadow-lg font-semibold ring-1 ring-white/20 ring-inset transition-all duration-300 ease-out hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:brightness-110"
                  onClick={() => askBot()}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
