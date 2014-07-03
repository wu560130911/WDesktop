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
    <td colspan="2"><b>Entity统计</b></td>
  </tr>
  <tr bgcolor="white">
    <td>Entity插入(insert)总次数:</td>
    <td><%=numberFormat.format(statistics.getEntityInsertCount())%></td>
  </tr>
  <tr bgcolor="white">
    <td>Entity装载(load)总次数:</td>
    <td><%=numberFormat.format(statistics.getEntityLoadCount())%></td>
  </tr>
  <tr bgcolor="white">
    <td>Entity抓取(fetch)总次数:</td>
    <td><%=numberFormat.format(statistics.getEntityFetchCount())%></td>
  </tr>
  <tr bgcolor="white">
    <td>Entity更新(update)总次数:</td>
    <td><%=numberFormat.format(statistics.getEntityUpdateCount())%></td>
  </tr>
  <tr bgcolor="white">
    <td>Entity删除(delete)总次数:</td>
    <td><%=numberFormat.format(statistics.getEntityDeleteCount())%></td>
  </tr>
<%
  EntityStatistics [] entities = new EntityStatistics[statistics.getEntityNames().length];
  long []sortField = new long[entities.length];
  String[] entityNames = statistics.getEntityNames();
  for(int i=0; i<entities.length; i++) {
    String name = entityNames[i];
    entities[i] = statistics.getEntityStatistics(name);
    sortField[i] = entities[i].getLoadCount() + entities[i].getFetchCount() + entities[i].getInsertCount() + entities[i].getUpdateCount() + entities[i].getDeleteCount();
  }
  for (int i = 0; i < entities.length - 1; i ++) {
  	for (int j = i + 1; j < entities.length; j++) {
  	    if (sortField[i] < sortField[j]) {
  	    	EntityStatistics s = entities[i]; entities[i] = entities[j]; entities[j] = s;
  	    	String en = entityNames[i];entityNames[i]=entityNames[j];entityNames[j]=en;
  	    	long temp = sortField[i]; sortField[i] = sortField[j]; sortField[j] = temp;
  	    }
  	}
  }
%>
  
<%
  for(int i=0; i<entities.length; i++) {
    EntityStatistics entityStatistics = entities[i];
%>
  <tr bgcolor="#F5FBFE">
    <td colspan="2">Entity名称: <%=entityNames[i]%></td>
  </tr>
  <tr bgcolor="white">
    <td>Entity插入(insert)次数:</td>
    <td><%=numberFormat.format(entityStatistics.getInsertCount())%>
    	</td>
  </tr>
  <tr bgcolor="white">
    <td>Entity装载(load)次数:</td>
    <td><%=numberFormat.format(entityStatistics.getLoadCount())%></td>
  </tr>
  <tr bgcolor="white">
    <td>Entity抓取(fetch)次数:</td>
    <td><%=numberFormat.format(entityStatistics.getFetchCount())%></td>
  </tr>
  <tr bgcolor="white">
    <td>Entity更新(update)次数:</td>
    <td><%=numberFormat.format(entityStatistics.getUpdateCount())%></td>
  </tr>
  <tr bgcolor="white">
    <td>Entity删除(delete)次数:</td>
    <td><%=numberFormat.format(entityStatistics.getDeleteCount())%></td>
  </tr>
<%
  }
%>
  <tr bgcolor="#E1F4FD">
    <td colspan="2"><b>Collection统计</b></td>
  </tr>
  <tr bgcolor="white">
    <td>Collection重新创建(recreate)总次数:</td>
    <td><%=numberFormat.format(statistics.getCollectionRecreateCount())%> </td>
  </tr>
  <tr bgcolor="white">
    <td>Collection装载(load)总次数:</td>
    <td><%=numberFormat.format(statistics.getCollectionLoadCount())%></td>
  </tr>
  <tr bgcolor="white">
    <td>Collection抓取(fetch)总次数:</td>
    <td><%=numberFormat.format(statistics.getCollectionFetchCount())%></td>
  </tr>
  <tr bgcolor="white">
    <td>Collection更新(update)总次数:</td>
    <td><%=numberFormat.format(statistics.getCollectionUpdateCount())%></td>
  </tr>
  <tr bgcolor="white">
    <td>Collection删除(remove)总次数:</td>
    <td><%=numberFormat.format(statistics.getCollectionRemoveCount())%> </td>
  </tr>
<%
  for(int i=0; i<statistics.getCollectionRoleNames().length; i++) {
    String collectionRoleName = statistics.getCollectionRoleNames()[i];
    CollectionStatistics collectionStatistics = statistics.getCollectionStatistics(collectionRoleName);
    request.setAttribute("collectionStatistics", collectionStatistics);
%>
  <tr bgcolor="#F5FBFE">
    <td colspan="2">Collection名称: <%=collectionRoleName%></td>
  </tr>
  <tr bgcolor="white">
    <td>Collection重新创建(recreate)总次数:</td>
    <td><%=numberFormat.format(collectionStatistics.getRecreateCount())%></td>
  </tr>
  <tr bgcolor="white">
    <td>Collection装载(load)总次数:</td>
    <td><%=numberFormat.format(collectionStatistics.getLoadCount())%></td>
  </tr>
  <tr bgcolor="white">
    <td>Collection抓取(fetch)总次数:</td>
    <td><%=numberFormat.format(collectionStatistics.getFetchCount())%></td>
  </tr>
  <tr bgcolor="white">
    <td>Collection更新(update)总次数:</td>
    <td><%=numberFormat.format(collectionStatistics.getUpdateCount())%></td>
  </tr>
  <tr bgcolor="white">
    <td>Collection删除(remove)总次数:</td>
    <td><%=numberFormat.format(collectionStatistics.getRemoveCount())%></td>
  </tr>
<%
  }
%>

</table>
</div>
</body>
</html>
