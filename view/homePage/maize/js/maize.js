$(function () {
    var ids = null
    var maize = {
        init: function () {
            $.ajax({
                url: localhost50010 + "/insurance/detail/" + tool.getRequest().id,
                type: "get",
                headers: {
                    "Content-Type": "application/json"
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function (data) {
                    data = JSON.parse(data)
                    console.log(data)
                    if (data.code === "0") {
                        console.log(data)
                        maize.pageHtml(data.data.insurance)
                        ids = data.data.insurance.id
                    }
                },
                error: function (err) {}
            });
            maize.listen()
        },
        listen: function () {
            $(document).on("click", "#insure", function () {
                if (my_token) {
                    window.open("../insure/insure.html?id=" + tool.getRequest().id, "_self");
                    localStorage.setItem("msg", null)
                } else {
                    tool.loginPrompt()
                }
            })
            $(document).on("touchstart", "#sc", function () {
                if (my_token) {
                    if ($("#scImg").attr("status") == "1") {
                        $.ajax({
                            url: localhost50010 + "/user/collection/cancel",
                            type: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            data: JSON.stringify({
                                "id": ids,
                                "code": "zxtb"
                            }),
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("login_token", my_token);
                            },
                            success: function (result) {
                                tool.tip(result.message)
                                if (result.code == "0") {
                                    $("#scImg").attr("src", "../../../img/heart.png")
                                    $("#scImg").attr("status", "0")
                                }
                            },
                            error: function (err) {}
                        });
                    } else {
                        $.ajax({
                            url: localhost50010 + "/user/collection/save",
                            type: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            data: JSON.stringify({
                                "id": ids,
                                "code": "zxtb"
                            }),
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("login_token", my_token);
                            },
                            success: function (result) {
                                tool.tip(result.message)
                                if (result.code == '0') {
                                    $("#scImg").attr("src", "../../../img/heart_hide.png")
                                    $("#scImg").attr("status", "1")
                                } else if (result.code == '9') {
                                    tool.loginPrompt()
                                }
                            },
                            error: function (err) {}
                        });
                    }
                } else {
                    tool.loginPrompt()
                }

            })
            $(document).on('click', '#_tuichu', function () {
                window.open("../../../login.html", "_self");
            })
        },
        pageHtml: function (insurance) {
            console.log(insurance)
            $("#title").html(insurance.insuranceName)
            localStorage.setItem("insuranceName", JSON.stringify(insurance.insuranceName))
            $("#banner").html(
                `<img src="${imgUrl+insurance.cover}" alt="">`
            )
            var xj = ""
            if (insurance.onsale == 0) {
                xj = '<a class = "xj">(已下架)</a>'
                insurance.good = 0
                insurance.hot = 0
                $("footer").hide()
            }
            $("#h3").html(
                `${insurance.insuranceName}${xj}
                <img id="jx" src="../../../img/jingxuan.png" alt>
                <img id="rx" src="../../../img/rexiao.png" alt>`
            )
            insurance.good == 1 ? $("#jx").show() : $("#jx").hide()
            insurance.hot == 1 ? $("#rx").show() : $("#rx").hide()
            $("#toubaowu").html(insurance.toubaoWu)
            if (insurance.termStart && insurance.termEnd) {
                $("#term").html(insurance.termStart.split(" ")[0].split("-").join(".") + "-" + insurance.termEnd.split(" ")[0].split("-").join("."))
            }
            $("#areaName").html(insurance.areaName)
            $("#companyName").html(insurance.companyName)
            $("#baoE").html(insurance.baoE)
            $("#cost").html(insurance.cost)
            if (insurance.characteristic) {
                var listArr = insurance.characteristic.split('&');
                var listHTML = "";
                for (let i = 0; i < listArr.length; i++) {
                    listHTML += `<p>${i+1}.${listArr[i]}</p>`
                }
            }


            $("#list").html(listHTML)
            $("#scheme").html(insurance.scheme)
            $("#responsibility").html(insurance.responsibility)
            if (insurance.collection == "1") {
                $("#scImg").attr("src", "../../../img/heart_hide.png")
                $("#scImg").attr("status", "1")
                console.log("//")
            } else {
                $("#scImg").attr("src", "../../../img/heart.png")
                $("#scImg").attr("status", "0")
                console.log("00")
            }
            if (myScroll) {
                myScroll.refresh();
            }
        }

    }
    maize.init()
})