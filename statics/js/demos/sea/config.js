console.log('start demos js config.js now..');
//当前config页面所需的的配置
seajs.config({
	//配置别名
	alias:{
		//public指公共目录
		//demos指demos目录
		'main': 'demos/sea/main_config.js',
		'Book': 'demos/sea/book.js'
	},
	//变量
	vars:{
	}
});
//启动入口文件
seajs.use('main');