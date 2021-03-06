(function () {
  pageNum = 1,
    pageSize = 5,
    statusId = null,
    total = 0,
    policyList = {
      init: function () {
        if (my_token) {} else {
          tool.loginPrompt()
        }
        $("#center").click(function () {
          $(".masked").addClass(" maskeds");
          $(".personalCente").addClass(" peractive");
        });
        $(".masked").click(function () {
          $(".masked").removeClass(" maskeds");
          $(".personalCente").removeClass(" peractive");
        });
        $(document).on("click", "#user_quit", function () {
          sessionStorage.setItem("my_token", '');
          window.open("../../../login.html", "_self");
        });
        $(document).on('click', '#userImg', function () {
          $('#img').attr('src', $(this).attr('src'))
          $('#img').show()
          $('#mask').show()

        })
        $(document).on('click', '#mask', function () {
          $(this).hide()
          $('#img').hide()
        })
        $(document).on('click', '#img', function (e) {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            window.event.returnValue == false;
          }
          return false
        })
        $(document).on('click', '#_tuichu', function () {
          window.open("../../../login.html", "_self");
        })
        $(document).on('touchstart', '#personalCente_content li', function () {
          $(this).find('.me')
            .addClass("active")
          $(this).siblings().find('.me')
            .removeClass("active");
        })
        $(document).on('click', '#personalCente_content li', function () {
          let ids = $(this).attr('ids')
          if (my_token) {
            window.open(`../../grzx/${ids}/${ids}.html`, `_self`);
          } else {
            tool.loginPrompt()
          }
        })
        $(document).on('click', 'footer .n', function () {
          if (my_token) {
            window.open(`../../policyPage/policyList/policyList.html`, `_self`);
          } else {
            tool.loginPrompt()
          }
        })
        $(document).on('click', "#user_logo", function () {
          if (my_token) {
            window.open(`../../grzx/grzl/grzl.html`, `_self`);
          } else {
            tool.loginPrompt()
          }
        })
        //获取菜单
        $.ajax({
          url: localhost50010 + "/policy/baoDanZhuangTai",
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
              policyList.menu(result.data.list);
            } else if (result.code === "9") {
              tool.loginPrompt()
            }
          },
          error: function (error) {}
        });
        policyList.listen();
        //获取用户信息
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
          success: function (result) {
            if (result.code === "0") {
              if (result.data.user.userName) {
                $("#user_name").html(result.data.user.userName)
              } else {
                $("#user_name").html('悦农通')
              }
              $("#userImg").attr("src", imgUrl + result.data.user.icon)
              if (result.data.user.sign) {
                $("#user_personalized").html(`<p>${result.data.user.sign}</p>`)
              }
            }
          },
          error: function (error) {
            console.log(error)
          }
        })
      },
      listen: function () {
        $(document).on("touchstart", "#menu >li", function () {
          total = 0;
          statusId = $(this).attr("data-status");
          $.cookie("statusId", statusId, {
            expires: 7
          });
          $("#listHTML").html("");
          pageNum = 1;
          policyList.getList(statusId, pageNum, pageSize);
          $(this)
            .addClass("active")
            .siblings()
            .removeClass("active");
        });
        setTimeout(() => {
          var minY = null;
          try {
            myScroll.on("scrollStart", function () {
              minY = this.y;
              $("#loadingTxt").html("加载更多..");
            });

            myScroll.on("scroll", function () {
              minY = minY < this.y ? minY : this.y;
            });

            myScroll.on("scrollEnd", function () {
              minY = minY < this.y ? minY : this.y;
              setTimeout(() => {
                $("#loadingTxt").html("");
              }, 5000);
              if (this.y == this.maxScrollY) {
                pageNum++;
                policyList.getList(statusId, pageNum, pageSize);
              }
            });
          } catch (error) {}
        }, 3000);
        //删除
        $(document).on("click", ".cancel", function (event) {
          window.event ?
            (window.event.cancelBubble = true) :
            event.stopPropagation();
          var $lis = $(this)
            .parent()
            .parent()
            .parent();
          var id = $lis.attr("data-id");
          $.ajax({
            url: localhost50010 + "/policy/cancel/" + id,
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
                console.log(result);
                $lis.remove();
              }
            },
            error: function (error) {}
          });
        });

        $(document).on("click", ".lisImg", function () {
          if (
            $(this)
            .parent()
            .attr("status") == "1"
          ) {
            window.open(
              `../../homePage/insure/insureqr.html?policyId=` +
              $(this).attr("data-id"),
              "_self"
            );
          } else {
            window.open(
              `../policyDetails/policyDetails.html?id=` +
              $(this).attr("data-id"),
              "_self"
            );
          }
        });
      },
      menu: function (data) {
        statusId = data[0].id;
        policyList.getList(statusId, pageNum, pageSize);
        var menuHTML = "";
        for (let i = 0; i < data.length; i++) {
          menuHTML += `<li data-status="${data[i].id}">
                        <span>${data[i].text}</span>
                    </li>`;
        }
        $("#menu").html(menuHTML);
        $("#menu")
          .find("li")
          .eq(0)
          .addClass("active");
      },
      getList: function (statusId, pageNum, pageSize) {
        if ($.cookie("statusId")) {
          statusId = $.cookie("statusId");
        }
        $.ajax({
          url: localhost50010 +
            "/policy/getPage?status=" +
            statusId +
            "&pageNum=" +
            pageNum +
            "&pageSize=" +
            pageSize,
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
              policyList.listHTML(result.data);
              $("li[data-status='" + statusId + "']")
                .addClass("active")
                .siblings()
                .removeClass("active");
            }
          },
          error: function (error) {}
        });
      },
      listHTML: function (data) {
        var listHTML = "",
          pageData = data.page.rows;
        total += pageData.length;
        if (myScroll) {
          myScroll.refresh();
        }
        if (total > data.page.total) {
          $("#loadingTxt").html("没有新数据");
          return;
        }
        for (let i = 0; i < data.page.rows.length; i++) {
          var acreage = null,
            danjia = null,
            zongjia = null,
            termStart = null,
            termEnd = null;
          parseFloat(data.page.rows[i].acreage) ?
            (acreage = parseFloat(data.page.rows[i].acreage)) :
            (acreage = "-");
          parseFloat(data.page.rows[i].danjia) ?
            (danjia = parseFloat(data.page.rows[i].danjia)) :
            (danjia = "-");
          parseFloat(data.page.rows[i].zongjia) ?
            (zongjia = parseFloat(data.page.rows[i].zongjia).toFixed(2)) :
            (zongjia = "-");
          data.page.rows[i].termStart ?
            (termStart = data.page.rows[i].termStart) :
            (termStart = "-");
          data.page.rows[i].termStart ?
            (termEnd = data.page.rows[i].termStart) :
            (termEnd = "-");
          if (data.page.rows[i].status === "1") {
            var cancel = "<span class=cancel>删除</span>";
          } else {
            var cancel = "";
          }
          listHTML += `<div data-id="${
            data.page.rows[i].id
          }" class="lis" status=${data.page.rows[i].status}>
                                    <div class="left lisImg" data-id="${
                                      data.page.rows[i].id
                                    }">
                                        <img src="${imgUrl +
                                          data.page.rows[i]
                                            .icon}" onerror="javascript:this.src='../../../img/error.png" alt="policy01">
                                    </div>
                                    <div class="right">
                                        <h2>${data.page.rows[i].insuranceName +
                                          cancel}</h2>
                                        <p>时效 : ${termStart}-${termEnd}</p>
                                        <p>保费 : ${danjia}元/亩</p>
                                        <p>面积 : ${acreage}亩${policyList.status(
            data.page.rows[i].status
          )}</p>
                                        <p class="maxRight"><span>${zongjia}</span>/元</p>
                                    </div>
                                </div>
                                <div class="line">

                                </div>`;
        }
        $("#listHTML").append(listHTML);
        if (myScroll) {
          myScroll.refresh();
        }
      },
      status: function (sta) {
        var str = "-";
        switch (sta) {
          case "1":
            str = '<span class="minRight red">待支付</span>';
            break;
          case "2":
            str = '<span class="minRight blue">正在生效</span>';
            break;
          case "3":
            str = '<span class="minRight gray">已理赔</span>';
            break;
          case "4":
            str = '<span class="minRight gray">已终止</span>';
            break;
          default:
            str = "-";
            break;
        }
        return str;
      }
    };
  policyList.init();
})();