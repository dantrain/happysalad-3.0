const path = require('path');

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();

  config.plugins = config.plugins.filter((plugin) => {
    // Remove Gatsby's built-in ESLint webpack plugin (incompatible with ESLint 9)
    if (plugin.constructor.name === 'ESLintWebpackPlugin') return false;

    // CSS Modules import order doesn't matter - suppress conflicting order warnings
    if (plugin.constructor.name === 'MiniCssExtractPlugin') {
      plugin.options.ignoreOrder = true;
    }

    return true;
  });

  // Fix framework chunk for pnpm: Gatsby's default regex uses a negative lookbehind
  // that fails with pnpm's node_modules/.pnpm/*/node_modules/* path structure
  const frameworkGroup =
    config.optimization?.splitChunks?.cacheGroups?.framework;

  if (frameworkGroup) {
    frameworkGroup.test =
      /[\\/]node_modules[\\/](?:\.pnpm[\\/].*[\\/]node_modules[\\/])?(react|react-dom|scheduler|prop-types)[\\/]/;
  }

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
