//isScrool
var myScroll;
function isPassive() {
    var supportsPassiveOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassiveOption = true;
            }
        }));
    } catch(e) {}
    return supportsPassiveOption;
}
function loaded() {
    myScroll = new IScroll('#wrapper', {
        scrollbars: true,
        mouseWheel: true,
        click:true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true
    });
}
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, isPassive() ? {
    capture: false,
    passive: false
} : false);

document.body.onload=function(){
    loaded()
}