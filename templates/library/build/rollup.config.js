// rollup.config.js
import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify-es';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const config = {
  input: 'src/index.js',
  output: {
    name: '<%-componentNamePascal%>',
    exports: 'named',
  },
  plugins: [
    vue({
      css: true,
      compileTemplate: true,
    }),
    babel({
      exclude: 'node_modules/**',
      externalHelpers: true,
      plugins: [
        [
          'wildcard',
          {
            exts: ['vue'],
            nostrip: true,
          },
        ],
        '@babel/plugin-external-helpers',
      ],
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
          },
        ],
      ],
    }),
  ],
};

// Only minify browser (iife) version
if (argv.format === 'iife') {
  config.plugins.push(uglify());
}

export default config;
