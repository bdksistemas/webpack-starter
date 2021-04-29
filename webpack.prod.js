const HtmlWebPackPlugin     = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const CssMinimizerPlugin    = require('css-minimizer-webpack-plugin');
const CopyPlugin            = require('copy-webpack-plugin');
const TerserPlugin          = require("terser-webpack-plugin");

module.exports = {

    mode: 'production',
    module: {
        rules: [
            {   
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                }
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader', 
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: false
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,                
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            emitFile: true,
                            esModule: false,
                            name: 'assets/[name].[ext]',
                        }
                    }   
                ]
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
              }),
        ],
    },
    output: {
        filename: '[name].[contenthash].js', 
        clean: true,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            //filename: '[name].css',     // usar esta línea cuando estemos en desarrollo y la de abajo cuando ya subamos el proyecto a producción
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ],
        }),
    ],
};
