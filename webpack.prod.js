const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');
const TSLintPlugin = require('tslint-webpack-plugin');

const outputFolder = path.resolve(__dirname, 'dist');
const nodeModulesFolder = path.join(__dirname, './node_modules/');

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
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: [/\.vert$/, /\.frag$/],
                exclude: [nodeModulesFolder],
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
            filename: "index.html",
            minify: true
        }),
        new TSLintPlugin({
            files: ['./src/ts/**/*.ts'],
            exclude: ['./src/ts/**/*.d.ts']
        }),
        new JavaScriptObfuscator({
            // 🕮 See: https://github.com/javascript-obfuscator/javascript-obfuscator
            debugProtection: true,
            debugProtectionInterval: true,
            disableConsoleOutput: true,
            domainLock: [],
            // 👇 gives errors when set to true
            selfDefending: false, 
            stringArrayEncoding: true,
            transformObjectKeys: true,
        }),
    ]
};