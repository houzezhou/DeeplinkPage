
'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    /*entry: {
        main: './src/entry.js' //唯一入口文件
        //vendor: ['react']
    },*/
    entry: {
        main: './src/entry.js', //唯一入口文件
        //appsetting: './src/containers/appsettingC.js'
    },
    output: {
        //path: './build', //打包后的文件存放的地方
        path: path.join(__dirname, 'build'),
        filename: 'main.js', //打包后输出文件的文件名
        //filename: 'js/[name].js',
        publicPath: 'http://localhost:8888/build/',  //启动本地服务后的根目录
        //chunkFilename: 'appsetting.js',
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: "jsx!babel", include: /src/},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass")},
            { test: /\.(png|jpg|gif)$/, loader: 'url?limit=819200'}
        ]
    },

    babel: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: ['transform-runtime', ['import', {
          libraryName: 'antd',
          style: 'css'
        }]]
    },

    externals: {
       // don't bundle the 'react' npm package with our bundle.js
       // but get it from a global 'React' variable
       'react': 'React',
       'react-dom': 'ReactDOM',
       'redux': 'Redux',
       'react-redux': 'ReactRedux'
    },

    postcss: [
        require('autoprefixer')    //调用autoprefixer插件,css3自动补全
    ],

    devServer: {
        // contentBase: './src/views'  //本地服务器所加载的页面所在的目录
        port: 8887,
        colors: true,  //终端中输出结果为彩色
        historyApiFallback: true,  //不跳转
        inline: true  //实时刷新
    },

    plugins: [
        new ExtractTextPlugin('main.css'),
        /*new CommonsChunkPlugin({
           name: 'vendor',
           filename: 'vendor.js'
        }),*/
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: {
                except: ['$', 'exports', 'require']
            }
        })*/
    ]

}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new ExtractTextPlugin('main.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ];
    module.exports.devtool = false;
} else {
    module.exports.devtool = 'eval-source-map';
}
