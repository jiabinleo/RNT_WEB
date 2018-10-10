var debit = {
    init: function () {
        debit.listen()
    },
    listen: function () {


        var bannerData = ["img/banner1.png", "img/banner2.png", "img/banner3.png", "img/banner1.png", "img/banner2.png", "img/banner3.png"];
        var bannerImgHTML = ""
        for (let i = 0; i < bannerData.length; i++) {
            bannerImgHTML +=
                `<div class="swiper-slide">
                    <a href="#">
                        <img src="${bannerData[i]}" alt="banner"></a>
                </div>`
        }
        $("#bannerImgHTML").html(bannerImgHTML)

        var menuData = [{
            link: "#",
            imgUrl: "img/menu1.png",
            title: "种植贷"
        }, {
            link: "#",
            imgUrl: "img/menu2.png",
            title: "农资贷"
        }, {
            link: "#",
            imgUrl: "img/menu3.png",
            title: "农贸贷"
        }, {
            link: "#",
            imgUrl: "img/menu4.png",
            title: "个人贷"
        }]
        var menuHTML = ""
        for (let i = 0; i < menuData.length; i++) {
            menuHTML +=
                `<li>
                    <a href="${menuData[i].link}">
                        <div>
                            <div class="img">
                                <img src="${menuData[i].imgUrl}" alt="">
                            </div>
                            <p>${menuData[i].title}</p>
                        </div>
                    </a>
                </li>`
        }
        $("#menuHTML").html(menuHTML)

        var data = [{
                link: "#",
                img: "img/new1.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new2.png",
                text: "柑橘头号杀手“黄龙病”柑橘头号杀手“黄龙病”柑橘头号杀手“黄龙病”"
            },
            {
                link: "#",
                img: "img/new3.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new1.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new2.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new3.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new1.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new2.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new3.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new1.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new2.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            },
            {
                link: "#",
                img: "img/new3.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new1.png",
                text: "柑橘头号杀手“黄龙病”柑橘头号杀手“黄龙病”柑橘头号杀手“黄龙病”"
            },
            {
                link: "#",
                img: "img/new2.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new3.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new1.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new2.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new3.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new1.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new2.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new3.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "img/new1.png",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            },

        ]
        var caseOfLoan = ""
        for (let i = 0; i < data.length; i++) {
            caseOfLoan +=
                `<li>
            <a href="${data[i].link}">
                <div>
                    <img src="${data[i].img}" alt="">
                </div>
                <p>${data[i].text}</p>
            </a>
        </li>`
        }
        $("#caseOfLoan").html(caseOfLoan)

        debit.plugin()
    },
    plugin: function () {
        var mySwiper = new Swiper(".swiper-container", {
            autoplay: 3000,
            loop: true,
            speed: 1000,
            // slidesPerView: 'auto',
            pagination: ".swiper-pagination",
            autoplayDisableOnInteraction: false,
            centeredSlides: true
        });
    }
}
debit.init()