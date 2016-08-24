/**
 * Created by Administrator on 2015/9/13.
 */

$(function() {
    var li = new Array();

    var $li0 = $("#navi ul li");//导航
    var $li1 = $(".ft_content_ul li");//下方排名
    var $li2 = $("#service_tog li");//新手service
    var $li3 = $("#about_us_lt ul li");//关于我们
    var $li4 = $(".sect_left1 ul li a");//我要投资
    var $li5 = $(".dw_convert ul li");//详情页
    var $li6 = $(".page li");//page

    li[0] = $li0;
    li[1] = $li1;
    li[2] = $li2;
    li[3] = $li3;
    li[4] = $li4;
    li[5] = $li5;
    li[6] = $li6;
    for (var i = 0; i < li.length; i++) {
        li[i].each(toggle);
    }
    /***下方小图***/
///page 单独
        for(var j=0;j<$li6.length;j++){
            $li6[j].onmouseover=function(){
               $(this).children("a").css({
                   color:"#fff"
               })
                }
            $li6[j].onmouseout=function(){
                $(this).children("a").css({
                    color:"#3e3a39"
                })
            }
            }

//点击播放
    var left;
    var timer;

    function move() {
        left=0;
        var speed=5;
        timer = setInterval(function () {
            left-=speed;

            $(".ft_cot_md div ul").css(
                "left",left+"px"
            )
            if(left==-1070){
                left=0;
            }
        }, 100);
    }

    move();


    /*UL监听事件 over停止*/

    $(".ft_cot_md div ul").mouseover(function(){
        clearInterval(timer);
    }).mouseout(function(){
        move();
    })

    $(".lt_aspan,.rt_aspan").mouseover(function(){
        $(".ft_cot_md div ul").attr("style","left:0");
        clearInterval(timer)
    }).mouseout(function(){
            move();
        }
    );
    $(".lt_aspan,.rt_aspan").bind("click",function(){
        left-=153;
        $(".ft_cot_md div ul").css(
            "left",left+"px"
        )
        if(left<=-1071){
            left=0;
        }
    })

})
function toggle() {

    $(this).bind("mouseover", function () {
        $(this).parent().children().attr("class", '');
        $(this).addClass("current");
    })
}
/*******************右侧悬浮窗************************/
$(function(){
    var $hover=$("#index_hover li");
    $hover.each(changeImage);




    $(document).scroll(function(){
        var y=$(window).height();
        var y1=$('.hover_win').height();
        var y2=$('#fix').height();
        if($(this).scrollTop()>=200){
            $('.hover_win').css({
                top:(y-y1)/2+"px"
            })
            $("#returnup").css({
                display:"block"
            })
            $('#fix_four').css({
                display:"block"
            })
        }else{
            $('#returnup').css({
                display:"none"
            })
            $('#fix_four').css({
                display:"none"
            })
        }

    })
    $("#index_hover li:last,#fix_four a").click(function(){
        $("html,body").animate({
            scrollTop:0
        },1000)
    })
/*页脚hover小效果*/
    $("#care .list_for").mouseover(function(){
        $(this).children("i").css({
            display:"block",
           bottom:0,left:40
        })
    }).mouseout(function(){
        $(this).children("i").css({
            display:"none"
        })
    })

});
function changeImage(){
    var src=$(this).children("p").children("img").attr("src");
    $(this).mouseover(function(){
        var num=src.indexOf(".");
        var newSRC=src.slice(0,num)+"-hover.png";
        $(this).children("p").children("img").attr("src",newSRC);
        $(this).children("div").addClass("current");
        $(this).children("span").addClass("current");
    }).mouseout(function(){
        $(this).children("p").children("img").attr("src",src);
        $(this).children("div").removeClass("current");
        $(this).children("span").removeClass("current");
    })
}
/*************************************/
$(function(){
    $("#point_product").mouseover(function(){
        $("#piont_pro>s").css({
            "background-position":"-220px -260px"
        });
        $("#piont_pros").css("display","block");
        $("#point_product").css("cursor","pointer");
    });
    $("#point_product").mouseout(function(){
        $("#piont_pro>s").css("background-position","-220px -230px");
        $("#piont_pros").css("display","none");
        $("#piont_pros>ul>li").css("opacity","0.7");
    });
    $("#piont_pros>ul>li").mouseover(function(){
        $("#piont_pros>ul>li").css("opacity","0.7");
        var $li= $(this);
        $li.css("opacity","1");
    });
    $("#point_index_content #f2_con ul li").mouseover(function(){
        $("#point_index_content #f2_con ul li").css({
            "background-color":"#fff",
            "border":"1px solid #EFEFEF"
        });
        $(this).css({
            "background-color":"#f2f2f2",
            "border":"1px solid #E6E6E6"
        });
        $(this.querySelector("img")).attr("src","images/shuib-big-hui.png");
        $(this.querySelector("b")).css("display","block");
        $(this.querySelector("i")).css("display","block");

    });
    $("#point_index_content #f2_con ul li").mouseout(function(){
        $("#point_index_content #f2_con ul li").css({
            "background-color":"#fff",
            "border":"1px solid #EFEFEF"
        });
        $(this.querySelector("img")).attr("src","images/shuib-big.png");
        $(this.querySelector("b")).css("display","none");
        $(this.querySelector("i")).css("display","none");
    });
    $("#f1_address>ul>li").click(function(){
        if(this.querySelectorAll("li").length== 1){
            $("#f1_address li").remove(".ads_li1");
            $("#f1_address li").remove(".ads_li3");
            $("#f1_address li").remove(".ads_li4");
            $("#f1_address>ul>li").attr("class","ads_ul2");
            $("#f1_address>ul>li").last().attr("class","ads_ul3");

            $(this.querySelector("ul>li")).before("<li class='ads_li1'><s></s>寄送至</li>");
            $(this.querySelector("ul")).append("<li class='ads_li3'><a href='#'>设置为默认收货地址</a></li>");
            $(this.querySelector("ul")).append(" <li class='ads_li4'><a href='#'>修改本地址</a></li>");

            this.setAttribute("class","ads_ul1");
        }
    });
	//新添
	$("#a_fir1,#a_two1,#a_thr1").mouseover(function(){
		$("#a_fir2,#a_two2,#a_thr2,#a_fou2").css("display","none");
		var ids=$(this).attr("id");
		var newid=ids.substring(0,ids.length-1)+"2";
		$("#"+ids).css("display","none");
		$("#"+newid).css("display","block");
	});
	$("#a_fir2,#a_two2,#a_thr2").mouseout(function(){
		$("#a_fir1,#a_two1,#a_thr1,#a_fou1").css("display","block");
		var ids=$(this).attr("id");
		var newid=ids.substring(0,ids.length-1)+"1";
		$("#"+ids).css("display","none");
		$("#"+newid).css("display","block");
	});

	$("#a_fir2,#a_two2,#a_thr2").mouseover(function(){
		$("#a_fir2,#a_two2,#a_thr2,#a_fou2").css("display","none");
		var ids=$(this).attr("id");
		var newid=ids.substring(0,ids.length-1)+"1";
		$("#"+ids).css("display","block");
		$("#"+newid).css("display","none");
	});
	$("#a_fir1,#a_two1,#a_thr1").mouseout(function(){
		$("#a_fir1,#a_two1,#a_thr1,#a_fou1").css("display","block");
		var ids=$(this).attr("id");
		var newid=ids.substring(0,ids.length-1)+"2";
		$("#"+ids).css("display","block");
		$("#"+newid).css("display","none");
	});
});
/**************************悬浮小窗****************************/
$(function(){
    var arr =new Array();
    arr[0] = $(".ft_content_ul li");//下方排名
    arr[1] = $(".dw_convert ul li");//详情页

    /*切换DIV*/
    for(var i=0;i<arr.length;i++){
    arr[i].each(function(i){
        $(this).bind("mouseover",function(){
            $(this).parent().children().attr("class", '');
            $(this).addClass("current");
            var $div = $(this).parent().parent().children("div");
            $div.attr("class","");
            $div[i].setAttribute("class","current");
        })
    })
    }
})
/***************遮罩***************/
$(function(){
$("#ads_ul3").click(function(){
    $("#address,#add_address").css("display","block");
});
$("#x").click(function(){
    $("#address,#add_address").css("display","none");
});
})