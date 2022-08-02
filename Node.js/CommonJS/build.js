(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// # 引入的内容是什么，取决的暴露的是什么
const { showData, showMsg } = require('./module1') //引入自定义模块
const { sum, sub, a } = require('./module2')
const uniq = require('uniq') //引入第三方包
const arr = [1, 4, 2, 3, 7, 9, 8, 11, 10, 5]
console.log(uniq(arr)); //去重 字典排序1 10 2 5    
showData();
showMsg();
sum(1, 4);
sub(4, 7);
console.log(a);

},{"./module1":2,"./module2":3,"uniq":4}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
exports.sum = function (a, b) {
    console.log(a + b);
}
exports.sub = function (a, b) {
    console.log(a - b);
}
exports.a = 1;

},{}],4:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}]},{},[1]);
