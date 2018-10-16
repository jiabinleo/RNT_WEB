var person = {
    init: function () {
        person.listen()
    },
    listen: function () {
        $("#userLogo").attr("src", JSON.parse(sessionStorage.getItem("imgUrl")));
        $("#userName").html(JSON.parse(sessionStorage.getItem("userName")));
        $("#telephone").html(JSON.parse(sessionStorage.getItem("telephone")));
        console.log("//")
    }
}
person.init()