var gy = {
    init() {
        this.listen()
    },
    listen() {
        var tel = 1303030330;
        $("#tel").attr('href', `tel:${tel}`).find('span').html(tel)
        $(document).on('click', '#list > li', function () {
            var lis = $(this).attr('ids')
            if (lis) {
                window.open(`${lis}.html`, `_self`)
            }
        })
        if (myScroll)
            myScroll.refresh();
    }
}
$(function () {
    gy.init()

})