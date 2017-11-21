import path from 'path';
import webpack from 'webpack';
import postcssCssnext from 'postcss-cssnext';
import postcssImport from 'postcss-import';
import merge from 'webpack-merge';

import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ProgressBarWebpackPlugin from 'progress-bar-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import * as ReactManifest from './frontend/dist/dll/react_manifest.json'; // eslint-disable-line import/no-unresolved
import * as ImmutableManifest from './frontend/dist/dll/immutable_manifest.json'; // eslint-disable-line import/no-unresolved
import * as MaterializeManifest from './frontend/dist/dll/materialize_manifest.json'; // eslint-disable-line import/no-unresolved
import * as MiscManifest from './frontend/dist/dll/misc_manifest.json'; // eslint-disable-line import/no-unresolved

const isProfile = process.env.profile;

let config = {
  // The base directory, an absolute path, for resolving entry points and loaders from configuration
  context: path.resolve(__dirname),

  // Start entry point(s)
  entry: {
    app: [
      './frontend/src/index',
    ],
  },

  // Affecting the output of the compilation
  output: {
    // path: the output directory as an absolute path (required)
    path: path.resolve(__dirname, 'frontend/dist/prod'),
    // filename: specifies the name of output file on disk (required)
    filename: '[name].[chunkhash:10].js',
    // publicPath: specifies the server-relative URL of the output resource directory
    // https://webpack.js.org/configuration/output/#output-publicpath
    publicPath: '/',
  },

  // Determine how the different types of modules within a project will be treated
  module: {
    rules: [
      // Use babel-loader for js(x) files
      {
        test: /\.jsx?$/,
        use: [
          { loader: 'babel-loader' },
        ],
        exclude: /node_modules/,
      },
      // Use ExtractTextPlugin and list of loaders to load css files
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } }, // https://github.com/webpack-contrib/css-loader#importloaders
            { loader: 'postcss-loader', options: { plugins: () => [postcssImport, postcssCssnext] } },
          ],
        }),
      },
      // Use ExtractTextPlugin and list of loaders to load scss files
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 2 } },
            { loader: 'postcss-loader', options: { plugins: () => [postcssImport, postcssCssnext] } },
            { loader: 'sass-loader' },
          ],
        }),
      },
      // Use file-loader and image-loader to load images
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          { loader: 'url-loader', options: { limit: 10000 } },
          { loader: 'image-webpack-loader', options: { bypassOnDebug: true } },
        ],
      },
      // Use file-loader to load font related files and icon
      {
        test: /\.(eot|woff2?|ttf|ico)$/,
        use: [
          { loader: 'file-loader', options: { name: '[name].[ext]' } },
        ],
      },
    ],
  },

  // A list of used webpack plugins
  plugins: [
    // Minimize javascript files with source map generated
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      sourceMap: true,
    }),
    // Module concatenation optimization from webpack v3
    new webpack.optimize.ModuleConcatenationPlugin(),
    // Better webpack module name display
    new webpack.HashedModuleIdsPlugin(),
    // Define production env which shaved off 75% of the build output size
    // http://moduscreate.com/optimizing-react-es6-webpack-production-build
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // jQuery support
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'root.jQuery': 'jquery',
    }),
    // Load pre-build dll reference files
    new webpack.DllReferencePlugin({ manifest: ReactManifest }),
    new webpack.DllReferencePlugin({ manifest: ImmutableManifest }),
    new webpack.DllReferencePlugin({ manifest: MaterializeManifest }),
    new webpack.DllReferencePlugin({ manifest: MiscManifest }),
    // Better building progress display
    new ProgressBarWebpackPlugin({
      clear: false,
    }),
    // Generate html file to dist folder
    new HtmlWebpackPlugin({
      title: 'Cocomic',
      template: path.resolve(__dirname, 'frontend/template/index.ejs'),
    }),
    // Add dll reference files to html
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, 'frontend/dist/dll/*_dll.js'), includeSourcemap: false,
    }),
    // Extract css part from javascript bundle into a file
    new ExtractTextPlugin('[name].[contenthash:10].css'),
  ],

  // Change how modules are resolved
  resolve: {
    // What directories should be searched when resolving modules
    modules: [
      'node_modules',
      'frontend/src',
    ],
    // Automatically resolve certain extensions (Ex. import 'folder/name(.ext)')
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.scss',
    ],
  },

  // Source map mode
  // https://webpack.js.org/configuration/devtool
  devtool: 'source-map',
};

// Profile
if (isProfile) {
  config = merge(config, {
    plugins: [
      // Extend base config
      ...config.plugins,
      // Webpack bundle analyzer for profiling
      new BundleAnalyzerPlugin({
        analyzerPort: 3003,
      }),
    ],
  });
}

// Export const (import/no-mutable-exports)
const constConfig = config;

export default constConfig;
