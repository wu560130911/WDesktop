﻿<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+
					  "://"+request.getServerName()+":"+
					  request.getServerPort()+path+"/";
	if(session==null){
		response.sendRedirect("login.jsp");
	}
	if(session.getAttribute("user_id")==null){
		response.sendRedirect("login.jsp");
	}
	if(session.getAttribute("theme")==null){
		session.setAttribute("theme", "default");
	}
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
	<meta name="baidu-tc-cerfication" content="9214e97b57c88f45c46dc9611494b983" />
    <title>桌面化视频网站系统</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta name="keywords" content="桌面化视频网站系统,桌面化,视频网站系统,WEBOS">
	<meta name="description" content="桌面化视频网站系统,提供操作系统式的界面和操作，让你的体验性更强.">
	<script type="text/javascript" src="js/Bootstrap.js"></script>
	<script type="text/javascript" src="js/extjs/ext-all-dev.js"></script>
	<script type="text/javascript">
	
		var theme='gray',basePath='<%=basePath%>';
		
		WMSDesktop.Bootstrap.loadCallback=function(){
			
		};
		WMSDesktop.Bootstrap.loadRequires([{
			id:'themecss',
			type:WMSDesktop.Bootstrap.resTypes.CSS,
			url:'js/extjs/resources/css/theme-gray.css'
		},{
			id:'desktop-css',
			type:WMSDesktop.Bootstrap.resTypes.CSS,
			url:'js/MyDesktop/css/desktop.css'
		},{
			id:'icon-css',
			type:WMSDesktop.Bootstrap.resTypes.CSS,
			url:'js/Core/resources/css/icon.css'
		},{
			id:'login-css',
			type:WMSDesktop.Bootstrap.resTypes.CSS,
			url:'login.css'
		}/* ,{
			type:WMSDesktop.Bootstrap.resTypes.JAVASCRIPT,
			url:'js/extjs/ext-all-dev.js'
		} */,{
			type:WMSDesktop.Bootstrap.resTypes.JAVASCRIPT,
			url:'js/extjs/ext-lang-zh_CN.js'
		},{
			type:WMSDesktop.Bootstrap.resTypes.JAVASCRIPT,
			url:'js/Core/CoreApp/util/common.js'
		},{
			type:WMSDesktop.Bootstrap.resTypes.JAVASCRIPT,
			url:'js/loader.js'
		},{
			type:WMSDesktop.Bootstrap.resTypes.JAVASCRIPT,
			url:'js/MyDesktop/DesktopApp/newstip.js'
		},{
			type:WMSDesktop.Bootstrap.resTypes.JAVASCRIPT,
			url:'http://pv.sohu.com/cityjson?ie=utf-8'
		}]);
	</script>
 <body>
 <div class="wmstip2">
  <br/>
  	感谢您的支持，作品作者：<a target="_blank" href="http://112.124.8.74:8888/MovieWMS/wms.html" title="作者个人简历" contenteditable="false">吴梦升</a><br/>
  </div>
    <a href="mailto:560130911@163.com" target="_blank" alt="Powered by WMS"
       id="poweredby"><div></div></a>
       <%--<span id="city"></span>
       <script type="text/javascript">
       		document.getElementById("city").innerHTML = returnCitySN.cname;
       </script>
  --%></body>
</html>
