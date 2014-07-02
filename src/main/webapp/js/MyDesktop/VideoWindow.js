Ext.define('MyDesktop.VideoWindow', {
    extend: 'Ext.ux.desktop.Module',

    uses: [
        'Ext.ux.desktop.Video'
    ],
    
    requires:['MyDesktop.DesktopApp.PlayList'],
    
    id:'video',
    windowId: 'video-window',
    tipWidth: 160,
    tipHeight: 100,

    init : function(){
        this.launcher = {
            text: '视频播放器',
            iconCls:'video'
        };
    },

    /* createWindow uses renderTo, so it is immediately rendered */
    createWindow : function(){
        var me = this, desktop = me.app.getDesktop(),
            win = desktop.getWindow('video');
        if (!win) {
            win = desktop.createWindow({
                id: 'video',
                title: '视频播放器',
                width: 800,
                height: 520,
                iconCls: 'video',
                animCollapse: false,
                closeAction:'destroy',
                border: false,
                constrainHeader: true,
                layout : {
            		type : 'border'
            	},
                items: [{
                	xtype : 'playlist',
                	region : 'east'
                },{
                        xtype: 'video',
                        region : 'center',
                        id: 'video-player',
                        poster:'MovieImages/video.png',
                        src: [],
                        autobuffer: true,
                        controls : true,/* default 如果出现该属性，则向用户显示控件，比如播放按钮。*/
                        listeners: {
                            afterrender: function(video) {
                            	me.videoEl = document.getElementById("video_play");
                                if (video.supported) {
                                    me.tip = new Ext.tip.ToolTip({
                                        anchor   : 'bottom',
                                        dismissDelay : 0,
                                        height   : me.tipHeight,
                                        width    : me.tipWidth,
                                        renderTpl: [
                                            '<canvas width="', me.tipWidth,
                                                  '" height="', me.tipHeight, '">'
                                        ],
                                        renderSelectors: {
                                            body: 'canvas'
                                        },
                                        listeners: {
                                            afterrender: me.onTooltipRender,
                                            show: me.renderPreview,
                                            scope: me
                                        }
                                    });
                                    if (me.tip) {
                                    	me.tip.setTarget(win.taskButton.el);
                                    }
                                }
                            }
                        }
                }],
                listeners: {
                    beforedestroy: function() {
                        me.tip = me.ctx = me.videoEl = null;
                    }
                }
            });
        }
        win.show();
        return win;
    },

    onTooltipRender: function (tip) {
    	var el = tip.body.dom, me = this;
        me.ctx = el.getContext && el.getContext('2d');
    },
    renderPreview: function() {
        var me = this;
        if ((me.tip && !me.tip.isVisible()) || !me.videoEl) {
            return;
        }
        if (me.ctx) {
            try {
                me.ctx.drawImage(me.videoEl, 0, 0, me.tipWidth, me.tipHeight);
            } catch(e) {};
        }
        Ext.Function.defer(me.renderPreview, 20, me);
    }
});