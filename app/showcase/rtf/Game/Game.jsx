import { Perf } from "r3f-perf";
import {} from "react";
import {} from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

import { Lights } from "./Lights";
import { Level } from "./Level";
import { Player } from "./Player";
import { useGame } from "./stores/useGame";

export function Game() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      <Perf position="top-left" />

      <color args={["#bdedfc"]} attach="background" />

      <OrbitControls />

      <Physics debug={false}>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
    </>
  );
}
