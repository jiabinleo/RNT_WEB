$(function () {
  var farmers = {
    init: function () {
      farmers.listen();
    },
    listen: function () {
      myScroll = new IScroll("#scroller");
      myScroll.on("scrollStart", function () {
        setTimeout(() => {
          var str = $("#scroller")
            .css("transform")
            .replace(/[matrix\(]/g, "");
          str = str.slice(0, str.length - 1);
          str = str.split(",");
          console.log(str)
          if (str[str.length - 1] > -100) {
            $("#header_bg").animate({
                opacity: 0
              },
              800
            );
          } else {
            $("#header_bg").animate({
                opacity: 1
              },
              800
            );
          }
        }, 0);
      });
      myScroll.on("scrollEnd", function () {
        setTimeout(() => {
          var str = $("#scroller")
            .css("transform")
            .replace(/[matrix\(]/g, "");
          str = str.slice(0, str.length - 1);
          str = str.split(",");
          if (str[str.length - 1] > -100) {
            $("#header_bg").animate({
                opacity: 0
              },
              800
            );
          } else {
            $("#header_bg").animate({
                opacity: 1
              },
              800
            );
          }
        }, 500);
      });

      var menu = [{
          title: "农人风采",
          link: "#",
          imgUrl: "../../../img/icon/nongren.png"
        },
        {
          title: "专家专栏",
          link: "#",
          imgUrl: "../../../img/icon/zhuanjia.png"
        },
        {
          title: "企业专版",
          link: "#",
          imgUrl: "../../../img/icon/qiye.png"
        },
        {
          title: "推荐专题",
          link: "#",
          imgUrl: "../../../img/icon/tuijian.png"
        },
        {
          title: "交流专区",
          link: "#",
          imgUrl: "../../../img/icon/jiaoliu.png"
        }
      ];
      var menuHTML = "";
      for (let i = 0; i < menu.length; i++) {
        menuHTML += `<li>
                <a href="${menu[i].link}">
                    <div>
                        <img src="${menu[i].imgUrl}" alt="${menu[i].title}">
                    </div>
                </a>
            </li>`;
      }
      $("#menuHTML").html(menuHTML);

      var recommendData = [{
          link: "#",
          imgUrl: "../../../img/banner4.png",
          text: "大鹏种植的奥秘"
        },
        {
          link: "#",
          imgUrl: "../../../img/banner4.png",
          text: "农业自动化"
        },
        {
          link: "#",
          imgUrl: "../../../img/banner4.png",
          text: "充分的利用徒弟资源"
        },
        {
          link: "#",
          imgUrl: "../../../img/banner4.png",
          text: "大鹏种植的奥秘"
        },
        {
          link: "#",
          imgUrl: "../../../img/banner4.png",
          text: "农业自动化"
        },
        {
          link: "#",
          imgUrl: "../../../img/banner4.png",
          text: "充分的利用徒弟资源"
        },
        {
          link: "#",
          imgUrl: "../../../img/banner4.png",
          text: "大鹏种植的奥秘"
        },
        {
          link: "#",
          imgUrl: "../../../img/banner4.png",
          text: "农业自动化"
        },
        {
          link: "#",
          imgUrl: "../../../img/banner4.png",
          text: "充分的利用徒弟资源"
        }
      ];
      var swiper_menuHTML = "";
      for (let i = 0; i < recommendData.length; i++) {
        swiper_menuHTML += `<div class="swiper-slide">
                    <a href="${recommendData[i].link}">
                        <div class="img-wrap">
                            <img src="${recommendData[i].imgUrl}" alt="">
                            <p>${recommendData[i].text}</p>
                        </div>
                    </a>
                </div>`;
      }
      $("#swiper_menu").html(swiper_menuHTML);

      var newListData = [{
          title: "中国“陶氏益农公司”",
          text: "美国陶氏益农公司是领先世界的五大农药跨国公司之一，是美国第一大化学公司－陶氏化学的全资子公司。",
          time: "2018.10.08",
          read: "188",
          imgUrl: "../../../img/banner4.png"
        },
        {
          title: "美国“陶氏益农公司”",
          text: "美国陶氏益农公司是领先世界的五大农药跨国公司之一，是美国第一大化学公司－陶氏化学的全资子公司。",
          time: "2018.10.08",
          read: "188",
          imgUrl: "../../../img/banner4.png"
        },
        {
          title: "俄罗斯“陶氏益农公司”",
          text: "美国陶氏益农公司是领先世界的五大农药跨国公司之一，是美国第一大化学公司－陶氏化学的全资子公司。",
          time: "2018.10.08",
          read: "188",
          imgUrl: "../../../img/banner4.png"
        },
        {
          title: "西班牙“陶氏益农公司”",
          text: "美国陶氏益农公司是领先世界的五大农药跨国公司之一，是美国第一大化学公司－陶氏化学的全资子公司。",
          time: "2018.10.08",
          read: "188",
          imgUrl: "../../../img/banner4.png"
        },
        {
          title: "西班牙“陶氏益农公司”",
          text: "美国陶氏益农公司是领先世界的五大农药跨国公司之一，是美国第一大化学公司－陶氏化学的全资子公司。",
          time: "2018.10.08",
          read: "188",
          imgUrl: "../../../img/banner4.png"
        },
        {
          title: "西班牙“陶氏益农公司”",
          text: "美国陶氏益农公司是领先世界的五大农药跨国公司之一，是美国第一大化学公司－陶氏化学的全资子公司。",
          time: "2018.10.08",
          read: "188",
          imgUrl: "../../../img/banner4.png"
        },
        {
          title: "西班牙“陶氏益农公司”",
          text: "美国陶氏益农公司是领先世界的五大农药跨国公司之一，是美国第一大化学公司－陶氏化学的全资子公司。",
          time: "2018.10.08",
          read: "188",
          imgUrl: "../../../img/banner4.png"
        },
        {
          title: "西班牙“陶氏益农公司”",
          text: "美国陶氏益农公司是领先世界的五大农药跨国公司之一，是美国第一大化学公司－陶氏化学的全资子公司。",
          time: "2018.10.08",
          read: "188",
          imgUrl: "../../../img/banner4.png"
        }
      ];
      var newListHTML = "";
      for (let i = 0; i < newListData.length; i++) {
        newListHTML += `<li>
                <a href="../qytjxq/qytjxq.html">
                    <div class="newList">
                        <div class="img">
                            <img src="${newListData[i].imgUrl}" alt="">
                        </div>
                        <div class="text">
                            <h2>
                            ${newListData[i].title}
                            </h2>
                            <p>${newListData[i].text}</p>
                            <p>
                                <span class="time">${newListData[i].time}</span>
                                <span class="read">阅读 ${
                                  newListData[i].read
                                }</span>
                            </p>
                        </div>
                    </div>
                </a>
            </li>`;
      }
      $("#newListHTML").html(newListHTML);
      if (myScroll) {
        myScroll.refresh();
      }
    }
  };
  farmers.init();

  var mySwiper = new Swiper(".swiper-container", {
    autoplay: 3000,
    loop: true,
    speed: 1000,
    // slidesPerView: 'auto',
    pagination: ".swiper-pagination",
    autoplayDisableOnInteraction: false,
    centeredSlides: true
  });

  var mySwiper1 = new Swiper(".swiper-menu", {
    slidesPerView: 2.4,
    // centeredSlides: true,
    // freeMode: true
    // freeModeMomentum: false,
    // freeModeMomentum: false,
  });
});