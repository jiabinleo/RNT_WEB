$(function () {
    var indexPage = {
        init: function () {
            tool.isLogin
            indexPage.listen();
            tool.loading();
            if (my_token) {

            } else if ($.cookie("account") && $.cookie("password")) {
                this.autoLogin()
            }
        },
        listen: function () {
            var _this = this
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
                window.open("login.html", "_self");
            });
            $(document).on("click", "#news > .newsList", function () {
                window.open(`view/homePage/xwxq/xwxq.html?id=${$(this).attr("data-id")}`, "_self");
            })
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
                window.open("login.html", "_self");
            })
            $(document).on('click', '#personalCente_content li', function () {
                $(this).find('.me')
                    .addClass("active")
                $(this).siblings().find('.me')
                    .removeClass("active");
                let ids = $(this).attr('ids')
                if (ids == "gy") {
                    window.open(`view/grzx/${ids}/${ids}.html`, `_self`);
                } else
                if (my_token) {
                    window.open(`view/grzx/${ids}/${ids}.html`, `_self`);
                } else {
                    tool.loginPrompt()
                }
            })
            $(document).on('click', 'footer .n', function () {
                if (my_token) {
                    window.open(`view/policyPage/policyList/policyList.html`, `_self`);
                } else {
                    tool.loginPrompt()
                }
            })
            //banner跳转
            $(document).on('click', "#banner > .swiper-slide", function () {
                if ($(this).attr('link')) {
                    window.open($(this).attr('link'), "_self")
                }
            })
            $(document).on('click', "#user_logo", function () {
                if (my_token) {
                    window.open(`view/grzx/grzl/grzl.html`, `_self`);
                } else {
                    tool.loginPrompt()
                }
            })
            $.ajax({
                url: localhost50010 + "/index/bannerList?category=index",
                type: "get",
                dataType: 'json',
                success: function (data) {
                    $("#ljb-mask").remove()
                    tool.tip(data.message)
                    console.log(data)
                    if (data.code === "0") {
                        indexPage.banner(data.data.bannerList)
                    }
                },
                error: function (err) {
                    $("#ljb-mask").remove()
                    tool.tip('网络连接失败')
                }
            });
            $.ajax({
                url: localhost50010 + "/index/menuList",
                type: "get",
                dataType: 'json',
                success: function (data) {
                    if (data.code === "0") {
                        indexPage.menu(data.data.menuList)
                    }
                },
                error: function (err) {}
            });

            $.ajax({
                url: localhost50010 + "/news/indexNewsList",
                type: "get",
                dataType: 'json',
                success: function (data) {
                    if (data.code === "0") {
                        indexPage.indexNews(data.data.newsList)
                    }
                },
                error: function (err) {}
            });
            _this.getUser($.cookie("account"), my_token)
        },
        //banner链接
        banner(bannerList) {
            var bannerHTML = "";
            for (let i = 0; i < bannerList.length; i++) {
                console.log(bannerList[i])
                var link = 'javascript:;';
                if (bannerList[i].type == 2 && bannerList[i].detailId) {
                    if (bannerList[i].categoryCode == "zxtb") {
                        link = `http://127.0.0.1:5500/view/homePage/maize/maize.html?id=${bannerList[i].detailId}`
                    } else if (bannerList[i].categoryCode == "wydk") {
                        link = `http://127.0.0.1:5500/view/homePage/plantingLoan/plantingLoan.html?id=${bannerList[i].detailId}`
                    } else if (bannerList[i].categoryCode == "gqsc") {
                        link = `http://127.0.0.1:5500/view/homePage/gqsc/gqxq.html?ids=${bannerList[i].detailId}`
                    } else if (bannerList[i].categoryCode == "nyzx") {
                        link = `http://127.0.0.1:5500/view/homePage/xwxq/xwxq.html?id=${bannerList[i].detailId}`
                    }
                } else if (bannerList[i].type == 1 && bannerList[i].linkUrl) {
                    link = bannerList[i].linkUrl
                }
                bannerHTML +=
                    `<div link = "${link}" class="swiper-slide">
                            <img src="${imgUrl+bannerList[i].bannerImg}" alt="${bannerList[i].bannerName}">
                    </div>`;
            }
            $("#banner").html(bannerHTML);
            if (myScroll) {
                myScroll.refresh();
            }
            var mySwiper = new Swiper(".swiper-container", {
                autoplay: 3000,
                loop: true,
                speed: 1000,
                // slidesPerView: 'auto',
                pagination: ".swiper-pagination",
                autoplayDisableOnInteraction: false,
                centeredSlides: true
            });
        },
        menu: function (menuList) {
            var menuHTML = "";
            for (let i = 0; i < menuList.length; i++) {
                menuHTML +=
                    `<li>
                        <a href="view/homePage/${menuList[i].code}/${menuList[i].code}.html">
                            <div>
                                <img src="${imgUrl+menuList[i].icon}" alt="${menuList[i].title}">
                                <p>${menuList[i].title}</p>
                            </div>
                        </a>
                    </li>`
            }
            $("#menuHTML").html(menuHTML)
            if (myScroll) {
                myScroll.refresh();
            }
        },
        indexNews: function (indexNewsList) {
            $("#news").empty()
            indexNewsList.forEach((ele, index) => {
                if (index % 8 === 0) {
                    $("#news").append(
                        `<div data-id= ${ele.id} class="new_top newsList">
                            <div class="new_top_left">
                                <img src="${imgUrl + ele.iconOne}" alt>
                            </div>
                            <div class="new_top_right">
                                <h3>
                                    ${ele.title}
                                </h3>
                                <p>${ele.brief}</p>
                                <div class="datatime">
                                    <span>${tool.timeConversion(ele.publishTime)}</span>
                                    <span>阅读 ${ele.reading}</span>
                                </div>
                            </div>
                        </div>`
                    )
                } else if (index % 4 === 0) {
                    $("#news").append(
                        `<div data-id= ${ele.id} class="new_right_top newsList">
                            <div class="new_top_left">
                                <h3>
                                    ${ele.title}
                                </h3>
                                <p>${ele.brief}</p>
                                <div class="datatime">
                                    <span>${tool.timeConversion(ele.publishTime)}</span>
                                    <span>阅读${ele.reading}</span>
                                </div>
                            </div>
                            <div class="new_top_right">
                                <img src="${imgUrl + ele.iconOne}" alt>
                            </div>
                        </div>`
                    )
                } else if (index % 4 === 1 || index % 4 === 2 || index % 4 === 3) {
                    $("#news").append(
                        `<div data-id= ${ele.id} class="list newsList">
                            <div class="bg">
                                <img src="${imgUrl + ele.iconTwo}" alt>
                                <div class="read">
                                    <span>${ele.reading}人阅读</span>
                                </div>
                            </div>
                            <p class="text">${ele.brief}</p>
                        </div>`
                    )
                }
                if (myScroll) {
                    myScroll.refresh();
                }
            });


        },
        autoLogin: function () {
            var _this = this
            $.ajax({
                url: localhost50010 + "/user/login",
                type: "POST",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json"
                },
                beforeSend: function () {
                    tool.tip('正在登录中...', 1000 * 60)
                },
                data: JSON.stringify({
                    account: $.cookie("account"),
                    password: $.cookie("password")
                }),
                success: function (data) {
                    if (data.code == '0') {
                        console.log(data)
                        sessionStorage.setItem("my_token", JSON.stringify(data.data.token));
                        sessionStorage.setItem("account", JSON.stringify(data.data.user.account));
                        setTimeout(() => {
                            tool.tip(data.message)
                            my_token = data.data.token
                            _this.getUser(data.data.user.account, data.data.token)
                        }, 1000);
                    } else {
                        tool.tip(data.message)
                    }

                },
                error: function (err) {
                    tool.tip("网络连接失败")
                }
            });
        },
        getUser: function (account, my_token) {
            //获取用户信息
            console.log(account)
            console.log(my_token)
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
                    console.log(result)
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
        }
    };
    indexPage.init();
});