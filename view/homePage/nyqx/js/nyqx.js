$(function () {
    var nyqx = {
        init: function () {
            tool.loading('../../../img/weather.gif')
            var addressObj = JSON.parse(sessionStorage.getItem("addressObj"));
            if (addressObj) {
                nyqx.getMsg(addressObj)
            } else {
                nyqx.d()
            }
        },
        d: function () {
            var _this = this
            try {
                loc = "定位中..."
                var map = new AMap.Map('container', {
                    resizeEnable: true
                });
                var options = {
                    enableHighAccuracy: true, // 是否使用高精度定位，默认:true
                    timeout: 10000, // 超过10秒后停止定位，默认：无穷大
                    maximumAge: 0, // 定位结果缓存0毫秒，默认：0
                    convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                }
                AMap.plugin(["AMap.Geolocation"], function () {
                    var geolocation = new AMap.Geolocation(options);
                    map.addControl(geolocation);
                    geolocation.getCurrentPosition()
                    AMap.event.addListener(geolocation, 'complete', onComplete); // 返回定位信息
                    AMap.event.addListener(geolocation, 'error', onError); // 返回定位出错信息
                });

                function onComplete(obj) {
                    loc = obj.addressComponent.city + obj.addressComponent.district + obj.addressComponent.township
                    nyqx.getMsg(obj)
                    sessionStorage.setItem("addressObj", JSON.stringify(obj));
                }

                function onError(error) {
                    _this.d()
                }
            } catch (error) {
                setTimeout(() => {
                    nyqx.d()
                }, 3000);
            }
        },
        getMsg: function (obj) {
            tool.tip('数据获取成功')
            $.ajax({
                url: localhost50010 + '/weather/forecast?longitude=' + obj.position.lng + '&latitude=' + obj.position.lat,
                type: "GET",
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (result) {
                    if (result.code === "0") {
                        $("#city").html(obj.addressComponent.city)
                        $("#weather").html(result.data.weather)
                        $("#ymd").html('更新于' + result.data.ymd + ':00')
                        $("#temp").html(result.data.temp + '℃')
                        $("#humidity").html('相对湿度：' + result.data.humidity + '%')
                        $("#windDirection").html(result.data.windDirection)
                        $("#rain").html('1小时降雨：' + result.data.rain + '毫米')
                        $("#visibility").html('能见度：' + result.data.visibility + '%')
                        $("#description").html(result.data.description)
                        var date, day;
                        $("#forecast").empty()
                        result.data.forecast.forEach((ele, index) => {
                            date = ele.date.split('-').join('/')
                            day = new Date(date).getDay()
                            if (index < 2)
                                switch (index) {
                                    case 0:
                                        date = "今天"
                                        break;
                                    case 1:
                                        date = "明天"
                                        break;
                                    default:
                                        break;
                                }
                            else
                                switch (day) {
                                    case 0:
                                        date = "星期日"
                                        break;
                                    case 1:
                                        date = "星期一"
                                        break;
                                    case 2:
                                        date = "星期二"
                                        break;
                                    case 3:
                                        date = "星期三"
                                        break;
                                    case 4:
                                        date = "星期四"
                                        break;
                                    case 5:
                                        date = "星期五"
                                        break;
                                    case 6:
                                        date = "星期六"
                                        break;
                                    default:
                                        break;
                                }
                            $("#forecast").append(
                                '<li>' +
                                '<p>' + date + '</p>' +
                                '<img src="../../../img/weather/' + ele.skycon + '.png" alt="">' +
                                '<p>' + ele.tempMin + '~' + ele.tempMax + '℃</p>' +
                                '</li>'
                            )
                        });
                        $("#ljb-mask").remove()
                        if (myScroll)
                            myScroll.refresh();
                        $("#ljb-mask").empty()
                    } else {
                        setTimeout(function () {
                            nyqx.init()
                        }, 5000);
                    }
                },
                error: function () {
                    setTimeout(function () {
                        nyqx.init()
                    }, 5000);
                }
            })
        }
    }
    nyqx.init()
})