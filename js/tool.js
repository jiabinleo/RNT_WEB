(function () {
    var width = document.documentElement.clientWidth;
    var style = document.createElement("style")
    style.innerHTML = "html{font-size: " + width / 16 + "px !important;}"
    document.head.appendChild(style)
})();
var mySwiper = new Swiper('.swiper-container', {
    autoplay: 3000,
    loop: true,
    speed: 1000,
    // slidesPerView: 'auto',
    pagination : '.swiper-pagination',
    autoplayDisableOnInteraction : false,
    centeredSlides:true
})