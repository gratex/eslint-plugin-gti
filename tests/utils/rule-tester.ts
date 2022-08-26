import { ESLintUtils } from '@typescript-eslint/utils';

const { RuleTester } = ESLintUtils;

export const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.test.json',
  }
});
