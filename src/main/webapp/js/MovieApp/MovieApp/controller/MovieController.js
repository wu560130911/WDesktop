Ext.define('MovieApp.MovieApp.controller.MovieController', {
    extend: 'Ext.app.Controller',
    models: [
       'MovieModel'
    ],
    stores: [
        'MovieStore'
    ],
    views: [
        "MovieAdd",'MovieList','MovieInfo','MovieImage'
    ],
    init: function () {
    	var me = this;
    	me.getGridObj=function(button){
			return button.ownerCt.ownerCt;
		};
		me.control({
        	"movieadd button[id=movie_add_file_submit]":{
	        	click:me.AddFileSubmit
	        },"movieadd button[id=movie_add_submit]":{
	        	click:me.MovieAddForm
	        },"movieadd button[id=movie_add_reset]":{
	        	click:me.MovieAddReset
	        },"movieadd button[id=movie_add_close]":{
	        	click:me.MovieAddClose
	        },"movielist button[id=movie_search]":{
	        	click:me.MovieSearch
	        },'movielist button[id=video_more_info]':{
	        	click:function(button,event){
	        		var grid=this.getGridObj(button);
	        		var videos = grid.getSelectionModel().getSelection();
	        		if(videos.length <=0){
        				Ext.MessageBox.alert('警告','请先选择电影.',null,this);
        				return;
        			}
	        		me.VideoMoreInfo(videos[0]);
	        	}
	        },'movieinfo button':{
	        	click:function(btn){
	        		var video = btn.up('form').getForm().getFieldValues();
	        		me.PlayVideo(video);
	        	}
	        },'menu':{
	        	click:function(menu,item,e,eopts){
	        		if(menu.getId() != 'video_list_menu'){
	        			return;
	        		}
	        		var gridpanel = Ext.getCmp('movielist');
	        		var videos = gridpanel.getSelectionModel().getSelection();
	        		if(videos.length <=0){
        				Ext.MessageBox.alert('警告','请先选择电影.',null,this);
        				return;
        			}
	        		if(menu.items.items[0] === item){
	        			var data = [];
	        			Ext.Array.each(videos,function(model){
	        				var video = {'movie':{'id':model.data.id}};
	        				data.push(Ext.JSON.encode(video));
	        			});
	        			Ext.Ajax.request({
	        				url:'movieplaylist_add.action',
	        				method : "POST",
	        				jsonData:"{'datas':["+data.join(",")+"]}",
	        				timeout : 10000,
	        				success:function(response, opts){
	        					if(Ext.JSON.decode(response.responseText).message=='SUCCESS'){
	        						Ext.Msg.alert('提示','添加成功！');
	        					}else{
	        						self.location.href = ".";
	        					}
	        				}
	        			});
	        		}else if(menu.items.items[1] === item){
	        			me.PlayVideo(videos[0].data);
	        		}else{
	        			me.VideoMoreInfo(videos[0]);
	        		}
	        	}
	        },'movielist':{
	        	containercontextmenu:function(panel,e,opts){
	        		e.stopEvent();
	        		var contextmenu = Ext.getCmp('video_list_menu');
	        		if(contextmenu==null){
	        			contextmenu = me.GetContextMenu(1);
	        		}else if(contextmenu.items.items.length === 3){
	        			contextmenu.close();
	        			contextmenu = me.GetContextMenu(1);
	        		}
	        		contextmenu.showAt(e.getXY());
	        	},
	        	itemcontextmenu:function(panel,record,item,index,e,opts){
	        		e.stopEvent();
	        		var contextmenu = Ext.getCmp('video_list_menu');
	        		if(contextmenu==null){
	        			contextmenu = me.GetContextMenu(0);
	        		}else if(contextmenu.items.items.length === 1){
	        			contextmenu.close();
	        			contextmenu = me.GetContextMenu(0);
	        		}
	        		contextmenu.showAt(e.getXY());
	        	}
	        }
        });    
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
		var reg = new RegExp(",", "g");//全部替换
		Ext.getCmp('video').setTitle(video.title+'-'+video.actor.replace(reg,' '));
		if(video_player.paused){
			video_player.play();
		}
		wmsdesktop.getModule('video').videoEl = video_player;
		Ext.getCmp('video').toFront();
    },
    AddFileSubmit:function(btn){
    	var movie_add_title = Ext.getCmp('movie_add_title');
		var fileform = Ext.getCmp('movie_file_form').getForm();
		var filevalue = Ext.getCmp('movie_add_file_mp4').getValue();
		if(fileform.isValid()&&filevalue!=null&&filevalue!=''){
			if(movie_add_title.isValid()){
				movie_add_title.setReadOnly(true);
				fileform.submit({
					url : 'editor/fileupload.wms?movietitle='+movie_add_title.getValue(),
					method : 'POST',
					waitMsg : '表单提交中',
					success : function(form, action) {
						Ext.getCmp('movie_file_form').setDisabled(true);
						Ext.getCmp('movie_file_form').setVisible(false);
						Ext.getCmp('movie_add_info').setValue('<font color=red size=3 face="华文楷体">文件上传成功.</font>');
						Ext.getCmp('movie_add_size').setValue(action.result.size);
						Ext.Msg.alert("成功", "文件上传成功！请填写好其余表单。");
					},
					failure : function(form, action) {
						Ext.getCmp('movie_add_info').setValue('<font color=red size=3 face="华文楷体">'+action.result.state+'.</font>');
						Ext.Msg.alert("错误", action.result.state);
						movie_add_title.setReadOnly(false);
					}
				});
			}else{
				Ext.getCmp('movie_add_info').setValue('<font color=red size=3 face="华文楷体">请填写正确的电影名称.</font>');
			}
		}else{
			Ext.getCmp('movie_add_info').setValue('<font color=red size=3 face="华文楷体">路径不正确.</font>');
		}
    },
    MovieSearch:function(searchbutton){
    	var grid=this.getGridObj(searchbutton);
		var search_value = Ext.getCmp('moviesearchmatter').getValue();
		var search_type = Ext.getCmp('moviesearchtype').getValue();
		var search_scope = Ext.getCmp('moviesearchtype2').getValue();
		if(search_type==''||search_type==null){
			Ext.Msg.alert('错误','请选择搜索类型.');
			return;
		}
		if(search_scope==''||search_scope==null){
			Ext.Msg.alert('错误','请选择搜索精度.');
			return;
		}
		grid.getStore().getProxy().extraParams={
			search_value:search_value,
			search_type:search_type,
			search_scope:search_scope
		};
		grid.getStore().load();
    },
    MovieAddClose:function(){
    	var fileform = Ext.getCmp('movie_file_form');
		if(fileform.isHidden()){
			Ext.getCmp('movie_add_info').setValue('<font color=red size=3 face="华文楷体">文件已上传不能关闭.</font>');
		}else{
			Ext.getCmp('wms_movie_add').close();
		}
    },
    MovieAddReset:function(){
    	var fileform = Ext.getCmp('movie_file_form');
		if(fileform.isHidden()){
			Ext.getCmp('movie_add_info').setValue('<font color=red size=3 face="华文楷体">文件已上传不能重置.</font>');
		}else{
			fileform.getForm().reset();
			var music_form = Ext.getCmp('movie_add').getForm();
			music_form.reset();
		}
    },
    MovieAddForm:function(btn){
    	var fileform = Ext.getCmp('movie_file_form');
		if(fileform.isHidden()){
			var music_form = Ext.getCmp('movie_add').getForm();
			if(music_form.isValid()){
				var movie_add_title = Ext.getCmp('movie_add_title').getValue();
				var movie_add_actor = Ext.getCmp('movie_add_actor').getValue();
				var movie_add_author = Ext.getCmp('movie_add_author').getValue();
				var movie_add_madetime = Ext.getCmp('movie_add_madetime').getValue();
				var movie_add_type = Ext.getCmp('movie_add_type').getValue();
				var movie_add_duration = Ext.getCmp('movie_add_duration_minute').getValue()*60+Ext.getCmp('movie_add_duration_second').getValue();
				var movie_add_size = Ext.getCmp('movie_add_size').getValue();
				var movie_add_description = Ext.getCmp('movie_add_description').getValue();
				Ext.Ajax.request({
    				url : "movie_add.action",
    				method : "POST",
    				timeout : 10000,
    				params : {
						'movie.title' : movie_add_title,
						'movie.actor' : movie_add_actor,
						'movie.author':movie_add_author,
						'movie.madetime':movie_add_madetime,
						'movie.type':movie_add_type,
						'movie.duration':movie_add_duration,
						'movie.size':movie_add_size,
						'movie.user.id':comm.get('user_id'),
						'movie.description':movie_add_description
					},
					success : function(response, opts) {
						try {
							if (Ext.JSON.decode(response.responseText).message == "success") {
								Ext.Msg.alert('成功','电影文件上传和载入后台成功。');
								music_form.reset();
								Ext.getCmp('movie_add_title').setReadOnly(false);
								Ext.getCmp('movie_file_form').setDisabled(false);
								fileform.setVisible(true);
								fileform.getForm().reset();
							}else{								
								Ext.Msg.alert("提示",Ext.JSON.decode(response.responseText).message);
							}
						} catch (e) {
							self.location.href='login.jsp';
						}
					}
    			});
			}else{
				Ext.getCmp('movie_add_info').setValue('<font color=red size=3 face="华文楷体">请按要求填写.</font>');
			}
		}else{
			Ext.getCmp('movie_add_info').setValue('<font color=red size=3 face="华文楷体">请先上传文件.</font>');
		}
    },
    GetContextMenu:function(type){
    	var contextmenu = Ext.create('Ext.menu.Menu',{
    		width: 100,
    		id:'video_list_menu'
    	});
    	contextmenu.add({text:'添加收藏',iconCls:'media_collect'});
    	if(type == 0){
    		contextmenu.add({text:'播放影片',iconCls:'media_play'},{text:'详细信息',iconCls:'video_more_info'});
    	}
    	return contextmenu;
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
    	MovieInfo.setTitle(record.raw.title);
    	MovieInfo.down('form').loadRecord(record);
    	//MovieInfo.down('form').getForm().setValues(records[0].raw.user);
    	MovieInfo.show();
    }
});