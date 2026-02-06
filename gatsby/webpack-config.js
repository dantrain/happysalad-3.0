const path = require('path');

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  // Remove Gatsby's built-in ESLint webpack plugin (incompatible with ESLint 9)
  const config = getConfig();
  config.plugins = config.plugins.filter(
    (plugin) => plugin.constructor.name !== 'ESLintWebpackPlugin'
  );
  actions.replaceWebpackConfig(config);

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.md$/,
          use: path.resolve(__dirname, './markdown-loader.js'),
        },
      ],
    },
  });
};
