import { Scene1Hook } from "@/components/scenes/Scene1Hook";
import { Scene2Scale } from "@/components/scenes/Scene2Scale";
import { Scene3Rhythm } from "@/components/scenes/Scene3Rhythm";
import { Scene4Geography } from "@/components/scenes/Scene4Geography";
import { Scene5Mattress } from "@/components/scenes/Scene5Mattress";
import { Scene6Reuse } from "@/components/scenes/Scene6Reuse";
import { Scene7Proposal } from "@/components/scenes/Scene7Proposal";
import { Scene8TakeAction } from "@/components/scenes/Scene8TakeAction";
import { AppDemoFinale } from "@/components/scenes/AppDemoFinale";
import { SceneRail } from "@/components/ui/SceneRail";

export default async function Home() {
  return (
    <main className="story-shell overflow-x-clip">
      <SceneRail />
      <Scene1Hook />
      {await Scene2Scale()}
      {await Scene3Rhythm()}
      {await Scene4Geography()}
      {await Scene5Mattress()}
      <Scene6Reuse />
      <Scene7Proposal />
      <Scene8TakeAction />
      <AppDemoFinale />
    </main>
  );
}
