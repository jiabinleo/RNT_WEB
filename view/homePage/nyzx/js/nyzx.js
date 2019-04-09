$(function () {
    var category = "",
        title = "",
        label = "",
        pageNum = 1,
        pageSize = 10,
        total = null;
    var nyzx = {
        init: function () {
            nyzx.listen()

        },
        listen: function () {
            $.ajax({
                url: localhost50010 + "/news/newsCategory",
                type: "get",
                success: function (data) {
                    if (data.code === "0") {
                        nyzx.menu(data.data.newsCategoryList)
                        category = data.data.newsCategoryList[0].categoryCode
                    }
                },
                error: function (err) {}
            });
            $(document).on("click", "#swiper_menu > .swiper-slide", function () {
                category = $(this).attr("data-id")
                nyzx.banner(category)
                $.cookie("category", category, {
                    expires: 7
                });
                $("#information_list").empty()
                $("#loadingTxt").empty()
            })
            setTimeout(() => {
                var minY = null;
                myScroll.on('scrollStart', function () {
                    minY = this.y;
                    $("#loadingTxt").html("加载更多..")
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
                        pageNum++
                        nyzx.newList(category, title, label, pageNum, pageSize)
                    }
                });
            }, 300);
            $(document).on("click", "section  .newsList", function () {
                console.log($(this).attr("data-id"))
                window.open(`../xwxq/xwxq.html?id=${$(this).attr("data-id")}`, "_self");
            })
        },
        swiper: function () {
            var mySwiper = new Swiper('.swiper-container', {
                autoplay: false,
                loop: false,
                speed: 1000,
                // slidesPerView: 'auto',
                pagination: '.swiper-pagination',
                autoplayDisableOnInteraction: false,
                centeredSlides: true
            })
        },
        menu: function (newsCategoryList) {
            if ($.cookie("category")) {
                nyzx.banner($.cookie("category"))

            } else {
                nyzx.banner(newsCategoryList[0].categoryCode)
            }
            $("#swiper_menu").empty()
            newsCategoryList.forEach((ele, index) => {
                if (index) {
                    $("#swiper_menu").append(
                        `<div class="swiper-slide" data-id="${ele.categoryCode}">
                            <span>${ele.categoryName}</span>
                        </div>`
                    )
                } else {
                    $("#swiper_menu").append(
                        `<div class="active swiper-slide" data-id="${ele.categoryCode}">
                            <span>${ele.categoryName}</span>
                        </div>`
                    )
                }
            });
            var mySwiper1 = new Swiper(".swiper-menu", {
                slidesPerView: 5
            });
        },
        banner: function (category) {
            $.ajax({
                url: localhost50010 + "/news/topNewsListByCategory?category=" + category,
                type: "get",
                success: function (data) {
                    if (data.code === "0") {
                        var bannerHTML = "",
                            bannerData = data.data.newsList
                        for (let i = 0; i < bannerData.length; i++) {
                            // ${ imgUrl+bannerData[i].cover}
                            // console.log()
                            bannerHTML +=
                                `<div data-id="${data.data.newsList[i].id}"  class="newsList swiper-slide">
                                    <div class="img-wrap">
                                        <div class="img-inner">
                                            <img src="${imgUrl+bannerData[i].cover}" alt="${bannerData[i].title}">
                                            <div class="mask">
                                                <p>
                                                ${bannerData[i].title}
                                                </p>
                                                <p>
                                                ${tool.timeConversion(bannerData[i].publishTime)} · ${bannerData[i].reading}人阅读
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
                        }
                        $("#bannerHTML").html(
                            `<div class="swiper-container">
                            <div class="swiper-wrapper">
                            ${bannerHTML}
                            </div>
                        </div>`
                        )
                        nyzx.swiper()
                        pageNum = 1, total = 0;
                        nyzx.newList(category, title, label, pageNum, pageSize)
                        $("div[data-id='" + category + "']").addClass("active").siblings().removeClass("active")
                    }
                },
                error: function (err) {}
            });
        },
        newList: function (category, title, label, pageNum, pageSize) {
            $.ajax({
                url: localhost50010 + "/news/newsList?category=" + category + "&title=" + title + "&label=" + label + "&pageNum=" + pageNum + "&pageSize=" + pageSize,
                type: "get",
                success: function (data) {
                    if (data.code === "0") {
                        var informationListHTML = "";
                        var newListData = data.data.newsList.rows
                        total += newListData.length
                        if (myScroll) {
                            myScroll.refresh();
                        }
                        if (total > data.data.newsList.total) {
                            // alert("没有新数据")
                            $("#loadingTxt").html("我是有底线的")
                            return
                        }
                        for (let i = 0; i < newListData.length; i++) {
                            // ../xwxq/xwxq.html
                            informationListHTML +=
                                `<li data-id="${data.data.newsList.rows[i].id}" class="newsList">
                                    <a href="#">
                                        <div class="information-list-text">
                                            <div class="left">
                                                <p class="list-title">${newListData[i].title}</p>
                                                <p class="list-content">${newListData[i].brief}</p>
                                                <p class="list-time">
                                                    <span>${tool.timeConversion(newListData[i].publishTime)}</span>
                                                    <span>阅读 ${newListData[i].reading}</span>
                                                </p>
                                            </div>
                                            <div class="right">
                                                <img src="${imgUrl + newListData[i].iconTwo}" alt="" onerror="javascript:this.src='../../../img/loading.gif" >
                                            </div>
                                        </div>
                                    </a>
                                </li>`
                        }
                        $("#information_list").append(
                            informationListHTML
                        )

                        if (myScroll) {
                            myScroll.refresh();
                        }
                    }
                },
                error: function (err) {}
            });
        }
    }
    nyzx.init()
})