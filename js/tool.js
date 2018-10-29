(function() {
  var width = document.documentElement.clientWidth;
  var style = document.createElement("style");
  style.innerHTML = "html{font-size: " + width / 16 + "px !important;}";
  document.head.appendChild(style);
})();
var localhost55001 = "http://192.168.1.240:55001/v1",
  localhost40000 = "http://192.168.1.240:40000/v1",
  imgUrl = "http://192.168.1.240:50000",
  linkUrl = "http://127.0.0.1:5500";

var tool = {
  getRequest: function() {
    var url = window.location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strS = str.split("&");
      for (var i = 0; i < strS.length; i++) {
        theRequest[strS[i].split("=")[0]] = decodeURI(strS[i].split("=")[1]);
      }
    }
    return theRequest;
  },
  formatDate: function(now) {
    var now = new Date(now);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return (
      year +
      "-" +
      common.fixZero(month, 2) +
      "-" +
      common.fixZero(date, 2) +
      " " +
      common.fixZero(hour, 2) +
      ":" +
      common.fixZero(minute, 2) +
      ":" +
      common.fixZero(second, 2)
    );
  },
  //时间如果为单位数补0
  fixZero: function(num, length) {
    var str = "" + num;
    var len = str.length;
    var s = "";
    for (var i = length; i-- > len; ) {
      s += "0";
    }
    return s + str;
  }
};
