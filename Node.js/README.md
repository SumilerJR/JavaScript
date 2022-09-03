## Day1

### 一、Node中函数的特点

#### Node中任何一个模块（js文件）都被一个外层函数所包裹

```
function (exports, require, module, __filename, __dirname) {}
```

- exports：用于支持CommonJs模块化规范的暴露语法

- require：用于支持CommonJs模块化规范的引入语法

- module：用于支持CommonJs模块化规范的暴露语法

- \__filename：当前运行文件的绝对路径__

- dirname：当前运行文件所在文件夹的绝对路径

#### 为什么要设计这个外层函数（这个外层函数有什么作用？）

1. 用于支持模块化语法

2. 隐藏服务器内部实现(从作用域角度去看)

### 二、Node中的global

#### 浏览器端，js由哪几部分组成？

1. BOM ----> window 浏览器对象模型 -------- 很多的API（location，history）

2. DOM ----> document 文档对象模型 ---------- 很多的API（对DOM的增删改查）

3. ES规范 -------------------- ES5、ES6.....

#### Node端，js由几部分组成？

1. 没有了BOM ----->  因为服务器不需要（服务端没有浏览器对象）

2. 没有了DOM ----->  因为没有浏览器窗口

3. 几乎包含了所有的ES规范

4. 没有了window，但是取而代之的是一个叫做global的全局变量。

```javascript
//在Node中禁止函数的this指向global，而是指向了一个空对象
console.log(this)//=> {}
console.log(global)//=> global对象
```

#### global的一些常用属性

- clearImmediate:清空立即执行函数

- clearInterval:清除循环定时器

- clearTimeout: 清除延迟定时器


- setImmediate:设置立即执行函数

- setInterval:设置循环定时器

- setTimeout: 设置延迟定时器

### 三、Node中的事件循环模型

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

- 第一个阶段：timers(定时器阶段--setTimeout,setInterval)

    1. 开始计时

    2. 执行定时器的回调

- 第二个阶段：pending callbacks (系统阶段)

- 第三个阶段：idle, prepare (准备阶段)

- 第四个阶段：poll(轮询阶段，核心)

    1. 如果回调队列里有待执行的回调函数
        - 从回调队列中取出回调函数，同步执行(一个一个执行)，直到回调队列为空了，或者达到系统最大限度。

    2. 如果回调队列为空

        1. 如果有设置过setImmediate
            - 进入下一个check阶段，目的：为了执行setImmediate所设置的回调。

        2. 如果未设置过setImmediate
            - 在此阶段停留，等待回调函数被插入回调队列。
            - 若定时器到点了，进入下一个check阶段，原因：为了走第五阶段，随后走第六阶段，随后第一阶段(最终目的)

- 第五个阶段：check (专门用于执行setImmediate所设置的回调)

- 第六个阶段：close callbacks (关闭回调阶段)

- process.nextTick() ---- 用于设置立即执行函数(“VIP”-----能在任意阶段优先执行)

### 四、包与npm包管理器

#### 什么是包？

我们电脑上的文件夹，包含了某些特定的文件，符合了某些特定的结构，就是一个包。

#### 一个标准的包，应该包含哪些内容？

1) package.json ------- 描述文件（包的 “说明书”，必须要有！！！）
2) bin -----------------可执行二进制文件
3) lib ---------------- 经过编译后的js代码
4) doc ---------------- 文档（说明文档、bug修复文档、版本变更记录文档）
5) test --------------- 一些测试报告

#### 如何让一个普通文件夹变成一个包？

让这个文件夹拥有一个：package.json文件即可,且package.json里面的内容要合法。
执行命令：npm init
包名的要求：不能有中文、不能有大写字母、同时尽量不要以数字开头、不能与npm仓库上其他包同名。

#### npm与node的关系？（npm：node package manager）

安装node后自动安装npm（npm是node官方出的包管理器，专门用于管理包）

#### npm的常用命令？

###### 一、【搜索】：

1. npm search xxxxx
2. 通过网址搜索：www.npmjs.com

###### 二、【安装】：(安装之前必须保证文件夹内有package.json，且里面的内容格式合法)

