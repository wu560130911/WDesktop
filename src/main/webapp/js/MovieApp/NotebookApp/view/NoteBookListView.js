Ext.define('MovieApp.NotebookApp.view.NoteBookListView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.notebooklistview',

	title : '我的日记',
	titleAlign : 'center',
	columnLines : true,
	store: 'NoteListStore',
	multiSelect : true,
    emptyText: '没有相关数据',

	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			viewConfig: {
                loadingText: '载入中',
                trackOver: true
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
			columns : [ {
				xtype : 'rownumberer',
				width: 50,
                align: 'center',
                text: '编号'
			}, {
				xtype : 'gridcolumn',
				align : 'center',
				dataIndex : "type",
				text : '类型'
			}, {
				xtype : 'gridcolumn',
				align : 'center',
				dataIndex : "mood",
				text : '心情'
			}, {
				xtype : 'gridcolumn',
				align : 'center',
				dataIndex : "weather",
				text : '天气'
			}, {
				xtype : 'gridcolumn',
				align : 'center',
				dataIndex : "notedate",
				text : '记录时间'
			}, {
				xtype : 'gridcolumn',
				dataIndex : "writetime",
				align : 'center',
				text : '编写时间',
				flex:1
			} ],
			dockedItems : [ {
				xtype : 'pagingtoolbar',
				dock : 'bottom',
				width : 360,
				store: 'NoteListStore',
				autoShow : true,
				autoDestroy : true,
				displayInfo : true,
				items: [{
                    xtype: 'button',
                    text: '查看日记',
                    handler:function(button,event){
                    	var grid = button.ownerCt.ownerCt;
                    	var records = grid.getSelectionModel().getSelection();
                    	if(records.length<=0){
                    		Ext.Msg.alert('警告','请先选择一个要查看的日记.');
                    		return;
                    	}
                    }
                },{
                    xtype: 'button',
                    text: '删除日记',
                    handler:function(button,event){
                    	var grid = button.ownerCt.ownerCt;
                    	var records = grid.getSelectionModel().getSelection();
                    	if(records.length<=0){
                    		Ext.Msg.alert('警告','请先选择需要删除的日记.');
                    		return;
                    	}
                    }
                }]
			}, {
				xtype : 'toolbar',
				dock : 'top',
				items:[{
				fieldLabel : "关键字",
				labelWidth : 50,
				width : 180,
				xtype : 'textfield',
				name : "searchmatter",
				emptyText : "请输入关键字",
				selectOnFocus : true
			}, {
				xtype : "combobox",
				labelWidth : 80,
				width : 180,
				emptyText : "请选择类型",
				listConfig : { // 控制下拉列表的样式
					emptyText : "没有找到匹配的项",
					maxHeight : 200
				},
				fieldLabel : "搜索类型",
				name : "searchtype",
				queryMode : "local",
				store : new Ext.data.Store({
							model : "Core.app.model.SelectTypeModel",
							data : [{
										text : "类型",
										value : "type"
									}, {
										text : "心情",
										value : "mood"
									}, {
										text : "天气",
										value : "weather"
									}, {
										text : "时间",
										value : "writetime"
									}]
						}),
				valueField : "value",
				displayField : "text",
				forceSelection : true,
				typeAhead : true
			},{
				xtype : "combobox",
				labelWidth : 40,
				width : 180,
				emptyText : "请选择搜索精度",
				listConfig : { // 控制下拉列表的样式
					emptyText : "没有找到匹配的项"
				},
				fieldLabel : "精度",
				name : "searchtype2",
				queryMode : "local",
				store : new Ext.data.Store({
							model : "Core.app.model.SelectTypeModel",
							data : [{
										text : "精确查找",
										value : "true"
									}, {
										text : "模糊查找",
										value : "false"
									}]
						}),
				valueField : "value",
				displayField : "text",
				forceSelection : true,
				typeAhead : true
			},{
				xtype : "button",
				iconCls : "search",
				text : "搜索"
			}, ""]
			} ]
		});
		//加载数据
		Ext.data.StoreManager.lookup(this.getStore()).load();
		me.callParent(arguments);
	}

});