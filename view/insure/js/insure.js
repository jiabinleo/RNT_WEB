$(function(){
    var insure = {
        init : function(){
            $("#playFooter").on("click",function(){
                $("#insure_wrap").css("display","block")
                $("#insure_inner").css("display","block")
            })
            $("#insureClose").on("click",function(){
                $("#insure_wrap").css("display","none")
                $("#insure_inner").css("display","none")
            })
            $(".insure_play_bottom").on("click",function(){
                $("#insure_inner").css("display","none")
                $("#insure_inner2").css("display","block")
            })
            $("#insureClose2").on("click",function(){
                $("#insure_wrap").css("display","block")
                $("#insure_inner").css("display","block")
                $("#insure_inner2").css("display","none")
                for(var i=0;i<6;i++){
                    $(".mima input").eq(i).val("")
                }
            })
            
            var pwdarr = [];
            var pwdarrs = ["1","2","3","4","5","6"]
            $(".mima").on("click",function(){
                $(".mima input").eq(0).focus()
                pwdarr = [];
            })
            var pwss =true;
			$(".mima > input").on("input", function() {
                $(this).val($(this).val().trim().substr(0, 1))
                pwdarr.push($(this).val().trim().substr(0, 1))
                if($(this).next().length){
                    $(this).next().focus()
                }else{
                    if(pwdarr.length = 6){
                        setTimeout(() => {
                            window.location.href="/project/view/playsuc/playsuc.html";
                        }, 1000);
                    }
                }
                
            });
            
        }
    }
    insure.init()
})