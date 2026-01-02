export const runtime = "edge";

import { ChatBot } from "@/components/relume/ChatBot";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20">
      <ChatBot />
    </div>
  );
}
