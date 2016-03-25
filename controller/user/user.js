//引入express模块
var express = require('express');
//路由级中间件
var router = express.Router();

//此模块处理用户模块，包括了登录、注册、修改密码等功能
router.get('/:pdir', function(req, res, next) {
	//模板参数
	var params = {
		Base_URL: global.Base_URL,
		statics: global.STATICS_URL,
		cache: global.isCache
	};
	//渲染
	res.render('user/' + req.params.pdir, params, function(err, html) {
		res.send(html);
	});
});

//此模块处理各个demos模块
router.get('/:pdir/:pfile', function(req, res, next) {
	//模板参数
	var params = {
		Base_URL: global.Base_URL,
		statics: global.STATICS_URL,
		cache: global.isCache
	};
	//渲染
	res.render('user/' + req.params.pdir+'/'+req.params.pfile, params, function(err, html) {
		res.send(html);
	});
});

//错误处理
router.use(function(err, req, res, next) {
	console.error(err.message);
	next(err);
});

module.exports = router;