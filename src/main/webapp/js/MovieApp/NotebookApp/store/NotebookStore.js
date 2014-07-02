Ext.define('MovieApp.NotebookApp.store.NotebookStore', {
    extend: 'Ext.data.TreeStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        var baseurl = 'js/Core/resources/image/';
        me.callParent([Ext.apply({
            root:{
            	expanded: true,
            	text: "我的日记本",
            	icon:baseurl+'document.png',
            	children:[{
            		text: "日记管理", leaf: false,icon:baseurl+'notebook_all.gif',children:[{
            			text:'查看日记',leaf:true,id:'notebook_view',icon:baseurl+'notepad_view.gif'
            		},{
            			text:'导出日记',leaf:true,id:'notebook_out',icon:baseurl+'notebook_out.gif'
            		}]
            	},{
            		text:'写日记',leaf:true,id:'notebook_write',icon:baseurl+'notebook_add.gif'
            	}]
            },
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});