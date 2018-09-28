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
    var hospital = {
        init: () => {
            hospital.listen()
        },
        listen: () => {
            $("#menu_list").on("click", "li", function (event) {
                $(this).addClass("active").siblings().removeClass("active")
                var $eleWidth = $(window).width()
                $("#scroller").css({
                    "marginLeft": $(this).index() * -$eleWidth,
                    transition: "1s"
                })
            })
            $(document).on("touchstart", "#wrapper", function () {
                $("#scroller").css({
                    transition: "0s"
                })
            })
        }
    }
    hospital.init()
})