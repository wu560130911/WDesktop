
Ext.define('MyDesktop.DesktopApp.Player', {

	extend : 'Ext.ux.desktop.Module',

	init : function() {
		this.launcher = {
			text : '播放器',
			iconCls : 'game',
			handler : function() {
				return false;
			},
			menu : {
				items : []
			}
		};
		this.launcher.menu.items.push({
            text: '音乐播放器',
            widths: 315,
            heights: 150,
            iconCls: 'audio',
            handler : null,
            scope: this,
            id: 'audio'
       });
	},

});
