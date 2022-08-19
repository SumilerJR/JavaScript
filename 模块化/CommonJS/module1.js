//  module1 使用module.exports=xxx暴露
//  module.exports 和exports不能混用，若混用了，以 module.exports为主
const data='athui'
const msg='hello'
module.exports={
	showData(){
		console.log(data);
	},
	showMsg(){
		console.log(msg);
	}
}
exports.x = 100// 不起效