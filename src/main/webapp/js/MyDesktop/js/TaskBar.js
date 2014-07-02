/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

/**
 * @class Ext.ux.desktop.TaskBar
 * @extends Ext.toolbar.Toolbar
 */
Ext.define('Ext.ux.desktop.TaskBar', {
    extend: 'Ext.toolbar.Toolbar', // TODO - make this a basic hbox panel...

    requires: [
        'Ext.button.Button',
        'Ext.resizer.Splitter',
        'Ext.menu.Menu',

        'Ext.ux.desktop.StartMenu'
    ],

    alias: 'widget.taskbar',

    cls: 'ux-taskbar',

    /**
     * @cfg {String} startBtnText
     * The text for the Start Button.
     */
    startBtnText: '开始',

    initComponent: function () {
        var me = this;

        me.startMenu = new Ext.ux.desktop.StartMenu(me.startConfig);//开始菜单

        me.quickStart = new Ext.toolbar.Toolbar(me.getQuickStart());//快捷启动菜单

        me.windowBar = new Ext.toolbar.Toolbar(me.getWindowBarConfig());//已打开的窗口
        
        me.tray = new Ext.toolbar.Toolbar(me.getTrayConfig());//快捷右方菜单（如：时间）

        me.items = [
            {
                xtype: 'button',
                cls: 'ux-start-button',
                iconCls: 'ux-start-button-icon',
                menu: me.startMenu,
                menuAlign: 'bl-tl',
                text: me.startBtnText
            },
            me.quickStart,
            {
                xtype: 'splitter', html: '&#160;',
                height: 20, width: 3, // TODO - there should be a CSS way here
                cls: 'x-toolbar-separator x-toolbar-separator-horizontal'
            },
            //'-',
            me.windowBar,
            '-',
            me.tray
        ];

        me.callParent();
    },

    afterLayout: function () {
        var me = this;
        me.callParent();
        me.windowBar.el.on('contextmenu', me.onButtonContextMenu, me);
    },

    /**
     * This method returns the configuration object for the Quick Start toolbar. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getQuickStart: function () {//快速启动菜单
        var me = this, ret = {
            minWidth: 30,
            width: 100,
            height: 25,
            items: [],
            enableOverflow: true
        };

        Ext.each(this.quickStart, function (item) {
            ret.items.push({
                tooltip: { text: item.name, align: 'bl-tl' },
                overflowText: item.name,
                iconCls: item.iconCls,
                module: item.module,
                handler: me.onQuickStartClick,
                id:item.id,
                scope: me
            });
        });

        return ret;
    },

    /**
     * This method returns the configuration object for the Tray toolbar. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getTrayConfig: function () {//快捷栏右边属性
        var ret = {
            width: 163,
            items: this.trayItems//时钟
        };
        delete this.trayItems;
        return ret;
    },

    getWindowBarConfig: function () {
        return {
            flex: 1,
            cls: 'ux-desktop-windowbar',
            items: [ '&#160;' ],
            layout: { overflowHandler: 'Scroller' }
        };
    },

    getWindowBtnFromEl: function (el) {
        var c = this.windowBar.getChildByElement(el);
        return c || null;
    },

    onQuickStartClick: function (btn) {
        var module = this.app.getModule(btn.module),
            window;
        if(Ext.getCmp(module.id)!=null){
        	return;
        }
        if (module) {
            window = module.createWindow();
        }
    },
    
    onButtonContextMenu: function (e) {
        var me = this, t = e.getTarget(), btn = me.getWindowBtnFromEl(t);
        if (btn) {
            e.stopEvent();
            me.windowMenu.theWin = btn.win;
            me.windowMenu.showBy(t);
        }
    },

    onWindowBtnClick: function (btn) {
        var win = btn.win;

        if (win.minimized || win.hidden) {
            win.show();
        } else if (win.active) {
            win.minimize();
        } else {
            win.toFront();
        }
    },

    addTaskButton: function(win) {
        var config = {
            iconCls: win.iconCls,
            enableToggle: true,
            toggleGroup: 'all',
            width: 140,
            margins: '0 2 0 3',
            text: Ext.util.Format.ellipsis(win.title, 20),
            listeners: {
                click: this.onWindowBtnClick,
                scope: this
            },
            win: win
        };

        var cmp = this.windowBar.add(config);
        cmp.toggle(true);
        return cmp;
    },

    removeTaskButton: function (btn) {
        var found, me = this;
        me.windowBar.items.each(function (item) {
            if (item === btn) {
                found = item;
            }
            return !found;
        });
        if (found) {
            me.windowBar.remove(found);
        }
        return found;
    },

    setActiveButton: function(btn) {
        if (btn) {
            btn.toggle(true);
        } else {
            this.windowBar.items.each(function (item) {
                if (item.isButton) {
                    item.toggle(false);
                }
            });
        }
    }
});

/**
 * @class Ext.ux.desktop.TrayClock
 * @extends Ext.toolbar.TextItem This class displays a clock on the toolbar.
 */
Ext.define('Ext.ux.desktop.TrayClock', {
	
			extend : 'Ext.toolbar.TextItem',
			alias : 'widget.trayclock',
			timeFormat : 'H:i:s',
			iconCls : 'clock',
			GetWeek : function() {
				var d, day, x;
				var x = new Array("星期日", "星期一", "星期二");
				var x = x.concat("星期三", "星期四", "星期五");
				var x = x.concat("星期六");
				d = new Date();
				day = d.getDay();
				return (x[day]);
			},
			GetDate:function(){
				var year,month,day,d;
				d = new Date();
				year = d.getFullYear();
				month = d.getMonth()+1;
				day = d.getDate();
				return year+"/"+month+"/"+day;
			},
			initComponent : function() {
				var me = this;
				me.callParent();
			},
			afterRender : function() {
				var me = this;
				Ext.Function.defer(me.updateTime, 100, me);
				me.callParent();
			},
			onDestroy : function() {
				var me = this;
				if (me.timer) {
					window.clearTimeout(me.timer);
					me.timer = null;
				}
				me.callParent();
			},
			updateTime : function() {

				var me = this, time = me.GetDate()+'&nbsp;'+me.GetWeek() + '&nbsp;'
						+ Ext.Date.format(new Date(), me.timeFormat), text = time;
				if (me.lastText != text) {
					me.setText(text);
					me.lastText = text;
				}
				me.timer = Ext.Function.defer(me.updateTime, 1000, me);
			}
		});