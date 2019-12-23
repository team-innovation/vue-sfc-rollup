module.exports = {
  presets: [
    '@babel/preset-env',
<% if (ts) { -%>
    '@babel/preset-typescript',
<% } -%>
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
};
