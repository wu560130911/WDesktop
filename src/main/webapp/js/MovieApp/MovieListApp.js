Ext.define('MovieApp.MovieListApp', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
        "Core.app.model.SelectTypeModel"
    ],
    id: 'wms_movie_list',
    init: function () {
        this.launcher = {
            text: '电影列表',
            iconCls: 'wms_movie_list',
            handler: this.createWindow,
            scope: this
        };
    },
    createWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('wms_movie_list');
        Ext.application({
            name: 'MovieApp.MovieApp', //应用的名字
            appFolder: "js/MovieApp/MovieApp", //应用的目录
            appProperty: 'movielist',
            launch: function () {//当前页面加载完成执行的函数                
                if (!win) {
                    win = desktop.createWindow({
                        id: 'wms_movie_list',
                        title: '电影列表',
                        width: 750,
                        height: 520,
                        iconCls: 'wms_movie_list',
                        border: false,
                        hideMode: 'offsets',
                        closable:true,
                        closeAction:"destroy",
                        layout:"fit",
                        items:{xtype: 'movielist'}
                    });
                };
                win.show();
                return win;
            },
            controllers: [
		    'MovieController'
		    ]
        });

    }
});