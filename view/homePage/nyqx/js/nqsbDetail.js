var nysb = {
  init() {
    tool.loading('../../../../img/loading.gif');
    this.listen()
  },
  listen() {
    var _this = this
    $.ajax({
      url: localhost50010 + "/disasters/detail/" + tool.getRequest().id,
      type: "get",
      headers: {
        "Content-Type": "application/json"
      },
      success: function (data) {
        if (data.code === "0") {
          _this.banner(data.data.disasters.files)
          _this.listHTML(data.data.disasters)
          $("#ljb-mask").remove()
          if (myScroll) {
            myScroll.refresh();
          }
        }
      },
      error: function (err) {}
    });
  },
  banner(files) {
    var imgFile = files.split(',')
    var _this = this
    imgFile.forEach(ele => {
      $("#swiper_banner").append(
        `<div class="swiper-slide">
              <img src="${imgUrl +ele}" alt>
          </div>`
      )
    });
    _this.swiper()
  },
  swiper() {
    var mySwiper = new Swiper(".swiper-container", {
      autoplay: 3000,
      loop: true,
      speed: 1000,
      // slidesPerView: 'auto',
      pagination: ".swiper-pagination",
      autoplayDisableOnInteraction: false,
      centeredSlides: true
    });
  },
  listHTML(disasters) {
    $("#listHTML").empty().html(
      `<li>
        <span>灾害类型:</span>
        <span>${disasters.disasterName}</span>
      </li>
      <li>
        <span>作物类型:</span>
        <span>${disasters.cropName}</span>
      </li>
      <li>
        <span>地址:</span>
        <span>${disasters.address}</span>
      </li>
      <li>
        <span>上报人:</span>
        <span>${disasters.userName}</span>
      </li>
      <li>
        <span>上报时间:</span>
        <span>${disasters.updateTime}</span>
      </li>
      <li>
        <span>上报信息:</span>
      </li>
      <li>
        <p>${disasters.description}</p>
      </li>`
    )
    // setTimeout(() => {
    //   if (myScroll) {
    //     myScroll.refresh();
    //   }
    // }, 1000);
  }
};
$(function () {
  nysb.init();
});