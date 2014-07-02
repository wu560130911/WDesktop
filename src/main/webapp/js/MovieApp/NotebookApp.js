Ext.define('MovieApp.NotebookApp', {
    extend: 'Ext.ux.desktop.Module',
    id: 'wms_notebook_main',
    init: function () {
        this.launcher = {
            text: '日记本',
            iconCls: 'wms_notebook_main',
            handler: this.createWindow,
            scope: this
        };
    },
    createWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('wms_notebook_main');
        Ext.application({
            name: 'MovieApp.NotebookApp', //应用的名字
            appFolder: "js/MovieApp/NotebookApp", //应用的目录
            launch: function () {//当前页面加载完成执行的函数                
                if (!win) {
                    win = desktop.createWindow({
                        id: 'wms_notebook_main',
                        title: '日记本',
                        width: 800,
                        height: 480,
                        iconCls: 'wms_notebook_main',
                        border: false,
                        hideMode: 'offsets',
                        closable:true,
                        closeAction:"destroy",
                        layout:"fit",
                        items:{xtype: 'notebookviewport'}
                    });
                };
                win.show();
                return win;
            },
            controllers: [
                'NotebookController'
		    ]
        });

    }
});