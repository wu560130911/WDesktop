Ext.define('MovieApp.MusicApp.model.UserModel', {
    extend: 'Ext.data.Model',
    fields: [{
    	name:'uid',
    	type:'string',
    	srotable:true
    },{
        name: 'name',
        type: 'string',
        srotable:true
    },{
        name: 'birthplace',
        type: 'string',
        srotable:true
    },{
        name: 'birthday',
        type: 'string',
        srotable:true
    },{
        name: 'email',
        type: 'string',
        srotable:true
    }],
    belongsTo:'MovieApp.MusicApp.model.MusicModel'
});