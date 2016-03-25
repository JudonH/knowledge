//引入express模块
var express = require('express');
//引入路劲解析模块
var path = require('path');
//引入腾讯模板引擎
var template = require('art-template');
var app_port = process.env.VCAP_APP_PORT || 80;
//初始化controller
var CONTROLLER_PATH = __dirname + 'controller\\';
//demos相关引入
var demos = require('./controller/demos/demos');
var dJson = require('./controller/demos/json');
//接口系统相关模块
var interface = require('./controller/interface/interface');
var iJson = require('./controller/interface/json');
var user=require('./controller/user/user');
var uJson=require('./controller/user/json');
//配置全局变量
global = {
	//主路径
	Base_URL: 'http://localhost',
	STATICS_URL: '/!__.__!',
	//是否开启模板引擎内存缓存
	isCache: false
};

//实例化一个express对象
var app = express();

//不开启缓存，用于开发阶段使用
template.config('cache', false);
//设置模板目录
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
app.engine('.html', template.__express);
//设置模板后缀
app.set('view engine', 'html');


//设置静态模块文件，建立'虚拟'目录为'/!__.__!'
app.use('/!__.__!', express.static(__dirname + '/statics'));
//设置多个静态资源
// app.use('/', express.static(path.join(__dirname, 'views')));
// app.use(express.static(path.join(__dirname, 'public')));

//设置中间组件
//demos模板和接口
app.use('/demos', demos);
app.use('/json/demos', dJson);
//接口系统（interface）模块和接口
app.use('/interface', interface);
app.use('/json/interface', iJson);
// 用户模块
app.use('/user', user);
app.use('/json/user', uJson);
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });
//监听
var server = app.listen(app_port, function() {
	//主机名
	var host = server.address().address;
	//端口
	var port = server.address().port;
	console.log('App listening at http://localhost:%s', port);
});