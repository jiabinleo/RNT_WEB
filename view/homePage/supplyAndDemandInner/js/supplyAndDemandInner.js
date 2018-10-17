$(function () {
    var supDem = {
        init: function () {
            console.log(localStorage.getItem("fenlei"))
            if ($.isEmptyObject(localStorage.getItem("fenlei"))) {
                console.log(true)
                $("#fenlei").html("选择分类")
            } else {
                console.log(false)
                $("#fenlei").html(localStorage.getItem("fenlei"))
            }

            console.log(localStorage.getItem("diqu"))
            if ($.isEmptyObject(localStorage.getItem("diqu"))) {
                console.log(true)
                $("#diqu").html("选择地区")
            } else {
                console.log(false)
                $("#diqu").html(localStorage.getItem("diqu"))
            }

            console.log(localStorage.getItem("paixu"))
            if ($.isEmptyObject(localStorage.getItem("paixu"))) {
                console.log(true)
                $("#paixu").html("排序方式")
            } else {
                console.log(false)
                $("#paixu").html(localStorage.getItem("paixu"))
            }
            supDem.listen()
        },
        listen: function () {
            var contentData = [{
                link: "../../supplyInformation/supplyInformation.html",
                user: "赣南脐橙专业合作社",
                userImgUrl: "img/userLogo.png",
                iden: "江西赣州赣南县",
                title: "出售赣南脐橙",
                time: "1小时前",
                text: "本合作社种植赣南脐橙50亩地，产量约20万斤，现出售，有需要的请联系电话18889878888。",
                read: "888",
                heart: "666",
                img: [
                    "img/new.png", "img/new.png", "img/new.png", "img/new.png"
                ]
            }, {
                link: "../../supplyInformation/supplyInformation.html",
                user: "赣南脐橙专业合作社",
                userImgUrl: "img/userLogo.png",
                iden: "江西赣州赣南县",
                title: "出售赣南脐橙",
                time: "1小时前",
                text: "本合作社种植赣南脐橙50亩地，产量约20万斤，现出售，有需要的请联系电话18889878888。",
                read: "888",
                heart: "666",
                img: [
                    "img/new.png", "img/new.png", "img/new.png", "img/new.png"
                ]
            }, {
                link: "../../supplyInformation/supplyInformation.html",
                user: "赣南脐橙专业合作社",
                userImgUrl: "img/userLogo.png",
                iden: "江西赣州赣南县",
                title: "出售赣南脐橙",
                time: "1小时前",
                text: "本合作社种植赣南脐橙50亩地，产量约20万斤，现出售，有需要的请联系电话18889878888。",
                read: "888",
                heart: "666",
                img: [
                    "img/new.png", "img/new.png", "img/new.png", "img/new.png"
                ]
            }, {
                link: "../../supplyInformation/supplyInformation.html",
                user: "赣南脐橙专业合作社",
                userImgUrl: "img/userLogo.png",
                iden: "江西赣州赣南县",
                title: "出售赣南脐橙",
                time: "1小时前",
                text: "本合作社种植赣南脐橙50亩地，产量约20万斤，现出售，有需要的请联系电话18889878888。",
                read: "888",
                heart: "666",
                img: [
                    "img/new.png", "img/new.png", "img/new.png", "img/new.png"
                ]
            }, {
                link: "../../supplyInformation/supplyInformation.html",
                user: "赣南脐橙专业合作社",
                userImgUrl: "img/userLogo.png",
                iden: "江西赣州赣南县",
                title: "出售赣南脐橙",
                time: "1小时前",
                text: "本合作社种植赣南脐橙50亩地，产量约20万斤，现出售，有需要的请联系电话18889878888。",
                read: "888",
                heart: "666",
                img: [
                    "img/new.png", "img/new.png", "img/new.png", "img/new.png"
                ]
            }, {
                link: "../../supplyInformation/supplyInformation.html",
                user: "赣南脐橙专业合作社",
                userImgUrl: "img/userLogo.png",
                iden: "江西赣州赣南县",
                title: "出售赣南脐橙",
                time: "1小时前",
                text: "本合作社种植赣南脐橙50亩地，产量约20万斤，现出售，有需要的请联系电话18889878888。",
                read: "888",
                heart: "666",
                img: [
                    "img/new.png", "img/new.png", "img/new.png", "img/new.png"
                ]
            }, {
                link: "../../supplyInformation/supplyInformation.html",
                user: "赣南脐橙专业合作社",
                userImgUrl: "img/userLogo.png",
                iden: "江西赣州赣南县",
                title: "出售赣南脐橙",
                time: "1小时前",
                text: "本合作社种植赣南脐橙50亩地，产量约20万斤，现出售，有需要的请联系电话18889878888。",
                read: "888",
                heart: "666",
                img: [
                    "img/new.png", "img/new.png", "img/new.png", "img/new.png"
                ]
            }, {
                link: "../../supplyInformation/supplyInformation.html",
                user: "赣南脐橙专业合作社",
                userImgUrl: "img/userLogo.png",
                iden: "江西赣州赣南县",
                title: "出售赣南脐橙",
                time: "1小时前",
                text: "本合作社种植赣南脐橙50亩地，产量约20万斤，现出售，有需要的请联系电话18889878888。",
                read: "888",
                heart: "666",
                img: [
                    "img/new.png", "img/new.png", "img/new.png", "img/new.png"
                ]
            }, {
                link: "../../supplyInformation/supplyInformation.html",
                user: "赣南脐橙专业合作社",
                userImgUrl: "img/userLogo.png",
                iden: "江西赣州赣南县",
                title: "出售赣南脐橙",
                time: "1小时前",
                text: "本合作社种植赣南脐橙50亩地，产量约20万斤，现出售，有需要的请联系电话18889878888。",
                read: "888",
                heart: "666",
                img: [
                    "img/new.png", "img/new.png", "img/new.png", "img/new.png"
                ]
            }, {
                link: "../../supplyInformation/supplyInformation.html",
                user: "赣南脐橙专业合作社",
                userImgUrl: "img/userLogo.png",
                iden: "江西赣州赣南县",
                title: "出售赣南脐橙",
                time: "1小时前",
                text: "本合作社种植赣南脐橙50亩地，产量约20万斤，现出售，有需要的请联系电话18889878888。",
                read: "888",
                heart: "666",
                img: [
                    "img/new.png", "img/new.png", "img/new.png", "img/new.png"
                ]
            }, ]

            var contentHTML = "";
            for (let i = 0; i < contentData.length; i++) {
                var imgList = ""
                var imgLength = contentData[i].img.length > 3 ? 3 : contentData[i].img.length
                for (let j = 0; j < imgLength; j++) {
                    imgList += `<li><img src="${contentData[i].img[j]}" alt=""></li>`
                }
                contentHTML += `<a href = ${contentData[i].link}><div class="supplyAndDemand-text">
                <div class="supplyAndDemand-text-title">
                    <div class="left">
                        <img src="${contentData[i].userImgUrl}" alt="">
                    </div>
                    <div class="center">
                        <p>${contentData[i].user}</p>
                        <p><span>${contentData[i].iden}</span></p>
                    </div>
                    <div class="right">
                        <p>${contentData[i].time}</p>
                    </div>
                </div>
                <div class="supplyAndDemand-text-content">
                    <p>${contentData[i].title}</p>
                    <p>${contentData[i].text}</p>
                </div>
                <div class="supplyAndDemand-text-img">
                    <ul>
                        ${imgList}
                    </ul>
                </div>
                <div class="count">
                    <p>
                        <span><img src="img/read.png" alt="">${contentData[i].read}人阅读</span>
                        <span><img src="img/heart.png" alt="">${contentData[i].heart}人阅读</span>
                    </p>
                </div>
            </div>
        </div></a>`
            }
            $("#contentHTML").html(contentHTML)
            if (myScroll) {
                myScroll.refresh();
            }
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