var plantingLoan = {
    init: function () {
        var id = tool.getRequest().id
        $.ajax({
            url: localhost50010 + "/loan/detail/" + id,
            type: "GET",
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            },
            success: function (result) {
                if (result.code === "0") {
                    plantingLoan.htmlData(result.data.loan)
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
        plantingLoan.listen()
    },
    listen: function () {
        $(document).on("touchend", "#dksq", function () {
            if (my_token) {
                window.open("../dksq/dksq.html?id=" + $(this).attr("data-id"), "_self");
            } else {
                tool.loginPrompt()
            }
        })
        $(document).on('click', '#_tuichu', function () {
            window.open("../../../login.html", "_self");
        })
    },
    htmlData: function (data) {
        $("#title").html(isNull(data.name))
        $("#fengmianTu").attr("src", imgUrl + data.fengmianTu)
        $("#jianjie").html(isNull(data.jianjie))
        $("#daikuanEdu").html(isNull(data.daikuanEdu))
        $("#daikuaiLilv").html(isNull(data.daikuaiLilv))
        $("#fuwuDuixiang").html(isNull(data.fuwuDuixiang))
        $("#dksq").attr("data-id", data.id)

        if (data.daikuanTiaojian) {
            var str = data.daikuanTiaojian
            if (str.charAt(str.length - 1) === "&") {
                str = str.slice(0, str.length - 1)
            }
            var daikuanTiaojian = str.split("&")
            $("#daikuanTiaojian").html("")
            for (let i = 0; i < daikuanTiaojian.length; i++) {
                $("#daikuanTiaojian").append(
                    `<li>${i+1}.${daikuanTiaojian[i]}</li>`
                )
            }
        }
        if (myScroll) {
            myScroll.refresh();
        }
    }
}
plantingLoan.init()

function isNull(str) {
    if (str) {
        return str
    }
}