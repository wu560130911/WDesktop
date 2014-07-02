/*!
* Ext JS Library 4.0
* Copyright(c) 2006-2011 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/

// From code originally written by David Davis (http://www.sencha.com/blog/html5-video-canvas-and-ext-js/)

/* -NOTICE-
 * For HTML5 video to work, your server must
 * send the right content type, for more info see:
 * http://developer.mozilla.org/En/HTML/Element/Video
 */

Ext.define('Ext.ux.desktop.Video', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.video',
    layout: 'fit',
    autoplay: false,
    controls: true,
    bodyStyle: 'background-color:#000;color:#fff',
    html: '',
    suggestChromeFrame: true,
    
    initComponent: function () {
        this.callParent();
    },
    
    afterRender: function () {
        var fallback;

        if (this.fallbackHTML) {
            fallback = this.fallbackHTML;
        } else {
        	fallback = "您的浏览器不支持HTML5的Video.";
            if ( Ext.isIE && this.suggestChromeFrame ) {
                /* chromeframe requires that your site have a special tag in the header
                 * see http://code.google.com/chrome/chromeframe/ for details
                 */
                fallback += '<a href="http://www.google.com/chromeframe"'
                     + '>Get Google Chrome Frame for IE</a>';
            } else if ( Ext.isChrome ) {
                fallback += '<a href="http://www.google.com/chrome"'
                     + '>升级谷歌浏览器</a>';
            } else if ( Ext.isGecko ) {
                fallback += '<a href="http://www.mozilla.com/en-US/firefox/upgrade.html"'
                     + '>升级到 Firefox 3.5</a>';
            } else {
                fallback += '<a href="http://www.mozilla.com/en-US/firefox/upgrade.html"'
                     + '>获取 Firefox 3.5</a>';
            }
        }

        // match the video size to the panel dimensions
        var size = this.getSize();

        var cfg = Ext.copyTo({
            tag   : 'video',
            width : size.width,
            id:'video_play',
            height: size.height
        },
        this, 'poster,start,loopstart,loopend,playcount,autobuffer,loop');

        // just having the params exist enables them
        if (this.autoplay) {
            cfg.autoplay = 1;
        }
        if (this.controls) {
            cfg.controls = 1;
        }

        // handle multiple sources
        if (Ext.isArray(this.src)) {
            cfg.children = [];

            for (var i = 0, len = this.src.length; i < len; i++) {
                if (!Ext.isObject(this.src[i])) {
                	 throw "source list passed to html5video panel must be an array of objects";
                }

                cfg.children.push(
                    Ext.applyIf({tag: 'source'}, this.src[i])
                );
            }

            cfg.children.push({
                html: fallback
            });

        } else {
            cfg.src  = this.src;
            cfg.html = fallback;
        }

        this.video = this.body.createChild(cfg);
        var el = this.video.dom;
        this.supported = (el && el.tagName.toLowerCase() == 'video');
        
        this.contextmenu = Ext.create('Ext.menu.Menu',{
    		width: 100,
    		items:[{
    			text:'隐藏列表',
    			handler:function(btn){
    				var video_play_lists = Ext.getCmp('video_play_lists');
    				if(video_play_lists.isHidden()){
    					video_play_lists.show();
    					btn.setText('隐藏列表');
    	            }else{
    	            	video_play_lists.hide();
    	            	btn.setText('显示列表');
    	            }
    			}
    		},{
    			text:'关于我',
    			handler:function(){
    				
    			}
    		}]
    	});
        
        this.el.on('contextmenu', function (e) {
            e.stopEvent();
            this.contextmenu.showAt(e.getXY());
        }, this);
        
        /*Ext.get('video_play').on('click', function() {
    		var video_play = document.getElementById('video_play');
    		if(video_play.paused){
    			video_play.play();
    		}else{
    			video_play.pause();
    		}
        });
        
        Ext.get('video_play').on('dblclick', function() {
        	
        });
        
        Ext.get('video_play').on('ended', function() {
        });*/
        
    },

    afterComponentLayout : function() {
        var me = this;

        me.callParent(arguments);

        if (me.video) {
            me.video.setSize(me.body.getSize());
        }
    },

    onDestroy: function () {
        var video = this.video;
        if (video) {
            var videoDom = video.dom;
            if (videoDom && videoDom.pause) {
                videoDom.pause();
            }
            video.remove();
            this.video = null;
        }

        this.callParent();
    }
});
