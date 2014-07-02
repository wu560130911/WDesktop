
Ext.define('Wdesktop.core.widget.Audio', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.audio',
    layout: 'fit',
    autoplay: true,
    controls: true,
    bodyStyle: 'background-color:#000000;color:#FFFFFF',
    html: '',
    suggestChromeFrame: false,
    islast:false,

    initComponent: function () {
        this.callParent();
    },

    afterRender: function () {
    	var me = this;
        var fallback;
        if (this.fallbackHTML) {
            fallback = this.fallbackHTML;
        } else {
        	fallback = "您的浏览器不支持HTML5的Audio.";
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
        var music_title = localStorage.getItem('music_title');
        var music_current = localStorage.getItem('music_current');
        var music_duration = localStorage.getItem('music_duration');
        var music_singer = localStorage.getItem('music_singer');
        var cfg = Ext.copyTo({
            tag   : 'audio',
            id:'audio_player'
        },
        this, 'start,loopend,autobuffer,loop');

        if (this.autoplay) {
            cfg.autoplay = 1;
        }
        if (this.controls) {
            cfg.controls = 1;
        }
        
        if(music_title&&music_current&&music_duration&&(this.src==null||this.src=='')){
        	this.islast=true;
        	this.src = [{
        		src:'Music/'+music_title+'.mp3'
        	},{
        		src:'Music/'+music_title+'.ogg'
        	}];
        	Ext.getCmp('music_play_wms').setValue(music_title);
        	Ext.getCmp('music_play_title').setValue('<font size=3 face="华文楷体" color=red>'+music_title+'</font>');
    		Ext.getCmp('music_play_singer').setValue(music_singer);
    		var seconds = (music_duration)%60;
    		Ext.getCmp('music_play_duration').setValue('<font size=3>'+(music_duration-seconds)/60+':'+parseInt(seconds)+'</font>');
        }else if(this.src==null||this.src==''){
        	this.islast=false;
        	this.src = [{ src: 'Music/祝福.mp3'},{ src: 'Music/祝福.ogg'}];
        }
        if (Ext.isArray(this.src)) {
            cfg.children = [];
            for (var i = 0, len = this.src.length; i < len; i++) {
                if (!Ext.isObject(this.src[i])) {
                	 throw "source list passed to html5 audio panel must be an array of objects";
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
        if(Ext.isIE){
        	var audio_play_setting = Ext.getCmp('audio');
        	audio_play_setting.setWidth(420);
        	audio_play_setting.setHeight(160);
        }
        this.audio = this.body.createChild(cfg);
        var el = this.audio.dom;
        this.supported = (el && el.tagName.toLowerCase() == 'audio');
        this.el.on('contextmenu', function (e) {
            e.stopEvent();
        }, this);
        Ext.get('audio_player').on('ended', function(e,value) {
        	localStorage.removeItem('music_current');
        	localStorage.removeItem('music_title');
        	localStorage.removeItem('music_duration');
        	localStorage.removeItem('music_singer');
        	//currentTime当前播放的位置，赋值可改变位置
        	/*currentSrc
        	currentTime
        	videoWidth
        	videoHeight
        	duration
        	ended
        	error
        	paused
        	muted
        	seeking
        	volume
        	paused
        	muted*/
        });
        Ext.get('audio_player').on('loadedmetadata', function(e,value) {
        	me.audio = this;
        	if(me.islast){
        		this.dom.currentTime=music_current;
        	}
        });
    },

    afterComponentLayout : function() {
        var me = this;
        me.callParent(arguments);
        if (me.audio) {
        	if(Ext.isIE){
        		me.audio.setWidth(400);
            }else{
            	me.audio.setWidth(300);
            	me.audio.setHeight(30);
            }
        }
    },

    onDestroy: function () {
        var audio = this.audio;
        var duration = audio.dom.duration;
        var currentTime = audio.dom.currentTime;
        if(currentTime<duration){
        	localStorage.setItem('music_current',currentTime);
        	localStorage.setItem('music_duration',duration);
        }else{
        	localStorage.removeItem('music_current');
        	localStorage.removeItem('music_title');
        	localStorage.removeItem('music_duration');
        	localStorage.removeItem('music_singer');
        }
        if (audio) {
            var audioDom = audio.dom;
            if (audioDom && audioDom.pause) {
            	audioDom.pause();
            }
            audio.remove();
            this.audio = null;
        }
        this.callParent();
    }
});
