$(function () {
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 3000,
        loop: true,
        speed: 1000,
        // slidesPerView: 'auto',
        pagination: '.swiper-pagination',
        autoplayDisableOnInteraction: false,
        centeredSlides: true
    })
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
})