//引入lodash模块
var util=require('lodash');

//函数（Function）部分
var Log=function(){
	console.log('Log!');
};
var result;
var done;
// after(n, func)
// 这个方法创建一个新函数，当调用n次或者多次之后将触发func方法。
var saves=['a', 'b'];
done=util.after(saves.length, Log);
util.forEach(saves, function(type){
	console.log(type);
	//在被调用n次后才执行
	done();
});

// ary(func, [n=func.length])
// 创建一个最多接受n个参数，忽略多余参数的方法
result=util.map(['6', '7', '8'], util.ary(util.parseInt, 1));
console.log(result);

// before
// 创建一个调用 func 的函数。 调用次数不超过 N 次。 之后再调用这个函数，将返回最后一个调用的结果。
done=util.before(2, Log);
done();
done();

// bind(func, thisArg, [partials])
// 创建一个函数 func，这个函数的 this 会被绑定在 thisArg。
var str;
var greet=function(greeting, punctuation){
	return greeting+' '+this.user+punctuation;
};
var user={
	user: 'Mike'
};
var bound=util.bind(greet, user, 'hi');
str=bound('!');
console.log(str);
bound=util.bind(greet, user, util, '!');
str=bound('hi');
console.log(str);
// ***********？？**********
// 不太明白这个函数的真正作用！！
// ***********？？**********

// curry(func, [arity=func.length])
// 创建一个函数，该函数接收一个或多个 func 的参数。 当该函数被调用时,如果 func 所需要传递的所有参数都被提供，则直接返回 func 所执行的结果。 否则继续返回该函数并等待接收剩余的参数。 可以使用 func.length 强制需要累积的参数个数。 
// 柯里化函数
var abc=function(a, b, c){
	return [a, b, c];
};
done=util.curry(abc);
result=done(1)(2)(3);
console.log(result);
// 占位符
result=done(1)(util, 3)(4);
console.log(result);
result=done(1,2,3);
console.log(result);
//没有执行
// result=done(1)(2);
// console.log(result);

// curryRight
// 类似curry，接受参数的方式用partialRight方式
done=util.curryRight(abc);
result=done(3)(2)(1);
console.log(result);
result=done(2, 3)(1);
console.log(result);

// defer(func, [args])
// 延迟调用 func 直到当前堆栈清理完毕。 任何附加的参数会传入到 func。
result=util.defer(Log);
// console.log(result);
// ************???***************
// 不太明白这个方法的作用
// ************???***************

// delay(func, wait, [args])
// 延迟 wait 毫秒后调用 func。 任何附加的参数会传入到 func。
result=util.delay(Log, 2000);

// flip(func)
// 创建一个翻转接收参数的func函数
var array;
array=[1, 2, 3, 4, 5];
var flipped=util.flip(function(){
	return util.toArray(arguments);
});
array=flipped('1', '2', '3', '4', '5', '6');
console.log(array);

// memoize(func, [resolver])
// 创建一个会缓存 func 结果的函数。 如果提供了 resolver，就用 resolver 的返回值作为 key 缓存函数的结果。 默认情况下用第一个参数作为缓存的 key。 func 在调用时 this 会绑定在缓存函数上。 
var object;
var others;
object={
	a: 1,
	b: 2
};
others={
	c: 3,
	d: 4
};
var values=util.memoize(util.values);
result=values(object);
console.log(result);
result=values(others);
console.log(result);
object.a=2;
result=values(object);
console.log(result);
values.cache.set(object, ['a', 'b']);
result=values(object);
console.log(result);

// negate
// 创建一个对 func 结果 取反的函数。 用 predicate 对 func 检查的时候，this 绑定到创建的函数，并传入对应参数。
function isEven(n){
	return n % 2 == 0;
}
result=util.filter([1, 2, 3, 4, 5, 6], util.negate(isEven));
console.log(result);

// once
// 创建一个只能调用一次的函数。 重复调用返回第一次调用的结果。