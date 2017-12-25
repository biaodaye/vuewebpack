/**
 * Created by biaodaye on 2017/12/21.
 */
var path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: path.resolve(__dirname, './app/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath:'./',
        filename: '[name].[hash].js',
        chunkFilename:'[id].[chunkhash].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        //contentBase: './dist',
        port:'9090',
        historyApiFallback: true,
        inline: true,
        hot: true
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'Vue': 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // vue-loader options go here
                    //loaders: {
                    //    css: ExtractTextWebpackPlugin.extract({
                    //        loader: 'css-loader?sourceMap',
                    //        fallbackLoader: 'vue-style-loader'
                    //    })
                    //}
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            //{
            //    test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
            //    loader: 'url-loader',
            //    options: {
            //        name: '[name].[ext]?[hash]'
            //    }
            //},
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader"
                ]
            }
        ]
    },
    //Favlist: {
    //    loaders: {
    //        js: 'babel'
    //    }
    //},
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: path.resolve(__dirname, './app/index.html'),
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextWebpackPlugin('css/[name].css'),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
            },
            vue: {
                postcss: function () {
                    return [autoprefixer]
                }
            }
        })
    ]
}