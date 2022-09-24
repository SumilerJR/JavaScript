/**
 * 1、该文件是webpack的配置文件，所有webpack的任务、用到的loader、plugins都要配置在这里
 * 2、该文件要符合CJS模块化规范
 */

//引入Node中一个内置的path模块，专门用于结局路径问题
const path = require('path');



//css相关loader的配置(可以用来写复用的loader)
const baseCssLoader = [];

//使用CJS的模块化规范，暴露一个对象，该对象就是webpack的详细配置对象（规则）
module.exports = {
    mode: 'development',//工作模式
    entry: './src/js/app.js',//入口
    // entry: { main: './src/js/app.js' },//可以用对象写法，main是别名
    output: { //输出
        path: path.resolve(__dirname, 'build/js'),//输出文件的路径
        filename: 'app.js',//输出文件的名字
    },
    //module.rules中配置一个一个的loader
    module: {
        rules: [
            //配置解析css
            {
                test: /\.css$/i,//匹配规则
                use: [
                    "style-loader",//创建style标签，将样式资源插入，添加到head中生效 
                    "css-loader"//将css文件变成commonjs模块加载到js中，里面的内容是样式字符串
                ],//使用两个loader，后面的loader先执行
            },
            //配置解析less
            {
                test: /\.less$/i,//匹配规则
                use: [
                    "style-loader",//创建style标签，将样式资源插入，添加到head中生效 
                    "css-loader",//将css文件变成commonjs模块加载到js中，里面的内容是样式字符串
                    "less-loader"//将less文件转为css文件
                ],//使用两个loader，后面的loader先执行
            },
        ],
    },
};