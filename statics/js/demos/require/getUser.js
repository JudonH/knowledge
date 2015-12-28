// (function(win,undef){
// 	var user ={};
// 	user.name='Mikky';
// 	user.age=18;
// 	user.sex='女';
// 	user.moto='Maybe 我是女汉子一枚。';
// 	return user;
// })(window,undefined);
console.log('getUser.js excute!');
define('user',function(){
	var user ={};
	user.name='Mikky';
	user.age=18;
	user.sex='女';
	user.moto='Maybe 我是女汉子一枚。';
	// console.log(user);
	return user;
});