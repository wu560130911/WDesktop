/**
 * 
 */
package com.wms.movie.action.theme;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.wms.movie.model.Theme;
import com.wms.movie.model.User;
import com.wms.movie.service.ThemeService;
import com.wms.movie.tools.Constant;

/**
 * @author WMS
 * @version 4.5
 */
@SuppressWarnings("serial")
@Controller("ThemeAction")
@Scope("prototype")
public class ThemeAction extends ActionSupport {

	private List<Theme> themes;

	@Autowired
	private ThemeService serviceTheme;

	private String message;

	public List<Theme> getThemes() {
		return themes;
	}

	public void setThemes(List<Theme> themes) {
		this.themes = themes;
	}

	public ThemeService getServiceTheme() {
		return serviceTheme;
	}

	public void setServiceTheme(ThemeService serviceTheme) {
		this.serviceTheme = serviceTheme;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String listTheme() {

		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute(Constant.SESSION_USER_KEY);
			if (user != null) {
				this.message = "success";
				themes = this.serviceTheme.findAll();
				return SUCCESS;
			}
		}
		this.message = "false";

		return SUCCESS;
	}

}
