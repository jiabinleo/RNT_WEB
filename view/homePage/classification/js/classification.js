$(function () {
    var diseaseAndInsectBank = {
        init: function () {
            diseaseAndInsectBank.listen()
        },
        listen: function () {
            var fruits = [{
                    "name": "不限",
                    "list": [{
                        "name": "不限",
                        "list2": ["不限"]
                    }]
                },
                {
                    "name": "水果",
                    "list": [{
                            "name": "不限",
                            "list2": ["不限"]
                        },
                        {
                            "name": "果树类",
                            "list2": ["不限", "橙子", "柑橘", "沙糖桔", "金桔", "桃子", "苹果", "香蕉", "其他"]
                        },
                        {
                            "name": "浆果类",
                            "list2": ["不限", "葡萄", "桑葚", "其他"]
                        }
                    ]
                },
                {
                    "name": "蔬菜",
                    "list": [{
                            "name": "不限",
                            "list2": ["不限"]
                        }, {
                            "name": "叶菜类",
                            "list2": ["不限", "白菜", "菠菜", "油菜", "卷心菜", "苋菜", "韭菜", "蒿菜", "香菜", "芥菜", "芥兰", "茴香", "其他"]
                        },
                        {
                            "name": "根茎类",
                            "list2": ["不限","萝卜", "马铃薯", "藕", "甘薯", "山药", "芋头", "茭白", "苤蓝", "慈姑", "洋葱", "生姜", "其他"]
                        },
                        {
                            "name": "瓜类",
                            "list2": ["不限", "冬瓜", "南瓜", "西葫芦", "丝瓜", "黄瓜", "茄子", "西红柿", "苦瓜", "辣椒", "玉米", "小瓜", "其他"]
                        }
                    ]
                },
                {
                    "name": "梁作",
                    "list": [{
                            "name": "不限",
                            "list2": ["不限"]
                        }, {
                            "name": "梁作4",
                            "list2": ["不限4", "橙子", "柑橘", "沙糖桔", "金桔", "其他", "不限", "橙子", "柑橘", "沙糖桔", "金桔", "其他"]
                        },
                        {
                            "name": "梁作44",
                            "list2": ["不限44", "橙子", "柑橘", "沙糖桔", "金桔", "其他", "不限", "橙子", "柑橘", "沙糖桔", "金桔", "其他"]
                        }
                    ]
                },
                {
                    "name": "茶叶",
                    "list": [{
                            "name": "不限",
                            "list2": ["不限"]
                        }, {
                            "name": "绿茶",
                            "list2": ["不限", "龙井"]
                        }, {
                            "name": "红茶",
                            "list2": ["不限", "红茶"]
                        }, {
                            "name": "黄茶",
                            "list2": ["不限", "黄茶"]
                        }, {
                            "name": "青茶",
                            "list2": ["不限", "青茶"]
                        }, {
                            "name": "黑茶",
                            "list2": ["不限", "黑茶"]
                        }

                    ]
                },
                {
                    "name": "中草药",
                    "list": [{
                            "name": "不限",
                            "list2": ["不限"]
                        }, {
                            "name": "中草药6",
                            "list2": ["不限6", "橙子", "柑橘", "沙糖桔", "金桔", "其他", "不限", "橙子", "柑橘", "沙糖桔", "金桔", "其他"]
                        },
                        {
                            "name": "中草药66",
                            "list2": ["不限66", "橙子", "柑橘", "沙糖桔", "金桔", "其他", "不限", "橙子", "柑橘", "沙糖桔", "金桔", "其他"]
                        }
                    ]
                },
                {
                    "name": "坚果干果",
                    "list": [{
                            "name": "不限",
                            "list2": ["不限"]
                        }, {
                            "name": "坚果干果1",
                            "list2": ["不限", "橙子", "柑橘", "沙糖桔", "金桔", "其他", "不限", "橙子", "柑橘", "沙糖桔", "金桔", "其他"]
                        },
                        {
                            "name": "坚果干果2",
                            "list2": ["不限", "橙子", "柑橘", "沙糖桔", "金桔", "其他", "不限", "橙子", "柑橘", "沙糖桔", "金桔", "其他", "不限", "橙子", "柑橘", "沙糖桔", "金桔", "其他", "不限", "橙子", "柑橘", "沙糖桔", "金桔", "其他"]
                        }
                    ]
                },
                {
                    "name": "其他",
                    "list": [{
                            "name": "不限",
                            "list2": ["不限"]
                        }, {
                            "name": "其他1",
                            "list2": ["不限", "橙子", "柑橘", "沙糖桔", "金桔", "其他", "不限", "橙子", "柑橘", "沙糖桔", "金桔", "其他"]
                        },
                        {
                            "name": "其他2",
                            "list2": ["不限", "橙子", "柑橘", "沙糖桔", "金桔", "其他", "不限", "橙子", "柑橘", "沙糖桔", "金桔", "其他"]
                        }
                    ]
                }
            ]

            address(fruits[0].list);

            function address(data) {
                $(".AreaCenter ul").html('');
                $.each(data, function (i, v) {
                    $(".AreaCenter ul").append('<li data-id=' + i + '>' + v.name + '</li>');
                });
                $('.AreaCenter ul li').on('click', {
                    data: data
                }, Areas)
                $(".AreaCenter ul li").eq(0).trigger("click");
            }

            function Prompt() {
                var c = $(".AreaCenter .active").text() + $(this).text();
                localStorage.setItem("fenlei", c)
                window.location.href = "../supplyAndDemandInner/supplyAndDemandInner.html"
            }

            function Areas(data) {
                $('.AreaCenter ul li').removeClass('active')
                $(this).addClass('active');
                var data = data.data.data
                $(".AreaCenter").css({
                    "width": "30%"
                });
                $(".AreaRight").show();
                var id = $(this).attr('data-id');
                $(".AreaRight ul").html('');
                $.each(data[id].list2, function (index, item) {
                    $(".AreaRight ul").append('<li data-cid=' + index + '>' + item + '</li>')
                })
                $(".AreaRight ul li").on('click', Prompt)
            }

            $(document).on("click", ".AreaLeft ul li", function () {
                $(".AreaLeft ul li").removeClass('active')
                $(this).addClass('active');
                for (let i = 0; i < fruits.length; i++) {
                    if ($(this).index() == i) {
                        address(fruits[i].list);
                        $(".AreaCenter").css({
                            "width": "30%"
                        });
                    }
                }
            })

            var ulListHTML = "";
            for (var i = 0; i < fruits.length; i++) {
                if (i === 0) {
                    ulListHTML += `<li class="active">${fruits[i].name}</li>`
                } else {
                    ulListHTML += `<li>${fruits[i].name}</li>`
                }
            }
            $("#ulList").html(ulListHTML)
        }
    }
    diseaseAndInsectBank.init()
})