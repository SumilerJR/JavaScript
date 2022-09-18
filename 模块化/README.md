### ES6模块化操作流程

1. 创建文件结构如下
    - 3 ES6 modular
    - src
    - app.js
    - modulel.js
    - index.html
    - .babelrc,内容如下：
      {
      "presets": ["es2015"]
      }

2. 准备相关包
   npm install babel-cli browserify -g
   npm install babel-preset-es2015

3. babel编译为s5,命令如下：babe1./src-d./build
   browserify继续编译，命令如下：browserify,/build/app.js-o·/build/build.js
   备注：命令不要记！！我们学习的是模块化的暴露、引入语法，不是命令，以后也不敲命令。

4. index.html页面中引入build/bui1d.js

### 1、模块化入门

1. 什么是模块化
    - 将一个复杂的成像依据一定规则拆分成单个文件，最终组合在一起
    - 这些拆分的文件就是模块，模块内部数据是私有的，只是向外部暴露一些方法与外部其他模块通信
2. 为什么要模块化
    - 降低复杂度，提高解耦性
    - 避免命名冲突
    - 更好的分离，按需加载
    - 更高复用性，高维护性
3. 模块化带来的问题
    - 请求过多
    - 依赖模糊 （合）
    - 难以维护

先拆再合

### 2、模块化规范

一个大的项目必定会使用模块化技术，使用模块化就会使用相应的模块化规范
现在比较流行的模块化规范有两种：CommonJS、 ES6

#### CommonJS（双端）

