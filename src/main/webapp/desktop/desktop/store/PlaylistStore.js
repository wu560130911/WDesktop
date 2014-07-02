Ext.define('Wdesktop.desktop.store.PlaylistStore', {
	extend : 'Ext.data.Store',
	requires : [ 'Wdesktop.desktop.model.PlaylistModel' ],
	autoLoad : false,
	model : 'Wdesktop.desktop.model.PlaylistModel',
	proxy : {
		type : "ajax",
		url : "movieplaylist_list.action",
		reader : {
			type : "json",
			root : "datas"
		}
	}
});