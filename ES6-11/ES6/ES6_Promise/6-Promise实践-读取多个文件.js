//引入 fs 模块
const { rejects } = require("assert");
const fs = require("fs");
const { dirname, resolve } = require("path");

// fs.readFile('./resources/为学.md', (err, data1) => {
//     fs.readFile('./resources/插秧诗.md', (err, data2) => {
//         fs.readFile('./resources/观书有感.md', (err, data3) => {
//             let result = data1 + '\r\n' + data2 + '\r\n' + data3;
//             console.log(result);
//         });
//     });
// });

//使用 promise 实现
const p = new Promise((resolve, reject) => {
    fs.readFile(__dirname + "/resources/为学.md", (err, data) => {
        resolve([data]);
    });
}).then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + "/resources/插秧诗.md", (err, data) => {
            // resolve([value, data]);
            value.push(data);
            resolve(value);
        });
    });
}).then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + "/resources/观书有感.md", (err, data) => {
            //压入
            value.push(data);
            resolve(value);
        });
    });
}).then(value => {
    console.log(value.join('\r\n'));
});


// const p = new Promise((resolve, reject) => {
//     fs.readFile(__dirname + "/resources/为学.md", (err, data) => {
//         resolve([data]);
//     });
// }).then(value => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(__dirname + "/resources/插秧诗.md", (err, data) => {
//             // resolve([value, data]);
//             value.push(data);
//             resolve(value);
//         });
//     });
// }).then(value => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(__dirname + "/resources/观书有感.md", (err, data) => {
//             //压入
//             value.push(data);
//             resolve();
//         });
//     }).then(() => {
//         return value;
//     });
// }).then(value => {
//     console.log(value.join('\r\n'));
//     console.log(value);
// });

// const p = new Promise((resolve, reject) => {
//     console.log(1);
//     resolve(1);
// }).then(value => {
//     console.log(value);
//     return 2;
// }).then(value => {
//     console.log(value);
//     return 3;
// }).then(value => {
//     console.log(value);
// });
// console.log(p);