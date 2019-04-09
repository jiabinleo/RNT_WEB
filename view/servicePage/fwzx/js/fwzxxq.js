$(function () {
    $.ajax({
        url: localhost50010 + `/question/detail/${tool.getRequest().id}`,
        type: 'POST',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("login_token", my_token);
        },
        success(result) {
            if (result.code === '0') {
                console.log(result.data.question.question)
                $("#scroller").html(result.data.question.answer)
            }
        },
        error(error) {
            console.log(error)
        }
    })
})