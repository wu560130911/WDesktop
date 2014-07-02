/*!
* Ext JS Library 4.0
* Copyright(c) 2006-2011 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/

Ext.define('MyDesktop.DesktopApp.GameMain', {
	
    extend: 'Ext.ux.desktop.Module',

    init : function() {

        this.launcher = {
            text: '游戏',
            iconCls: 'game',
            handler: function() {
                return false;
            },
            menu: {
                items: []
            }
        };
        this.launcher.menu.items.push({
             text: '塔防游戏',
             iconCls:'game_item',
             handler : this.createWindow,
             scope: this,
             windowId: 'game-0001',
             url:'塔防/td.html',
             widths:720,
             heights:650
        });
        this.launcher.menu.items.push({
            text: '太空大战',
            iconCls:'game_item',
            handler : this.createWindow,
            scope: this,
            windowId: 'game-0002',
            url:'太空大战/play.html',
            widths:650,
            heights:460
       });
       this.launcher.menu.items.push({
            text: '水果忍者',
            iconCls:'game_item',
            handler : this.createWindow,
            scope: this,
            windowId: 'game-0003',
            url:'水果忍者/index.html',
            widths:720,
            heights:600
       });
       this.launcher.menu.items.push({
           text: '中国象棋',
           iconCls:'game_item',
           handler : this.createWindow,
           scope: this,
           windowId: 'game-0004',
           url:'中国象棋/index.html',
           widths:720,
           heights:600
      });
       this.launcher.menu.items.push({
           text: '打飞机',
           iconCls:'game_item',
           handler : this.createWindow,
           scope: this,
           windowId: 'game-0005',
           url:'打飞机/index.html',
           widths:340,
           heights:600
      });
    },
    createWindow:function(src){
    	 var me = this, desktop = me.app.getDesktop(),
         win = desktop.getWindow(src.windowId);
    	 if(!win){
    		 win = desktop.createWindow({
    			id:src.windowId,
    			iconCls:'game_item',
    			title:src.text,
    			animCollapse: false,
                border: false,
                constrainHeader: true,
                width:src.widths,
                maximizable:false,
                height:src.heights,
                html:"<iframe width='"+src.widths+"px' height='"+src.heights+"px' frameborder='0' src='toolpages/game/"+src.url+"'></iframe>"
    		 });
    	 }
    	 win.show();
    	 return win;
    }
});