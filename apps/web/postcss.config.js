module.exports = {
  plugins: [
    require('@csstools/postcss-global-data')({
      files: ['src/components/Page/variables.css'],
    }),
    require('postcss-preset-env')({
      stage: 1,
    }),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
