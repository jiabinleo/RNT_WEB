$(function () {
    var indexPage = {
        init: function () {
            indexPage.listen()
        },
        listen: function () {
            var bannerData = ["img/banner01.png", "img/banner01.png", "img/banner01.png", "img/banner01.png", "img/banner01.png", "img/banner01.png"]
            var bannerHTML = "";
            for (let i = 0; i < bannerData.length; i++) {
                bannerHTML +=
                    `<div class="swiper-slide">
                        <img src="${bannerData[i]}" alt="banner01">
                    </div>`
            }
            $("#banner").html(bannerHTML)
            $("#center").click(function () {
                $(".masked").addClass(" maskeds")
                $(".personalCente").addClass(" peractive")
            })
            $(".masked").click(function () {
                $(".masked").removeClass(" maskeds")
                $(".personalCente").removeClass(" peractive")
            })
            $(".personalCente_content > ul > li").click(function () {
                $(this).addClass("active").siblings().removeClass("active")
            })
            $("#userImg").attr("src", JSON.parse(sessionStorage.getItem("imgUrl")))
            $("#user_name").html(JSON.parse(sessionStorage.getItem("userName")))
            $(document).on("click", "#user_quit", function () {
                window.open("login.html", "_self");
            })
        }
    }
    indexPage.init()
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 3000,
        loop: true,
        speed: 1000,
        // slidesPerView: 'auto',
        pagination: '.swiper-pagination',
        autoplayDisableOnInteraction: false,
        centeredSlides: true
    })

})