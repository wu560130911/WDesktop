Ext.define('Core.MovieApp.model.MovieModel', {
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
        name: 'author',
        type: 'string',
        srotable:true
    },{
        name: 'actor',
        type: 'string',
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
        name: 'madetime',
        type: 'string',
        srotable:true
    },{
    	name: 'time',
        type: 'string',
        srotable:true
    }]
});