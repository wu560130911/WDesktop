Ext.define('Wdesktop.core.theme.theme.BackgroudView', {
	extend : 'Ext.view.View',
	
	itemSelector : 'div.ux-backgroud-item-wrap',
	
	 tpl: [
            '<tpl for=".">',
                '<div class="ux-backgroud-item-wrap" id="{name}">',
                '<div class="ux-backgroud-item"><img src="{url}" title="{name}"></div>',
                '<span>{text}</span></div>',
            '</tpl>',
            '<div class="x-clear"></div>'
        ],
     multiSelect: false,
     
     overItemCls: 'ux-backgroud-item-over',
   
     selectedItemCls : 'ux-backgroud-item-selected',
     
     trackOver : true,
     
     initComponent : function(){
     	var me = this;
     	me.callParent();
     }
});