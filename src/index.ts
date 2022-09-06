import requireIndex from 'requireindex';

const rulesMap = requireIndex(`${__dirname}/rules`);
const rules = Object.fromEntries(Object.values(rulesMap).map((m) => [m.RULE_NAME, m.default]));
const configs = {
  all: {
    plugins: ['@gjax'],
    rules: Object.fromEntries(Object.keys(rules).map((ruleName) => [`@gjax/${ruleName}`, 'error'])),
  },
};

export {
  rules,
  configs,
};
