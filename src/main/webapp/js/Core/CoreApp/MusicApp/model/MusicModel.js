Ext.define('Core.MusicApp.model.MusicModel', {
    extend: 'Ext.data.Model',
    fields: [{
    	name:'id',
    	type:'int',
    	srotable:true
    },{
        name: 'title',
        type: 'string',
        srotable:true
    },{
        name: 'singer',
        type: 'string',
        srotable:true
    },{
        name: 'year',
        type: 'int',
        srotable:true
    },{
        name: 'type',
        type: 'string',
        srotable:true
    },{
        name: 'duration',
        type: 'int',
        srotable:true
    },{
        name: 'size',
        type: 'int',
        srotable:true
    },{
        name: 'description',
        type: 'string',
        srotable:true
    },{
        name: 'time',
        type: 'string',
        srotable:true
    }],
    hasMany:'UserModel'
});