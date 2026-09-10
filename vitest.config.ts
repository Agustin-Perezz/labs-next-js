import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/unit/setup.ts"],
    include: ["tests/unit/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "text-summary", "lcov", "clover"],
      reportsDirectory: "./coverage",
      // Coverage scope: only files with deliberate unit tests are measured.
      // Routes/pages, server actions, and components are exercised via
      // Playwright E2E or integration tests, not unit coverage. Instrumenting
      // the whole src/app/** tree by default tanks the SonarCloud delta gate
      // every time a new route folder is added (absence from LCOV = 0%).
      // Add a file here only when it gets real unit tests. Keep in lockstep
      // with sonar-project.properties `sonar.coverage.exclusions`.
      include: ["src/hooks/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.d.ts",
        "src/**/components/**",
        "src/app/**/page.tsx",
        "src/app/**/layout.tsx",
        "src/app/**/actions.ts",
        "src/sentry.client.config.ts",
        "src/sentry.edge.config.ts",
        "src/sentry.server.config.ts",
        "src/instrumentation.ts",
      ],
    },
  },
});
