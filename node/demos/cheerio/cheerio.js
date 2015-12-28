//引入cheerio模块
var cheerio=require('cheerio'),
	//加载要解析的html
	$=cheerio.load('<ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>');

var apple=$('.apple').data('name', 'Mike');

var name=apple.data('name');
console.log(name);

$('.apple').removeAttr('class');

var hasClass=$('.orange').hasClass('orange');
console.log(hasClass);

$('.orange').addClass('pear');
//如果class存在，则移除，如果不存在，则添加
$('.orange').toggleClass('orange');

var array=$('ul').serializeArray();
console.log(array);

var lilength=$('#fruits').find('li').length;
console.log(lilength);

//取得父元素
var parent=$('.pear').parent().html();
console.log(parent);

var parents=$('.pear').parents().html();
console.log(parents)

var html=$('ul').html();

console.log(html);

var form='<form><input type="hidden" name="username" value="Karry" /><input type="password" name="password" value="123456" /></form>';
//加载并且解析html
var _=cheerio.load(form);
//对表单的数据进行序列化成数组，格式为：{name: xxx, value: xxx}
array=_('form').serializeArray();
console.log(array);
