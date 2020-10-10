const { onCreateWebpackConfig } = require('./gatsby/webpack-config');
const { createSchemaCustomization } = require('./gatsby/schema-customization');
const { onCreatePage, createPages } = require('./gatsby/create-pages');
const { onPostBuild } = require('./gatsby/post-build');

exports.onCreateWebpackConfig = onCreateWebpackConfig;
exports.createSchemaCustomization = createSchemaCustomization;

exports.createPages = createPages;
exports.onCreatePage = onCreatePage;

exports.onPostBuild = onPostBuild;
