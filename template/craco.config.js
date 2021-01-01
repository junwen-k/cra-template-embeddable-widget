const { whenProd } = require('@craco/craco');
const chalk = require('chalk');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const validateEnv = (PUBLIC_URL, REACT_APP_WIDGET_UMD) => {
  if (!PUBLIC_URL || PUBLIC_URL === '/') {
    console.warn(
      chalk.yellow(
        [
          `React-Widget: Public URL is either unset or '/'. It is likely to be set to the URL of the domain in which this widget will be hosted at.`,
          `Please check your ${chalk.bold('PUBLIC_URL')} env.`,
        ].join('\n') + '\n'
      )
    );
  }
  if (!REACT_APP_WIDGET_UMD) {
    console.warn(
      chalk.red(
        [
          'React-Widget: Widget UMD name is not set.',
          `Please check your ${chalk.bold('REACT_APP_WIDGET_UMD')} env.`,
        ].join('\n') + '\n'
      )
    );
  }
};

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const {
        PUBLIC_URL,
        REACT_APP_WIDGET_UMD,
        NODE_ENV,
        npm_package_name,
        npm_package_version,
      } = process.env;

      whenProd(() => {
        validateEnv(PUBLIC_URL, REACT_APP_WIDGET_UMD);

        const miniCSSExtractPluginIndex = webpackConfig.plugins.findIndex(
          (plugin) => plugin instanceof MiniCssExtractPlugin
        );
        if (miniCSSExtractPluginIndex > -1) {
          webpackConfig.plugins[
            miniCSSExtractPluginIndex
          ].options.filename = `static/css/${npm_package_name}.${NODE_ENV}@${npm_package_version}.min.css`;
        }

        const { chunkFilename, ...webpackConfigOutput } = webpackConfig.output;
        webpackConfig.output = {
          ...webpackConfigOutput,
          filename: `static/js/${npm_package_name}.${NODE_ENV}@${npm_package_version}.min.js`,
          library: REACT_APP_WIDGET_UMD,
          libraryTarget: 'umd',
        };

        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          runtimeChunk: false,
          splitChunks: { cacheGroups: { default: false } },
        };
      });

      // Dependencies to be excluded from the bundle. Uncomment the following
      // to remove React and ReactDOM from the bundle.
      // webpackConfig.externals = {
      //   ...whenProd(() => ({
      //     react: 'React',
      //     'react-dom': 'ReactDOM',
      //     // Additional dependencies to be excluded...
      //   })),
      // };

      return webpackConfig;
    },
  },
};
