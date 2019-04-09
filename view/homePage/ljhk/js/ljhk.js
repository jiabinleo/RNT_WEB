(function () {
    var Imm = {
        init: function () {
            // var z = 1;
            // var s = 100;
            // var times;
            // $(".ImWrap").on("click",".Impre",function(){
            //     times = setInterval(function(){
            //         z--
            //         s--
            //         $("#ImmSection").css("marginLeft",-s+"%")
            //         if (s<=0 || z==1) {
            //             clearInterval(times)
            //         }
            //     },1)

            // })
            // $(".ImWrap").on("click",".ImNext",function(){
            //     times = setInterval(function(){
            //         z++
            //         s++
            //         $("#ImmSection").css("marginLeft",-s+"%")
            //         if (s>=200 || z==1) {
            //             clearInterval(times)
            //         }
            //     },1)
            // })
            $(".playButton").on("click", function () {
                console.log("ppp")
                $("#insure_wrap").css("display", "block")
                $("#insure_inner").css("display", "block")
            })
            $("#insureClose").on("click", function () {
                $("#insure_wrap").css("display", "none")
                $("#insure_inner").css("display", "none")
            })
            // $(".insure_play_bottom").on("click",function(){
            //     $("#insure_inner").css("display","none")
            //     $("#insure_inner2").css("display","block")
            // })
            // $("#insureClose2").on("click",function(){
            //     $("#insure_wrap").css("display","block")
            //     $("#insure_inner").css("display","block")
            //     $("#insure_inner2").css("display","none")
            //     for(var i=0;i<6;i++){
            //         $(".mima input").eq(i).val("")
            //     }
            // })

            // var pwdarr = [];
            // var pwdarrs = ["1", "2", "3", "4", "5", "6"]
            // $(".mima").on("click", function () {
            //     $(".mima input").eq(0).focus()
            //     pwdarr = [];
            // })
            // var pwss = true;
            // $(".mima > input").on("input", function () {
            //     $(this).val($(this).val().trim().substr(0, 1))
            //     pwdarr.push($(this).val().trim().substr(0, 1))
            //     if ($(this).next().length) {
            //         $(this).next().focus()
            //     } else {
            //         if (pwdarr.length = 6) {
            //             setTimeout(() => {
            //                 window.location.href = "/view/playsuc/playsuc.html";
            //             }, 1000);
            //         }
            //     }

            // });
            var data = [
                {
                time: "2018.1",
                sumPrice: "30000.00",
                lastTime: "12月18日",
                list: [{
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    }
                ]
            }, {
                time: "2018.2",
                sumPrice: "30000.00",
                lastTime: "12月18日",
                list: [{
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    }
                ]
            }, {
                time: "2018.3",
                sumPrice: "30000.00",
                lastTime: "12月18日",
                list: [{
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    }
                ]
            }, {
                time: "2018.4",
                sumPrice: "30000.00",
                lastTime: "12月18日",
                list: [{
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    }
                ]
            }, {
                time: "2018.5",
                sumPrice: "30000.00",
                lastTime: "12月18日",
                list: [{
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    }
                ]
            }, {
                time: "2018.6",
                sumPrice: "30000.00",
                lastTime: "12月18日",
                list: [{
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    }
                ]
            }, {
                time: "2018.7",
                sumPrice: "30000.00",
                lastTime: "12月18日",
                list: [{
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },

                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    }
                ]
            }, {
                time: "2018.8",
                sumPrice: "30000.00",
                lastTime: "12月18日",
                list: [

                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    }
                ]
            }, {
                time: "2018.9",
                sumPrice: "30000.00",
                lastTime: "12月18日",
                list: [

                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    }
                ]
            }, {
                time: "2018.10",
                sumPrice: "30000.00",
                lastTime: "12月18日",
                list: [{
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    }
                ]
            }, {
                time: "2018.11",
                sumPrice: "30000.00",
                lastTime: "12月18日",
                list: [{
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    },
                    {
                        now: 1,
                        sum: 12,
                        sumPrice: 5000,
                        nowPrice: 4000,
                        time: "2017-10-06"
                    }
                ]
            }, {
                time: "2018.12",
                sumPrice: "30000.00",
                lastTime: "12月18日",
                list: [{
                    now: 1,
                    sum: 12,
                    sumPrice: 5000,
                    nowPrice: 4000,
                    time: "2017-10-06"
                }]
            }]
            // tHtml
            var x = 5
            Imm.tHtml(data[x])
            $(document).on("click", ".topLeft", function () {
                if (x <= 1) {
                    return
                }
                x -= 1
                Imm.tHtml(data[x])
            })
            $(document).on("click", ".topRight", function () {
                if (x >= 12 - 2) {
                    return
                }
                x += 1
                Imm.tHtml(data[x])
            })
        },
        tHtml: function (data) {
            str = data.time.split(".")
            $("#topCenter").html(`${str[0]}年${str[1]}月`)
            $("#topLeft").html(`${str[1]-1}月`)
            $("#topRight").html(`${str[1]-0+1}月`)
            $("#sumPrice").html(data.sumPrice)
            $("#lastTime").html(`最后还款日${data.lastTime}`)
            $("#lisSum").html(`入账金额${data.list.length}笔`)
            var list = data.list
            var listHTML = "";
            for (let i = 0; i < list.length; i++) {
                listHTML +=
                    `<li>
                        <div class="bottomLeft">
                            <p>[${list[i].now}/${list[i].sum}]借款￥${list[i].sumPrice}</p>
                            <p>${list[i].time}</p>
                        </div>
                        <div class="bottomRight">
                        ${list[i].nowPrice}
                        </div>
                    </li>`
            }
            $("#listHTML").html(listHTML)
        }
    }
    Imm.init()
})()