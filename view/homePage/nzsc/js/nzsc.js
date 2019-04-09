var nzsc = {
    init() {
        this.listen()
    },
    listen() {
        var bannerData = [{
            imgUrl: '../../../img/banner3.png',
        }]
        var menuData = [{
                imgUrl: '../../../img/icon/nongyao.png',
                text: '农药',
                ids: 'ny'
            },
            {
                imgUrl: '../../../img/icon/feiliao.png',
                text: '肥料',
                ids: 'ny'
            },
            {
                imgUrl: '../../../img/icon/nongji.png',
                text: '农机',
                ids: 'ny'
            },
            {
                imgUrl: '../../../img/icon/zhongzi.png',
                text: '种子',
                ids: 'ny'
            },
            {
                imgUrl: '../../../img/icon/nongmo.png',
                text: '农膜',
                ids: 'ny'
            },
        ]
        recommendData = [{
            imgUrl: '../../../img/mall_brote.png',
            ziying: 1,
            brief: '中保（ZhB）化肥进口史丹利',
            shop: '中保（ZHB）旗舰店',
            price: '88.80'
        }, {
            imgUrl: '../../../img/mall_Similac.png',
            ziying: 0,
            brief: '中保（ZhB）化肥进口史丹利 复合肥 肥料 花肥 氮磷钾 1斤 散装 复合肥1斤散装',
            shop: '中保（ZHB）旗舰店',
            price: '88.80'
        }, {
            imgUrl: '../../../img/mall_Similac.png',
            ziying: 0,
            brief: '中保（ZhB）化肥进口史丹利 复合肥 肥料 花肥 氮磷钾 1斤 散装 复合肥1斤散装',
            shop: '中保（ZHB）旗舰店',
            price: '88.80'
        }, {
            imgUrl: '../../../img/mall_brote.png',
            ziying: 0,
            brief: '中保（ZhB）化肥进口史丹利 复合肥 肥料 花肥 氮磷钾 1斤 散装 复合肥1斤散装',
            shop: '中保（ZHB）旗舰店',
            price: '88.80'
        }, {
            imgUrl: '../../../img/mall_brote.png',
            ziying: 0,
            brief: '中保（ZhB）化肥进口史丹利 复合肥 肥料 花肥 氮磷钾 1斤 散装 复合肥1斤散装',
            shop: '中保（ZHB）旗舰店',
            price: '88.80'
        }, {
            imgUrl: '../../../img/mall_brote.png',
            ziying: 1,
            brief: '中保（ZhB）化肥进口史丹利 复合肥 肥料 花肥 氮磷钾 1斤 散装 复合肥1斤散装',
            shop: '中保（ZHB）旗舰店',
            price: '88.80'
        }, {
            imgUrl: '../../../img/mall_brote.png',
            ziying: 1,
            brief: '中保（ZhB）化肥进口史丹利 复合肥 肥料 花肥 氮磷钾 1斤 散装 复合肥1斤散装',
            shop: '中保（ZHB）旗舰店',
            price: '88.80'
        }, {
            imgUrl: '../../../img/mall_brote.png',
            ziying: 1,
            brief: '中保（ZhB）化肥进口史丹利 复合肥 肥料 花肥 氮磷钾 1斤 散装 复合肥1斤散装',
            shop: '中保（ZHB）旗舰店',
            price: '88.80'
        }, {
            imgUrl: '../../../img/mall_brote.png',
            ziying: 0,
            brief: '中保（ZhB）化肥进口史丹利 复合肥 肥料 花肥 氮磷钾 1斤 散装 复合肥1斤散装',
            shop: '中保（ZHB）旗舰店',
            price: '88.80'
        }, {
            imgUrl: '../../../img/mall_brote.png',
            ziying: 1,
            brief: '中保（ZhB）化肥进口史丹利 复合肥 肥料 花肥 氮磷钾 1斤 散装 复合肥1斤散装中保（ZhB）化肥进口史丹利 复合肥 肥料 花肥 氮磷钾 1斤 散装 复合肥1斤散装',
            shop: '中保（ZHB）旗舰店',
            price: '88.80'
        }]
        this.bannerHTML(bannerData)
        this.menuHTML(menuData)
        this.recommendList(recommendData)
        this.msg()
    },
    bannerHTML(data) {
        data.forEach(ele => {
            $("#banner").append(
                `<div class="swiper-slide">
                <img src="${ele.imgUrl}" alt="banner01">
            </div>`
            )
        });
        this.swiperInit()
    },
    swiperInit() {
        var mySwiper = new Swiper(".swiper-container", {
            autoplay: 3000,
            loop: true,
            speed: 1000,
            pagination: '.swiper-pagination',
            autoplayDisableOnInteraction: false,
            centeredSlides: true,
            observerParent: true
        });
    },
    menuHTML(data) {
        $("#swiper_menu").empty()
        data.forEach(ele => {
            $("#swiper_menu").append(
                `<div class="swiper-slide" data-id="${ele.ids}">
                    <div>
                        <img src="${ele.imgUrl}" alt>
                        <p>${ele.text}</p>
                    </div>
                </div>`
            )
        });
        var mySwiper1 = new Swiper(".swiper-menu", {
            slidesPerView: 5
        });
    },
    recommendList(data) {
        var ziying = ""
        data.forEach(ele => {
            if (ele.ziying == 1) {
                ziying = `<img src="../../../img/ziying.png" alt></img>`
            } else {
                ziying = ""
            }
            $("#recommendList").append(
                `<li>
                    <a href="javascript:;">
                        <div class="list">
                            <div class="pesticides">
                                <div class="shopping">
                                    <img src="${ele.imgUrl}" alt="mall_brote">
                                </div>
                            </div>
                            <div class="presentation">
                                <p>
                                    <span>${ziying}</span>${ele.brief}</p>
                                <span class="shop">${ele.shop}</span>
                            </div>
                            <div class="price">
                                ￥${ele.price}
                            </div>
                        </div>
                    </a>
                </li>`
            )
        })
        if (myScroll) {
            myScroll.refresh();
        }
    },
    msg() {
        var msg = parseInt(Math.random() * 1000);
        var str = "";
        if (msg >= 100) {
            str = '99+'
        } else if (msg) {
            str = msg
        } else {
            str = "";
            $(".shop").hide()
        }
        $('#msg').html(str)
    }
}
$(function () {
    nzsc.init()
})