## 概念
### babel

Babel是将ES6及以上版本的代码转换为ES5的工具
Babel 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行。这意味着，你可以用 ES6 的方式编写程序，又不用担心现有环境是否支持
```Javascript
// 转码前
input.map(item => item + 1);

// 转码后
input.map(function (item) {
  return item + 1;
});
```
上面的原始代码用了箭头函数，Babel 将其转为普通函数，就能在不支持箭头函数的 JavaScript 环境执行了。

下面的命令在项目目录中，安装 Babel。
```
$ npm install --save-dev @babel/core
```


### browserify 

Browserify 可以让你使用类似于 node 的 require() 的方式来组织浏览器端的 Javascript 代码，通过预编译让前端 Javascript 可以直接使用 Node NPM 安装的一些库。
https://baike.baidu.com/item/browserify/16823990

### nodemon

检测项目中的所有文件，一旦发现文件有改动，nodemon会自动重启服务