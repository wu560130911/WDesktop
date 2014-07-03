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
    <td><b style="color: #0B6693">计时间: 从 <%=messageFormat.format(new Object[]{startDate})%>  到 <%=messageFormat.format(new Object[]{nowDate})%></b></td>
  </tr>
</table>
<table cellpadding="5" cellspacing="1"  bgcolor="#26AEF0" style="font-size: 12px" width="80%">
  <tr bgcolor="#E1F4FD">
    <td colspan="2"><b>二级缓存统计</b></td>
  </tr>
  <tr bgcolor="white">
    <td>总命中率:</td>
    <td>
    	 <%
    if((statistics.getSecondLevelCacheHitCount() + statistics.getSecondLevelCacheMissCount())<=0L){
    %>
    <%=percentFormat.format(0.0)%>
    <%
    }else{
    %>
    	<%=percentFormat.format(statistics.getSecondLevelCacheHitCount() * 1.0 / (statistics.getSecondLevelCacheHitCount() + statistics.getSecondLevelCacheMissCount()))%>
    <%} %>命中的次数:<%=numberFormat.format(statistics.getSecondLevelCacheHitCount())%>
      Miss的次数:<%=numberFormat.format(statistics.getSecondLevelCacheMissCount())%> 
      Miss平均: <%=numberFormat.format(statistics.getSecondLevelCacheMissCount() / lastSeconds)%> 次/秒
    </td>
  </tr>
  <tr bgcolor="white">
    <td>缓存中的对象个数:</td>
    <td><%=statistics.getSecondLevelCachePutCount()%></td>
  </tr>
<%
  SecondLevelCacheStatistics [] querys = new SecondLevelCacheStatistics[statistics.getSecondLevelCacheRegionNames().length];
  String[] secondLevelCacheName = statistics.getSecondLevelCacheRegionNames();
  long []sortField = new long[querys.length];
  int totalMemorySize = 0;
  for(int i=0; i<statistics.getSecondLevelCacheRegionNames().length; i++) {
    String queryName = secondLevelCacheName[i];
    querys[i] = statistics.getSecondLevelCacheStatistics(queryName);
    sortField[i] = querys[i].getMissCount();
    totalMemorySize += querys[i].getSizeInMemory();
  }
  for (int i = 0; i < querys.length; i ++) {
  	for (int j = i + 1; j < querys.length; j++) {
  	    if (sortField[i] < sortField[j]) {
  	    	SecondLevelCacheStatistics s = querys[i]; querys[i] = querys[j]; querys[j] = s;
  	    	String slcn = secondLevelCacheName[i];secondLevelCacheName[i]=secondLevelCacheName[j];secondLevelCacheName[j]=slcn;
  	    	long temp = sortField[i]; sortField[i] = sortField[j]; sortField[j] = temp;
  	    }
  	}
  }
%>
  <tr bgcolor="white">
    <td>内存情况</td>
    <td>当前使用内存： <%=java.lang.management.ManagementFactory.getMemoryMXBean().getHeapMemoryUsage().getUsed() /1024 %> KB    
    	  系统总内存: <%=java.lang.management.ManagementFactory.getMemoryMXBean().getHeapMemoryUsage().getMax() / 1024 %>  KB
    	  二级缓存占内存总数： <%=totalMemorySize / 1024%> KB
  	</td>
  </tr>
  
<%
  for(int i=0; i<querys.length; i++) {
    SecondLevelCacheStatistics secondLevelCacheStatistics = querys[i];
    long totalCount = (secondLevelCacheStatistics.getHitCount() + secondLevelCacheStatistics.getMissCount());
    double percent = (totalCount > 0)?secondLevelCacheStatistics.getHitCount() * 1.0 / totalCount: 0;
%>
  <tr bgcolor="#F5FBFE">
    <td colspan="2">缓存名称: <%=secondLevelCacheName[i]%></td>
  </tr>
  <tr bgcolor="white">
    <td>命中率:</td>
    <td>
    	 <%=percentFormat.format(percent)%>
       命中的次数:<%=numberFormat.format(secondLevelCacheStatistics.getHitCount())%>
      Miss的次数:<%=numberFormat.format(secondLevelCacheStatistics.getMissCount())%>
    </td>
  </tr>
  <tr bgcolor="white">
    <td>所占内存大小:</td>
    <td>
      <%=numberFormat.format(secondLevelCacheStatistics.getSizeInMemory() / 1024)%> KB
    </td>
  </tr>
  <tr bgcolor="white">
    <td>内存中的对象数:</td>
    <td>
      <%=numberFormat.format(secondLevelCacheStatistics.getElementCountInMemory())%>
    </td>
  </tr>
  <tr bgcolor="white">
    <td>磁盘中的对象数:</td>
    <td>
      <%=numberFormat.format(secondLevelCacheStatistics.getElementCountOnDisk())%> 
    </td>
  </tr>
<%
  }
%>
</table>
</div>
</body>
</html>
