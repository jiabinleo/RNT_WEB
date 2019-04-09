$(function () {
    var dat = {
        crop: "",
        areaId: "",
        disasterType: "",
        pageNum: 1,
        pageSize: 6,
        city: ''
    };
    var active = "";
    var goodsCategory = [],
        goodsCategory2,
        goodsCategory3;
    var area, area2, area3;
    var disasterType = [];
    var supDem = {

        init: function init() {
            supDem.listen();
        },
        listen: function listen() {
            var _this = this;
            $.ajax({
                url: localhost50010 + "/disasters/disasterCodeList",
                type: "get",
                headers: {
                    "Content-Type": "application/json"
                },
                success: function success(data) {
                    if (data.code === "0") {
                        disasterType = data.data.list;
                    }
                },
                error: function error(err) {}
            });
            $(document).on("touchstart", ".mask", function () {
                $(this).hide();
                $("#picker").parent().find('img').attr('src', '../../../img/arr_close.png');
                $("#area").parent().find('img').attr('src', '../../../img/arr_close.png');
                $("#disasterType").parent().find('img').attr('src', '../../../img/arr_close.png');
                return false;
            });
            $(document).on("touchstart", ".inner", function () {
                return false;
            });
            //分类
            $.ajax({
                url: localhost50010 + "/insurance/crop",
                type: "GET",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json"
                },
                beforeSend: function beforeSend(xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function success(result) {
                    goodsCategory = result.data.crop;
                },
                error: function error(_error) {
                    console.log(_error);
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
                beforeSend: function beforeSend(xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function success(result) {
                    area = result.data.area;
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
            $.ajax({
                url: localhost50010 + "/user/getUser?account=ceshi",
                type: "GET",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json"
                },
                beforeSend: function beforeSend(xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function success(result) {
                    if (result.code === "0") {
                        _this.search(dat);
                    } else {
                        dat.city = JSON.parse(sessionStorage.getItem("addressObj")).formattedAddress;
                        $("#contentHTML").empty();
                        _this.search(dat);
                    }
                },
                error: function error(_error3) {
                    console.log(_error3);
                }
            });

            $(document).on("touchstart", "#picker", function () {
                // scrollArr[0].refresh();
                if ($('.mask').css('display') == "none") {
                    $("#picker").parent().find('img').attr('src', '../../../img/arr_open.png');
                    scrollArr[1].scrollTo(0, 0, 1);
                    scrollArr[2].scrollTo(0, 0, 1);
                    scrollArr[0].refresh(); // debugger
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
                    $("#picker").parent().find('img').attr('src', '../../../img/arr_close.png');
                    $("#area").parent().find('img').attr('src', '../../../img/arr_close.png');
                    $("#disasterType").parent().find('img').attr('src', '../../../img/arr_close.png');
                }
            });
            $(document).on("touchstart", "#area", function () {
                if ($('.mask').css('display') == "none") {
                    $("#area").parent().find('img').attr('src', '../../../img/arr_open.png');
                    scrollArr[0].scrollTo(0, 0, 1);
                    scrollArr[2].scrollTo(0, 0, 1);
                    scrollArr[1].refresh();
                    active = "diqu";
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
                    $("#picker").parent().find('img').attr('src', '../../../img/arr_close.png');
                    $("#area").parent().find('img').attr('src', '../../../img/arr_close.png');
                    $("#disasterType").parent().find('img').attr('src', '../../../img/arr_close.png');
                }
            });
            $(document).on("touchstart", "#disasterType", function () {
                if ($('.mask').css('display') == "none") {
                    $("#disasterType").parent().find('img').attr('src', '../../../img/arr_open.png');
                    scrollArr[0].scrollTo(0, 0, 1);
                    scrollArr[1].scrollTo(0, 0, 1);
                    scrollArr[2].refresh();
                    active = "disasterType";
                    $('.mask').show();
                    $(".menuLeft").html("");
                    $(".menuCenter").html("");
                    $(".menuRight").html("");
                    disasterType.forEach(function (ele, index) {
                        $(".menuCenter").append("<li s=\"" + ele.id + "\" data-id=\"" + ele.id + "\"><span>" + ele.text + "</span></li>");
                    });
                } else {
                    $('.mask').hide();
                    $("#picker").parent().find('img').attr('src', '../../../img/arr_close.png');
                    $("#area").parent().find('img').attr('src', '../../../img/arr_close.png');
                    $("#disasterType").parent().find('img').attr('src', '../../../img/arr_close.png');
                }
            });
            $(document).on("click", ".menuLeft > li", function () {
                $(".menuCenter").html("");
                $(".menuRight").html("");
                $(this).addClass("active").siblings().removeClass("active");
                if (active == "fenlei") {
                    $("#picker").attr("placeholder", $(this).text())
                    $("#picker").html($(this).text());
                    goodsCategory2 = goodsCategory[$(this).attr("s")].children;
                    if (goodsCategory2) {
                        goodsCategory2.forEach(function (ele, index) {
                            console.log(ele);
                            $(".menuCenter").append("<li s=\"" + index + "\" data-id=\"" + ele.id + "\"><span>" + ele.text + "</span></li>");
                        });
                    }
                    dat.crop = $(this).attr("data-id");
                } else if (active == "diqu") {
                    $("#area").html($(this).text());
                    dat.city = $(this).attr('data-id');
                    area2 = area[$(this).attr("s")].children;
                    if (area2) {
                        area2.forEach(function (ele, index) {
                            $(".menuCenter").append("<li s=\"" + index + "\" data-id=\"" + ele.id + "\"><span>" + ele.text + "</span></li>");
                        });
                    }
                    dat.areaId = $(this).attr("data-id");
                }
                $("#contentHTML").empty();
                dat.pageNum = 1;
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
                    $("#picker").html($(this).text());
                    goodsCategory3 = goodsCategory2[$(this).attr("s")].children;
                    if (goodsCategory3) {
                        goodsCategory3.forEach(function (ele, index) {
                            console.log(ele);
                            $(".menuRight").append("<li s=\"" + index + "\" data-id=\"" + ele.id + "\"><span>" + ele.text + "</span></li>");
                        });
                    }
                    dat.crop = $(this).attr("data-id");
                } else if (active == "diqu") {
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
                } else if (active == "disasterType") {
                    dat.disasterType = $(this).attr("data-id");
                    $("#disasterType").html($(this).text());
                    $(".mask").hide();
                    $("#disasterType").parent().find('img').attr('src', '../../../img/arr_close.png');
                }
                $("#contentHTML").empty();
                dat.pageNum = 1;
                supDem.search(dat);
            });
            $(document).on("click", ".menuRight > li", function () {
                $(this).addClass("active").siblings().removeClass("active");
                console.log($(this).attr("data-id"));
                console.log(active);
                if (active == "fenlei") {
                    $("#picker").html($(this).text());
                    dat.crop = $(this).attr("data-id");
                } else if (active == "diqu") {
                    $("#area").html($(this).text());
                    dat.areaId = $(this).attr("data-id");
                } else if (active == "disasterType") {
                    $("#disasterType").html($(this).text());
                    dat.disasterType = $(this).attr("data-id");
                }
                $(".mask").hide();
                $("#picker").parent().find('img').attr('src', '../../../img/arr_close.png');
                $("#area").parent().find('img').attr('src', '../../../img/arr_close.png');
                $("#disasterType").parent().find('img').attr('src', '../../../img/arr_close.png');
                $("#contentHTML").empty();
                dat.pageNum = 1;
                supDem.search(dat);
            });
            setTimeout(function () {
                var minY = null;
                try {
                    scrollArr[0].on('scrollStart', function () {
                        minY = this.y;
                        $("#loadingTxt").html("加载更多..");
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
                            console.log(dat.pageNum);
                            supDem.search(dat);
                        }
                    });
                } catch (error) {}
            }, 300);
            //详情
            $(document).on('click', '#contentHTML > li', function () {
                window.open("nqsbDetail.html?id=" + $(this).attr('data-id'), '_self');
            });
            $(document).on('click', '#save', function () {
                if (my_token) {
                    window.open('nqsbUp.html', '_self');
                } else {
                    tool.loginPrompt()
                }

            });
            $(document).on('click', '#my', function () {
                if (my_token) {
                    window.open('my.html', '_self');
                } else {
                    tool.loginPrompt()
                }

            });
            $(document).on('click', '#_tuichu', function () {
                window.open('../../../login.html', '_self');
            })
        },
        search(dat) {
            var _this = this;
            dat.pageNum += "";
            dat.pageSize += "";
            $.ajax({
                url: localhost50010 + "/disasters/getPage?areaId=" + dat.areaId + "&cropId=" + dat.crop + "&pageNum=" + dat.pageNum + "&pageSize=" + dat.pageSize + "&disasterCode=" + dat.disasterType + "&city=" + dat.city,
                type: "GET",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json"
                },
                beforeSend: function beforeSend(xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function success(result) {
                    if (result.code == 0) {
                        var total = $(document).find(".nq").length;
                        if (total >= result.data.page.total) {
                            dat.pageNum--;
                            return;
                        }
                        if (result.code === "0") {
                            _this.listHtml(result.data.page);
                        }
                    } else {
                        console.log(result);
                    }
                },
                error: function error(_error4) {
                    console.log(_error4);
                }
            });
        },
        listHtml(data) {
            var img;
            data.rows.forEach(function (ele) {
                console.log(ele.id);
                img = ele.files ? ele.files.split(',')[0] : '';
                $("#contentHTML").append("<li data-id=\"" + ele.id + "\" class=\"nq\"><div class=\"img\"><img src=\"" + (imgUrl + img) + "\" alt=\"\" /><div class=\"address\"><p>" + ele.address + "</p></div></div><div class=\"brief\">\n                      " + ele.description + "\n                    </div>\n                  </li>");
                try {
                    if (scrollArr[0]) {
                        scrollArr[0].refresh();
                    }
                } catch (error) {}
                try {
                    if (scrollArr[1]) {
                        scrollArr[1].refresh();
                    }
                } catch (error) {}
                try {
                    if (scrollArr[2]) {
                        scrollArr[2].refresh();
                    }
                } catch (error) {}
                try {
                    if (scrollArr[3]) {
                        scrollArr[3].refresh();
                    }
                } catch (error) {}
            });
        }
    };
    supDem.init();
});