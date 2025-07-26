module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react', '@typescript-eslint', 'react-hooks'],
    rules: {
        'react/prop-types': 'off', // Deshabilitar prop-types (usamos TypeScript).
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        // Agrega reglas personalizadas según tus necesidades.
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};