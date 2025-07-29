import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // เพิ่ม plugin สำหรับ import
  {
    plugins: {
      import: require("eslint-plugin-import"),
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json", // สำคัญ ต้องชี้ไปที่ tsconfig
        },
      },
    },
  },

  // Config หลักของ Next.js
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
