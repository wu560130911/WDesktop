/**
 * 异步加载数据工具类
 */
Ext.define('Wdesktop.core.util.AjaxGetData', {
	GetData:function(url,data){
		Ext.Ajax.request({
			url : url,
			method : "POST",
			timeout : 10000,
			params : data,
			success : function(response, opts) {
				var message = Ext.JSON.decode(response.responseText);
				if (message.message == "success") {
					return message;
				}else{	
					return null;
				}
			},
			failure:function(response,options){
				return null;
    		}
		});
	}
});