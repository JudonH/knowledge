//引入express模块
var express = require('express');
//路由级中间件
var router = express.Router();

//此模块处理各个demos的接口
//成功格式
router.get('/success', function(req, res, next) {
	var data={
		code: 100,
		msg: '成功',
		data: [1, 2, 3, 4]
	};
	res.send(data);
});
//未登录格式
router.get('/nologin', function(req, res, next){
	var data={
		code: -101,
		msg: '未登录',
		data: ''
	};
	res.send(data);
});
//错误格式
//字段未传、字段格式错误等错误
router.get('/error', function(req, res, next){
	var data={
		code: -102,
		msg: '错误',
		data: ''
	};
	res.send(data);
});
//错误处理
router.use(function(err, req, res, next) {
	console.error(err.message);
	next(err);
});

module.exports = router;