var myBills = {
    init: function () {
        myBills.listen()
    },
    listen: function () {
        var data = [{
                num: "96000",
                status: 1,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96001",
                status: 2,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96002",
                status: 3,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96000",
                status: 1,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96001",
                status: 2,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96002",
                status: 3,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96000",
                status: 1,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96001",
                status: 2,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96002",
                status: 3,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96000",
                status: 1,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96001",
                status: 2,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96002",
                status: 3,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96000",
                status: 1,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96001",
                status: 2,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96002",
                status: 3,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96000",
                status: 1,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96001",
                status: 2,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96002",
                status: 3,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96000",
                status: 1,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96001",
                status: 2,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96002",
                status: 3,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96000",
                status: 1,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96001",
                status: 2,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96002",
                status: 3,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96000",
                status: 1,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96001",
                status: 2,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            },
            {
                num: "96002",
                status: 3,
                text: "期数24 剩余0期",
                time: "2015年1月24日"
            }
        ]
        var myBillsHTML = "";
        for (let i = 0; i < data.length; i++) {
            myBillsHTML +=
                `<li>
                <a href="../ImmediateRepayment/ImmediateRepayment.html">
                    <div class="billsTop">
                        <span>
                            ￥${data[i].num}
                        </span>
                        <span class="status${data[i].status}">
                            ${myBills.status(data[i].status)}
                        </span>
                    </div>
                    <div class="billsBottom">
                        <span>
                            期数24 剩余12期
                        </span>
                        <span>
                            <img src="img/time.png" alt="time">
                            2017年12月12日
                        </span>
                    </div>
                </a>
                </li>`

        }
        $("#myBillsHTML").html(myBillsHTML)
    },
    status: function (status) {
        ss = "";
        switch (status) {

            case 1:
                ss = "已还款"
                break;
            case 2:
                ss = "未还款"
                break;
            case 3:
                ss = "已还清"
                break;
            default:
                break;
        }
        return ss
    }
}
myBills.init()