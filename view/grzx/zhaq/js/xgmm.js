var xgmm = {
    oldPassword: null,
    newPassword1: null,
    newPassword2: null,
    account: JSON.parse(sessionStorage.getItem("account")),
    init() {
        this.listen()
    },
    listen() {
        var _this = this
        $(document).on('click', '#save', function () {
            _this.oldPassword = $.trim($("#oldPassword").val())
            _this.newPassword1 = $.trim($("#newPassword1").val())
            _this.newPassword2 = $.trim($("#newPassword2").val())
            var mytel = /^[a-zA-Z0-9_-]{6,12}$/;
            if (!mytel.test(_this.oldPassword)) {
                $("#msg").text('原密码格式不正确').css({
                    'color': 'red'
                })
                $("#mask").show()
            } else if (!mytel.test(_this.newPassword2)) {
                $("#msg").text('新密码格式不正确').css({
                    'color': 'red'
                })
                $("#mask").show()
            } else {
                if (_this.newPassword1 === _this.newPassword2) {
                    $.ajax({
                        url: localhost50010 + "/user/modifyPassword",
                        type: "POST",
                        dataType: "json",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify({
                            account: _this.account,
                            "oldPassword": hex_md5(_this.oldPassword),
                            "newPassword": hex_md5(_this.newPassword2)
                        }),
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("login_token", my_token);
                        },
                        success: function (result) {
                            if (result.code == 0) {
                                $('#msg').html(result.message).css({
                                    'color': 'green'
                                })
                                $('#mask').show()
                                setTimeout(() => {
                                    window.open("../../../login.html", "_self");
                                }, 2000);
                            } else {
                                $('#msg').html(result.message).css({
                                    'color': 'red'
                                })
                                $('#mask').show()
                            }
                            setTimeout(() => {
                                $("#mask").hide()
                                $("#msg").empty()
                            }, 1000);
                        },
                        error: function (error) {
                            console.log(error)
                            setTimeout(() => {
                                $("#mask").hide()
                                $("#msg").empty()
                            }, 1000);
                        }
                    })
                } else {
                    $("#msg").html('两次密码不一致').css({
                        'color': 'red'
                    })
                    $("#mask").show()
                }
            }
            setTimeout(() => {
                $("#mask").hide()
                $("#msg").empty()
            }, 1000);
        })
    }
}
$(function () {
    xgmm.init()
})