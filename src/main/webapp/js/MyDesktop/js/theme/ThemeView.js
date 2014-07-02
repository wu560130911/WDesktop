Ext.define('Ext.ux.desktop.theme.ThemeView', {
	extend : 'Ext.view.View',
	
	itemSelector : 'div.ux-theme-item-wrap',
	
	 tpl: [
            '<tpl for=".">',
                '<div class="ux-theme-item-wrap" id="{name}">',
                '<div class="ux-theme-item"><img src="js/theme/{background}" title="{name}"></div>',
                '<span>{name}</span></div>',
            '</tpl>',
            '<div class="x-clear"></div>'
        ],
     multiSelect: false,
     
     overItemCls: 'ux-theme-item-over',
   
     selectedItemCls : 'ux-theme-item-selected',
     
     trackOver : true,
     
     initComponent : function(){
     	var me = this;
     	me.callParent(arguments);
     }
});