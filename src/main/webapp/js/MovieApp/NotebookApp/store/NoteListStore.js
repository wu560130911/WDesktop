Ext.define("MovieApp.NotebookApp.store.NoteListStore",{
	extend:"Ext.data.Store",
	model:"MovieApp.NotebookApp.model.NotebookModel",
	autoLoad : false,
	proxy:{
		type:"ajax",
		url:"note_list.action",
		reader:{
			type:"json",
			root:"notes",
			totalProperty :'total'
		},
		writer:{
			type:"json"
		}
	}
});