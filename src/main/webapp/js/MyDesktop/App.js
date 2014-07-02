var desktopapp = Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',
    
    id:'desktopapp',

    /*加载子模块的app入口文件*/
    requires: [
        'Ext.window.MessageBox',
        'Ext.ux.desktop.ShortcutModel',
        'MyDesktop.SystemStatus',
        'MyDesktop.VideoWindow',
//        'MyDesktop.DesktopApp.Player',
        'MyDesktop.AudioWindow',
        'MyDesktop.Settings',
        'MovieApp.MusicApp',
        'MovieApp.MusicListApp',
        'MovieApp.MovieAddApp',
        'MovieApp.MovieListApp',
        'MyDesktop.Settings',
 //       'MyDesktop.LoginWindow',
 //       'MyDesktop.Register',
        'MyDesktop.DesktopApp.HelpWindow',
        'MovieApp.NotebookApp',
        'MyDesktop.DesktopApp.GameMain',
        'MovieApp.PhotoApp'
    ],

    /*初始化函数*/
    init: function() {
        this.callParent();
        if(comm.get('user_id')!=null&&comm.get('user_name')!=null){
        	Ext.Ajax.request({
        		//async:false,
        		url : "user_checklogin.action",
				method : "POST",
				timeout : 10000,
				params:{
					'username':comm.get('user_id')
				},
				success:function(response, opts){
					if (Ext.JSON.decode(response.responseText).message == "success") {
						if(comm.get('starthelpwindow') =='true'){
							var wmsdesktop = Ext.getCmp('wmsdesktop').app;
							wmsdesktop.createWindow(wmsdesktop.getModule('wms_help'));
						}
	        			return;
					}else{
						self.location.href = 'login.jsp';
					}
				}
        	});
        }else{
        	self.location.href = 'login.jsp';
        }
    },

    /*将子模块的app文件放到desktop的管理器*/
    getModules : function(){//开始菜单
        return [
            new MyDesktop.DesktopApp.HelpWindow(),
            new MyDesktop.DesktopApp.GameMain(),
            new MyDesktop.VideoWindow(),
            new MyDesktop.AudioWindow(),
            new MyDesktop.SystemStatus(),
            new MovieApp.MusicApp(),
            new MovieApp.MusicListApp(),
            new MovieApp.MovieAddApp(),
            new MovieApp.MovieListApp(),
            new MovieApp.NotebookApp(),
            new MovieApp.PhotoApp()
        ];
    },

    /*配置桌面化*/
    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',
             //鼠标右键菜单
            contextMenuItems: [{ 
            	text: '个性化', 
                handler: me.onSettings, //响应函数
                scope: me 
            }],
           //桌面快捷方式
            shortcuts: me.getShortcutsStore(),
            //背景
            wallpaper: comm.get('wallpaper_path'),
            //背景图是否伸展
            wallpaperStretch: comm.get('wallpaper_stretch')
        });
    },

    getShortcutsStore:function(){
    	
    	var store = Ext.create('Ext.data.Store', {
            model: 'Ext.ux.desktop.ShortcutModel',
            data: [
                { name: '日记本', iconCls: 'notepad-shortcut', module: 'wms_notebook_main',wmstips:'查看和写日记'},
                { name: '视频播放器', iconCls: 'video_play_main', module: 'video',wmstips:'播放你想看的视频'},
                { name: '音乐播放器', iconCls: 'music_main', module: 'audio',wmstips:'播放你想听的音乐'},
                { name: '音乐上传', iconCls: 'music_add_desktop', module: 'wms_music_add',wmstips:'上传音乐,赚积分'},
                { name: '音乐列表', iconCls: 'music_list_desktop', module: 'wms_music_list',wmstips:'查看本站的音乐列表'},
                { name: '电影上传', iconCls: 'video_add_desktop', module: 'wms_movie_add',wmstips:'上传电影,增加您的个人积分'},
                { name: '电影列表', iconCls: 'video_list_desktop', module: 'wms_movie_list',wmstips:'查看本站具有的影片,点播影片'}
            ]
        });
    	
    	Ext.Ajax.request({
			url : "user_getRole.action",
			method : "POST",
			timeout : 10000,
			success : function(response, opts) {
				var obj = Ext.JSON.decode(response.responseText);
				if (obj!=null&&obj.message == "success") {
					if(obj.username!=null&&obj.username=="admin"){
						var adminapp = new Ext.ux.desktop.ShortcutModel({
							name: 'System Status', iconCls: 'cpu-shortcut', module: 'systemstatus',wmstips:'<b>系统状态</b><br>查看服务器的运行状态'
						});
						store.add(adminapp);
					}
				}else{	
					self.location.href="login.jsp";
				}
			}
		});
    	
    	return store;
    },
    
    // config for the start menu
    // 开始菜单右边
    getStartConfig : function() {//开始菜单的设置（右边导航栏）
        var me = this, ret = me.callParent();
        
        return Ext.apply(ret, {
            title: '<font size=3 face="华文楷体" color="#FFFFFF">'+comm.get('user_name')+'</font>',
            iconCls: 'user',
            id:'start_menu',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'个性化',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },{
                        text:'锁定系统',
                        iconCls:'lock',
                        handler: me.onLock,
                        scope: me
                    },'-',
                    {
                        text:'退出系统',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },
    //任务栏设置
    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
        	//快速启动栏
            quickStart: [{
            	name: '视频播放器', iconCls: 'video', module: 'video',id:'quickstart_video'
            }],
            trayItems: [{
            	xtype: 'trayclock', flex: 1 //这个是快捷栏右边的时间组件，是定义在TaskBar.js中的Ext.ux.desktop.TrayClock类。  
            }]
        });
    },

    onLogout: function () {//退出系统的操作
        Ext.Msg.confirm('退出系统', '确定要注销吗？',function(btn,text){
        	if(btn=='yes'){
        		sessionStorage.removeItem('user_id');
        		comm.removeAtKey('user_id');
        		Ext.Ajax.request({
    				url : "user_logout.action",
    				method : "POST",
    				timeout : 10000,
    				success : function(response, opts) {
    	        		self.location.href = 'login.jsp';
    				}
    			});
        	}
        });
    },

    onSettings: function () {//设置壁纸的操作
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    },
    onLock:function(){
    	Ext.Loader.loadScript({
    		url:'js/MyDesktop/DesktopApp/LockWindow.js',
    		onLoad:function(){
    			var lockWin = new MyDesktop.DesktopApp.LockWindow({
    	    		desktop: this.desktop
    	    	});
    	    	lockWin.show();
    		},
    		onError:function(){
    			Ext.Msg.show({
    				title: '错误',
    			    msg: '网络连接错误，无法动态加载文件',
    			    icon: Ext.window.MessageBox.ERROR,
    			    buttons: Ext.Msg.OK
    			});
    		}
    	});
    }
});
