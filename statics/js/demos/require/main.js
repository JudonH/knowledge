//进行配置
requirejs.config({
	//定义基础url
	baseUrl:'/!__.__!/js/',
	//定义需要加载的js的url
	paths:{
		jquery:'public/jquery',
		test1:'demos/require/test1',
		test2:'demos/require/test2',
		test3:'demos/require/test3',
		getUser:'demos/require/getUser',
		initPerson:'demos/require/Person'
	}
});
//加载jquery
require(['jquery'],function($){
	//在jquery加载完成后再加载test1
	require(['test1'],function(test1){
		console.log('test1 loaded!');
	});
});
//获取用户的信息
require(['test3','test1', 'test2'],function(test1,test2){
	console.log('load test 1 finished!');
	console.log('load test 2 finished!');
});
//引入一个文件执行定义
require(['getUser'],function(user){
	//引入一个定义的模块
	require(['user'],function(u){
		console.log(u);
	});
	// console.log(u);
});


//define部分功能的学习
//匿名定义一个对象，可以通过文件名路劲引入该模块
// define({
// 	name:'Karry',
// 	age:18
// });
//定义一个叫'Karry'的模块
// define('Karry',{
// 	name:'Karry',
// 	age:18
// });
// //引入Karry模块
// require(['Karry'],function(Karry){
// 	console.log(Karry);
// });
//匿名定义一个对象，可以通过文件名路劲引入该模块
// define(function(){
// 	return {
// 		name:'Karry',
// 		age:18
// 	};
// });
// define('Karry',function(){
// 	return {
// 		name:'Karry',
// 		age:18
// 	};
// });
// require(['Karry'],function(Karry){
// 	console.log(Karry);
// });
//定义一个Person类
// define('Person',function(){
// 	var Person=function(name, age){
// 		this.name=name;
// 		this.age=age;
// 	};
// 	return Person;
// });
// require(['Person'],function(Person){
// 	var p1=new Person('Lilly',18);
// 	console.log(p1);
// 	var p2=new Person('Fatty',22);
// 	console.log(p2);
// });
// 引用另一个文件中的Person类
require(['initPerson'], function(P){
	require(['Person'],function(Person){
		var p1=new Person('Marry',18,'女');
		console.log(p1);
		//=>Person {name: "Marry", age: 18, sex: "女"}
		var p2=new Person('Juddy', 22, '男');
		console.log(p2);
		//=>Person {name: "Juddy", age: 22, sex: "男"}
	});
});