import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from "@react-three/drei";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CustomObject from "./CustomObject";
import { useControls, button } from "leva";
import { Perf } from "r3f-perf";

// extend({ OrbitControls });

export default function Experience() {
  const cubeRef = useRef();
  const groupRef = useRef();
  const sphereRef = useRef();
  // const { camera, gl } = useThree();
  const { perfVisible } = useControls({
    perfVisible: true,
  });
  const { x, y, position, color, visible } = useControls("sphere", {
    x: {
      value: -2,
      min: -4,
      max: 4,
      step: 0.01
    },
    y: {
      value: 0,
    },
    position: {
      value: { x: -2, y: 0 },
      joystick: "invertY",
      step: 0.01,
    },
    color: "#ff0000",
    visible: true,
    myInterval: {
      min: 0,
      max: 10,
      value: [4, 5]
    },
    clickMe: button(() => {
      console.log("ok");
    }),
    choice: {
      options: ["a", "b", "c"]
    },
  });
  const { scale } = useControls("cube", {
    scale: {
      value: 1,
      min: 0.1,
      max: 10,
    },
  });

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
    // groupRef.current.rotation.y += delta;

    // const angle = state.clock.elapsedTime;
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {perfVisible ? <Perf position="top-left" /> : null}

      <OrbitControls makeDefault />
      {/* <orbitControls args={[camera, gl.domElement]} /> */}

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <group ref={groupRef}>
        <PivotControls
          depthTest={false}
          anchor={[0, 0, 0]}
          // fixed={true}
          scale={1}
          lineWidth={4}
          axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
        >
          <mesh
            ref={sphereRef}
            // position-x={x}
            // position-y={y}
            position={[position.x, position.y, 0]}
            visible={visible}
          >
            <sphereGeometry />
            <meshStandardMaterial color={color} />
            <Html
              // pivot point
              center
              position={[1, 1, 0]}
              wrapperClass="label"
              // this is to scale it on camera move
              distanceFactor={8}
              occlude={[sphereRef, cubeRef]}
            >
              So round!
            </Html>
          </mesh>
        </PivotControls>
        <mesh
          ref={cubeRef}
          scale={scale}
          position-x={2}
          rotation-y={Math.PI * 0.25}
        >
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={cubeRef} mode="translate" />
      </group>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        {/* <meshStandardMaterial color="greenyellow" /> */}
        <MeshReflectorMaterial
          resolution={512}
          mixBlur={1}
          blur={[1000, 1000]}
          mirror={0.5}
          color="greenyellow"
        />
      </mesh>
      <CustomObject />
      {/* woff is recommended as it's lighter */}
      <Float speed={5} floatIntensity={2}>
        <Text
          fontSize={1}
          color="salmon"
          position={[0, 3, 0]}
          maxWidth={2}
          textAlign="center"
          font="/fonts/bangers-v20-latin-regular.woff"
        >
          Lorem ipsum
          {/* <meshNormalMaterial /> */}
        </Text>
      </Float>
    </>
  );
}
