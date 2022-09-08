<template>
  <div>
    <Student name="李四" sex="女" :age="18"></Student>
    <Student name="王五" sex="男" :age="28"></Student>
  </div>
</template>

<script>
//引入School组件
import Student from "./components/Student.vue";

export default {
  name: "App",
  components: { Student },
};
</script>
