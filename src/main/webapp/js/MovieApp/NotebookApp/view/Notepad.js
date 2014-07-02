
Ext.define('MovieApp.NotebookApp.view.Notepad',{
	extend : 'Ext.form.Panel',
	requires : [ 'Ext.form.field.HtmlEditor' ],
	id : 'notepad_add',
	title : '日记本',
	width : 600,
	height : 400,
	icon:'js/Core/resources/image/notebook_add.gif',
	animCollapse : false,
	border : false,
	hideMode : 'offsets',
	layout : 'fit',
	items : [ {
		xtype : 'htmleditor',
		id : 'notepad_editor',
		fontFamilies:['Courier New','Times New Roman','华文楷体','宋体','华文行楷','华文新魏'],
		value : [
		     '<font face="华文楷体" size="5">写下生活、学习、工作的点点滴滴</font>' ].join('')
	}],
	dockedItems : [ {
		xtype : 'toolbar',
		dock : 'top',
		defaults:{
			labelWidth:40,
			allowBlank: false
		},
		items : [{
			xtype : 'datefield',
			fieldLabel: '时间',
			format: 'Y年m月d日',
			id:'note_date',
			width:140
		},{
			xtype: 'combobox',
			fieldLabel: '类型',
			queryMode : "local",
			width:130,
			id:'note_type',
			store : new Ext.data.Store({
				model : "Core.app.model.SelectTypeModel",
				data : [{
						text : "生活日记",
						value : "生活日记"
					}, {
						text : "学习日记",
						value : "学习日记"
					}, {
						text : "工作日记",
						value : "工作日记"
					},{
						text : "观察日记",
						value : "观察日记"
					}]
			}),
			valueField : "value",
			displayField : "text",
			forceSelection : true,
			typeAhead : true
		},{
			xtype: 'textfield',
            fieldLabel: '心情',
            width:110,
            id:'note_mood'
		},{
			xtype: 'textfield',
            fieldLabel: '天气',
            width:110,
            id:'note_weather'
		},{
			xtype : 'button',
			text : '保存日记',
			icon:'js/Core/resources/image/save.gif',
			id:'note_save'
		}]
	}]
});
