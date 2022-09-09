// eslint-disable-next-line import/no-extraneous-dependencies
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // ...
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
