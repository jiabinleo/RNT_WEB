(function () {
    var width = document.documentElement.clientWidth;
    var style = document.createElement("style")
    style.innerHTML = "html{font-size: " + width / 16 + "px !important;}"
    document.head.appendChild(style)
})();
