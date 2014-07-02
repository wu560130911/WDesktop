Ext.define('MovieApp.MovieAddApp', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
    "Core.app.model.SelectTypeModel"
    ],
    id: 'wms_movie_add',
    init: function () {
        this.launcher = {
            text: '电影上传',
            iconCls: 'wms_movie_add',
            handler: this.createWindow,
            scope: this
        };
    },
    createWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('wms_movie_add');
        Ext.application({
            name: 'MovieApp.MovieApp', //应用的名字
            appFolder: "js/MovieApp/MovieApp", //应用的目录
            appProperty: 'movieadd',
            launch: function () {//当前页面加载完成执行的函数                
                if (!win) {
                    win = desktop.createWindow({
                        id: 'wms_movie_add',
                        title: '电影上传',
                        iconCls: 'wms_movie_add',
                        border: false,
                        hideMode: 'offsets',
                        closable:false,
                        closeAction:"destroy",
                        layout:"fit",
                        items:{xtype: 'movieadd'}
                    });
                };
                win.show();
                return win;
            },
            controllers: [
		    'MovieController'
		    ]
        });
        return win;
    }
});