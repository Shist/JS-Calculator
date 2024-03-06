"use strict";

let path = require("path");

module.exports = {
  mode: "production",
  entry: "./assets/scripts/index.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/build",
  },
  watch: true,

  devtool: "source-map",

  module: {},
};
