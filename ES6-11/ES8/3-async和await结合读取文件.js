//1. 引入 fs 模块
const fs = require("fs");

//读取『为学』
function readWeiXue() {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + "/resources/为学.md", (err, data) => {
            //如果失败
            if (err) reject(err);
            //如果成功
            resolve(data);
        });
    });
}

function readChaYangShi() {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + "/resources/插秧诗.md", (err, data) => {
            //如果失败
            if (err) reject(err);
            //如果成功
            resolve(data);
        });
    });
}

function readGuanShu() {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + "/resources/观书有感.md", (err, data) => {
            //如果失败
            if (err) reject(err);
            //如果成功
            resolve(data);
        });
    });
}

//声明一个 async 函数
async function main() {
    //获取为学内容
    let weixue = await readWeiXue();
    //获取插秧诗内容
    let chayang = await readChaYangShi();
    // 获取观书有感
    let guanshu = await readGuanShu();

    console.log(weixue.toString());
    console.log(chayang.toString());
    console.log(guanshu.toString());
    return guanshu;
}

main().then((val) => {
    console.log(val.toString());
});