var category = "",
  title = "",
  label = "",
  pageNum = 1,
  pageSize = 10,
  total = null,
  pageId = 'gyxx',
  delThis = null;
var wo = {
  initData: {
    menuData: [{
      text: '供应信息',
      id: 'gyxx'
    }, {
      text: '求购信息',
      id: 'qgxx'
    }, {
      text: '价格信息',
      id: 'jgxx'
    }]
  },
  init: function () {
    this.listen()
    this.gyxx()
  },
  listen: function () {
    var _this = this;
    _this.menu(_this.initData.menuData)
    $(document).on("click", "#swiper_menu > .swiper-slide", function () {
      $(this).addClass('active').siblings().removeClass('active')
      pageNum = 1
      $("#listHTML").empty()
      pageId = $(this).attr('data-id')
      _this[pageId]()

    })
    $(document).on('click', '#listHTML > .lis', function () {
      window.open(`gqxq.html?ids=${$(this).attr('detailid')}`, '_self')
    })
    //删除
    $(document).on("touchstart", ".del", function () {
      delThis = $(this)
      console.log('///')
      $("#address").html(`${$(this).find(".name").text()}`)
      $("#queren").attr("detailid", $(this).attr("detailid"))
      timeOutEvent = setTimeout(function () {
        $("#mask").show()
      }, 500);
    })
    $(document).on("touchend", ".del", function () {
      clearTimeout(timeOutEvent);
    })
    $(document).on("touchend", "#queren", function () {
      var detailid = $(this).attr("detailid")
      if (delThis.attr('data-type') === 'jgxx') {
        $.ajax({
          url: `${localhost50010}/priceInfo/cancel/${detailid}`,
          type: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          beforeSend: function (xhr) {
            xhr.setRequestHeader("login_token", my_token);
          },
          success: function (result) {
            console.log(result)
            delThis.hide()
            $("#mask").hide()
          },
          error: function (err) {}
        });
      } else if (delThis.attr('data-type') === 'gqxx') {
        $.ajax({
          url: `${localhost50010}/supply/cancel/${detailid}`,
          type: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          beforeSend: function (xhr) {
            xhr.setRequestHeader("login_token", my_token);
          },
          success: function (result) {
            console.log(result)
            delThis.hide()
            $("#mask").hide()
          },
          error: function (err) {}
        });
      }
      return false;
    })
    $(document).on("touchend", "#quxiao", function () {
      $("#mask").hide()
      return false
    })

    setTimeout(() => {
      var minY = null;
      myScroll.on('scrollStart', function () {
        minY = this.y;
        $("#loadingTxt").html("加载更多..")
      });

      myScroll.on('scroll', function () {

        minY = minY < this.y ? minY : this.y;
      });

      myScroll.on('scrollEnd', function () {
        minY = minY < this.y ? minY : this.y;
        setTimeout(() => {
          $("#loadingTxt").html("")
          if (myScroll) {
            myScroll.refresh();
          }
        }, 3000);
        if (this.y == this.maxScrollY) {
          pageNum++
          _this[pageId]()
        }
      });
    }, 300);
  },
  menu: function (newsCategoryList) {
    $("#swiper_menu").empty()
    newsCategoryList.forEach((ele, index) => {
      if (index) {
        $("#swiper_menu").append(
          `<div class="swiper-slide" data-id="${ele.id}">
                        <span>${ele.text}</span>
                    </div>`
        )
      } else {
        $("#swiper_menu").append(
          `<div class="active swiper-slide" data-id="${ele.id}">
                        <span>${ele.text}</span>
                    </div>`
        )
      }
    });
    var mySwiper1 = new Swiper(".swiper-menu", {
      slidesPerView: 3
    });
  },
  gyxx() {
    var _this = this
    $.ajax({
      url: `${localhost50010}/supply/getMyPage?pageNum=${pageNum}&pageSize=${pageSize}&sort=time&type=1`,
      type: "POST",
      dataType: "json",
      headers: {
        'Content-Type': 'application/json'
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader("login_token", my_token);
      },
      success: function (result) {
        console.log(result)
        if (result.code === "0") {
          total = result.data.page.total
          _this.gqHTML(result.data.page.rows)
        } else {
          tool.tip(result.message)
        }
      },
      error: function (error) {
        console.log(error)
      }
    })
  },
  qgxx() {
    var _this = this
    $.ajax({
      url: `${localhost50010}/supply/getMyPage?pageNum=${pageNum}&pageSize=${pageSize}&sort=time&type=2`,
      type: "POST",
      dataType: "json",
      headers: {
        'Content-Type': 'application/json'
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader("login_token", my_token);
      },
      success: function (result) {
        console.log(result)
        if (result.code === "0") {
          total = result.data.page.total
          _this.gqHTML(result.data.page.rows)
        } else {
          tool.tip(result.message)
        }
      },
      error: function (error) {
        console.log(error)
      }
    })
  },
  gqHTML: function (data) {
    var _this = this
    console.log(total)
    if ($("#listHTML").find('.lis').length >= total) {
      pageNum--
      return
    }
    data.forEach((ele, index) => {
      console.log(ele)
      var imgFile = ele.fileList.split(',')[0]
      $("#listHTML").append(
        `<div data-type="gqxx" detailId="${ele.id}" class="lis del">
                        <div class="left lisImg">
                        <img src="${imgUrl+imgFile}" onerror="javascript:this.src='../../../../img/error.png'" alt>
                    </div>
                    <div class="right">
                        <h2 class="name">${ele.title}</h2>
                        <p>${ele.detail}</p>
                        <p><span>${ele.area}</span><span>${tool.timeConversion(ele.publishTime)}</span></p>
                    </div>
                </div>
                <div class="line">
                </div>`
      );
    });
    $("#wrap").hide()
    if (myScroll) {
      myScroll.refresh();
    }
  },
  jgxx() {
    var _this = this
    $.ajax({
      url: `${localhost50010}/priceInfo/getMyPage?pageNum=${pageNum}&pageSize=${pageSize}&sort=time&priceType=1`,
      type: "POST",
      dataType: "json",
      headers: {
        'Content-Type': 'application/json'
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader("login_token", my_token);
      },
      success: function (result) {
        if (result.code === "0") {
          total = result.data.page.total
          _this.jgxxHTML(result.data.page.rows)
        } else {
          tool.tip(result.message)
        }
      },
      error: function (error) {
        console.log(error)
      }
    })
  },
  jgxxHTML(data) {
    var _this = this
    var priceType = null;
    if ($("#listHTML").find('.jgList').length >= total) {
      pageNum--
      return
    }
    data.forEach((ele, index) => {
      ele.priceType == 1 ? priceType = '市场价格' : priceType = '产地价格'
      console.log(ele)
      $("#listHTML").append(
        `<div data-type="jgxx" detailId="${ele.id}" class="jgList del">
                <div class="wrap">
                  <p class="name">${priceType}</p>
                  <p class="name">${ele.cityName}</p>
                  <p class="name">${ele.cropName}</p>
                  <p><a>${ele.price}</a>元</p>
                  <p>${tool.timeConversion(ele.updateTime)}</p>
                </div>
              </div>`
      );
    });
    $("#wrap").hide()
    if (myScroll) {
      myScroll.refresh();
    }
  }
}
$(function () {
  wo.init()
})