define(function(require, exports, module){
	function User(name){
		this.name=name;
	}
	module.exports=User;
	User.prototype.setSex=function setSex(sex){
		this.sex=sex;
	};
	User.prototype.getSex=function getSex(){
		return this.sex;
	};
});