1. npm install xxxxx --save 或 npm i xxxx -S 或 npm i xxxx
   备注：
   (1).局部安装完的第三方包，放在当前目录中node_modules这个文件夹里
   (2).安装完毕会自动产生一个package-lock.json(npm版本在5以后才有)，里面缓存的是每个下载过的包的地址，目的是下次安装时速度快一些。
   (3).当安装完一个包，该包的名字会自动写入到package.json中的【dependencies(生产依赖)】里。npm5及之前版本要加上--save后缀才可以。

2. npm install xxxxx --save-dev 或 npm i xxxxx -D 安装包并将该包写入到【devDependencies(开发依赖中)】
   备注：什么是生产依赖与开发依赖？
    1. 只在开发时(写代码时)时才用到的库，就是**开发依赖** ----- 例如：语法检查、压缩代码、扩展css前缀的包。
    2. 在生产环境中(项目上线)不可缺少的，就是**生产依赖** ------ 例如：jquery、bootStrap等等。
    3. 注意：某些包即属于开发依赖，又属于生产依赖 -------例如：jquery。

3. npm i xxxx -g  **全局安装**xxxx包（一般来说，带有指令集的包要进行全局安装，例如：browserify、babel等）
   全局安装的包，其指令到处可用，如果该包不带有指令，就无需全局安装。
   查看全局安装的位置：npm root -g

4. npm i xxx@yyy :安装xxx包的yyy版本

5. npm i ：安装package.json中声明的所有包

###### 三、【移除】：

npm remove xxxxx 在node_module中删除xxxx包，同时会删除该包在package.json中的声明

###### 四、【其他命令】：

1. npm aduit fix :检测项目依赖中的一些问题，并且尝试着修复。

2. npm view xxxxx versions :查看远程npm仓库中xxxx包的所有版本信息

3. npm view xxxxx version :查看npm仓库中xxxx包的最新版本

4. npm ls xxxx :查看我们所安装的xxxx包的版本

###### 五、【关于版本号的说明】：

- "^3.x.x" ：锁定大版本，以后安装包的时候，保证包是3.x.x版本，x默认取最新的。
- "~3.1.x" ：锁定小版本，以后安装包的时候，保证包是3.1.x版本，x默认取最新的。
- "3.1.1" ：锁定完整版本，以后安装包的时候，保证包必须是3.1.1版本。

### 五、cnpm（淘宝镜像npm）的使用

#### cnpm的简介与使用

##### 1、国内使用npm存在的问题

* 安装npm后，每次我们安装包时，我们的电脑都要和npm服务器进行对话，去npm仓库获取包。
* npm默认的仓库地址为：http://registry.npmjs.org
* 查看当前npm仓库地址命令：``` npm config get registry ```，提示如下图：
  ![Alt text](.\day01\5.cnpm的使用\cnpm.png)

* 因为npm的远程服务器在国外，所以有时候难免出现访问过慢，甚至无法访问的情况。
* 为了解决这个问题，我们有以下几个解决办法

##### 2、使用淘宝的cnpm代替npm

>
淘宝为我们搭建了一个国内的npm服务器，它目前是每隔10分钟将国外npm仓库的所有内容“搬运”回国内的服务器上，这样我们直接访问淘宝的国内服务器就可以了，它的地址是：https://registry.npm.taobao.org

###### 使用方法：

- 第一种：直接安装cnpm

安装淘宝提供的cnpm，并更改服务器地址为淘宝的国内地址，
命令：``` npm install -g cnpm --registry=https://registry.npm.taobao.org ```，以后安装直接采用```cnpm```替代```npm```，
例如原生npm命令为：```npm install uniq --save```，cnpm命令为：```cnpm install uniq --save```

- 第二种：替换npm仓库地址为淘宝镜像地址（推荐）

命令：```npm config set registry https://registry.npm.taobao.org```，
查看是否更改成功：```npm config get registry ```，以后安装时，依然用npm命令，但是实际是从淘宝国内服务器下载的

### 六、yarn的使用

#### yarn的简介与使用

