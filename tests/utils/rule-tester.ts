import * as parser from '@typescript-eslint/parser';
import { RuleTester } from '@typescript-eslint/rule-tester';
import path from 'path';

export const ruleTester = new RuleTester({
  languageOptions: {
    parser,
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      projectService: {
        allowDefaultProject: ['file.ts', 'estree.ts'],
      },
      tsconfigRootDir: path.resolve(__dirname, '../..'),
    },
  },
});
