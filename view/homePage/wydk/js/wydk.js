var wydk = {
    init: function () {
        $.ajax({
            url: localhost50010 + "/loan/bannerList",
            type: "GET",
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
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
            url: localhost50010 + "/loan/daikuaiList",
            type: "GET",
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            },
            success: function (result) {
                console.log(result)
                if (result.code === "0") {
                    console.log(result)
                    let list = result.data.list
                    list.forEach((ele, index) => {
                        $("#swiper_menu").append(
                            `<div class="swiper-slide" ids="${ele.id}">
                                <div class="menu-img">
                                    <img src="${imgUrl+ele.xiaoTu}" alt="">
                                </div>
                                    <p>${ele.name}</p>
                                </div>
                        </div>`
                        )
                    });
                    var mySwiper1 = new Swiper(".swiper-menu", {
                        slidesPerView: 4
                    });
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
        wydk.listen()
    },
    listen: function () {
        $(document).on("click", "#swiper_menu > .swiper-slide", function () {
            var id = $(this).attr("ids")
            window.open("../plantingLoan/plantingLoan.html?id=" + id, "_self");
        })
        $(document).on('click', '#_tuichu', function () {
            window.open("../../../login.html", "_self");
        })
        $(document).on('click', 'footer li', function () {
            let ids = $(this).attr('ids')
            console.log(ids)
            if (ids) {
                if (my_token) {
                    window.open(`${ids}.html`, `_self`);
                } else if (ids == "onlineService") {
                    window.open(`${ids}.html`, `_self`);
                } else {
                    tool.loginPrompt()
                }
            }
        })
        var data = [{
                link: "#",
                img: "../../../img/9213b07eca8065387c3260eb90dda144ac34826a.jpg",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }, {
                link: "#",
                img: "../../../img/9213b07eca8065387c3260eb90dda144ac34826a.jpg",
                text: "柑橘头号杀手“黄龙病”柑橘头号杀手“黄龙病”柑橘头号杀手“黄龙病”"
            },
            {
                link: "#",
                img: "../../../img/9213b07eca8065387c3260eb90dda144ac34826a.jpg",
                text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
            }
        ]
        data.forEach(ele => {
            $("#caseOfLoan").append(
                `<li>
                    <a href="${ele.link}">
                        <div>
                        <img src="${ele.img}" alt="">
                        </div>
                        <p>${ele.text}</p>
                    </a>
                </li>`
            )
        })
        if (myScroll)
            myScroll.refresh();
    },
    plugin: function () {
        var mySwiper = new Swiper(".swiper-container", {
            autoplay: 3000,
            loop: true,
            speed: 1000,
            slidesPerView: 'auto',
            pagination: ".swiper-pagination",
            autoplayDisableOnInteraction: false,
            centeredSlides: true
        });
    }
}
wydk.init()