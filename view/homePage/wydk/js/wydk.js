var my_token = JSON.parse(sessionStorage.getItem("my_token"));
var wydk = {
    init: function () {
        $.ajax({
            url: localhost40000 + "/loan/bannerList",
            type: "GET",
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("login_token", my_token);
            },
            success: function (result) {
                if (result.code === "0") {
                    var bannerList = result.data.bannerList
                    var bannerImgHTML = "";
                    for (let i = 0; i < bannerList.length; i++) {
                        bannerImgHTML +=
                            `<div class="swiper-slide">
                                <a href="#">
                                    <img src="${imgUrl + bannerList[i].bannerImg}" alt="banner"></a>
                            </div>`
                        $("#bannerImgHTML").html(bannerImgHTML)
                    }
                    wydk.plugin()
                }
            },
            error: function (error) {
                console.log(error)
            }
        })

        $.ajax({
            url: localhost40000 + "/loan/daikuaiList",
            type: "GET",
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("login_token", my_token);
            },
            success: function (result) {
                console.log(result)
                if (result.code === "0") {
                    console.log(result)
                    let list = result.data.list
                    var menuHTML = ""
                    for (let i = 0; i < list.length; i++) {
                        menuHTML +=
                            `<li data-code="${list[i].code}" id="${list[i].id}">
                                <div>
                                    <div class="img">
                                        <img src="${imgUrl+list[i].xiaoTu}" alt="">
                                    </div>
                                    <p>${list[i].name}</p>
                                </div>
                            </li>`
                    }
                    $("#menuHTML").html(menuHTML)
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
        wydk.listen()
    },
    listen: function () {
        $(document).on("touchstart", "#menuHTML > li", function () {
            var id = $(this).attr("id")
            window.open("../../homePage/plantingLoan/plantingLoan.html?id=" + id, "_self");
        })



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
wydk.init()