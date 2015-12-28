//数据缓存
var cache=function(){
	$('div').data('name', 'Mike');
	$('div').data('age', 18);
	var data=$('div').data;
	// console.log($('div').data('name'));
	// console.log(data);
	// console.log($('div').data(null, 'dd'));
};

// var f={
// 	log:function(){
// 		console.log(1);
// 	}
// };
// f.log();
// // var log=f.log;
// log();
cache();
//为一个对象拓展方法
var myclass={};
$.extend(myclass, {
	min:function(a,b){
		return a>b?b:a;
	},
	max:function(a,b){
		return a>b?a:b;
	}
});
console.log(myclass.min(1,2));

//为一个元素对象拓展方法
$.fn.extend({
	print:function(){
		this.each(function(){
			console.log(this);
		});
	}
});
$('div').print();

// console.log($.extend);
console.log($.isPlainObject);