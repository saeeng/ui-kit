import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import {defineConfig, globalIgnores} from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    extends: [
      "eslint:recommended",
      "next",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "import", "no-relative-import-paths"],
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "react/boolean-prop-naming": [
        "error",
        {
          propTypeNames: ["bool", "mutuallyExclusiveTrueProps"],
          rule: "^[$]?(is|has|show|can|use)[A-Z]([A-Za-z0-9]?)+",
        },
      ],
      "react/hook-use-state": "error",
      "react/jsx-handler-names": [
        "error",
        {
          eventHandlerPrefix: "handle|on",
          eventHandlerPropPrefix: "on",
          checkLocalVariables: true,
        },
      ],
      "react/sort-prop-types": [
        "error",
        {
          ignoreCase: true,
          callbacksLast: true,
          sortShapeProp: true,
        },
      ],
      "react/jsx-sort-props": [
        "error",
        {
          ignoreCase: true,
          callbacksLast: true,
          shorthandFirst: true,
          multiline: "last",
          reservedFirst: true,
          noSortAlphabetically: true,
        },
      ],
      "react/jsx-tag-spacing": [
        "error",
        {
          beforeSelfClosing: "always",
        },
      ],
      "react/react-in-jsx-scope": "off",
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react/destructuring-assignment": [
        "error",
        "always",
        {
          ignoreClassFields: true,
          destructureInSignature: "always",
        },
      ],
      "import/default": "error",
      "import/namespace": "error",
      "import/no-unused-modules": [
        "off",
        {
          unusedExports: true,
          ignoreExports: ["./pages/**/*.tsx"],
        },
      ],
      "import/no-commonjs": "error",
      "import/no-nodejs-modules": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "unknown",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "next",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@components/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@geom-data/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@generic-data/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@map-flow/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@asteroid/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@ad-map/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@routing-admin/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@model-assets/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@map-display-admin/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@odd/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@permission/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "**/*.@(svg|jpg|jpeg|png|gif|css|scss)",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "no-relative-import-paths/no-relative-import-paths": "error",
      "no-console": "error",
      quotes: [
        "error",
        "single",
        {
          avoidEscape: true,
        },
      ],
      "object-curly-spacing": ["error", "always"],
      "object-curly-newline": [
        "error",
        {
          consistent: true,
        },
      ],
      "max-depth": ["error", 4],
      "dot-notation": ["error"],
      "no-implicit-coercion": [
        "error",
        {
          allow: ["!!"],
        },
      ],
      "no-lone-blocks": "error",
      "no-param-reassign": "error",
      "eol-last": "error",
      eqeqeq: "error",
      "no-else-return": "error",
      "no-unused-vars": "off",
      yoda: [
        "error",
        "never",
        {
          exceptRange: true,
        },
      ],
    },
    overrides: [
      {
        files: ["**/*.js"],
        rules: {
          "import/no-commonjs": "off",
          "import/no-nodejs-modules": "off",
          "@typescript-eslint/no-var-requires": "off",
        },
      },
      {
        files: ["*.json"],
        rules: {
          quotes: ["error", "double"],
        },
      },
    ],
    ignorePatterns: [
      "node_modules",
      "protobuf",
      "gql",
      "./types/api/bennu.ts",
      "components/ui/**",
    ],
  },
]);
