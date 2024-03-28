import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  Stage,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";

export default function Experience() {
  const cube = useRef();
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const { color, opacity, blur } = useControls("contact shadows", {
    color: "#484434",
    opacity: { value: 0.5, min: 0, max: 1 },
    blur: { value: 1, min: 2.3, max: 10 },
  });

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("env map", {
      envMapIntensity: { value: 2.6, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 20, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    });

  return (
    <>
      {/* <BakeShadows /> */}
      {/* <SoftShadows size={25} samples={10} focus={0} /> */}

      {/* <color args={["#f41"]} attach="background" /> */}

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <AccumulativeShadows
        temporal
        position={[0, -0.99, 0]}
        scale={10}
        frames={Infinity}
        blend={100}
      >
        <RandomizedLight
          position={[1, 2, 3]}
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={3}
          bias={0.001}
          // shadows in real life tend to have colder color
          // than surface
          colors="#316d39"
          opacity={0.8}
        />
      </AccumulativeShadows> */}

      {/* <ContactShadows
        far={5}
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        color={color}
        opacity={opacity}
        blur={blur}
       // rendered only once
       // frames={1}
      /> */}

      {/* <directionalLight
        ref={directionalLight}
        castShadow
        position={sunPosition}
        intensity={4.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={1.5} /> */}

      {/* <Sky sunPosition={sunPosition} /> */}
      {/* 
      <Environment
        background
        files={[
          "/textures/environmentMaps/2/px.jpg",
          "/textures/environmentMaps/2/nx.jpg",
          "/textures/environmentMaps/2/py.jpg",
          "/textures/environmentMaps/2/ny.jpg",
          "/textures/environmentMaps/2/pz.jpg",
          "/textures/environmentMaps/2/nz.jpg",
        ]}
        files={"/textures/environmentMaps/the_sky_is_on_fire_2k.hdr"}
        preset="sunset"
        resolution={32}
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      >
        <color args={["black"]} attach="background" />
        <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[20, 0, 0]} />
        </mesh>
        <Lightformer
          position-z={-5}
          scale={10}
          color="red"
          intensity={10}
          form="ring"
        />
      </Environment> */}

      {/* <mesh castShadow position-x={-2} position-y={1}>
        <sphereGeometry />
        <meshStandardMaterial
          color="lightblue"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}
      {/* <mesh
        ref={cube}
        castShadow
        position-x={2}
        rotation-y={Math.PI * 0.25}
        position-y={1}
      >
        <boxGeometry scale={1.5} />
        <meshStandardMaterial
          color="mediumpurple"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}
      {/* <mesh receiveShadow position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}

      <Stage
        shadows={{
          type: "contact",
          opacity: 0.2,
          blur: 3,
        }}
        environment="sunset"
        preset="portrait"
        intensity={6}
      >
        <mesh castShadow position-x={-2} position-y={1}>
          <sphereGeometry />
          <meshStandardMaterial
            color="lightblue"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
        <mesh
          ref={cube}
          castShadow
          position-x={2}
          rotation-y={Math.PI * 0.25}
          position-y={1}
        >
          <boxGeometry scale={1.5} />
          <meshStandardMaterial
            color="mediumpurple"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
      </Stage>
    </>
  );
}
