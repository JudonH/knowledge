//定义一个Person类
define('Person', function(){
	//Person类构造函数
	var Person=function(name,age,sex){
		this.name=name;
		this.age=age;
		this.sex=sex;
	};
	//Person类方法
	Person.prototype.getName=function(){
		return this.name;
	};
	Person.prototype.setName=function(name){
		this.name=name;
	}
	//返回该类
	return Person;
});