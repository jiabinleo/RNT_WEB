var myCenter = {
    init: function () {
        myCenter.listen();
    },
    listen: function () {
        $.ajax({
            url: localhost50010 + "/user/getUser?account=" + account,
            type: "POST",
            dataType: "json",
            headers: {
                'Content-Type': 'application/json'
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("login_token", my_token);
            },
            // 
            success: function (result) {
                console.log(result)
                if (result.code === "0") {
                    $("#rz").html(myCenter.rz(result.data.user.realNameStatus))
                    $("#userImg").attr("src", imgUrl + result.data.user.icon)
                    $("#user_name").html(result.data.user.userName)
                }
            },
            error: function (error) {
                console.log(error)
            }
        })

        window.onload = function () {
            var sum = 100000;
            var s = 89432;
            $("#ss").html("可用额度:￥" + s);
            $("#yy").html(sum + "￥");
            var g = (s / sum) * 80;
            new Progress().renderOne("canvas", 100, 5, g);
        };
        $(document).on("click", "#list li", function () {
            console.log($(this).attr("data-id"))
            if ($(this).attr("data-id") === "smrz") {
                window.open('smrz.html', "_self");
            } else if ($(this).attr("data-id") === 'jcxx') {
                window.open("../../grzx/grzl/grzl.html", "_self");
            }
            // http://127.0.0.1:5500/view/grzx/grzl/grzl.html
        })
    },
    rz(num) {
        var rz = ''
        num += ''
        if (num === "3") {
            $("#rzbs").show()
        }
        switch (num) {
            case '1':
                return '未认证'
                break;
            case '2':
                return '认证中'
                break;
            case '3':
                return '已认证'
                break;
            case '4':
                return '认证失败'
                break;

            default:
                return '未认证'
                break;
        }
    }
};
myCenter.init();

var Progress = function () {
    var progress = {
        textheight: null,
        renderOne: function (id, length, r, percent) {
            var canvas = document.getElementById(id);
            var context = canvas.getContext("2d");
            canvas.width = length;
            canvas.height = length;
            var i = 0;
            var interval = setInterval(function () {
                i++;
                progress.render(context, length, r, i, percent);
                if (i >= percent) {
                    clearInterval(interval);
                }
            }, 10);
        },
        render: function (context, length, r, i, percent) {
            context.clearRect(0, 0, length, length);
            context.beginPath();
            var gradient = context.createLinearGradient(length, 0, 0, 0);
            gradient.addColorStop("0", "#ffffff");
            gradient.addColorStop("1.0", "#ffffff");
            context.strokeStyle = gradient;
            context.lineWidth = r;
            context.arc(
                length / 2,
                length / 2,
                length / 2 - r,
                -0.5 * Math.PI,
                -0.5 * Math.PI + i * 0.02 * Math.PI,
                false
            );
            context.stroke();
            context.closePath();
            context.beginPath();
            context.strokeStyle = "#ffffff";
            context.lineWidth = 2;
            context.fillStyle = "#ffffff";
            context.arc(length / 2, r, 0 * r, 0, 2 * Math.PI, false);
            context.stroke();
            context.fill();
            context.closePath();
            context.beginPath();
            var radian = (percent / 100) * 2 * Math.PI - 0.5 * Math.PI;
            var x = Math.cos(radian) * (length / 1 - r) + length / 2;
            var y = Math.sin(radian) * (length / 2 - r) + length / 2;
            // context.arc(x, y, 0.6 * r, 0, 2 * Math.PI, false);
            context.stroke();
            context.fill();
            context.closePath();
            context.beginPath();
            context.lineWidth = 1;
            context.strokeStyle = "#ffffff";
            context.fillStyle = "#ffffff";
            context.arc(length / 2, length / 2, length / 2 - 2 * r, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
            context.beginPath();
            context.font = "bold " + (length / 2 - 2.5 * r) / 3 + "px 微软雅黑";
            context.fillStyle = "#33B7EF";
            // var text = percent + "%";
            var text = "";
            textwidth = context.measureText(text).width;
            if (this.textheight == null) {
                var div = document.createElement("div");
                document.body.appendChild(div);
                div.innerHTML = text;
                div.style.fontSize = (length / 2 - 2.5 * r) / 2 + "px";
                this.textheight = div.offsetHeight;
                div.parentNode.removeChild(div);
            }
            textheight = this.textheight;
            context.fillText(
                text,
                (length - textwidth) / 2,
                length / 2 + textheight / 4
            );
            context.fill();
            context.closePath();
        }
    };
    return progress;
};