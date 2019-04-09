$(function () {
    var addCard = {}
    var addYhk = {
        init() {
            addYhk.listen()
        },
        listen() {
            addYhk.getYhCode()
            //选择银行
            $(document).on("touchstart", "#bankList li", function () {
                $(this).find("img").attr("src", "../../../img/radio-yes.png")
                $(this).siblings().find("img").attr("src", "../../../img/radio-no.png")
                $("#bankCode").val($(this).find("span").text())
                $("#bankCode").attr('code', $(this).attr("code"))
            })
            $(document).on("touchend", "#bankList li", function () {
                $('#wrap').hide()
            })
            $(document).on("touchend", "#kh", function () {
                $('#wrap').show()
            })
            $(document).on("touchend", "#save", function () {
                addCard.cardNumber = $("#cardNumber").val()
                addCard.bankCode = $("#bankCode").attr("code")
                addCard.owner = $("#owner").val()
                if (addCard.cardNumber && addCard.bankCode && addCard.owner) {
                    console.log(addCard)
                    $.ajax({
                        url: localhost50002 + "/card/addCard",
                        type: "POST",
                        dataType: "json",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("login_token", my_token);
                        },
                        data: JSON.stringify(addCard),
                        success: function (result) {
                            console.log(result)
                            if (result.code === "0") {
                                window.open("yhk.html", "_self")
                            }
                        },
                        error: function (err) {
                            console.log(err)
                        }
                    })
                }

            })
        },
        // 获取银行
        getYhCode: function () {
            $.ajax({
                url: localhost50002 + "/card/bankList",
                type: "GET",
                dataType: "json",
                success: function (result) {
                    console.log(result)
                    if (result.code === "0") {
                        result.data.bankList.forEach((ele, index) => {
                            console.log(ele)
                            $("#bankList").append(
                                `<li code = '${ele.code}'>
                                    <div class="left">
                                        <span>${ele.text}</span>
                                    </div>
                                    <div class="right">
                                        <img src="../../../img/radio-no.png" alt="">
                                    </div>
                                </li>`
                            )
                        });
                    }
                },
                error: function () {

                }
            })
        }
    }
    addYhk.init()
})