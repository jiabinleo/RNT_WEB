var qxzb = {
    init() {
        tool.loading('../../../../img/loading.gif');
        this.listen()
    },
    listen() {
        var _this = this;
        var listData = [{
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, {
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, {
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, {
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, {
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, {
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, {
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, {
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, {
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, {
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, {
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, {
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, {
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, {
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, {
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, {
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, {
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, {
            title: '撒地方士大夫发射点',
            time: '2018-11-30 19:49'
        }, ]
        _this.listHTML(listData)
        $(document).on('click', '#listHTML > li', function () {
            window.open('qxzbDetail.html', '_self')
        })
    },
    listHTML(data) {
        $("#listHTML").empty()
        data.forEach(ele => {
            $("#listHTML").append(
                `<li>
                    <p>${ele.title}</p>
                    <p>上传时间：${ele.time}</p>
                </li>`
            )
        })
        $("#ljb-mask").remove()
        if (myScroll)
            myScroll.refresh();

    }
}
$(function () {
    qxzb.init()
})