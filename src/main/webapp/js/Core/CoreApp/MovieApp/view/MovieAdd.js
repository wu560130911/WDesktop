Ext.define('Core.MovieApp.view.MovieAdd', {
    extend: 'Ext.form.Panel',
    alias : "widget.movieadd",
    frame: true,
    height: 410,
    id: 'movie_add',
    width: 660,
    layout: {
        type: 'absolute'
    },
    bodyPadding: 10,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                    xtype: 'fieldset',
                    x: 0,
                    y: 0,
                    height: 230,
                    width: 330,
                    defaults: {
                        labelWidth: 60
                    },
                    layout: {
                        type: 'absolute'
                    },
                    title: '影片基本信息',
                    items: [{
                            xtype: 'textfield',
                            x: 10,
                            y: 0,
                            width: 280,
                            allowBlank: false,
                            id:'movie_add_title',
                            name:'movie_add_title',
                            fieldLabel: '影片名称',
                            emptyText: '请输入影片名称',
                            maxLength: 99,
                            minLength: 1
                        },{
                            xtype: 'textfield',
                            x: 10,
                            y: 35,
                            width: 280,
                            allowBlank: false,
                            id:'movie_add_actor',
                            name:'movie_add_actor',
                            fieldLabel: '主演',
                            emptyText: '请输入主演,可写多个',
                            maxLength: 99,
                            minLength: 2
                        },{
                            xtype: 'textfield',
                            x: 10,
                            y: 70,
                            width: 280,
                            allowBlank: false,
                            id:'movie_add_author',
                            name:'movie_add_author',
                            fieldLabel: '导演',
                            emptyText: '请输入导演,可写多个',
                            maxLength: 49,
                            minLength: 2
                        },{
                            xtype: 'datefield',
                            x: 10,
                            y: 105,
                            width: 280,
                            allowBlank: false,
                            id:'movie_add_madetime',
                            name:'movie_add_madetime',
                            fieldLabel: '出版时间',
                            emptyText: '请输入出版时间',
                            altFormats: 'Y,m,d|Y.m.d|Y/m/d|Y-m-d',
                            format: 'Y年m月d日',
                        },{
                            xtype: 'combobox',
                            x: 10,
                            y: 140,
                            width: 280,
                            id:'movie_add_type',
                            fieldLabel: '影片类型',
                            allowBlank: false,
                            emptyText: '请选择类型',
                            queryMode : "local",
                            multiSelect:true,
                            store : new Ext.data.Store({
								model : "Core.app.model.SelectTypeModel",
								data : [{
										text : "动作",
										value : "动作"
									}, {
										text : "冒险",
										value : "冒险"
									}, {
										text : "喜剧",
										value : "喜剧"
									}, {
										text : "爱情",
										value : "爱情"
									}, {
										text : "战争",
										value : "战争"
									}, {
										text : "恐怖",
										value : "恐怖"
									}, {
										text : "武侠",
										value : "武侠"
									},{
										text : "悬疑",
										value : "悬疑"
									},{
										text : "科幻",
										value : "科幻"
									},{
										text : "动画",
										value : "动画"
									},{
										text : "奇幻",
										value : "奇幻"
									},{
										text : "青春",
										value : "青春"
									},{
										text : "励志",
										value : "励志"
									},{
										text : "历史",
										value : "历史"
									},{
										text : "剧情",
										value : "剧情"
									}]
							}),
							valueField : "value",
							displayField : "text",
							forceSelection : true,
                        },{
                        	xtype:'label',
                        	x: 10,
                            y: 170,
                            text:'时间长度:'
                        },{
                        	xtype: 'numberfield',
                            x: 75,
                            y: 170,
                            id: 'movie_add_duration_minute',
                            width: 90,
                            allowBlank: false,
                            name: 'movie_add_duration_minute'
                        },{
                        	xtype:'label',
                        	x: 170,
                            y: 170,
                            text:'分'
                        },{
                        	xtype: 'numberfield',
                            x: 185,
                            y: 170,
                            id: 'movie_add_duration_second',
                            width: 90,
                            allowBlank: false,
                            name: 'movie_add_duration_second',
                            maxValue:59,
                            minValue:0
                        },{
                        	xtype:'label',
                        	x: 280,
                            y: 170,
                            text:'秒'
                        }]
                },{
                    xtype: 'fieldset',
                    x: 0,
                    y: 240,
                    height: 150,
                    width: 330,
                    defaults: {
                        labelWidth: 60
                    },
                    layout: {
                        type: 'absolute'
                    },
                    title: '用户基本信息',
                    items: [{
                            xtype: 'textfield',
                            x: 10,
                            y: 0,
                            width: 280,
                            id: 'movie_add_size',
                            name: 'movie_add_size',
                            emptyText: '文件上传后,自动显示,单位:K',
                            readOnly: true,
                            fieldLabel: '文件大小'
                        },{
                            xtype: 'textfield',
                            x: 10,
                            y: 30,
                            width: 280,
                            readOnly: true,
                            fieldLabel: '上传用户',
                            value:comm.get('user_id')
                        },{
                            xtype: 'textfield',
                            x: 10,
                            y: 60,
                            readOnly: true,
                            width: 280,
                            fieldLabel: '用户姓名',
                            value:comm.get('user_name')
                        },{
                            xtype: 'displayfield',
                            x: 10,
                            y: 90,
                            width: 280,
                            value: returnCitySN.cip,
                            fieldLabel: '本机IP'
                        }]
                },{
                    xtype: 'fieldset',
                    x: 340,
                    y: 0,
                    height: 355,
                    defaults: {
                        labelWidth: 40
                    },
                    layout: {
                        type: 'absolute'
                    },
                    title: '影片高级信息',
                    items: [{
                            xtype: 'htmleditor',
                            anchor: '',
                            x: 0,
                            y: 0,
                            height: 150,
                            style: 'background-color: white;',
                            enableAlignments: false,
                            enableColors: false,
                            enableFontSize: false,
                            enableLinks: false,
                            enableLists: false,
                            enableSourceEdit: false,
                            fieldLabel: '描述',
                            hideLabel: false,
                            id:'movie_add_description',
                            labelAlign: 'top'
                        },{
                            xtype: 'displayfield',
                            x: 0,
                            y: 150,
                            id:'movie_add_info',
                            value: ''
                        },{
                            xtype: 'form',
                            x: 0,
                            y: 170,
                            frame: true,
                            height: 145,
                            id:'movie_file_form',
                            defaults: {
                                labelWidth: 60
                            },
                            layout: {
                                type: 'absolute'
                            },
                            bodyPadding: 10,
                            header: false,
                            items: [ {
                                    xtype: 'filefield',
                                    x: 0,
                                    y: 0,
                                    width: 250,
                                    fieldLabel: '影片文件(MP4)',
                                    id:'movie_add_file_mp4',
                                    emptyText: '文件选择后会对路径加密',
                                    enableKeyEvents: true,
    	                            buttonMargin: 6,
                                    labelAlign: 'top',
                                    buttonText: '浏览',
                                    validator:function(value){
    	                            	var filetype = value.substring(value.lastIndexOf('.')).toLowerCase();
    	                            	if(filetype=='.mp4'){
    	                            		return true;
    	                            	}
    	                            	return '文件类型错误';
    	                            }
                                },{
                                    xtype: 'filefield',
                                    x: 0,
                                    y: 50,
                                    width: 250,
                                    fieldLabel: '影片文件(WEBM)',
                                    //id:'movie_add_file_webm',
                                    emptyText: '文件选择后会对路径加密',
                                    enableKeyEvents: true,
                                    disabled:true,
    	                            buttonMargin: 6,
                                    labelAlign: 'top',
                                    buttonText: '浏览',
                                    validator:function(value){
    	                            	var filetype = value.substring(value.lastIndexOf('.')).toLowerCase();
    	                            	if(filetype=='.webm'){
    	                            		return true;
    	                            	}
    	                            	return true;
    	                            	//return '文件类型错误';
    	                            }
                                },{
                                    xtype: 'button',
                                    x: 80,
                                    y: 100,
                                    height: 30,
                                    width: 80,
                                    id:'movie_add_file_submit',
                                    text: '上传影片'
                                }]
                        }]
                },{
                    xtype: 'button',
                    x: 360,
                    y: 365,
                    height: 30,
                    width: 60,
                    id:'movie_add_submit',
                    text: '提交'
                },{
                    xtype: 'button',
                    x: 460,
                    y: 365,
                    height: 30,
                    width: 60,
                    id:'movie_add_reset',
                    text: '重置'
                },{
                    xtype: 'button',
                    x: 560,
                    y: 365,
                    height: 30,
                    width: 60,
                    id:'movie_add_close',
                    text: '关闭'
                }]
        });

        me.callParent(arguments);
    }

});