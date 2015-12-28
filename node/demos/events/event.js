//简单实现观察者模式
var Events={
	on:function(name,callback){
		this._events=this._events||{};
		this._events[name]=this._events[name]||[];
		this._events[name].push(callback);
	},
	emit:function(name){
		this._events=this._events||{};
		var args=Array.prototype.slice.call(arguments,1),
		me=this;
		if(this._events[name]){
			for (var i = 0; i < this._events[name].length; i++) {
				this._events[name][i].call(me,args);
			};
		}
	}
};
var Events=require('events');
var util=require('util');
var myEmitter=new Events();
console.log(myEmitter);
myEmitter.on('say',function(msg){
	console.log('saying '+msg);
});
myEmitter.on('say',function(msg){
	console.log('sayed '+msg);
});
myEmitter.on('do',function(msg){
	console.log('do '+msg);
});
myEmitter.emit('say','hi');
myEmitter.setMaxListeners(10);
console.log(myEmitter);

//例子，自定义事件
var MyEvents=function(){};
util.inherits(MyEvents,Events);
MyEvents.prototype.say=function(msg){
	this.emit('say',msg);
};
MyEvents.prototype.set=function(key,value,isChange){
	if(this[key]!==value){
		this[key]=value;
		this.emit(key+'.change',key,value);
	}
	else{
		if(isChange){
			//触发事件
			this.emit(key+'.change', key,value);
		}
	}
};
MyEvents.prototype.get=function(key){
	return this[key];
};
var e=new MyEvents();

e.on('a.change',function(key,value){
	console.log(key+' change to '+value);
});

e.on('say',function(msg){
	console.log('say '+msg);
});
e.say('hi');
e.set('a','1');
e.set('a','1');
e.set('a','1',true);
console.log(e.get('a'));


//对一个对象进行扩展
//可以传入的参数有：
//参数：[isDeep],[source],[[target]...]
//默认值：false		this		{}
function __extend() {
	var src, copyIsArray, copy, name, options, clone,
		//取得第一个参数，如果没传入或者为false时，默认为空对象
		target = arguments[0] || {},
		i = 1,
		//参数的长度
		length = arguments.length,
		//是否深层扩展
		deep = false;

	// Handle a deep copy situation
	//判断第一个参数是否是布尔值，用于标识是否深度扩展
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	//如果传入的字符串之类的
	//非对象和非函数
	if ( typeof target !== "object" && !util.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	//判断是否只传了要拓展的参数
	if ( i === length ) {
		target = this;
		i--;
	}
	//遍历所有的参数
	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		//仅处理非空的参数
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			//遍历该参数的所有对象
			for ( name in options ) {
				//保存原来的
				src = target[ name ];
				//新的方法
				copy = options[ name ];

				// Prevent never-ending loop
				// 判断是否互相引用了，防止无限循环
				if ( target === copy ) {
					// console.log(4);
					//跳过
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				//判断是否是深沉拓展
				if ( deep && copy && ( util.isObject(copy) || (copyIsArray = util.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						//判断是否是数组
						copyIsArray = false;
						clone = src && util.isArray(src) ? src : [];

					} else {
						clone = src && util.isObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

var __object=function(extend){
	var obj={};
	if(typeof extend === 'function'){
		obj=extend();
	}
	if(typeof extend === 'object'){
		obj=extend;
	}
	// console.log(extend);
	__extend(true, this, obj);
	this.init();
};
util.inherits(__object, MyEvents);

new __object(function(){
	return {
		init:function(){
			console.log('init');
			this.on('a.change',function(key,value){
				console.log('a changed!');
			});
			this.set('a','2');
			console.log(this.get('a'));
			this.say();
		},
		say:function(){
			console.log('say');
		}
	};
});