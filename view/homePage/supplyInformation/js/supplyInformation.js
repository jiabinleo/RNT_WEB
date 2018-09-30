$(function () {
    var diseaseAndInsectBank = {
        init: function () {
            diseaseAndInsectBank.listen()
        },
        listen: function () {
            var contentData = {
                link: "../../supplyInformation/supplyInformation.html",
                user: "黔东富农茶叶农民合作社",
                userImgUrl: "img/userLogo.png",
                iden: "贵州省铜仁市",
                title: "出售同仁茶叶",
                time: "1小时前",
                text: "铜仁目前茶叶产量位列贵州第二，山水的涵养和生态的滋润，使梵净山茶各项理化指标均优于中国国家标准和贵州省地方标准。专业合作社茶园面积1300亩，长期供应茶叶，品种有绿茶，红茶，价格180-280/斤，欢迎来电联系购买，详询贵州农经网供求服务热线：96888或15180812582。",
                read: "888",
                heart: "666",
                img: [
                    "img/new1.png", "img/new2.png", "img/new3.png", "img/new4.png"
                ]
            }
            var imgList = ""
            for (let j = 0; j < contentData.img.length; j++) {
                imgList += `<li><img src="${contentData.img[j]}" alt=""></li>`
            }
            contentHTML =
                `<div class="supplyAndDemand-text">
                <div class="supplyAndDemand-text-title">
                    <div class="left">
                        <img src="${contentData.userImgUrl}" alt="">
                    </div>
                    <div class="center">
                        <p>${contentData.user}</p>
                        <p><span>${contentData.iden}</span></p>
                    </div>
                    <div class="right">
                        <p>${contentData.time}</p>
                    </div>
                </div>
                <div class="supplyAndDemand-text-content">
                    <p>${contentData.title}</p>
                    <p>${contentData.text}</p>
                </div>
                <div class="supplyAndDemand-text-img">
                    <ul>
                        ${imgList}
                    </ul>
                </div>
            </div>
            <div class="bottom">
                <div><img src="img/gyf.png"/>联系供应方</div>
                <div><img src="img/kf.png"/>联系客服</div>
            </div>`
            $("#contentHTML").html(contentHTML)
        }
    }
    diseaseAndInsectBank.init()
})