> Yarn发布于2016年10月，截至当前2019年1月，gitHub上的Start数量为：34.3k，已经超过npm很多了，
> yarn使用本地缓存，有时甚至无需互联网连接就能安装本地已经缓存过的依赖项，安装方法：```npm install -g yarn```

##### 特别注意！

由于yarn的全局安装位置与npm不同，所以要配置yarn的全局安装路径到环境变量中，否则全局安装的包不起作用。
具体操作如下：
> 安装yarn后分别执行 ```yarn global dir```命令，```yarn global bin```命令。
> 将上述两步返回的路径配置到电脑环境变量中即可。

#### yarn命令与npm命令的对应关系如下：

##### 初始化项目:

	yarn init -y
	npm init -y

##### 下载项目的所有声明的依赖:

	yarn
	npm install

##### 下载指定的运行时依赖包:

	yarn add xxxx@3.2.1
	npm install xxxxx@3.2.1 -S

##### 下载指定的开发时依赖:

	yarn add xxxxx@3.2.1 -D
	npm install xxxxx@3.2.1 -D

##### 全局下载指定包:

	yarn global add xxxxxx
	npm install xxxxxxx -g

##### 删除依赖包:

	yarn remove xxxxx
	yarn global remove xxxxxx
	npm remove xxxxxxx -g

##### 查看某个包的信息:

	yarn info xxx
	npm info xxx

##### 设置淘宝镜像:

	yarn config set registry https://registry.npm.taobao.org
	npm config set registry https://registry.npm.taobao.org

## Day2

### 1、Buffer缓冲器

#### 1.Buffer是什么？

1. 它是一个【类似于数组】的对象，用于存储数据（存储的是二进制数据）。
2. Buffer的效率很高，存储和读取很快，它是直接对计算机的内存进行操作。
3. Buffer的大小一旦确定了，不可修改。
4. 每个元素占用内存的大小为1字节。
5. Buffer是Node中的非常核心的模块，无需下载、无需引入,直接即可使用

#### 2.进制相关

    十六进制：00 -------- ff
    二进制：00000000 ------ 11111111

#### 3. 计算机单位换算

      8位(bit) = 1字节(Byte)
      1024Byte = 1Kb
      1024KB = 1Mb
      1024Mb = 1Gb
      .....

创建一个Buffer的实例对象--------性能特别差------1.在堆里开辟空间。2.清理

```JavaScript
let buf = new Buffer(10)
console.log(buf)
```

创建一个Buffer的实例对象--------性能比new Buffer()稍强一点------在堆中开辟一块空间(该块空间没有人用过)

```JavaScript
let buf2 = Buffer.alloc(10)
console.log(buf2)
```

创建一个Buffer的实例对象-------性能最好的-------在堆里开辟空间(该块空间可能留有残留)

```JavaScript
/*
* 1.输出的Buffer为什么不是二进制？ ----- 输出的是16进制，但是存储的是二进制吗，输出的时候会自动转16进制。
* 2.输出的Buffer不为空？ ----- 在堆里开辟空间，可能残留着别人用过的数据，所以allocUnsafe。
*   如在申请手机号的时候，可能是全新的号码，也有可能是回收号，在网上残留别人使用过的信息
* */
let buf3 = Buffer.allocUnsafe(10)
console.log(buf3)
```

将数据存入一个Buffer实例

```JavaScript
let buf4 = Buffer.from('hello atguigu')
console.log(buf4)
/*
* 1.输出的为什么不是我们曾经存入的字符串？用户存储的不一定是字符串，可能是媒体类型的文件
* 2.如何能够让输出的东西是字符串(我们能看懂的)？toString()
* */
```

### 2、Node中的文件操作（写入）

1. Node中的文件系统：
    - 在NodeJs中有一个文件系统，所谓的文件系统，就是对计算机中的文件进行增删改查等操作。
    - 在NodeJs中，给我们提供了一个模块，叫做fs模块(文件系统)，专门用于操作文件。
    - fs模块是Node的核心模块，使用的时候，无需下载，直接引入。

