//定义一个BooK类
define(function(require, exports, module){
	function Book(name, price){
		this.name=name;
		this.price=price;
	}
	module.exports=Book;
	Book.prototype.getName = function() {
		return this.name;
	};
	Book.prototype.setName=function(name){
		this.name=name;
	};
	Book.prototype.setPrice=function(price){
		this.price=price;
	};
	Book.prototype.getPrice=function(){
		return this.price;
	};
});