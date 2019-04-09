"use strict";
var wo = {
    init: function init() {
        wo.listen()
    },
    listen: function listen() {
        var _this = this;
        $.ajax({
            url: localhost50010 + "/user/getUser?account=" + account,
            type: "POST",
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            },
            beforeSend: function beforeSend(xhr) {
                xhr.setRequestHeader("login_token", my_token)
            },
            success: function success(result) {
                if (result.code === "0") {
                    console.log(result);
                    result.data.user.icon ? $("#icon").attr("src", imgUrl + result.data.user.icon) : "";
                    $("#userName").html(result.data.user.userName)
                }
            },
            error: function error(_error) {
                console.log(_error)
            }
        });
        $(document).on("click", "#add", function () {
            $("#mask").show()
        });
        $(document).on("touchstart", "#close", function () {
            $("#mask").hide()
        });
        $(document).on("click", "#list > li", function () {
            window.open($(this).attr("ids") + ".html", "_self")
        })
    }
};
$(function () {
    wo.init()
});