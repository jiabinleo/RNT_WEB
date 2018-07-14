var t;
var e = 89432.61/100000*100
$(document).ready(function () {
    i = 0;
    t = setInterval(function () {
        addNum(e, 150)
    }, 20);
});

function addNum(percent, width) {
    if (i < percent) {
        i++;
        $('canvas.debit_process').text(i + "%");
        drawProcess(width);
    } else {
        clearInterval(t);
    }
}

function drawProcess(width) {
    $('canvas.debit_process').each(function () {
        var text = $(this).text();
        var process = text.substring(0, text.length - 1);
        var canvas = this;
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, width, width);
        //环前景色渐变色  
        context.beginPath();
        context.moveTo(width / 2, width / 2);
        context.arc(width / 2, width / 2, width / 2, Math.PI * 1.5, Math.PI * 1.5 * process / 100, false);
        context.closePath();
        var lGrd = context.createLinearGradient(0, 0, 300, 300);
        lGrd.addColorStop(0, '#ffffff');
        context.fillStyle = lGrd;
        context.fill();
        //设置内圆透明
        context.beginPath();
        context.arc(width / 2, width / 2, width / 2 - 10, 0, Math.PI * 2, true);
        context.fillStyle = 'rgba(56,187,240,1)';
        context.fill();
    });
}
