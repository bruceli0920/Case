define(["text!../../tpl/home.html"],function(html){
	function reader1(){
			$("#td").html(html);
				
		
	}
	
	/*function func1 (callback){
		var alertmes="";
		wx.ready(function () {
		  		wx.getLocation({
			        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			        success: function (res) {
	                	var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
	                	var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
	               		var speed = res.speed; // 速度，以米/每秒计
	                	var accuracy = res.accuracy; // 位置精度
	                	// alertmes=latitude+"|"+longitude;
	                	alert(latitude+"|"+longitude);
	            	},
		            fail:function(){
		              alert('fail');
		            }
	        	});
	    	});
	}*/
	return {
		reader1:reader1
	}
})


