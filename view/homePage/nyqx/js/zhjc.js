$(function () {
    var addressObj = JSON.parse(sessionStorage.getItem("addressObj"));
    $('#start').mobiscroll().date({
        theme: "ios",
        mode: "scroller",
        display: "bottom",
        lang: "zh"
    });
    $('#end').mobiscroll().date({
        theme: "ios",
        mode: "scroller",
        display: "bottom",
        lang: "zh"
    });
    var menu = [{
        name: '干旱',
        code: 'gh',
        old: ['0', '1.0', '0.6', '1.2', '1.0', '0.4', '0.2'],
        date: ['12日', '13日', '14日', '15日', '16日', '17日', '18日'],
        new: ['1.0', '1.1', '0.2', '1.4', '1.6', '0.2', '0.4']
    }, {
        name: '低温',
        code: 'dw',
        old: ['1.2', '1.0', '0.6', '1.2', '1.0', '0.4', '0.2'],
        date: ['12日', '13日', '14日', '15日', '16日', '17日', '18日'],
        new: ['1.2', '1.0', '0.2', '1.14', '1.8', '0.6', '0.5']
    }, {
        name: '高温',
        code: 'gw',
        old: ['1.2', '1.0', '0.6', '1.2', '1.0', '0.4', '0.2'],
        date: ['12日', '13日', '14日', '15日', '16日', '17日', '18日'],
        new: ['1.2', '1.0', '0.6', '1.42', '1.0', '0.4', '0.2']
    }, {
        name: '暴雨',
        code: 'by',
        old: ['1.2', '1.0', '0.6', '1.2', '1.0', '0.4', '0.2'],
        date: ['12日', '13日', '14日', '15日', '16日', '17日', '18日'],
        new: ['1.2', '1.0', '0.6', '1.7', '1.0', '0.4', '0.2']
    }, {
        name: '大风',
        code: 'df',
        old: ['1.2', '1.0', '0.6', '1.2', '1.0', '0.4', '0.2'],
        date: ['12日', '13日', '14日', '15日', '16日', '17日', '18日'],
        new: ['1.2', '1.0', '0.2', '1.2', '1.0', '0.4', '0.2']
    }, {
        name: '雪灾',
        code: 'xz',
        old: ['1.2', '1.0', '0.6', '1.2', '1.0', '0.4', '0.2'],
        date: ['12日', '13日', '14日', '15日', '16日', '17日', '18日'],
        new: ['1.2', '1.0', '0.2', '1.2', '1.0', '0.6', '0.2']
    }, {
        name: '冰雹',
        code: 'bb',
        old: ['1.2', '1.0', '0.6', '1.2', '1.0', '0.4', '0.2'],
        date: ['12日', '13日', '14日', '15日', '16日', '17日', '18日'],
        new: ['1.2', '1.0', '0.2', '1.2', '1.9', '0.4', '0.2']
    }]
    var today = new Date().getTime() //当前时间戳
    var beforeToday = today - 7 * 24 * 60 * 60 * 1000 //七天前时间戳
    var zhjc = {
        init() {
            tool.loading('../../../../img/loading.gif')
            if (addressObj) {
                $("#ljb-mask").remove()
            }
            zhjc.dw()
            zhjc.listen()
        },
        listen() {
            $("#start").val(zhjc.timestampToTime(beforeToday))
            $("#end").val(zhjc.timestampToTime(today))
            //设置默认开始结束时间
            $(document).on("touchstart", ".xzTime", function () {
                $("#mask").show()
            })
            $(document).on("touchstart", "#mask-close", function () {
                $("#mask").hide()
            })
            $(document).on("touchstart", "#save", function () {
                $("#mask").hide()
                console.log($("#start").val())
                console.log($("#end").val())
                $(".xzTime").html(`${$("#start").val()}至${$("#end").val()}`)
            })
            $(document).on("touchstart", ".close", function () {
                $(".swiper2").hide()
            })
            ///定位
            $("#swiper1_wrapper").empty()
            $("#swiper2_wrapper").empty()
            menu.forEach((ele, index) => {
                if (index) {
                    $("#swiper1_wrapper").append(
                        `<div class="swiper-slide"><span>${ele.name}</span></div>`
                    )
                    $("#swiper2_wrapper").append(
                        `<div class="swiper-slide swiper-no-swiping">
                            <span class="close"><img src="../../../img/close-gray.png" alt="" srcset=""></span>
                            <div class='wrap'>
                                <div class="top">
                                    <p><img src="../../../img/dingwei.png" alt="" srcset=""><span class="address">正在定位中</span></p>
                                    <p><span>开始结束时间</span><img src="../../../img/arrow-right-blue.png" alt="" srcset=""><span class="xzTime">
                                    ${zhjc.timestampToTime(beforeToday)}至${zhjc.timestampToTime(today)}
                                    </span></p>
                                    <p>注：干旱指数小于0时为有干旱出现，数值越小干旱程度越重</p>
                                </div>
                                <div class="bottom" id="${ele.code}" style="width: 100%;height:50%;">
                                </div>
                            </div>
                        </div>`
                    )
                } else {
                    $("#swiper1_wrapper").append(
                        `<div class="swiper-slide selected"><span>${ele.name}</span></div>`
                    )
                    $("#swiper2_wrapper").append(
                        `<div class="swiper-slide swiper-no-swiping">
                            <span class="close"><img src="../../../img/close-gray.png" alt="" srcset=""></span>
                            <div class='wrap'>
                                <div class="top">
                                    <p><img src="../../../img/dingwei.png" alt="" srcset=""><span class="address">正在定位中</span></p>
                                    <p><span>开始结束时间</span><img src="../../../img/arrow-right-blue.png" alt="" srcset=""><span class="xzTime">
                                    ${zhjc.timestampToTime(beforeToday)}至${zhjc.timestampToTime(today)}
                                    </span></p>
                                    <p>注：干旱指数小于0时为有干旱出现，数值越小干旱程度越重</p>
                                </div>
                                <div class="bottom" id="${ele.code}" style="width: 100%;height:50%;">
                                </div>
                            </div>
                        </div>`
                    )
                }
                zhjc.echarts(ele)
                $("#ljb-mask").remove()
                if (addressObj) {
                    $(".address").html(addressObj.addressComponent.district + addressObj.addressComponent.township + addressObj.addressComponent.neighborhood)
                }
            })
        },
        dw() {
            console.log('///')
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
                        $(".address").html(result.addressComponent.district + result.addressComponent.township + result.addressComponent.neighborhood)
                        sessionStorage.setItem("addressObj", JSON.stringify(result));
                    } else {
                        zhjc.dw()
                    }
                });
            });
        },
        echarts(ele) {
            console.log(ele)
            var myChart = echarts.init(document.getElementById(ele.code));
            var menu = ele.date
            var ghzs = ele.old;
            var tqdb = ele.new;
            var allData = ghzs.concat(tqdb)
            var maxData = Math.max.apply(null, allData)
            var minData = Math.min.apply(null, allData)
            var endPercent = (10 / allData.length) * 100;
            option = {
                color: ['#4472C5', '#ED7C30'],
                xAxis: {
                    type: 'category',
                    data: menu,
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
                legend: {
                    data: ["干旱指数", "去年同期对比"],
                    x: 14,
                    // icon: 'circle',
                    // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                    textStyle: {
                        color: '#999999',
                        fontSize: 10
                    }
                },
                yAxis: {
                    type: 'value',
                    "axisTick": {
                        "show": false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#333',
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
                    bottom: '6%',
                    top: '24%',
                    containLabel: true
                },
                dataZoom: [ //给x轴设置滚动条  
                    {
                        start: 0, //默认为0  
                        end: endPercent,
                        type: 'slider',
                        show: false,
                        xAxisIndex: [0],
                        handleSize: 0, //滑动条的 左右2个滑动条的大小  
                        height: 4, //组件高度  
                        // left: 0, //左边的距离  
                        // right: 0, //右边的距离  
                        bottom: 26, //右边的距离  
                        handleColor: '#ddd', //h滑动图标的颜色  
                        handleStyle: {
                            borderColor: "#cacaca",
                            borderWidth: "1",
                            shadowBlur: 2,
                            background: "#ddd",
                            shadowColor: "#ddd",
                        },
                        fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            //给颜色设置渐变色 前面4个参数，给第一个设置1，第四个设置0 ，就是水平渐变  
                            //给第一个设置0，第四个设置1，就是垂直渐变  
                            offset: 0,
                            color: '#1eb5e5'
                        }, {
                            offset: 1,
                            color: '#5ccbb1'
                        }]),
                        backgroundColor: '#ddd', //两边未选中的滑动条区域的颜色  
                        showDataShadow: false, //是否显示数据阴影 默认auto  
                        showDetail: false, //即拖拽时候是否显示详细数值信息 默认true  
                        handleIcon: 'M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z',
                        filterMode: 'filter'
                    },
                    //下面这个属性是里面拖到  
                    {
                        type: 'inside',
                        show: true,
                        xAxisIndex: [0],
                        start: 0, //默认为1
                        end: 50
                    },
                ],
                calculable: true,
                series: [{
                    name: '干旱指数',
                    data: ghzs,
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: '#32C380',
                            lineStyle: {
                                color: '#32C380'
                            }
                        }
                    },
                }, {
                    name: '去年同期对比',
                    data: tqdb,
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: '#33B7EF',
                            lineStyle: {
                                color: '#33B7EF'
                            }
                        }
                    },
                }]
            };
            myChart.setOption(option);
        },
        timestampToTime: function (timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '.';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            return Y + M + D;
        }
    }
    zhjc.init()
})

$(function () {
    function setCurrentSlide(ele, index) {
        $(".swiper2").show()
        $(".swiper1 .swiper-slide").removeClass("selected");
        ele.addClass("selected");
        //swiper1.initialSlide=index;
    }

    var swiper1 = new Swiper('.swiper1', {
        slidesPerView: 7,
        paginationClickable: true,
        freeMode: true,
        loop: false, //是否可循环
        onTab: function (swiper) {
            var n = swiper1.clickedIndex;
        }
    });
    swiper1.slides.each(function (index, val) {
        var ele = $(this);
        ele.on("click", function () {
            setCurrentSlide(ele, index);
            swiper2.slideTo(index, 500, false);
            //mySwiper.initialSlide=index;
        });
    });

    var swiper2 = new Swiper('.swiper2', {
        direction: 'horizontal',
        loop: false,
        // effect : 'fade',//淡入
        // effect : 'cube',//方块
        effect: 'coverflow', //3D流
        // effect: 'flip', //3D翻转
        autoHeight: true,
        onSlideChangeEnd: function (swiper) {
            var n = swiper.activeIndex;
            setCurrentSlide($(".swiper1 .swiper-slide").eq(n), n);
            swiper1.slideTo(n, 500, false);
        }
    });
});