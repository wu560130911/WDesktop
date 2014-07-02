Ext.define('Ext.ux.desktop.ShortcutDesktop', {
    extend: 'Ext.view.View',
    alias : 'widget.shortcutdesktop',
    mixins: {
        dragSelector: 'Ext.ux.DataView.DragSelector',
        draggable   : 'Ext.ux.DataView.Draggable'
    },
    
    itemSelector: 'div.ux-desktop-shortcut',
    multiSelect: true,
    singleSelect: false,
    
    plugins:[Ext.create('Ext.ux.DataView.LabelEditor', { 
    	labelSelector: 'x-item-selected',
    	itemSelector: 'div.ux-desktop-shortcut',
    	dataIndex2: 'name',
    	field: {
            xtype: 'textfield',
            emptyText : '请输入快捷方式名',
            allowBlank:false
        }
    })],
    
    //初始化
    initComponent: function() {
    	var me = this;
    	me.mixins.dragSelector.init(this);
    	me.mixins.draggable.init(this, {
            ddConfig: {
                ddGroup: 'organizerDD',
                enableDD:true
            },
            ghostTpl: [
                '<tpl for=".">',
                    '<img src="images/filetype/{type}.png" />',
                    '<tpl if="xindex % 4 == 0"><br /></tpl>',
                '</tpl>',
                '<div class="count">',
                    '{[values.length]} 文件(夹)已选择',
                '<div>'
            ]
        });
    	me.callParent(arguments);
    },
    
    //事件监听
    listeners:{
    	itemcontextmenu:function(me, record, item, index, e){
      	  //e.stopEvent();
      	  //this.CreateContextMenu().showAt(e.getXY());
        },
        itemdblclick:function(me, record, item, index, e, eOpts ){
//        	console.log(me);
//        	console.log(this.getEl());
        },
        itemclick:function(me, record, item, index, e, eOpts ){
//        	console.log(me);
        }
    }
});