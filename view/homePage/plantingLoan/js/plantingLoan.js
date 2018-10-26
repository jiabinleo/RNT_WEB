var my_token = JSON.parse(sessionStorage.getItem("my_token"));
var plantingLoan = {
    init: function () {
        var id = tool.getRequest().id
        $.ajax({
            url: localhost40000 + "/loan/detail/" + id,
            type: "GET",
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("login_token", my_token);
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
            window.open("../dksq/dksq.html?id=" + $(this).attr("data-id"), "_self");
        })
    },
    htmlData: function (data) {
        $("#title").html(isNull(data.name))
        $("#fengmianTu").attr("src", data.fengmianTu)
        $("#jianjie").html(isNull(data.jianjie))
        $("#daikuanEdu").html(isNull(data.daikuanEdu))
        $("#daikuaiLilv").html(isNull(data.daikuaiLilv))
        $("#fuwuDuixiang").html(isNull(data.fuwuDuixiang))
        $("#dksq").attr("data-id", data.id)
        if (data.daikuanTiaojian) {
            var daikuanTiaojian = data.daikuanTiaojian.split("&")
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