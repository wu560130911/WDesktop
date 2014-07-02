
Ext.define('MyDesktop.DesktopApp.HelpWindow', {
	
    extend: 'Ext.ux.desktop.Module',

    id:'wms_help',
    wmstips:'<b>系统设置</b><br>本系统个性化设置',

    init : function(){
        this.launcher = {
            text: '系统设置',
            iconCls:'wms_help'
        };
    },
    /* createWindow uses renderTo, so it is immediately rendered */
    createWindow : function(){
        var me = this, desktop = me.app.getDesktop(),
            win = desktop.getWindow('wms_help');
        if (!win) {
            win = desktop.createWindow({
                id: 'wms_help',
                title: '系统设置',
                width: 600,
                height: 400,
                iconCls: 'wms_help',
                animCollapse: false,
                border: false,
                maximizable:false,
                constrainHeader: true,
                bbar: [{
                	xtype: 'checkbox',
                    boxLabel: '开机启动',
                    checked:comm.get('starthelpwindow') == 'true',
                    handler:function(e,t,opts){
                    	localStorage.setItem('starthelpwindow',t);
                    }
                },'->',{
                	id: 'move-prev',
                    text: '上一步',
                    handler: function(btn) {
                    	me.Navigate(btn, "prev");
                    },
                    disabled: true
                },{
                    id: 'move-next',
                    text: '下一步',
                    handler: function(btn) {
                    	me.Navigate(btn,'next');
                    }
                }],
                layout: {
                    type: 'card'
                },
                items: [{
                	border:true,
                	title:'天气预报',
                	html:"<br><br><br><iframe width='100%' height='100%' frameborder='0' src='http://m.weather.com.cn/m/pn11/weather.htm'></iframe>"
                },{
                    border: true,
                    title:'第一步   快速启动项设置',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                	items:[{
                		xtype: 'checkbox',
                        boxLabel: '视频播发器',
                        flex: 1,
                        checked:true,
                        handler:function(e,t,opts){
                        	me.CheckQuickStart(e,t,opts,'video','视频播发器');
                        }
                	},{
                		xtype: 'checkbox',
                        boxLabel: '音乐播发器',
                        flex: 1,
                        handler:function(e,t,opts){
                        	me.CheckQuickStart(e,t,opts,'audio','音乐播发器');
                        }
                	},{
                		xtype: 'checkbox',
                        boxLabel: '视频上传',
                        flex: 1,
                        handler:function(e,t,opts){
                        	me.CheckQuickStart(e,t,opts,'wms_movie_add','视频上传');
                        }
                	},{
                		xtype: 'checkbox',
                        boxLabel: '音乐上传',
                        flex: 1,
                        handler:function(e,t,opts){
                        	me.CheckQuickStart(e,t,opts,'wms_music_add','音乐上传');
                        }
                	},{
                		xtype: 'checkbox',
                        boxLabel: '视频列表',
                        flex: 1,
                        handler:function(e,t,opts){
                        	me.CheckQuickStart(e,t,opts,'wms_movie_list','视频列表');
                        }
                	},{
                		xtype: 'checkbox',
                        boxLabel: '音乐列表',
                        flex: 1,
                        handler:function(e,t,opts){
                        	me.CheckQuickStart(e,t,opts,'wms_music_list','音乐列表');
                        }
                	}]
                },{
                	border: true,
                    title:'第二步   电影播放说明',
                    html:'<p><center><b>电影点播说明</b></center></p><p>1.您可以在电影列表里查找您想看的影片.</p><p>2.点播影片需要积分，请累积您的积分和等级.</p>'
                }]
            });
            win.getLayout().setActiveItem(0);
        }
        return win;
    },
    Navigate:function(btn,direction){
    	var window = btn.up("window");
    	var layout = window.getLayout();
    	if(btn.text=='关闭'){
    		window.close();
    		return;
    	}
        layout[direction]();
        Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
        if(!layout.getNext()){
        	Ext.getCmp('move-next').setText('关闭');
        }else{
        	Ext.getCmp('move-next').setText('下一步');
        }
    },
    CheckQuickStart: function(e,t,opts,id,name){
    	var quickStart = Ext.getCmp('wmsdesktop').taskbar;
    	if(Ext.getCmp('quickstart_'+id)!=null&&!t){
    		quickStart.quickStart.remove('quickstart_'+id);
    	}else if(Ext.getCmp('quickstart_'+id)==null&&t){
    		quickStart.quickStart.add({
            	tooltip: { text:name, align: 'bl-tl' },
                overflowText: name,
                iconCls: id,
                module: id,
                id:'quickstart_'+id,
                handler: quickStart.onQuickStartClick,
                scope: this
            });
    	}
    }
});
