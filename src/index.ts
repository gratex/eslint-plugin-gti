import requireIndex from 'requireindex';

const rulesMap = requireIndex(`${__dirname}/rules`);
const rules = Object.fromEntries(Object.values(rulesMap).map((m) => [m.RULE_NAME, m.default]));
const configs = {
  all: {
    plugins: ['gti'],
    rules: Object.fromEntries(Object.keys(rules).map((ruleName) => [`gti/${ruleName}`, 'error'])),
  },
};

export {
  rules,
  configs,
};
