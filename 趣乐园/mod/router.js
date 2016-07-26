define(["backbone"],function(){
	var Router=Backbone.Router.extend({
		routes:{
			"home":"home",
			"park":"park",
			"enjoycard":"enjoycard",
			"mine":"mine",
			"*index":"index"
		},
		home:function(){
			require(["mod/home.js"],function(aa){
				aa.reader1();
			})
		},
		park:function(){
			require(["mod/park.js"],function(aa){
				aa.reader2();
			})
		},
		enjoycard:function(){
			require(["mod/enjoycard.js"],function(aa){
				aa.reader3();
			})
		},
		mine:function(){
			require(["mod/mine.js"],function(aa){
				aa.reader4();
			})
		},
	 	index: function() {
	    	location.hash="home"
	    }
	});
	var router=new Router();
	return router;
})