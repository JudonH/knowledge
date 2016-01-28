//引入lodash模块
var util=require('lodash');

//集合（Collection）部分
var list=[1, 2, 3, 4, 5, 6, 7];
var object={
	'1': 'a',
	'2': 'b',
	'3': 'c',
	'4': 'd'
};
var result;
function True(){
	return true;
}
// countBy(collection, [iteratee=_.identity])
// 创建一个组成对象，key是经过 iteratee 处理的集合的结果，value 是处理结果的次数。
result=util.countBy(list);
console.log(result);
// ***********???************
// 不太明白value为啥是次数！！
// ***********???************

// every(collection, [predicate=_.identity])
// 通过 predicate 检查集合中的元素是否都返回 真值，只要 predicate 返回一次假值，遍历就停止，并返回 false。
// 判断集合是否都是true
result=util.every(list);
console.log(result);
// 可用于判断所有对象是否某个属性都相同，比如：判断消息是否都为已读
// ***********???************
// 不太明白有啥子卵用
// ***********???************

// filter(collection, [predicate=_.identity])
// 根据条件过滤值
result=util.filter(list, function(value){
	return value>5;
});
console.log(result);
// 可用于对象的过滤
// 将对象中的值转换为数组
result=util.filter(object, True);
console.log(result);

// find(collection, [predicate=_.identity])
// 遍历集合中的元素，返回最先经 predicate 检查为真值的元素。
result=util.find(object, function(value, key){
	return key==='2';
});
console.log(result);

// findLast
// 与find类似，从右到左遍历集合

// forEach
// 与for-in类似，显示返回false，则提前退出
result=util.forEach(list, function(value, key){
	console.log(key, value);
	return false;
});
console.log(result);

// forEachRight
// 与forEach类似，从右边到左边遍历
util.forEachRight(list, function(value, key){
	console.log(key, value);
});

// groupBy
// 创建一个对象组成，key 是经 iteratee 处理的结果， value 是产生 key 的元素数组。
result=util.groupBy(list, function(value, key){
	return value+'a';
});
console.log(result);
// *********???*************
// 然而我并不知道有啥子用途
// *********???*************

// includes(collection, value, [fromIndex=0])
// 检查 值 是否在 集合中，如果集合是字符串，那么检查 值 是否在字符串中。 其他情况用 SameValueZero 等值比较。 如果指定 fromIndex 是负数，从结尾开始检索。
result=util.includes(list, 4);
console.log(result);

// invokeMap(collection, path, [args])
// 调用 path 的方法处理集合中的每一个元素，返回处理的数组。 
result=util.invokeMap(object, String.prototype.split, '');
console.log(result);

// keyBy
// 创建一个对象组成。key 是经 iteratee 处理的结果，value 是产生key的元素。
result=util.keyBy(list);
console.log(result);

// map
// 创建一个经过 iteratee 处理的集合中每一个元素的结果数组
result=util.map(list);
console.log(result);