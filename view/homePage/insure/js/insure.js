$(function () {
    var insure = {
        init: function () {
            if (localStorage.getItem("msg") == null || localStorage.getItem("msg") == "null") {
                msg = [{
                    number: "请输入投保亩数",
                    name: "请输入你的姓名",
                    idType: "请选择你的证件类型",
                    id: "请输入你的证件号码",
                    pho: "请输入你的手机号",
                    ema: "请输入你的电子邮箱",
                    msg: "请输入承保作物信息",
                    ben: "请输入受益人名称",
                }]
                localStorage.setItem("msg", JSON.stringify(msg))
            }
            var msg = JSON.parse(localStorage.getItem("msg"))[0]
            $("#number").html((parseFloat(msg.number) ? parseFloat(msg.number) : 0) + "亩")
            $("#name").html(msg.name)
            $("#idType").html(msg.idType)
            $("#id").html(msg.id)
            $("#pho").html(msg.pho)
            $("#ema").html(msg.ema)
            $("#msg").html(msg.msg)
            $("#ben").html(msg.ben)
            if (parseFloat(msg.number)) {
                $("#priceSum").html(parseFloat($("#priceDan").html()) * parseFloat($("#number").html()))
            } else {
                $("#priceSum").html(0)
            }

            insure.listen()
        },
        listen: function () {
            $("#playFooter").on("click", function () {
                $("#insure_wrap").css("display", "block")
                $("#insure_inner").css("display", "block")
            })
            $("#insureClose").on("click", function () {
                $("#insure_wrap").css("display", "none")
                $("#insure_inner").css("display", "none")
            })
            $(".insure_play_bottom").on("click", function () {
                $("#insure_inner").css("display", "none")
                $("#insure_inner2").css("display", "block")
            })
            $("#insureClose2").on("click", function () {
                $("#insure_wrap").css("display", "block")
                $("#insure_inner").css("display", "block")
                $("#insure_inner2").css("display", "none")
                for (var i = 0; i < 6; i++) {
                    $(".mima input").eq(i).val("")
                }
            })

            var pwdarr = [];
            var pwdarrs = ["1", "2", "3", "4", "5", "6"]
            $(".mima").on("click", function () {
                $(".mima input").eq(0).focus()
                pwdarr = [];
            })
            var pwss = true;
            $(".mima > input").on("input", function () {
                $(this).val($(this).val().trim().substr(0, 1))
                pwdarr.push($(this).val().trim().substr(0, 1))
                if ($(this).next().length) {
                    $(this).next().focus()
                } else {
                    if (pwdarr.length = 6) {
                        setTimeout(() => {
                            window.location.href = "/project/view/playsuc/playsuc.html";
                        }, 1000);
                    }
                }

            });
        }
    }
    insure.init()
})