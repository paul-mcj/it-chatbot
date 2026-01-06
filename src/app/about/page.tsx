import Link from "next/link";
import { Footer } from "@/components/shared/Footer";

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="mb-5text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl text-[44px] tracking-tight">
          About This Project
        </h1>
      </div>
      <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
        <h2 className="md:text-md font-bold">
          The Intelligent Networking Layer
        </h2>
        <p className="md:text-md text-sm max-w-xl mx-auto leading-relaxed">
          This project bridges the gap between natural language and structured
          network infrastructure management. By leveraging Llama 3.1 via
          Cloudflare Workers AI, the application acts as an autonomous "ChatOps"
          agent for NetBox. Instead of manually navigating complex web forms or
          writing curl commands, users can simply state their intent—such as
          "provision the next available IP for a web server"—and the agent
          handles the underlying logic, validation, and API execution in
          real-time.
        </p>
        <h2 className="md:text-md font-bold mt-5">
          The Agentic Workflow: Reasoning & Execution
        </h2>
        <p className="md:text-md text-sm max-w-xl mx-auto leading-relaxed">
          The core of the system is a multi-stage reasoning loop. When a user
          submits a prompt, the system first performs Intent Detection, where
          the LLM determines which specific NetBox tool (querying, provisioning,
          or updating) is required. Once the tool is selected, the middleware
          executes the request against the{" "}
          <Link
            href="https://demo.netbox.dev/api/schema/swagger-ui/"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NetBox REST API
          </Link>{" "}
          using a secure token-based architecture. This ensures that the AI
          never has direct access to the database; it must work through the same
          business logic and permissions as a human administrator.
        </p>
        <h2 className="md:text-md font-bold mt-5">
          Data Synthesis and Feedback
        </h2>
        <p className="md:text-md text-sm max-w-xl mx-auto leading-relaxed">
          Once the network action is complete, the raw JSON response from NetBox
          is fed back into the model for Synthesis. This is a critical step that
          transforms technical data into human-readable confirmation. The
          "Architect" reviews the operation's success or failure and explains
          the outcome—confirming specific IP assignments or explaining prefix
          exhaustion errors. This creates a closed-loop system where the network
          state is not just modified, but clearly communicated back to the user.
        </p>
        <h2 className="md:text-md font-bold mt-5">Technical Highlights</h2>
        <ul className="md:text-md text-sm max-w-xl mx-auto leading-relaxed list-disc list-inside flex flex-col">
          <li>
            Edge Native: Built on the Next.js App Router and deployed to
            Cloudflare Pages, ensuring minimal latency.
          </li>
          <li>
            Function Calling: Implemented sophisticated tool-calling logic to
            map conversational context to specific API endpoints.
          </li>
          <li>
            Stateful UI: A custom React frontend that manages "In-flight"
            snapshots of user prompts to provide a seamless, non-blocking
            interface during complex network operations.
          </li>
        </ul>
        <Footer />
      </div>
    </main>
  );
}
