/// <reference types="vitest" />
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const customConfig = defineConfig({
  test: {
    globals: true,
  },
  plugins: [tsconfigPaths()],
});

export default customConfig;
