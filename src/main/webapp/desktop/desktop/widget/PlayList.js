Ext.define('Wdesktop.desktop.widget.PlayList', {
    extend: 'Ext.grid.Panel',
    alias : "widget.playlist",
    requires:[
        'Wdesktop.desktop.store.PlaylistStore'
    ],
    width : 170,
    maxWidth:180,
	split : true,
	title:'播放列表',
	collapsible : true,
	columnLines:true,
	rowLines:true,
	titleAlign:'center',
	loadMask:true,
	id:'video_play_lists',
	multiSelect : true,
	floatable: false,
	loadingText:'列表加载中......',
	iconCls:'media_play_list',
	store:Ext.create('Wdesktop.desktop.store.PlaylistStore').load(),
	emptyText:'您还没有收藏影片',
    initComponent : function() {
    	var me = this;
    	Ext.applyIf(me, { 
    		viewConfig: {
    	        rootVisible: false,
    	        plugins: [
    	          Ext.create('Ext.grid.plugin.DragDrop', {
    	          })
    	        ],
    	        listeners:{
        			render:function(view,eopts){
        		    	view.tip = Ext.create('Ext.tip.ToolTip', {
        		    		target: view.el,
        		    		delegate: view.itemSelector,
        		    		trackMouse: true,
        		    		listeners:{
        		    			beforeshow: function(tip) {
        		    				var movie = view.getRecord(tip.triggerElement).raw;
        		    				tip.update('' + movie.movie.title+'-<font color=green >'+movie.movie.actor + '</font>');
        		    			}
        		    		}
        		    	});
        		    }
        		}
    	    },
    	    columns:[{
    	    	xtype:'rownumberer',
    	    	width: 35,
                align: 'center',
                text: '编号'
    	    },{
    	    	xtype:'gridcolumn',
    	    	dataIndex : "id",
    	    	flex: 1,
    	    	text: '影片名称',
    	    	renderer:function(value){
    	    		value = this.getStore().getById(value).raw.movie.title;
    	    		if(value.length>12){
    	    			value = value.substring(0,9)+'...';
    	    		}
    	    		return value;
    	    	}
    	    }],
    		tools:[{
    			type:'close',
    			handler:function(event,toolEl,owner,tool){
    				var treepanel = tool.up('gridpanel');
    				if(treepanel.getCollapsed()==false){
    					treepanel.hide();
    				}
    			}
    		}],
    		listeners:{
    			containercontextmenu:function(treepanel,e,eopts){
    				e.stopEvent();
    			},
    			itemcontextmenu:function(treeview,record,item,index,e,eopts){
    				e.stopEvent();
    				me.tip.record = record.raw.movie;
    				me.tip.showAt(e.getXY());
    			}
    		},
    		bbar:[{ 
    			xtype: 'button', 
    			text: '刷新',
    			iconCls:'x-tbar-loading',
    			handler:function(btn){
    				btn.up('gridpanel').getStore().reload();
    			}
    		}]
    	});
    	me.tip = Ext.create('Ext.menu.Menu',{
    		width: 100,
    		record:'',
    		items:[{
    			text:'播放',
    			iconCls:'media_play',
    			handler:function(btn){
    				me.PlayVideo(btn.up('menu').record);
    			}
    		},{
    			text:'详细信息',
    			iconCls:'video_more_info',
    			handler:function(btn){
    				var video = btn.up('menu').record;
    				console.log(video);
    				me.VideoMoreInfo(video);
    			}
    		},{
    			text:'移除',
    			iconCls:'delete',
    			handler:function(btn){
    				Ext.Ajax.request({
    					url:'movieplaylist_delete.action',
        				method : "POST",
        				params :{
        					'movieid':btn.up('menu').record.id
        				},
        				success : function(response, opts) {
        					if(Ext.JSON.decode(response.responseText).message === "SUCCESS"){
        						Ext.getCmp('video_play_lists').getStore().reload();
        					}else{
        						self.location.href=".";
        					}
        				}
    				});
    			}
    		},{
    			text:'刷新列表',
    			iconCls:'x-tbar-loading',
    			handler:function(){
    				Ext.getCmp('video_play_lists').getStore().reload();
    			}
    		}]
    	});
    	me.callParent(arguments);
    	//加载数据
		Ext.data.StoreManager.lookup(this.getStore()).load();
    },
    PlayVideo:function(video){
		var wmsdesktop = Ext.getCmp('wmsdesktop').app;
    	if(Ext.getCmp('video')==null){
			wmsdesktop.getModule('video').createWindow();
		}
    	
    	var old_video_player = document.getElementById('video_play');
    	old_video_player.parentNode.removeChild(old_video_player);
    	
		Ext.getCmp('video-player').src = [{
			src: 'Movie/'+video.title+'.webm'
		},{
			src: 'Movie/'+video.title+'.mp4'
		}];
		Ext.getCmp('video-player').update();
		Ext.getCmp('video-player').afterRender();
		var video_player = document.getElementById('video_play');
		Ext.getCmp('video').setTitle(video.title+'-'+video.actor);
		if(video_player.paused){
			video_player.play();
		}
		wmsdesktop.getModule('video').videoEl = video_player;
		Ext.getCmp('video').toFront();
    },
    VideoMoreInfo:function(record){
    	
    	MovieInfo = Ext.getCmp('wms_movie_info');
    	if(MovieInfo == null){
    		var wmsdesktop = Ext.getCmp('wmsdesktop').app.getDesktop();
    		MovieInfo = wmsdesktop.createWindow({
                id: 'wms_movie_info',
                title: '影片详细信息',
                iconCls: 'wms_movie_add',
                hideMode: 'offsets',
                closeAction:"destroy",
                layout:"fit",
                items:{xtype: 'movieinfo'}
            });
    	}
    	console.log("OK");
    	MovieInfo.setTitle(record.title);
    	MovieInfo.down('form').getForm().setValues(record);
    	//MovieInfo.down('form').getForm().setValues(records[0].raw.user);
    	MovieInfo.show();
    }
});