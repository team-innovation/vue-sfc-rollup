const devPresets = ['@vue/babel-preset-app'];
const buildPresets = [
  [
    '@babel/preset-env',
    // Config for @babel/preset-env
    {
      // Example: Always transpile optional chaining/nullish coalescing
      // include: [
      //   /(optional-chaining|nullish-coalescing)/
      // ],
    },
  ],
<% if (ts) { -%>
  '@babel/preset-typescript',
<% } -%>
];

module.exports = {
  env: {
    development: { presets: devPresets },
    production: { presets: buildPresets },
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          },
        ],
<% if (ts) { -%>
        '@babel/preset-typescript',
<% } -%>
        '@vue/babel-preset-app'
      ]
    }
  }
}
