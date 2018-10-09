var enterprise = {
    init: function () {

        enterprise.listen()
    },
    listen: function () {
        enterData = {
            text: "美国陶氏益农公司是领先世界的五大农药跨国公司之一，是美国第一大化学公司－陶氏化学的全资子公司。总部座落于美国印第安纳州，印第安纳波里斯市。目前陶氏益农大中华地区年营业额已达到1亿美金左右。陶氏益农将病虫草害治理，种子及生物技术产品的研发和“人元素”战略完美融合，以不断创新的技术和高品质的农用产品来满足世界人口不断增长的物质和精神需要，极力为人类营造更安全、更健康和更优质的生活。陶氏益农拥有种类丰富的农作物保护产品，包括除草剂、杀虫剂、杀菌剂和熏蒸剂等，以及城市卫生用药。",
            banner: ["img/banner.png", "img/banner.png", "img/banner.png", "img/banner.png", "img/banner.png"],
            comment: [{
                logoImgUrl: "img/user.png",
                userName: "悦农通",
                type: "农业金融专家",
                address: "深圳市南山区",
                text: "还挺不错还挺不错还挺不错还挺不错还挺不错",
                share: "1",
                heart: "2",
                msg: "2",
                reply: [{
                    name: "某某某热心网友",
                    text: "确实还阔仪!"
                }, {
                    name: "某某某热心网友",
                    text: "确实还阔仪!"
                }, {
                    name: "某某某热心网友",
                    text: "确实还阔仪!"
                }, {
                    name: "某某某热心网友",
                    text: "确实还阔仪!"
                }, {
                    name: "某某某热心网友",
                    text: "确实还阔仪!"
                }]
            }, {
                logoImgUrl: "img/user.png",
                userName: "悦农通",
                type: "农业金融专家",
                address: "深圳市南山区",
                text: "这家公司感觉还挺不错的！大家可以了解一下哈！",
                share: "192",
                heart: "168",
                msg: "2",
                reply: [{
                    name: "某某某热心网友",
                    text: "确实还阔仪!"
                }, {
                    name: "某某某热心网友",
                    text: "确实还阔仪!"
                }]
            }, {
                logoImgUrl: "img/user.png",
                userName: "悦农通",
                type: "农业金融专家",
                address: "深圳市南山区",
                text: "这家公司感觉还挺不错的！大家可以了解一下哈！",
                share: "192",
                heart: "168",
                msg: "2",
                reply: [{
                    name: "某某某热心网友",
                    text: "确实还阔仪!"
                }, {
                    name: "某某某热心网友",
                    text: "确实还阔仪!"
                }]
            }, {
                logoImgUrl: "img/user.png",
                userName: "悦农通",
                type: "农业金融专家",
                address: "深圳市南山区",
                text: "这家公司感觉还挺不错的！大家可以了解一下哈！",
                share: "192",
                heart: "168",
                msg: "2",
                reply: [{
                    name: "某某某热心网友",
                    text: "确实还阔仪!"
                }, {
                    name: "某某某热心网友",
                    text: "确实还阔仪!"
                }]
            }, {
                logoImgUrl: "img/user.png",
                userName: "悦农通",
                type: "农业金融专家",
                address: "深圳市南山区",
                text: "这家公司感觉还挺不错的！大家可以了解一下哈！",
                share: "192",
                heart: "168",
                msg: "2",
                reply: [{
                    name: "某某某热心网友",
                    text: "确实还阔仪!"
                }, {
                    name: "某某某热心网友",
                    text: "确实还阔仪!"
                }]
            }, {
                logoImgUrl: "img/user.png",
                userName: "悦农通",
                type: "农业金融专家",
                address: "深圳市南山区",
                text: "这家公司感觉还挺不错的！大家可以了解一下哈！",
                share: "192",
                heart: "168",
                msg: "2",
                reply: [{
                    name: "某某某热心网友",
                    text: "确实还阔仪!"
                }, {
                    name: "某某某热心网友",
                    text: "确实还阔仪!"
                }]
            }, {
                logoImgUrl: "img/user.png",
                userName: "悦农通",
                type: "农业金融专家",
                address: "深圳市南山区",
                text: "这家公司感觉还挺不错的！大家可以了解一下哈！",
                share: "192",
                heart: "168",
                msg: "2",
                reply: [{
                    name: "某某某热心网友",
                    text: "确实还阔仪!"
                }, {
                    name: "某某某热心网友",
                    text: "确实还阔仪!"
                }]
            }]
        }
        var bannerHTML = "";
        for (let i = 0; i < enterData.banner.length; i++) {
            bannerHTML +=
                `<div class="swiper-slide">
                    <a href="#">
                        <img src="${enterData.banner[i]}" alt="banner">
                        <div class="banner-msg">
                            <span>${i+1}/${enterData.banner.length}</span>
                        </div>
                    </a>
                </div>`
        }
        $("#bannerHTML").html(bannerHTML)
        $("#detialHTML").html(enterData.text)

        var commentHTML = "";
        var replyHTML = "";
        for (let i = 0; i < enterData.comment.length; i++) {
            replyHTML = ""
            for (let j = 0; j < enterData.comment[i].reply.length; j++) {
                replyHTML +=
                    `<li>
                        <span class="name">${enterData.comment[i].reply[j].name}:</span>
                        <span class="reply">${enterData.comment[i].reply[j].text}!</span>
                    </li>`
            }
            commentHTML +=
                `<li>
                    <div class="title">
                        <div class="userLogo">
                            <img src="${enterData.comment[i].logoImgUrl}" alt="">
                        </div>
                        <div class="userMsg">
                            <p>${enterData.comment[i].userName}（${enterData.comment[i].type}）</p>
                            <p><span>
                                ${enterData.comment[i].address}
                                </span></p>
                        </div>
                    </div>
                    <div class="text">
                        <p>${enterData.comment[i].text}</p>
                    </div>
                    <div class="count">
                        <p>
                            <img src="img/share.png" alt=""><span>${enterData.comment[i].share}</span>
                            <img src="img/heart.png" alt=""><span>${enterData.comment[i].heart}</span>
                            <img src="img/msg.png" alt=""><span>${enterData.comment[i].msg}</span>
                        </p>
                        <p>
                            查看所有评论${enterData.comment[i].reply.length}条
                        </p>
                    </div>
                    <ul>
                        ${replyHTML}
                    </ul>
                </li>`
        }
        $("#commentHTML").html(commentHTML)
    }
}
enterprise.init()

var mySwiper = new Swiper('.swiper-container', {
    autoplay: 3000,
    loop: true,
    speed: 1000,
    // slidesPerView: 'auto',
    pagination: '.swiper-pagination',
    autoplayDisableOnInteraction: false,
    centeredSlides: true
})