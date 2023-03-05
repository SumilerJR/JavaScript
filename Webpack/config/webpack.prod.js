/**
 * 1、该文件是webpack的配置文件，所有webpack的任务、用到的loader、plugins都要配置在这里
 * 2、该文件要符合CJS模块化规范
 */

//引入Node中一个内置的path模块，专门用于结局路径问题
const path = require('path');
//引入html-webpack-plugin插件，用于加工html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 引入mini-css-extract-plugin插件，用于提取css为单独文件，
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


//css相关loader的配置(可以用来写复用的loader)————由于数组里有MiniCssExtractPlugin.loader，所以要在其引入之后再写该数组
const baseCssLoader = [MiniCssExtractPlugin.loader, "css-loader"];

//使用CJS的模块化规范，暴露一个对象，该对象就是webpack的详细配置对象（规则）
module.exports = {
    mode: 'development',//工作模式
    entry: './src/js/app.js',//入口
    // entry: { main: './src/js/app.js' },//可以用对象写法，main是别名
    output: { //输出
        path: path.resolve(__dirname, '../build'),//输出文件的路径
        filename: 'js/app.js',//输出文件的名字
        publicPath: '/build/'
    },
    //module.rules中配置一个一个的loader
    module: {
        rules: [
            //配置解析css
            {
                test: /\.css$/i,//匹配规则
                use: [
                    // "style-loader",//创建style标签，将样式资源插入，添加到head中生效
                    // "css-loader"//将css文件变成commonjs模块加载到js中，里面的内容是样式字符串
                    ...baseCssLoader//用数组包装进行简化
                ],//使用两个loader，后面的loader先执行
            },
            //配置解析less
            {
                test: /\.less$/i,//匹配规则
                use: [
                    // "style-loader",//创建style标签，将样式资源插入，添加到head中生效
                    // "css-loader",//将css文件变成commonjs模块加载到js中，里面的内容是样式字符串
                    // "less-loader"//将less文件转为css文件
                    ...baseCssLoader, "less-loader"
                ],//使用两个loader，后面的loader先执行
            },
            //配置解析《样式》中的图片（只是样式中的！）
            {
                test: /\.(png|jpg|gif|bmp)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        outputPath: 'imgs',//配置图片加工后存放的位置
                        // publicPath: '/build/imgs',//配置图片引入时前缀路径
                        esModule: false,//背景图片显示background-image: url([object Module])
                        name: '[hash:5].[ext]',//配置生成图片的名字+后缀
                        limit: 8 * 1024,//图片大小小于8kb时将图片转为base64编码
                    }
                }],
            },
            //配置解析html中的图片
            {
                test: /\.html$/i,
                loader: ["html-loader"],
            },
            //配置解析字体文件
            {
                exclude: /\.(html|css|less|js|png|jpg|bmp|gif|json)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'media',//配置图片加工后存放的位置
                        esModule: false,//背景图片显示background-image: url([object Module])
                        name: '[hash:5].[ext]',//配置生成图片的名字+后缀
                    }
                }],
            },
            // 配置解析
            {
                test: /\.css$/i,
                use: [...baseCssLoader],
            },
        ],
    },
    //plugins中专门用于配置插件，插件必须经过实例化这一环节
    plugins: [
        // 实例化HtmlWebpackPlugin
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 实例化MiniCssExtractPlugin
        new MiniCssExtractPlugin({
            filename: '/css/index.css',
        })
    ],

    // //和五大核心概念是平级的
    // devServer: {
    //     port: 5000,//开启服务器的端口号
    //     open: true,//自动打开浏览器
    //     hot: true,//开启模块热更新（热模替换）
    // }

};