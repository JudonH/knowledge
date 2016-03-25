//定义一个模块
define(function(require, exports, module){
	//模块内部加载一个或多个模块
	var User= require('./user');
	var mike=new User('Mike');
	var kate=new User('Kate');
	mike.setSex('男');
	kate.setSex('女');
	console.log(mike.getSex());
	console.log(kate.getSex());
	//模块内部异步加载一个或多个模块
	require.async('./user', function(User){
		var marry=new User('Marry');
		marry.setSex('女');
		console.log(marry.getSex());
	});
	//Util提供方法
	var Util=require('./util');
	Util.sayHello();
	Util.sayWelcome();
	var array=[5, 3, 4, 6, 1, 8];
	console.log('sorted: '+Util.sort(array));
	//返回绝对路劲
	console.log(require.resolve('demos/user'));
});