Ext.define('Core.MovieApp.view.MovieList', {
    extend: 'Ext.grid.Panel',
    alias : "widget.movielist",
    frame: true,
    id:'movielist',
    multiSelect : true,
    emptyText: '没有相关数据',
    store: 'MovieStore',

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
                    store: 'MovieStore',
                    width: 360,
                    displayInfo: true,
                    autoShow : true,
					autoDestroy : true,
					items: [{
	                    xtype: 'button',
	                    text: '播放',
	                    handler:function(button,event){
	                    	var grid = button.ownerCt.ownerCt;
	                    	var records = grid.getSelectionModel().getSelection();
	                    	if(records.length<=0){
	                    		Ext.Msg.alert('警告','请先选择一个要播放的视频.');
	                    		return;
	                    	}
	                    	me.PlayVideo(records[0].data);
	                    }
	                }]
            }],
            columns: [{
            	xtype: 'rownumberer',
                width: 50,
                align: 'center',
                text: '编号'
            },{
                    xtype: 'gridcolumn',
                    id: 'movie_list_title',
                    align: 'center',
                    dataIndex : "title",
                    text: '影片名称',
                    tooltip:'点击我播放'
            },{
                    xtype: 'gridcolumn',
                    id: 'movie_list_author',
                    align: 'center',
                    dataIndex : "author",
                    text: '导演'
            },{
            	xtype: 'gridcolumn',
                id: 'movie_list_actor',
                align: 'center',
                dataIndex : "actor",
                text: '演员'
            },{
                    xtype: 'gridcolumn',
                    id: 'movie_list_madetime',
                    align: 'center',
                    text: '年份',
                    dataIndex : "madetime",
            },{
            	xtype: 'gridcolumn',
                id: 'movie_list_type',
                align: 'center',
                dataIndex : "type",
                text: '影片类型'
            },{
            	xtype: 'numbercolumn',
                id: 'movie_list_duration',
                align: 'center',
                dataIndex : "duration",
                text: '时间长度',
                format: '0',
                renderer:function(value){
                	var second = value%60;
                	var minute = ((value-second)/60)%60;
                	var hours = (value-second-minute*60)/3600;
					return Ext.String.format("{0}小时{1}分{2}秒",hours,minute,second);
				}
            },{
            	xtype: 'numbercolumn',
                id: 'movie_list_size',
                align: 'center',
                dataIndex : "size",
                text: '文件大小',
                format: '0',
                renderer:function(value){
					return Ext.String.format("{0}MB",(value/1024.0).toFixed(2));
				}
            },{
            	xtype: 'gridcolumn',
                id: 'movie_list_time',
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
				id : "moviesearchmatter",
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
				name : "moviesearchtype",
				id : "moviesearchtype",
				queryMode : "local",
				store : new Ext.data.Store({
							model : "Core.app.model.SelectTypeModel",
							data : [{
										text : "影片名称",
										value : "title"
									}, {
										text : "导演",
										value : "author"
									},{
										text:'演员',
										value:'actor'
									}, {
										text : "影片类型",
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
				width : 160,
				emptyText : "请选择查找精度",
				listConfig : { // 控制下拉列表的样式
					emptyText : "没有找到匹配的项",
					maxHeight : 200
				},
				fieldLabel : "查找精度",
				name : "moviesearchtype2",
				id : "moviesearchtype2",
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
			}, {
				xtype : "button",
				id : "movie_search",
				iconCls : "search",
				text : "搜索"
			}, ""],
			enableKeyNav : true,
			columnLines : true,
			listeners:{
				itemdblclick:function(grid,record,item,index,e,ops){
					var store=grid.getStore();
					var video = store.getAt(index).data;
					me.PlayVideo(video);
				}
			}
        });
        me.callParent(arguments);
    },
    PlayVideo:function(video){
    	if(Ext.getCmp('video')==null){
			var wmsdesktop = Ext.getCmp('wmsdesktop').app;
			wmsdesktop.getModule('video').createWindow();
		}
		Ext.getCmp('video-player').src = [{
			src: 'Movie/'+video.title+'.webm'
		},{
			src: 'Movie/'+video.title+'.mp4'
		}];
		Ext.getCmp('video-player').update();
		Ext.getCmp('video-player').afterRender();
		var video_player = document.getElementById('video_play');
		var reg = new RegExp(",", "g");//全部替换
		Ext.getCmp('video').setTitle(video.title+'-'+video.actor.replace(reg,' '));
		if(video_player.paused){
			video_player.play();
		}
		Ext.getCmp('video').toFront();
    }

});