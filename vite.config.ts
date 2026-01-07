import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import {resolve} from "node:path";
import {mkdirSync, copyFileSync} from "node:fs";
import path from "node:path";

function copyCssEntrypoints() {
  return {
    name: "copy-css-entrypoints",
    closeBundle() {
      mkdirSync("dist/styles", {recursive: true});
      copyFileSync("src/styles/tokens.css", "dist/styles/tokens.css");
      copyFileSync("src/styles/base.css", "dist/styles/base.css");
    },
  };
}

/**
 * 핵심 원칙
 * - React는 무조건 external (단일 인스턴스)
 * - Radix UI와 나머지 dependencies는 번들에 포함 (소비 앱에서 별도 설치 불필요)
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@ui": path.resolve(__dirname, "./src/ui"),
      "@app": path.resolve(__dirname, "./src/app"),
    },
    // 소비 앱과 라이브러리 개발 환경에서 React 중복 로딩 방지(안전장치)
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },

  plugins: [
    react({jsxRuntime: "automatic"}),
    dts({
      entryRoot: "src",
      include: ["src"],
      insertTypesEntry: true,
    }),
    copyCssEntrypoints(),
  ],

  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        "tailwind-preset": resolve(__dirname, "src/tailwind-preset.ts"),
      },
      formats: ["es"],
    },

    rollupOptions: {
      external: (id) => {
        // React와 관련된 모든 import를 external로 처리
        if (
          id === "react" ||
          id === "react-dom" ||
          id === "react/jsx-runtime" ||
          id.startsWith("react/") ||
          id.startsWith("react-dom/")
        ) {
          return true;
        }
        // peerDependencies를 external로 처리
        return false;
      },

      output: {
        format: "es",
        // 각 컴포넌트를 개별 파일로 빌드
        preserveModules: true,
        preserveModulesRoot: "src",
        // 엔트리 파일명 고정
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "index") return "index.js";
          if (chunkInfo.name === "tailwind-preset") return "tailwind-preset.js";
          return "[name].js";
        },
      },
    },
  },
});
