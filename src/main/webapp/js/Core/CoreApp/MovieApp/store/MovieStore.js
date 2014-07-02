Ext.define("Core.MovieApp.store.MovieStore",{
	extend:"Ext.data.Store",
	model:"Core.MovieApp.model.MovieModel",
	autoLoad : true,
	proxy:{
		type:"ajax",
		url:"movie_list.action",
		reader:{
			type:"json",
			root:"movies",
			totalProperty :'total'
		},
		writer:{
			type:"json"
		}
	}
});