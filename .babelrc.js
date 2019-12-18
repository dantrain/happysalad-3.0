module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        useBuiltIns: 'usage',
        shippedProposals: true,
        corejs: { version: 2 },
      },
    ],
    ['@babel/preset-react', { useBuiltIns: true }],
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
    'babel-plugin-macros',
    ['@babel/plugin-transform-runtime', { helpers: true, regenerator: true }],
  ],
};
