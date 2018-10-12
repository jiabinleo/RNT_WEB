$(function () {
    var indexPage = {
        init: function () {
            indexPage.listen();
        },
        listen: function () {
            var my_token = sessionStorage.getItem("my_token")
            $.ajax({
                url: localhost + "/index/bannerList?category=index",
                type: "get",
                // beforeSend: function (xhr) {
                //     xhr.setRequestHeader("login_token", my_token);
                // },
                success: function (data) {
                    if (data.code === "0") {
                        indexPage.banner(data.data.bannerList)
                    }
                },
                error: function (err) {}
            });

            $.ajax({
                url: localhost + "/index/menuList",
                type: "get",
                // beforeSend: function (xhr) {
                //     xhr.setRequestHeader("login_token", my_token);
                // },
                success: function (data) {
                    if (data.code === "0") {
                        indexPage.menu(data.data.menuList)
                    }
                },
                error: function (err) {}
            });



            $("#center").click(function () {
                $(".masked").addClass(" maskeds");
                $(".personalCente").addClass(" peractive");
            });
            $(".masked").click(function () {
                $(".masked").removeClass(" maskeds");
                $(".personalCente").removeClass(" peractive");
            });
            $(".personalCente_content > ul > li").click(function () {
                $(this)
                    .addClass("active")
                    .siblings()
                    .removeClass("active");
            });
            $("#userImg").attr("src", JSON.parse(sessionStorage.getItem("imgUrl")));
            $("#user_name").html(JSON.parse(sessionStorage.getItem("userName")));
            $(document).on("click", "#user_quit", function () {
                window.open("login.html", "_self");
            });


        },
        banner: function (bannerList) {
            var bannerHTML = "";
            for (let i = 0; i < bannerList.length; i++) {
                bannerHTML +=
                    `<div class="swiper-slide">
                        <img src="${imgUrl+bannerList[i].bannerImg}" alt="${bannerList[i].bannerName}">
                    </div>`;
            }
            $("#banner").html(bannerHTML);
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
        menu: function (menuList) {
            console.log(localhost)
            var menuHTML = "";
            for (let i = 0; i < menuList.length; i++) {
                console.log(`view/homePage/${menuList[i].code}/${menuList[i].code}.html`)
                menuHTML +=
                    `<li>
                        <a href="view/homePage/${menuList[i].code}/${menuList[i].code}.html">
                            <div>
                                <img src="${imgUrl+menuList[i].icon}" alt="${menuList[i].title}">
                                <p>${menuList[i].title}</p>
                            </div>
                        </a>
                    </li>`
            }
            $("#menuHTML").html(menuHTML)

        }
    };


    indexPage.init();

});