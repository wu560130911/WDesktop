<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+
					  "://"+request.getServerName()+":"+
					  request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <meta name="baidu-tc-cerfication" content="9214e97b57c88f45c46dc9611494b983" />
    <title>基于跨平台的桌面化多媒体资源共享系统</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<link rel="stylesheet" href="desktop/resources/extjs4.2.2/resources/css/theme-neptune.css" type="text/css">
  	<link rel="stylesheet" href="desktop/resources/css/desktop.css" type="text/css">
  	<script type="text/javascript" src="desktop/resources/extjs4.2.2/ext-all-dev.js"></script>
  	<script type="text/javascript" src="desktop/resources/extjs4.2.2/ext-lang-zh_CN.js"></script>
  	<script type="text/javascript">
  		var returnCitySN = {'cip':'10.28.20.100','cname':'江西省赣州市'};
  	</script>
  	<script type="text/javascript" src="http://pv.sohu.com/cityjson?ie=utf-8" type="text/json"></script>
	<link rel="stylesheet" href="desktop/resources/css/icon.css" type="text/css">
  	<script type="text/javascript" src="desktop/desktop/widget/LoginWindow.js"></script>
  	<script type="text/javascript" src="desktop/desktop/widget/Register.js"></script>
  	<link rel="stylesheet" href="login.css" type="text/css"></link></head>
  <body style="background: #92C1D1 url(images/bg.jpg) fixed center top no-repeat;">
  <div class="wmstip">
  <br/>
  	感谢您的支持，作品作者：<a href="http://112.124.8.74:8888/MovieWMS/wms.html" title="作者个人简历" contenteditable="false">吴梦升</a><br/>
  </div>
    <script type="text/javascript">
    	Ext.onReady(function(){
    		Ext.getDoc().on("contextmenu", function(e){ e.stopEvent(); });
    		var userid = sessionStorage['user_id'];
    		var username = sessionStorage['user_name'];
    		Ext.create('Wdesktop.desktop.widget.LoginWindow').show();
    		Ext.get('image').on('click',function(){
     			Ext.getCmp('image').setSrc('kaptcha.jpg?t='+Math.floor(Math.random()*1000));
     		});
    		if(userid!=''&&userid!=null&&username!=''&&username!=null){
            	Ext.Ajax.request({
            		url : "user_checklogin.action",
    				method : "POST",
    				timeout : 10000,
    				params:{
    					'username':userid
    				},
    				success:function(response, opts){
    					if (Ext.JSON.decode(response.responseText).message == "success") {
    						self.location.href="index.jsp";
    					}
    				}
            	});
            }
    	});
    </script>
  </body>
</html>
