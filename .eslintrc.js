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
          '^./<%-componentName%>.vue'
        ],
      },
    ]
  },
};
