$(function () {
    var supDem = {
        init: function () {
            supDem.listen()
        },
        listen: function () {
            var menu = [{
                    title: "农人风采",
                    link: "#",
                    imgUrl: "img/nongren.png"
                },
                {
                    title: "专家专栏",
                    link: "#",
                    imgUrl: "img/zhuanjia.png"
                },
                {
                    title: "企业专版",
                    link: "#",
                    imgUrl: "img/qiye.png"
                },
                {
                    title: "推荐专题",
                    link: "#",
                    imgUrl: "img/tuijian.png"
                },
                {
                    title: "交流专区",
                    link: "#",
                    imgUrl: "img/jiaoliu.png"
                }
            ]
            var menuHTML = "";
            for (let i = 0; i < menu.length; i++) {
                menuHTML += `<li>
                <a href="${menu[i].link}">
                    <div>
                        <img src="${menu[i].imgUrl}" alt="${menu[i].title}">
                    </div>
                </a>
            </li>`
            }
            $("#menuHTML").html(menuHTML)

        }
    }
    supDem.init()

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