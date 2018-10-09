var mySwiper = new Swiper('.swiper-container', {
    autoplay: 3000,
    loop: true,
    speed: 1000,
    // slidesPerView: 'auto',
    pagination: '.swiper-pagination',
    autoplayDisableOnInteraction: false,
    centeredSlides: true
})

$(function () {
    var diseaseAndInsectBank = {
        init: function () {
            diseaseAndInsectBank.listen()
        },
        listen: function () {
            var data = [{
                    title: "果树类",
                    link: "../diseaseList/diseaseList.html",
                    list: [{
                            img: "img/new1.png",
                            text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                        }, {
                            img: "img/new2.png",
                            text: "柑橘头号杀手“黄龙病”"
                        }, {
                            img: "img/new3.png",
                            text: "柑橘黄龙病的发展现状和趋势"
                        },

                    ]
                }, {
                    title: "核果类",
                    link: "../diseaseList/diseaseList.html",
                    list: [{
                            img: "img/new4.png",
                            text: "2018年种植核桃赚钱吗"
                        }, {
                            img: "img/new5.png",
                            text: "2018种植核桃的前景和市场价格行情"
                        }, {
                            img: "img/new6.png",
                            text: "种核桃让我变成了“有钱人”"
                        },

                    ]
                }, {
                    title: "浆果类",
                    link: "../diseaseList/diseaseList.html",
                    list: [{
                            img: "img/new7.png",
                            text: "猕猴桃根结线虫病症状特点及防治"
                        }, {
                            img: "img/new8.png",
                            text: "猕猴桃病虫害有哪些?如何防治?"
                        }, {
                            img: "img/new9.png",
                            text: "猕猴桃最常见的9种病虫害"
                        },

                    ]
                }, {
                    title: "仁果类",
                    link: "../diseaseList/diseaseList.html",
                    list: [{
                            img: "img/new10.png",
                            text: "两套“三666板斧”对付柑橘黄龙病"
                        }, {
                            img: "img/new11.png",
                            text: "柑橘头号杀手“黄龙病”"
                        }, {
                            img: "img/new12.png",
                            text: "柑橘黄龙病的发展现状和趋势"
                        },

                    ]
                },
                {
                    title: "果树类",
                    link: "../diseaseList/diseaseList.html",
                    list: [{
                            img: "img/new1.png",
                            text: "两套“三板斧”对付柑橘黄龙病"
                        }, {
                            img: "img/new2.png",
                            text: "柑橘头号杀手“黄龙病”"
                        }, {
                            img: "img/new3.png",
                            text: "柑橘黄龙病的发展现状和趋势"
                        },

                    ]
                }, {
                    title: "核果类",
                    link: "../diseaseList/diseaseList.html",
                    list: [{
                            img: "img/new4.png",
                            text: "2018年种植核桃赚钱吗"
                        }, {
                            img: "img/new5.png",
                            text: "2018种植核桃的前景和市场价格行情"
                        }, {
                            img: "img/new6.png",
                            text: "种核桃让我变成了“有钱人”"
                        },

                    ]
                }, {
                    title: "浆果类",
                    link: "../diseaseList/diseaseList.html",
                    list: [{
                            img: "img/new7.png",
                            text: "猕猴桃根结线虫病症状特点及防治"
                        }, {
                            img: "img/new8.png",
                            text: "猕猴桃病虫害有哪些?如何防治?"
                        }, {
                            img: "img/new9.png",
                            text: "猕猴桃最常见的9种病虫害"
                        },

                    ]
                }, {
                    title: "仁果类",
                    link: "../diseaseList/diseaseList.html",
                    list: [{
                            img: "img/new10.png",
                            text: "两套“三板斧”对付柑橘黄龙病"
                        }, {
                            img: "img/new11.png",
                            text: "柑橘头号杀手“黄龙病”"
                        }, {
                            img: "img/new12.png",
                            text: "柑橘黄龙病的发展现状和趋势"
                        },

                    ]
                }
            ]
            var diseaseList = ""
            for (let i = 0; i < data.length; i++) {
                diseaseList += `<div class="content">
                <div class="content-title">
                    <span class="blue-line"></span>
                    <div class="title">
                        <span>${data[i].title}</span>
                        <a href="${data[i].link}">
                            <span class="diseaseListTitle" data-id=${data[i].title}>
                                <img src="img/right.png" alt="right" srcset="">
                            </span>
                        </a>
                    </div>
                </div>
                <div class="content-text">
                    <ul>
                        <li>
                            <img src="${data[i].list[0].img}" alt="">
                            <p>${data[i].list[0].text}</p>
                        </li>
                        <li>
                            <img src="${data[i].list[1].img}" alt="">
                            <p>${data[i].list[1].text}</p>
                        </li><li>
                        <img src="${data[i].list[2].img}" alt="">
                        <p>${data[i].list[2].text}</p>
                    </li>
                    </ul>
                </div>
            </div>`
            }
            $("#diseaseList").html(diseaseList)
            $(document).on("click", ".diseaseListTitle", function () {
                localStorage.setItem("diseaseListTitle", $(this).attr("data-id"))
            })
        }
    }
    diseaseAndInsectBank.init()
})