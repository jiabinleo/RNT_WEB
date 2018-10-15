$(function () {
    var indexPage = {
        init: function () {
            console.log(0.02133333)
            indexPage.listen();
        },
        listen: function () {
            // var my_token = sessionStorage.getItem("my_token")
            $.ajax({
                url: localhost + "/index/bannerList?category=index",
                type: "get",
                // beforeSend: function (xhr) {
                //     xhr.setRequestHeader("login_token", my_token);
                // },
                success: function (data) {
                    console.log(data)
                    if (data.code === "0") {
                        indexPage.banner(data.data.bannerList)
                    }
                },
                error: function (err) {}
            });
            $.ajax({
                url: localhost + "/index/menuList",
                type: "get",
                success: function (data) {
                    console.log(data)
                    if (data.code === "0") {
                        indexPage.menu(data.data.menuList)
                    }
                },
                error: function (err) {}
            });

            $.ajax({
                url: localhost + "/news/indexNewsList",
                type: "get",
                success: function (data) {
                    console.log(data)
                    if (data.code === "0") {
                        indexPage.indexNews(data.data.newsList)
                    }
                },
                error: function (err) {}
            });
            $("#center").click(function () {
                $(".masked").addClass(" maskeds");
                $(".personalCente").addClass(" peractive");
            });
            $(".masked").click(function () {
                $(".masked").removeClass(" maskeds");
                $(".personalCente").removeClass(" peractive");
            });
            $(".personalCente_content > ul > li").click(function () {
                $(this)
                    .addClass("active")
                    .siblings()
                    .removeClass("active");
            });
            $("#userImg").attr("src", JSON.parse(sessionStorage.getItem("imgUrl")));
            $("#user_name").html(JSON.parse(sessionStorage.getItem("userName")));
            $(document).on("click", "#user_quit", function () {
                window.open("login.html", "_self");
                session = ["account", "imgUrl", "my_token", "userName"]

                for (let i = 0; i < session.length; i++) {
                    sessionStorage.removeItem(session[i]);
                }
                // sessionStorage.removeItem();
                // sessionStorage.removeItem("");
                // sessionStorage.removeItem("");
            });
        },
        banner: function (bannerList) {
            var bannerHTML = "";
            for (let i = 0; i < bannerList.length; i++) {
                bannerHTML +=
                    `<div class="swiper-slide">
                        <a href="javascript:;">
                            <img src="${imgUrl+bannerList[i].bannerImg}" alt="${bannerList[i].bannerName}">
                        </a>
                    </div>`;
            }
            $("#banner").html(bannerHTML);
            var mySwiper = new Swiper(".swiper-container", {
                autoplay: 3000,
                loop: true,
                speed: 1000,
                // slidesPerView: 'auto',
                pagination: ".swiper-pagination",
                autoplayDisableOnInteraction: false,
                centeredSlides: true
            });
        },
        menu: function (menuList) {
            console.log(localhost)
            var menuHTML = "";
            for (let i = 0; i < menuList.length; i++) {
                menuHTML +=
                    `<li>
                        <a href="${linkUrl}/view/homePage/${menuList[i].code}/${menuList[i].code}.html">
                            <div>
                                <img src="${imgUrl+menuList[i].icon}" alt="${menuList[i].title}">
                                <p>${menuList[i].title}</p>
                            </div>
                        </a>
                    </li>`
            }
            $("#menuHTML").html(menuHTML)

        },
        indexNews: function (indexNewsList) {
            // var indexNewsList = [
            //     {
            //     author: "l李大嘴",
            //     authorIcon: "/img/asdhf.jpg",
            //     brief: "农业农业农业",
            //     categoryCode: "ny",
            //     content: "气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象气象",
            //     icon: "/icon/v54.jpg",
            //     id: 1,
            //     img: "/img/sahfhd.jpg",
            //     label: "农业",
            //     publishTime: 1539167177000,
            //     reading: 43,
            //     title: "农业",
            //     topOne: "1",
            //     topOneTime: 1539244240000,
            //     topTwo: null,
            //     topTwoTime: null
            // }, {
            //     author: "张大炮",
            //     authorIcon: "/img/asdhf.jpg",
            //     brief: "气象气象气象",
            //     categoryCode: "qx",
            //     content: "气象气象气象气象气象气象气象气象气象气象气象气象",
            //     icon: "/icon/v54.jpg",
            //     id: 2,
            //     img: "/img/sahfhd.jpg",
            //     label: "气象",
            //     publishTime: 1539080780000,
            //     reading: 45,
            //     title: "气象",
            //     topOne: "1",
            //     topOneTime: 1539071442000,
            //     topTwo: null,
            //     topTwoTime: null
            // }, {
            //     author: "张大炮",
            //     authorIcon: "/img/asdhf.jpg",
            //     brief: "气象气象气象",
            //     categoryCode: "qx",
            //     content: "气象气象气象气象气象气象气象气象气象气象气象气象",
            //     icon: "/icon/v54.jpg",
            //     id: 2,
            //     img: "/img/sahfhd.jpg",
            //     label: "气象",
            //     publishTime: 1539080780000,
            //     reading: 45,
            //     title: "气象",
            //     topOne: "1",
            //     topOneTime: 1539071442000,
            //     topTwo: null,
            //     topTwoTime: null
            // }, {
            //     author: "张大炮",
            //     authorIcon: "/img/asdhf.jpg",
            //     brief: "气象气象气象",
            //     categoryCode: "qx",
            //     content: "气象气象气象气象气象气象气象气象气象气象气象气象",
            //     icon: "/icon/v54.jpg",
            //     id: 2,
            //     img: "/img/sahfhd.jpg",
            //     label: "气象",
            //     publishTime: 1539080780000,
            //     reading: 45,
            //     title: "气象",
            //     topOne: "1",
            //     topOneTime: 1539071442000,
            //     topTwo: null,
            //     topTwoTime: null
            // }, {
            //     author: "张大炮",
            //     authorIcon: "/img/asdhf.jpg",
            //     brief: "气象气象气象",
            //     categoryCode: "qx",
            //     content: "气象气象气象气象气象气象气象气象气象气象气象气象",
            //     icon: "/icon/v54.jpg",
            //     id: 2,
            //     img: "/img/sahfhd.jpg",
            //     label: "气象",
            //     publishTime: 1539080780000,
            //     reading: 45,
            //     title: "气象",
            //     topOne: "1",
            //     topOneTime: 1539071442000,
            //     topTwo: null,
            //     topTwoTime: null
            // }, {
            //     author: "张大炮",
            //     authorIcon: "/img/asdhf.jpg",
            //     brief: "气象气象气象",
            //     categoryCode: "qx",
            //     content: "气象气象气象气象气象气象气象气象气象气象气象气象",
            //     icon: "/icon/v54.jpg",
            //     id: 2,
            //     img: "/img/sahfhd.jpg",
            //     label: "气象",
            //     publishTime: 1539080780000,
            //     reading: 45,
            //     title: "气象",
            //     topOne: "1",
            //     topOneTime: 1539071442000,
            //     topTwo: null,
            //     topTwoTime: null
            // }, {
            //     author: "张大炮",
            //     authorIcon: "/img/asdhf.jpg",
            //     brief: "气象气象气象",
            //     categoryCode: "qx",
            //     content: "气象气象气象气象气象气象气象气象气象气象气象气象",
            //     icon: "/icon/v54.jpg",
            //     id: 2,
            //     img: "/img/sahfhd.jpg",
            //     label: "气象",
            //     publishTime: 1539080780000,
            //     reading: 45,
            //     title: "气象",
            //     topOne: "1",
            //     topOneTime: 1539071442000,
            //     topTwo: null,
            //     topTwoTime: null
            // }, {
            //     author: "张大炮",
            //     authorIcon: "/img/asdhf.jpg",
            //     brief: "气象气象气象",
            //     categoryCode: "qx",
            //     content: "气象气象气象气象气象气象气象气象气象气象气象气象",
            //     icon: "/icon/v54.jpg",
            //     id: 2,
            //     img: "/img/sahfhd.jpg",
            //     label: "气象",
            //     publishTime: 1539080780000,
            //     reading: 45,
            //     title: "气象",
            //     topOne: "1",
            //     topOneTime: 1539071442000,
            //     topTwo: null,
            //     topTwoTime: null
            // }]
            console.log(indexNewsList)
            var newsHTML = ""
            for (let i = 0; i < indexNewsList.length; i++) {
                if (i % 4 === 0) {
                    newsHTML +=
                        `<div data-id= ${indexNewsList[i].id} class="new_top newsList">
                            <div class="new_top_left">
                                <img src="${imgUrl + indexNewsList[i].iconOne}" alt="new01">
                            </div>
                            <div class="new_top_right">
                                <h3>
                                ${indexNewsList[i].title}
                                </h3>
                                <p>${indexNewsList[i].brief}</p>
                                <div class="datatime">
                                    <span>${indexNewsList[i].publishTime}</span>
                                    <span>阅读${indexNewsList[i].reading}</span>
                                </div>
                            </div>
                        </div>`
                } else if (i % 4 === 1 || i % 4 === 2 || i % 4 === 3) {
                    newsHTML +=
                        `<div data-id= ${indexNewsList[i].id} class="list newsList">
                            <div class="bg">
                                <img src="${imgUrl + indexNewsList[i].iconOne}" alt="new02">
                                <div class="read">
                                    <span>阅读${indexNewsList[i].reading}</span>
                                </div>
                            </div>
                            <p class="text">${indexNewsList[i].brief}</p>
                        </div>`
                }
            }
            $("#news").html(newsHTML)
            $(document).on("click", "#news > .newsList", function () {
                console.log()
                window.open(`view/homePage/informationDetails/informationDetails.html?id=${$(this).attr("data-id")}`, "_self");
            })
        }

    };

    indexPage.init();

});