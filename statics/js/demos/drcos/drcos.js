//严格模式
'use strict';
//登录模块
__define('Login', function(){
	return __class.extend({
		ui:{
			'{root}': {
				'#submitData':{
					ontouchstart: 'submitData($el)'
				}
			}
		},
		defaults:{
			//用户信息
			user:{}
		},
		init:function(){
		},
		submitData: function(el){
			var that=this;
			if(that.checkUser()){
				console.log(that.get('user'));
			}
		},
		//检查用户格式是否正确
		checkUser: function(){
			var root=$(this.options.root);
			var username=$.trim(root.find('#username').val());
			var password=$.trim(root.find('#password').val());
			if(!this.checkUserName(username)){
				console.log('用户名错误');
				return false;
			}
			else if(!this.checkPassword(password)){
				console.log('密码错误');
				return false;
			}
			else{
				return true;
			}
		},
		//检查用户名格式是否正确
		checkUserName: function(name){
			//用户名格式：3~16个字符，数字、英文字母、下划线
			var reg=new RegExp(/^[a-zA-Z0-9_-]{3,16}$/);
			if(name && reg.test(name)){
				var user=this.get('user', {});
				user.username=name;
				this.set('user', user, true);
				return true;
			}
			else{
				return false;
			}
		},
		//检查密码格式是否正确
		checkPassword: function(password){
			//用户名格式：6~18个字符，数字、英文字母、下划线
			var reg=new RegExp(/^[a-zA-Z0-9_-]{6,18}$/);
			if(password && reg.test(password)){
				var user=this.get('user', {});
				user.password=password;
				this.set('user', user, true);
				return true;
			}
			else{
				return false;
			}
		}
	});
});
//统一入口
__object({
	init: function(){
		var Login=__require('Login');
		var login=new Login({
			root: '#login'
		});
	}
});