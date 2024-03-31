import { OrbitControls, useGLTF } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  Physics as RapierPhysics,
  RigidBody,
  CuboidCollider,
  BallCollider,
  CylinderCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Physics() {
  const cube = useRef();
  const twister = useRef();
  const [hitSound] = useState(() => {
    return new Audio("/sounds/hit.mp3");
  });
  const hamburger = useGLTF("/3d/hamburger-draco.glb");
  //   const cubes = useRef();
  const cubesCount = 100;
  const instances = useMemo(() => {
    const result = [];

    for (let i = 0; i < cubesCount; i++) {
      result.push({
        key: `instance_${i}`,
        position: [(Math.random() - 0.5) * 8, 6 + i * 0.2, 0],
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }

    return result;
  }, []);

  //   useEffect(() => {
  //     for (let i = 0; i < cubesCount; i++) {
  //       const matrix = new THREE.Matrix4();
  //       matrix.compose(
  //         // translation
  //         new THREE.Vector3(i * 2, 0, 0),
  //         // just without rotation
  //         new THREE.Quaternion(),
  //         // default scale
  //         new THREE.Vector3(1, 1, 1)
  //       );
  //       cubes.current.setMatrixAt(i, matrix);
  //     }
  //   }, []);

  const handleCubeClick = () => {
    const mass = cube.current.mass();

    cube.current.wakeUp();
    // this adjustment by mass leads to the same effect when
    // applying the force with any mass defined for the object
    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 });
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };

  useFrame((state, delta) => {
    if (!twister.current) {
      return;
    }

    const time = state.clock.getElapsedTime();
    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();

    quaternionRotation.setFromEuler(eulerRotation);
    twister.current.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    twister.current.setNextKinematicTranslation({
      x,
      z,
      y: -0.8,
    });
  });

  const handleCollisionEnter = () => {
    // hitSound.currentTime = 0;
    // hitSound.volume = Math.random();
    // hitSound.play();
  };

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={1.5} />

      <RapierPhysics debug={false} gravity={[0, -9.08, 0]}>
        <RigidBody colliders="ball">
          <mesh castShadow position={[-2, 4, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={cube}
          position={[2, 2, 0]}
          // change how gravity applied to the object
          // meaning gravity will be applied with a factor
          gravityScale={1}
          // specify bounciness
          restitution={0}
          friction={0.7}
          colliders={false}
          onClick={handleCubeClick}
          onCollisionEnter={handleCollisionEnter}
          // onCollisionExit={() => {}}
          // onSleep={() => {}}
          // onWake={() => {}}
        >
          <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
          <mesh castShadow>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        {/*<RigidBody
          // more performant than trimesh
          // but less accurate - it doesn't
          // take wholes into account
          // colliders="hull"
          // trimesh might be unstable
          // because computation of it is complex
          // colliders="trimesh"
        //   colliders={false}
        //   position={[0, 1, 0]}
        //   rotation={[Math.PI * 0.5, 0, 0]}
        // >
          {/* <CuboidCollider args={[1.5, 1.5, 0.5]} />
          <CuboidCollider
            args={[0.25, 1, 0.25]}
            position={[0, 0, 1]}
            rotation={[-Math.PI * 0.35, 0, 0]}
          /> */}
        {/* <BallCollider args={[1.5]} />
          <mesh castShadow>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}

        <RigidBody type="fixed" restitution={1} friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={twister}
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false} position={[0, 4, 0]}>
          <CylinderCollider args={[0.52, 1.25]} position={[0, 0.7, 0]} />
          <primitive object={hamburger.scene} scale={0.25} />
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.25]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.25]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>

        <InstancedRigidBodies instances={instances}>
          {/* these nulls have to be provided */}
          <instancedMesh
            // ref={cubes}
            castShadow
            args={[null, null, cubesCount]}
          >
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </RapierPhysics>
    </>
  );
}
