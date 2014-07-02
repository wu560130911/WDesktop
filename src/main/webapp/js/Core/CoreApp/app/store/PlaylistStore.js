Ext.define('Core.app.store.PlaylistStore', {
	extend : 'Ext.data.Store',
	requires : [ 'Core.app.model.PlaylistModel' ],
	autoLoad : false,
	model : 'Core.app.model.PlaylistModel',
	proxy : {
		type : "ajax",
		url : "movieplaylist_list.action",
		reader : {
			type : "json",
			root : "datas"
		}
	}
});