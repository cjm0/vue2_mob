/**
 * 格式化时间 formatDate(new Date(), 'yyyy-MM-dd H:m:s')
 * @param {date} time new Date()
 * @param {string} format yyyy-MM-dd H:m:s
 * @return {String}
 */
function formatDate(time, format) {
  const o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'H+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    'f+': time.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}

// 获取数据类型
function getTypeOf(obj) {
  let str = Object.prototype.toString.call(obj);
  return str.match(/\[object (.*?)\]/)[1].toLowerCase();
}

// 有效值
function truthy(val) {
  if (val && val != 'undefined' && val != 'null' && val != 'NaN') {
    return true
  }
  return false
}

// 数字加前缀 0
function fullNumber(n) {
  return n > 9 ? n : '0' + n
}

// 去除头尾空白字符
function trim(s) {
  return s.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

// 随机字符串
function getRandomStr() {
  return Math.random().toString(36).substr(2, 15)
}

// 时间戳字符串
function getTimeStamp() {
  return parseInt(new Date().getTime() / 1000) + ''
}

/**
 * 根据生日获取年龄，国际惯例按周岁算法计算
 * @param {number} y 年
 * @param {number} m 月
 * @param {number} d 日
 * @return {number} age 年龄
 */
function getAge(y, m, d) {
  // 周岁算法：出生时为零岁，每到一个公历生日长一岁
  // 虚岁算法：一出生一岁，每过一个春节长一岁
  const now = formatDate(new Date(), 'yyyy-MM-dd').split('-')
  const month = now[1] - m
  const day = now[2] - d
  let age = now[0] - y - 1
  if (month > 0 || (month === 0 && day > 0)) {
    age += 1
  }
  age = age >= 0 ? age : 0
  return age
}

export {
  formatDate,
  getTypeOf,
  truthy,
  fullNumber,
  trim,
  getRandomStr,
  getTimeStamp,
  getAge,
}
