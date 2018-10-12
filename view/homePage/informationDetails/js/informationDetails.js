var info = {
    init: function () {
        info.listen()
    },
    listen: function () {
        console.log()
        $.ajax({
            url: localhost + "/news/detail/" + tool.getRequest().id,
            type: "get",
            success: function (data) {
                console.log(data)
                if (data.code === "0") {
                    info.details(data.data.newsList)
                }
            },
            error: function (err) {}
        });
    },
    details: function (newsList) {
        console.log(newsList)
        $("#content").html(
            `<h3>
            ${newsList.title}
        </h3>
        <div class="source">
            <div class="logo">
                <img src="${imgUrl+newsList.authorIcon}" alt="">
            </div>
            <p>${newsList.author} ${newsList.publishTime}</p>
            <div class="reprint">
                <img src="img/reprint.png" alt="">
            </div>
        </div>
        <div class="content">
            <div class="content-text">
                ${newsList.content}
            </div>
        </div>`
        )

    }
}
info.init()