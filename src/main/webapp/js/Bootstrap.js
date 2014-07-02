if(window.WMSDesktop){
	window.WMSDesktop = undefined;
}
window.WMSDesktop = {
	
};

WMSDesktop.Bootstrap = {
	
	SHORTCUTMARK : "<link rel='shortcut icon' href='{url}' />",
	
	CSSMARK : "<link rel='stylesheet' id='{id}' type='text/css' href='{url}' />",
	
	JAVASCRIPTMARK : "<script type='text/javascript' src='{url}' onload='WMSDesktop.Bootstrap.onScriptLoad()'></script>",
	
	pendFiles : 0,
	
	onScriptLoad : function(){
		WMSDesktop.Bootstrap.pendFiles--;
		if(WMSDesktop.Bootstrap.pendFiles == 0){
			WMSDesktop.Bootstrap.loadCallback.call(this);
		}
	},
	
	resTypes : {
		CSS : 'css',
		JAVASCRIPT : 'javascript',
		SHORTCUT : 'shortcut'
	},
	
	loadRequires : function(res){
		for(var i = 0;i < res.length;i++){
			var resource = res[i];
			if(resource.type == WMSDesktop.Bootstrap.resTypes.CSS){
				WMSDesktop.Bootstrap.loadCSS(resource);
			}else if(resource.type == WMSDesktop.Bootstrap.resTypes.JAVASCRIPT){
				WMSDesktop.Bootstrap.loadJavaScript(resource);
				
			}else if(resource.type == WMSDesktop.Bootstrap.resTypes.SHORTCUT){
				WMSDesktop.Bootstrap.loadShortcut(resource);
			}
		}
	},
	
	loadCSS : function(css){
		document.write(WMSDesktop.Bootstrap.CSSMARK.replace('{id}',css.id).replace('{url}',css.url));
	},
	
	loadJavaScript : function(script){
		WMSDesktop.Bootstrap.pendFiles ++ ;
		var js = document.createElement('script');
		js.src = script.url;
		js.onload = WMSDesktop.Bootstrap.onScriptLoad;
		js.onreadystatechange = function(){
			if(js.readyState == 'loaded'){
				WMSDesktop.Bootstrap.onScriptLoad();
			}
		};
		document.getElementsByTagName('head')[0].appendChild(js);
		//document.write(WMSDesktop.Bootstrap.JAVASCRIPTMARK.replace('{url}',script.url));
	},
	
	loadShortcut : function(shorcut){
		document.write(WMSDesktop.Bootstrap.SHORTCUTMARK.replace('{url}',shorcut.url));
	}
};
