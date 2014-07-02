Ext.define('Wdesktop.app.AppManager.view.MainAppPanel', {
	extend : 'Ext.panel.Panel',
	alias : "widget.appManagerMainAppPanel",

	layout : {
		type : 'border'
	},

	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'treepanel',
				region : 'west',
				width : 192,
				title : 'My Tree Panel',
				viewConfig : {

				}
			}, {
				xtype : 'tabpanel',
				region : 'center',
				activeTab : 0,
				items : [ {
					xtype : 'panel',
					title : 'Tab 1'
				} ]
			} ]
		});

		me.callParent(arguments);
	}

});