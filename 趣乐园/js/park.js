var btns=$("div",$(".top"));
var lis1=$("div",$(".topbot"));
var lis2=$(".hided");
//上方按钮点击效果
btns.each(function(index){
	$(this).click(function(){
		lis1.css("background","#fff");
		lis2.not(lis2.eq(index)).hide();
		lis1.eq(index).css("background","#EC6D65");
		lis2.eq(index).toggle();
	})
})
//关闭下拉列表
lis2.each(function(index){
	$(this).click(function(e) {
		var xx = e.originalEvent.x || e.originalEvent.layerX || 0; 
		var yy = e.originalEvent.y || e.originalEvent.layerY || 0;
		var ulh=$("ul",$(this)).height();
		if(yy>ulh+45){
			lis2.hide();
		}
	});
}) 
//动态创建图片与信息
function turn (pis,count) {
	$.ajax({
		url:"data/"+pis+".json",
		type:"get",
		async:true,
		success:function(data){
			for(var i=0;i<count;i++){
				$("<div class='row lili'></div>").append($("<div class='col-xs-12 showlist'></div>")
					.append($("<a href='info.html' target='_parent'></a>")
						.append("<img src='img/lexiang.png' id='lexiang'/>")
						.append($("<img class='load-img' src='img/1.jpg' data-src='"+data.data[i].img+"'/>"))
						.append($("<div class='imginfo'></div>")
							.append($("<p>"+data.data[i].name+"</p>").append("<img src='img/position.png' id='position'/>"))
							.append($("<p>"+data.data[i].address+"<span>"+data.data[i].dist+"公里</span></p>"))
						)
					)
				)
				.appendTo($("#td"));
			}
			$("#td>.row").eq(2).css("margin-top","43px");
		}
	})
}
//调用
$(window).ready(turn("leyuan",40));
$(".dongcheng").click(function(){
	$(".lili").remove();
	turn("p21",11);
	lis2.hide();
});
$(".xicheng").click(function(){
	$(".lili").remove();
	turn("p22",15);
	lis2.hide();
});
$(".chongwen").click(function(){
	$(".lili").remove();
	turn("p23",22);
	lis2.hide();
});
$(".xuanwu").click(function(){
	$(".lili").remove();
	turn("p24",23);
	lis2.hide();
});
$(".chaoyang").click(function(){
	$(".lili").remove();
	turn("p26",18);
	lis2.hide();
});
$(".else").click(function(){
	$(".lili").remove();
	turn("leyuan",40);
	lis2.hide();
});





