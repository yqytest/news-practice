const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 处理时间格式 2019-03-15T04:09:11.000Z
 */
const getTimeStr = dateStr => {
  var time = '00:00';
  let date = new Date();
  let result = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})T(\S*):\d{2}/);
  if (result.length>0){
    var year = parseInt(result[1]);
    if (year == date.getFullYear()){
      var monthDate = result[2] + '-' + result[3];
      var curDate = formatNumber(date.getMonth() + 1) + ' ' + 
                    formatNumber(date.getDate());
      if (monthDate != curDate) {
        time = monthDate + ' ';
      }
    } else {
      time = [result[1], result[2], result[3]].join('-') + ' ';
    }
    time += result[4];
  }
  return time;
}

module.exports = {
  formatTime: formatTime,
  getTimeStr: getTimeStr
}
