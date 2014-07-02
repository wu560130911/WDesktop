Ext.define('MovieApp.MovieApp.view.MovieImage', {
    extend: 'Ext.Img',
    alias : "widget.movieimage",
    height: 180,
    width: 270,
    src:'MovieImages/MovieImage.png',
    page:0,
    baseUrl:'MovieImages/',

    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            
        });
        me.callParent(arguments);
    },
    
    afterRender : function() {
		var me = this;
		me.getEl().on('contextmenu', function (e) {
            e.stopEvent();
        }, this);
		if(me.item.length != 0){
			me.setSrc(me.baseUrl+me.item[0].src);
		}
		if(me.item.length>1){
			Ext.Function.defer(me.updateTime, 100, me);
		}
		me.callParent();
	},
	
	updateTime : function() {
		var me = this;
		if(me.page+1>=me.item.length){
			me.page = -1;
		}
		me.page++;
		me.setSrc(me.baseUrl+me.item[me.page].src);
		me.timer = Ext.Function.defer(me.updateTime, 4000, me);
	}

});