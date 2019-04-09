// var localhost50002 = "http://192.168.1.240:50002/v1",
//   localhost50010 = "http://192.168.1.240:50010/v1",
//   // img
//   localhost50001 = "http://192.168.1.240:50001",
//   imgUrl = "http://192.168.1.240:50000";

var localhost50002 = "http://120.78.209.238:50002/v1",
  localhost50010 = "http://120.78.209.238:50010/v1",
  // img
  localhost50001 = "http://120.78.209.238:50001",
  imgUrl = "http://120.78.209.238:50000";

if (sessionStorage.getItem("my_token")) {
  var my_token = JSON.parse(sessionStorage.getItem("my_token"));
}

var account = JSON.parse(sessionStorage.getItem("account"));

var tool = {
  getRequest: function getRequest() {
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
  formatDate: function formatDate(now) {
    var now = new Date(now);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + common.fixZero(month, 2) + "-" + common.fixZero(date, 2) + " " + common.fixZero(hour, 2) + ":" + common.fixZero(minute, 2) + ":" + common.fixZero(second, 2);
  },
  //时间如果为单位数补0
  fixZero: function fixZero(num, length) {
    var str = "" + num;
    var len = str.length;
    var s = "";
    for (var i = length; i-- > len;) {
      s += "0";
    }
    return s + str;
  },
  isNull: function isNull(str) {
    if (str) {
      return str;
    } else {
      return "";
    }
  },
  timeConversion: function timeConversion(oldTime, tipMsg) {
    if (tipMsg == undefined) {
      var tipMsg = "刚刚发布";
    }
    var disTime = Date.parse(new Date()) - new Date(oldTime).getTime();
    if (disTime < 60 * 1000) {
      timeText = tipMsg;
    } else if (disTime < 60 * 60 * 1000) {
      timeText = parseInt(disTime / 60 / 1000) + "\u5206\u949F\u524D";
    } else if (disTime < 24 * 60 * 60 * 1000) {
      timeText = parseInt(disTime / 60 / 60 / 1000) + "\u5C0F\u65F6\u524D";
    } else {
      timeText = oldTime.split(' ')[0];
    }
    return timeText;
  },
  loading: function loading(imgSrc) {
    if (!imgSrc) {
      imgSrc = 'img/loading.gif';
    }
    $("#ljb-mask").remove();
    $(document.body).find('header').eq(0).after("<div id=\"ljb-mask\" class=\"ljb-mask\">\n        <img id=\"ljb-loading\" src=\"" + imgSrc + "\" />\n        <span id=\"ljb-tip\"></span>\n      </div>");
  },
  loginPrompt: function loginPrompt() {
    $("#loginPrompt").remove();
    $(document.body).append("<div id=\"loginPrompt\" class=\"loginPrompt\">\n        <div class=\"pro\">\n          <p>\u8BF7\u5148\u767B\u5F55</p>\n          <p>\u8BE5\u529F\u80FD\u767B\u5F55\u540E\u624D\u53EF\u4F7F\u7528\uFF0C\u8BF7\u5148\u767B\u5F55\u3002</p>\n          <div class=\"bottom\">\n            <div id=\"_quxiao\" class=\"left\">\u53D6\u6D88</div>\n            <div id=\"_tuichu\" class=\"right\">\u786E\u8BA4</div>\n          </div>\n        </div>\n      </div>");
  },
  tip: function tip(str, time) {
    if (time == undefined) var time = 1000;
    $("#ljb-tip").remove();
    $(document.body).append("<div id=\"ljb-tip\" class=\"ljb-tip\">\n          <span>" + str + "</span>\n      </div>");
    setTimeout(function () {
      $("#ljb-tip").remove();
    }, time);
  }
};
//公共事件
$(document).on('click', '#_quxiao', function () {
  $("#loginPrompt").remove();
});