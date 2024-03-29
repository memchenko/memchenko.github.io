import { OrbitControls, useGLTF, meshBounds, Bvh } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function MouseEvents() {
  const cube = useRef();
  const hamburger = useGLTF("/3d/hamburger.glb");

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const eventHandler = (deg) => (event) => {
    event.object.material.color.set(`hsl(${deg}, 100%, 75%)`);
  };

  return (
    <>
      <OrbitControls />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={1.5} />

      <mesh
        ref={cube}
        position-x={2}
        scale={1.5}
        // this is optimization which wraps the object into
        // a invisible sphere which listens for pointer events
        // it's slightly inaccurate because some event will
        // work outside of the object
        raycast={meshBounds}
        onClick={eventHandler(0)}
        onContextMenu={eventHandler(50)}
        onDoubleClick={eventHandler(100)}
        onPointerUp={eventHandler(150)}
        onPointerDown={eventHandler(200)}
        onPointerOver={eventHandler(250)}
        onPointerOut={eventHandler(300)}
        onPointerMove={eventHandler(350)}
        onPointerMissed={eventHandler(25)}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        position-x={-2}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      {/* BVH - bound volume hierarchy. It's another 
        optimization technique. Works precisely in contrary to
        meshBounds */}
      <Bvh>
        <primitive
          object={hamburger.scene}
          scale={0.25}
          position-y={0.5}
          onClick={(event) => {
            // if loaded model consists of multiple objects
            // then it will fire click event for each of them
            // so we need to call stopPropagation to prevent multiple clicks
            event.stopPropagation();

            console.log("HAMBURGEEEER!");
          }}
        />
      </Bvh>
    </>
  );
}
