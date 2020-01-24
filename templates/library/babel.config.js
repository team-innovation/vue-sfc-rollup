module.exports = {
  presets: [
    '@babel/preset-env',
<% if (ts) { -%>
    '@babel/preset-typescript',
<% } -%>
  ],
};
