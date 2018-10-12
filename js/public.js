if (JSON.parse(sessionStorage.getItem("my_token")) == null) {
    window.open("login.html", "_self");
}