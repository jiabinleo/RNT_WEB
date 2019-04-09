$(function () {
    var dat = {
        pageNum: 1,
        pageSize: 6,
    };
    var listThis = null;
    var supDem = {
        init: function init() {
            this.listen();
        },
        listen: function listen() {
            var _this = this;
            _this.search(dat)
            var timeOutEvent;
            $(document).on("touchstart", "#contentHTML > li", function () {
                $("#address").html(`${$(this).find(".address").text()}`)
                $("#queren").attr("ids", $(this).attr("data-id"))
                timeOutEvent = setTimeout(function () {
                    $("#wrap").show()
                }, 500);
                listThis = $(this)
            })
            $(document).on("touchend", "#contentHTML > li", function () {
                clearTimeout(timeOutEvent);
            })
            $(document).on('click', '#queren', function () {
                $.ajax({
                    url: localhost50010 + "/disasters/cancel/" + $(this).attr('ids'),
                    type: "GET",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    beforeSend: function beforeSend(xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    success: function success(result) {
                        tool.tip(result.message)
                        if (result.code === "0") {
                            listThis.hide()
                            if (myScroll) {
                                myScroll.refresh()
                            }
                        }
                        $("#wrap").hide()
                    },
                    error: function error(e) {
                        console.log(e);
                    }
                });
            })
            $(document).on('click', '#quxiao', function () {
                $("#wrap").hide()
            })
            setTimeout(function () {
                var minY = null;
                try {
                    myScroll.on('scrollStart', function () {
                        minY = this.y;
                    });
                    myScroll.on('scroll', function () {
                        minY = minY < this.y ? minY : this.y;
                    });
                    myScroll.on('scrollEnd', function () {
                        minY = minY < this.y ? minY : this.y;
                        setTimeout(function () {
                            $("#loadingTxt").html("");
                            if (myScroll) {
                                myScroll.refresh();
                            }
                        }, 3000);
                        if (this.y == this.maxScrollY) {
                            dat.pageNum++;
                            console.log(dat.pageNum);
                            _this.search(dat);
                        }
                    });
                } catch (error) {}
            }, 300);
            //详情
            $(document).on('click', '#contentHTML > li', function () {
                window.open("nqsbDetail.html?id=" + $(this).attr('data-id'), '_self');
            });
        },
        search(dat) {
            var _this = this;
            dat.pageNum += "";
            dat.pageSize += "";
            $.ajax({
                url: localhost50010 + "/disasters/getMyPage?" + "&pageNum=" + dat.pageNum + "&pageSize=" + dat.pageSize,
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
                            if (myScroll) {
                                myScroll.refresh()
                            }
                        }
                    } else {
                        toolbar.tip(result.message)
                    }
                },
                error: function error(_error4) {
                    console.log(_error4);
                }
            });
        },
        listHtml: function listHtml(data) {
            var img;
            data.rows.forEach(function (ele) {
                console.log(ele.id);
                img = ele.files ? ele.files.split(',')[0] : '';
                $("#contentHTML").append("<li data-id=\"" + ele.id + "\" class=\"nq\"><div class=\"img\"><img src=\"" + (imgUrl + img) + "\" alt=\"\" /><div class=\"address\"><p>" + ele.address + "</p></div></div><div class=\"brief\">\n                      " + ele.description + "\n                    </div>\n                  </li>");
            });
            if (myScroll) {
                myScroll.refresh()
            }
        }
    };
    supDem.init();
});