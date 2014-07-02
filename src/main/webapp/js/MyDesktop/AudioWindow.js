/*!
* Ext JS Library 4.0
* Copyright(c) 2006-2011 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/

// From code originally written by David Davis (http://www.sencha.com/blog/html5-video-canvas-and-ext-js/)

Ext.define('MyDesktop.AudioWindow', {
    extend: 'Ext.ux.desktop.Module',

    uses: [
        'Ext.ux.desktop.Audio'
    ],
    id:'audio',
    windowId: 'audio-window',
    wmstips:'<b>音乐播放器</b><br>播放你想听的音乐',
    tipWidth: 160,
    tipHeight: 96,

    init : function(){
        this.launcher = {
            text: '音乐播放器',
            iconCls:'audio'
        };
    },

    createWindow : function(){
        var me = this, desktop = me.app.getDesktop(),
            win = desktop.getWindow('audio');
        if (!win) {
            win = desktop.createWindow({
                id: 'audio',
                title: '音乐播放器',
                width: 315,
                height: 150,
                iconCls: 'audio',
                animCollapse: false,
                border: false,
                maximizable:false,
                constrainHeader: true,
                layout: 'absolute',
                defaults:{
                	labelWidth:80
                },
                listeners:{
                	beforeclose:function(){
                		localStorage.setItem('music_title',Ext.getCmp('music_play_wms').getValue());
                		localStorage.setItem('music_singer',Ext.getCmp('music_play_singer').getValue());
                	}
                },
                items: [{
                	xtype:'displayfield',
                	x:10,
                	y:30,
                	id:'music_play_wms',
                	hidden:true,
                	value:'祝福'
                },{
                	xtype:'displayfield',
                	x:10,
                	y:10,
                	id:'music_play_title',
                	fieldLabel:'<font size=3 face="华文楷体">歌曲名称</font>',
                	value:'<font size=3 face="华文楷体" color=red>祝福</font>'
                },{
                	xtype:'displayfield',
                	x:10,
                	y:30,
                	id:'music_play_singer',
                	fieldLabel:'<font size=3 face="华文楷体">歌手</font>',
                	value:'<font size=3 face="华文楷体" color=red>张学友</font>'
                },{
                	xtype:'displayfield',
                	x:10,
                	y:50,
                	id:'music_play_duration',
                	fieldLabel:'<font size=3 face="华文楷体">长度</font>',
                	value:'<font size=3>4:33</font>'
                },{
                        xtype: 'audio',
                        x:0,
                        y:77,
                        id: 'audio-player',
                        src: '',
                        autobuffer: true,
                        controls : true/* default 如果出现该属性，则向用户显示控件，比如播放按钮。*/
                    }
                ]
            });
        }

        if (me.tip) {
            me.tip.setTarget(win.taskButton.el);
        }
        win.show();
        return win;
    }

});
