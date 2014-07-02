<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>登陆界面</title>
    <link rel="stylesheet" type="text/css" href="resources/bootstrap/css/bootstrap-responsive.css"/>
	<link rel="stylesheet" type="text/css" href="resources/bootstrap/css/bootstrap.css"/>
	<link rel="stylesheet" type="text/css" href="css/register.css">
  </head>
  <body>
  
  	<div id="loading" class="text-center">
	    <img class="spinner" src="images/spinner.gif">
	    <span>加载中</span>
	</div>
	
	<div class="carousel slide" id="register_info">
		<div class="carousel-inner">
			<div class="item active">
	          <img src="resources/image/bg1.jpg" alt="">
	          <div class="container">
	            <div class="carousel-caption">
	              <h1>梦在书乡--在线书城</h1>
	              <p class="lead">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分布式在线聊天系统，本系统采用最新的技术，需要支持HTML5的浏览器及支持WebSocket的浏览器。请你确保您的浏览器支持。<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本系统在部署上采用分布式构架，实现业务逻辑与系统响应分离，具有自动处理负载均衡的能力，系统的处理能力更强，承载压力更大。</p>
	              <!-- <a class="btn btn-large btn-primary" href="#">Sign up today</a> -->
	            </div>
	          </div>
			</div>
			<div class="item">
	          <img src="resources/image/bg2.jpg" alt="">
	          <div class="container">
	            <div class="carousel-caption">
	              <h1>梦在书乡--在线书城</h1>
	              <p class="lead">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分布式在线聊天系统，本系统采用最新的技术。</p>
	              <!-- <a class="btn btn-large btn-primary" href="#">Sign up today</a> -->
	            </div>
	          </div>
			</div>
			<div class="item">
	          <img src="resources/image/bg2.jpg" alt="">
	          <div class="container">
	            <div class="carousel-caption">
	              <h1>梦在书乡--在线书城</h1>
	              <p class="lead">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分布式在线聊天系统，本系统采用最新的技术。</p>
	              <!-- <a class="btn btn-large btn-primary" href="#">Sign up today</a> -->
	            </div>
	          </div>
			</div>
			<div class="item">
			  <img id="rain_image" src="resources/image/bg2.jpg" alt="" style="display: none;">
	          <canvas id="canvas"></canvas>
	          <div class="container">
	            <div class="carousel-caption">
	              <h1>梦在书乡--在线书城</h1>
	              <p class="lead">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分布式在线聊天系统，本系统采用最新的技术。</p>
	              <!-- <a class="btn btn-large btn-primary" href="#">Sign up today</a> -->
	            </div>
	          </div>
			</div>
		</div>
		<a class="left carousel-control" href="#register_info" data-slide="prev">&lsaquo;</a>
        <a class="right carousel-control" href="#register_info" data-slide="next">&rsaquo;</a>
		<ol class="carousel-indicators">
    		<li data-target="#register_info" data-slide-to="0" class="active"></li>
    		<li data-target="#register_info" data-slide-to="1"></li>
    		<li data-target="#register_info" data-slide-to="2"></li>
    		<li data-target="#register_info" data-slide-to="3"></li>
  		</ol>
  		<div class="pointips">
  			<a id="ovpage" href="javascript:;"></a>
  		</div>
	</div>
  	<script type="text/javascript" src="resources/jquery/jquery-2.1.0.js"></script>
  	<script type="text/javascript" src="resources/bootstrap/js/bootstrap.js"></script>
  	<script type="text/javascript" src="resources/validate/jquery-validate.js"></script>
  	<script type="text/javascript" src="resources/js/rainyday.js"></script>
  	<script type="text/javascript" src="resources/js/register.js"></script>
  </body>
</html>
