require.config({
	baseUrl:"lib",
	paths:{
		jquary:"jquery",
		backbone:"backbone",
		underscore:"underscore",
		text:"text"
	}
});


require(["jquery","mod/router.js"],function($){
	Backbone.history.start();
})
