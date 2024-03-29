import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  EffectComposer,
  Vignette,
  Glitch,
  Noise,
  Bloom,
  ToneMapping,
  DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import { useControls } from "leva";
import { Drunk } from "./Drunk";

// Postprocessing https://pmndrs.github.io/postprocessing/public/docs/
// R3F postprocessing https://docs.pmnd.rs/react-postprocessing/introduction

export function PostProcessing() {
  const { frequency, amplitude } = useControls("drunk props", {
    frequency: { value: 2, min: 1, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  });
  return (
    <>
      <color args={["#ffffff"]} attach="background" />

      <EffectComposer
        disableNormalPass
        // multisampling={8}
      >
        {/* <Vignette
          offset={0.3}
          darkness={0.9}
          blendFunction={BlendFunction.NORMAL}
        /> */}
        {/* <Glitch
          mode={GlitchMode.DISABLED}
          delay={[0.5, 1]}
          duration={[0.1, 0.3]}
          strength={[0.2, 0.4]}
        /> */}
        {/* <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} /> */}
        {/* <Bloom luminanceThreshold={1.1} mipmapBlur intensity={0.5} /> */}
        {/* <DepthOfField
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={6}
        /> */}
        <Drunk
          frequency={frequency}
          amplitude={amplitude}
          blendFunction={BlendFunction.COLOR_BURN}
        />
      </EffectComposer>

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
        {/* blooming materials */}
        {/* <meshBasicMaterial color={[1.5, 1, 4]} toneMapped={false} /> */}
        {/* <meshStandardMaterial
          emissive="white"
          color="orange"
          toneMapped={false}
          emissiveIntensity={1}
        /> */}
      </mesh>

      <mesh
        receiveShadow
        rotation-x={-Math.PI * 0.5}
        scale={10}
        position-y={-1}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
