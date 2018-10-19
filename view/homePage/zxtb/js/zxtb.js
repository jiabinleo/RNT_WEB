$(function () {
    var zxtb = {
        init: function () {
            $.ajax({
                url: localhost40000 + "/insurance/bannerList",
                type: "get",
                success: function (data) {
                    data = JSON.parse(data)
                    if (data.code === "0") {
                        zxtb.banner(data.data.bannerList)
                    }
                },
                error: function (err) {}
            });
            $.ajax({
                url: localhost40000 + "/insurance/topList",
                type: "get",
                success: function (data) {
                    data = JSON.parse(data)
                    if (data.code === "0") {
                        zxtb.produce(data.data.list)
                    }
                },
                error: function (err) {}
            });
            zxtb.listen()
        },
        listen: function () {
            $(document).on("click", ".detail", function () {
                console.log($(this).attr("data-id"))
                window.open("../maize/maize.html?id=" + $(this).attr("data-id"), "_self");
            })
            $(document).on("touchend", "#more", function () {
                window.open("zxtbMore.html?m=more", "_self");
            })
        },
        banner: function (bannerList) {
            var bannerHTML = "";
            for (let i = 0; i < bannerList.length; i++) {
                bannerHTML +=
                    `<div data-id="${bannerList[i].id}" class="detail swiper-slide">
                        <img src="${imgUrl+bannerList[i].bannerImg}" alt="">
                    </div>`
            }
            $("#bannerHTML").html(bannerHTML)
            zxtb.swiper()
        },
        produce: function (list) {
            var listHTML = "";
            console.log(list[0])
            for (let i = 0; i < list.length; i++) {
                listHTML +=
                    `<div data-id="${list[i].id}" class="detail insurance">
                        <div class="insurance_img">
                            <img src="${imgUrl+list[i].cover}" alt="${list[i].insuranceName}">
                        </div>
                        <div class="insurance_title">
                            <h3>${list[i].insuranceName}
                                <span></span>
                            </h3>
                            <div class="insurance_title_p">
                                <p>${list[i].brief}</p>
                                <div class="insurance_title_span">
                                    <span id="span01">${list[i].cost}</span>
                                    <span id="span02">元</span>
                                    <span id="span03">/</span>
                                    <span id="span04">亩</span>
                                </div>
                            </div>
                        </div>
                    </div>`

            }
            $("#produce").html(listHTML)
            if (myScroll) {
                myScroll.refresh();
            }
        },
        swiper: function () {
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
    zxtb.init()
})