(function () {
    var timeOutEvent,
        policyList = {
            init: function () {
                policyList.getList()
                policyList.listen();
            },
            listen: function () {
                $(document).on("touchstart", ".lis", function () {
                    $("#address").html(`${$(this).find("h2").text()}`)
                    $("#queren").attr("detailid", $(this).attr("detailid"))
                    $("#queren").attr("categorycode", $(this).attr("categorycode"))
                    timeOutEvent = setTimeout(function () {
                        $("#wrap").show()
                    }, 500);
                })
                $(document).on("touchend", ".lis", function () {
                    clearTimeout(timeOutEvent);
                })
                $(document).on("click", ".lis", function () {
                    if ($("#wrap").css('display') === 'block') {
                        return
                    }
                    if ($(this).attr("categorycode") && $(this).attr("categorycode")) {
                        if ($(this).attr("categorycode") == "gqsc") {
                            window.open("gqxq.html?ids=" + $(this).attr("detailid"), "_self");
                        }
                    }
                })
                $(document).on("touchend", "#queren", function () {
                    var detailid = $(this).attr("detailid")
                    var categorycode = $(this).attr("categorycode")
                    $.ajax({
                        url: localhost50010 + "/user/collection/cancel",
                        type: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify({
                            "id": detailid,
                            "code": categorycode
                        }),
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("login_token", my_token);
                        },
                        success: function (result) {
                            console.log(result)
                            policyList.getList()
                        },
                        error: function (err) {}
                    });
                    return false;
                })
                $(document).on("touchend", "#quxiao", function () {
                    $("#wrap").hide()
                    return false
                })

                $(document).on("touchend", "#_tuichu", function () {
                    window.open('../../../login.html', '_self')
                })
            },
            getList() {
                $.ajax({
                    url: localhost50010 + "/supply/collection",
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
                            console.log(result)
                            policyList.listHTML(result.data.list);
                        }
                    },
                    error: function (error) {}
                });
            },
            listHTML: function (data) {
                var _this = this
                $("#listHTML").empty()
                data.forEach((ele, index) => {
                    console.log(ele)
                    console.log(imgUrl + ele.icon)
                    $("#listHTML").append(
                        `<div detailId="${ele.detailId}" class="lis" categoryCode="${ele.categoryCode}">
                                <div class="left lisImg">
                                <img src="${imgUrl+ele.icon}" onerror="javascript:this.src='img/error.png" alt>
                            </div>
                            <div class="right">
                                <h2>${ele.title}</h2>
                                <p>${ele.brief}</p>
                                <p><span>${ele.author}</span><span>${tool.timeConversion(ele.updateTime,'刚刚收藏')}</span></p>
                            </div>
                        </div>
                        <div class="line">
                        </div>
                        `
                    );
                });
                $("#wrap").hide()
                if (myScroll) {
                    myScroll.refresh();
                }
            },
        };
    policyList.init();
})();