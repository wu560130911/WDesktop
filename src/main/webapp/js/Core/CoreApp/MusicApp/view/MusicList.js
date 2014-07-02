Ext.define('Core.MusicApp.view.MusicList', {
    extend: 'Ext.grid.Panel',
    alias : "widget.musiclist",
    frame: true,
    id:'musiclist',
    multiSelect : true,
    emptyText: '没有相关数据',
    store: 'MusicStore',

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
                    store: 'MusicStore',
                    width: 360,
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
                    id: 'music_list_title',
                    align: 'center',
                    dataIndex : "title",
                    text: '歌曲名称',
                    tooltip:'点击我播放'
            },{
                    xtype: 'gridcolumn',
                    id: 'music_list_singer',
                    align: 'center',
                    dataIndex : "singer",
                    text: '歌手'
            },{
                    xtype: 'numbercolumn',
                    id: 'music_list_year',
                    align: 'center',
                    text: '年份',
                    dataIndex : "year",
                    format: '0000',
                    width:60,
                    renderer:function(value){
						return Ext.String.format("{0}年",value);
					}
            },{
            	xtype: 'gridcolumn',
                id: 'music_list_type',
                align: 'center',
                dataIndex : "type",
                text: '音乐类型'
            },{
            	xtype: 'numbercolumn',
                id: 'music_list_duration',
                align: 'center',
                dataIndex : "duration",
                text: '时间长度',
                format: '0',
                renderer:function(value){
					return Ext.String.format("{0}分{1}秒",(value-value%60)/60,value%60);
				}
            },{
            	xtype: 'numbercolumn',
                id: 'music_list_size',
                align: 'center',
                dataIndex : "size",
                text: '文件大小',
                format: '0',
                renderer:function(value){
					return Ext.String.format("{0}KB",value);
				}
            },{
            	xtype: 'gridcolumn',
                id: 'music_list_time',
                align: 'center',
                dataIndex : "time",
                text: '上传时间',
                width:140
            }],
            tbar : [{
				fieldLabel : "关键字",
				labelWidth : 50,
				width : 220,
				xtype : 'textfield',
				name : "searchmatter",
				id : "musicsearchmatter",
				emptyText : "请输入关键字",
				selectOnFocus : true
			}, {
				xtype : "combobox",
				labelWidth : 60,
				width : 200,
				emptyText : "请选择类型",
				listConfig : { // 控制下拉列表的样式
					emptyText : "没有找到匹配的项",
					maxHeight : 200
				},
				fieldLabel : "搜索类型",
				name : "musicsearchtype",
				id : "musicsearchtype",
				queryMode : "local",
				store : new Ext.data.Store({
							model : "Core.app.model.SelectTypeModel",
							data : [{
										text : "歌曲名称",
										value : "title"
									}, {
										text : "歌手",
										value : "singer"
									}, {
										text : "年份",
										value : "year"
									}, {
										text : "音乐类型",
										value : "type"
									}]
						}),
				valueField : "value",
				displayField : "text",
				forceSelection : true,
				typeAhead : true
			},{
				xtype : "combobox",
				labelWidth : 60,
				width : 200,
				emptyText : "请选择搜索精度",
				listConfig : { // 控制下拉列表的样式
					emptyText : "没有找到匹配的项",
					maxHeight : 200
				},
				fieldLabel : "精度类型",
				name : "musicsearchtype2",
				id : "musicsearchtype2",
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
				id : "music_search",
				iconCls : "search",
				text : "搜索"
			}, ""],
			enableKeyNav : true,
			columnLines : true,
			listeners:{
				itemdblclick:function(grid,record,item,index,e,ops){
					var store=grid.getStore();
					var music = store.getAt(index).data;
					if(Ext.getCmp('audio')==null){
	        			 var wmsdesktop = Ext.getCmp('wmsdesktop').app;
	        			 wmsdesktop.createWindow(wmsdesktop.getModule('audio'));
	        		}
					
					var audioplayer = Ext.getCmp('audio-player');
					audioplayer.src=[{
						src:"Music/"+music.title+".mp3"
					},{
						src:"Music/"+music.title+".ogg"
					}];
					audioplayer.update();
					audioplayer.afterRender();
	        		var audio_player = document.getElementById('audio_player');
	        		Ext.getCmp('audio').setTitle(music.title);
	        		Ext.getCmp('music_play_wms').setValue(music.title);
	        		Ext.getCmp('music_play_title').setValue('<font size=3 face="华文楷体" color=red>'+music.title+'</font>');
	        		Ext.getCmp('music_play_singer').setValue('<font size=3 face="华文楷体" color=red>'+music.singer+'</font>');
       			 	var seconds = (music.duration)%60;
       			 	Ext.getCmp('music_play_duration').setValue('<font size=3>'+(music.duration-seconds)/60+':'+seconds+'</font>');
       			 	if(audio_player.paused){
       			 		audio_player.play();
       			 	}
				}
			}
        });

        me.callParent(arguments);
    }

});