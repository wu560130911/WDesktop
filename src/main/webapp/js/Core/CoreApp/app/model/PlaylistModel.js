Ext.define("Core.app.model.PlaylistModel", {
	extend : "Ext.data.Model",
	fields : [ {
		name : "id",
		type : "string"
	}
	// {name:'iconCls',defaultValue:'video_play_list'}
	],
	hasMany : [{
		model : 'MovieApp.MusicApp.model.UserModel',
		name : 'user'
	},{
		model : 'MovieApp.MovieApp.model.MovieModel',
		name : 'movie'
	}]
});