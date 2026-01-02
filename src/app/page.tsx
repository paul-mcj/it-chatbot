import { SampleHero } from "@/components/relume/SampleHero";
import ChatBot from "@/components/ChatBot";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20">
      <SampleHero />
      <ChatBot />
    </div>
  );
}
