//引入lodash模块
var _=require('lodash');
//特点：
//1、工具类型的js库
//2、包括对数组、列表的操作

//函数学习：
//数据（Array）学习：
//chunk分割成多个数组
var arr=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var array=_.chunk(arr, 3);
console.log(array);
//compact
//将数组中的false、null、undefined、NaN、0移除
var data=[0, null, undefined, 1, true, 'right', NaN, false];
data=_.compact(data);
console.log(data);
//concat
//数组连接功能，连接多种数据
var concat=[1];
var c=_.concat(concat, 2, [3], [[4]]);
console.log(c);
//drop
//数组中删除一个元素
var drop=[1, 2, 3, 4, 5];
drop=_.drop(drop, 3);
console.log(drop);
//dropRight
//从数组中尾部删除一个元素
var dropRight=[1, 2, 3, 4, 5];
dropRight=_.dropRight(dropRight, 2);
console.log(dropRight);
//dropRightWhile
//从数组尾部删除元素
var resolve=_.partial(_.map, _, 'user');
var users=[
	{ 'user': 'barney',  'active': true },
	{ 'user': 'fred',    'active': false },
	{ 'user': 'pebbles', 'active': false }
];
var u=resolve(_.dropRightWhile(users, function(o){ return !o.active;}));
console.log(u);
//fill
//给数组填充值
var e=['', '', '', ''];
e=_.fill(e, 'a');
var f=_.fill(Array(10), 1);
console.log(e);
console.log(f);
//findIndex
//查找出数组中对象的索引
var index=_.findIndex(users, function(o){
	return o.active;
});
console.log(index);
var g=_.pullAt(users, index);
console.log(users);
//findLastIndex
//从数组尾部开始查找对象的索引
var h=[1,1,2,3];
var index2=_.findLastIndex(h, function(o){return o==1;});
console.log(index2);



// Object
// assign
// 把可枚举的属性到对象上，下一个对象属性会覆盖上一个
function A(){
	//属性
	this.a=1;
}
function B(){
	//属性
	this.b=2;
}
//非属性
A.prototype.c=3;
B.prototype.d=4;
var i=_.assign({'e': 5, 'a': 6}, new A(), new B());
console.log(i);
//assignIn(extend)
//类似assign，还会继承属性
var j=_.assignIn({'e': 5}, new A, new B);
console.log(j);
//assignInWith(extendWith)
//类似assignIn，接受一个customizer决定如何分配值
function customizer(objValue, srcValue){
	return _.isUndefined(objValue)?srcValue:objValue;
}
var k=_.assignInWith({'a': 1}, {'b': 2}, {'a': 3}, customizer);
console.log(k);
// assignWith
// 类似assign，接受一个customizer决定如何分配值
var l=_.assignWith({'e': 5, 'a': 6}, new A(), new B(), customizer);
console.log(l);
// at
// 根据object的路劲获取值为数组
var m={'a': [{'b': {'c': 3}}, 4]}
var n=_.at(m, ['a[0].b.c', 'a[1]'])
console.log(n);
var n=_.at(['a', 'b', 'c'], 0, 2);
console.log(n);
// create
// 创建一个继承prototype的对象
// 这个方法还是不太明白?????
function Shape(){
	this.x=0;
	this.y=1;
}
function Circle(){
	Shape.call(this);
	this.r=2;
}
console.log(new Circle);
Circle.prototype=_.create(Shape.prototype, {'constructor': Circle});
console.log(new Circle);
// defaults
// 将新的属性添加到对象未存在的属性上;
var p={'a': 1};
p=_.defaults(p, {'b': 2}, {'a': 3});
console.log(p);
// defaultsDeep
// 类似_.defaults，并且会递归分配默认属性
p={'a': {'c': 6, 'e': 7}};
p=_.defaultsDeep(p, {'a': {'c': 4, 'd': 5}});
console.log(p);
// forIn
// 遍历对象的自身和继承的可枚举属性
function F(){
	this.a=1;
	this.b=2;
}
F.prototype.c=3;
_.forIn(new F, function(value, key){
	console.log(key, value);
});
// forInRight
// 类似forIn，反方向开始遍历
_.forInRight(new F, function(value, key){
	console.log(key, value);
});
// forOwn
// 遍历对象的可枚举属性
_.forOwn(new F, function(value, key){
	console.log(key, value);
});
// forOwnRight
// 类似forOwn，反方向开始遍历
_.forOwnRight(new F, function(value, key){
	console.log(key, value);
});
// functions
// 返回一个function对象自身可枚举属性名的数组
function D(){
	this.a=_.constant('1');
	this.b=_.constant('2');
}
D.prototype.c=_.constant('3');
var q=_.functions(new D);
console.log(q);
// functionsIn
// 返回一个function对象自身和继承的可枚举属性名的数组
q=_.functionsIn(new D);
console.log(q);
// get
// 获取对象的值
var object={'a': [{'b': {'c': 3}}]};
var r=_.get(object, 'a[0].b.c');
console.log(r);
r=_.get(object, 'a.b.c', 'default');
console.log(r);
// invert
// 创建一个键值倒置的对象
object={'a': 1, 'b': 2, 'c': 1};
var s=_.invert(object);
console.log(s);
s=_.invert(object, true);
console.log(s);
// invoke
// 调用对象路劲的方法
object={'a': [{'b': {'c': [1,2,3,4]}}]};
var t=_.invoke(object, 'a[0].b.c.slice', 1, 3);
console.log(t);
// keys
// 返回object自身可枚举属性的一个数组
var u=_.keys(new F);
console.log(u);
// keysIn
// 返回object自身或继承的可枚举属性名的数组
var v=_.keysIn(new F);
console.log(v);
// mapKeys
// 创建一个对象，对象的值与源对象相同
object={a: 1, b: 2};
var w=_.mapKeys(object, function(value, key){
	return key+value;
});
console.log(w);
var x=_.mapValues(object, function(value, key){
	return key+value;
});
console.log(x);