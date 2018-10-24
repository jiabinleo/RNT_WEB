$(function () {
    var my_token = JSON.parse(sessionStorage.getItem("my_token"));
    console.log(my_token)
    var insure = {
        init: function () {
            $.ajax({
                url: localhost40000 + "/policy/optionList?policyId=" + tool.getRequest().policyId,
                type: "POST",
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function (data) {
                    if (data.code === "0") {
                        console.log(data)
                        insure.isShow(data)
                    }
                },
                error: function () {}
            })
        },
        isShow: function (data) {
            console.log(data)
            //要显示的内容
            $.ajax({
                url: localhost40000 + "/policy/optionList?policyId=" + tool.getRequest().policyId,
                type: "GET",
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json',
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function (data) {
                    console.log(data)
                    // if (data.code === "0") {
                    //     var optionS = $(document).find(".optionCode")
                    //     var optionListData = data.data.optionList
                    //     for (let i = 0; i < optionS.length; i++) {
                    //         $(".optionCode").eq(i).hide()
                    //     }
                    //     msg = JSON.parse(localStorage.getItem("msg"))[0]
                    //     var price = null,
                    //         sumprice = null,
                    //         term_start = null,
                    //         term_end = null;
                    //     for (let j = 0; j < optionListData.length; j++) {

                    //         $("." + optionListData[j].optionCode).show()
                    //         if (optionListData[j].optionCode === "acreage") {
                    //             optionObj[optionListData[j].optionCode] = parseFloat($("#" + optionListData[j].optionCode).text())
                    //         } else {
                    //             optionObj[optionListData[j].optionCode] = $("#" + optionListData[j].optionCode).text()
                    //             if (optionListData[j].dataValue) {
                    //                 $("#" + optionListData[j].optionCode).text(optionListData[j].dataValue)
                    //                 msg[optionListData[j].optionCode] = optionListData[j].dataValue
                    //             }
                    //         }
                    //     }
                    //     var price = (parseFloat($("#danjia").html()) * parseFloat($("#acreage").html())).toFixed(2)
                    //     $("#zongjia").html(price)
                    //     optionObj.zongjia = price
                    //     optionObj.danjia = $("#danjia").html()
                    //     optionObj.holder_name = $("#holder_name").html()
                    //     optionObj.beneficiary_name = $("#beneficiary_name").html()


                    //     localStorage.setItem("msg", JSON.stringify([msg]))
                    //     if (myScroll) {
                    //         myScroll.refresh();
                    //     }
                    // }
                },
                error: function (err) {
                    console.log(err)
                }
            });
        }
    }
    insure.init()
})