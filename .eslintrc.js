module.exports = {
  root: true,
  extends: [
    "airbnb-base",
  ],
  rules: {
    // Ignore unresolved imports in template files
    'import/no-unresolved': [
      2,
      {
        ignore: [
          '^rollup-plugin*',
          '^./components',
          '^./<%-componentName%>.vue'
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['templates/**/entry.js'],
      rules: {
        'no-redeclare': 'off',
        'import/export': 'off',
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['templates/**/rollup.config.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
      },
    },
  ],
};
