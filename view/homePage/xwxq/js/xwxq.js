var info = {
    init: function init() {
        info.listen();
    },
    listen: function listen() {
        console.log();
        $.ajax({
            url: localhost50010 + "/news/detail/" + tool.getRequest().id,
            type: "get",
            success: function success(data) {
                console.log(data);
                if (data.code === "0") {
                    info.details(data.data.newsList);
                }
            },
            error: function error(err) {}
        });
    //     $(document).on("click", ".content img", function (even) {
    //         $('#mask').show();
    //         $("#imgMask").attr('src', $(this).attr('src'));
    //         return;
    //     });
    //     $(document).on("touchend", "#mask", function () {
    //         $('#mask').hide();
    //     });
    },
    details: function details(newsList) {
        $("#title").html(newsList.categoryName);
        var str = newsList.content;
        var reprintImg = "";
        if (newsList.reprint == 1) reprintImg = "<img src=\"../../../img/zhuanzai.png\">";
        var authorIcon;
        if (newsList.authorIcon) authorIcon = imgUrl + newsList.authorIcon;
        else authorIcon = "../../../img/45logo.png";

        $("#content").html("<h3>" + newsList.title + "</h3><div class=\"source\"><div class=\"logo\"><img src=\"" + authorIcon + "\" alt=\"\"></div><p>" + newsList.author + " " + newsList.publishTime + "</p>\n            <div class=\"reprint\">\n                " + reprintImg + "\n            </div>\n        </div>\n        <div class=\"content\">\n            <div class=\"content-text\">\n                " + str + "\n            </div>\n        </div>");
        $(document).find(".content-text").find('img').attr('height', 'auto');
        if (myScroll) {
            myScroll.refresh();
        }
        setTimeout(function () {
            if (myScroll) {
                myScroll.refresh();
            }
        }, 1000);
    }
};
info.init();