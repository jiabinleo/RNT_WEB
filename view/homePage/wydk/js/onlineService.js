var onlineService = {
    init: function () {
        onlineService.listen()
    },
    listen: function () {
        var _this = this
        //客服
        $.ajax({
            url: localhost50010 + "/message/kefu",
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
                    $("#marquee").html(result.data.kefu.message)
                    $(".tel").attr("href", "tel:" + result.data.kefu.tel)
                }
            },
            error: function (error) {
                console.log(error)
            }
        })

        $(document).on("touchend", "#closeMarquee", function () {
            $(".marquee").hide()
            $("#wrapper").addClass("wrapper")
        })

        $.ajax({
            url: `${localhost50010}/question/serviceIndexQList`,
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
                    _this.question(result.data.list)
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
        $(document).on("touchend", "#content_list .title", function () {
            if ($(this).parent().hasClass("active")) {
                $(this).parent().removeClass("active")
                $(this).find("img").attr("src", "../../../img/arrow-right-gray.png")
            } else {
                $(this).parent().addClass("active")
                $(this).find("img").attr("src", "../../../img/arrow-bottom-blue.png")
            }
            if (myScroll) {
                myScroll.refresh();
            }
        })

        $(document).on('click', '#_tuichu', function () {
            window.open("../../../login.html", "_self");
        })
        $(document).on('click', 'footer li', function () {
            let ids = $(this).attr('ids')
            if (ids) {
                if (my_token) {
                    window.open(`${ids}.html`, `_self`);
                } else if (ids == "onlineService" || ids == "wydk") {
                    window.open(`${ids}.html`, `_self`);
                } else {
                    tool.loginPrompt()
                }
            }
        })
    },
    question(list) {
        console.log(list)
        $("#content_list").empty()
        var answer = "",
            lisHTML = "";
        list.forEach((ele, index) => {
            answer = ele.answer.split('&')
            console.log(answer)
            lisHTML = ""
            answer.forEach((ele, index) => {
                lisHTML += `<li>(${index+1})${ele}</li>`
            })
            $("#content_list").append(
                `<li class="list">
                <div class="title">
                    <p>(${index+1})${ele.question}</p>
                    <span class="img">
                        <img src="../../../img/arrow-right-gray.png" alt="" />
                    </span>
                </div>
                <ul class="content_list_text">
                    ${lisHTML}
                </ul>
            </li>`
            )
        })
    }
}
onlineService.init()