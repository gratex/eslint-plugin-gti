import * as tsutils from 'tsutils';
import * as tsEslintUtils from '@typescript-eslint/utils';
import * as tsEslintTypeUtils from '@typescript-eslint/type-utils';
import { createEslintRule } from '../utils/create-eslint-rule';

export const RULE_NAME = 'await-observable';
export type MessageIds = 'await';
export type Options = [];

export default createEslintRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    docs: {
      description: 'Disallow awaiting a value that is not an Observable',
      recommended: 'error',
      requiresTypeChecking: true,
    },
    messages: {
      await: 'Unexpected `await` of an rxjs Observable.',
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [],

  create(context) {
    const parserServices = tsEslintUtils.ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      AwaitExpression(node) {
        const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
        const type = checker.getTypeAtLocation(originalNode.expression);

        if (
          !tsEslintTypeUtils.isTypeAnyType(type) &&
          !tsEslintTypeUtils.isTypeUnknownType(type) &&
          isObservableType()
        ) {
          context.report({
            messageId: 'await',
            node,
          });
        }

        function isObservableType() {
          for (const t of tsutils.unionTypeParts(checker.getApparentType(type))) {
            if (checker.getBaseTypeOfLiteralType(t).symbol.escapedName === 'Observable') {
              return true;
            }
            // if (
            //   t.getProperty('forEach')
            //   && t.getProperty('lift')
            //   && t.getProperty('pipe')
            //   && t.getProperty('subscribe')
            //   && t.getProperty('toPromise')
            // ) {
            //   return true;
            // }
          }
          return false;
        }
      },
    };
  },
});
