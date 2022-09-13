<template>
	<section class="jumbotron">
		<h3 class="jumbotron-heading">搜索Github用户</h3>
		<div>
			<input type="text" placeholder="输入搜索的名称" v-model="keyWord" @keydown.enter="searchUsers()">&nbsp;
			<button @click="searchUsers()">搜索</button>
		</div>
	</section>
</template>

<script>
	import axios from "axios";
	export default {
		name: "Search",
		data() {
			return {
				keyWord: "",
			};
		},
		methods: {
			searchUsers() {
				//请求前更新List的数据
				this.$bus.$emit("updataListData", {
					isFirst: false,
					isLoading: true,
					errMsg: "",
					users: [],
				});
				axios
					.get(`https://api.github.com/search/users?q=${this.keyWord}`)
					.then(
						(response) => {
							// console.log("成功", response.data);
							//请求成功更新List的数据
							this.$bus.$emit("updataListData", {
								isLoading: false,
								errMsg: "",
								users: response.data.items,
							});
						},
						(error) => {
							// console.log("请求失败了！", error.messages);
							//请求失败更新List的数据
							this.$bus.$emit("updataListData", {
								isLoading: false,
								errMsg: error,
								users: [],
							});
						}
					);
			},
		},
	};
</script>
