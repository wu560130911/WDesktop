Ext.define('MyDesktop.DesktopApp.SystemManagerModel', {
    extend: 'Ext.grid.Panel',
    alias : "widget.systemmanager",
    alternateClassName: 'MyDesktop.DesktopApp.SystemManagerModel',
    frame: true,
    emptyText: '没有打开的程序',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                loadingText: '载入中',
                trackOver: true
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            dockedItems: [{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: 'MovieStore',
                    width: 360,
                    pageSize:25,
                    displayInfo: true,
                    autoShow : true,
					autoDestroy : true
            }],
            columns: [{
            	xtype: 'rownumberer',
                width: 50,
                align: 'center',
                text: '编号'
            },{
                    xtype: 'gridcolumn',
                    align: 'center',
                    dataIndex : "title",
                    text: '程序名称'
            },{
                    xtype: 'gridcolumn',
                    align: 'center',
                    dataIndex : "state",
                    text: '程序状态'
            }],
			enableKeyNav : true,
			columnLines : true
        });

        me.callParent(arguments);
    }
});

Ext.define('MyDesktop.DesktopApp.SystemManager', {
    extend: 'Ext.ux.desktop.Module',
    id:'systemmanager',
    createWindow : function(){
        var me = this, desktop = me.app.getDesktop(),
            win = desktop.getWindow('systemmanager');
        if (!win) {
            win = desktop.createWindow({
                id: 'systemmanager',
                title: '任务管理器',
                width: 800,
                height: 520,
                iconCls: 'video',
                closeAction:'destroy',
                items: [{
                	xtype : 'systemmanager'
                }]
            });
        }
        win.show();
        return win;
    }
});
