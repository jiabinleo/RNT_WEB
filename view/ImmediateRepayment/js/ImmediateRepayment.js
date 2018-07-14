(function(){
    var Imm = {
        init : function(){
            var z = 1;
            var s = 100;
            var times;
            $(".ImWrap").on("click",".Impre",function(){
                times = setInterval(function(){
                    z--
                    s--
                    $("#ImmSection").css("marginLeft",-s+"%")
                    if (s<=0 || z==1) {
                        clearInterval(times)
                    }
                },1)
                
            })
            $(".ImWrap").on("click",".ImNext",function(){
                times = setInterval(function(){
                    z++
                    s++
                    $("#ImmSection").css("marginLeft",-s+"%")
                    if (s>=200 || z==1) {
                        clearInterval(times)
                    }
                },1)
            })
            $(".playButton").on("click",function(){
                console.log("ppp")
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
                            window.location.href="/view/playsuc/playsuc.html";
                        }, 1000);
                    }
                }
                
            });
        }
    }
    Imm.init()
})()