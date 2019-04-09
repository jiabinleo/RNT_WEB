$(function () {
    var addressObj = JSON.parse(sessionStorage.getItem("addressObj"));
    var dlyb = {
        init() {
            dlyb.listen()
        },
        listen() {
            if (addressObj) {
                dlyb.getMsg(addressObj)
            }
            dlyb.dw()
        },
        dw() {
            var map = new AMap.Map('container', {
                resizeEnable: true
            });
            AMap.plugin('AMap.Geolocation', function () {
                var geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,
                    timeout: 10000,
                    buttonPosition: 'RB',
                    buttonOffset: new AMap.Pixel(10, 20),
                    zoomToAccuracy: true,
                });
                map.addControl(geolocation);
                geolocation.getCurrentPosition(function (status, result) {
                    if (status == 'complete') {
                        dlyb.getMsg(result)
                        sessionStorage.setItem("addressObj", JSON.stringify(result));
                    } else {
                        dlyb.dw()
                    }
                });
            });
        },
        echarts(obj) {
            console.log(obj.data.hourlyRain)
            var myChart = echarts.init(document.getElementById('main'));
            var xData = [];
            var yData = [];
            obj.data.hourlyRain.forEach((ele, index) => {
                if (index < 3) {
                    yData.push(ele.value)
                }
            });
            xData = ['现在', '1小时', '2小时']
            var maxData = Math.max.apply(null, yData)
            var minData = Math.min.apply(null, yData)
            var img1 = '../../../img/dingwei.png'
            option = {
                xAxis: {
                    type: 'category',
                    data: xData,
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#d3d3d3'
                        }
                    },
                    axisLabel: {
                        color: '#333333'
                    },
                    "axisTick": {
                        "show": false
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#ccc',
                            // width: '12',
                            // height: '12',
                            // backgroundColor: {
                            //     image: img1
                            // }
                        }
                    },

                    splitNumber: 2,
                    min: 0,
                    max: (maxData + (maxData + minData) / 2).toFixed(2)
                },
                grid: {
                    left: '2%',
                    right: '6%',
                    bottom: '0%',
                    top: '10%',
                    containLabel: true
                },
                series: [{
                    data: yData,
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: '#27A7E7',
                            lineStyle: {
                                color: '#27A7E7'
                            }
                        }
                    },
                }]
            };
            myChart.setOption(option);
        },
        getMsg(obj) {
            $("#address").html(obj.addressComponent.district + obj.addressComponent.township + obj.addressComponent.neighborhood)
            $.ajax({
                url: localhost50010 + `/weather/forecast?longitude=${obj.position.lng}&latitude=${obj.position.lat}`,
                type: "GET",
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function (result) {
                    if (result.code === "0") {
                        dlyb.echarts(result)
                    }
                },
                error: function () {

                }
            })
        }
    }
    dlyb.init()
})