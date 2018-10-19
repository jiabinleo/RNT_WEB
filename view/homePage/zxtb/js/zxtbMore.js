$(function () {
    var pageNum = 1,
        pageSize = 10,
        total = null;
    var zxtb = {
        init: function () {
            zxtb.produce(pageNum, pageSize)
            zxtb.listen()
        },
        listen: function () {
            setTimeout(() => {
                var minY = null;
                myScroll.on('scrollStart', function () {
                    minY = this.y;
                    $("#loadingTxt").html("加载更多..")
                });

                myScroll.on('scroll', function () {

                    minY = minY < this.y ? minY : this.y;
                });

                myScroll.on('scrollEnd', function () {
                    minY = minY < this.y ? minY : this.y;
                    setTimeout(() => {
                        $("#loadingTxt").html("")
                    }, 3000);
                    if (this.y == this.maxScrollY) {
                        pageNum++
                        zxtb.produce(pageNum, pageSize)
                    }
                });
            }, 300);


            $(document).on("click", ".detail", function () {
                console.log($(this).attr("data-id"))
                window.open("../maize/maize.html?id=" + $(this).attr("data-id"), "_self");
            })
        },
        produce: function (pageNum, pageSize) {
            $.ajax({
                url: localhost40000 + "/insurance/getPage?pageNum=" + pageNum + "&pageSize=" + pageSize,
                type: "get",
                success: function (data) {
                    data = JSON.parse(data)
                    if (data.code === "0") {
                        var listHTML = "";
                        var list = data.data.page.rows
                        total += list.length
                        if (myScroll) {
                            myScroll.refresh();
                        }
                        console.log(total)
                        console.log(data.data.page.total)
                        if (total > data.data.page.total) {
                            $("#loadingTxt").html("没有新数据")
                            return
                        }
                        console.log(list[0])
                        for (let i = 0; i < list.length; i++) {
                            listHTML +=
                                `<div data-id="${list[i].id}" class="detail insurance">
                                    <div class="insurance_img">
                                        <img src="${imgUrl+list[i].cover}" alt="${list[i].insuranceName}">
                                    </div>
                                    <div class="insurance_title">
                                        <h3>${list[i].insuranceName}
                                            <span></span>
                                        </h3>
                                        <div class="insurance_title_p">
                                            <p>${list[i].brief}</p>
                                            <div class="insurance_title_span">
                                                <span id="span01">${list[i].cost}</span>
                                                <span id="span02">元</span>
                                                <span id="span03">/</span>
                                                <span id="span04">亩</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>`

                        }
                        $("#produce").append(
                            listHTML
                        )
                        if (myScroll) {
                            myScroll.refresh();
                        }
                    }
                },
                error: function (err) {}
            });


        }
    }
    zxtb.init()
})