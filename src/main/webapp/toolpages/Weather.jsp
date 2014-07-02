<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC>
<html>
	<head>
		<base href="<%=basePath%>">
		<title>My JSP 'Weather.jsp' starting page</title>
		<script type="text/javascript" src="js/extjs/bootstrap.js"></script>
		<script type="text/javascript" src="js/extjs/ext-lang-zh_CN.js"></script>
	</head>
	<body>
		
	</body>
</html>
