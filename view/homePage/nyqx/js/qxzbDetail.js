var qxzb = {
    init() {
        tool.loading('../../../img/loading.gif')
        this.listen()
    },
    listen() {
        var _this = this;
        var list = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543589127315&di=762549710a6770a97d1952cb7e439ba8&imgtype=0&src=http%3A%2F%2Fwww.zhaqxh.com%2FPublic%2FUpload%2Ffile%2F20160310%2F20160310100537_43491.jpg%3FPHPSESSID%3D2b44ed20bccd687b43949ffbe5714e56'
        _this.listHTML(list)
    },
    listHTML(list) {
        $("#file").empty()
        $("#file").html(
            `<img src="${list}" alt>`
        )
        $("#ljb-mask").remove();
        if (myScroll)
            myScroll.refresh();
    }
}
$(function () {
    qxzb.init()
})