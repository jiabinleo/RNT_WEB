$(function () {
    var typeId = tool.getRequest().ids.split('_')
    var detail = {
        init() {
            detail.listen()
        },
        listen() {
            var _this = this
            if (typeId[0] == "bch") {
                $.ajax({
                    url: localhost50002 + '/pests/loadSinglePests',
                    type: "POST",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    data: JSON.stringify({
                        id: typeId[1]
                    }),
                    success: function (result) {
                        _this.titleName(result.data.pestsName)
                        _this.banner(result.data.imgLargePath)
                        _this.list(result.data)
                    }
                })
            } else if (typeId[0] == "jsfw") {
                $.ajax({
                    url: localhost50002 + '/plantserver/loadSinglePlantServer',
                    type: "POST",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    data: JSON.stringify({
                        id: typeId[1]
                    }),
                    success: function (result) {
                        console.log(result)
                        _this.titleName(result.data.title)
                        _this.banner(result.data.imgLargePath)
                        _this.content(result.data)
                    }
                })
            }

        },
        titleName(pestsName) {
            console.log(pestsName)
            $("#pestsName").html(pestsName)
        },
        banner(imgLargePath) {
            var imgArr = imgLargePath.split(',')
            imgArr.forEach((ele, index) => {
                $("#swiper").append(
                    `<div class="swiper-slide">
                        <img src="${imgUrl+ele}" alt="banner">
                        <div class="banner-msg">
                            <span>${index+1}/3</span>
                        </div>
                    </div>`
                )
            });
            detail.swiper()
        },
        list(msg) {
            $(".content-text-top").html(
                `<li>
                    <span class="left">虫害名称：</span>
                    <span class="right">${msg.pestsName}</span>
                </li>
                <li>
                    <span class="left">中文别名：</span>
                    <span class="right">${msg.pestsAlias}</span>
                </li>`
            )
            $(".content-text-bottom").html(
                `<li>
                    <p>分布区域：</p>
                    <p>${msg.distributionArea}</p>
                </li>
                <li>
                    <p>形态特征：</p>
                    <p>${msg.characteristic}</p>
                </li>
                <li>
                    <p>为害作物：</p>
                    <p>${msg.plant}</p>
                </li>
                <li>
                    <p>为害症状：</p>
                    <p>${msg.symptom}</p>
                </li>
                <li>
                    <p>为发病特点：</p>
                    <p>${msg.disease}</p>
                </li>
                <li>
                    <p>防治方法：</p>
                    <p>${msg.controlMethods}</p>
                </li>`
            )
            if (myScroll) {
                myScroll.refresh();
            }
        },
        content(data) {
            console.log(data.contents)
            $(".jsfwContent").html(`<p>${data.contents}</p>`)
            if (myScroll) {
                myScroll.refresh();
            }
        },
        swiper() {
            var mySwiper = new Swiper('.swiper-container', {
                autoplay: 3000,
                loop: true,
                speed: 1000,
                // slidesPerView: 'auto',
                pagination: '.swiper-pagination',
                autoplayDisableOnInteraction: false,
                centeredSlides: true
            })
        }
    }
    detail.init()
})