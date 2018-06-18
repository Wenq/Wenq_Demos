//开发环境打包
const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
 
    /*入口*/
    // entry: [ 
	   //  'react-hot-loader/patch',
	   //  path.join(__dirname, 'src/index.js')
    // ],
    entry: {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    
    /*输出到dist文件夹，输出文件名字为bundle.js*/
    // output: {
    //     path: path.join(__dirname, './dist'),
    //     filename: 'bundle.js'
    // },
    // output: {
    //     path: path.join(__dirname, './dist'),
    //     filename: 'bundle.js',
    //     chunkFilename: '[name].js'
    // },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[hash].js', //这里应该用chunkhash替换hash. 如果用chunkhash，会报错。和webpack-dev-server --hot不兼容
        chunkFilename: '[name].[chunkhash].js'
    },

     /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
	 /*cacheDirectory是用来缓存编译结果，下次编译加速*/
	 module: {
	     rules: [
	     {
	         test: /\.js$/,
	         use: ['babel-loader?cacheDirectory=true'],
	         include: path.join(__dirname, 'src')
	     },
	     {
	     	test: /\.css$/,
	     	use: ['style-loader','css-loader']
	     },
	     {
	     	test: /\.(png|jpg|gif)$/,
	     	use:[
	     	{
	     		loader: 'url-loader',
	     		options: {
	     			//小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。
	     			limit: 8192
	     		}
	     	}
	     	]
	     }
	    ]
	 },

 	// plugins: [
    // 	new webpack.HotModuleReplacementPlugin() //模块热替换
    // ]

    plugins: [
    //这个插件，每次会自动把js插入到你的模板index.html里面去。
     new HtmlWebpackPlugin({
     	filename: 'index.html',
     	template: path.join(__dirname, 'src/index.html')
     }),
     new webpack.optimize.CommonsChunkPlugin({
     	name: 'vendor'
     })
    ],

     // hot: true //启用模块热替换
	devServer: {
        port: 8080,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '0.0.0.0'
    },

    //目录别名配置
     resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers'),
            reduxdir: path.join(__dirname, 'src/redux')
        }
    },

    devtool: 'inline-source-map'
};