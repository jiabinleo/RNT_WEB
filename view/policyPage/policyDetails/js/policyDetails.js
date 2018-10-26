$(function () {
    var my_token = JSON.parse(sessionStorage.getItem("my_token")),
        policyDetails = {
            init: function () {
                var id = tool.getRequest().id;
                $.ajax({
                    url: localhost40000 + "/policy/detail/" + id,
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
                            policyDetails.htmlData(result)
                        }
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
            },
            listen: function () {
                // var optionS = $(document).find(".optionCode")
                // for (let i = 0; i < optionS.length; i++) {
                //     $(".optionCode").eq(i).hide()
                // }
            },
            htmlData: function (result) {
                console.log(result)
                var policy = result.data.policy
                var optionList = result.data.optionList
                $("#status").html(policyDetails.status(policy.status))
                $("#policyNumber").html(`订单号 : ${policy.policyNumber}`)
                for (let i = 0; i < optionList.length; i++) {
                    if (optionList[i].optionCode === "zongjia") {
                        $("#zongjia").html(`<a>￥</a>${optionList[i].dataValue}</span>`)
                    } else if (optionList[i].optionCode === "holder_zjlx") {
                        $("#holder_zjlx").html(optionList[i].dataValue + "：")
                    } else if (optionList[i].optionCode === "holder_id_card") {
                        $("#holder_id_card").html(optionList[i].dataValue)
                    } else {
                        $("#" + optionList[i].optionCode).html(optionList[i].dataValue)
                    }
                    $("." + optionList[i].optionCode).show()
                    console.log(optionList[i].optionCode)
                }
            },
            status: function (sta) {
                var str = '-';
                switch (sta) {
                    case "1":
                        str = '<span class="minRight red">待支付</span>'
                        break;
                    case "2":
                        str = '<span class="minRight blue">正在生效</span>'
                        break;
                    case "3":
                        str = '<span class="minRight gray">已理赔</span>'
                        break;
                    case "4":
                        str = '<span class="minRight gray">已终止</span>'
                        break;
                    default:
                        str = '-'
                        break;
                }
                return str;
            }
        }
    policyDetails.init()
})