1. 规范
    1. 官网: http://wiki.commonjs.org/wiki/modules
    
    2. 每个文件都是一个模块
    
    3. CommonJS 模块化的代码既可以在服务端运行，也可以在浏览器端运行
    
    4. 服务器端：模块化代码可以直接运行
    
       CommonJS规范和Node关系
    
       - 我们需要知道CommonJS是一个规范，最初提出来是在浏览器以外的地方使用，并且当时被命名为**ServerJS**，后来为了体现它的广泛性，修改为**CommonJS**，平时我们也会简称为CJS
       - Node是CommonJS在服务器端一个具有代表性的实现；
       - Browserify是CommonJS在浏览器中的一种实现；
       - webpack打包工具具备对CommonJS的支持和转换
    
    5. 浏览器端：模块化的代码要经过 Browserify( http://browserify.org) 编译。


2. 基本语法

    - export 模块暴露数据

      ```js
      第一种方式：module.exports = value
      第二种方式：module.xxx = value
      ```

    - import引入模块

      ```js
      引入第三方模块；require(xxx),xxx为模块名
      引入自定义模块：require(xxx) xxx为模块文件路径
      ```

    - 内置关系

      ![](https://img-blog.csdnimg.cn/d99367c63795478b86b7489ee407aff5.png)


3. 同时暴露多个
    - module1.js

      ```js
      //  module1 使用module.exports=xxx暴露
      //  module.exports 和exports不能混用，若混用了，以 module.exports为主
      const data='athui'
      const msg='hello'
      module.exports={
          showData(){
              console.log(data);
          },
          showMsg(){
              console.log(msg);
          }
      }
      exports.x = 100// 不起效
      ```

    - module2.js

      ```js
      exports.sum = function (a, b) {
          console.log(a + b);
      }
      exports.sub = function (a, b) {
          console.log(a - b);
      }
      exports.a = 1;
      
      ```

    - app.js

      ```js
      // # 引入的内容是什么，取决的暴露的是什么
      const { showData, showMsg } = require('./module1') //引入自定义模块
      const { sum, sub, a } = require('./module2')
      const uniq = require('uniq') //引入第三方包
      const arr= [1,2,10,5]
      console.log(uniq(arr)); //去重 字典排序1 10 2 5    
      showData();
      showMsg();
      sum(1, 4);
      sub(4, 7);
      console.log(a);
      
      ```

4. 运行
   【node环境下运行】node app.js
   【浏览器环境下运行】执行 index.html
    - **全局**安装browserify npm i browserify -g

    - 编译指定文件 browerserify ./app.js -o ./build.js

    - 在html页面种引入build.js

      ```html
      <script type="text/javascript" src=".bulid.js"></script>
      ```

#### ES6 模块化 （常用）

1. 规范
    - 每个文件都是一个模块
    - 要借助Babel和Browserify依次编译代码，才能在浏览器端运行
    - Babel中文网：https://www.babeljs.cn/
      Babel可以把es6转成es5


2. 基本语法

   模块暴露数据
    1. 分别暴露 (按需暴露) export 暴露内容
   
    2. 统一暴露 export {暴露内容1，暴露内容2}
   
    3. 默认暴露 export defalut 暴露内容
       补充：准备相关依赖包（为编译代码做准备）
       全局安装：babel-cli、Browserify ：npm install babel-cli browserify -g
       局部安装：babel-preset-es2015： npm install babel-preset-es2015
       建立.babel文件

       ```json
       {
           "presets": [
               "es2015"
           ]
       }
       ```
   
       执行`babel ./ -d`
       翻译 `browserify ./build/app.js -o ./build/build.js`
   
       
   
   - 分别暴露 (按需暴露)
   
     ```js
     /*
         module1中使用【分别暴露】
     */
     export const data = 'atguigu';
     export const msg = 'hello';
     
     export function showData() {
         console.log(data);
     }
     
     export function showMsg() {
         console.log(msg);
     }
     
     ```
   

   - 统一暴露 export {暴露内容1，暴露内容2}
   
     ```js
     /*
         module3中使用 【统一暴露】
     */
     const school = '尚硅谷'
     const person = {
         name: '老刘',
         age: 19,
         sex: '女'
     }
     function getLaoliu() {
         console.log(person);
     }
     
     // 统一暴露(精简版)
     export { school, person, getLaoliu };
     
     // 统一暴露(完整版)
     // export { school as a, person as b, getLaoliu as c };
     ```
   
   - 默认暴露 (适合只暴露一个数据) 只能暴露一次
   
     ```js
     /*
         module4中使用 【默认暴露】，只能暴露一次
     */
     export default {
         name: "wc",
         age: 5,
     }
     ```
   
   - 同时使用
   
     ```js
     // 使用【分别暴露】
     export const teacher1 = { name: "强哥", age: 15 }
     export const teacher2 = { name: "歌神", age: 17 };
     
     // 使用【统一暴露】
     const stu1 = { name: "王宇", age: 18 }
     const stu2 = { name: "宇航", age: 19 };
     export { stu1, stu2 };
     
     // 使用【默认暴露】
     export default {
         school: '尚硅谷',
         address: '宏福科技园',
         subjects: ['前端', 'Java', '大数据']
     }
     ```
   
   - 引入方式
   
   - app.js
   
     ```js
     // 引入【分别暴露】的模块，这里不是解构赋值，分别赋值是分别接收
     import { data, msg, showData, showMsg } from './module1';
     
     // 引入【分别暴露】的模块 + 重命名
     import { data as data2 } from './module2';
     
     // 引入【分别暴露】的模块 + 打包引入
     import * as module1 from './module1';
     
     // 引入【统一暴露】的模块(和上面三种引入方式相同)
     import { school as d, getLaoliu, person } from './module3';
     
     // 引入【默认暴露】的模块
     import module4 from './module4';
     
     // 引入
     import module5, { teacher1, teacher2, stu1, stu2 } from './module5';
     
     console.log(module1);//是个对象
     console.log(data);
     console.log(data2);//as改了个名字
     console.log(msg);
     showData();
     showMsg();
     
     console.log(d);
     getLaoliu();
     console.log(person);
     
     console.log(module4);
     
     console.log("===========");
     console.log(module5);
     console.log(teacher1, teacher2);
     console.log(stu1, stu2);
     ```
   
     引入完成之后记得先编译构建再运行新的app.js

