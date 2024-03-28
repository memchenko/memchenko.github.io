import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import * as THREE from "three";

const torusGeometry = new THREE.TorusGeometry();
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  const [matcapTexture] = useMatcapTexture("787165_DAD9CD_9DC0CE_36302A", 256);
  //   const [torusGeometry, setTorusGeometry] = useState();
  //   const [material, setMaterial] = useState();
  const donutsGroup = useRef();

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    for (const donut of donutsGroup.current.children) {
      donut.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <torusGeometry ref={setTorusGeometry} /> */}
      {/* <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}

      <Center>
        <Text3D
          bevelEnabled
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          material={material}
        >
          WHATEVER
        </Text3D>
      </Center>

      <group ref={donutsGroup}>
        {[...Array(100)].map((_, index) => (
          <mesh
            key={index}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            geometry={torusGeometry}
            material={material}
          />
        ))}
      </group>
    </>
  );
}
