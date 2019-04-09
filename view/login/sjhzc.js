if (tool.getRequest().id === "0") {
    flag = true
} else if (tool.getRequest().id === "1") {
    flag = false
}

if (flag) {
    $("#title").html("手机号注册")
} else {
    $("#title").html("找回密码")
}


$("#tel").focus(function () {
    $("#msg").empty()
});

$(document).on("touchstart", "#save", function () {
    var tel = $.trim($('#tel').val())
    var mytel = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!mytel.test(tel)) {
        $("#msg").text('手机号格式不正确').css({
            'color': 'red'
        })
    } else {
        $("#msg").empty()
        if (flag) {
            $.ajax({
                url: localhost50010 + "/user/checkTel",
                type: "POST",
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    telephone: tel
                }),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                    $("#msg").text('正在获取验证码...').css({
                        'color': 'gray'
                    })
                },
                success: function (result) {
                    console.log(result)
                    if (result.code == 0) {
                        if (result.data == 1) {
                            $("#msg").text(result.message).css({
                                'color': 'red'
                            })
                        } else {
                            $("#msg").empty()
                            sessionStorage.setItem("tel", JSON.stringify(tel));
                            window.open('yzsjh.html?id=' + tool.getRequest().id, '_self')
                        }

                    }
                },
                error: function (error) {
                    console.log(error)
                }
            })
        } else {
            sessionStorage.setItem("tel", JSON.stringify(tel));
            window.open('yzsjh.html?id=' + tool.getRequest().id, '_self')
        }


    }

    // 
})