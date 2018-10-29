$(function () {
    var maize = {
        init: function () {
            console.log(tool.getRequest().id)
            $.ajax({
                url: localhost40000 + "/insurance/detail/" + tool.getRequest().id,
                type: "get",
                success: function (data) {
                    data = JSON.parse(data)
                    if (data.code === "0") {
                        maize.pageHtml(data.data.insurance)
                    }
                },
                error: function (err) {}
            });
            maize.listen()
        },
        listen: function () {
            $(document).on("click", "#insure", function () {
                window.open("../insure/insure.html?id=" + tool.getRequest().id, "_self");
            })
            $(document).on("click", "#insure", function () {
                localStorage.setItem("msg", null)
            })
        },
        pageHtml: function (insurance) {
            console.log(insurance)
            $("#title").html(insurance.insuranceName)
            localStorage.setItem("insuranceName", JSON.stringify(insurance.insuranceName))
            $("#banner").html(
                `<img src="${imgUrl+insurance.cover}" alt="">`
            )

            $("#h3").html(
                `${insurance.insuranceName}
                <img id="jx" src="img/jingxuan@2x.png" alt="jingxuan">
                <img id="rx" src="img/rexiao@2x.png" alt="rexiao">`
            )
            var jx = 0,
                rx = 1;
            jx == 1 ? $("#jx").show() : $("#jx").hide()
            rx == 1 ? $("#rx").show() : $("#rx").hide()
            $("#toubaowu").html(insurance.toubaoWu)
            $("#term").html(insurance.termStart + "-" + insurance.termEnd)
            $("#areaName").html(insurance.areaName)
            $("#baoE").html(insurance.baoE)
            $("#cost").html(insurance.cost)
            var listArr = insurance.characteristic.split('&');
            var listHTML = "";
            for (let i = 0; i < listArr.length; i++) {
                listHTML += `<p>${i+1}.${listArr[i]}</p>`
            }
            $("#list").html(listHTML)
            $("#scheme").html(insurance.scheme)
            $("#responsibility").html(insurance.responsibility)


            if (myScroll) {
                myScroll.refresh();
            }
        }

    }
    maize.init()
})