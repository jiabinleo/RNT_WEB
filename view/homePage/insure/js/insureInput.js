$(function () {
    var insureInput = {

        init: function () {
            this.listen()
        },
        listen: function () {
            var urlIds = tool.getRequest().ids
            var msg = JSON.parse(localStorage.getItem("msg"))[0]
            console.log(msg)
            if (urlIds === "number") {
                $("#title").html("请输入投保亩数")
                $("#text").attr("placeholder", "请输入投保亩数")
            } else if (urlIds === "name") {
                $("#title").html("请输入你的姓名")
                $("#text").attr("placeholder", "请输入你的姓名")
            } else if (urlIds === "idType") {
                $("#title").html("请选择你的证件类型")
                $("#text").attr("placeholder", "请选择你的证件类型")
            } else if (urlIds === "id") {
                $("#title").html("请输入你的证件号码")
                $("#text").attr("placeholder", "请输入你的证件号码")
            } else if (urlIds === "pho") {
                $("#title").html("请输入你的手机号")
                $("#text").attr("placeholder", "请输入你的手机号")
            } else if (urlIds === "ema") {
                $("#title").html("请输入你的电子邮箱")
                $("#text").attr("placeholder", "请输入你的电子邮箱")
            } else if (urlIds === "msg") {
                $("#title").html("请输入承保作物信息")
                $("#text").attr("placeholder", "请输入承保作物信息")
            } else if (urlIds === "ben") {
                $("#title").html("请输入受益人名称")
                $("#text").attr("placeholder", "请输入受益人名称")
            }
            $(document).on("click", "#sweep", function () {
                msg[urlIds] = $("#text").val()
                if ($.trim($("#text").val()) == "") {
                    msg[urlIds] = $("#text").attr("placeholder")
                } else {
                    localStorage.setItem("msg", JSON.stringify([msg]))
                }
                window.open("insure.html?id=" + tool.getRequest().id, "_self");
            })

            $("input").keyup(function (e) {
                if (e.keyCode === 13) {
                    msg[urlIds] = $("#text").val()
                    if ($.trim($("#text").val()) == "") {
                        msg[urlIds] = $("#text").attr("placeholder")
                    } else {
                        localStorage.setItem("msg", JSON.stringify([msg]))
                    }
                    window.open("insure.html?id=" + tool.getRequest().id, "_self");
                }
            });
        }
    }
    insureInput.init()
})