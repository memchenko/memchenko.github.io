import { resolve } from "path";

export default {
  root: "app/",
  publicDir: "../static/",
  base: "./",
  server: {
    host: true, // Open to local network and display URL
    open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env), // Open if it's not a CodeSandbox
  },
  build: {
    outDir: "../dist", // Output in the dist/ folder
    emptyOutDir: true, // Empty the folder first
    sourcemap: true, // Add sourcemap
    rollupOptions: {
      input: {
        index: resolve(__dirname, "./app/index.html"),
        basic3d: resolve(__dirname, "./app/showcase/basic3d/index.html"),
      },
    },
  },
};
