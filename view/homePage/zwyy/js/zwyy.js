$(function () {
    var menu = [{
            id: 0,
            code: "tj",
            text: '推荐',
        }, {
            id: 1,
            code: "bchtk",
            text: '病虫害图库',
        }, {
            id: 2,
            code: "jsfw",
            text: '技术服务',
        },
        // {
        //     id: 3,
        //     code: "nzd",
        //     text: '农资店',
        // }
    ]

    var hospital = {
        init: () => {
            hospital.listen()
        },
        listen: () => {
            hospital.getMenu(menu)
            hospital.banner(menu[0].code)
            $(document).on('click', '#swiper_menu > .swiper-slide', function () {
                $("#section").empty().html(
                    `<div id="banner" class="banner"></div>
                    <div class="line"></div>
                    <div id="content" class="content"></div>`
                )
                hospital.banner($(this).attr('ids'))
                $(this).addClass('active').siblings().removeClass('active')
            })
            $(document).on("touchstart", ".typename", function () {
                if ($(this).attr('typeid')) {
                    window.open("zwyyList.html?f=" + $(this).attr('typeid'), "_self")
                }
            })
            $(document).on("click", ".ele", function () {
                window.open("insectPestsDetials.html?ids=" + $(this).attr("data-id"), "_self")
            })
        },
        getMenu(menu) {
            $("#menu_list").empty()
            menu.forEach((ele, index) => {
                $("#swiper_menu").append(
                    `<div class="swiper-slide" ids ='${ele.code}' data-id="${index}">
                        <span>
                            ${ele.text}
                        </span>
                    </div>`
                )
            });
            var mySwiper1 = new Swiper(".swiper-menu", {
                slidesPerView: menu.length > 4 ? 4 : menu.length
            });
            $("#swiper_menu > .swiper-slide").eq(0).addClass("active").siblings().removeClass("active")
        },
        banner(list) {
            // var data = 
            $("#banner").empty()
            $("#content").empty()
            if (list == 'tj') {
                $.ajax({
                    url: `${localhost50002}/planthospital/referFirstPlantHospitalData`,
                    type: "POST",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        istop: 1
                    }),
                    success: function (result) {
                        tool.tip(result.message)
                        if (result.code === '0') {
                            $("#banner").html(
                                `<div class="swiper-container">
                                    <div id="swiper_wrapper" class="swiper-wrapper">
                                    </div>
                                    <div class="swiper-pagination"></div>
                                </div>`
                            )
                            $("#swiper_wrapper").empty()
                            var lasttime = ""
                            result.data.plantHospitalList.forEach((ele, index) => {
                                var imgLargePath = ele.imgLargePath.split(',')
                                if (ele.lasttime) {
                                    lasttime = tool.timeConversion(ele.lasttime) + ` · `
                                }
                                $("#swiper_wrapper").append(
                                    `<div class="swiper-slide">
                                        <img src="${imgUrl + imgLargePath[0]}" alt>
                                        <div class="banner-msg">
                                            <p>${ele.title}</p>
                                            <p>${lasttime}${ele.viewcount}人阅读</p>
                                        </div>
                                    </div>`
                                )
                            });
                            hospital.swiper()
                        }
                    },
                    error: function () {
                        tool.tip('服务器繁忙')
                    }
                })
            } else if (list === 'bchtk') {
                $.ajax({
                    url: localhost50002 + '/pests/referFirstPestsData',
                    type: "POST",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        isrefer: 1
                    }),
                    success: function (result) {
                        tool.tip(result.message)
                        if (result.code === '0') {
                            $("#banner").html(
                                `<div class="swiper-container">
                                    <div id="swiper_wrapper" class="swiper-wrapper">
                                    </div>
                                    <div class="swiper-pagination"></div>
                                </div>`
                            )
                            $("#swiper_wrapper").empty()
                            var lasttime = ""
                            result.data.pestsList.forEach((ele, index) => {
                                var imgLargePath = ele.imgLargePath.split(',')
                                if (ele.lasttime) {
                                    lasttime = tool.timeConversion(ele.lasttime) + ` · `
                                }
                                $("#swiper_wrapper").append(
                                    `<div class="swiper-slide">
                                        <img src="${imgUrl + imgLargePath[0]}" alt>
                                        <div class="banner-msg">
                                            <p>${ele.pestsAlias}</p>
                                            <p>${lasttime} ${ele.viewcount}人阅读</p>
                                        </div>
                                    </div>`
                                )
                            });
                            hospital.swiper()
                        }
                    },
                    error: function () {
                        tool.tip('服务器繁忙')
                    }
                })
            } else if (list === 'jsfw') {
                $.ajax({
                    url: localhost50002 + '/plantserver/referFirstPlantServerData',
                    type: "POST",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        isrefer: 1
                    }),
                    success: function (result) {
                        tool.tip(result.message)
                        if (result.code === '0') {
                            $("#banner").html(
                                `<div class="swiper-container">
                                    <div id="swiper_wrapper" class="swiper-wrapper">
                                    </div>
                                    <div class="swiper-pagination"></div>
                                </div>`
                            )
                            $("#swiper_wrapper").empty()
                            var lasttime = ""
                            result.data.plantServerList.forEach((ele, index) => {
                                var imgLargePath = ele.imgLargePath.split(',')
                                if (ele.lasttime) {
                                    lasttime = tool.timeConversion(ele.lasttime) + ` · `
                                }
                                $("#swiper_wrapper").append(
                                    `<div class="swiper-slide">
                                        <img src="${imgUrl + imgLargePath[0]}" alt>
                                        <div class="banner-msg">
                                            <p>${ele.title}</p>
                                            <p>${lasttime}${ele.viewcount}人阅读</p>
                                        </div>
                                    </div>`
                                )
                            });
                            hospital.swiper()
                        }
                    },
                    error: function () {
                        tool.tip('服务器繁忙')
                    }
                })
            }
            hospital.list(list)
        },
        swiper() {
            var mySwiper = new Swiper('.swiper-container', {
                autoplay: 3000,
                loop: true,
                speed: 1000,
                pagination: '.swiper-pagination',
                autoplayDisableOnInteraction: false,
                centeredSlides: true,
                observerParent: true
            })
        },
        list(list) {
            var _this = this
            if (list === 'tj') {
                $.ajax({
                    url: localhost50002 + '/planthospital/referFirstPlantHospitalData',
                    type: "POST",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    data: JSON.stringify({
                        istop: 2
                    }),
                    success: function (result) {
                        if (result.code === '0') {
                            $("#content_top").empty()
                            $("#content_bottom").empty()
                            $("#content").empty()
                            _this.listHTML(list, result)
                        }
                        if (myScroll) {
                            myScroll.refresh();
                        }
                    },
                    error: function () {}
                })
            } else if (list === 'bchtk') {
                $.ajax({
                    url: localhost50002 + '/pests/referSecondPestsData',
                    type: "POST",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    data: JSON.stringify({
                        isrefer: 2
                    }),
                    success: function (result) {
                        if (result.code === '0') {
                            $("#content_top").empty()
                            $("#content_bottom").empty()
                            $("#content").empty()
                            _this.listHTML(list, result)
                        }
                    },
                    error: function () {}
                })
            } else if (list === 'jsfw') {
                $.ajax({
                    url: localhost50002 + '/plantserver/referSecondPlantServerData',
                    type: "POST",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    data: JSON.stringify({
                        isrefer: 2
                    }),
                    success: function (result) {
                        if (result.code === '0') {
                            $("#content_top").empty()
                            $("#content_bottom").empty()
                            $("#content").empty()
                            _this.listHTML(list, result)
                        }
                        if (myScroll) {
                            myScroll.refresh();
                        }
                    },
                    error: function () {}
                })
            }
        },
        listHTML(list, result) {
            var _this = this
            if (list === 'tj') {
                console.log(result)
                $("#content").append(
                    `<div class="content-title">
                            <span class="blue-line"></span>
                            <div class="title">
                                <span>热门推荐</span>
                                <span class="typename">
                                    <img src="../../../img/arrow-right-gray.png" />
                                </span>
                            </div>
                        </div> `
                )
                var lasttime = '';
                result.data.plantHospitalList.forEach((ele, index) => {
                    var imgSamllPath = ele.imgSamllPath.split(',')
                    if (ele.lasttime) {
                        lasttime = tool.timeConversion(ele.lasttime)
                    }
                    console.log(ele)
                    if (index) {
                        $("#content").append(
                            `<div class="ele content-bottom" data-id="${ele.typename}_${ele.id}">
                                    <div class="left">
                                        <img src="${imgUrl +imgSamllPath[0]}" alt="">
                                    </div>
                                    <div class="right">
                                        <p class="content-top-title">${ele.title}</p>
                                        <p class="center">
                                        ${tool.isNull(ele.contents)}
                                        </p>
                                        <p class="timer">
                                            <span>${lasttime}</span>
                                            <span>阅读 ${ele.viewcount}</span>
                                        </p>
                                    </div>
                                </div>`
                        )
                    } else {
                        $("#content").append(
                            `<div class="ele content-top" data-id="${ele.typename}_${ele.id}">
                                    <p class="content-top-title">${ele.title}</p>
                                    <ul class="attach">
                                    </ul>
                                    <p class="timer">
                                        <span>${lasttime}</span>
                                        <span>阅读 ${ele.viewcount}</span>
                                    </p>
                                </div>`
                        )
                        $(".attach").empty()
                        imgSamllPath.forEach((e, index) => {
                            $('.attach').append(
                                `<li>
                                    <img src="${imgUrl+e}" alt="">
                                </li>`
                            )
                        })
                    }
                    setTimeout(() => {
                        if (myScroll) {
                            myScroll.refresh();
                        }
                    }, 500);
                });
            } else if (list === 'bchtk') {
                result.data.pestsList.forEach((ele, index) => {
                    $("#content").append(
                        `<div class="content-title">
                            <span class="blue-line"></span>
                            <div class="title">
                                <span>${ele.typename}</span>
                                <span class="typename" isrefer="${2}" typeid = "bch_${ele.typeid}">
                                    <img src="../../../img/arrow-right-gray.png" />
                                </span>
                            </div>
                        </div> `
                    )
                    var updateTime = '';
                    ele.children.forEach((ele, index) => {
                        console.log(ele)
                        var imgSamllPath = ele.imgSamllPath.split(',')
                        if (ele.updateTime) {
                            updateTime = tool.timeConversion(ele.updateTime)
                        }
                        if (index) {
                            $("#content").append(
                                `<div class="ele content-bottom" data-id="bch_${ele.id}">
                                    <div class="left">
                                        <img src="${imgUrl +imgSamllPath[0]}" alt="">
                                    </div>
                                    <div class="right">
                                        <p class="content-top-title">${ele.pestsName}</p>
                                        <p class="center">
                                        ${tool.isNull(ele.symptom)}
                                        </p>
                                        <p class="timer">
                                            <span>${updateTime}</span>
                                            <span>阅读 ${ele.viewcount}</span>
                                        </p>
                                    </div>
                                </div>`
                            )
                        } else {
                            $("#content").append(
                                `<div class="ele content-top" data-id="bch_${ele.id}">
                                    <p class="content-top-title">${ele.pestsName}</p>
                                    <ul class="attach${ele.uuid}">
                                    </ul>
                                    <p class="timer">
                                        <span>${updateTime}</span>
                                        <span>阅读 ${ele.viewcount}</span>
                                    </p>
                                </div>`
                            )
                            $(".attach").empty()
                            imgSamllPath.forEach((e, index) => {
                                $('.attach' + ele.uuid).append(
                                    `<li>
                                        <img src="${imgUrl+e}" alt="">
                                    </li>`
                                )
                            })
                        }
                        setTimeout(() => {
                            if (myScroll) {
                                myScroll.refresh();
                            }
                        }, 500);
                    })
                });
            } else if (list === 'jsfw') {
                console.log(result)
                result.data.pestsList.forEach((ele, index) => {
                    $("#content").append(
                        `<div class="content-title">
                            <span class="blue-line"></span>
                            <div class="title">
                                <span>${ele.typename}</span>
                                <span class="typename" isrefer="${2}" typeid = "jsfw_${ele.typeid}">
                                    <img src="../../../img/arrow-right-gray.png" />
                                </span>
                            </div>
                        </div> `
                    )
                    var lasttime = ""
                    ele.children.forEach((ele, index) => {
                        var imgSamllPath = ele.imgSamllPath.split(',')
                        console.log(ele)
                        if (ele.lasttime) {
                            lasttime = tool.timeConversion(ele.lasttime)
                        }
                        if (index) {
                            $("#content").append(
                                `<div class="ele content-bottom" data-id="jsfw_${ele.id}">
                                    <div class="left">
                                        <img src="${imgUrl +imgSamllPath[0]}" alt="">
                                    </div>
                                    <div class="right">
                                        <p class="content-top-title">${ele.title}</p>
                                        <p class="center">
                                        ${tool.isNull(ele.contents)}
                                        </p>
                                        <p class="timer">
                                            <span>${ele.lasttime}</span>
                                            <span>阅读 ${ele.viewcount}</span>
                                        </p>
                                    </div>
                                </div>`
                            )
                        } else {
                            $("#content").append(
                                `<div class="ele content-top" data-id="jsfw_${ele.id}">
                                    <p class="content-top-title">${ele.title}</p>
                                    <ul class="attach${ele.uuid}">
                                    </ul>
                                    <p class="timer">
                                        <span>${lasttime}</span>
                                        <span>阅读 ${ele.viewcount}</span>
                                    </p>
                                </div>`
                            )
                            $(".attach").empty()
                            imgSamllPath.forEach((e, index) => {
                                $('.attach' + ele.uuid).append(
                                    `<li>
                                        <img src="${imgUrl+e}" alt="">
                                    </li>`
                                )
                            })
                        }
                        setTimeout(() => {
                            if (myScroll) {
                                myScroll.refresh();
                            }
                        }, 500);
                    })
                });
            }
        }
    }
    hospital.init()
})