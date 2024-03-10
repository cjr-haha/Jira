//代理
//加法
let i = 0;
function addMethod() {
  console.log(++i);
  let res = 0;
  while (arguments.length > 0) {
    res = res + Array.prototype.shift.call(arguments);
  }
  return res;
}

//乘法
function chengMethod() {
  console.log(++i);
  let res = Array.prototype.shift.call(arguments);
  while (arguments.length > 0) {
    res = res * Array.prototype.shift.call(arguments);
  }
  return res;
}

//代理 这个代理的作用是增加一个功能 这个功能就是缓存机制 当计算过的之际取缓存 没有的还是需要调用函数
function proxy(fn) {
  const cache = {};
  return function () {
    const flag = Array.prototype.join.call(arguments, ",");
    if (cache[flag]) return cache[flag];
    return (cache[flag] = fn.apply(this, arguments));
  };
}
const chengMethod_proxy = proxy(chengMethod);
const addMethod_proxy = proxy(addMethod);
console.log(chengMethod_proxy(1, 2, 3));

console.log(chengMethod_proxy(1, 2, 3));
console.log(chengMethod_proxy(1, 2));
console.log(addMethod_proxy(1, 2, 3));
console.log(addMethod_proxy(1, 2, 3));
