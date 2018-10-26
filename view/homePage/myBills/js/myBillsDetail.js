var pageNum = 1,
    pageSize = 6,
    total = null,
    my_token = JSON.parse(sessionStorage.getItem("my_token")),
    myBills = {
        init: function () {
            myBills.newList(pageNum, pageSize)
            myBills.listen()
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
                        myBills.newList(pageNum, pageSize)
                    }
                });
            }, 300);

        },
        status: function (status) {
            ss = "";
            switch (status) {

                case "1":
                    ss = "申请中"
                    break;
                case "2":
                    ss = "未还款"
                    break;
                case "3":
                    ss = "已还清"
                    break;
                default:
                    break;
            }
            return ss
        },
        newList: function () {
            $.ajax({
                url: localhost40000 + "/bill/detail/" + tool.getRequest().id,
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
                    // if (result.code === "0") {
                    //     var rows = result.data.page.rows
                    //     var myBillsHTML = "";
                    //     total += rows.length
                    //     if (myScroll) {
                    //         myScroll.refresh();
                    //     }
                    //     if (total > result.data.page.total) {
                    //         // alert("没有新数据")
                    //         $("#loadingTxt").html("没有新数据")
                    //         pageNum--
                    //         return
                    //     }
                    //     for (let i = 0; i < rows.length; i++) {
                    //         myBillsHTML +=
                    //             `<li data-id="${rows[i].id}">
                    //         <a href="../ImmediateRepayment/ImmediateRepayment.html">
                    //             <div class="billsTop">
                    //                 <span>
                    //                     ￥${rows[i].daikuanJine}
                    //                 </span>
                    //                 <span class="status${rows[i].status}">
                    //                     ${myBills.status(rows[i].status)}
                    //                 </span>
                    //             </div>
                    //             <div class="billsBottom">
                    //                 <span>
                    //                     期数24 剩余12期
                    //                 </span>
                    //                 <span>
                    //                     <img src="img/time.png" alt="time">
                    //                     2017年12月12日
                    //                 </span>
                    //             </div>
                    //         </a>
                    //         </li>`

                    //     }
                    //     $("#myBillsHTML").append(
                    //         myBillsHTML
                    //     )
                    //     if (myScroll) {
                    //         myScroll.refresh();
                    //     }
                    // }
                },
                error: function (error) {
                    console.log(error)
                }
            })
        }
    }
myBills.init()