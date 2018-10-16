$(function () {
    var insureInput = {

        init: function () {
            this.listen()
        },
        listen: function () {
            var urlIds = insureInput.getRequest().ids
            var msg = JSON.parse(localStorage.getItem("msg"))[0]
            console.log(msg)
            if (urlIds === "number") {
                $("#title").html("请输入投保亩数")
                $("#text").attr("placeholder", "请输入投保亩数")
                $("#text").attr("value", msg.number)
            } else if (urlIds === "name") {
                $("#title").html("请输入你的姓名")
                $("#text").attr("placeholder", "请输入你的姓名")
                $("#text").attr("value", msg.name)
            } else if (urlIds === "idType") {
                $("#title").html("请选择你的证件类型")
                $("#text").attr("placeholder", "请选择你的证件类型")
                $("#text").attr("value", msg.idType)
            } else if (urlIds === "id") {
                $("#title").html("请输入你的证件号码")
                $("#text").attr("placeholder", "请输入你的证件号码")
                $("#text").attr("value", msg.id)
            } else if (urlIds === "pho") {
                $("#title").html("请输入你的手机号")
                $("#text").attr("placeholder", "请输入你的手机号")
                $("#text").attr("value", msg.pho)
            } else if (urlIds === "ema") {
                $("#title").html("请输入你的电子邮箱")
                $("#text").attr("placeholder", "请输入你的电子邮箱")
                $("#text").attr("value", msg.ema)
            } else if (urlIds === "msg") {
                $("#title").html("请输入承保作物信息")
                $("#text").attr("placeholder", "请输入承保作物信息")
                $("#text").attr("value", msg.msg)
            } else if (urlIds === "ben") {
                $("#title").html("请输入受益人名称")
                $("#text").attr("placeholder", "请输入受益人名称")
                $("#text").attr("value", msg.ben)
            }
            $(document).on("click", "#sweep", function () {
                msg[urlIds] = $("#text").val()
                if ($("#text").val() == "") {
                    msg[urlIds] = $("#text").attr("placeholder")
                }
                localStorage.setItem("msg", JSON.stringify([msg]))
                window.open("insure.html", "_self");
            })
            // $(document).on("click", "#historyBack", function () {
            //     msg[urlIds] = $("#text").val()
            //     if ($("#text").val() == "") {
            //         msg[urlIds] = $("#text").attr("placeholder")
            //     }
            //     localStorage.setItem("msg", JSON.stringify([msg]))
            // })

            $("input").keyup(function (e) {
                if (e.keyCode === 13) {
                    msg[urlIds] = $("#text").val()
                    if ($("#text").val() == "") {
                        // msg[urlIds] = $("#text").attr("placeholder")
                    }
                    localStorage.setItem("msg", JSON.stringify([msg]))
                    window.open("insure.html", "_self");
                }
            });
        },
        getRequest: function () {
            var url = window.location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strS = str.split("&");
                for (var i = 0; i < strS.length; i++) {
                    theRequest[strS[i].split("=")[0]] = decodeURI(strS[i].split("=")[1]);
                }
            }
            return theRequest;
        }
    }
    insureInput.init()
})