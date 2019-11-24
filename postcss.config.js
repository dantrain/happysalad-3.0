module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 1,
      importFrom: 'src/components/Page/variables.css',
    }),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
