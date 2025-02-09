import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVitest from '@vitest/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  {
    plugins: {
      '@stylistic/ts': stylistic,
    },
    rules: {
      '@stylistic/ts/semi': ['error', 'always', { 'omitLastInOneLineBlock': true }],
      '@stylistic/ts/semi-spacing': ['error', { 'before': false, 'after': true }],
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/quotes': ['error', 'single'],
      '@stylistic/ts/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/ts/array-bracket-spacing': ['error', 'never'],
      '@stylistic/ts/arrow-parens': ['error', 'as-needed'],
      '@stylistic/ts/arrow-spacing': 'error',
      '@stylistic/ts/block-spacing': ['error', 'always'],
      '@stylistic/ts/brace-style': ['error', '1tbs'],
      '@stylistic/ts/comma-dangle': ['error', 'only-multiline'],
      '@stylistic/ts/comma-spacing': ['error', { 'before': false, after: true }],
      '@stylistic/ts/comma-style': ['error', 'last'],
      '@stylistic/ts/computed-property-spacing': ['error', 'never'],
      '@stylistic/ts/max-len': ['error', { 'code': 120 }],
      '@stylistic/ts/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/ts/no-extra-semi': 'error',
      '@stylistic/ts/no-mixed-spaces-and-tabs': 'error',
      '@stylistic/ts/no-multi-spaces': 'error',
      '@stylistic/ts/no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 0 }],
      '@stylistic/ts/no-trailing-spaces': 'error',
      '@stylistic/ts/object-curly-newline': ['error', { 'ObjectPattern': { 'multiline': true } }],
      '@typescript-eslint/no-unused-vars': ['error'],
      'prefer-const': ['error', { 'destructuring': 'any' }],
      'comma-dangle': [
        'error', {
          'arrays': 'always-multiline',
          'objects': 'always-multiline',
          'imports': 'always-multiline',
          'exports': 'always-multiline',
          'functions': 'never',
        },
      ],
      'no-control-regex': 'off',
      'vue/html-indent': ['error'],
      'vue/no-multi-spaces': ['error'],
    },
  }
);
