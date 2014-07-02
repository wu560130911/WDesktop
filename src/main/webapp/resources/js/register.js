if(window.WMSDesktop){
	window.WMSDesktop = undefined;
}

window.WMSDesktop = {
	
};

WMSDesktop.Reigster={};

WMSDesktop.Reigster.WidhtHeightChange=function(){
	$('div.carousel').width('0px');
	$('div.carousel').height('0px');
	WMSDesktop.Reigster.height = $(document.body).height();
	WMSDesktop.Reigster.width = $(document.body).width();
	$('div.carousel').width(WMSDesktop.Reigster.width+'px');
	$('div.carousel').height(WMSDesktop.Reigster.height+'px');
	/*$('div.pointips').css({
		"left":"200px"
	});*/
	console.log(WMSDesktop.Reigster.height);
	console.log($(document.body).height());
};

WMSDesktop.Reigster.rainyDay = function(){
	var engine = new RainyDay('canvas','rain_image', window.innerWidth, window.innerHeight);
	engine.gravity = engine.GRAVITY_NON_LINEAR;
	engine.trail = engine.TRAIL_DROPS;
	engine.VARIABLE_GRAVITY_ANGLE = Math.PI / 8;
	engine.rain([
	   engine.preset(0, 2, 0.5),
	   engine.preset(4, 4, 1)
	], 50);
};

$(document).ready(function() {
	
	$("#loading").fadeOut('slow',function(){
		$('.carousel').fadeIn('slow');
	});
	
	$('.carousel').carousel({
		interval : 3500
	});
	$('.carousel').carousel('cycle');
	
	WMSDesktop.Reigster.WidhtHeightChange();
	
	$(window).resize(function(){
		WMSDesktop.Reigster.WidhtHeightChange();
	});
	WMSDesktop.Reigster.rainyDay();
});