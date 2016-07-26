define(["text!../../tpl/park.html"],function(html){
	function reader2(){
		$("#td").html(html);
	}
	return {
		reader2:reader2
	}
})