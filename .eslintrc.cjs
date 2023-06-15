module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parserOptions: {
        ecmaVersion: 2020,
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module'
    },
    /// Disable rules
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
    },
    ignorePatterns: ["node_modules",]
}

