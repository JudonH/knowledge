//list列表类
define(function(require, exports, module){
	//初始大小
	var DEFAULT_CAPACITY=10;
	var EMPTY_ELEMENTDATA=[];
	function List(){
		this.elementData=EMPTY_ELEMENTDATA;
	}
	module.exports=List;
	//列表的大小
	List.prototype.size=function size(){
		return this.size;
	};
	//列表是否为空
	List.prototype.isEmpty=function isEmpty(){
		return this.size===0;
	};
	//返回列表索引
	List.prototype.indexOf=function indexOf(paramObject){
		var i;
		if(paramObject===null){
			for (i = 0; i < this.size; i++) {
				if(this.elementData[i]===null){
					return i;
				}
			}
		}
		else{
			for (i = 0; i < this.size; i++) {
				if(this.elementData[i]===null){
					return i;
				}
			}
		}
		return -1;
	};
	List.prototype.contains=function contains(){

	};
});