var yz = {
    tel: JSON.parse(sessionStorage.getItem("tel")),
    teltxt: ``,
    pwdarr: [],
    yzm: null,
    time: 120,
    flag: true,
    init() {
        this.listen()
        //模拟短信获取验证码
        this.getYzm()
    },
    listen() {
        var _this = this
        _this.tel.split('').forEach((ele, index) => {
            _this.teltxt += ele
            if (index == 2) {
                _this.teltxt += ` `
            } else if (index == 6) {
                _this.teltxt += ` `
            }
        })
        $("#tel").text(_this.teltxt)

        $(".input").on("click", function () {
            $(".input input").eq(0).focus()
            _this.pwdarr = [];
        })


        $("input[type=number]")[0].focus(event)
        $(document).keydown(function (event) {
            if (event.keyCode == 8) {
                $("input[type='number']").val('');
                $("input[type=number]")[0].focus(event)
            }
        })
        $(".input > input").on("input", function () {
            $(this).val($(this).val().trim().substr(0, 1))
            _this.pwdarr.push($(this).val().trim().substr(0, 1))
            if ($(this).next().length) {
                $(this).next().focus()
            } else {
                if (_this.pwdarr.length = 6) {
                    setTimeout(() => {
                        console.log(_this.pwdarr)
                        var userYzm = _this.pwdarr.join('') + '';
                        console.log(userYzm)
                        console.log('收到的验证码', _this.yzm)
                        $.ajax({
                            url: localhost50010 + "/user/checkCode",
                            type: "POST",
                            dataType: "json",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: JSON.stringify({
                                "telephone": _this.tel,
                                "code": userYzm
                            }),
                            success: function (result) {
                                console.log(result)
                                if (result.code == 0) {
                                    sessionStorage.setItem("code", JSON.stringify(userYzm));
                                    window.open('szmm.html?id=' + tool.getRequest().id, '_self')
                                }
                            },
                            error: function (error) {
                                console.log(error)
                            }
                        })
                    });
                }
            }
        });
        $(document).on('click', '#send', function () {
            if (_this.flag) {
                $("#send").css('color', '#999999')
                _this.time = 120
                _this.getYzm()
            }
        })
    },
    getYzm() {
        var _this = this
        _this.flag = false
        console.log(_this.flag)
        console.log('///////')
        $("#time").html('(' + _this.time + '秒)')
        var timer = setInterval(function () {
            _this.time -= 1
            console.log(_this.time)
            $("#time").html('(' + _this.time + '秒)')
            console.log(_this.flag)
            if (_this.time <= 0) {
                clearInterval(timer)
                $("#time").empty()
                $("#send").css('color', '#333333')
                _this.flag = true
            }
        }, 1000)
        $.ajax({
            url: localhost50010 + "/user/verificationCode",
            type: "POST",
            dataType: "json",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                telephone: _this.tel
            }),
            success: function (result) {
                console.log(result)
                if (result.code == 0) {
                    console.log(result.data.code)
                    _this.yzm = result.data.code
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
    }
}
$(function () {
    yz.init()
})