Ext.define('Ext.ux.desktop.View', {
    extend: 'Ext.view.View',
    alias: 'widget.desktopview',
    mixins: {
        dragSelector: 'Ext.ux.DataView.DragSelector',
        draggable   : 'Ext.ux.DataView.Draggable'
    },
    
   itemSelector: 'div.ux-desktop-shortcut',
   
   labelSelector: 'ux-desktop-shortcut-text-inner',
   
   shortcutsPadding : 80,
   
   overItemCls:'ux-desktop-shortcut-over',
   selectedItemCls : 'ux-desktop-shortcut-selected',
   
   trackOver: true,
   style : {
   	position: 'absolute',
		fontFamily : '微软雅黑'
	},
   shortcutsCols : 9,
   
   multiSelect : false,
   
   initComponent : function(){
   		 var me = this;
   		 me.itemcontextmenu = new Ext.menu.Menu(me.createItemContextMenu());
   		 me.tpl = new Ext.XTemplate(me.buildTpl());
   		 me.mixins.dragSelector.init(this);
   		 me.mixins.draggable.init(this, {
            ddConfig: {
                ddGroup: 'organizerDD',
                enableDD:true
            }
        });
   	     me.editor = Ext.create('Ext.ux.DataView.LabelEditor', {
   	    	 dataIndex: 'name',
   	    	 itemSelector:me.itemSelector,
   	    	 labelSelector: me.labelSelector
   	     });
   		 me.plugins = [me.editor];
		 me.on('itemdblclick', me.onItemEnter, me);
         me.on('itemcontextmenu', me.onItemConextMenu, me);
		 me.callParent();
   },
   
   init : function(){
   		var me = this;
		me.initTooltip();
   },
   
   initTooltip : function(){
   		var me = this;
   		me.all.each(function(node){
        	var record = me.store.getAt(me.indexOf(node));
        	Ext.create('Ext.tip.ToolTip',{
        		target : node,
        		cls : 'x-tip-dirty',
        		title : record.data.name,
        		html : '名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：' + record.data.name + '<br/>' + 
	        		   '描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：' + record.data.wmstips + '<br/>' + 
	        		   '图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标：' + record.data.iconCls + '<br/>' +
	        		   '创建时间：' + Ext.Date.format(new Date(), 'Y年m月d日  H时i分') + '<br/>' +
	        		   '版&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本：4.4.1<br/>' ,
        		trackMouse : true,
        		anchor : 'right'
        	});
        });
   },
   
   refresh : function(){
   		var me = this;
		me.tpl = new Ext.XTemplate(me.buildTpl());
		me.callParent();
		me.clearDirtyDom();
		me.initTooltip();
   },
   
   sortShortCut : function(p){
    	var me = this;
    	if(me.sortType == 'ASC' &&  p == me.sortField){
    		me.store.sort(p, 'DESC');
    		me.sortType = 'DESC';
    	}else{
    		me.store.sort(p, 'ASC');
    		me.sortType = 'ASC';
    	}
    	me.sortField = p;
    },
   clearDirtyDom : function(){
   		var body = Ext.getBody(); 
   		var dirtyDD = body.select('div.x-dd-drag-proxy');
   		Ext.each(dirtyDD.elements,function(el){
   			document.body.removeChild(el);
   		});
   		dirtyDD.clear();
   },
   buildTpl : function(){
   		var me = this;
   		me.shortcutsCols = Math.floor((me.desktop.getHeight() - me.desktop.taskbar.getHeight() + 2) / me.shortcutsPadding);
    	return [
	              '<div class="ux-desktop-shortcut-column">',          
	              '<tpl for=".">',
	      	            '<div class="ux-desktop-shortcut" id="{name}-shortcut">',
	      	                '<div class="ux-desktop-shortcut-icon {iconCls}">',
	      	                    '<img src="',Ext.BLANK_IMAGE_URL,'" title="{name}">',
	      	                '</div>',
	      	                '<div class="ux-desktop-shortcut-text">',
	      	                	'<div class="ux-desktop-shortcut-text-inner">{name}</div>',
	      	                '</div>',
	      	            '</div>',
	      	            '<tpl if="xindex % ' + me.shortcutsCols + ' == 0">',
	      	            	'</div><div class="ux-desktop-shortcut-column">',
	      	            '</tpl>',   
	              '</tpl>',
	              '</div>',
	              '<div class="x-clear"></div>'
    	      ];
    },
    
     onItemRemove : function(record){
    	var me = this,records = me.selModel.getSelection();
		if(records.length > 0){
    		Ext.Msg.confirm('系统提示', '您确定删除'+ (records.length > 1 ? '这' + records.length + '个应用程序' : records[0].data.name )+'么?',function(btn){
    			if(btn == 'yes'){
    				me.store.remove(records);
    			}
    		});
		}
    },
    
    onItemRename : function(record,item){
    	var me = this,nodes = me.getSelectedNodes();
		if(nodes.length == 1){
			var shortcut = Ext.fly(Ext.fly(nodes[0]).first('div.ux-desktop-shortcut-text')).first('div.'+me.desktop.view.labelSelector),
			record = me.selModel.getSelection()[0],editor = me.editor;
			if(shortcut){
	    		editor.startEdit(shortcut, record.data[editor.dataIndex]);
	    		editor.activeRecord = record;
	    	}
		}
    },
    
    onItemEnter: function () {
        var me = this,records = me.selModel.getSelection();
        
        Ext.each(records,function(record){
        	var module = me.desktop.app.getModule(record.data.module),win;
        	win = Ext.get(module.id);
        	if(win==null){
        		win = module&&module.createWindow();
        	}
        	if (win) {
                me.desktop.restoreWindow(win);
            }
        	me.getSelectionModel().deselect(me.store.indexOf(record));
        });
    },
    
    onItemDetail: function () {
        var me = this,record = me.selModel.getSelection()[0];
        Ext.Msg.show({
        	title : record.data.name + '属性',
        	msg : '名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：' + record.data.name + '<br/>' + 
 		   '描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：' + record.data.wmstips + '<br/>' + 
		   '图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标：' + record.data.iconCls + '<br/>' +
		   '创建时间：' + Ext.Date.format(new Date(), 'Y年m月d日  H时i分') + '<br/>' +
		   '版&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本：4.4.1<br/>' , 
        	width:350,
            modal : false,
            icon:record.data.iconCls,
            buttons : Ext.Msg.OK
        });
    },
    
    onItemApplyToQuickStart: function(){
    	var me = this,records = me.selModel.getSelection();
        Ext.each(records,function(record){
        	me.desktop.taskbar.quickStart.add({ 
        	  name: record.data.name, 
    		  iconCls: me.app.createSmallIconCls(record.data.iconCls), 
    		  module: record.data.module
    		});
        });
    	me.desktop.taskbar.quickStart.doLayout();
    },
    
    onItemApplyToStartMenu: function(){
    	var me = this,records = me.selModel.getSelection();
        Ext.each(records,function(record){
        	me.desktop.taskbar.startMenu.addMenuItem({ 
        		text: record.data.name, 
    		  	iconCls: me.app.createSmallIconCls(record.data.iconCls),
    		  	module: record.data.module
    		});
        });
    	me.desktop.taskbar.startMenu.menu.doLayout();
    },
    
    /**
     * 菜单展现之前，设定右键选择的图标的样式
     * */
    onItemContextMenuBeforeShow : function(){
    	var me = this,records = me.selModel.getSelection(),items = me.itemcontextmenu.items;
    	items.get(3).setDisabled(records.length > 1);
    	items.get(6).setDisabled(records.length > 1);
    },
    
    onItemContextMenuHide : function(){
    	this.getSelectionModel().deselectAll();
    },
    
    onItemConextMenu: function (dataView, record ,item,index,e) {
        var me = this, menu = me.itemcontextmenu,records = me.selModel.getSelection();
        if(records.length == 0){
        	me.getSelectionModel().select(record);
        }
        if(records.length == 1){
        	me.getSelectionModel().deselectAll();
        	me.getSelectionModel().select(record);
        }
        if (!menu.rendered) {
            menu.on('beforeshow', me.onItemContextMenuBeforeShow, me);
        }
        //dataView.getSelectionModel().select(index,true);
        //menu.on('deactivate', me.onItemContextMenuHide, me);
        e.stopEvent();
        menu.showAt(e.getXY());
        menu.doConstrain();
    },
    
    createItemContextMenu : function(){
    	var me = this, ret = {
    			items :  []
    	};
    	ret.items.push(
    		{ text : '打开(O)',
    		  scope : me ,
    		  handler :me.onItemEnter
    		},
    		{ text : '删除(D)',
    		  scope : me,
    		  handler: me.onItemRemove
    		},
    		'-',
    		{ text : '重命名(M)',
    		  sope : me,
    		  handler : function(){ 
    		  	me.onItemRename();
    		  }
    		},
    		{ text : '添加到',
    		  menu : [{
    			  text : '快速启动栏(Q)',
    			  sope : me,
    			  handler : function(){
    			  	me.onItemApplyToQuickStart();
    			  }
    		  },{
    			  text : '开始菜单栏(S)',
    			  sope : me,
    			  handler : function(){
    			  	me.onItemApplyToStartMenu();
    			  }
    		  }]
    		  
    		},'-',
    		{ text : '属性(R)',
    		  sope : me,
    		  handler : function(){
    		  	me.onItemDetail();	
    		  }
    		 }
    	);
    	return ret;
    },
    
    isItemContextHidden  :function(){
    	return this.itemcontextmenu.isHidden();
    }
    
});