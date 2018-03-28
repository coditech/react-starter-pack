"use strict";

const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Visualizer = require("webpack-visualizer-plugin");

const modify = (baseConfig, { target, dev }, webpack) => {

  const appConfig = Object.assign({}, baseConfig);

  const sourceMap = dev

  if (target !== "web") {
    // let server ignore scss files
    appConfig.module.rules.push({
      test: /\.scss$/,
      use: ["ignore-loader"]
    });
    // nothing else to do, return early
    return appConfig;
  }

  // set up css loader
  const cssLoader = {
    loader: "css-loader",
    options: {
      minimize: !dev,
      sourceMap,
      importLoaders: 1
    }
  };

  // set up post css loader
  const postCSSLoader = {
    loader: "postcss-loader",
    options: {
      ident: "postcss", // https://webpack.js.org/guides/migrating/#complex-options
      sourceMap,
      plugins: () => [
        autoprefixer({
          browsers: [
            ">1%",
            "last 4 versions",
            "Firefox ESR",
            "not ie < 9" // React doesn't support IE8 anyway
          ]
        })
      ]
    }
  };

  // set up style loader
  const styleLoader = {
    loader: "style-loader",
    options: {
      sourceMap
    }
  };

  // set up sass loader
  const sassLoader = {
    loader: "sass-loader",
    options: {
      sourceMap
    }
  };


  if (dev) {
    // For development, include source map
    appConfig.module.rules.push({
      test: /\.scss$/,
      use: [styleLoader, cssLoader, postCSSLoader, sassLoader]
    });
    // nothing else to do, return early
    return appConfig
  }

  // For production, extract CSS
  appConfig.module.rules.push({
    test: /.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [cssLoader, postCSSLoader, sassLoader]
    })
  });

  appConfig.plugins.push(
    new Visualizer(), // shows bundle size
    new ExtractTextPlugin("bundle.css") // extracts css to its own file
  );

  
  return appConfig;
}

module.exports = { modify };