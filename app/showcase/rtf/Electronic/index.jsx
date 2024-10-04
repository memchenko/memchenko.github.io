import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useRef } from "react";

import electricFragmentShader from "./shaders/electric/fragment.glsl";
import electricVertexShader from "./shaders/electric/vertex.glsl";

export function Electronic() {
  const material = useRef();

  useFrame((state, delta) => {
    material.current.uniforms.time.value = state.clock.getElapsedTime();
  });

  return (
    <>
      <color args={["#1e1e1e"]} attach="background" />

      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1.1} intensity={1.2} />
      </EffectComposer>

      <OrbitControls makeDefault />

      <ambientLight intensity={1.5} color="white" />

      <mesh scale={5}>
        <sphereGeometry args={[1, 50, 50]} />
        <shaderMaterial
          ref={material}
          // wireframe
          transparent
          toneMapped={false}
          vertexShader={electricVertexShader}
          fragmentShader={electricFragmentShader}
          uniforms={{
            time: {
              value: 0,
            },
          }}
        />
      </mesh>
    </>
  );
}