2. 异步文件写入 （简单文件写入）

   ```
   fs.writeFile(file, data[, options], callback)
   ```

    1. file：要写入的文件路径+文件名+后缀
    2. data：要写入的数据
    3. options：配置对象(可选参数)

        - encoding:设置文件的编码方式，默认值：utf8(万国码)

        - mode:设置文件的操作权限，默认值是：0o666 = 0o222 + 0o444
            - 0o111:文件可被执行的权限 .exe .msc 几乎不用，linux有自己一套操作方法。
            - 0o222:文件可被写入的权限
            - 0o444:文件可被读取的权限

        - flag:打开文件要执行的操作，默认值是'w'
            - a ：追加(append)
            - w ：写入(write)

    4. callback：回调函数

        - err：错误对象(在Node中有这样一个原则：错误优先)

    ```javascript
    //引入内置的fs模块
    let fs = require('fs')
    
    //调用writeFile方法`
    fs.writeFile(__dirname + '/demo.txt', 'kobe,123', {mode: 0o666, flag: 'w'}, err => {
        if (err) console.log('文件写入失败', err)
        else console.log('文件写入成功')
    })
    ```

3. 异步文件写入 （流式文件写入）

   创建一个可写流
    ```
    fs.createWriteStream(path[, options])
    ```
    - path:要写入文件的路径+文件名+文件后缀
    - options：配置对象（可选参数）
        - flags:
        - encoding :
        - fd : 文件统一标识符，linux下文件标识符
        - mode :
        - autoClose : 自动关闭 --- 文件，默认值：true
        - emitClose : 关闭 --- 文件，默认值：false
        - start : 写入文件的起始位置(偏移量)

   ```JavaScript
   let fs = require('fs')
   
   //创建一个可写流----水管到位了
   let ws = fs.createWriteStream(__dirname + '/demo2.txt', {start: 10})
   
   //只要用到了流，就必须监测流的状态
   ws.on('open', function () {
       console.log('可写流打开了')
   })
   ws.on('close', function () {
       console.log('可写流关闭了')
   })
   
   //使用可写流写入数据
   ws.write('写入了\n')
   // ws.close() //如果在Node的8版本中，使用此方法关闭流会造成数据丢失
   ws.end() //在Node的8版本中，要用end方法关闭流
   ```

### 3、Node中的文件操作（ 读取）

1. 简单文件读取

   ```
    fs.readFile(path[, options], callback)
   ```

    - path：要读取文件的路径+文件名+后缀
    - options：配置对象（可选）
    - callback：回调
        - err：错误对象
            - data：读取出来的数据

    ```JavaScript
    //简单文件写入和简单文件读取，都是一次性把所有要读取或要写入的内容加到内存中红，容易造成内存泄露。
    
    let fs = require('fs')
    
    fs.readFile(__dirname + '/demo.txt', function (err, data) {
        if (err) console.log(err)
        //为什么读取出来的东西是Buffer？ 用户存储的不一定是纯文本
        else console.log(data.toString())
    })
    ```

2. 流式文件读取

    ```
        fs.createReadStream(path[, options])
    ```
    - path:尧都区的文件路径+文件名+后缀
    - options:
        - flags
        - encoding
        - fd
        - mode
        - autoClose
        - emitClose
        - start ：起始偏移量
        - end : 结束偏移量
        - highWaterMark：每次读取数据的大小，默认值是64 * 1024

    ```JavaScript
    let {createReadStream, createWriteStream} = require('fs')
    
    //创建一个可读流
    let rs = createReadStream(__dirname + '/demo2.txt', {
        highWaterMark: 10 * 1024 * 1024,
        //start:60000,
        //end:120000
    })
    
    //创建一个可写流
    let ws = createWriteStream(__dirname + '/demo.txt')
    
    //只要用到了流，就必须监测流的状态
    rs.on('open', function () {
        console.log('可读流打开了')
    })
    rs.on('close', function () {
        console.log('可读流关闭了')
        ws.close()
    })
    ws.on('open', function () {
        console.log('可写流打开了')
    })
    ws.on('close', function () {
        console.log('可写流关闭了')
    })
    
    //给可读流绑定一个data事件，就会触发可读流自动读取内容。
    rs.on('data', function (data) {
        //Buffer实例的length属性，是表示该Buffer实例占用内存空间的大小
        console.log(data.length) //输出的是65536，每次读取64KB的内容
        ws.write(data)
        console.log(data.toString())
        //ws.close() //若在此处关闭流，会写入一次，后续数据丢失
    })
    //ws.close() //若在此处关闭流，导致无法写入数据
    
    //小文件可以直接用简单文件的读写，大文件最好用流式的文件读写
    ```
    
### 4、MongoDB

#### 安装

安装好复杂，参考了下面两个文章总算完成了（吧）

[安装MongoDB](https://blog.csdn.net/weixin_42545402/article/details/124520489)

[MongoDB 6.0版安装教程及安装MongoDB提示权限不足的解决方法](https://blog.csdn.net/weixin_70319460/article/details/126436904)


#### 常见端口号

  | 端口     | 作用                |
  | :------: | :------------------ |
  | 21端口 | FTP 文件传输服务 |
  | 22端口 | SSH 端口 |
  | 23端口 | TELNET 终端仿真服务 |
  | 25端口 | SMTP 简单邮件传输服务 |
  | 53端口 | DNS 域名解析服务 |
  | 80端口 | HTTP 超文本传输服务 |
  | 110端口 | POP3 “邮局协议版本3”使用的端口 |
  | 443端口 | HTTPS 加密的超文本传输服务 |
  | 1433端口 | MS SQL*SERVER数据库 默认端口号 |
  | 1521端口 | Oracle数据库服务 |
  | 1863端口 | MSN Messenger的文件传输功能所使用的端口 |
  | 3306端口 | MYSQL 默认端口号 |
  | 3389端口 | Microsoft RDP 微软远程桌面使用的端口 |
  | 5631端口 | Symantec pcAnywhere 远程控制数据传输时使用的端口 |
  | 5632端口 | Symantec pcAnywhere 主控端扫描被控端时使用的端口 |
  | 5000端口 | MS SQL Server使用的端口 |
  | 27017端口 | MongoDB实例默认端口 |


#### MongoDB基本命令

1. db : 查看当前在操作哪一个数据库
2. show dbs ：查看数据库列表（一共有几个数据库，备注：如果数据库为空，不出现在列表中）
3. use test :切换到test数据库，如果不存在，则创建一个test库
4. db.students.insert() ：向当前数据库的students集合中插入一个文档。
5. show collections ：展示当前数据库中所有的集合。



## Day4

### 1、node原生服务器

```JavaScript
/*
* 不借助任何第三方库，去搭建Node原生服务器
* */

