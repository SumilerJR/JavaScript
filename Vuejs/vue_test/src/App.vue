<template>
	<div class="container">
		<Count></Count>
	</div>
</template>

<script>
	// import axios from "axios";
	import Count from "./components/Count";
	export default {
		name: "App",
		components: { Count },

		methods: {},
		mounted() {
			console.log(this);
		},
	};
</script>

<style lang="css">