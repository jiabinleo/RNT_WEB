$(function () {
    var dat = {
        type: "1",
        categoryId: "",
        areaId: "",
        sort: "",
        pageNum: 1,
        pageSize: 10
    }
    var active = ""
    var goodsCategory = [],
        goodsCategory2, goodsCategory3;
    var area, area2, area3;
    var sort = [{
            id: 0,
            sortName: "不限"
        },
        {
            id: 'time_desc',
            sortName: "时间最新"
        },
        {
            id: 'distance',
            sortName: "距离最近"
        },
        {
            id: 'hot_desc',
            sortName: "人气最高"
        },
    ]
    var supDem = {
        init: function () {
            supDem.search(dat)
            supDem.listen()
        },
        listen: function () {
            $(document).on("click", "#gongying", function () {
                dat.type = "1"
                $(this).addClass("active").siblings().removeClass("active")
                $("#contentHTML").html("")
                supDem.search(dat)

            })
            $(document).on("click", "#qiugou", function () {
                $(this).addClass("active").siblings().removeClass("active")
                dat.type = "2"
                $("#contentHTML").html("")
                supDem.search(dat)
            })
            //进入详情
            $(document).on("click", ".supplyAndDemand-text", function () {
                window.open(`gqxq.html?ids=${$(this).attr("ids")}`, "_self")
            })
            $(document).on('click', '#_tuichu', function () {
                window.open('../../../login.html', '_self')
            })
            //点赞
            $(document).on("click", ".dianzan", function () {
                var ids = $(this).attr("ids"),
                    dzs = parseInt($(this).text()),
                    iszan,
                    _this = $(this);
                if ($(this).attr("zan") == 'null') {
                    iszan = 1
                } else {
                    iszan = 'null'
                }
                $(this).attr("zan", iszan)
                $.ajax({
                    url: localhost50010 + "/supply/zan?id=" + ids + "&isZan=" + iszan,
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
                        if (result.code == 0) {
                            if (_this.attr("zan") == "null") {
                                iszan = "1"
                                dzs -= 1
                                _this.html(`<img src="../../../img/zan.png" alt=""></img>${dzs}人点赞`)
                                _this.attr("zan") == '1'
                            } else {
                                iszan = "null"
                                dzs += 1
                                _this.html(`<img src="../../../img/zan_hide.png" alt=""></img>${dzs}人点赞`)
                                _this.attr("zan") == 'null'
                            }
                            tool.tip(result.message)
                        } else if (result.code == 9) {
                            tool.loginPrompt()
                        } else {
                            tool.tip(result.message)
                        }

                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
                return false;
            })

            $(document).on("click", ".mask", function () {
                $(this).hide()
                return false
            })
            $(document).on("click", ".inner", function () {
                return false
            })
            //分类
            $.ajax({
                url: localhost50010 + "/goodsCategory/getAllTree",
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
                    if (result.code == 0) {
                        goodsCategory = result.data.trees
                    }
                    tool.tip(result.message)
                },
                error: function (error) {
                    console.log(error);
                }
            });
            //地区
            $.ajax({
                url: localhost50010 + "/area/getAllTree",
                type: "GET",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json"
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function (result) {
                    area = result.data.trees
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
            $(document).on("click", "#picker", function () {
                // scrollArr[0].refresh();
                if ($(".mask").css("display") == "none") {
                    $("#picker").css('color', '#1b9de1').parent().find('img').attr('src', '../../../../img/arr_open.png')
                    scrollArr[1].scrollTo(0, 0, 1)
                    scrollArr[2].scrollTo(0, 0, 1)
                    scrollArr[0].refresh();
                    // debugger
                    active = "fenlei"
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
                    $("#picker").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png')
                    $("#area").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png')
                    $("#sort").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png')
                }

            })
            $(document).on("click", "#area", function () {
                if ($(".mask").css("display") == "none") {
                    $("#area").css('color', '#1b9de1').parent().find('img').attr('src', '../../../../img/arr_open.png')
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
                    $("#picker").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png')
                    $("#area").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png')
                    $("#sort").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png')
                }
            })
            $(document).on("click", "#sort", function () {
                if ($(".mask").css("display") == "none") {
                    $("#sort").css('color', '#1b9de1').parent().find('img').attr('src', '../../../../img/arr_open.png')
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
                            `<li s="${index}" data-id="${ele.id}"><span>${ele.sortName}</span></li>`
                        )
                    })
                } else {
                    $('.mask').hide()
                    $("#picker").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png')
                    $("#area").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png')
                    $("#sort").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png')
                }
            })
            $(document).on("click", ".menuLeft > li", function () {
                $(".menuCenter").html("")
                $(".menuRight").html("")
                $(this).addClass("active").siblings().removeClass("active")
                if (active == "fenlei") {
                    // $("#picker").attr("placeholder", $(this).text())
                    $("#picker").html($(this).text())
                    goodsCategory2 = goodsCategory[$(this).attr("s")].children
                    if (goodsCategory2) {
                        goodsCategory2.forEach((ele, index) => {
                            $(".menuCenter").append(
                                `<li s="${index}" data-id="${ele.id}"><span>${ele.text}</span></li>`
                            )
                        })
                    }
                    dat.categoryId = $(this).attr("data-id")
                } else if (active == "diqu") {
                    // $("#area").attr("placeholder", $(this).text())
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
                $("#contentHTML").html("")
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
                    // $("#picker").attr("placeholder", $(this).text())
                    $("#picker").html($(this).text())
                    goodsCategory3 = goodsCategory2[$(this).attr("s")].children
                    if (goodsCategory3) {
                        goodsCategory3.forEach((ele, index) => {
                            $(".menuRight").append(
                                `<li s="${index}" data-id="${ele.id}"><span>${ele.text}</span></li>`
                            )
                        })
                    }
                    dat.categoryId = $(this).attr("data-id")
                } else if (active == "diqu") {
                    // $("#area").attr("placeholder", $(this).text())
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
                    // $("#sort").attr("placeholder", $(this).text())
                    $("#sort").html($(this).text())
                    $('.mask').hide()
                    $("#picker").parent().find('img').attr('src', '../../../../img/arr_close.png')
                    $("#area").parent().find('img').attr('src', '../../../../img/arr_close.png')
                    $("#sort").parent().find('img').attr('src', '../../../../img/arr_close.png')
                }
                $("#contentHTML").html("")
                supDem.search(dat)
            })
            $(document).on("click", ".menuRight > li", function () {
                $(this).addClass("active").siblings().removeClass("active")
                console.log($(this).attr("data-id"))
                if (active == "fenlei") {
                    // $("#picker").attr("placeholder", $(this).text())
                    $("#picker").html($(this).text())
                    dat.categoryId = $(this).attr("data-id")
                } else if (active == "diqu") {
                    // $("#area").attr("placeholder", $(this).text())
                    $("#area").html($(this).text())
                    dat.areaId = $(this).attr("data-id")
                } else if (active == "sort") {
                    // $("#sort").attr("placeholder", $(this).text())
                    $("#sort").html($(this).text())
                    dat.sort = $(this).attr("data-id")
                }
                $('.mask').hide()
                $("#picker").parent().find('img').attr('src', '../../../../img/arr_close.png')
                $("#area").parent().find('img').attr('src', '../../../../img/arr_close.png')
                $("#sort").parent().find('img').attr('src', '../../../../img/arr_close.png')
                $("#contentHTML").html("")
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
                            supDem.search(dat)
                        }
                    });
                } catch (error) {

                }
            }, 300);
        },
        search(dat) {
            dat.type += ""
            dat.pageNum += ""
            dat.pageSize += ""
            $.ajax({
                url: localhost50010 + "/supply/getPage?areaId=" + dat.areaId + "&categoryId=" + dat.categoryId + "&pageNum=" + dat.pageNum + "&pageSize=" + dat.pageSize + "&sort=" + dat.sort + "&type=" + dat.type,
                type: "GET",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json"
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function (result) {
                    var total = $(document).find(".supplyAndDemand-text").length
                    if (total >= result.data.page.total) {
                        return
                    }
                    if (result.code === "0") {
                        supDem.html(result.data.page)
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        html(data) {
            data.rows.forEach(ele => {
                var imgHTML = ""
                if (ele.fileList) {
                    img = ele.fileList.split(",")
                    img.forEach((ele, index) => {
                        if (index >= 3) {
                            return
                        }
                        imgHTML += `<li><img src = "${imgUrl + ele}"/></li>`
                    });
                }
                var heart = ele.isZan ? '<img src="../../../img/zan_hide.png" alt=""></img>' : '<img src="../../../img/zan.png" alt=""></img>'
                $("#contentHTML").append(
                    `<div class="supplyAndDemand-text" ids="${ele.id}">
                    <div class="supplyAndDemand-text-title">
                        <div class="left">
                            <img src="${imgUrl +ele.icon}" alt="">
                        </div>
                        <div class="center">
                            <p>${ele.userName}</p>
                            <p><span>${ele.area}</span></p>
                        </div>
                        <div class="right">
                            <p>${tool.timeConversion(ele.publishTime)}</p>
                        </div>
                    </div>
                    <div class="supplyAndDemand-text-content">
                        <p>${tool.isNull(ele.title)}</p>
                        <p>${ele.detail}</p>
                    </div>
                    <div class="supplyAndDemand-text-img">
                        <ul>
                            ${imgHTML}
                        </ul>
                    </div>
                    <div class="count">
                        <p>
                            <span><img src="../../../img/read.png" alt="">${ele.reading?ele.reading:"0"}人阅读</span>
                            <span ids="${ele.id}"  class="dianzan" zan = ${ele.isZan}>${heart}${ele.zan?ele.zan:"0"}人点赞</span>
                        </p>
                    </div>
                </div>
            </div>`
                )
            })
            try {
                if (scrollArr[0]) {
                    scrollArr[0].refresh();
                    scrollArr[0].scrollTo(0, 0, 1)
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
        }
    }
    supDem.init()
})