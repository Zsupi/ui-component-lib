const path = require('path')

const globals = require('globals')
const { configs: airbnbExtendedLegacyConfigs } = require('eslint-config-airbnb-extended/legacy')
const prettierConfig = require('eslint-config-prettier')
const jestPlugin = require('eslint-plugin-jest')
const prettierPlugin = require('eslint-plugin-prettier')
const testingLibraryPlugin = require('eslint-plugin-testing-library')
const typescriptEslint = require('typescript-eslint')

module.exports = [
  // ── Base configs ──────────────────────────────────────────────
  ...airbnbExtendedLegacyConfigs.react.recommended,
  ...airbnbExtendedLegacyConfigs.react.hooks,
  prettierConfig,

  // ── Scope: lint only src/ and test/ ──────────────────────────
  {
    ignores: ['*', '!src', '!test', '**/node_modules/**', '**/expo-env.d.ts'],
  },

  // ── Main rules (all JS/TS files) ─────────────────────────────
  {
    settings: {
      'import/resolver': {
        node: {
          // `@/*` -> `./src/*`, so `src` is the source root
          paths: [path.resolve(__dirname, './src')],
          extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        },
      },
      // Treat `@/...` imports as "internal" for import/order
      'import/internal-regex': '^@/',
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.node,
        __DEV__: 'readonly',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // ── Disabled Airbnb rules (too strict / not useful) ───────
      'class-methods-use-this': 'off',
      'func-names': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'prefer-arrow-callback': 'off',
      'react/destructuring-assignment': 'off',
      'react/forbid-prop-types': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-boolean-value': 'off',
      'react/jsx-fragments': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'react/sort-comp': 'off',
      'react/state-in-constructor': 'off',
      'react/static-property-placement': 'off',
      camelcase: 'off',
      'global-require': 'off',
      'import/prefer-default-export': 'off',
      // Expo/RN: the new JSX transform means React needn't be in scope
      'react/react-in-jsx-scope': 'off',

      // ── Import rules ─────────────────────────────────────────
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/*.test.*', '**/*.spec.*', '**/__tests__/**', 'test/**'],
          optionalDependencies: false,
        },
      ],
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        },
      ],

      // ── Code quality ──────────────────────────────────────────
      'no-param-reassign': ['error', { props: true, ignorePropertyModificationsForRegex: ['^draft'] }],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],
      'no-use-before-define': ['error', { variables: true, functions: false, classes: false }],

      // ── Formatting (delegated to Prettier) ────────────────────
      'prettier/prettier': ['error'],
      'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
    },
  },

  // ── Jest / Testing Library (test files only) ──────────────────
  // jest-dom is left out: it asserts on DOM nodes, which don't exist in React Native.
  {
    files: ['**/*.test.*', '**/*.spec.*', '**/__tests__/**', 'test/**'],
    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals.globals,
        global: true,
      },
    },
    plugins: {
      jest: jestPlugin,
      'testing-library': testingLibraryPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      ...testingLibraryPlugin.configs.react.rules,

      'testing-library/no-node-access': 'off',
      'testing-library/prefer-user-event-setup': 'error',
    },
  },

  // ── TypeScript (*.ts, *.tsx only) ─────────────────────────────
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint.plugin,
    },
    rules: {
      // Disable base rules that conflict with TS equivalents
      'no-shadow': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',

      // TypeScript-specific rules
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-require-imports': ['error', { allow: ['\\.(png|jpe?g|gif|webp|svg|ttf|otf|mp3|mp4)$'] }],
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { caughtErrors: 'none', argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // ── Expo Router screens: default-exported components, return type not required ──
  {
    files: ['src/app/**/*.tsx'],
    rules: { '@typescript-eslint/explicit-module-boundary-types': 'off' },
  },
]