<?php
session_start();
require "./JSSDK.php";
$jssdk = new JSSDK("wx8c785a743a168b08", "15535bfc631d77dbf7c7c5fe59a09959 ");
$signPackage = $jssdk->getSignPackage();
// print_r($_SESSION);
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<title></title>
		<link rel="stylesheet" type="text/css" href="css/reset.css"/>
		<link rel="stylesheet" type="text/css" href="css/bootstrap.css"/>
		<link rel="stylesheet" type="text/css" href="css/bot.css"/>
		<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
		<script>
		  wx.config({
		    appId: '<?php echo $signPackage["appId"];?>',
		    timestamp: <?php echo $signPackage["timestamp"];?>,
		    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
		    signature: '<?php echo $signPackage["signature"];?>',
		    jsApiList: [
		      'getLocation'
		    ]
		  });
		  wx.error(function(res){
		      alert(JSON.stringify(res));
		    })
			wx.ready(function () {
		  		wx.getLocation({
			        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			        success: function (res) {
	                	var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
	                	var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
	               		var speed = res.speed; // 速度，以米/每秒计
	                	var accuracy = res.accuracy; // 位置精度
	                	// alertmes=latitude+"|"+longitude;
	                	alert("您所处位置的经度："+latitude+" 纬度："+longitude);
	            	},
		            fail:function(){
		              alert('fail');
		            }
	        	});
	    	});
	  		
		</script>
	</head>
	<body>
		<div class="cover">
			<div id="po"></div>
			
		</div>
		<div id="td">
			<!-- <button id="btnn">ssssss</button> -->
		</div>
		<nav class="navbar navbar-default navbar-fixed-bottom navbottom">
			<div class="container-fluid ccc">
				<ul class="row navbottomul">
					<li class="col-xs-3">
						<a href="#/home" title="0" class="ttt">
							<span class="glyphicon glyphicon-home"></span>
							<p>首页</p>
						</a>
					</li>
					<li class="col-xs-3">
						<a href="#/park" title="1">
							<span class="glyphicon glyphicon-tower"></span>
							<p>乐园</p>
						</a>
					</li>
					<li class="col-xs-3">
						<a href="#/enjoycard" title="2">
							<span class="glyphicon glyphicon-credit-card"></span>
							<p>乐享卡</p>
						</a>
					</li>
					<li class="col-xs-3">
						<a href="#/mine" title="3">
							<span class="glyphicon glyphicon-user"></span>
							<p>我的</p>
						</a>
					</li>
				</ul>
			</div>
		</nav>
		<script data-main="main" src="lib/require.js" defer="defer" async="true"></script>
		<script src="js/jquery-2.2.3.js"></script>

		<script>
			//加载页效果
			var re = function() {
				$(".cover").css("animation", "sli 1s 2s 1 forwards");
			}
			$(document).ready(function(){
				if (window.name == "") {
					re();
					// alert(alertmes);
					window.name = "h";
				} else {
					$(".cover").css("display", "none");
				}
			})
			
			 
	</body>
</html>
