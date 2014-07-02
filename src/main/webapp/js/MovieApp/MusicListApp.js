Ext.define('MovieApp.MusicListApp', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
"Core.app.model.SelectTypeModel"
    ],
    id: 'wms_music_list',
    init: function () {
        this.launcher = {
            text: '音乐列表',
            iconCls: 'wms_music_list',
            handler: this.createWindow,
            scope: this
        };
    },
    createWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('wms_music_list');
        Ext.application({
            name: 'MovieApp.MusicApp', //应用的名字
            appFolder: "js/MovieApp/MusicApp", //应用的目录
            appProperty: 'musiclist',
            launch: function () {//当前页面加载完成执行的函数                
                if (!win) {
                    win = desktop.createWindow({
                        id: 'wms_music_list',
                        title: '音乐列表',
                        width: 700,
                        height: 480,
                        iconCls: 'wms_music_list',
//                        animCollapse: false,
                        border: false,
                        hideMode: 'offsets',
                        closable:true,
                        closeAction:"destroy",
                        layout:"fit",
                        items:{xtype: 'musiclist'}
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