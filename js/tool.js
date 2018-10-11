(function () {
    var width = document.documentElement.clientWidth;
    var style = document.createElement("style")
    style.innerHTML = "html{font-size: " + width / 16 + "px !important;}"
    document.head.appendChild(style)
})();

var localhost = "http://192.168.1.240:55001/v1",
imgUrl="http://192.168.1.240:50000"
