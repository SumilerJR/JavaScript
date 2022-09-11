<template>
	<div>
		<h1 class="title">你好</h1>
		<Student></Student>
		<School></School>
	</div>
</template>

<script>
	//引入School组件
	import School from "./components/School";
	import Student from "./components/Student";

	export default {
		name: "App",
		components: { Student, School },
	};
</script>

<style scoped>
	.title {
		color: red;
	}
</style>