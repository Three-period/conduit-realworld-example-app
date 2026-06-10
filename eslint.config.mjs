// ESLint flat config —— 由 PM 需求交付台为 Conduit 接入真实 lint 而加
// 基线策略：对存量代码用宽松规则（多数判 warn 不阻断），对真实问题（未定义变量/语法错/重复 key）判 error 拦截
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/public/**",
      "backend/migrations/**",
      "backend/seeders/**",
      "**/*.config.{js,mjs,cjs}",
    ],
  },
  // 后端 Node（CommonJS）
  {
    files: ["backend/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: { ...globals.node },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
  // 前端 React（ESM + JSX）
  {
    files: ["frontend/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { react, "react-hooks": reactHooks },
    settings: { react: { version: "detect" } },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off",
    },
  },
  // 测试文件：补 vitest 全局，避免 describe/test/expect 误报 no-undef
  {
    files: ["**/*.test.{js,jsx}", "**/setupTests.js"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        vi: "readonly",
      },
    },
  },
];
