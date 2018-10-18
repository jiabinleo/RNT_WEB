$(function () {
    var locs = false;
    var dksq = {
        init: function () {
            if (localStorage.getItem("msg") == null || localStorage.getItem("msg") == "null") {
                var msg = [{
                    mec: "请选择机构类型",
                    org: "请输入机构名称或借款人姓名",
                    loc: "请输入地址",
                    lan: "请输入土地面积",
                    man: "1",
                    mar: "1",
                    loa: "1", //0没有 1有
                    col: "请输入",
                    con: "请输入",
                    num: "请输入",
                    amo: "请输入",
                    use: "请输入",
                    sta: "请选择",
                    end: "请选择",
                }]
                localStorage.setItem("msg", JSON.stringify(msg))
            }
            var msg = JSON.parse(localStorage.getItem("msg"))[0]
            console.log(msg)
            $("#mec").html(msg.mec)
            $("#org").html(msg.org)
            $("#loc").html(msg.loc)
            $("#lan").html(msg.lan)
            $("#col").html(msg.col)
            $("#con").html(msg.con)
            $("#num").html(msg.num)
            $("#amo").html(msg.amo)
            $("#use").html(msg.use)
            $("#sta").html(msg.sta)
            $("#end").html(msg.end)
            $("#man .status").eq(msg.man).find("img").attr("src", "img/yes.png")
            $("#mar .status").eq(msg.mar).find("img").attr("src", "img/yes.png")
            $("#loa .status").eq(msg.loa).find("img").attr("src", "img/yes.png")
            dksq.listen()
        },
        listen: function () {
            $(document).on("touchend", ".radius span", function () {
                $(this).find("img").attr("src", "img/yes.png").parent().siblings().find("img").attr("src", "img/no.png")
                var msg = JSON.parse(localStorage.getItem("msg"))[0]
                msg[$(this).parent().attr("id")] = $(this).attr("data-id")
                localStorage.setItem("msg", JSON.stringify([msg]))
            })

            $("#dd").on("click", function () {
                locs = true;
                console.log(loc)
                $("#loc").html(loc)
            })


            $("#playFooter").on("click", function () {
                $("#dksq_wrap").css("display", "block")
                $("#dksq_inner").css("display", "block")
            })
            $("#dksqClose").on("click", function () {
                $("#dksq_wrap").css("display", "none")
                $("#dksq_inner").css("display", "none")
            })
            $(".dksq_play_bottom").on("click", function () {
                $("#dksq_inner").css("display", "none")
                $("#dksq_inner2").css("display", "block")
            })
            $("#dksqClose2").on("click", function () {
                $("#dksq_wrap").css("display", "block")
                $("#dksq_inner").css("display", "block")
                $("#dksq_inner2").css("display", "none")
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
            $(document).on("click", "#sweep", function () {
                window.location.href = "../maize/maize.html";
            })
        },

    }
    dksq.init()


    try {
        var loc = "定位中..."
        var map = new AMap.Map('container', {
            resizeEnable: true
        });
        var options = {

            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000, // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        }
        AMap.plugin(["AMap.Geolocation"], function () {
            var geolocation = new AMap.Geolocation(options);
            map.addControl(geolocation);
            geolocation.getCurrentPosition()
            AMap.event.addListener(geolocation, 'complete', onComplete); // 返回定位信息
            AMap.event.addListener(geolocation, 'error', onError); // 返回定位出错信息
        });

        function onComplete(obj) {
            loc = obj.addressComponent.city + obj.addressComponent.district + obj.addressComponent.township
            var msg = JSON.parse(localStorage.getItem("msg"))[0]
            msg.loc = loc
            localStorage.setItem("msg", JSON.stringify([msg]))
            if (locs) {
                $("#loc").html(loc)
            }
        }
    } catch (error) {

    }
})