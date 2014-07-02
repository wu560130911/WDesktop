Ext.define('Core.apps.MusicApp', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
       "Core.app.model.SelectTypeModel"
    ],
    id: 'wms_music_add',
    wmstips:'<b>音乐上传</b><br>上传音乐,赚积分',
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
        Ext.require([ 'Core.MusicApp.controller.MusicController' ]);
        MainController.getController('Core.MusicApp.controller.MusicController').init();
        if(!win){
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
        }
        win.show();
        return win;
    }
});