const { defineConfig } = require('@vue/cli-service')
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const cesiumSource = "./node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack: (config) => {
    const base = {
      output: {
        sourcePrefix: " ",
      },
      amd: {
        toUrlUndefined: true,
      },
      resolve: {
        alias: {
          vue$: "vue/dist/vue.esm.js",
          "@": path.resolve("./src"),
          cesium: path.resolve(__dirname, cesiumSource),
          "@com": path.resolve("./src/components"),
        },
      },
      plugins: [
        new CopyWebpackPlugin({
          patterns: [
            { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" },
          ]
        }),
        new CopyWebpackPlugin({
          patterns: [
            { from: path.join(cesiumSource, "Assets"), to: "Assets" },
          ]
        }),
        new CopyWebpackPlugin({
          patterns: [
            { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
          ]
        }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.join(cesiumSource, "ThirdParty/Workers"),
              to: "ThirdParty/Workers",
            }
          ]
        }),
        new webpack.DefinePlugin({
          CESIUM_BASE_URL: JSON.stringify("./"),
        }),
      ],
      module: {
        unknownContextRegExp: /^.\/.*$/,
        unknownContextCritical: false,
        rules: [
	        { test: /\.map$/, use: "json-loader" },
	        {
	           test: /\.mjs$/,
	           include: /node_modules/,
	           type: "javascript/auto"
	         }
        ],
      },
    }
    return base;
  },
})