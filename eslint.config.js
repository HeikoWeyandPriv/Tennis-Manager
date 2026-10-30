import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["**/dist/**", "**/coverage/**", "**/node_modules/**"] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Engine: ADR 0003 – keine Browser-APIs, deterministisch
  {
    files: ["packages/engine/**/*.ts"],
    rules: {
      "no-restricted-globals": [
        "error",
        ...[
          "window",
          "document",
          "navigator",
          "localStorage",
          "sessionStorage",
          "indexedDB",
          "fetch",
          "performance",
          "requestAnimationFrame",
          "setTimeout",
          "setInterval",
        ].map((name) => ({
          name,
          message: "Die Engine darf keine Browser- oder Laufzeit-APIs verwenden (ADR 0003).",
        })),
        {
          name: "Date",
          message:
            "Die Engine darf keine Systemzeit verwenden (ADR 0003). Zeit ist Teil des Spielzustands.",
        },
      ],
      "no-restricted-properties": [
        "error",
        {
          object: "Math",
          property: "random",
          message:
            "Die Engine muss deterministisch sein (ADR 0003). Nur den Zufallsgenerator mit Seed aus dem Spielzustand verwenden.",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@tennis-manager/*"],
              message: "Die Engine darf keine anderen Workspace-Pakete importieren (ADR 0004).",
            },
            {
              group: ["react", "react-*", "pixi.js", "dexie", "zustand"],
              message:
                "Die Engine darf keine UI-, Darstellungs- oder Persistenz-Bibliotheken importieren (ADR 0003).",
            },
          ],
        },
      ],
    },
  },

  // App: Browser-Umgebung und React-Hooks-Regeln
  {
    files: ["packages/app/**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    ...reactHooks.configs.flat["recommended-latest"],
  },

  // Konfigurationsdateien laufen in Node
  {
    files: ["*.js", "packages/*/*.config.ts"],
    languageOptions: {
      globals: globals.node,
    },
  },

  prettier,
);
