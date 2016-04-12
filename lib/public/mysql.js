// 引入mysql模块
var mysql      = require('mysql');
// mysql配置
var config     = {
  host     : '192.168.50.62',
  user     : 'root',
  password : 'root',
  database : 'node'
};
// 创建mysql连接
var connection = mysql.createConnection(config);

connection.connect();

connection.query('SELECT * FROM user', function(err, rows, fields) {
  if (err) throw err;

  console.log(rows[0].phone, rows[0].email);
});

connection.query({
  sql: 'SELECT * FROM `user` WHERE `username` = ?',
  timeout: 40000, // 40s
  values: ['huangzd']
}, function (error, results, fields) {
	console.log(results[0].username);
	// console.log(fields);
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
});

connection.end();