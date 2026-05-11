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
        "@components": path.resolve(__dirname, "components"),
        "@services": path.resolve(__dirname, "services"),
        "@helpers": path.resolve(__dirname, "helpers"),
        "@pages": path.resolve(__dirname, "pages"),
        "@hoc": path.resolve(__dirname, "hoc"),
        "@queries": path.resolve(__dirname, "queries"),
        "@router": path.resolve(__dirname, "router"),
        "@layout": path.resolve(__dirname, "layout"),
        "@types": path.resolve(__dirname, "types"),
        "@shared": path.resolve(__dirname, "../shared"),
      },
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
  };
});
