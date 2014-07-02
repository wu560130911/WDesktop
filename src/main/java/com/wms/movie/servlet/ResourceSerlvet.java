/**
 * 
 */
package com.wms.movie.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.alibaba.druid.support.http.util.IPAddress;
import com.alibaba.druid.support.http.util.IPRange;
import com.alibaba.druid.support.logging.Log;
import com.alibaba.druid.support.logging.LogFactory;
import com.alibaba.druid.util.StringUtils;
import com.alibaba.druid.util.Utils;
import com.wms.movie.model.User;
import com.wms.movie.tools.Constant;

/**
 * @author WMS
 *
 */
@SuppressWarnings("serial")
public abstract class ResourceSerlvet extends HttpServlet{

	private final static Log   LOG                 = LogFactory.getLog(ResourceSerlvet.class);

    public static final String PARAM_NAME_ALLOW    = "allow";
    public static final String PARAM_NAME_DENY     = "deny";
    public static final String PARAM_REMOTE_ADDR   = "remoteAddress";

    protected List<IPRange>    allowList           = new ArrayList<IPRange>();
    protected List<IPRange>    denyList            = new ArrayList<IPRange>();

    protected final String     resourcePath;

    protected String           remoteAddressHeader = null;

    public ResourceSerlvet(String resourcePath){
        this.resourcePath = resourcePath;
    }

    public void init() throws ServletException {
        initAuthEnv();
    }

    private void initAuthEnv() {
        

        String paramRemoteAddressHeader = getInitParameter(PARAM_REMOTE_ADDR);
        if (!StringUtils.isEmpty(paramRemoteAddressHeader)) {
            this.remoteAddressHeader = paramRemoteAddressHeader;
        }

        try {
            String param = getInitParameter(PARAM_NAME_ALLOW);
            if (param != null && param.trim().length() != 0) {
                param = param.trim();
                String[] items = param.split(",");

                for (String item : items) {
                    if (item == null || item.length() == 0) {
                        continue;
                    }

                    IPRange ipRange = new IPRange(item);
                    allowList.add(ipRange);
                }
            }
        } catch (Exception e) {
            String msg = "initParameter config error, allow : " + getInitParameter(PARAM_NAME_ALLOW);
            LOG.error(msg, e);
        }

        try {
            String param = getInitParameter(PARAM_NAME_DENY);
            if (param != null && param.trim().length() != 0) {
                param = param.trim();
                String[] items = param.split(",");

                for (String item : items) {
                    if (item == null || item.length() == 0) {
                        continue;
                    }

                    IPRange ipRange = new IPRange(item);
                    denyList.add(ipRange);
                }
            }
        } catch (Exception e) {
            String msg = "initParameter config error, deny : " + getInitParameter(PARAM_NAME_DENY);
            LOG.error(msg, e);
        }
    }

    public boolean isPermittedRequest(String remoteAddress) {
    	
        boolean ipV6 = remoteAddress != null && remoteAddress.indexOf(':') != -1;

        if (ipV6) {
            if ("0:0:0:0:0:0:0:1".equals(remoteAddress)) {
                return true;
            }

            if (denyList.size() == 0 && allowList.size() == 0) {
                return true;
            }

            return false;
        }

        IPAddress ipAddress = new IPAddress(remoteAddress);

        for (IPRange range : denyList) {
            if (range.isIPAddressInRange(ipAddress)) {
                return false;
            }
        }

        if (allowList.size() > 0) {
            for (IPRange range : allowList) {
                if (range.isIPAddressInRange(ipAddress)) {
                    return true;
                }
            }

            return false;
        }

        return true;
    }

    protected String getFilePath(String fileName) {
        return resourcePath + fileName;
    }

    protected void returnResourceFile(String fileName, String uri, HttpServletResponse response)
                                                                                                throws ServletException,
                                                                                                IOException {

        String filePath = getFilePath(fileName);
        if (fileName.endsWith(".jpg")) {
            byte[] bytes = Utils.readByteArrayFromResource(filePath);
            if (bytes != null) {
                response.getOutputStream().write(bytes);
            }

            return;
        }

        String text = Utils.readFromResource(filePath);
        if (text == null) {
            response.sendRedirect(uri + "/index.html");
            return;
        }
        if (fileName.endsWith(".css")) {
            response.setContentType("text/css;charset=utf-8");
        } else if (fileName.endsWith(".js")) {
            response.setContentType("text/javascript;charset=utf-8");
        }
        response.getWriter().write(text);
    }

    public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String contextPath = request.getContextPath();
        String servletPath = request.getServletPath();
        String requestURI = request.getRequestURI();

        response.setCharacterEncoding("utf-8");

        if (contextPath == null) { // root context
            contextPath = "";
        }
        String uri = contextPath + servletPath;
        String path = requestURI.substring(contextPath.length() + servletPath.length());

        if (!isPermittedRequest(request)) {
            path = "/nopermit.html";
            returnResourceFile(path, uri, response);
            return;
        }

        //规则过滤,,要求登陆
        if (isRequireAuth() //
            && !ContainsUser(request)//
            && !("/login.jsp".equals(path) //
                 || path.startsWith("/css")//
                 || path.startsWith("/js") //
            || path.startsWith("/img"))) {
        	
        	
        	//处理AJAX请求
        	
        	if("XMLHttpRequest".equalsIgnoreCase(request
				.getHeader("X-Requested-With"))){
        		
        		PrintWriter out = response.getWriter();
        		out.println("{message:login}");
        		out.flush();
        		out.close();
        		
        	}else{
        		
        		if (contextPath == null || contextPath.equals("") || contextPath.equals("/")) {
                    response.sendRedirect("/login.jsp");
                } else {
                    if ("".equals(path)) {
                        response.sendRedirect("login.jsp");
                    } else {
                        response.sendRedirect("../login.jsp");
                    }
                }
        	}
            
            return;
        }

        if ("".equals(path)) {
            if (contextPath == null || contextPath.equals("") || contextPath.equals("/")) {
                response.sendRedirect("/druid/index.html");
            } else {
                response.sendRedirect("druid/index.html");
            }
            return;
        }

        if ("/".equals(path)) {
            response.sendRedirect("index.html");
            return;
        }

        if (path.indexOf(".json") >= 0) {
            String fullUrl = path;
            if (request.getQueryString() != null && request.getQueryString().length() > 0) {
                fullUrl += "?" + request.getQueryString();
            }
            response.getWriter().print(process(fullUrl));
            return;
        }

        // find file in resources path
        returnResourceFile(path, uri, response);
    }

    public boolean ContainsUser(HttpServletRequest request) {
    	
        HttpSession session = request.getSession(false);
        if (session == null) {
            return false;
        }
        User user = (User)session.getAttribute(Constant.SESSION_USER_KEY);
        
        return user!=null&&"admin".equals(user.getUserRole());
    }

    public boolean isRequireAuth() {
        return true;
    }

    public boolean isPermittedRequest(HttpServletRequest request) {
        String remoteAddress = getRemoteAddress(request);
        return isPermittedRequest(remoteAddress);
    }

    protected String getRemoteAddress(HttpServletRequest request) {
        String remoteAddr = null;
        
        if (remoteAddressHeader != null) {
            remoteAddr = request.getHeader(remoteAddressHeader);
        }
        
        if (remoteAddr == null) {
            remoteAddr = request.getRemoteAddr();
        }
        
        return remoteAddr;
    }

    protected abstract String process(String url);
}
