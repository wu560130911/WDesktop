Ext.define('Core.MusicApp.controller.MusicController', {
    extend: 'Ext.app.Controller',
    init: function () {
    	this.getGridObj=function(button){
			return button.ownerCt.ownerCt;
		};
        this.control({
        	"musicadd button[id=music_upload]":{
	        	click:function(btn){
	        		var music_title = Ext.getCmp('music_add_title');
	        		var fileform = Ext.getCmp('fileform').getForm();
	        		var filevalue = Ext.getCmp('music_add_file').getValue();
	        		if(fileform.isValid()&&filevalue!=null&&filevalue!=''){
	        			if(music_title.isValid()){
	        				music_title.setReadOnly(true);
	        				fileform.submit({
								url : 'editor/fileupload.wms?musictitle='+music_title.getValue(),
								method : 'POST',
								waitMsg : '表单提交中',
								success : function(form, action) {
									Ext.getCmp('fileform').setDisabled(true);
									Ext.getCmp('fileform').setVisible(false);
									Ext.getCmp('music_add_info').setValue('<font color=red size=3 face="华文楷体">文件上传成功.</font>');
									Ext.getCmp('music_add_size').setValue(action.result.size);
									Ext.Msg.alert("成功", "文件上传成功！请填写好其余表单。");
								},
								failure : function(form, action) {
									Ext.getCmp('music_add_info').setValue('<font color=red size=3 face="华文楷体">'+action.result.state+'.</font>');
									Ext.Msg.alert("错误", action.result.state);
									music_title.setReadOnly(false);
								}
							});
	        			}else{
	        				Ext.getCmp('music_add_info').setValue('<font color=red size=3 face="华文楷体">请填写正确的歌曲名称.</font>');
	        			}
	        		}else{
	        			Ext.getCmp('music_add_info').setValue('<font color=red size=3 face="华文楷体">路径不正确.</font>');
	        		}
	        	}
	        },
	         //删除按钮事件处理
	         "musicadd button[id=music_add_submit]":{
	        	click:function(btn){
	        		var fileform = Ext.getCmp('fileform');
	        		if(fileform.isHidden()){
	        			var music_form = Ext.getCmp('music_add').getForm();
	        			if(music_form.isValid()){
	        				var music_title = Ext.getCmp('music_add_title').getValue();
	        				var music_singer = Ext.getCmp('music_add_singer').getValue();
	        				var music_type = Ext.getCmp('music_add_type').getValue();
	        				var music_duration = Ext.getCmp('music_add_duration_minute').getValue()*60+Ext.getCmp('music_add_duration_second').getValue();
	        				var music_year = Ext.getCmp('music_add_year').getValue();
	        				var music_size = Ext.getCmp('music_add_size').getValue();
	        				var music_description = Ext.getCmp('music_add_description').getValue();
	        				Ext.Ajax.request({
                				url : "music_add.action",
                				method : "POST",
                				timeout : 10000,
                				params : {
									'music.title' : music_title,
									'music.singer' : music_singer,
									'music.year':music_year,
									'music.type':music_type,
									'music.duration':music_duration,
									'music.description':music_description,
									'music.user.id':comm.get('user_id'),
									'music.size':music_size
								},
								success : function(response, opts) {
									try {
										if (Ext.JSON.decode(response.responseText).message == "success") {
											Ext.Msg.alert('成功','音乐上传和载入后台成功。');
											music_form.reset();
											fileform.setVisible(true);
											fileform.getForm().reset();
											Ext.getCmp('music_add_title').setReadOnly(false);
											Ext.getCmp('fileform').setDisabled(false);
										}else{								
											Ext.Msg.alert("提示",Ext.JSON.decode(response.responseText).message);
										}
									} catch (e) {
										self.location.href='login.jsp';
									}
								}
                			});
	        			}else{
	        				Ext.getCmp('music_add_info').setValue('<font color=red size=3 face="华文楷体">请按要求填写.</font>');
	        			}
	        		}else{
	        			Ext.getCmp('music_add_info').setValue('<font color=red size=3 face="华文楷体">请先上传文件.</font>');
	        		}
	        	}
	        },
	         //保存按钮事件处理 
	         "musicadd button[id=music_add_reset]":{
	        	click:function(btn){
	        		var fileform = Ext.getCmp('fileform');
	        		if(fileform.isHidden()){
	        			Ext.getCmp('music_add_info').setValue('<font color=red size=3 face="华文楷体">文件已上传不能重置.</font>');
	        		}else{
	        			fileform.getForm().reset();
	        			var music_form = Ext.getCmp('music_add').getForm();
	        			music_form.reset();
	        		}
	        	}
	        },
	        //搜索按钮事件处理
	        "musicadd button[id=music_add_close]":{
	        	click:function(searchbutton){
	        		var fileform = Ext.getCmp('fileform');
	        		if(fileform.isHidden()){
	        			Ext.getCmp('music_add_info').setValue('<font color=red size=3 face="华文楷体">文件已上传不能关闭.</font>');
	        		}else{
	        			Ext.getCmp('wms_music_add').close();
	        		}
	        	}
	        },"musiclist button[id=music_search]":{
	        	 click:function(searchbutton){
	        		 var grid=this.getGridObj(searchbutton);
		        		var input=Ext.getCmp("musicsearchmatter");
		        		var type=Ext.getCmp("musicsearchtype");
		        		var inputValue=input.getValue();
		        		var typeValue=type.getValue();
		        		var search_scope = Ext.getCmp("musicsearchtype2").getValue();
		        		if(typeValue==null){
		        			Ext.Msg.alert("提示","请选择搜索类型");
		        			return;
		        		}
		        		if(search_scope==null){
		        			Ext.Msg.alert("提示","请选择搜索精度");
		        			return;
		        		}
		        		grid.getStore().getProxy().extraParams={
		        			search_value:inputValue,
		        			search_type:typeValue,
		        			search_scope:search_scope
		        		};
		        		grid.getStore().load(); 
	        	}
	        }
        });    
    },
    models: [
        'Core.MusicApp.model.MusicModel','Core.MusicApp.model.UserModel'
	],
    stores: [
        'Core.MusicApp.store.MusicStore'
	],
    views: [
    	"Core.MusicApp.view.MusicAdd","Core.MusicApp.view.MusicList"
	]
});