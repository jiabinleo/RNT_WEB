var onlineService = {
    init: function () {
        onlineService.listen()
    },
    listen: function () {
        var data = [{
            title: "如何申请贷款？",
            list: [{
                    text: "珍惜个人信用，保持良好还款习惯，按时还款，勿产生逾期记录。"
                },
                {
                    text: "珍惜个人信用，保持良好还款习惯，按时还款，勿产生逾期记录。"
                }
            ]
        }, {
            title: "如何申请贷款？",
            list: [{
                    text: "珍惜个人信用，保持良好还款习惯，按时还款，勿产生逾期记录。"
                },
                {
                    text: "珍惜个人信用，保持良好还款习惯，按时还款，勿产生逾期记录。"
                }
            ]
        }, {
            title: "如何申请贷款？",
            list: [{
                    text: "珍惜个人信用，保持良好还款习惯，按时还款，勿产生逾期记录。"
                },
                {
                    text: "珍惜个人信用，保持良好还款习惯，按时还款，勿产生逾期记录。"
                }
            ]
        }]

        var content_listHTML = "";
        for (let i = 0; i < data.length; i++) {
            var lisHTML = ""
            for (let j = 0; j < data[i].list.length; j++) {
                lisHTML +=
                    ` <li>(${j})${data[i].list[j].text}</li>`
            }
            content_listHTML +=
                `<li class="list">
                    <div class="title">
                        <p>${i+1}.${data[i].title}</p>
                        <span class="img"><img src="img/right.png" alt=""></span>
                    </div>
                    <ul class="content_list_text">
                    ${lisHTML}
                    </ul>
                </li>`
        }

        $("#content_list").html(content_listHTML)
        $(document).on("click", "#content_list .list", function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active")
                $(this).find("img").attr("src", "img/right.png")
            } else {
                $(this).addClass("active")
                $(this).find("img").attr("src", "img/bottom.png")
            }
        })
    }
}
onlineService.init()