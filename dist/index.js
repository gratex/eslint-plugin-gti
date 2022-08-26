"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.rules = void 0;
const requireindex_1 = __importDefault(require("requireindex"));
const rulesMap = (0, requireindex_1.default)(`${__dirname}/rules`);
const rules = Object.fromEntries(Object.values(rulesMap).map((m) => [m.RULE_NAME, m.default]));
exports.rules = rules;
const configs = {
    all: {
        plugins: ['gti'],
        rules: Object.fromEntries(Object.keys(rules).map((ruleName) => [`gti/${ruleName}`, 'error'])),
    },
};
exports.configs = configs;
