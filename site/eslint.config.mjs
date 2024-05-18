import { fixupConfigRules } from "@eslint/compat";
import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
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
    rules: importPlugin.configs.recommended.rules,
    settings: {
      "import/resolver": {
        typescript: true,
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
  ...tseslint.configs.strictTypeChecked,
  prettierConfig,
  {
    // Webpack configs run under node and can use globals like console
    files: ["*webpack.config.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    rules: {
      // Allow suppressing unused var warnings by prefixing the variable name
      // with an underscore.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/restrict-template-expressions": ["off"], // This rule is more annoying than useful
      "import/order": [
        "error",
        {
          alphabetize: { order: "asc" },
          "newlines-between": "never",
        },
      ],
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
  },
  {
    // Don't do type-checking on any plain .js files in the tree.
    // We probably won't write any untyped source ourselves, but some puzzle
    // authors might.
    files: ["**/*.js", "**/*.mjs"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    ignores: [
      // Don't lint generated stuff under dist/
      "dist/*",
      // nor our additional (usually external) type signatures
      "types/react-*",
      "types/wrangler.d.ts",
      // nor the unused config
      "node-webpack.config.mjs",
    ],
  },
);
