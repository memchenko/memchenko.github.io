import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import * as THREE from "three";
import { StrictMode } from "react";
import { Leva } from "leva";
import EnvirontmentAndStaging from "./EnvironmentAndStaging";

const root = ReactDOM.createRoot(document.querySelector("#root"));

const created = ({ gl, scene }) => {
  // gl.setClearColor("#f41");
  // scene.background = new THREE.Color("#f41");
};

root.render(
  <StrictMode>
    <Canvas
      shadows={false}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [3, 2, 6],
      }}
      // onCreated={created}
    >
      <EnvirontmentAndStaging />
    </Canvas>
  </StrictMode>
);

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
