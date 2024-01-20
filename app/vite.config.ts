import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src/renderer",
  build: {
    outDir: "../../dist",
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
});
