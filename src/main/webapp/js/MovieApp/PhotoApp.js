Ext.define('MovieApp.PhotoApp', {
    extend: 'Ext.ux.desktop.Module',
    id: 'wms_photo',
    init: function () {
        this.launcher = {
            text: '相册',
            iconCls: 'wms_photo',
            handler: this.createWindow,
            scope: this
        };
    },
    createWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('wms_photo');
        Ext.application({
            name: 'MovieApp.PhotoApp', //应用的名字
            appFolder: "js/MovieApp/PhotoApp", //应用的目录
            launch: function () {//当前页面加载完成执行的函数                
                if (!win) {
                    win = desktop.createWindow({
                        id: 'wms_photo',
                        title: '相册',
                        width: 800,
                        height: 480,
                        iconCls: 'wms_notebook_main',
                        border: false,
                        hideMode: 'offsets',
                        closable:true,
                        closeAction:"destroy",
                        layout:"fit",
                        items:{xtype: 'photoview'}
                    });
                };
                win.show();
                return win;
            },
            controllers: [
                'PhotoController'
		    ]
        });

    }
});