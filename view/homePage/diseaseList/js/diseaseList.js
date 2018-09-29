$(function () {
    var diseaseAndInsectBank = {
        init: function () {
            $("#diseaseListTitle").html(localStorage.getItem("diseaseListTitle"))
            diseaseAndInsectBank.listen()
        },
        listen: function () {
            var data = [{
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new2.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new3.png",
                    text: "柑橘头号杀手“黄龙病”柑橘头号杀手“黄龙病”柑橘头号杀手“黄龙病”"
                },
                {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new4.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new5.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new6.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new7.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new8.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new9.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new10.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new11.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new12.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                },
                {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new2.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new3.png",
                    text: "柑橘头号杀手“黄龙病”柑橘头号杀手“黄龙病”柑橘头号杀手“黄龙病”"
                },
                {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new4.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new5.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new6.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new7.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new8.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new9.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new10.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new11.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                }, {
                    link: "../insectPestsDetials/insectPestsDetials.html",
                    img: "img/new12.png",
                    text: "两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病两套“三板斧”对付柑橘黄龙病"
                },

            ]

            var diseaseList = ""
            for (let i = 0; i < data.length; i++) {
                diseaseList +=
                    `<li>
                    <a href="${data[i].link}">
                        <div>
                            <img src="${data[i].img}" alt="">
                        </div>
                        <p>${data[i].text}</p>
                    </a>
                </li>`
            }
            $("#diseaseList").html(diseaseList)
        }
    }
    diseaseAndInsectBank.init()
})