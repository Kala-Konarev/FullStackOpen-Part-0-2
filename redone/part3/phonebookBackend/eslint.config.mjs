import globals from "globals";
import stylisticJs from "@stylistic/eslint-plugin-js";
import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        files: ["**/*.js"], // Apply this rule to all JS files
        languageOptions: {
            sourceType: "commonjs",
            globals: {
                ...globals.node,
            },
            ecmaVersion: "latest",
        },
        plugins: {
            "@stylistic/js": stylisticJs,
        },
        rules: {
            "@stylistic/js/indent": ["error", 2],
            "@stylistic/js/linebreak-style": ["error", "unix"],
            "@stylistic/js/quotes": ["error", "single"],
            "@stylistic/js/semi": ["error", "never"],
            eqeqeq: "error",
            "no-trailing-spaces": "error",
            "object-curly-spacing": ["error", "always"],
            "arrow-spacing": ["error", { before: true, after: true }],
            "no-console": "off",
        },
        // Ignore files like dist and build globally
        ignores: ["dist/**", "build/**"],
    },
    {
        files: ["phonebookBackend/**/*.js"], // Only apply this to JS files in phonebookBackend
        ignores: ["dist/**", "build/**"], // Specific ignores for this directory
    },
];
