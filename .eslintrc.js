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
    },
    ignorePatterns: ["node_modules",]
}

