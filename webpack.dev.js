const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');

const outputFolder = path.resolve(__dirname, 'dist');

module.exports = {
    entry: './src/ts/Game.ts',
    output: {
        filename: '[name].js',
        path: outputFolder,
        pathinfo: false
    },
    externals: {
        phaser: 'phaser'
    },
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: [/\.vert$/, /\.frag$/],
                exclude: /node_modules/,
                use: 'raw-loader'
            },
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    stats: true,
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: "./src/assets",
                to: "assets",
                force: true,
                ignore: ["**/src/**/*"]
            },
            { from: "./src/html/app.css", force: true },
            { from: "./src/html/web.config", force: true },
            { from: "./src/html/favicon.png", force: true }
        ]),
        new HtmlWebpackPlugin({
            template: "./src/html/index.html",
            filename: "index.html"
        }),
        new TSLintPlugin({
            files: ['./src/ts/**/*.ts'],
            exclude: ['./src/ts/**/*.d.ts']
        })
    ]
};