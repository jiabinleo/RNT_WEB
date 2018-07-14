$(function () {

    $("#center").click(function () {
        $(".masked").addClass(" maskeds")
        $(".personalCente").addClass(" peractive")
    })
    $(".masked").click(function () {
        $(".masked").removeClass(" maskeds")
        $(".personalCente").removeClass(" peractive")
    })
    $(".personalCente_content > ul > li").click(function () {
        $(this).addClass("active").siblings().removeClass("active")
    })
})