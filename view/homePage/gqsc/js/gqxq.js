$(function () {
    var gqxq = {
        init() {
            gqxq.listen()
        },
        listen() {
            var ids = tool.getRequest().ids
            console.log(ids)
            $.ajax({
                url: localhost50010 + "/supply/detail/" + ids,
                type: "GET",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json"
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function (result) {
                    var marketSupply = result.data.marketSupply
                    gqxq.htmls(marketSupply)
                },
                error: function (error) {
                    console.log(error);
                }
            });
            $(document).on('click', '#sc', function () {
                var data = {
                    "id": ids,
                    "code": "gqsc"
                }
                if ($(this).attr("status") == 1) {
                    $.ajax({
                        url: localhost50010 + "/user/collection/cancel",
                        type: "POST",
                        dataType: "json",
                        data: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json"
                        },
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("login_token", my_token);
                        },
                        success: function (result) {
                            if (result.code == "0") {
                                $("#sc").attr("status", "0")
                                $("#sc > img").attr('src', '../../../img/icon/sc.png')
                                tool.tip(result.message)
                            } else if (result.code == "9") {
                                tool.loginPrompt()
                            } else {
                                tool.tip(result.message)
                            }
                        },
                        error: function (error) {
                            console.log(error);
                            tool.tip('网络连接失败')
                        }
                    });
                } else {
                    $.ajax({
                        url: localhost50010 + "/user/collection/save",
                        type: "POST",
                        dataType: "json",
                        data: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json"
                        },
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("login_token", my_token);
                        },
                        success: function (result) {
                            if (result.code == "0") {
                                $("#sc").attr("status", "1")
                                $("#sc > img").attr('src', '../../../img/icon/sc_pre.png')
                                tool.tip(result.message)
                            } else if (result.code == "9") {
                                tool.loginPrompt()
                            } else {
                                tool.tip(result.message)
                            }
                        },
                        error: function (error) {
                            console.log(error);
                            tool.tip('网络连接失败')
                        }
                    });
                }
            })

            $(document).on('click', '#dz', function () {
                var data = {
                    "id": ids
                }
                if ($(this).attr("status") == 1) {
                    $.ajax({
                        url: localhost50010 + "/supply/zan?id=" + ids + "&isZan=0",
                        type: "GET",
                        dataType: "json",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("login_token", my_token);
                        },
                        success: function (result) {
                            if (result.code == "0") {
                                $("#dz").attr("status", "0")
                                $("#dz > img").attr('src', '../../../img/icon/dz.png')
                                tool.tip(result.message)
                            } else if (result.code == "9") {
                                tool.loginPrompt()
                            } else {
                                tool.tip(result.message)
                            }
                        },
                        error: function (error) {
                            console.log(error);
                            tool.tip('网络连接失败')
                        }
                    });
                } else {
                    $.ajax({
                        url: localhost50010 + "/supply/zan?id=" + ids + "&isZan=1",
                        type: "GET",
                        dataType: "json",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("login_token", my_token);
                        },
                        success: function (result) {
                            if (result.code == "0") {
                                $("#dz").attr("status", "1")
                                $("#dz > img").attr('src', '../../../img/icon/dz_pre.png')
                                tool.tip(result.message)
                            } else if (result.code == "9") {
                                tool.loginPrompt()
                            } else {
                                tool.tip(result.message)
                            }
                        },
                        error: function (error) {
                            console.log(error);
                            tool.tip('网络连接失败')
                        }
                    });
                }
            })

            $(document).on('click', '#_tuichu', function () {
                window.open('../../../login.html', '_self')
            })
        },
        htmls(data) {
            $("#icon").attr("src", imgUrl + data.icon)
            $("#userName").html(data.userName)
            $("#publishTime").html(tool.timeConversion(data.publishTime))
            $("#area").html(data.area)
            $("#title").html(data.title)
            $("#detail").html(data.detail)
            console.log(data)
            var STA = data.supplyTime.split(' ')[0].split('-')
            var supplyTime = STA[0] + '年' + STA[1] + '月' + STA[2] + '日'
            var detailList = [{
                    'name': '所在区域',
                    'val': data.area
                },
                {
                    'name': '供应类型',
                    'val': data.cropName
                },
                {
                    'name': '所在区域',
                    'val': data.totalAmount
                },
                {
                    'name': '起售量',
                    'val': data.minAmount
                },
                {
                    'name': '供应价格',
                    'val': data.price
                },
                {
                    'name': '联系人',
                    'val': data.contacts
                },
                {
                    'name': '联系电话',
                    'val': data.telephone
                },
                {
                    'name': '供货截止日期',
                    'val': supplyTime
                }
            ]
            $("#detailList").empty()
            detailList.forEach(ele => {
                $("#detailList").append(
                    ` <li>
                    <span>${ele.name}</span>
                    <span id="area">${ele.val}</span>
                </li>`
                )
            });
            console.log(detailList)

            if (data.isCollection == 1) {
                $("#sc").attr("status", "1")
                $("#sc>img").attr('src', '../../../img/icon/sc_pre.png')
            } else {
                $("#sc").attr("status", "0")
                $("#sc>img").attr('src', '../../../img/icon/sc.png')
            }
            if (data.isZan == 1) {
                $("#dz").attr("status", "1")
                $("#dz>img").attr('src', '../../../img/icon/dz_pre.png')
            } else {
                $("#dz").attr("status", "0")
                $("#dz>img").attr('src', '../../../img/icon/dz.png')
            }
            $("#tel").attr("href", "tel:" + data.telephone)
            if (data.fileList) {
                var filesArr = data.fileList.split(",")
                filesArr.forEach(ele => {
                    $("#imgList").append(
                        `<li>
                            <img src="${imgUrl + ele}" />
                        </li>`
                    )
                });
            }

            if (myScroll) {
                myScroll.refresh();
            }
        }
    }
    gqxq.init()
})