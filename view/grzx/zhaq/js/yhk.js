$(function () {
    var timeOutEvent;
    var yhk = {
        init() {
            yhk.listen()
        },
        listen() {
            yhk.getYhk()
            $(document).on("touchstart", ".add", function () {
                window.open("addYhk.html", "_self")
            })
            $(document).on("touchstart", "#cardList > li", function () {
                $("#delkh").html(`尾号为${$(this).attr("data-cardnumber")}的银行卡`)
                $("#queren").attr("delId", $(this).attr("data-id"))
                timeOutEvent = setTimeout(function () {
                    $("#wrap").show()
                }, 500);
            })
            $(document).on("touchend", "#cardList > li", function () {
                clearTimeout(timeOutEvent);
            })
            // 确认取消
            $(document).on("touchend", "#queren", function () {
                var delId = $(this).attr("delid")
                $.ajax({
                    url: localhost50002 + "/card/delCard",
                    type: "POST",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    data: JSON.stringify({
                        id: delId
                    }),
                    success: function (result) {
                        console.log(result)
                        if (result.code === "0") {
                            yhk.getYhk()
                            $("#wrap").hide()
                            if (myScroll) {
                                myScroll.refresh();
                            }
                        }
                    },
                    error: function (err) {
                        console.log(err)
                    }
                })
            })
            $(document).on("touchend", "#quxiao", function () {
                $("#wrap").hide()
            })
        },
        getYhk() {
            $.ajax({
                url: localhost50002 + "/card/dataGrid",
                type: "GET",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json"
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function (result) {
                    console.log(result)
                    if (result.code === "0") {
                        $("#cardList").empty()
                        result.data.cardList.forEach((ele) => {
                            console.log(ele)
                            bg =
                                $("#cardList").append(
                                    `<li data-id="${ele.id}" data-cardNumber="${ele.cardNumber}">
                                    <div class="bg" style="background-image: url('${imgUrl + ele.icon}');">
                                        <span class="left">****</span>
                                        <span class="bankId">
                                            ${ele.cardNumber}
                                        </span>
                                    </div>
                                </li>`
                                )
                        })
                        if (myScroll) {
                            myScroll.refresh();
                        }
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            })
        }
    }
    yhk.init()
})