import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    plugins: [react(), tailwindcss()],
    define: {
      "process.env.API_URL": JSON.stringify(env.API_URL),
    },
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@services": path.resolve(__dirname, "src/services"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@hoc": path.resolve(__dirname, "src/hoc"),
        "@queries": path.resolve(__dirname, "src/queries"),
      },
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
  };
});
