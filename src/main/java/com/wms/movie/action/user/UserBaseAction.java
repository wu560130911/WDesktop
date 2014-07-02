/**
 * 
 */
package com.wms.movie.action.user;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.wms.movie.model.LoginLog;
import com.wms.movie.model.Theme;
import com.wms.movie.model.User;
import com.wms.movie.service.LoginLogService;
import com.wms.movie.service.ThemeService;
import com.wms.movie.service.UserService;
import com.wms.movie.tools.Constant;

/**
 * @author WMS
 * @version 1.3
 */
@Controller(value = "UserBaseAction")
@Scope("prototype")
@SuppressWarnings("serial")
public class UserBaseAction extends ActionSupport {

	@Autowired
	private UserService userservice;
	@Autowired
	private LoginLogService logservice;
	private User user;
	private String message;
	private String username;
	private long creadit;
	private String vcode;
	@Autowired
	private ThemeService themeService;

	public void setThemeService(ThemeService themeService) {
		this.themeService = themeService;
	}

	public UserService getUserservice() {
		return userservice;
	}

	public void setUserservice(UserService userservice) {
		this.userservice = userservice;
	}

	public LoginLogService getLogservice() {
		return logservice;
	}

	public void setLogservice(LoginLogService logservice) {
		this.logservice = logservice;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public long getCreadit() {
		return creadit;
	}

	public void setCreadit(long creadit) {
		this.creadit = creadit;
	}

	@SuppressWarnings("deprecation")
	public String login() {

		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		String vvcode = (String) session
				.getAttribute(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY);
		if (vvcode == null || vvcode.equals("") || !vvcode.equals(vcode)) {
			this.message = "验证码错误";
			return LOGIN;
		}
		User t = userservice.findUser(user.getId());
		if (t!=null) {
			LoginLog log = new LoginLog();
			log.setIp(user.getIp());
			log.setUser(t);
			log.setLogintime(new Date());

			if (!t.isvStatus()) {
				this.message = "未验证邮箱,请验证后再登陆.";
				log.setLoginsuccess(false);
				this.logservice.saveLog(log);
				return LOGIN;
			}

			if (t.isDisable()) {
				this.message = "被管理员锁定,请联系管理员.";
				log.setLoginsuccess(false);
				this.logservice.saveLog(log);
				return LOGIN;
			}

			if (userservice.login(t, user.getPassword())) {

				this.username = t.getName();
				this.creadit = t.getCredit();
				this.message = "success";

				log.setLoginsuccess(true);

				// 升级之用
				if (t.getTheme() == null) {
					t.setTheme(themeService.getDefaultTheme());
				}

				session.setAttribute(Constant.SESSION_USER_ID_KEY, t.getId());
				session.setAttribute(Constant.SESSION_USER_KEY, t);
				session.setAttribute(Constant.SESSION_USER_THEME, t.getTheme());

				Date curry = new Date();
				List<LoginLog> logs = this.logservice.findByLogintimeBetween(
						new Date(curry.getYear(), curry.getMonth(), curry
								.getDate()),
						new Date(curry.getYear(), curry.getMonth(), curry
								.getDate() + 1));
				if (logs.size() == 0) {
					t.setCredit(t.getCredit() + 2);// 登入积分
				}
				t.setLastLoginDate(new Date());
				this.userservice.updateUser(t);
			} else {

				this.message = "密码错误";
				log.setLoginsuccess(false);

			}
			this.logservice.saveLog(log);
		} else {
			this.message = "用户名错误";
		}
		return LOGIN;
	}

	public String register() {
		
		if (this.userservice.isExist(user.getId())
				|| "".equalsIgnoreCase(user.getId())) {
			this.message = "账号已存在或账号为空";
		} else {
			
			this.user.setRegistertime(new Date());
			
			user.setTheme(themeService.getDefaultTheme());
			
			this.userservice.saveUser(user);
			
			this.message = "success";
		}
		return LOGIN;
	}

	public String checklogin() {

		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession(false);
		if (session != null) {
			String username = (String) session.getAttribute("user_id");
			if (username != null && username.equals(this.username)) {
				this.message = "success";
				return LOGIN;
			}
		}
		this.message = "请重新登入";
		return LOGIN;
	}

	public String logout() {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		session.removeAttribute(Constant.SESSION_USER_ID_KEY);
		return LOGIN;
	}

	public String getRole() {

		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute(Constant.SESSION_USER_KEY);
			if (user != null) {
				this.message = "success";
				this.username = user.getUserRole();
				return LOGIN;
			}
		}
		this.message = "false";
		return LOGIN;
	}

