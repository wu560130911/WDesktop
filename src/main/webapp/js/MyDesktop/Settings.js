/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.Settings', {
    extend: 'Ext.window.Window',

    uses: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.field.Checkbox',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Border',
        'Ext.ux.desktop.Wallpaper',
        'MyDesktop.WallpaperModel',
        'Ext.ux.desktop.theme.ThemeView',
        'Ext.ux.desktop.theme.ThemeModel'
    ],

    layout: 'fit',
    title: '个性化',
    modal: true,
    width: 640,
    height: 480,
    border: false,

    initComponent: function () {
        var me = this;
        me.selected = me.desktop.getWallpaper();
        me.stretch = me.desktop.wallpaper.stretch;

        me.preview = Ext.create('widget.wallpaper');//调用extjs中core中的壁纸模板类  
        me.preview.setWallpaper(me.selected);
        me.tree = me.createTree();

        me.buttons = [
            { text: '确定', handler: me.onOK, scope: me },
            { text: '取消', handler: me.close, scope: me }
        ];

        me.items = [{
        	xtype : 'tabpanel',
        	layout : 'fit',
			minTabWidth : 100,
        	items : [{
        		title : '主题',
        		layout : 'fit',
        		items : [me.createThemeView()]
        	},{
        		layout: 'anchor',
        	    title: '壁纸设置',
        	    items:[{
                    anchor: '0 -30',
                    border: false,
                    layout: 'border',
                    items: [me.tree,{
                            xtype: 'panel',
                            title: '预览',
                            region: 'center',
                            layout: 'fit',
                            items: [ me.preview ]
                    }]
            },{
                    xtype: 'checkbox',
                    boxLabel: '拉伸适合屏幕',
                    checked: me.stretch,
                    listeners: {
                        change: function (comp) {
                            me.stretch = comp.checked;
                        }
                    }
            }]
        	}]
        }];
        
        me.callParent();
    },

    createThemeStore : function(){
    	var me = this;
    	function child(name,theme,background){
    		return {name : name,theme : theme,background :background };
    	}
    	me.themeStore = Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.theme.ThemeModel',
                data: [child('默认风格','default','default.png'),
		               child('现代风格','access','access.png'),
                       child('银灰风格','gray','gray.png')
                       ]
            });
        return me.themeStore;
    },
    
    createThemeView : function(){
    	var me = this;
    	me.themeView = new Ext.ux.desktop.theme.ThemeView({
    		store : me.createThemeStore(),
    		listeners : {
    			itemclick : me.onThemeItemClick,
    			afterrender: { fn: me.onThemeViewRender, delay: 100 },
    			scope : me
    		}
    	});
    	
    	return me.themeView;
    },
    
    createTree : function() {
        var me = this;
        function child (img) {
            return { img: img, text: me.getTextOfWallpaper(img), iconCls: '', leaf: true };
        }

        var tree = new Ext.tree.Panel({
            title: '壁纸',
            rootVisible: false,
            lines: false,
            autoScroll: true,
            width: 150,
            region: 'west',
            split: true,
            minWidth: 100,
            listeners: {
                afterrender: { fn: this.setInitialSelection, delay: 100 },
                select: this.onSelect,
                scope: this
            },
            store: new Ext.data.TreeStore({
                model: 'MyDesktop.WallpaperModel', //初始化壁纸
                root: {
                    text:'Wallpaper',
                    expanded: true,
                    children:[
                        { text: "无", iconCls: '', leaf: true },
                        {text:'山水风景',img:'19201080.jpg',icon:'js/MyDesktop/png/19201080.png',leaf:true},
                        {text:'晴空行云',img:'blue-curtain.jpg',icon:'js/MyDesktop/png/blue-curtain.png',leaf:true},
                        {text:'青山绿草',img:'blue.jpg',icon:'js/MyDesktop/png/blue.png',leaf:true},
                        {text:'梦幻世界',img:'cloud.jpg',icon:'js/MyDesktop/png/cloud.png',leaf:true},
                        {text:'奇特世界',img:'colorado-farm.jpg',icon:'js/MyDesktop/png/colorado-farm.png',leaf:true},
                        {text:'大象',img:'desktop2.jpg',icon:'js/MyDesktop/png/desktop2.png',leaf:true},
                        {text:'蒙古草原',img:'FGHJ_079020.jpg',icon:'js/MyDesktop/png/FGHJ_079020.png',leaf:true},
                        {text:'小麦',img:'fields-of-peace.jpg',icon:'js/MyDesktop/png/fields-of-peace.png',leaf:true},
                        {text:'清新早晨',img:'fresh-morning.jpg',icon:'js/MyDesktop/png/fresh-morning.png',leaf:true},
                        {text:'青草风景',img:'landscape.jpg',icon:'js/MyDesktop/png/landscape.png',leaf:true},
                        {text:'绿水青山',img:'mountains.jpg',icon:'js/MyDesktop/png/mountains.png',leaf:true},
                        {text:'天空',img:'sky.jpg',icon:'js/MyDesktop/png/sky.png',leaf:true},
                        {text:'幻彩蓝天',img:'pinky_light.jpg',icon:'js/MyDesktop/png/pinky_light.png',leaf:true},
                        {text:'梦翔天际',img:'desktop.jpg',icon:'js/MyDesktop/png/desktop.png',leaf:true}
                    ]
                }
            })
        });

        return tree;
    },

    getTextOfWallpaper: function (path) {
        var text = path, slash = path.lastIndexOf('/');
        if (slash >= 0) {
            text = text.substring(slash+1);
        }
        var dot = text.lastIndexOf('.');
        text = Ext.String.capitalize(text.substring(0, dot));
        text = text.replace(/[-]/g, ' ');
        return text;
    },

    onOK: function () {
        var me = this;
        if (me.selected) {
            me.desktop.setWallpaper(me.selected, me.stretch);
        }
        localStorage.setItem('wallpaper_path',me.selected);
        localStorage.setItem('wallpaper_stretch',me.stretch);
        
        me.destroy();
    },

    onSelect: function (tree, record) {
        var me = this;

        if (record.data.img) {
            me.selected = 'js/MyDesktop/wallpapers/' + record.data.img;//指定壁纸的路径
        } else {
            me.selected = Ext.BLANK_IMAGE_URL;
        }

        me.preview.setWallpaper(me.selected);
    },

    setInitialSelection: function () {
        var s = this.desktop.getWallpaper();
        if (s) {
            var path = 'js/MyDesktop/Wallpaper/' + this.getTextOfWallpaper(s);
            this.tree.selectPath(path, 'text');
        }
    },
    
    onThemeItemClick : function(view,record){
    	var me = this,theme = me.desktop.temp_theme;
    	if(theme !== record.data.theme){
    		Ext.util.CSS.swapStyleSheet('theme','js/extjs/resources/css/theme-'+ record.data.theme +'.css');
    		me.desktop.temp_theme = record.data.theme;
    	}
    },
    
    
    onThemeViewRender:function(){
    	var me = this;
    	if(me.desktop.theme == undefined){
    		me.desktop.theme = theme;
    		me.desktop.temp_theme = theme;
    	}
    	var t = me.desktop.theme;
    	if (t) {
            var record = me.themeStore.findRecord('theme',t);
            if(record){
            	me.themeView.getSelectionModel().select(me.themeStore.indexOf(record));
            }
        }
    }
});
