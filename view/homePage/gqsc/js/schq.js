"use strict";

$(function () {
    var dat = {
        cropId: "",
        areaId: "",
        market: "",
        order: "",
        pageNum: 1,
        pageSize: 10
    };
    var active = "";
    var goodsCategory = [],
        goodsCategory2,
        goodsCategory3;
    var area, area2, area3;
    var order = [{
        id: 0,
        sortName: "不限"
    }, {
        id: 'time_desc',
        sortName: "时间最新"
    }, {
        id: 'price_desc',
        sortName: "价格最高"
    }, {
        id: 'price',
        sortName: "价格最低"
    }];
    var market = [];
    var supDem = {
        init: function init() {
            supDem.search(dat);
            supDem.listen();
        },
        listen: function listen() {
            var _this = this;
            $(document).on("click", ".mask", function () {
                $(this).hide();
                return false;
            });
            $(document).on("click", ".inner", function () {
                return false;
            });
            //分类
            $.ajax({
                url: localhost50010 + "/goodsCategory/getAllTree",
                type: "GET",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json"
                },
                beforeSend: function beforeSend(xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function success(result) {
                    console.log(result);
                    goodsCategory = result.data.trees;
                },
                error: function error(_error) {
                    console.log(_error);
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
                beforeSend: function beforeSend(xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function success(result) {
                    console.log(result);
                    area = result.data.trees;
                    area.unshift({
                        id: 0,
                        pid: -1,
                        text: "不限",
                        children: []
                    });
                },
                error: function error(_error2) {
                    console.log(_error2);
                }
            });
            $(document).on("click", "#picker", function () {
                if (!goodsCategory.length) {
                    tool.tip('产品类别获取中')
                    return
                }
                if ($(".mask").css("display") == "none") {
                    $("#picker").css('color', '#1b9de1').parent().find('img').attr('src', '../../../img/arr_open.png');
                    dat.pageNum = 1;
                    // scrollArr[0].refresh();
                    scrollArr[1].scrollTo(0, 0, 1);
                    scrollArr[2].scrollTo(0, 0, 1);
                    scrollArr[0].refresh();
                    active = "fenlei";
                    $('.mask').show();
                    $(".menuLeft").html("");
                    $(".menuCenter").html("");
                    $(".menuRight").html("");
                    goodsCategory.forEach(function (ele, index) {
                        $(".menuLeft").append("<li s=\"" + index + "\" data-id=\"" + ele.id + "\"><span>" + ele.text + "</span></li>");
                    });
                    if (scrollArr[0]) {
                        scrollArr[0].refresh();
                    }
                    if (scrollArr[1]) {
                        scrollArr[1].refresh();
                    }
                    setTimeout(function () {
                        scrollArr[0].scrollTo(0, 0, 1);
                    });
                } else {
                    $('.mask').hide();
                    $("#picker").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png');
                    $("#area").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png');
                    $("#order").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png');
                    $("#market").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png');
                }
            });
            $(document).on("click", "#area", function () {
                console.log(area)
                if (!area) {
                    tool.tip('地区获取中')
                    return
                }
                if ($(".mask").css("display") == "none") {
                    $("#area").css('color', '#1b9de1').parent().find('img').attr('src', '../../../../img/arr_open.png');
                    dat.pageNum = 1;
                    scrollArr[0].scrollTo(0, 0, 1);
                    scrollArr[2].scrollTo(0, 0, 1);
                    scrollArr[1].refresh();
                    active = "diqu";
                    $("#market").html("选择市场");
                    dat.market = "";
                    $('.mask').show();
                    $(".menuLeft").html("");
                    $(".menuCenter").html("");
                    $(".menuRight").html("");
                    area.forEach(function (ele, index) {
                        $(".menuLeft").append("<li s=\"" + index + "\" data-id=\"" + ele.id + "\"><span>" + ele.text + "</span></li>");
                    });
                    if (scrollArr[1]) {
                        scrollArr[1].refresh();
                    }
                } else {
                    $('.mask').hide();
                    $("#picker").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png');
                    $("#area").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png');
                    $("#order").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png');
                    $("#market").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png');
                }
            });
            $(document).on("click", "#order", function () {
                if ($(".mask").css("display") == "none") {
                    $("#order").css('color', '#1b9de1').parent().find('img').attr('src', '../../../../img/arr_open.png');
                    dat.pageNum = 1;
                    scrollArr[0].scrollTo(0, 0, 1);
                    scrollArr[1].scrollTo(0, 0, 1);
                    scrollArr[2].refresh();
                    active = "order";
                    $('.mask').show();
                    $(".menuLeft").html("");
                    $(".menuCenter").html("");
                    $(".menuRight").html("");
                    order.forEach(function (ele, index) {
                        $(".menuCenter").append("<li s=\"" + index + "\" data-id=\"" + ele.id + "\"><span>" + ele.sortName + "</span></li>");
                        scrollArr[0].scrollTo(0, 0, 1);
                        scrollArr[2].scrollTo(0, 0, 1);
                        scrollArr[1].refresh();
                    });
                } else {
                    $('.mask').hide();
                    $("#picker").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png');
                    $("#area").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png');
                    $("#order").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png');
                    $("#market").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png');
                }
            });
            $(document).on('click', '#market', function () {
                dat.pageNum = 1;
                if (!$.trim(dat.areaId)) {
                    tool.tip('请选择地区');
                } else {
                    if ($(".mask").css("display") == "none") {
                        $("#market").css('color', '#1b9de1').parent().find('img').attr('src', '../../../../img/arr_open.png');
                        console.log(dat.areaId);
                        $.ajax({
                            url: localhost50010 + "/priceInfo/marketList?areaId=" + dat.areaId,
                            type: "GET",
                            dataType: "json",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            beforeSend: function beforeSend(xhr) {
                                xhr.setRequestHeader("login_token", my_token);
                            },
                            success: function success(result) {
                                console.log(result);
                                market = result.data.marketList;
                                scrollArr[0].scrollTo(0, 0, 1);
                                scrollArr[1].scrollTo(0, 0, 1);
                                active = "market";
                                $('.mask').show();
                                $(".menuLeft").html("");
                                $(".menuCenter").html("");
                                $(".menuRight").html("");
                                market.forEach(function (ele, index) {
                                    $(".menuCenter").append("<li s=\"" + index + "\" data-id=\"" + ele + "\"><span>" + ele + "</span></li>");
                                });
                                scrollArr[2].refresh();
                            },
                            error: function error(_error3) {
                                console.log(_error3);
                            }
                        });
                    } else {
                        $('.mask').hide();
                        $("#picker").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png');
                        $("#area").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png');
                        $("#order").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png');
                        $("#market").css('color', '#999').parent().find('img').attr('src', '../../../../img/arr_close.png');
                    }
                }
            });
            $(document).on("click", ".menuLeft > li", function () {
                $(".menuCenter").html("");
                $(".menuRight").html("");
                $(this).addClass("active").siblings().removeClass("active");
                if (active == "fenlei") {
                    // $("#picker").attr("placeholder", $(this).text())
                    $("#picker").html($(this).text());
                    goodsCategory2 = goodsCategory[$(this).attr("s")].children;
                    if (goodsCategory2) {
                        goodsCategory2.forEach(function (ele, index) {
                            $(".menuCenter").append("<li s=\"" + index + "\" data-id=\"" + ele.id + "\"><span>" + ele.text + "</span></li>");
                        });
                    }
                    dat.cropId = $(this).attr("data-id");
                } else if (active == "diqu") {
                    // $("#area").attr("placeholder", $(this).text())
                    $("#area").html($(this).text());
                    area2 = area[$(this).attr("s")].children;
                    if (area2) {
                        area2.forEach(function (ele, index) {
                            $(".menuCenter").append("<li s=\"" + index + "\" data-id=\"" + ele.id + "\"><span>" + ele.text + "</span></li>");
                        });
                    }
                    dat.areaId = $(this).attr("data-id");
                }
                $("#contentHTML").html("");
                supDem.search(dat);
                if (scrollArr[2]) {
                    scrollArr[2].refresh();
                }
                if (scrollArr[3]) {
                    scrollArr[3].refresh();
                }
            });
            $(document).on("click", ".menuCenter > li", function () {
                $(".menuRight").html("");
                $(this).addClass("active").siblings().removeClass("active");
                if (active == "fenlei") {
                    // $("#picker").attr("placeholder", $(this).text())
                    $("#picker").html($(this).text());
                    goodsCategory3 = goodsCategory2[$(this).attr("s")].children;
                    if (goodsCategory3) {
                        goodsCategory3.forEach(function (ele, index) {
                            $(".menuRight").append("<li s=\"" + index + "\" data-id=\"" + ele.id + "\"><span>" + ele.text + "</span></li>");
                        });
                    }
                    dat.cropId = $(this).attr("data-id");
                } else if (active == "diqu") {
                    // $("#area").attr("placeholder", $(this).text())
                    $("#area").html($(this).text());
                    area3 = area2[$(this).attr("s")].children;
                    if (area3) {
                        area3.forEach(function (ele, index) {
                            $(".menuRight").append("<li s=\"" + index + "\" data-id=\"" + ele.id + "\"><span>" + ele.text + "</span></li>");
                        });
                    }
                    dat.areaId = $(this).attr("data-id");
                    if (scrollArr[3]) {
                        scrollArr[3].refresh();
                    }
                } else if (active == "order") {
                    dat.order = $(this).attr("data-id");
                    $("#order").html($(this).text());
                    $(".mask").hide();
                    $("#picker").parent().find('img').attr('src', '../../../../img/arr_close.png');
                    $("#area").parent().find('img').attr('src', '../../../../img/arr_close.png');
                    $("#order").parent().find('img').attr('src', '../../../../img/arr_close.png');
                    $("#market").parent().find('img').attr('src', '../../../../img/arr_close.png');
                } else if (active == "market") {
                    dat.market = $(this).attr("data-id");
                    $("#market").html($(this).text());
                    $(".mask").hide();
                    $("#picker").parent().find('img').attr('src', '../../../../img/arr_close.png');
                    $("#area").parent().find('img').attr('src', '../../../../img/arr_close.png');
                    $("#order").parent().find('img').attr('src', '../../../../img/arr_close.png');
                    $("#market").parent().find('img').attr('src', '../../../../img/arr_close.png');
                }
                $("#contentHTML").html("");
                supDem.search(dat);
            });
            $(document).on("click", ".menuRight > li", function () {
                $(this).addClass("active").siblings().removeClass("active");
                console.log($(this).attr("data-id"));
                if (active == "fenlei") {
                    // $("#picker").attr("placeholder", $(this).text())
                    $("#picker").html($(this).text());
                    dat.cropId = $(this).attr("data-id");
                } else if (active == "diqu") {
                    // $("#area").attr("placeholder", $(this).text())
                    $("#area").html($(this).text());
                    dat.areaId = $(this).attr("data-id");
                } else if (active == "order") {
                    // $("#order").attr("placeholder", $(this).text())
                    $("#order").html($(this).text());
                    dat.order = $(this).attr("data-id");
                } else if (active == "market") {
                    dat.market = $(this).attr("data-id");
                    $("#market").html($(this).text());
                }
                $(".mask").hide();
                $("#picker").parent().find('img').attr('src', '../../../../img/arr_close.png');
                $("#area").parent().find('img').attr('src', '../../../../img/arr_close.png');
                $("#order").parent().find('img').attr('src', '../../../../img/arr_close.png');
                $("#market").parent().find('img').attr('src', '../../../../img/arr_close.png');
                $("#contentHTML").html("");
                supDem.search(dat);
            });
            setTimeout(function () {
                var minY = null;
                try {
                    scrollArr[0].on('scrollStart', function () {
                        minY = this.y;
                    });

                    scrollArr[0].on('scroll', function () {

                        minY = minY < this.y ? minY : this.y;
                    });

                    scrollArr[0].on('scrollEnd', function () {
                        minY = minY < this.y ? minY : this.y;
                        setTimeout(function () {
                            $("#loadingTxt").html("");
                            if (scrollArr[0]) {
                                scrollArr[0].refresh();
                            }
                        }, 3000);
                        if (this.y == this.maxScrollY) {
                            dat.pageNum++;
                            supDem.search(dat);
                        }
                    });
                } catch (error) {}
            }, 3000);
        },
        search: function search(dat) {
            dat.pageNum += "";
            dat.pageSize += "";
            $.ajax({
                url: localhost50010 + "/priceInfo/getPage?areaId=" + dat.areaId + "&market=" + dat.market + "&pageNum=" + dat.pageNum + "&pageSize=" + dat.pageSize + "&order=" + dat.order + "&cropId=" + dat.cropId + "&priceType=1",
                type: "GET",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json"
                },
                beforeSend: function beforeSend(xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function success(result) {
                    var total = $(document).find("#contentHTML").find('li').length;
                    if (total >= result.data.page.total) {
                        return;
                    }
                    if (result.code === "0") {
                        supDem.listHtml(result.data.page);
                    }
                },
                error: function error(_error4) {
                    console.log(_error4);
                    tool.tip('网络连接失败')
                }
            });
        },
        listHtml: function listHtml(data) {
            var _this = this;
            var updateTime = "";
            data.rows.forEach(function (ele, index) {
                $("#contentHTML").append("<li><div>" + ele.market + "</div><div>" + ele.cropName + "</div><div><a>" + ele.price + "</a>\u5143/\u65A4</div><div>" + tool.timeConversion(ele.updateTime) + "</div></li>");
            });
            // try {
            //     if (scrollArr[0]) {
            //         scrollArr[0].refresh();
            //         scrollArr[0].scrollTo(0, 0, 1)
            //     }

            // } catch (error) {

            // }
            // try {
            //     if (scrollArr[1]) {
            //         scrollArr[1].refresh();
            //     }

            // } catch (error) {

            // }
            // try {
            //     if (scrollArr[2]) {
            //         scrollArr[2].refresh();
            //     }

            // } catch (error) {

            // }
            // try {
            //     if (scrollArr[3]) {
            //         scrollArr[3].refresh();
            //     }
            // } catch (error) {

            // }
        }
    };
    supDem.init();
});