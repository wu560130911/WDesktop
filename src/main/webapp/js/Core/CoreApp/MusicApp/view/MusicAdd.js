Ext.define('Core.MusicApp.view.MusicAdd', {
    extend: 'Ext.form.Panel',
    alias : "widget.musicadd",
    frame: true,
    height: 469,
    id: 'music_add',
    width: 660,
    layout: {
        type: 'absolute'
    },
    bodyPadding: 10,
//    closable: true,
    collapsed: false,
    collapsible: true,
    title: '<font size=3 face="华文楷体">音乐上传</font>',
    titleAlign: 'center',
    titleCollapse: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelWidth: 40
            },
            items: [
                {
                    xtype: 'fieldset',
                    x: 10,
                    y: 10,
                    formBind: false,
                    disabled: false,
                    frame: false,
                    height: 190,
                    width: 280,
                    defaults: {
                        labelWidth: 60
                    },
                    layout: {
                        type: 'absolute'
                    },
                    title: '歌曲信息',
                    items: [
                        {
                            xtype: 'textfield',
                            x: 10,
                            y: 0,
                            id: 'music_add_title',
                            width: 240,
                            name: 'music_add_title',
                            readOnly: false,
                            allowBlank: false,
                            fieldLabel: '歌曲名称',
                            emptyText: '请输入歌曲名称',
                            maxLength: 80,
                            minLength: 1
                        },
                        {
                            xtype: 'textfield',
                            x: 10,
                            y: 30,
                            id: 'music_add_singer',
                            width: 240,
                            name: 'music_add_singer',
                            fieldLabel: '歌手',
                            allowBlank: false,
                            emptyText: '请输入歌手，可以多个',
                            maxLength: 50,
                            minLength: 2
                        },
                        {
                            xtype: 'combobox',
                            x: 10,
                            y: 60,
                            id: 'music_add_type',
                            width: 240,
                            name: 'music_add_type',
                            fieldLabel: '音乐类型',
                            allowBlank: false,
                            emptyText: '请选择类型',
                            queryMode : "local",
                            store : new Ext.data.Store({
								model : "Core.app.model.SelectTypeModel",
								data : [{
										text : "古典音乐",
										value : "古典音乐"
									}, {
										text : "宗教音乐",
										value : "宗教音乐"
									}, {
										text : "流行音乐",
										value : "流行音乐"
									}, {
										text : "重金属音乐",
										value : "重金属音乐"
									}, {
										text : "摇滚乐",
										value : "摇滚乐"
									}, {
										text : "电子音乐",
										value : "电子音乐"
									}, {
										text : "爵士乐",
										value : "爵士乐"
									},{
										text : "其他",
										value : "其他"
									}]
							}),
							valueField : "value",
							displayField : "text",
							forceSelection : true,
							typeAhead : true
                        },{
                        	xtype:'label',
                        	x: 10,
                            y: 90,
                            text:'时间长度:'
                        },{
                            xtype: 'numberfield',
                            x: 75,
                            y: 90,
                            id: 'music_add_duration_minute',
                            width: 70,
                            allowBlank: false,
                            name: 'music_add_duration_minute'
                        },{
                        	xtype:'label',
                        	x: 146,
                            y: 90,
                            text:'分'
                        },{
                            xtype: 'numberfield',
                            x: 160,
                            y: 90,
                            id: 'music_add_duration_second',
                            width: 70,
                            allowBlank: false,
                            name: 'music_add_duration_second',
                            maxValue:59,
                            minValue:0
                        },{
                        	xtype:'label',
                        	x: 240,
                            y: 90,
                            text:'秒'
                        },{
                            xtype: 'numberfield',
                            x: 10,
                            y: 120,
                            id: 'music_add_year',
                            width: 240,
                            name: 'music_add_year',
                            fieldLabel: '年份',
                            allowBlank: false,
                            emptyText: '请输入歌曲发行年份',
                            decimalPrecision: 0
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    x: 310,
                    y: 10,
                    height: 190,
                    width: 320,
                    defaults: {
                        labelWidth: 60
                    },
                    layout: {
                        type: 'absolute'
                    },
                    title: '基本信息',
                    items: [
                        {
                            xtype: 'textfield',
                            x: 30,
                            y: 0,
                            id: 'music_add_size',
                            width: 260,
                            name: 'music_add_size',
                            fieldLabel: '文件大小',
                            emptyText: '文件上传后,自动显示,单位:K',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            x: 30,
                            y: 40,
                            disabled: false,
                            id: 'music_add_id',
                            width: 260,
                            name: 'music_add_id',
                            readOnly: true,
                            fieldLabel: '上传用户',
                            value:comm.get('user_id')
                        },
                        {
                            xtype: 'textfield',
                            x: 30,
                            y: 80,
                            id: 'music_add_name',
                            width: 260,
                            name: 'music_add_name',
                            readOnly: true,
                            fieldLabel: '用户姓名',
                            value:comm.get('user_name')
                        },
                        {
                            xtype: 'displayfield',
                            x: 30,
                            y: 120,
                            width: 260,
                            value: returnCitySN.cip,
                            fieldLabel: '本机IP'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    x: 10,
                    y: 200,
                    height: 190,
                    width: 620,
                    layout: {
                        type: 'absolute'
                    },
                    collapsed: false,
                    collapsible: false,
                    title: '歌曲高级信息',
                    items: [
                        {
                            xtype: 'htmleditor',
                            x: 10,
                            y: 0,
                            frame: false,
                            height: 144,
                            id: 'music_add_description',
                            style: 'background-color: white;',
                            width: 330,
                            enableAlignments: false,
                            enableFontSize: false,
                            enableLists: false,
                            name: 'music_add_description',
                            fieldLabel: '歌曲描述',
                            labelAlign: 'top'
                        },{
                        	xtype: 'displayfield',
                        	x:380,
                        	y:-5,
                        	width: 220,
                        	id:'music_add_info',
                        	value:''
                        },{
                        	xtype:'form',
                        	x: 350,
                        	y: 20,
                        	id:'fileform',
                        	width:244,
                        	height:125,
                        	frame:true,
                        	defaults:{
                        		labelWidth : 30
                        	},
                        	items :[{
                        		xtype: 'filefield',
	                            x: 10,
	                            y: 10,
	                            id: 'music_add_file',
	                            width: 220,
	                            name: 'music_add_file',
	                            fieldLabel: '歌曲上传(MP3格式)',
	                            labelAlign: 'top',
	                            allowBlank: true,
	                            emptyText: '文件选择后会对路径加密',
	                            enableKeyEvents: true,
	                            buttonMargin: 6,
	                            buttonOnly: false,
	                            buttonText: '浏览',
	                            validator:function(value){
	                            	var filetype = value.substring(value.lastIndexOf('.')).toLowerCase();
	                            	if(filetype=='.mp3'){
	                            		return true;
	                            	}
	                            	return '文件类型错误';
	                            }
	                        },{
                        		xtype: 'filefield',
	                            x: 10,
	                            y: 30,
	                            id: 'music_add_file_ogg',
	                            width: 220,
	                            name: 'music_add_file_ogg',
	                            fieldLabel: '歌曲上传(OGG格式)',
	                            labelAlign: 'top',
	                            allowBlank: true,
	                            emptyText: '文件选择后会对路径加密',
	                            enableKeyEvents: true,
	                            buttonMargin: 6,
	                            buttonOnly: false,
	                            buttonText: '浏览',
	                            validator:function(value){
	                            	var filetype = value.substring(value.lastIndexOf('.')).toLowerCase();
	                            	if(filetype=='.ogg'){
	                            		return true;
	                            	}
	                            	return true;
	                            	//return '文件类型错误';
	                            }
	                        },{
	                            xtype: 'button',
	                            x: 60,
	                            y: 0,
	                            height: 20,
	                            width: 70,
	                            text: '上传歌曲',
	                            id:'music_upload'
	                        }]
                        }]
                },{
                    xtype: 'button',
                    x: 100,
                    y: 400,
                    height: 30,
                    width: 70,
                    text: '提交',
                    id:'music_add_submit'
                },{
                    xtype: 'button',
                    x: 250,
                    y: 400,
                    height: 30,
                    width: 80,
                    text: '重置',
                    id:'music_add_reset'
                },{
                	xtype: 'button',
                    x: 400,
                    y: 400,
                    height: 30,
                    width: 80,
                    text: '关闭',
                    id:'music_add_close'
                }]
        });

        me.callParent(arguments);
    }

});