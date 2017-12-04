import path from 'path';
import webpack from 'webpack';

import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ProgressBarWebpackPlugin from 'progress-bar-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';

import * as ReactManifest from './frontend/dist/dll/react_manifest.json'; // eslint-disable-line import/no-unresolved
import * as ImmutableManifest from './frontend/dist/dll/immutable_manifest.json'; // eslint-disable-line import/no-unresolved
import * as MaterializeManifest from './frontend/dist/dll/materialize_manifest.json'; // eslint-disable-line import/no-unresolved
import * as MiscManifest from './frontend/dist/dll/misc_manifest.json'; // eslint-disable-line import/no-unresolved

export default {
  // The base directory, an absolute path, for resolving entry points and loaders from configuration
  context: path.resolve(__dirname),

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
      // Use url-loader to load images in development
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
    // jQuery support
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'root.jQuery': 'jquery',
    }),
    // Load pre-build dll reference files
    new webpack.DllReferencePlugin({ manifest: ReactManifest }),
    new webpack.DllReferencePlugin({ manifest: MaterializeManifest }),
    new webpack.DllReferencePlugin({ manifest: ImmutableManifest }),
    new webpack.DllReferencePlugin({ manifest: MiscManifest }),
    // Better building progress display
    new ProgressBarWebpackPlugin({
      clear: false,
    }),
    // Add Progressive Web Application manifest
    new WebpackPwaManifest({
      name: 'Cocomic',
      short_name: 'Cocomic',
      description: 'An open-source platform for comic/manga collaboration',
      background_color: '#2196f3',
      theme_color: '#2196f3',
      orientation: 'portrait',
      display: 'standalone',
      icons: [
        {
          src: path.resolve('frontend/src/image/logo.png'),
          sizes: [16, 32, 96, 128, 192, 256, 384, 512],
        },
        {
          src: path.resolve('frontend/src/image/apple-touch-icon.png'),
          sizes: [120, 152, 167, 180],
          destination: path.join('icons', 'ios'),
          ios: true,
        },
        {
          src: path.resolve('frontend/src/image/android-icon.png'),
          sizes: [192, 256],
          destination: path.join('icons', 'android'),
        },
      ],
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
};
