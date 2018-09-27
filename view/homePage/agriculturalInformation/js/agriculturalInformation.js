$(function () {
    var agriculturalInformation = {
        init: function () {
            agriculturalInformation.listen()
            agriculturalInformation.swiper()
        },
        listen: function () {

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
    agriculturalInformation.init()

})