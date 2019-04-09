if (tool.getRequest().id === "0") {
    flag = true
} else if (tool.getRequest().id === "1") {
    flag = false
}
if (flag) {
    $("#save").val('提交并登录')
} else {
    $("#save").val('注册并登录')
}


var szmm = {
    tel: JSON.parse(sessionStorage.getItem("tel")),
    code: JSON.parse(sessionStorage.getItem("code")),
    newPass1: null,
    newPass2: null,
    login: false,
    timer: null,
    init() {
        this.listen()
    },
    listen() {
        var _this = this
        $("#fh").on("touchstart", function () {
            window.open('sjhzc.html?id=' + tool.getRequest().id, '_self')
        })
        $("#newPass1").blur(function () {
            $("#msg").text('密码长度至少6个字符，最多12个字符').css({
                'color': 'gray'
            })
            _this.newPass1 = $.trim($('#newPass1').val())
            var mytel = /^[a-zA-Z0-9_-]{6,12}$/;
            if (!mytel.test(_this.newPass1)) {
                $("#msg").text('密码格式不正确').css({
                    'color': 'red'
                })
                _this.login = false
            }
        })
        $("#newPass1").focus(function () {
            $("#msg").text('密码长度至少6个字符，最多12个字符').css({
                'color': 'gray'
            })
            $("#newPass2").val('')
        })
        $("#newPass2").blur(function () {
            clearInterval(_this.timer)
            _this.newPass2 = $.trim($('#newPass2').val())
            if (_this.newPass2 === _this.newPass1) {
                var mytel = /^[a-zA-Z0-9_-]{6,12}$/;
                if (!mytel.test(_this.newPass2)) {
                    $("#msg").text('密码格式不正确').css({
                        'color': 'red'
                    })
                    _this.login = false
                } else {
                    _this.login = true
                    $("#msg").text('密码长度至少6个字符，最多12个字符').css({
                        'color': 'gray'
                    })
                }
            } else {
                $("#msg").text('两次密码不一样').css({
                    'color': 'red'
                })
                _this.login = false
            }
        })
        $("#newPass2").focus(function () {
            _this.timer = setInterval(function () {
                if ($.trim($('#newPass2').val())) {
                    console.log('验证')
                    _this.newPass1 = $.trim($('#newPass1').val())
                    _this.newPass2 = $.trim($('#newPass2').val())
                    console.log(_this.newPass2)
                    console.log(_this.newPass1)
                    if (_this.newPass2 === _this.newPass1) {

                        var mytel = /^[a-zA-Z0-9_-]{6,12}$/;
                        if (!mytel.test(_this.newPass2)) {
                            $("#msg").text('密码格式不正确').css({
                                'color': 'red'
                            })
                            _this.login = false
                        } else {
                            clearInterval(_this.timer)
                            _this.login = true
                            $("#msg").text('两次密码一致,请登录').css({
                                'color': 'green'
                            })
                        }
                    } else {
                        $("#msg").text('两次密码不一样').css({
                            'color': 'red'
                        })
                        _this.login = false
                    }
                }
            }, 1000)
        })
        $("#save").on("touchstart", function () {

            if (flag) {
                if (_this.login) {
                    $.ajax({
                        url: localhost50010 + "/user/register",
                        type: "POST",
                        dataType: "json",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify({
                            "telephone": _this.tel,
                            "code": _this.code,
                            // "account": _this.tel,
                            "password": hex_md5(_this.newPass2)
                        }),
                        success: function (result) {
                            if (result.code == 0) {
                                $('.inner').html(result.message)
                                $('.mask').show()
                                setTimeout(() => {
                                    window.open('../../login.html', '_self')
                                }, 2000);
                            } else {
                                setTimeout(() => {
                                    $("#msg").text(result.message).css({
                                        'color': 'red'
                                    })
                                }, 1000);

                            }
                        },
                        error: function (error) {
                            console.log(error)
                        }
                    })
                }
            } else {
                //修改密码
                if (_this.login) {
                    $.ajax({
                        url: localhost50010 + "/user/forget",
                        type: "POST",
                        dataType: "json",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify({
                            "telephone": _this.tel,
                            "code": _this.code,
                            "password": hex_md5(_this.newPass2)
                        }),
                        success: function (result) {
                            if (result.code == 0) {
                                $('.inner').html(result.message)
                                $('.mask').show()
                                setTimeout(() => {
                                    window.open('../../login.html', '_self')
                                }, 5000);
                            } else {
                                setTimeout(() => {
                                    $("#msg").text(result.message).css({
                                        'color': 'red'
                                    })
                                }, 1000);

                            }
                        },
                        error: function (error) {
                            console.log(error)
                        }
                    })
                }
            }


        })
    }
}
$(function () {
    szmm.init()
})