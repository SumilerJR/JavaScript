### ES6模块化操作流程
 1.创建文件结构如下
    -3 ES6 modular
        -src
            -app.js
            -modulel.js
            -index.html
        -.babelrc,内容如下：
        {
            "presets": ["es2015"]
        }

 2.准备相关包
  npm install babel-cli browserify -g 
  npm install babel-preset-es2015

 3.babel编译为s5,命令如下：babe1./src-d./build
   browserify继续编译，命令如下：browserify,/build/app.js-o·/build/build.js
   备注：命令不要记！！我们学习的是模块化的暴露、引入语法，不是命令，以后也不敲命令。
   
 4.index.html页面中引入build/bui1d.js