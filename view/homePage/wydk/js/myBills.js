var pageNum = 1,
    pageSize = 6,
    total = null,
    status = 1,
    myBills = {
        init: function () {
            myBills.newList(pageNum, pageSize)
            myBills.listen()
        },
        listen: function () {
            $(document).on("touchstart", "menu > div", function () {
                $(this).addClass("active").siblings().removeClass("active")
                status = $(this).attr("data-id")
                pageNum = 1;
                total = null;
                $("#loadingTxt").html("");
                $("#myBillsHTML").html("")
                if (myScroll) {
                    myScroll.refresh();
                }
                myBills.newList(pageNum, pageSize, status)
            })
            setTimeout(() => {
                var minY = null;
                myScroll.on('scrollStart', function () {
                    minY = this.y;
                    $("#loadingTxt").html("加载更多...")
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
                        myBills.newList(pageNum, pageSize, status)
                    }
                });
            }, 300);
            $(document).on("click", "#myBillsHTML > li", function () {
                if ($(this).attr("status") === "1") {
                    window.open("../dksq/dksqqr.html?id=" + $(this).attr("data-id"), "_self")
                } else {
                    window.open("myBillsDetail.html?id=" + $(this).attr("data-id"), "_self")
                }

            })
        },
        status: function (status) {
            ss = "";
            switch (status) {

                case "1":
                    ss = "申请中"
                    break;
                case "2":
                    ss = "还款中"
                    break;
                case "3":
                    ss = "未还款"
                    break;
                case "4":
                    ss = "已结清"
                    break;
                default:
                    break;
            }
            return ss
        },
        newList: function () {
            $.ajax({
                url: localhost50010 + "/bill/getPage?pageNum=" + pageNum + "&pageSize=" + pageSize + "&status=" + status,
                type: "GET",
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                success: function (result) {
                    console.log(result)
                    if (result.code === "0") {
                        var rows = result.data.page.rows
                        var myBillsHTML = "";
                        total += rows.length
                        console.log(total)
                        console.log(result.data.page.total)
                        if (total > result.data.page.total || result.data.page.total == 0) {
                            $("#loadingTxt").html("没有新数据")
                            setTimeout(() => {
                                $("#loadingTxt").html("")
                            }, 5000);
                            pageNum--
                            return
                        }
                        for (let i = 0; i < rows.length; i++) {
                            console.log(rows[i])
                            myBillsHTML +=
                                `<li data-id="${rows[i].id}" status="${rows[i].status}">
                                <div class="billsTop">
                                    <span>
                                        ￥${myBills.isNull(rows[i].daikuanJine)}
                                    </span>
                                    <span class="status${rows[i].status}">
                                        ${myBills.status(rows[i].status)}
                                    </span>
                                </div>
                                <div class="billsBottom">
                                    <span>
                                        总期数${myBills.isNull( rows[i].zongQishu)} 剩余${myBills.isNull(rows[i].shengyuQishu)}期
                                    </span>
                                    <span>
                                        <img src="../../../img/time.png" alt="time">
                                        ${myBills.isNull(rows[i].jieshuRiqi)}
                                    </span>
                                </div>
                            </li>`

                        }
                        $("#myBillsHTML").append(
                            myBillsHTML
                        )
                        if (myScroll) {
                            myScroll.refresh();
                        }
                    }
                },
                error: function (error) {
                    console.log(error)
                }
            })
        },
        isNull: function (str) {
            if (str) {
                return str
            } else {
                return "-"
            }
        }
    }
myBills.init()