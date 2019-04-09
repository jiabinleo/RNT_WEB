var dat = {
    sort: "time",
    pageNum: 1,
    pageSize: 6,
    keyword: ''
}
var search = {

    init() {
        this.listen()
    },
    listen() {
        var _this = this;
        //获取标签
        $.ajax({
            url: `${localhost50010}/insurance/category`,
            type: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            success: function (result) {
                if (result.code == '0') {
                    console.log(result.data.label)
                    result.data.label.forEach((ele, index) => {
                        console.log(ele)
                        if (index && index < 4) {
                            $("#menu_list").append(
                                `<li ids="${ele.id}">${ele.text}</li> `
                            )
                        } else {
                            $("#contentHTML").empty()
                            dat.keyword = ele.id
                            dat.pageNum = 1
                            _this.search(dat)
                            $("#menu_list").append(
                                `<li class="active" ids="${ele.id}">${ele.text}</li> `
                            )
                        }
                    })
                }

            },
            error: function (err) {}
        })
        $(document).on('click', '#menu_list > li', function () {
            $(this).addClass('active').siblings().removeClass('active')
            $("#contentHTML").empty()
            dat.keyword = $(this).attr('ids')
            dat.pageNum = 1
            _this.search(dat)
        })
        $(document).on('blur', '#keyword', function () {
            $("#menu_list").find('.active').removeClass('active')
            $("#contentHTML").empty()
            dat.keyword = $(this).val()
            dat.pageNum = 1
            _this.search(dat)
        })
        $(document).on('keypress', "#keyword", function (e) {
            var keycode = e.keyCode;
            if (keycode == '13') {
                $("#menu_list").find('.active').removeClass('active')
                $("#contentHTML").empty()
                dat.keyword = $(this).val()
                dat.pageNum = 1
                _this.search(dat)
            }
        });
        $(document).on('click', '#contentHTML > li', function () {
            window.open("../maize/maize.html?id=" + $(this).attr('data-id'), "_self");
        })

        setTimeout(() => {
            var minY = null;
            myScroll.on('scrollStart', function () {
                minY = this.y;
            });

            myScroll.on('scroll', function () {
                minY = minY < this.y ? minY : this.y;
            });

            myScroll.on('scrollEnd', function () {
                minY = minY < this.y ? minY : this.y;
                setTimeout(() => {
                    if (myScroll) {
                        myScroll.refresh();
                    }
                }, 3000);
                if (this.y == this.maxScrollY) {
                    dat.pageNum++
                    _this.search(dat)
                }
            });
        }, 300);
    },
    search(dat) {
        console.log(dat)
        var _this = this
        $.ajax({
            url: `${localhost50010}/insurance/getPage?sort=${dat.sort}&keyword=${dat.keyword}&pageNum=${dat.pageNum}&pageSize=${dat.pageSize}`,
            type: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            success: function (result) {
                if (result.code == 0) {
                    console.log(result)
                    var total = $(document).find(".top").length
                    if (total >= result.data.page.total) {
                        return
                    }
                    if (result.code === "0") {
                        _this.html(result.data.page)
                    }
                } else {
                    console.log(result)
                }
            },
            error: function (err) {}
        })
    },
    html(data) {
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
            if (myScroll) {
                myScroll.refresh();
            }
        })
    }
}
$(function () {
    search.init()
})