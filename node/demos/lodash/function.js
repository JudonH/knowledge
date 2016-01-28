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
// 相当于before(2, func);
done=util.once(function(){
	console.log('once');
});
done();
done();
// overArgs(func, [transforms])
// 创建一个函数，调用时func 参数会先一对一的改变
function doubled(n){
	return n*2;
}
function square(n){
	return n*n;
}
done=util.overArgs(function(x, y){
	return [x, y];
}, square, doubled);
result=done(2, 4);
console.log(result);
// ****************??*******************
// 不知道具体的适用场景是啥子！！
// ****************??*******************

//partial(func, [partials])
// 创建一个函数。 该函数调用 func，并传入预设的参数。 这个方法类似 _.bind，除了它不会绑定 this。
done=function(greeting, name){
	console.log(greeting+' '+name);
};
var welcome=util.partial(done, 'welcome to');
var hi=util.partial(done, 'hi');
welcome('Mike');
welcome('Marry');
hi('Kate');
var greet=util.partial(done, util, util);
greet('welcome', 'Pig');

// partialRight
// 类似partial，其是从右到左预设参数的
welcome=util.partialRight(done, 'Mike');
welcome('welcome');

// rearg(func, indexes)
// 创建一个调用 func 的函数。 所传递的参数根据 indexes 调整到对应位置。
var rearged=util.rearg(function(a, b, c){
	return [a, b, c];
}, 2, 0, 1);
result=rearged('b', 'c', 'a');
console.log(result);
// ***************???****************
// 不知道这个函数真正的用意
// ***************???****************

// rest(func, [start=func.length-1])
// 创建一个调用 func 的函数。 this 绑定到这个函数 并且 从 start 之后的参数都作为数组传入。
done=util.rest(function(what, names){
	return what+' '+names;
});
result=done('hi', 'Mike', 'Kate');
console.log(result);

// spread(func)
// 创建一个调用 func 的函数。 this 绑定到这个函数上。 把参数作为数组传入，类似于 Function#apply 
done=util.spread(function(who, what){
	return who+' says '+what;
});
result=done(['Mike', 'Hello']);
console.log(result);

// throttle(func, [wait=0], [options])
// 创建一个节流函数，在 wait 秒内最多执行 func 一次的函数。
done=util.throttle(function(){
	console.log('Mi');
}, 1000, {
	'trailing': true
});
done();

// unary(func)
// 创建一个最多接受一个参数的函数，忽略多余的参数
result=util.map(['6', '8', '10'], util.unary(util.parseInt));
console.log(result);

// wrap(value, wrapper)
// 创建一个函数。提供的 value 包装在 wrapper 函数的第一个参数里。
done=util.wrap(util.escape, function(func, text){
	return '<p>'+ func(text)+'</p>';
});
result=done('this is a & test');
console.log(result);

// 经常用到的函数：
// after、before、delay、spread、once、bind、partial、curry