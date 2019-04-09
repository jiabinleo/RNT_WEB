$(function () {
  var supDem = {
    init: function () {
      tool.loading('../../../img/loading.gif')
      supDem.gqsc(1);
      supDem.listen();
    },
    listen: function () {
      $.ajax({
        url: localhost50010 + "/supply/bannerList",
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
            console.log(result.data.bannerList);
            result.data.bannerList.forEach((ele, index) => {
              console.log(ele);
              $("#swiper_wrapper").append(
                `<div class="swiper-slide">
                      <a href="javascript:void(0)">
                          <img src="${imgUrl + ele.bannerImg}" alt="banner"/>
                      </a>
                  </div>`
              );
            });
            supDem.mySwiper();
            $("#ljb-mask").remove()
          }
          if (myScroll) {
            myScroll.refresh();
          }
        },
        error: function (error) {
          console.log(error);
        }
      });
      $(document).on("click", ".supplyAndDemand-title div", function () {
        $(".supplyAndDemand-title span").removeClass("active");
        $(this)
          .find("span")
          .addClass("active");
        supDem.gqsc($(this).attr("data-id"));
        if (myScroll) {
          myScroll.refresh();
        }
      });
      $(document).on("click", "#add", function () {
        $("#mask").show()
      })
      $(document).on("touchstart", "#close", function () {
        $("#mask").hide()
      })
      $(document).on("touchstart", "#mask li", function () {
        if (my_token) {
          window.open(`${$(this).attr('ids')}.html`, '_self')
        } else {
          tool.loginPrompt()
        }
      })
      $(document).on('click', '#_tuichu', function () {
        window.open('../../../login.html', '_self')
      })
      //详情
      $(document).on("click", ".supplyAndDemand-text", function () {
        console.log($(this).attr("ids"))
        window.open(`gqxq.html?ids=${$(this).attr("ids")}`, "_self")
      })
      //点赞
      $(document).on("click", ".dz", function (e) {
        var ids = $(this).attr("ids"),
          dzs = parseInt($(this).text()),
          iszan,
          _this = $(this);
        if ($(this).attr("zan") == 'null') {
          iszan = "1"
        } else {
          iszan = "null"
        }
        $.ajax({
          url: localhost50010 + `/supply/zan?id=${ids}&isZan=${iszan}`,
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
              if (_this.attr("zan") == '1') {
                dzs -= 1
                _this.html(`<img src="../../../img/zan.png" alt=""></img>${dzs}人点赞`)
              } else {
                dzs += 1
                _this.html(`<img src="../../../img/zan_hide.png" alt=""></img>${dzs}人点赞`)
              }
              _this.attr("zan", iszan)
              tool.tip(result.message)
            } else if (result.code == 9) {
              tool.loginPrompt()
            } else {
              tool.tip(result.message)
            }
          },
          error: function (error) {
            console.log(error);
          }
        })
        return false;
      })
    },
    //供应求购
    gqsc(type) {
      $.ajax({
        url: localhost50010 + "/supply/getHomeList?type=" + type,
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
            console.log(result.data.list);
            var account = '匿名'
            var imgIcon = '../../../img/45logo.png'
            $("#contentHTML").empty();
            result.data.list.forEach((ele, index) => {
              var imgList = "";
              var zanImg = null;
              var heart = ele.isZan ? '<img src="../../../img/zan_hide.png" alt=""></img>' : '<img src="../../../img/zan.png" alt=""></img>'
              console.log(ele)
              if (ele.fileList) {
                ele.fileList.split(",").forEach((img, i) => {
                  if (i < 3) {
                    imgList +=
                      `<li><img src="${imgUrl + img}"></li>
                    `;
                  }
                });
              }
              console.log(ele)
              if (ele.userName) {
                account = ele.userName
              }
              if (ele.icon) {
                imgIcon = imgUrl + ele.icon
              }
              $("#contentHTML").append(
                `<div class="supplyAndDemand-text" ids="${ele.id}">
                    <div class="supplyAndDemand-text-title">
                        <div class="left">
                            <img src="${imgIcon}" alt="">
                        </div>
                        <div class="center">
                            <p>${account}</p>
                            <p><span>${ele.area}</span></p>
                        </div>
                        <div class="right">
                            <p>${tool.timeConversion(ele.publishTime)}</p>
                        </div>
                    </div>
                    <div class="supplyAndDemand-text-content">
                        <p>${tool.isNull(ele.title)}</p>
                        <p>${ele.detail}</p>
                    </div>
                    <div class="supplyAndDemand-text-img">
                        <ul>${imgList}</ul>
                    </div>
                    <div class="count">
                        <p>
                            <span><img src="../../../img/read.png" alt="">${ele.reading}人阅读</span>
                            <span ids="${ele.id}" zan=${ele.isZan} class="dz">${heart}${ele.zan?ele.zan:"0"}人点赞</span>
                        </p>
                    </div>
                </div>
            </div>`
              );
              if (myScroll) {
                myScroll.refresh();
              }
            });

          }

        },
        error: function (error) {
          console.log(error);
        }
      });
    },
    mySwiper() {
      var mySwiper = new Swiper(".swiper-container", {
        autoplay: 3000,
        loop: true,
        speed: 1000,
        // slidesPerView: 'auto',
        pagination: ".swiper-pagination",
        autoplayDisableOnInteraction: false,
        centeredSlides: true
      });
    }
  };
  supDem.init();
  setTimeout(() => {
    if (myScroll) {
      myScroll.refresh();
    }
  }, 1000);
});