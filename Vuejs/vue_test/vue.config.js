const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,//关闭 语法检查
  // 开启代理服务器（方式一）
  // devServer: {
  //   proxy: 'http://localhost:5000'
  //   //https://cli.vuejs.org/zh/config/#devserver-proxy
  // }
  //开启代理服务器（方式二）
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        ws: true,//用于支持websocket
        changeOrigin: true,//用于控制请求头中的host值（是否修改请求的端口号）
        pathRewrite: { '^/api': '' }//重写请求路径，实现多路径请求
      },
      '/demo': {
        target: 'http://localhost:5001',
        ws: true,//用于支持websocket
        changeOrigin: true,//用于控制请求头中的host值（是否修改请求的端口号）
        pathRewrite: { '^/demo': '' }//重写请求路径，实现多路径请求
      },
    }
  }
});
