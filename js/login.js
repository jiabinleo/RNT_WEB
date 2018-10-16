$(function () {
    var login = {
        init: function () {
            setTimeout(() => {
                $("#bg").fadeOut("slow");
            }, 1000);
            login.listen()
        },
        listen: function () {
            $("#button").on("click", function () {
                var username = $.trim($("input[name='username']").val());
                var password = hex_md5($.trim($("input[name='password']").val()));
                if (username == "" && $.trim($("input[name='password']").val()) == "") {
                    $("#login_prompt").html("用户名和密码不能为空");
                } else if (username == "") {
                    $("#login_prompt").html("用户名不能为空");
                } else if ($.trim($("input[name='password']").val()) == "") {
                    $("#login_prompt").html("密码不能为空");
                } else {
                    console.log(username, password)
                    $.ajax({
                        url: localhost + "/user/login",
                        type: "POST",
                        dataType: "json",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify({
                            "account": username,
                            "password": password
                        }),
                        success: function (data) {
                            if (data.code === "0") {
                                // var a = data.data
                                // console.log(a)
                                // a = JSON.stringify(a)
                                // console.log(a)
                                // a = hex_md5(a)
                                // console.log(a)
                                sessionStorage.setItem(
                                    "userName",
                                    JSON.stringify(data.data.user.userName)
                                );
                                sessionStorage.setItem(
                                    "imgUrl",
                                    JSON.stringify(imgUrl + data.data.user.icon)
                                );
                                sessionStorage.setItem("account", JSON.stringify(username));
                                sessionStorage.setItem("telephone", JSON.stringify(data.data.user.telephone));
                                sessionStorage.setItem("email", JSON.stringify(data.data.user.email));
                                sessionStorage.setItem(
                                    "my_token",
                                    JSON.stringify(data.data.token)
                                );
                                window.open("index.html", "_self");
                            } else {
                                $("#login_prompt").html("用户名或密码错误");
                            }
                        },
                        error: function (err) {
                            console.log(err)
                        }
                    });
                }

            })
        }
    }
    login.init()
})