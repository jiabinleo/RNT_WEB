$(function () {
    var data = {}
    var s = tool.getRequest().s.split('_')
    //技术服务
    if (s[0] === "jsfw") {
        console.log(s)
        data = {
            planttype: s[2],
            secondCategory: s[1]
        }
        var diseaseAndInsectBank = {
            init: function () {
                diseaseAndInsectBank.listen()

            },
            listen: function () {
                diseaseAndInsectBank.list(data)
                $(document).on("click", "#diseaseList > li", function () {
                    window.open("insectPestsDetials.html?ids=bch_" + $(this).attr("data-id"), "_self")
                })
            },
            list(data) {
                $.ajax({
                    url: localhost50002 + '/plantserver/loadByThreeCategory',
                    type: "POST",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    data: JSON.stringify(data),
                    success: function (result) {
                        console.log(result)
                        if (result.code === "0") {
                            var list = result.data.plantServerList[0].children
                            console.log(list)
                            list.forEach((ele, index) => {
                                console.log(ele)
                                var img = ele.imgSamllPath.split(',')[0]
                                if (!index) {
                                    $("#title").text(result.data.typeList[ele.planttype])
                                }
                                $("#diseaseList").append(
                                    `<li data-id = "${ele.id}">
                                        <div>
                                            <img src="${imgUrl + img}" alt="">
                                        </div>
                                        <p>${ele.typename}</p>
                                    </li>`
                                )
                            });
                        }
                    },
                    error: function () {}
                })

            },
        }
        diseaseAndInsectBank.init()
    } else {
        //病虫害
        data = {
            // "isrefer": 2,
            secondCategory: s[0]
        }
        var diseaseAndInsectBank = {
            init: function () {
                diseaseAndInsectBank.listen()

            },
            listen: function () {
                diseaseAndInsectBank.list(data)
                $(document).on("click", "#diseaseList > li", function () {
                    window.open("insectPestsDetials.html?ids=bch_" + $(this).attr("data-id"), "_self")
                })
            },
            list(data) {
                $.ajax({
                    url: localhost50002 + '/pests/loadBySecondCategory',
                    type: "POST",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    data: JSON.stringify(data),
                    success: function (result) {
                        console.log(result)
                        if (result.code === "0") {
                            var list = result.data.pestsList[0].children
                            console.log(list)
                            list.forEach((ele, index) => {
                                console.log(ele)
                                var img = ele.imgSamllPath.split(',')[0]
                                if (!index) {
                                    $("#title").text(result.data.typeList[ele.secondCategory])
                                }
                                $("#diseaseList").append(
                                    `<li data-id = "${ele.id}">
                                            <div>
                                                <img src="${imgUrl + img}" alt="">
                                            </div>
                                            <p>${ele.pestsName}</p>
                                        </li>`
                                )
                            });
                        }
                    },
                    error: function () {}
                })

            },
        }
        diseaseAndInsectBank.init()

    }

})