Ext.define('MovieApp.MusicApp', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
"Core.app.model.SelectTypeModel"
    ],
    id: 'wms_music_add',
    init: function () {
        this.launcher = {
            text: '音乐上传',
            iconCls: 'wms_music_add',
            handler: this.createWindow,
            scope: this
        };
    },
    createWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('wms_music_add');
        Ext.application({
            name: 'MovieApp.MusicApp', //应用的名字
            appFolder: "js/MovieApp/MusicApp", //应用的目录
            appProperty: 'musicadd',
            launch: function () {//当前页面加载完成执行的函数          
                if (!win) {
                    win = desktop.createWindow({
                        id: 'wms_music_add',
                        title: '音乐上传',
                        width: 660,
                        height: 540,
                        iconCls: 'wms_music_add',
                        border: false,
                        hideMode: 'offsets',
                        closable:false,
                        closeAction:"destroy",
                        layout:"fit",
                        items:{xtype: 'musicadd'}
                    });
                };
                win.show();
                return win;
            },
            controllers: [
		    'MusicController'
		    ]
        });
    }
});