const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
const SimpleI18nWebpackPlugin = require('simple-i18n-webpack-plugin');
const Reload4Plugin = require("@prakriya/reload4-html-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const HtmlLayoutWebpackPlugin = require("html-layout-webpack-plugin");
const MyWebpackPlugin = require('./MyWebpackPlugin');
const autoprefixer = require("autoprefixer");
const glob = require("glob");
const isProd = process.env.NODE_ENV === "production";
const configPath = path.join(process.cwd(), "src/data/config");
const config = require(configPath);
const themePath = path.join(process.cwd(), "src/theme", config.theme);
const { pageList, deleteFile, beforeCreate } = require("./utils");

const webpackConfig = {
  devtool: isProd ? false : 'cheap-module-source-map',
  mode: isProd ? "production" : "development",
  entry: {
    common: path.join(themePath, 'js', 'common')
  },
  output: {
    path: config.dev.outputPath,
    filename: isProd ? "static/js/[name]-[hash].js" : "static/js/[name].js",
    publicPath: config.dev.publicPath
  },
  resolve: {
    extensions: [".js", ".scss", ".md"]
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
            plugins: ["syntax-dynamic-import"]
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: isProd ? true : false,
              minimize: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions"]
              },
              plugins: () => [autoprefixer]
            }
          },
          {
            loader: "sass-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: [{
            loader:'url-loader',
            options: {
              limit: 1024,
              name: isProd ? "static/fonts/[name]-[hash].[ext]" : "static/fonts/[name].[ext]"
            }
        }]
      },
      {
        test: /\.md$/,
        use: [
          { loader: 'raw-loader' },
          {
            loader: "markdownit-loader",
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd ? "static/css/[name]-[hash].css" : "static/css/[name].css"
    }),
    new HtmlLayoutWebpackPlugin({
      include: path.join(themePath, 'includes'),
      layout: path.join(themePath, 'layouts')
    }),
    new SimpleI18nWebpackPlugin({
      language: configPath,
      beforeCreate: beforeCreate,
    }),
    new MyWebpackPlugin()
  ]
};

if (isProd) {
  webpackConfig.plugins.push(
    new SimpleProgressWebpackPlugin({
      format: "minimal"
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      }
    }),
    new OptimizeCssAssetsPlugin({
      // 
    }),
    new FileManagerPlugin({
      onStart: {
        delete: deleteFile()
      }
    })
  );
} else {
  webpackConfig.plugins.push(new Reload4Plugin());
}

pageList().forEach(item => {
  if (item.chunkname) {
    webpackConfig.entry[item.chunkname] = item.chunk;
  }
  webpackConfig.plugins.unshift(
    new HtmlWebpackPlugin({
      filename: item.filename,
      template: item.template,
      chunks: item.chunks,
      minify: isProd ? {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
      } : false
    })
  );
});

module.exports = webpackConfig;
