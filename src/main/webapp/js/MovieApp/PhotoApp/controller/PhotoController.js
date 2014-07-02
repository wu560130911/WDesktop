Ext.define('MovieApp.PhotoApp.controller.PhotoController', {
	extend : 'Ext.app.Controller',
	init : function() {
	},
	models : ['PhotoModel'],
	stores : [ 'PhotoStore' ],
	views : [ "PhotoView" ]
});