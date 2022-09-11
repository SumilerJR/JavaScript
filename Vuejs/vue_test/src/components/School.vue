<template>
  <div class="demo">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
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
};
</script>

<style scoped>
.demo {
  background: skyblue;
}
</style>