$(function () {
    var category = "",
        title = "",
        label = "",
        pageNum = 1,
        pageSize = 5,
        total = null;
    var nyzx = {
        init: function () {
            // nyzx.swiper()
            nyzx.listen()

        },
        listen: function () {
            $.ajax({
                url: localhost + "/news/newsCategory",
                type: "get",
                success: function (data) {
                    if (data.code === "0") {
                        nyzx.menu(data.data.newsCategoryList)
                    }
                },
                error: function (err) {}
            });

            $(document).on("click", "#menu > li", function () {
                category = $(this).attr("data-id")
                nyzx.banner(category)
                $("#information_list").html("")
                pageNum = 1, total = 0;
                nyzx.newList(category, title, label, pageNum, pageSize)
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
                    if (this.y == this.maxScrollY) {
                        pageNum++
                        nyzx.newList(category, title, label, pageNum, pageSize)
                    }
                });
            }, 300);
            nyzx.newList(category, title, label, pageNum, pageSize)


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
            console.log(newsCategoryList)
            nyzx.banner(newsCategoryList[0].categoryCode)
            var menuHTML = "";
            for (let i = 0; i < newsCategoryList.length; i++) {
                if (i === 0) {
                    menuHTML += `<li data-id="${newsCategoryList[i].categoryCode}"> <span class = "active">${newsCategoryList[i].categoryName}</span></li>`
                } else {
                    menuHTML += `<li data-id="${newsCategoryList[i].categoryCode}"> <span>${newsCategoryList[i].categoryName}</span></li>`
                }
            }
            $("#menu").html(menuHTML)

            $(document).on("click", "#menu > li", function () {
                $(this).find("span").addClass("active")
                $(this).siblings().find("span").removeClass("active")
            })
        },
        banner: function (category) {
            $.ajax({
                url: localhost + "/news/topNewsListByCategory?category=" + category,
                type: "get",
                success: function (data) {
                    if (data.code === "0") {
                        console.log(data.data)
                        var bannerHTML = "",
                            bannerData = data.data.newsList
                        console.log(bannerData[0])
                        for (let i = 0; i < bannerData.length; i++) {
                            // ${ imgUrl+bannerData[i].cover}
                            // 
                            bannerHTML +=
                                `<div class="swiper-slide">
                                    <div class="img-wrap">
                                        <div class="img-inner">
                                        <a href="../informationDetails/informationDetails.html">
                                            <img src="img/new01.png" alt="${bannerData[i].title}">
                                            <div class="mask">
                                                <p>
                                                ${bannerData[i].label}
                                                </p>
                                                <p>
                                                ${bannerData[i].publishTime}·阅读量${bannerData[i].reading}
                                                </p>
                                            </div>
                                        </a>
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
                    }
                },
                error: function (err) {}
            });
        },
        newList: function (category, title, label, pageNum, pageSize) {
            console.log(category, title, label, pageNum, pageSize)
            $.ajax({
                url: localhost + "/news/newsList?category=" + category + "&title=" + title + "&label=" + label + "&pageNum=" + pageNum + "&pageSize=" + pageSize,
                type: "get",
                success: function (data) {
                    console.log(data)
                    if (data.code === "0") {
                        var informationListHTML = "";
                        var newListData = data.data.newsList.rows
                        console.log(data.data.newsList.total)

                        total += newListData.length
                        console.log(total)
                        if (myScroll) {
                            myScroll.refresh();
                        }
                        if (total > data.data.newsList.total) {
                            // alert("没有新数据")
                            return
                        }
                        for (let i = 0; i < newListData.length; i++) {
                            // ../informationDetails/informationDetails.html
                            informationListHTML +=
                                `<li>
                                    <a href="#">
                                        <div class="information-list-text">
                                            <div class="left">
                                                <p class="list-title">${newListData[i].title}</p>
                                                <p class="list-content">${newListData[i].brief}</p>
                                                <p class="list-time">
                                                    <span>${newListData[i].publishTime}</span>
                                                    <span>阅读 ${newListData[i].reading}</span>
                                                </p>
                                            </div>
                                            <div class="right">
                                                <img src="${imgUrl + newListData[i].iconOne}" alt="" onerror=src="/img/loading.gif" >
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

            // $("#information_list").append(
            //     informationListHTML
            //     // `<p>新的新闻</p>`
            // )
        }
    }
    nyzx.init()
})