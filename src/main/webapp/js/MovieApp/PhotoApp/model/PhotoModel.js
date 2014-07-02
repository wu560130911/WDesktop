Ext.define('MovieApp.PhotoApp.model.PhotoModel',{
	extend: 'Ext.data.Model',
	fields :[{
		name:'name'
	},{
		name:'type'
	},{
		name:'size',
		type:'float'
	},{
		name:'lastmod',
		type:'date',
		dateFormat : 'timestamp'
	},{
		name : 'file'
	},{
		name : 'src'
	}]
});