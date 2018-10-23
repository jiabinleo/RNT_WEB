$(function () {
    var my_token = JSON.parse(sessionStorage.getItem("my_token")),
        policyDetails = {
            init: function () {
                var id = tool.getRequest().id;
                $.ajax({
                    url: localhost40000 + "/policy/detail/" + id,
                    type: "GET",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("login_token", my_token);
                    },
                    success: function (result) {
                        if (result.code === "0") {
                            console.log(result)
                        }
                    },
                    error: function (error) {}
                })
            }
        }
    policyDetails.init()
})