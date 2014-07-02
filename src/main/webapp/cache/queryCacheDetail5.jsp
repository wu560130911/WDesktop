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
    <td colspan="2"><b>查询缓存统计</b></td>
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
    <%} %>
     命中的次数:<%=numberFormat.format(statistics.getQueryCacheHitCount())%>
      Miss的次数:<%=numberFormat.format(statistics.getQueryCacheMissCount())%> 
      Miss平均: <%=numberFormat.format(statistics.getQueryCacheMissCount() / lastSeconds)%> 次/秒
    </td>
  </tr>
  <tr bgcolor="white">
    <td>被缓存的查询个数:</td>
    <td> <%=numberFormat.format(statistics.getQueryCachePutCount())%></td>
  </tr>
  <tr bgcolor="white">
    <td>查询执行的次数:</td>
    <td> <%=numberFormat.format(statistics.getQueryExecutionCount())%></td>
  </tr>
  <tr bgcolor="white">
    <td>查询执行的最长时间:</td>
    <td> <%=numberFormat.format(statistics.getQueryExecutionMaxTime())%> 毫秒</td>
  </tr>
<%
  QueryStatistics [] querys = new QueryStatistics[statistics.getQueries().length];
  long []sortField = new long[querys.length];
  String[] queries = statistics.getQueries();
  for(int i=0; i<statistics.getQueries().length; i++) { 
	  String queryName = queries[i];
    querys[i] = statistics.getQueryStatistics(queryName);
    QueryStatistics queryStatistics = querys[i];    
    sortField[i] = (queryStatistics.getExecutionCount() > 0)? (queryStatistics.getExecutionRowCount() * 100 / queryStatistics.getExecutionCount()): 0;    
  }
  for (int i = 0; i < querys.length; i ++) {
  	for (int j = i + 1; j < querys.length; j++) {
  	    if (sortField[i] < sortField[j]) {
  	    	String slcn = queries[i];queries[i]=queries[j];queries[j]=slcn;
  	    	QueryStatistics s = querys[i]; querys[i] = querys[j]; querys[j] = s;
  	    	long temp = sortField[i]; sortField[i] = sortField[j]; sortField[j] = temp;
  	    }
  	}
  }
%>
<%
  for(int i=0; i<querys.length; i++) {
    QueryStatistics queryStatistics = querys[i];
    long totalCount = (queryStatistics.getCacheHitCount() + queryStatistics.getCacheMissCount());
    if (totalCount == 0) {
        totalCount = queryStatistics.getExecutionCount(); //没有设置query cache情况        
    }
    double percent = (totalCount == 0)? 0: queryStatistics.getCacheHitCount() * 1.0 / totalCount;
    double aveRowCount = (queryStatistics.getExecutionCount() > 0)? (queryStatistics.getExecutionRowCount() * 1.0 / queryStatistics.getExecutionCount()): 0;
%>
  <tr bgcolor="#F5FBFE">
    <td colspan="2">缓存名称: <%=queries[i]%></td>
  </tr>
  <tr bgcolor="white">
    <td>命中率:</td>
    <td>
    	
    	<%=percentFormat.format(percent)%>
      
       命中的次数:<%=numberFormat.format(queryStatistics.getCacheHitCount())%>
      Miss的次数: <%=numberFormat.format(queryStatistics.getCacheMissCount())%>
    </td>
  </tr>
  <tr bgcolor="white">
    <td>执行次数:</td>
    <td>
    	<%=numberFormat.format(queryStatistics.getExecutionCount())%>
    </td>
  </tr>
  <tr bgcolor="white">
    <td>执行的最长时间:</td>
    <td>
    	<%=numberFormat.format(queryStatistics.getExecutionMaxTime())%>
      毫秒
    </td>
  </tr>
  <tr bgcolor="white">
    <td>执行的平均时间:</td>
    <td>
    	<%=numberFormat.format(queryStatistics.getExecutionAvgTime())%>
      毫秒
    </td>
  </tr>
  <tr bgcolor="white">
    <td>加权执行的平均时间:</td>
    <td>
    	
    	<%=numberFormat.format(queryStatistics.getExecutionAvgTime() * (1 - percent))%>
      毫秒
    </td>
  </tr>
  
  <tr bgcolor="white">
    <td>执行的最短时间:</td>
    <td>
    	<%=numberFormat.format(queryStatistics.getExecutionMinTime())%>
      毫秒
    </td>
  </tr>
  <tr bgcolor="white">
    <td>执行返回的总行数:</td>
    <td>
    	<%=numberFormat.format(queryStatistics.getExecutionRowCount())%>
      
    </td>
  </tr>
  <tr bgcolor="white">
    <td>执行返回的平均行数:</td>
    <td>
    	<%=numberFormat.format(aveRowCount)%>
      
    </td>
  </tr>
  
<%
  }
%>
</table>
</div>
</body>
</html>
