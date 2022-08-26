import { ruleTester } from '../utils/rule-tester';
import rule, { MessageIds, RULE_NAME } from '../../src/rules/await-observable';

const validStatements = [
  `
async function test() {
  await Promise.resolve('value');
}
`,
];

const invalidStatements = [
  `
import { of } from 'rxjs';
async function test() {
  await of(1);
}
`,
];

const messageId: MessageIds = 'await';

ruleTester.run(RULE_NAME, rule, {
  valid: validStatements,
  invalid: invalidStatements.map((code) => ({ code, errors: [{ messageId }] })),
});
