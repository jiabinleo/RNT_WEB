var onlineService = {
    init: function () {
        onlineService.listen()
    },
    listen: function () {
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
        $(document).on("touchend", "#content_list .title", function () {
            if ($(this).parent().hasClass("active")) {
                $(this).parent().removeClass("active")
                $(this).find("img").attr("src", "img/right.png")
            } else {
                $(this).parent().addClass("active")
                $(this).find("img").attr("src", "img/bottom.png")
            }
            if (myScroll) {
                myScroll.refresh();
            }
        })
    }
}
onlineService.init()