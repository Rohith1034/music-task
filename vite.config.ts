// import { defineConfig } from "vite"
import { defineConfig } from "vitest/config"

import react from "@vitejs/plugin-react"
import federation from "@originjs/vite-plugin-federation"

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "musicLibrary",
      filename: "remoteEntry.js",
      exposes: {
        "./MusicLibrary": "./src/MusicLibrary.tsx"
      },
      shared: ["react", "react-dom"] // ✅ Must be shared
    })
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      reporter: ["text", "html"],
      exclude: ["dist/**", "node_modules/**", "utils/songs.ts, src/**/*.test.tsx", "src/setupTests.ts", "src/index.tsx", "src/App.tsx", "eslint.config.js", "vite.config.ts", "src/main.tsx", "src/vite-env.d.ts", "utils/**"]
    }
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5001 // ✅ Important
  }
})
