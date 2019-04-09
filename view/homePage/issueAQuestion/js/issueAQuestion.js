var issue = {
    init: function () {
        $("#scroller").css({
            "min-height": $(window).height() - $("#header").height() - $("#line").height()
        })
        issue.listen()
    },
    listen: function () {

    }
}
issue.init()