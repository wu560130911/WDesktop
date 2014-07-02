Ext.define('Core.apps.MovieListApp', {
	extend : 'Ext.ux.desktop.Module',
	requires : [ "Core.app.model.SelectTypeModel" ],
	id : 'wms_movie_list',
	init : function() {
		this.launcher = {
			text : '电影列表',
			iconCls : 'wms_movie_list',
			handler : this.createWindow,
			scope : this
		};
	},
	createWindow : function() {
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('wms_movie_list');
		Ext.require([ 'Core.MovieApp.controller.MovieController' ]);
		MainController
				.getController('Core.MovieApp.controller.MovieController')
				.init();
		if (!win) {
			win = Ext.create('Ext.window.Window',{
				id : 'wms_movie_list',
				title : '电影列表',
				width : 680,
				height : 480,
				iconCls : 'wms_movie_list',
				border : false,
				hideMode : 'offsets',
				closable : true,
				closeAction : "destroy",
				layout : "fit",
				items : [
					{xtype : 'movieadd'}
				]
			});
		}
		;
		win.show();
		return win;
	}
});