//1.引入Node内置的http模块
let http = require('http')
//引入一个内置模块，用于解析key=value&key=value.....这种形式的字符串为js中的对象
/*
备注：
  1.key=value&key=value.....的编码形式：urlencoded编码形式。
  2.请求地址里携带urlencoded编码形式的参数，叫做：查询字符串参数(query参数)。
* */
//引入的qs是一个对象，该对象身上有着很多有用的方法，最具代表性的：parse()
let qs = require('querystring')

//2.创造一个“服务员” ---- 创建服务对象
let server = http.createServer(function (request, response) {
  //让服务员开始干活，获取客人点的菜单
  /*
  * (1).request:请求对象，里面包含着客户端给服务器的“东西”
  * (2).response：响应对象，里面包含着服务器要返回给客户端的“东西”
  * */
  //获取客户端携带过来的urlencoded编码形式的参数
  let params = request.url.split('?')[1] //name=zhangsan&age=18
  //console.log(params)
  let objParams = qs.parse(params) //
  //console.log(objParams)
  let { name, age } = objParams

  response.setHeader('content-type', 'text/html;charset=utf-8')
  response.end(`<h1>你好${name},你的年龄是${age}</h1>`)
})

//3.指定服务器运行的端口号(绑定端口监听)
server.listen(3000, function (err) {
  if (!err) console.log('服务器启动成功了', 'http://127.0.0.1:3000/');
  else console.log(err);
})
```



