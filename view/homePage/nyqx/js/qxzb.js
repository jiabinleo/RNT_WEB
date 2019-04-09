var qxzb = {
    init() {
        tool.loading('../../../../img/loading.gif');
        this.listen()
    },
    listen() {
        var _this = this;
        var listData = [{
            name: '气象专报一'
        }, {
            name: '气象专报二'
        }, {
            name: '气象专报三'
        }, {
            name: '气象专报四'
        }, {
            name: '气象专报五'
        }, {
            name: '气象专报六'
        }, {
            name: '气象专报七'
        }, {
            name: '气象专报八'
        }, {
            name: '气象专报九'
        }, {
            name: '气象专报十'
        }, {
            name: '气象专报一'
        }, {
            name: '气象专报二'
        }, {
            name: '气象专报三'
        }, {
            name: '气象专报四'
        }, {
            name: '气象专报五'
        }, {
            name: '气象专报六'
        }, {
            name: '气象专报七'
        }, {
            name: '气象专报八'
        }, {
            name: '气象专报九'
        }, {
            name: '气象专报十'
        }]
        _this.listHTML(listData)
        $(document).on('click', '#listHTML > li', function () {
            window.open('qxzbList.html', '_self')
        })
    },
    listHTML(data) {
        $("#listHTML").empty()
        data.forEach(ele => {
            $("#listHTML").append(
                `<li>${ele.name}</li>`
            )
        })
        setTimeout(() => {
            $("#ljb-mask").remove()
        }, 1000);
        if (myScroll)
            myScroll.refresh();
    }
}
$(function () {
    qxzb.init()
})