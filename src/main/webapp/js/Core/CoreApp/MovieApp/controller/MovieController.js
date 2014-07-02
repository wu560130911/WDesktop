Ext.define('Core.MovieApp.controller.MovieController', {
    extend: 'Ext.app.Controller',
    init: function () {
    	this.getGridObj=function(button){
			return button.ownerCt.ownerCt;
		};
        this.control({
        	"movieadd button[id=movie_add_file_submit]":{
	        	click:function(btn){
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
	        	}
	        },
	         "movieadd button[id=movie_add_submit]":{
	        	click:function(btn){
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
	        	}
	        },
	         //保存按钮事件处理 
	         "movieadd button[id=movie_add_reset]":{
	        	click:function(btn){
	        		var fileform = Ext.getCmp('movie_file_form');
	        		if(fileform.isHidden()){
	        			Ext.getCmp('movie_add_info').setValue('<font color=red size=3 face="华文楷体">文件已上传不能重置.</font>');
	        		}else{
	        			fileform.getForm().reset();
	        			var music_form = Ext.getCmp('movie_add').getForm();
	        			music_form.reset();
	        		}
	        	}
	        },
	        //搜索按钮事件处理
	        "movieadd button[id=movie_add_close]":{
	        	click:function(){
	        		var fileform = Ext.getCmp('movie_file_form');
	        		if(fileform.isHidden()){
	        			Ext.getCmp('movie_add_info').setValue('<font color=red size=3 face="华文楷体">文件已上传不能关闭.</font>');
	        		}else{
	        			Ext.getCmp('wms_movie_add').close();
	        		}
	        	}
	        },"movielist button[id=movie_search]":{
	        	click:function(searchbutton){
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
	        	}
	        }
        });    
    },
    models: [
        'Core.MovieApp.model.MovieModel'
	],
    stores: [
        'Core.MovieApp.store.MovieStore'
	],
    views: [
    	"Core.MovieApp.view.MovieAdd",'Core.MovieApp.view.MovieList'
	]
});