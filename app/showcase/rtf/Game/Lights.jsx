import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function Lights() {
  const light = useRef();

  useFrame((state, delta) => {
    light.current.position.z = state.camera.position.z + 1 - 4;
    light.current.target.position.z = state.camera.position.z - 4;
    // threejs updates matrices lazily
    // when something is not in the scene
    // ie light.current.target change of position
    // would take effect because target is not in the scene
    // so we need to imperatively force update of matrices
    light.current.target.updateMatrixWorld();
  });

  return (
    <>
      <directionalLight
        ref={light}
        castShadow
        position={[4, 4, 1]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={1.5} />
    </>
  );
}
