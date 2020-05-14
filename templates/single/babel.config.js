const devPresets = ['@vue/babel-preset-app'];
const buildPresets = ['@babel/preset-env'<% if (ts) { -%>, '@babel/preset-typescript'<% } -%>];
module.exports = {
  presets: (process.env.NODE_ENV === 'development' ? devPresets : buildPresets),
};
