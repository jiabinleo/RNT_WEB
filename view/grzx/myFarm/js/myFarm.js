var addre = {
    init() {
        addre.listen()
    },
    listen() {
        addre.initData()

        var timeOutEvent;
        $(document).on("touchstart", "#listHTML > li", function () {
            $("#address").html(`${$(this).find(".name").text()}`)
            $("#queren").attr("ids", $(this).attr("ids"))
            timeOutEvent = setTimeout(function () {
                $("#wrap").show()
            }, 500);
        })
        $(document).on("touchend", "#listHTML > li", function () {
            clearTimeout(timeOutEvent);
        })
        $(document).on("click", "#listHTML > li", function () {
            if ($("#wrap").css('display') === 'block') {
                return
            }
            if ($(this).attr("ids")) {
                window.open("addFarm.html?id=" + $(this).attr("ids"), "_self");
            } else {
                window.open("addFarm.html", "_self");
            }
        })
        $(document).on("touchend", "#queren", function () {
            var ids = $(this).attr("ids")
            console.log(ids)
            $.ajax({
                url: localhost50010 + "/farm/cancel/" + ids,
                type: "POST",
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function (result) {
                    if (result.code === "0") {
                        addre.initData()
                        $("#wrap").hide()
                    }
                },
                error: function (error) {
                    console.log(error)
                }
            })
            return false;
        })
        $(document).on("touchend", "#quxiao", function () {
            $("#wrap").hide()
            return false
        })
        $(document).on('click', '#listHTML .del', function () {
            $("#address").html(`${$(this).parent().parent().find(".name").text()}`)
            $("#queren").attr("ids", $(this).attr("ids"))
            $("#wrap").show()
            return false
        })
    },
    addressHtml(data) {
        var list = "";
        for (let i = 0; i < data.length; i++) {
            list +=
                `<li ids="${data[i].id}">
                    <div class="left">
                        <img src="img/nameIcon.png" alt="">
                    </div>
                    <div class="center">
                        <p class="name">${data[i].name}</p>
                        <div class="address">
                            <p>${data[i].address}</p>
                        </div>
                        <span class="tel">${data[i].acreage}亩</span>
                        <span>${data[i].plant}</span>
                    </div>
                    <div class="right">
                        <img class="else" src="../../../img/icon/else.png" alt="">
                        <div class="del">
                            <img class="else" src="../../../img/icon/del.png" alt="">
                        </div>
                    </div>
                </li> `
        }
        var addHTML =
            `<li id="addAddress" class="addAddress">
                <img src="img/addMoreFarm.png" alt="">
            </li>`
        $("#listHTML").html(
            list + addHTML
        )
        // if (myScroll) {
        //     myScroll.refresh();
        // }
    },
    initData() {
        $.ajax({
            url: localhost50010 + "/farm/getList",
            type: "GET",
            dataType: "json",
            headers: {
                'Content-Type': 'application/json'
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("login_token", my_token);
            },
            success: function (result) {
                console.log(result)
                if (result.code === "0") {
                    addre.addressHtml(result.data.list)
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
    },
    isNull(str) {
        if (str) {
            return str
        } else {
            return ""
        }
    }
}
addre.init()