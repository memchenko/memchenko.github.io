import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import Experience from "./Experience/Experience";
import * as THREE from "three";
import { StrictMode } from "react";
import { Leva } from "leva";
import EnvirontmentAndStaging from "./EnvironmentAndStaging/EnvironmentAndStaging";
import LoadingModels from "./LoadingModels/LoadingModels";
import ThreeDText from "./3DText/3DText";
import { Portal } from "./Portal/Portal";
import { MouseEvents } from "./MouseEvents/MouseEvents";
import { PostProcessing } from "./PostProcessing/PostProcessing";
import { Portfolio } from "./Portfolio/Portfolio";
import { Experiment } from "./Experiment/Experiment";
import { Physics } from "./Physics/Physics";
import { Game } from "./Game/Game";
import { Interface } from "./Game//Interface";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <StrictMode>
    <KeyboardControls
      map={[
        // don't use just W - use KeyW instead because
        // not all keyboards are QWERTY but with Key prefix
        // position of keys will be mapped consistently to
        // all types of keyboards
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas
        className="r3f"
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 2, 20],
        }}
      >
        <Game />
      </Canvas>
      <Interface />
    </KeyboardControls>
  </StrictMode>
);

// root.render(
//   <StrictMode>
//     <Canvas
//       className="r3f"
//       // adding the flat stops using toneMapping
//       // flat
//       // enables shadows
//       shadows
//       camera={{
//         fov: 45,
//         near: 0.1,
//         far: 200,
//         // position: [-4, 4, 8],
//         position: [0, 2, 20],
//       }}
//     >
//       {/* <LoadingModels /> */}
//       {/* <ThreeDText /> */}
//       {/* <Portal /> */}
//       {/* <MouseEvents /> */}
//       {/* <PostProcessing /> */}
//       {/* <Portfolio /> */}
//       {/* <Experiment /> */}
//       {/* <Physics /> */}
//     </Canvas>
//   </StrictMode>
// );

// const created = ({ gl, scene }) => {
//   // gl.setClearColor("#f41");
//   // scene.background = new THREE.Color("#f41");
// };

// root.render(
//   <StrictMode>
//     <Canvas
//       shadows={false}
//       camera={{
//         fov: 45,
//         near: 0.1,
//         far: 200,
//         position: [3, 2, 6],
//       }}
//       // onCreated={created}
//     >
//       <EnvirontmentAndStaging />
//     </Canvas>
//   </StrictMode>
// );

// root.render(
//   <StrictMode>
//       <Leva collapsed />
//       <Canvas
//       // orthographic
//       // array represents clamp (between 1 and 2)
//       // [1, 2] is default value
//       // dpr={[1, 2]}
//       gl={
//         {
//           // antialias: false,
//           // toneMapping: THREE.LinearToneMapping,
//           // outputColorSpace: THREE.LinearDisplayP3ColorSpace,
//         }
//       }
//       camera={{
//         fov: 45,
//         //   zoom: 100,
//         near: 0.1,
//         far: 200,
//         position: [3, 2, 6],
//       }}
//     >
//       <Experience />
//     </Canvas>
//   </StrictMode>
// );
