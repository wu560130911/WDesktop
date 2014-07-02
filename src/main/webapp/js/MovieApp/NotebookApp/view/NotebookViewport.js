Ext.define('MovieApp.NotebookApp.view.NotebookViewport', {
	extend : 'Ext.panel.Panel',
	alias : "widget.notebookviewport",
	requires:['Ext.ux.TabCloseMenu'],
	layout : {
		type : 'border'
	},
	initComponent : function() {
		var me = this;
		var tabpanel = me.TabPanel();
		Ext.applyIf(me, {
			items : [tabpanel, {
				xtype : 'treepanel',
				region : 'west',
				split : true,
				frame : false,
				width : 150,
				collapsible : true,
				title : '导航栏',
				columnLines : false,
				lines : false,
				store:'NotebookStore',
				useArrows : true,
				tools:[{
					type:'expand',
					handler:function(event,toolEl,owner,tool){
						tool.up('treepanel').expandAll();
					}
				},{
					type:'collapse',
					handler:function(event,toolEl,owner,tool){
						tool.up('treepanel').collapseAll();
					}
				}]
			} ]
		});
		me.callParent(arguments);
	},
	TabPanel:function(){
		var tabpanel = Ext.create('Ext.tab.Panel',{
			region : 'center',
			activeTab : 0,
			layout : 'fit',
			minTabWidth : 100,
			id:'tabpanel_main',
			plugins:'tabclosemenu',
			items : [ {
				xtype : 'panel',
				title : '主页',
				html:"<iframe width='100%' scrolling='no' frameborder='0' src='toolpages/notebookmain.jsp' onload='this.height=this.contentWindow.document.documentElement.scrollHeight'></iframe>"
			}]
		});
		return tabpanel;
	}

});