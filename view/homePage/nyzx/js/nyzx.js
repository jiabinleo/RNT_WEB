$(function () {
    var pageNum = 1,
        pageSize = 10;
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
                    console.log(data)
                    if (data.code === "0") {
                        nyzx.menu(data.data.newsCategoryList)
                    }
                },
                error: function (err) {}
            });

            $(document).on("click", "#menu > li", function () {
                nyzx.banner($(this).attr("data-id"))
            })

            var newData = {
                bannerImg: [{
                        link: "../informationDetails/informationDetails.html",
                        imgUrl: "img/banner.png",
                        text: "“123”带动河北承德深山区农民致富,让农民轻松松耕种致富是我追求的目标。",
                        time: "1小时前",
                        read: "888"
                    },
                    {
                        link: "../informationDetails/informationDetails.html",
                        imgUrl: "img/banner.png",
                        text: "“原始农业”带动河北承德深山区农民致富,让农民轻松松耕种致富是我追求的目标。",
                        time: "1小时前",
                        read: "888"
                    },
                    {
                        link: "../informationDetails/informationDetails.html",
                        imgUrl: "img/banner.png",
                        text: "“原始农业”带动河北承德深山区农民致富,让农民轻松松耕种致富是我追求的目标。",
                        time: "1小时前",
                        read: "888"
                    }
                ],
                news: [{
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    }, {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    }, {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    }, {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    }, {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    }, {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    }, {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    }, {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new01.png",
                        time: "2017.12.21",
                        read: "183"
                    },
                    {
                        title: "警惕！壮汉吃半盘四季豆被毒倒半夜全身抽搐发抖！",
                        text: "吃完宵夜回家，半夜突然浑身发冷冻得“打摆子”，日前，49岁的武汉市民闻先生一连串的异常反应吓坏家人，一连串的异常反应吓坏家人一连串的异常反应吓坏家人",
                        imgUrl: "img/new02.png",
                        time: "2017.12.21",
                        read: "183"
                    }
                ]
            }
            var bannerHTML = "";


            var informationListHTML = "";
            for (let i = 0; i < newData.news.length; i++) {
                informationListHTML +=
                    `<li>
                        <a href="../informationDetails/informationDetails.html">
                            <div class="information-list-text">
                                <div class="left">
                                    <p class="list-title">${newData.news[i].title}</p>
                                    <p class="list-content">${newData.news[i].text}</p>
                                    <p class="list-time"><span>${newData.news[i].time}</span><span>阅读 ${newData.news[i].read}</span>
                                    </p>
                                </div>
                                <div class="right">
                                    <img src="${newData.news[i].imgUrl}" alt="">
                                </div>
                            </div>
                        </a>
                    </li>`
            }
            $("#information_list").html(informationListHTML)
            setTimeout(() => {
                var minY = null;
                myScroll.on('scrollStart', function () {

                    minY = this.y;
                    // console.log(minY)
                });

                myScroll.on('scroll', function () {

                    minY = minY < this.y ? minY : this.y;
                });

                myScroll.on('scrollEnd', function () {
                    minY = minY < this.y ? minY : this.y;
                    // console.log(minY)
                    // console.log(this.y)
                    // console.log(this.directionY)
                    // if (this.y === minY > 10 && (this.directionY == 1)) {
                    //     console.log('到底了')
                    //     console.log("666")
                    // }
                    if (this.y == this.maxScrollY) {
                        pageNum++
                        // loaded()
                        // console.log('到底了')

                        // nyzx.newList(category, title, label, pageNum, pageSize)
                        console.log(pageNum)
                        $("#information_list").append(
                            `<p>新的新闻</p>`
                        )
                        if (myScroll) {
                            myScroll.refresh();
                        }

                    }
                });
            }, 300);

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
        }
    }
    nyzx.init()
})