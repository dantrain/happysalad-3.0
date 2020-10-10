const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
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
