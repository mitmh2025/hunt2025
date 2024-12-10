import { fixupConfigRules } from "@eslint/compat";
import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import deprecation from "eslint-plugin-deprecation";
import eslintComments from "eslint-plugin-eslint-comments";
import importPlugin from "eslint-plugin-import";
import jsxa11y from "eslint-plugin-jsx-a11y";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

// ESLint 9 was recently released.  Not all config/plugin packages have been
// migrated to use the new flat config structure yet, nor have all been
// adjusted to stop depending on deprecated API.
// https://eslint.org/blog/2024/05/eslint-compatibility-utilities/

// Later configs override earlier configs.  Thus, prettier should be later than
// most, since it disables rules that other configs might include that conflict
// with it.  Our local project-specific overrides should come last.
export default tseslint.config(
  eslint.configs.recommended,
  ...fixupConfigRules(reactRecommended),
  {
    plugins: {
      "jsx-a11y": jsxa11y,
    },
    rules: jsxa11y.configs.recommended.rules,
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
    },
    settings: {
      ...importPlugin.configs.typescript.settings,
      "import/resolver": {
        typescript: true,
      },
    },
  },
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    plugins: {
      "eslint-comments": eslintComments,
    },
    rules: eslintComments.configs.recommended.rules,
  },
  {
    files: ["*.ts", "*.tsx"],
    plugins: {
      deprecation,
    },
    rules: deprecation.configs.recommended.rules,
  },
  prettierConfig,
  {
    // Rspack configs run under node and can use globals like console
    files: ["rspack.config.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    rules: {
      // Allow `this: void` to indicate a method doesn't use the `this` context.
      "@typescript-eslint/no-invalid-void-type": [
        "error",
        { allowAsThisParameter: true },
      ],
      // Allow suppressing unused var warnings by prefixing the variable name
      // with an underscore.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/restrict-template-expressions": ["off"], // This rule is more annoying than useful
      // Either TypeScript or Rspack seem to be smoothing over the distinction
      // between objects under default imports and named imports.
      "import/no-named-as-default-member": ["off"],
      // This rule does not seem to work with eslint 9 and TypeScript will validate it anyway
      "import/namespace": ["off"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "import/no-duplicates": ["error", { "prefer-inline": true }],
      "import/order": [
        "error",
        {
          alphabetize: { order: "asc" },
          "newlines-between": "never",
        },
      ],
      "eslint-comments/require-description": ["error"],
      // interfaces are not perfectly substitutable for types so don't prefer
      // them
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      eqeqeq: ["error"],
    },
  },
  {
    // Type definitions are constrained by external libraries and won't always
    // pass linting
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["off"],
      "@typescript-eslint/consistent-type-definitions": ["off"],
      "@typescript-eslint/no-explicit-any": ["off"],
    },
  },
  {
    // Required to ensure typescript-eslint can find the tsconfig
    languageOptions: {
      parserOptions: {
        project: true,
        tsConfigDirName: import.meta.dirname,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  {
    // Don't do type-checking on any plain .js files in the tree.
    // We probably won't write any untyped source ourselves, but some puzzle
    // authors might.
    files: ["**/*.js", "**/*.mjs"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    // ops site / Vite overrides
    files: ["ops/**/*"],
    rules: {
      "react/react-in-jsx-scope": ["off"],
    },
  },
  {
    ignores: [
      // Don't lint generated stuff under dist/
      "dist/*",
      "dist-ops/*",
      "radioman/dist/*",
      // nor the unused config
      "node-webpack.config.mjs",
    ],
  },
);
