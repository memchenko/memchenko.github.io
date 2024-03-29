import { useLoader } from "@react-three/fiber";
import { useGLTF, Clone } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

useGLTF.preload("/3d/hamburger-draco.glb");

export function Model() {
  // const helmet = useLoader(
  //   GLTFLoader,
  //   "/3d/FlightHelmet/glTF/FlightHelmet.gltf",
  //   (loader) => {
  //     const dracoLoader = new DRACOLoader();
  //     dracoLoader.setDecoderPath("/3d/draco/");
  //     loader.setDRACOLoader(dracoLoader);
  //   }
  // );
  // return <primitive object={helmet.scene} scale={5} position-y={-1} />;
  const model = useGLTF("/3d/hamburger-draco.glb");

  return (
    <>
      <Clone object={model.scene} scale={0.35} position-x={-4} />;
      <Clone object={model.scene} scale={0.35} position-x={0} />;
      <Clone object={model.scene} scale={0.35} position-x={4} />;
    </>
  );
}
