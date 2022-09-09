<template>
  <div>
    <h2>学校名称：{{name | mySlice}}</h2>
    <h2>学校地址：{{address}}</h2>
    <button @click="test">点我测试hello</button>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: '北京大学旁边的清华大学',
      address: '北京',
    };
  },
  methods: {
    test() {
      this.hello();
    }
  }
};
</script>