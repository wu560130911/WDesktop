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
		'Ext.ux.desktop' : 'js/MyDesktop/js',
		'MyDesktop' : 'js/MyDesktop',
		'MovieApp' : 'js/MovieApp',
		'MovieApp.MovieApp' : 'js/MovieApp/MovieApp',
		'Ext.ux' : 'js/extjs/ux',
		'Core':'js/Core/CoreApp'
	}
});
Ext.require([ 'MyDesktop.App']);
var myDesktopApp;
var returnCitySN = {
	'cip' : '10.28.20.100',
	'cname' : '江西省赣州市'
};
var wmsmodulx = [], wmsmoduly = [];
var startLoadingTime = new Date().getTime();

/*Ext.onReady(function(){
	if(Ext.supports.Canvas){
		var copyright = Ext.DomHelper.insertFirst(document.body, {id:'copy-right'},true);
		var canvas = Ext.DomHelper.append(copyright, "<canvas width=240px height=150px id=copyright></canvas>", true);
		var context = canvas.dom.getContext('2d');
		context.save();
		context.font='40px Courier New';
		context.fillStyle='#00FF00';
		context.textAlign='center';
		context.fillText('WMS CopyRight 2013',120,90,220);
		// 设置文字阴影的颜色为黑色，透明度为20%
		context.shadowColor = 'rgba(0, 0, 0, 0.2)';
		// 将阴影向右移动15px，向上移动10px
		context.shadowOffsetX = 15;
		context.shadowOffsetY = -10;
		// 轻微模糊阴影
		context.shadowBlur = 2;
		context.restore();
	}
});*/

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
	myDesktopApp = new MyDesktop.App();
	window.setTimeout(function(){
    	Ext.MessageBox.hide();
    },1000);
});