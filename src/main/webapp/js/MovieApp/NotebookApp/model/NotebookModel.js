Ext.define('MovieApp.NotebookApp.model.NotebookModel', {
    extend: 'Ext.data.Model',
    fields: [{
    	name:'id',
    	type:'int',
    	srotable:true
    },{
        name: 'description',
        type: 'string',
        srotable:true
    },{
        name: 'type',
        type: 'string',
        srotable:true
    },{
        name: 'weather',
        type: 'string',
        srotable:true
    },{
        name: 'mood',
        type: 'string',
        srotable:true
    },{
        name: 'notedate',
        type: 'string',
        srotable:true
    },{
        name: 'writetime',
        type: 'string',
        srotable:true
    }],
    hasMany:{model: 'MovieApp.MusicApp.model.UserModel', name: 'user'}
});