(function(){
    var policyList = {
        init:function(){
            $(".top ul").on("click","li",function(){
                var thisClass = $(this).find("span")[0].className;
                $(".list").css("display","none");
                $(this).addClass("active").siblings().removeClass("active");
                switch (thisClass) {
                    case "quanbu":
                        $(".list1").css("display","block");
                        break;
                    case "daizhifu":
                        $(".list2").css("display","block");
                        break;
                    case "shengxiao":
                        $(".list3").css("display","block");
                        break;
                    case "lipei":
                        $(".list4").css("display","block");
                        break;
                    case "zhongzhi":
                        $(".list5").css("display","block");
                        break;
                    default:
                        break;
                }
            })
        }
    }
    policyList.init()
})()