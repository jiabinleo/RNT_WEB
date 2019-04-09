$(function () {
    var categoryCode = null; //分类
    var label = null; //标签
    var pageNum = 1;
    var pageSize = 10;
    var fwzx = {
        init() {
            fwzx.listen()
            fwzx.bq()
        },
        listen() {
            $("#center").click(function () {
                $(".masked").addClass(" maskeds");
                $(".personalCente").addClass(" peractive");
            });
            $(".masked").click(function () {
                $(".masked").removeClass(" maskeds");
                $(".personalCente").removeClass(" peractive");
            });
            $(document).on("click", "#user_quit", function () {
                sessionStorage.setItem("my_token", '');
                window.open("../../../login.html", "_self");
            });
            $(document).on('click', '#userImg', function () {
                $('#img').attr('src', $(this).attr('src'))
                $('#img').show()
                $('#mask').show()
            })
            $(document).on('click', '#mask', function () {
                $(this).hide()
                $('#img').hide()
            })
            $(document).on('click', '#img', function (e) {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    window.event.returnValue == false;
                }
                return false
            })
            $(document).on('click', '#_tuichu', function () {
                window.open("../../../login.html", "_self");
            })
            $(document).on('touchstart', '#personalCente_content li', function () {
                $(this).find('.me')
                    .addClass("active")
                $(this).siblings().find('.me')
                    .removeClass("active");
            })
            $(document).on('click', '#personalCente_content li', function () {
                let ids = $(this).attr('ids')
                if (ids == "gy") {
                    window.open(`../../grzx/${ids}/${ids}.html`, `_self`);
                } else
                if (my_token) {
                    window.open(`../../grzx/${ids}/${ids}.html`, `_self`);
                } else {
                    tool.loginPrompt()
                }
            })
            $(document).on('click', 'footer .n', function () {
                if (my_token) {
                    window.open(`../../policyPage/policyList/policyList.html`, `_self`);
                } else {
                    tool.loginPrompt()
                }
            })
            $(document).on('click', "#user_logo", function () {
                if (my_token) {
                    window.open(`../../grzx/grzl/grzl.html`, `_self`);
                } else {
                    tool.loginPrompt()
                }
            })
            // 问题分类
            $.ajax({
                url: localhost50010 + `/question/category`,
                type: 'POST',
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success(result) {
                    console.log(result)
                    if (result.code === '0') {
                        console.log(result)
                        result.data.list.forEach((ele, index) => {
                            // `<span ids="${ele.id}">${ele.text}</span>`
                            $("#swiper_menu").append(
                                `<div class="swiper-slide" ids="${ele.id}">
                                    <span>${ele.text}</span>
                                </div>`
                            )
                        })
                        var mySwiper1 = new Swiper(".swiper-menu", {
                            slidesPerView: 3
                        });
                    }
                    $("#inner").html(result.message)
                },
                error(error) {
                    console.log(error)
                }
            })
            //获取用户信息
            $.ajax({
                url: localhost50010 + "/user/getUser?account=" + account,
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
                        if (result.data.user.userName) {
                            $("#user_name").html(result.data.user.userName)
                        } else {
                            $("#user_name").html('悦农通')
                        }
                        $("#userImg").attr("src", imgUrl + result.data.user.icon)
                        if (result.data.user.sign) {
                            $("#user_personalized").html(`<p>${result.data.user.sign}</p>`)
                        }
                    }
                },
                error: function (error) {
                    console.log(error)
                }
            })
            $(document).on("click", "#swiper_menu > .swiper-slide", function () {
                $(this).addClass("active").siblings().removeClass("active")
                categoryCode = $(this).attr("ids")
                label = null
                console.log(categoryCode)
                console.log(label)
                fwzx.bq($(this).attr("ids"))
            })
            $(document).on("click", "#hot > div", function () {
                $(this).addClass("active").siblings().removeClass("active")
                label = $(this).attr('ids')
                console.log(categoryCode)
                console.log(label)
                $("#wtList").empty()
                fwzx.list()
            })
            //详情
            $(document).on("click", "#wtList > li", function () {
                window.open('fwzxxq.html?id=' + $(this).attr("ids"), '_self')
            })
        },
        // 获取标签
        bq(ids) {
            $.ajax({
                url: localhost50010 + `/question/label?categoryCode=` + ids,
                type: 'POST',
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success(result) {
                    if (result.code === '0') {
                        console.log(result)
                        $("#hot").empty()
                        result.data.list.forEach((ele, index) => {
                            $("#hot").append(
                                `<div ids="${ele.id}">${ele.text}</div>`
                            )
                        })
                        fwzx.list()
                    }
                },
                error(error) {
                    console.log(error)
                }
            })
        },
        list() {
            $("#wrapper").css({
                top: $("header").height() + $("menu").height() + $("section").height()
            })
            $.ajax({
                url: localhost50010 + `/question/indexQuestionList?pageNum=${pageNum}&pageSize=${pageSize}&categoryCode=${categoryCode}&label=${label}`,
                type: 'POST',
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success(result) {
                    console.log(result)
                    $("#inner").html(result.message)
                    if (result.code === '0') {
                        $("#wtList").empty()
                        $("#ljb-mask").remove();
                        result.data.list.forEach((ele, index) => {
                            $("#wtList").append(
                                `<li ids="${ele.id}">${ele.question}</li>`
                            )
                        })
                    }
                    if (myScroll) {
                        myScroll.refresh();
                    }
                },
                error(error) {
                    console.log(error)
                }
            })
        }
    }
    fwzx.init()
})