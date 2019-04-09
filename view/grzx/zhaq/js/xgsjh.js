var xgsjh = {
    init() {
        this.listen()
    },
    listen() {
        const _this = this,
            COUNTDOWN = 60;
        let oldFlag = true,
            newFlag = true;
        $(document).on('click', "#oldPhone", function () {
            if (oldFlag) {
                var time = COUNTDOWN;
                $(this).addClass('wait')
                $("#oldPhone").html(`重新发送(${time}秒)`)
                var timer = setInterval(() => {
                    time--
                    $("#oldPhone").html(`重新发送(${time}秒)`)
                    if (time <= 0) {
                        oldFlag = true
                        $("#oldPhone").html(`获取验证码`).removeClass('wait')
                        clearInterval(timer)
                    }
                }, 1000);
                $.ajax({
                    url: `${localhost50010}/user/sendCode`,
                    type: "POST",
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    success: function (result) {
                        if (result.code == 0) {
                            console.log(result.data.code)
                        }
                        _this.showMask(result.message)
                    },
                    error: function (error) {
                        console.log(error)
                        _this.showMask(result.message)
                    }
                })
                oldFlag = false
            }
        })
        $(document).on('click', "#newPhone", function () {
            const mytel = /^[1][3,4,5,7,8][0-9]{9}$/;
            let newTelephone = $.trim($("#newTelephone").val())
            if (!mytel.test(newTelephone)) {
                _this.showMask('手机号格式不正确')
                return
            }
            if (!newTelephone) {
                _this.showMask('请输入新手机号')
            }
            if (newFlag && newTelephone) {
                $(this).addClass('wait')
                let time = COUNTDOWN;
                $("#newPhone").html(`重新发送(${time}秒)`)
                var timer = setInterval(() => {
                    time--
                    $("#newPhone").html(`重新发送(${time}秒)`)
                    if (time <= 0) {
                        newFlag = true
                        $("#newPhone").html(`获取验证码`).removeClass('wait')
                        clearInterval(timer)
                    }
                }, 1000);
                $.ajax({
                    url: `${localhost50010}/user/verificationCode`,
                    type: "POST",
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    data: JSON.stringify({
                        telephone: newTelephone
                    }),
                    success: function (result) {
                        if (result.code == 0) {
                            console.log(result.data.code)
                        }
                        _this.showMask(result.message)
                    },
                    error: function (error) {
                        console.log(error)
                        _this.showMask(result.message)
                    }
                })
                newFlag = false
            }
        })
        $(document).on('click', '#save', function () {
            var oldCode = $.trim($("#oldCode").val())
            var newCode = $.trim($("#newCode").val())
            var newTelephone = $.trim($("#newTelephone").val())
            if (oldCode && newCode) {
                $.ajax({
                    url: `${localhost50010}/user/modifyTel`,
                    type: "POST",
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    data: JSON.stringify({
                        oldCode: oldCode,
                        telephone: newTelephone,
                        newCode: newCode
                    }),
                    success: function (result) {
                        if (result.code == 0) {
                            console.log(result.message)
                        }
                        _this.showMask(result.message)
                    },
                    error: function (error) {
                        console.log(error)
                        _this.showMask(result.message)
                    }
                })
            } else {
                _this.showMask(`请输入验证码`)
            }
        })
    },
    showMask(msg) {
        $("#msg").html(msg)
        $("#mask").show()
        setTimeout(() => {
            $("#mask").hide()
            $("#msg").empty()
        }, 1500);
    }
}
$(function () {
    xgsjh.init()
})