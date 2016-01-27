//引入lodash模块
var util=require('lodash');

//字符串（String）部分
var str;

//camelCase
//转换字符串为驼峰写法
str='Foo Bar';
str=util.camelCase(str);
console.log(str);
str='--foo-bar';
str=util.camelCase(str);
console.log(str);

// capitalize
// 转换字符串首字母为大写，剩下为小写
str='WELCOME';
str=util.capitalize(str);
console.log(str);
str='WELCOME--Mike';
str=util.capitalize(str);
console.log(str);

// deburr
// 转换 latin-1 supplementary letters#Character_table) 为基本拉丁字母，并删除变音符。
str='déjà vu';
str=util.deburr(str);
console.log(str);

// endsWith
// 检查给定的字符是否是字符串的结尾
var result;
str='abc';
result=util.endsWith(str, 'c');
console.log(result);
result=util.endsWith(str, 'b');
console.log(result);
result=util.endsWith(str, 'b', 2);
console.log(result);

// escape
// 转义字符 "&", "<", ">", '"', "'", 以及 "`" 为HTML实体字符。
str='<html>test for & @ qq</html>';
str=util.escape(str);
console.log(str);

// escapeRegExp
// 转义RegExp 中特殊的字符 "^", "$", "\", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", 以及 "|"。
str='[lodash](https://lodash.com/)';
str=util.escapeRegExp(str);
console.log(str);

// kebabCase
// 转换字符串为kebab case。
str='Foo Bar';
str=util.kebabCase(str);
console.log(str);
str='fooBar';
str=util.kebabCase(str);
console.log(str);

// lowerCase
// 以空格分开单词转换为小写
str='--Foo-Bar';
str=util.lowerCase(str);
console.log(str);
str='fooBar';
str=util.lowerCase(str);
console.log(str);

// lowerFirst
// 转换首字母为小写
str='Free';
str=util.lowerCase(str);
console.log(str);
str='Free Bat';
str=util.lowerCase(str);
console.log(str);

// pad([string=''], [length=0], [chars=' '])
// 如果字符串长度小于 length 则从左到右填充字符。 如果没法平均分配，则截断超出的长度。
str='abc';
str=util.pad(str, 8);
console.log(str);
str='abc';
str=util.pad(str, 8, '_-');
console.log(str);

// padEnd
// 如果字符串长度小于length 则在右侧填充字符。 如果超出长度则截断超出的部分。
str='abc';
str=util.padEnd(str, 8, '--');
console.log(str);

// padStart
// 如果字符串长度小于length 则在左侧填充字符。 如果超出长度则截断超出的部分。
str='abc';
str=util.padStart(str, 8, '--');

// parseInt(string, [radix]);
// 将制定基数的字符串装换为10进制数
// 以指定的基数转换字符串为整数。 如果基数是 undefined 或者 0，则基数默认是10，如果字符串是16进制，则基数为16。
result=util.parseInt('500', 10);
console.log(result);
result=util.parseInt('111', 2);
console.log(result);
result=util.parseInt('E', 16);
console.log(result);
result=util.map(['01', '08', '09'], util.parseInt);
console.log(result);

// repeat
// 重复N次字符串
str=util.repeat('-_', 2);
console.log(str);
str=util.repeat('abc', 0);
console.log(str);

// replace([string=''], pattern, 要替换的内容)
// 替换字符串中匹配的内容为给定的内容
str=util.replace('Hi Fred', 'Fred', 'Mike');
console.log(str);

// snakeCase
// 转换字符串为snake case
str='AiBi';
str=util.snakeCase(str);
console.log(str);

// split
// 以separator拆分字符串
str='a-b-c';
result=util.split(str, '-', 2);
console.log(result);

// startCase
// 转换字符串为start case
str='--foo-bar';
str=util.startCase(str);
console.log(str);

// startsWith
// 检查字符串是否以target开头
str='abc';
result=util.startsWith(str, 'a');
console.log(result);
result=util.startsWith(str, 'b', 1);
console.log(result);

// toLower
// 转换整体的字符串为小写
str='--Foo-Bar';
str=util.toLower(str);
console.log(str);
str='_FOO_BAR';
str=util.toLower(str);
console.log(str);

// toUpper
// 转换整体的字符串为大写
str='--foo-bar';
str=util.toUpper(str);
console.log(str);

// trim([string=''], [chars=whitespace])
// 从字符串中移除前面和后面的空白 或 指定的字符。
str='   abc   ';
str=util.trim(str);
console.log(str);
// **********??**********--【已经解决】
// 替换的是“前面”和“后面”，不是字符串中的所有
str='___abc ___  __';
//这个剔除有问题
str=util.trim(str, '_');
//=> "abc ___  "
console.log(str);
// **********??**********

// trimEnd
// 移除字符串后面的空白 或 指定的字符。
str='____abc___  ';
str=util.trimEnd(str, '_');
console.log(str);

// trimStart
// 移除字符串中前面的空白或指定的字符
str='__abc__aa';
str=util.trimStart(str, '_');
console.log(str);

// truncate([string=''], [options])
// 截断字符串，如果字符串超出了限定的最大值。 被截断的字符串后面会以 omission 代替，omission 默认是 "..."。
str='我是小明，你是谁呢？你好吗？面向大海，春暖花开。';
str=util.truncate(str, {
	//最后返回的长度
	length: 14,
	separator: '？'
});
console.log(str);
str='我是小明，你是谁呢？你好吗？面向大海，春暖花开。';
str=util.truncate(str, {
	length: 20,
	omission: '[...]'
});
console.log(str);

// unescape
// 与escape相反，转换 HTML 实体 &amp;, &lt;, &gt;, &quot;, &#39;, 以及 &#96; 为对应的字符。
str='AA&amp;BB';
str=util.unescape(str);
console.log(str);

// upperCase
// 转换字符串为空格分割的大写单词
str='abc--oo';
str=util.upperCase(str);
console.log(str);

// upperFirst
// 转换首字母为大写。
str='welcome mike';
str=util.upperFirst(str);
console.log(str);

// words
// 拆分字符串中的词为数组
str='fred, barney, & pebbles';
result=util.words(str);
console.log(result);
result=util.words(str, /[^, ]+/g);
console.log(result);

//经常会用到的有：
//trim、truncate、split、replace、escape、toLower/toUpper
//