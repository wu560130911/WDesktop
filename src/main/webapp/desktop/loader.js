//改造窗体的层次
Ext.override(Ext.ZIndexManager, {
	tempHidden : [],
	show : function() {
		var comp, x, y;
		while (comp = this.tempHidden.shift()) {
			x = comp.x;
			y = comp.y;
			comp.show();
			comp.setPosition(x, y);
		}
	}
});
Ext.Loader.setConfig({
	enabled : true,
	paths : {
		'Ext.ux' : 'js/extjs/ux',
		'Wdesktop':'desktop'
	}
});
Ext.require([ 'Wdesktop.desktop.system.App']);
var myDesktopApp;
var returnCitySN = {
	'cip' : '10.28.20.100',
	'cname' : '江西省赣州市'
};
var wmsmodulx = [], wmsmoduly = [];
var startLoadingTime = new Date().getTime();

Ext.onReady(function() {
	Ext.MessageBox.show({
        title : "正在加载桌面, 请稍候...",
        msg: "<br/>加载系统基础组件....",
        progressText: "20%",
        width:300,
        progress:true,
        closable:false,
        icon:"ext-mb-download"
    });
	Ext.MessageBox.updateProgress(0.2);
	myDesktopApp = new Wdesktop.desktop.system.App();
	window.setTimeout(function(){
    	Ext.MessageBox.hide();
    },1000);
});