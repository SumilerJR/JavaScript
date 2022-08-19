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