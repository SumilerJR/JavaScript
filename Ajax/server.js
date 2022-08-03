// const { urlencoded } = require('express');
const { json } = require('express');
const express = require('express');

//创建app实例对象
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/src'));

app.get('/test_get', (request, response) => {
    console.log('有人请求test_get了，携带的query参数是', request.query);
    response.send('hello_test_get!!!');
})

app.get('/test_get2/:name/:age', (request, response) => {
    console.log('有人请求test_get2了，携带的params参数是', request.params);
    response.send('hello_test_get2');
})

app.get('/get_person', (request, response) => {
    console.log('有人请求get_person了');
    const person = { name: '晓飞', age: '18', sex: '女' };
    response.send(person);
})


app.post('/test_post', (request, response) => {
    console.log('有人请求test_post了', request.body);
    response.send('hello_test_post');
})

app.get('/get_person_delay', (request, response) => {
    console.log('有人请求get_person了');
    const person = { name: 'tom', age: '18', sex: '女' };
    setTimeout(() => {
        response.send(person);
    }, 3000)
})




app.listen(8080, (err) => {
    if (!err) {
        console.log('测试ajax请求的服务器开启成功了！测试地址如下');
        console.log('http://127.0.0.1:8080/1_ajax小试牛刀.html');
        console.log('http://127.0.0.1:8080/2_xhr的5种状态.html');
        console.log('http://127.0.0.1:8080/3_ajax_get请求.html');
        console.log('http://127.0.0.1:8080/4_ajax_post请求.html');
        console.log('http://127.0.0.1:8080/5_ajax_解析json数据.html');
        console.log('http://127.0.0.1:8080/6_ajax_处理IE浏览器get请求缓存问题.html');
        console.log('http://127.0.0.1:8080/7_ajax请求的异常与超时处理.html');
        console.log('http://127.0.0.1:8080/8_ajax取消请求.html');
        console.log('http://127.0.0.1:8080/9_避免多次重复请求.html');
        console.log('http://127.0.0.1:8080/10_jquery封装的ajax.html');
        console.log('http://127.0.0.1:8080/11_演示回调地狱.html');
    }

})