<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="org.hibernate.jpa.*" %>
<%@ page import="org.hibernate.stat.Statistics" %>
<%@ page import="org.hibernate.stat.SecondLevelCacheStatistics" %>
<%@ page import="org.hibernate.stat.QueryStatistics" %>
<%@ page import="org.hibernate.stat.EntityStatistics" %>
<%@ page import="org.hibernate.stat.CollectionStatistics" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.text.MessageFormat" %>
<%@ page import="java.text.NumberFormat" %>
<%
HibernateEntityManagerFactory sessionFactory = null;
  if(sessionFactory == null) {
	 WebApplicationContext applicationContext = (WebApplicationContext)WebApplicationContextUtils.getWebApplicationContext(request.getServletContext());
    System.out.println(applicationContext);
    sessionFactory = (HibernateEntityManagerFactory)applicationContext.getBean("entityManagerFactory"); 
  }
  Statistics statistics = sessionFactory.getSessionFactory().getStatistics();
  request.setAttribute("statistics", statistics);
  
  Date startDate = new Date(statistics.getStartTime());
  request.setAttribute("startDate", startDate);
  Date nowDate = new Date();
  long lastSeconds = (nowDate.getTime() - startDate.getTime())/1000;
  MessageFormat messageFormat = new MessageFormat("{0}");
  NumberFormat percentFormat = NumberFormat.getPercentInstance();
  NumberFormat numberFormat = NumberFormat.getInstance();
%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>Hibernate监控页面</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
</head>
<body>
<div style="color: #0D5A7B; height: 15px; background-color: #DAF1FC; border: 1px solid #8DD3F5; font-size: 12px; padding: 3px">
  <b>Hibernate监控</b>
</div>
<p/>
<div align="center">
<table style="font-size: 12px" width="80%">
  <tr>
    <td><b style="color: #0B6693">统计时间: 从 <%=messageFormat.format(new Object[]{startDate})%>  到 <%=messageFormat.format(new Object[]{nowDate})%></b></td>
  </tr>
</table>
<table cellpadding="5" cellspacing="1"  bgcolor="#26AEF0" style="font-size: 12px" width="80%">
  <tr bgcolor="#E1F4FD">
    <td colspan="2"><b>连接统计</b></td>
  </tr>
  <tr bgcolor="white">
    <td width="45%">数据库连接次数:</td>
    <td><%=messageFormat.format(new Object[]{new Long(statistics.getConnectCount())}) + " 平均" + (statistics.getConnectCount()/lastSeconds) + "次/秒"%></td>
  </tr>
  
  <tr bgcolor="red">
    <td width="45%">StaleObjectStateException 次数:</td>
    <td><%=messageFormat.format(new Object[]{new Long(statistics.getOptimisticFailureCount())})%> </td>
  </tr>
  
  <tr bgcolor="white">
    <td>数据库Statement关闭次数:</td>
    <td><%=messageFormat.format(new Object[]{new Long(statistics.getCloseStatementCount())})%> </td>
  </tr>
  <tr bgcolor="white">
    <td>Session打开的次数:</td>
    <td><%=messageFormat.format(new Object[]{new Long(statistics.getSessionOpenCount())})%></td>
  </tr>
  <tr bgcolor="white">
    <td>Session关闭的次数:</td>
    <td><%=messageFormat.format(new Object[]{new Long(statistics.getSessionCloseCount())})%></td>
  </tr>
  <tr bgcolor="white">
    <td>Session被flush的次数:</td>
    <td><%=messageFormat.format(new Object[]{new Long(statistics.getFlushCount())})%></td>
  </tr>
  <tr bgcolor="#E1F4FD">
    <td colspan="2"><b>事务(Transaction)统计</b></td>
  </tr>
  <tr bgcolor="white">
    <td>执行的事务次数:</td>
    <td><%=messageFormat.format(new Object[]{new Long(statistics.getTransactionCount())})%></td>
  </tr>
  <tr bgcolor="white">
    <td>成功的事务次数:</td>
    <td><%=messageFormat.format(new Object[]{new Long(statistics.getSuccessfulTransactionCount())})%></td>
  </tr>
  <tr bgcolor="#E1F4FD">
    <td colspan="2"><b>查询缓存统计</b></td>
  </tr>
  <tr bgcolor="white">
    <td colspan="2"><a href="queryCacheDetail1.jsp">查询缓存-最长时间排序</a></td>  	
  </tr>
  <tr bgcolor="white">
    <td colspan="2"><a href="queryCacheDetail2.jsp">查询缓存-平均时间排序</a></td>  	
  </tr>
  <tr bgcolor="white">
    <td colspan="2"><a href="queryCacheDetail3.jsp">查询缓存-miss率排序</a></td>  	
  </tr>
  <tr bgcolor="white">
    <td colspan="2"><a href="queryCacheDetail4.jsp">查询缓存-miss绝对数排序</a></td>  	
  </tr>
  <tr bgcolor="white">
    <td colspan="2"><a href="queryCacheDetail5.jsp">查询缓存-结果集平均行数排序</a></td>  	
  </tr>
  
  <tr bgcolor="#E1F4FD">
    <td colspan="2"><b><a href="level2CacheDetail.jsp">二级缓存统计</a></b></td>
  </tr>
  <tr bgcolor="#E1F4FD">
    <td colspan="2"><b><a href="otherDetail.jsp">Entity & Collection统计</a></b></td>
  </tr>
  
  
</table>
</div>
</body>
</html>