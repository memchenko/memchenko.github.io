import { useRef, Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { Model } from "./Model";
import { Placeholder } from "./Placeholder";
import { Hamburger } from "./Hamburger";
import { Fox } from "./Fox";

export default function Experience() {
  //   const model = useLoader(GLTFLoader, "/3d/hamburger.glb", (loader) => {
  //     console.log(loader);
  //     const dracoLoader = new DRACOLoader();
  //     dracoLoader.setDecoderPath("/3d/draco/");
  //     loader.setDRACOLoader(dracoLoader);
  //   });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight
        shadow-normalBias={0.04}
        position={[1, 2, 3]}
        intensity={4.5}
      />
      <ambientLight intensity={1.5} />

      <mesh castShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      {/* <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        <Model />
      </Suspense>
       */}

      <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        <Hamburger scale={0.35} />
      </Suspense>

      <Fox />

      {/* <primitive object={model.scene} scale={0.35} /> */}
    </>
  );
}
