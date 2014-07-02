Ext.define("MovieApp.MusicApp.store.MusicStore",{
	extend:"Ext.data.Store",
	model:"MovieApp.MusicApp.model.MusicModel",
	autoLoad : true,
	operation :'',
	proxy:{
		api:{
			title:"music_title.action",  
		},
		type:"ajax",
		url:"music_list.action",
		reader:{
			type:"json",
			root:"musics",
			totalProperty :'total'
		},
		writer:{
			type:"json"
		}
	}
});