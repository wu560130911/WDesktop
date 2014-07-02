/**
 * 
 */
package com.wms.movie.action.app;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.wms.movie.model.Application;
import com.wms.movie.model.User;
import com.wms.movie.model.UserApplication;
import com.wms.movie.service.UserApplicationService;
import com.wms.movie.tools.Constant;
import com.wms.movie.transform.AppToWeb;

/**
 * @author WMS
 * @version 4.5
 */
@SuppressWarnings("serial")
@Controller("UserAppAction")
@Scope("prototype")
public class UserAppAction extends ActionSupport {

	@Autowired
	private UserApplicationService uaService;

	private String message;

	private List<AppToWeb> atws;

	private Application app;

	public void setUaService(UserApplicationService uaService) {
		this.uaService = uaService;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<AppToWeb> getAtws() {
		return atws;
	}

	public void setAtws(List<AppToWeb> atws) {
		this.atws = atws;
	}

	public Application getApp() {
		return app;
	}

	public void setApp(Application app) {
		this.app = app;
	}

	public String getApps(){
		
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute(Constant.SESSION_USER_KEY);
			if (user != null) {
				this.message = "success";
				List<UserApplication> lps = this.uaService.findByUser(user);
				atws = new ArrayList<AppToWeb>();
				for(UserApplication ua:lps){
					atws.add(new AppToWeb(ua.getApp()));
				}
				return SUCCESS;
			}
		}
		this.message = "false";
		
		return SUCCESS;
	}
}
