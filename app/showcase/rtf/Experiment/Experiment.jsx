import {
  MeshReflectorMaterial,
  Environment,
  OrbitControls,
  Center,
  ContactShadows,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, Fragment } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Experiment() {
  const intensity = 3;
  const lights = useRef();
  const sphere = useRef();

  useFrame((state, delta) => {
    // lights.current.position.z -= delta;
    sphere.current.position.y = -2 + Math.sin(Date.now() / 2000) * 7;
  });

  return (
    <>
      <color args={["#07000f"]} attach="background" />

      <OrbitControls />

      <EffectComposer>
        <Bloom luminanceThreshold={1.1} mipmapBlur />
      </EffectComposer>

      <ambientLight intensity={1.1} color={"#ffffff"} />
      <directionalLight
        intensity={2}
        color={"#ffffff"}
        position={[-3, -1, -3]}
        lookAt={new THREE.Vector3(0, 3, 0)}
      />
      <directionalLight
        intensity={2}
        color={"#ffffff"}
        position={[3, -1, -3]}
        lookAt={new THREE.Vector3(0, 3, 0)}
      />

      <group ref={lights}>
        {Array.from({ length: 3 }, (_, i) => (
          <Fragment key={i}>
            <mesh scale={[1.5, 2, 1.5]} position={[-5, -2.8 + (i + 1) * 4, -5]}>
              <boxGeometry />
              <meshBasicMaterial
                color={[1 * intensity, 1 * intensity, 1 * intensity]}
                toneMapped={false}
              />
            </mesh>
            <mesh scale={[1.5, 2, 1.5]} position={[5, -2.8 + (i + 1) * 4, -5]}>
              <boxGeometry />
              <meshBasicMaterial
                color={[1 * intensity, 1 * intensity, 1 * intensity]}
                toneMapped={false}
              />
            </mesh>
          </Fragment>
        ))}
      </group>

      <mesh scale={5} castShadow ref={sphere}>
        <sphereGeometry args={[1, 100, 100]} />
        {/* <meshStandardMaterial color="red" /> */}
        <MeshReflectorMaterial
          resolution={1024}
          mirror={1}
          color={[1, 1, 1]}
          transparent
          opacity={0.999}
        />
      </mesh>

      <mesh
        receiveShadow
        scale={200}
        position-z={-10}
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
      >
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={1024}
          mixBlur={1}
          blur={[1000, 1000]}
          mirror={1}
          color={[1, 1, 1]}
        />
      </mesh>
    </>
  );
}
