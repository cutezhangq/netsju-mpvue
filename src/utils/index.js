function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

//数组去空值
Array.prototype.notEmpty = function() {
  var arr = [];
  this.map(function(val, index) {
      //过滤规则为，不为空串、不为null、不为undefined，也可自行修改
      if (val !== "" && val != undefined && val != false) {
          arr.push(val);
      }
  });
  return arr;
}

export default {
  formatNumber,
  formatTime
}
