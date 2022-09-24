/**
 * app.js是webpack的入口，所有外部文件(js、json、css、less等等)都需要在这里引入使用
 */
import { sum, sub } from './module1';
import { data, message } from './module2';
import school from './module3';

// ES6模块化对于JSON文件是默认暴露，JSON文件无需写暴露语法，自动为默认暴露
import json from '../json/test.json';

// 引入css
//ERROR:You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
import '../css/demo.css';



sum(1, 2);
sub(3, 4);
console.log(data);
console.log(message);
console.log(school);

// webpack不会将es6转为es5，只能进行模块化处理，即不会干babel的活
const a = () => {
    console.log('@2022年9月24日@');
};
const { address } = school;

console.log(json);
