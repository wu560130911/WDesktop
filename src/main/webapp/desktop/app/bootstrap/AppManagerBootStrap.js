Ext.define('Wdesktop.app.bootstrap.AppManagerBootStrap', {
	extend: 'Wdesktop.core.system.Module',
	
    id: 'app_appManager',
    
    init:function(){
    	var me = this;
    	if(Wdesktop.app.AppManager==undefined){
    		Ext.application({
                name: 'Wdesktop.app.AppManager', //应用的名字
                appFolder: "desktop/app/appManager", //应用的目录
              //当前页面加载完成执行的函数 
                launch:function(){
                	//console.log('OK');
                	//return me.createNewWindow();
                },                
                controllers: [
                    'AppController'
    		    ]
            });
    	}/*else{
    		return me.createNewWindow();
    	}*/
    	Ext.onReady(function(){
    		return me.createNewWindow();
    	});
    },
    createNewWindow:function(){
    	var me = this;
        var desktop = me.app.getDesktop();
        var win = desktop.getWindow(me.id);
        //console.log(win);
        if(!win){
        	win = desktop.createWindow({
                id: 'app_appManager',
                title: '应用市场',
                width: 800,
                height: 480,
                iconCls: 'wms_notebook_main',
                border: false,
                hideMode: 'offsets',
                closable:true,
                closeAction:"destroy",
                layout:"fit",
                items:{xtype: 'appManagerMainAppPanel'}
            });
        	win.show();
        	return win;
        }
        return win;
    },
    
    createWindow: function () {
    	var me = this;
        var desktop = me.app.getDesktop();
        var win = desktop.getWindow(me.id);
        
        if(!win){
        	return me.init();
        }
        return win;
    }
});