//引入express模块
var express = require('express');
//路由级中间件
var router = express.Router();

//此模块处理各个活动模块
router.get('/:pdir', function(req, res, next) {
	//模板参数
	var params = {
		statics: global.STATICS_URL,
		cache: global.isCache
	};
	//渲染
	res.render('activity/' + req.params.pdir, params, function(err, html) {
		res.send(html);
	});
});

//此模块处理各个活动模块
router.get('/:pdir/:pfile', function(req, res, next) {
	//模板参数
	var params = {
		statics: global.STATICS_URL,
		cache: global.isCache
	};
	//渲染
	res.render('activity/' + req.params.pdir+'/'+req.params.pfile, params, function(err, html) {
		res.send(html);
	});
});

//此模块处理各个活动模块
router.get('/:pfdir/:psdir/:pfile', function(req, res, next) {
	//模板参数
	var params = {
		statics: global.STATICS_URL,
		cache: global.isCache
	};
	//渲染
	res.render('activity/' + req.params.pfdir+'/'+req.params.psdir+'/'+req.params.pfile, params, function(err, html) {
		res.send(html);
	});
});

//错误处理
router.use(function(err, req, res, next) {
	console.error(err.message);
	next(err);
});

module.exports = router;