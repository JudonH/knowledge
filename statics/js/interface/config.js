//此文件是interface系统的配置文件
//当前config页面所需的的配置
seajs.config({
	//配置别名
	alias:{
		//public指公共目录
		//interface指interface目录
		'main': 'interface/main.js',
		'edit': 'interface/edit.js'
	},
	//变量
	vars:{
	}
});
//启动入口文件
seajs.use('edit');