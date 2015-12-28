//引入express模块
var express = require('express');
//路由级中间件
var router = express.Router();

//此模块处理各个demos模块
router.get('/:path', function(req, res, next) {
  res.render('demos/'+req.params.path, {
  	statics: global.STATICS_URL,
  	name:req.query.name,
  	cache:global.isCache
  },function(err,html){
  	res.send(html);
  });
});

//错误处理
router.use(function(err,req,res,next){
	console.error(err.message);
	next(err);
});

module.exports = router;