$(function () {
    var hospital = {
        init: () => {
            hospital.listen()
            hospital.list()
        },
        listen: () => {
            $(document).on("touchstart", ".typename", function () {
                window.open("diseaseList.html?s=" + $(this).attr('s'), "_self")
            })
            $(document).on("click", "li", function () {
                window.open("insectPestsDetials.html?ids=" + $(this).attr("data-id"), "_self")
            })
        },
        list() {
            $.ajax({
                url: localhost50002 + '/plantserver/loadBySecondCategory',
                type: "POST",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json"
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("login_token", my_token);
                },
                data: JSON.stringify({
                    secondCategory: tool.getRequest().s,
                    isrefer: 2
                }),
                success: function (result) {
                    console.log(result)
                    result.data.plantServerList.forEach((ele, index) => {
                        console.log(ele)
                        var listHTML = ""
                        ele.children.forEach((e, i) => {
                            var img = e.imgSamllPath.split(',')[0]
                            if (!i) {
                                $("#title").text(result.data.typeList[e.secondCategory])
                            }
                            if (i < 3) {
                                listHTML +=
                                    `<li data-id="bch_${e.id}">
                                            <div class="img"">
                                                <img src="${imgUrl+img}" />
                                            </div>
                                            <p>${e.title}</p>
                                        </li>`
                            }
                        })
                        $("section").append(
                            `<div class="content">
                                    <div class="content-title">
                                        <span class="blue-line"></span>
                                        <div class="title">
                                            <span>${ele.typename}</span>
                                            <span class="typename" s="jsfw_${tool.getRequest().s}_${ele.typeid}" >
                                                <img src="../../../img/arrow-right-gray.png" />
                                            </span>
                                        </div>
                                    </div>
                                    <div class="content-inner">
                                        <ul>
                                            ${listHTML}
                                        </ul>
                                    </div>
                                </div>`
                        )
                    })
                },
                error: function () {}
            })
        },
    }
    hospital.init()
})