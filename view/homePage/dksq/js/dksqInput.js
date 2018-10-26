$(function () {
    var insureInput = {

        init: function () {
            this.listen()
        },
        listen: function () {
            var urlIds = tool.getRequest().ids
            var msg = JSON.parse(localStorage.getItem("msg"))[0]
            console.log(msg)
            if (urlIds === "mec") {
                $("#title").html("请选择机构类型")
                $("#text").attr("placeholder", "请选择机构类型")
            } else if (urlIds === "org") {
                $("#title").html("请输入机构名称或借款人姓名")
                $("#text").attr("placeholder", "请输入机构名称或借款人姓名")
            } else if (urlIds === "loc") {
                $("#title").html("请选择地区")
                $("#text").attr("placeholder", "请选择地区")
                insureInput.getPosition();

            } else if (urlIds === "lan") {
                $("#title").html("请输入土地面积")
                $("#text").attr("placeholder", "请输入土地面积")
                // } else if (urlIds === "man") {
                //     $("#title").html("请输入你的手机号")
                //     $("#text").attr("placeholder", "请输入你的手机号")
                // } else if (urlIds === "mar") {
                //     $("#title").html("请输入你的电子邮箱")
                //     $("#text").attr("placeholder", "请输入你的电子邮箱")
                // } else if (urlIds === "loa") {
                //     $("#title").html("请输入承保作物信息")
                //     $("#text").attr("placeholder", "请输入承保作物信息")
            } else if (urlIds === "col") {
                $("#title").html("请输入")
                $("#text").attr("placeholder", "请输入")
            } else if (urlIds === "con") {
                $("#title").html("请输入")
                $("#text").attr("placeholder", "请输入")
            } else if (urlIds === "num") {
                $("#title").html("请输入")
                $("#text").attr("placeholder", "请输入")
            } else if (urlIds === "amo") {
                $("#title").html("请输入")
                $("#text").attr("placeholder", "请输入")
            } else if (urlIds === "use") {
                $("#title").html("请输入")
                $("#text").attr("placeholder", "请输入")
            } else if (urlIds === "sta") {
                $("#title").html("请选择")
                $("#text").attr("placeholder", "请选择")
            } else if (urlIds === "end") {
                $("#title").html("请选择")
                $("#text").attr("placeholder", "请选择")
            }
            $(document).on("click", "#sweep", function () {
                msg[urlIds] = $("#text").val()
                if ($.trim($("#text").val()) == "") {
                    msg[urlIds] = $("#text").attr("placeholder")
                } else {
                    localStorage.setItem("msg", JSON.stringify([msg]))
                }
                window.open("dksq.html", "_self");
            })

            $("input").keyup(function (e) {
                if (e.keyCode === 13) {
                    msg[urlIds] = $("#text").val()
                    if ($.trim($("#text").val()) == "") {
                        msg[urlIds] = $("#text").attr("placeholder")
                    } else {
                        localStorage.setItem("msg", JSON.stringify([msg]))
                    }
                    // window.open("dksq.html", "_self");
                }
            });
        },
        getPosition: function () {
            console.log("333")
            //判断浏览器是否支持HTML5 定位
            console.log(window.navigator)
            if (window.navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(insureInput.successfulCallback, insureInput.failCallback)

            } else {

                alert("你的浏览器不能使用HTML5定位")

            }

        },

        successfulCallback: function (position) {
            console.log(position)
            var latitude = position.coords.latitude;

            var longitude = position.coords.longitude;
            alert("成功获取位置信息");
            console.log(longitude)

        },

        failCallback: function (error) {
            console.log(error)
            var text;

            switch (error.code) {

                case error.PERMISSION_DENIED:

                    text = "用户拒绝对获取地理位置的请求。";

                    break;
                case error.POSITION_UNAVAILABLE:

                    text = "位置信息是不可用的。";

                    break;

                case error.TIMEOUT:

                    text = "请求用户地理位置超时。";

                    break;

                case error.UNKNOWN_ERROR:

                    text = "未知错误。";

                    break;
            }

        }

    }
    insureInput.init()
})