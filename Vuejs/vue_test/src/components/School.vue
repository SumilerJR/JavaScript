<template>
  <div>
    <h2 @click="showName">学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
//引入一个混合
import { mixin, mixin2 } from '../mixin'
export default {
  name: "School",
  mounted() {
    console.log('你好啊！！！！！！！！！');//会叠加
  },
  data() {
    return {
      name: '北京大学',
      address: '北京',
      x: 666//会覆盖
    };
  },
  mixins: [mixin, mixin2],
};
</script>