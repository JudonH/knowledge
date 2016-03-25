//程序执行的入口
define(function(require, exports, module){
	var doc=document;
	var text=doc.querySelector('div').innerHTML
	console.log(text);
	// console.log(seajs);
	//引入Book类
	var Book=require('Book');
	//实例化Book
	var book=new Book('高性能JavaScript');
	book.setPrice(29);
	var name=doc.querySelector('#name');
	var price=doc.querySelector('#price');
	name.innerHTML=book.getName();
	price.innerHTML=book.getPrice();
	console.log(book.getName(), book.getPrice());
	//获取Book类完整路径
	console.log('Book: ', require.resolve('Book'));
});