var addre = {
    init() {
        addre.listen()
    },
    listen() {
        addre.initData()
        $(document).on("click", "#panduan", function () {
            if ($("#blance")[0].checked) {
                $(".blance").attr("first", 0)
                $("#blance").attr('checked', true);
            } else {
                $(".blance").attr("first", 1)
                $("#blance").removeAttr('checked');
            }
        })

        var timeOutEvent;
        $(document).on("touchstart", "#listHTML > li", function () {
            $("#address").html(`${$(this).find(".address").find("p").text()}`)
            $("#queren").attr("ids", $(this).attr("ids"))
            timeOutEvent = setTimeout(function () {
                $("#wrap").show()
            }, 1000);
        })
        //进入详情或弹框
        $(document).on("click", "#listHTML > li", function () {
            if ($("#wrap").css("display") === "block") {
                return
            }
            if ($(this).attr("ids")) {
                var ids = $(this).attr("ids")
                $.ajax({
                    url: localhost50010 + "/address/detail/" + ids,
                    type: "GET",
                    dataType: "json",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    success: function (result) {
                        if (result.code === "0") {
                            addre.detail(result.data)

                        }
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
            } else {
                addre.detail()
            }
        })
        $(document).on("touchend", "#listHTML > li", function () {
            clearTimeout(timeOutEvent);

        })
        $(document).on("touchend", "#queren", function () {
            var ids = $(this).attr("ids")
            console.log(ids)
            $.ajax({
                url: localhost50010 + "/address/cancel/" + ids,
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
                        $("#detalHTML").empty()
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
        $(document).on("click", "#close", function () {
            $("#detalHTML").empty()
            $("#mask").hide()
        })
        $(document).on("click", "#save", function () {
            var addressee = $("#addressee").val();
            var addresss = $("#addre").val();
            var telephone = $("#telephone").val();
            var first = $(".blance").attr("first");

            if ($("#detalHTML").attr("ids")) {
                var id = $("#detalHTML").attr("ids");
                var data = {
                    id: id,
                    addressee: addressee,
                    address: addresss,
                    telephone: telephone,
                    "first": first
                }
            } else {
                var data = {
                    addressee: addressee,
                    address: addresss,
                    telephone: telephone,
                    "first": first
                }
            }
            //保存地址
            $.ajax({
                url: localhost50010 + "/address/save",
                type: "POST",
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                data: JSON.stringify(data),
                success: function (result) {
                    tool.tip(result.message)
                    if (result.code === "0") {
                        addre.initData()
                        $("#detalHTML").empty()
                        $("#mask").hide()
                    }
                },
                error: function (error) {
                    console.log(error)
                }
            })
        })
        $(document).on('click', '#_tuichu', function () {
            window.open("../../../login.html", "_self");
        })
    },
    addressHtml(data) {
        var listFirst = "";
        var list = "";
        for (let i = 0; i < data.length; i++) {
            if (data[i].first === "1") {
                listFirst =
                    `<li ids="${data[i].id}">
                        <div class="left">
                            <img src="../../../img/address_hide.png" alt="">
                        </div>
                        <div class="center">
                            <p class="name">${data[i].addressee}</p>
                            <div class="address">
                                <p>${data[i].address}</p>
                            </div>
                            <p class="tel">${data[i].telephone}</p>
                        </div>
                        <div class="right">
                            <img class="else" src="../../../img/else.png" alt="">
                            <img class="mo" src="../../../img/mo.png" alt="" srcset="">
                        </div>
                    </li> `
            } else {
                list +=
                    `<li ids="${data[i].id}">
                        <div class="left">
                            <img src="../../../img/address.png" alt="">
                        </div>
                        <div class="center">
                            <p class="name">${data[i].addressee}</p>
                            <div class="address">
                                <p>${data[i].address}</p>
                            </div>
                            <p class="tel">${data[i].telephone}</p>
                        </div>
                        <div class="right">
                            <img class="else" src="../../../img/else.png" alt="">
                        </div>
                    </li> `
            }
        }
        var addHTML =
            `<li class="addAddress">
                <img src="../../../img/addAddress.png" alt="">
            </li>`
        $("#listHTML").html(
            listFirst + list + addHTML
        )
        if (myScroll) {
            myScroll.refresh();
        }
    },
    detail(data) {
        // console.log(data.address)
        if (data) {
            data.address.first === "1" ? check = "checked=''" : check = ""
            addressee = data.address.addressee
            telephone = data.address.telephone
            address = data.address.address
            first = data.address.first
            ids = data.address.id
        } else {
            check = ""
            addressee = ""
            telephone = ""
            address = ""
            first = "0"
            ids = ""
        }
        var detal =
            `<div class="top">
                <div class="close">
                    <img id="close" src="../../../img/close-blue.png">
                </div>
                <p class="name">
                    姓名
                </p>
                <input id="addressee" type="text" value="${addressee}">
                <p class="name">
                    电话
                </p>
                <input id="telephone" type="text" value="${telephone}">
                <p class="name">
                    地址
                </p>
                <input id="addre" type="text" value="${address}">
                <p class="name">
                    设置默认地址
                </p>
                <div class="blance" first="${first}">
                    <input type="checkbox" name="Storage2" id="blance" ${check}>
                    <label id="panduan" for="blance"><em></em></label>
                </div>
            </div>
            <div class="bottom">
                <input id="save" type="button" value="确认修改">
            </div>`
        $("#detalHTML").html(detal)
        $("#detalHTML").attr("ids", ids)
        $("#mask").show()
    },
    initData() {
        $.ajax({
            url: localhost50010 + "/address/getList",
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
                } else if (result.code === "9") {
                    tool.loginPrompt()
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