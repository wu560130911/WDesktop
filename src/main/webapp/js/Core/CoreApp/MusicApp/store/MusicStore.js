Ext.define("Core.MusicApp.store.MusicStore",{
	extend:"Ext.data.Store",
	model:"Core.MusicApp.model.MusicModel",
	autoLoad : true,
	proxy:{
		api:{
			title:"music_title.action",  //后台处理删除的url地址
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