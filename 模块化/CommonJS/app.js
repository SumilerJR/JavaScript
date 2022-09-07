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
