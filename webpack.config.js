const path = require('path')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: {
        'bundle': './src/app.js'
    },
    output:{
        path: path.join(__dirname, 'public'),
        filename: '[name].[contenthash].js'
    },
    module:{
        rules: [{
            loader: 'babel-loader',
            test:/\.js$/,
            exclude:/node_modules/
        }]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'template/index.html'
        })
    ],
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
}