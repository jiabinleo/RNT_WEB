$(function () {
  var login = {
    init: function () {
      setTimeout(() => {
        $("#bg").fadeOut("slow");
      }, 1000);
      login.listen();
    },
    listen: function () {
      $(document).ready(function () {
        $("#username").val($.cookie("account"));
        $("#password").val($.cookie("password"));
      });

      $(document).on("touchstart", "#button", function () {
        //记住账号
        var account = $("#username").val();
        var password = $.trim($("#password").val());
        if (account == "" && password == "") {
          tool.tip("用户名和密码不能为空")
        } else if (account == "") {
          tool.tip("用户名不能为空")
        } else if (password == "") {
          tool.tip("密码不能为空")
        } else {
          password == $.cookie("password") ? undefined : password = hex_md5(password);
          $.ajax({
            url: localhost50010 + "/user/login",
            type: "POST",
            dataType: "json",
            headers: {
              "Content-Type": "application/json"
            },
            beforeSend: function () {
              tool.tip('正在登录中...', 1000 * 60)
            },
            data: JSON.stringify({
              account: account,
              password: password
            }),
            success: function (data) {
              tool.tip(data.message)
              if (data.code === "0") {
                sessionStorage.setItem("my_token", JSON.stringify(data.data.token));
                sessionStorage.setItem("account", JSON.stringify(data.data.user.account));
                $.cookie("account", account, {
                  expires: 7
                });
                password == $.cookie("password") ? undefined : $.cookie("password", password, {
                  expires: 7
                });
                window.open("index.html", "_self");
              }
            },
            error: function (err) {
              tool.tip("网络连接失败")
            }
          });
        }
      });
      //---------------------------------------------------------------------------------------------
      console.log(QC)
      if (QC.Login.check()) { //检查是否已登录
        QC.Login.signOut();
      }
      QC.Login({
        btnId: "QQLogin", //插入按钮的节点id，必选,可为空字符串
        scope: "all", //用户需要确认的scope授权项，可选，默认all
        size: "C_S", //按钮尺寸，可用值[A_XL| A_L| A_M| A_S|  B_M| B_S| C_S]，可选，默认B_S
        redirectURI:"http://127.0.0.1:5500/login.html"
      }, function (reqData, opts) {
        //登录成功回调方法
        debugger
        QC.Login.getMe(function (openId, accessToken) {
          var args = {
            openid: '1108009813',
            userHeadImg: reqData.figureurl_qq_2,
            access_token: accessToken,
          };
        });
        QC.api('get_user_info', function(){
          console.log('///')
        }).success(function (userdata) {
          //可以获得用户的各种相关信息，如用户昵称
          var username = userdata.data.nickname;
          console.log(username)
        });
      }, function (opts) {
        debugger
        //注销成功回调方法
      });
      //-----------------------------------------------------------------------------------------------
    }
  };
  login.init();
});
$(document).ready(function () {
  if (sessionStorage.getItem("bg")) {
    $("#bg").hide();
  } else {
    sessionStorage.setItem("bg", 1);
    setTimeout(() => {
      $("#bg").hide();
    }, 3000);
  }
});