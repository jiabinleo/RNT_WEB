$(function () {
    var nyzx = {
        init: function () {
            nyzx.listen()
            nyzx.swiper()
        },
        listen: function () {
            var data = [{
                title: "今日要闻"
            }, {
                title: "农业政策"
            }, {
                title: "地区资讯"
            }, {
                title: "展览展会"
            }, {
                title: "农产品"
            }]
            var menuHTML = "";
            for (let i = 0; i < data.length; i++) {
                if (i === 0) {
                    menuHTML += `<li> <span class = "active">${data[i].title}</span></li>`
                } else {
                    menuHTML += `<li> <span>${data[i].title}</span></li>`
                }
            }
            $("#menu").html(menuHTML)

            $(document).on("click", "#menu > li", function () {
                $(this).find("span").addClass("active")
                $(this).siblings().find("span").removeClass("active")
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
                    }
                ]
            }
            var bannerHTML = "";
            for (let i = 0; i < newData.bannerImg.length; i++) {
                bannerHTML +=
                    `<div class="swiper-slide">
                        <div class="img-wrap">
                            <a href="../informationDetails/informationDetails.html">
                                <img src="${newData.bannerImg[i].imgUrl}" alt="banner01">
                                <div class="mask">
                                    <p>
                                    ${newData.bannerImg[i].text}
                                    </p>
                                    <p>
                                    ${newData.bannerImg[i].time}·${newData.bannerImg[i].read}
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>`
            }
            $("#bannerHTML").html(bannerHTML)

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
        },
        swiper: function () {
            var mySwiper = new Swiper('.swiper-container', {
                autoplay: false,
                loop: true,
                speed: 1000,
                // slidesPerView: 'auto',
                pagination: '.swiper-pagination',
                autoplayDisableOnInteraction: false,
                centeredSlides: true
            })
        }
    }
    nyzx.init()

})