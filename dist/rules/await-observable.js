"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const tsutils = __importStar(require("tsutils"));
const tsEslintUtils = __importStar(require("@typescript-eslint/utils"));
const tsEslintTypeUtils = __importStar(require("@typescript-eslint/type-utils"));
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'await-observable';
exports.default = (0, create_eslint_rule_1.createEslintRule)({
    name: exports.RULE_NAME,
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
                if (!tsEslintTypeUtils.isTypeAnyType(type) &&
                    !tsEslintTypeUtils.isTypeUnknownType(type) &&
                    isObservableType()) {
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