	public String theme() {

		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession(false);
		if (session != null && user.getTheme() != null) {
			User user = (User) session.getAttribute(Constant.SESSION_USER_KEY);
			if (user != null) {
				user = this.userservice.findUser(user.getId());
				if (user != null) {
					Theme theme = this.themeService.findById(this.user
							.getTheme().getId());
					if (theme != null) {
						user.setTheme(theme);
						session.setAttribute(Constant.SESSION_USER_THEME, theme);
						this.userservice.updateUser(user);
						this.message = "success";
						return LOGIN;
					}
				}
			}
		}
		this.message = "false";

		return LOGIN;
	}

	public String lock() {

		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession(false);

		if (session == null) {
			this.message = "login";
			return LOGIN;
		}

		if (session.getAttribute(Constant.SESSION_USER_KEY) == null) {
			this.message = "login";
			return LOGIN;
		}

		if (session.getAttribute(Constant.SESSION_USER_LOCK) != null) {
			this.message = "lock";
			return LOGIN;
		}

		if (user != null && user.getPassword() != null) {
			this.message = "success";
			session.setAttribute(Constant.SESSION_USER_LOCK, user.getPassword());
		}

		return LOGIN;
	}

	public String unlock() {

		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession(false);

		if (session == null) {
			this.message = "login";
			return LOGIN;
		}

		if (session.getAttribute(Constant.SESSION_USER_KEY) == null) {
			this.message = "login";
			return LOGIN;
		}

		if (session.getAttribute(Constant.SESSION_USER_LOCK) == null) {
			this.message = "login";
			return LOGIN;
		}

		if (user != null && user.getPassword() != null) {

			String password = (String) session
					.getAttribute(Constant.SESSION_USER_LOCK);

			if (password.equals(user.getPassword())) {
				this.message = "success";
			} else {
				this.message = "锁定密码错误.";
			}
		}

		return LOGIN;
	}

	/**
	 * @return the vcode
	 */
	public String getVcode() {
		return vcode;
	}

	/**
	 * @param vcode
	 *            the vcode to set
	 */
	public void setVcode(String vcode) {
		this.vcode = vcode;
	}

	/*
	 * public void register() throws IOException {
	 * 
	 * HttpServletRequest request = ServletActionContext.getRequest();
	 * HttpServletResponse response = ServletActionContext.getResponse();
	 * request.setCharacterEncoding("UTF-8");
	 * response.setContentType("text/html");
	 * response.setCharacterEncoding("UTF-8"); PrintWriter out =
	 * response.getWriter(); if (userservice.isExist(user.getId())) {
	 * out.println("{success:false,text:'用户名已存在！'}"); out.flush(); out.close();
	 * return; }
	 * user.setPassword(Encryption.generatePassword(user.getPassword()));
	 * this.userservice.saveUser(user); out.println("{success:true}");
	 * out.flush(); out.close(); }
	 * 
	 * public void login() throws IOException { HttpServletRequest request =
	 * ServletActionContext.getRequest(); HttpServletResponse response =
	 * ServletActionContext.getResponse();
	 * request.setCharacterEncoding("UTF-8");
	 * response.setContentType("text/html");
	 * response.setCharacterEncoding("UTF-8"); PrintWriter out =
	 * response.getWriter(); if (this.userservice.isExist(user.getId())) { User
	 * t = userservice.findUser(user.getId()); if (Encryption
	 * .validatePassword(t.getPassword(), user.getPassword())) {
	 * out.println("{success:true}"); out.flush(); out.close(); return; }
	 * out.println("{success:false,text:'密码错误！'}"); out.flush(); out.close();
	 * return; } out.println("{success:false,text:'用户名不存在！'}"); out.flush();
	 * out.close(); }
	 */

}
