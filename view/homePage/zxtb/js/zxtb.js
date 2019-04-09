$(function () {
    var dat = {
        crop: "",
        areaId: "",
        sort: "",
        pageNum: 1,
        pageSize: 6,
        categoryCode: ''
    };
    var active = ""
    var goodsCategory = [],
        goodsCategory2, goodsCategory3;
    var area, area2, area3;
    var sort = []
    var supDem = {
        init: function () {
            supDem.listen()
            supDem.search(dat)
        },
        listen: function () {
            $.ajax({
                url: localhost50010 + "/insurance/category",
                type: "get",
                headers: {
                    "Content-Type": "application/json"
                },
                success: function (data) {
                    if (data.code === "0") {
                        supDem.menu(data.data.cate0)
                        sort = data.data.sort
                    }
                },
                error: function (err) {}
            });
            $(document).on('click', '#swiper_menu > .swiper-slide', function () {
                $(this).addClass('active').siblings().removeClass('active')
                dat.categoryCode = $(this).attr('data-id')
                $("#contentHTML").empty()
                dat.pageNum = 1
                supDem.search(dat)

            })
            $(document).on("touchstart", ".mask", function () {
                $(this).hide()
                $("#picker").parent().find('img').attr('src', '../../../img/arr_close.png')
                $("#area").parent().find('img').attr('src', '../../../img/arr_close.png')
                $("#sort").parent().find('img').attr('src', '../../../img/arr_close.png')
                return false
            })
            $(document).on("touchstart", ".inner", function (event) {
                event.stopPropagation();
                return false
            })
            //分类
            $.ajax({
                url: localhost50010 + "/insurance/crop",
                type: "GET",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json"
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function (result) {
                    goodsCategory = result.data.crop
                },
                error: function (error) {
                    console.log(error);
                }
            });
            //地区
            $.ajax({
                url: localhost50010 + "/insurance/area",
                type: "GET",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json"
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function (result) {
                    area = result.data.area
                    area.unshift({
                        id: 0,
                        pid: -1,
                        text: "不限",
                        children: []
                    })
                },
                error: function (error) {
                    console.log(error);
                }
            });
            $(document).on("touchstart", "#picker", function () {
                if ($('.mask').css('display') == "none") {
                    $("#picker").css('color', '#1b9de1').parent().find('img').attr('src', '../../../img/arr_open.png')
                    scrollArr[1].scrollTo(0, 0, 1)
                    scrollArr[2].scrollTo(0, 0, 1)
                    scrollArr[0].refresh();
                    active = "fenlei";
                    $('.mask').show()
                    $(".menuLeft").html("")
                    $(".menuCenter").html("")
                    $(".menuRight").html("")
                    goodsCategory.forEach((ele, index) => {
                        $(".menuLeft").append(
                            `<li s="${index}" data-id="${ele.id}"><span>${ele.text}</span></li>`
                        )
                    })
                    if (scrollArr[0]) {
                        scrollArr[0].refresh();
                    }
                    if (scrollArr[1]) {
                        scrollArr[1].refresh();
                    }
                    setTimeout(() => {
                        scrollArr[0].scrollTo(0, 0, 1)
                    });
                } else {
                    $('.mask').hide()
                    $("#picker").css('color', '#999').parent().find('img').attr('src', '../../../img/arr_close.png')
                    $("#area").css('color', '#999').parent().find('img').attr('src', '../../../img/arr_close.png')
                    $("#sort").css('color', '#999').parent().find('img').attr('src', '../../../img/arr_close.png')
                }

            })
            $(document).on("touchstart", "#area", function () {
                if ($('.mask').css('display') == "none") {
                    $("#area").css('color', '#1b9de1').parent().find('img').attr('src', '../../../img/arr_open.png')
                    scrollArr[0].scrollTo(0, 0, 1)
                    scrollArr[2].scrollTo(0, 0, 1)
                    scrollArr[1].refresh();
                    active = "diqu"
                    $('.mask').show()
                    $(".menuLeft").html("")
                    $(".menuCenter").html("")
                    $(".menuRight").html("")
                    area.forEach((ele, index) => {
                        $(".menuLeft").append(
                            `<li s="${index}" data-id="${ele.id}"><span>${ele.text}</span></li>`
                        )
                    })
                    if (scrollArr[1]) {
                        scrollArr[1].refresh();
                    }
                } else {
                    $('.mask').hide()
                    $("#picker").css('color', '#999').parent().find('img').attr('src', '../../../img/arr_close.png')
                    $("#area").css('color', '#999').parent().find('img').attr('src', '../../../img/arr_close.png')
                    $("#sort").css('color', '#999').parent().find('img').attr('src', '../../../img/arr_close.png')
                }

            })
            $(document).on("touchstart", "#sort", function () {
                if ($('.mask').css('display') == "none") {
                    $("#sort").css('color', '#1b9de1').parent().find('img').attr('src', '../../../img/arr_open.png')
                    scrollArr[0].scrollTo(0, 0, 1)
                    scrollArr[1].scrollTo(0, 0, 1)
                    scrollArr[2].refresh();
                    active = "sort"
                    $('.mask').show()
                    $(".menuLeft").html("")
                    $(".menuCenter").html("")
                    $(".menuRight").html("")
                    sort.forEach((ele, index) => {
                        $(".menuCenter").append(
                            `<li s="${ele.id}" data-id="${ele.id}"><span>${ele.text}</span></li>`
                        )
                    })
                } else {
                    $('.mask').hide()
                    $("#picker").css('color', '#999').parent().find('img').attr('src', '../../../img/arr_close.png')
                    $("#area").css('color', '#999').parent().find('img').attr('src', '../../../img/arr_close.png')
                    $("#sort").css('color', '#999').parent().find('img').attr('src', '../../../img/arr_close.png')
                }

            })
            $(document).on("click", ".menuLeft > li", function () {
                $(".menuCenter").html("")
                $(".menuRight").html("")
                $(this).addClass("active").siblings().removeClass("active")
                if (active == "fenlei") {
                    $("#picker").html($(this).text())
                    goodsCategory2 = goodsCategory[$(this).attr("s")].children
                    if (goodsCategory2) {
                        goodsCategory2.forEach((ele, index) => {
                            console.log(ele)
                            $(".menuCenter").append(
                                `<li s="${index}" data-id="${ele.id}"><span>${ele.text}</span></li>`
                            )
                        })
                    }
                    dat.crop = $(this).attr("data-id")
                } else if (active == "diqu") {
                    $("#area").html($(this).text())
                    area2 = area[$(this).attr("s")].children
                    if (area2) {
                        area2.forEach((ele, index) => {
                            $(".menuCenter").append(
                                `<li s="${index}" data-id="${ele.id}"><span>${ele.text}</span></li>`
                            )
                        })
                    }
                    dat.areaId = $(this).attr("data-id")
                }
                $("#contentHTML").empty()
                dat.pageNum = 1
                supDem.search(dat)
                if (scrollArr[2]) {
                    scrollArr[2].refresh();
                }
                if (scrollArr[3]) {
                    scrollArr[3].refresh();
                }
            })
            $(document).on("click", ".menuCenter > li", function () {
                $(".menuRight").html("")
                $(this).addClass("active").siblings().removeClass("active")
                if (active == "fenlei") {
                    $("#picker").html($(this).text())
                    goodsCategory3 = goodsCategory2[$(this).attr("s")].children
                    if (goodsCategory3) {
                        goodsCategory3.forEach((ele, index) => {
                            console.log(ele)
                            $(".menuRight").append(
                                `<li s="${index}" data-id="${ele.id}"><span>${ele.text}</span></li>`
                            )
                        })
                    }
                    dat.crop = $(this).attr("data-id")
                } else if (active == "diqu") {
                    $("#area").html($(this).text())
                    area3 = area2[$(this).attr("s")].children
                    if (area3) {
                        area3.forEach((ele, index) => {
                            $(".menuRight").append(
                                `<li s="${index}" data-id="${ele.id}"><span>${ele.text}</span></li>`
                            )
                        })
                    }
                    dat.areaId = $(this).attr("data-id")
                    if (scrollArr[3]) {
                        scrollArr[3].refresh();
                    }
                } else if (active == "sort") {
                    dat.sort = $(this).attr("data-id")
                    $("#sort").html($(this).text())
                    $(".mask").hide()
                    $("#sort").parent().find('img').attr('src', '../../../img/arr_close.png')
                }
                $("#contentHTML").empty()
                dat.pageNum = 1
                supDem.search(dat)
            })
            $(document).on("click", ".menuRight > li", function () {
                $(".menu span").css({
                    'color': 'rgb(153,153,153)'
                })
                $(this).addClass("active").siblings().removeClass("active")
                if (active == "fenlei") {
                    $("#picker").html($(this).text())
                    dat.crop = $(this).attr("data-id")
                } else if (active == "diqu") {
                    $("#area").html($(this).text())
                    dat.areaId = $(this).attr("data-id")
                } else if (active == "sort") {
                    $("#sort").html($(this).text())
                    dat.sort = $(this).attr("data-id")
                }
                $(".mask").hide()
                $("#picker").parent().find('img').attr('src', '../../../img/arr_close.png')
                $("#area").parent().find('img').attr('src', '../../../img/arr_close.png')
                $("#sort").parent().find('img').attr('src', '../../../img/arr_close.png')
                $("#contentHTML").empty()
                dat.pageNum = 1
                supDem.search(dat)
            })
            setTimeout(() => {
                var minY = null;
                try {
                    scrollArr[0].on('scrollStart', function () {
                        minY = this.y;
                        $("#loadingTxt").html("加载更多..")
                    });
                    scrollArr[0].on('scroll', function () {
                        minY = minY < this.y ? minY : this.y;
                    });
                    scrollArr[0].on('scrollEnd', function () {
                        minY = minY < this.y ? minY : this.y;
                        setTimeout(() => {
                            $("#loadingTxt").html("")
                            if (scrollArr[0]) {
                                scrollArr[0].refresh();
                            }
                        }, 3000);
                        if (this.y == this.maxScrollY) {
                            dat.pageNum++
                            console.log(dat.pageNum)
                            supDem.search(dat)
                        }
                    });
                } catch (error) {

                }
            }, 300);
            //详情
            $(document).on('click', '#contentHTML > li', function () {
                window.open(`../maize/maize.html?id=${$(this).attr('data-id')}`, '_self')
            })
            $(document).on('click', '#search', function () {
                window.open('search.html', '_self')
            })
        },
        menu: function (cate0) {
            $("#swiper_menu").empty()
            cate0.forEach((ele, index) => {
                if (index) {
                    $("#swiper_menu").append(
                        `<div class="swiper-slide" data-id="${ele.id}">
                            <span>${ele.text}</span>
                        </div>`
                    )
                } else {
                    $("#swiper_menu").append(
                        `<div class="active swiper-slide" data-id="${ele.id}">
                            <span>${ele.text}</span>
                        </div>`
                    )
                }
            });
            var mySwiper1 = new Swiper(".swiper-menu", {
                slidesPerView: 4
            });
        },
        search(dat) {
            dat.pageNum += ""
            dat.pageSize += ""
            $.ajax({
                url: `${localhost50010}/insurance/getPage?areaId=${dat.areaId}&categoryCode=${dat.categoryCode}&cropId=${dat.crop}&pageNum=${dat.pageNum}&pageSize=${dat.pageSize}&sort=${dat.sort}`,
                type: "GET",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json"
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function (result) {
                    if (result.code == 0) {
                        var total = $(document).find(".top").length
                        if (total >= result.data.page.total) {
                            return
                        }
                        if (result.code === "0") {
                            supDem.listHtml(result.data.page)
                        }
                    } else {
                        tool.tip(result.message)
                    }
                },
                error: function (error) {
                    tool.tip('网络连接失败')
                }
            });
        },
        listHtml(data) {
            data.rows.forEach(ele => {
                $("#contentHTML").append(
                    `<li data-id="${ele.id}">
                    <div class="top">
                        <img src="${imgUrl+ele.cover}" alt="">
                    </div>
                    <div class="bottom">
                        <p>${ele.insuranceName}</p>
                        <p><span>${ele.brief}</span><span><a>${ele.baoE}</a><a>元/</a>亩</span></p>
                    </div>
                </li>`
                )
                try {
                    if (scrollArr[0]) {
                        scrollArr[0].refresh();
                    }

                } catch (error) {

                }
                try {
                    if (scrollArr[1]) {
                        scrollArr[1].refresh();
                    }

                } catch (error) {

                }
                try {
                    if (scrollArr[2]) {
                        scrollArr[2].refresh();
                    }

                } catch (error) {

                }
                try {
                    if (scrollArr[3]) {
                        scrollArr[3].refresh();
                    }
                } catch (error) {

                }
            })
        }
    }
    supDem.init()
})