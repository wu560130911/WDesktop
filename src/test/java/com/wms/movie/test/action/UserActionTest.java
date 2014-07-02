///**
// * 
// */
//package com.wms.movie.test.action;
//
//import java.io.UnsupportedEncodingException;
//
//import javax.servlet.ServletException;
//
//import org.apache.struts2.StrutsSpringJUnit4TestCase;
//import org.junit.Assert;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//
//import com.opensymphony.xwork2.ActionProxy;
//import com.wms.movie.action.user.UserBaseAction;
//
///**
// * @author WMS
// * @version 4.2
// */
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
//public class UserActionTest extends StrutsSpringJUnit4TestCase<UserBaseAction> {
//
//	@Test
//	public void login() {
//		request.setParameter("user.id", "test");
//		request.setParameter("user.password", "hello world");
//		request.setParameter("user.ip", "127.0.0.1");
//		ActionProxy proxy = getActionProxy("/user_login.action");
//		Assert.assertNotNull(proxy);
//		UserBaseAction userbaseaction = (UserBaseAction) proxy.getAction();
//		Assert.assertNotNull(userbaseaction);
//		try {
//			String result = this.executeAction("/user_login.action");
//			System.out.println(result);
//		} catch (UnsupportedEncodingException e1) {
//			e1.printStackTrace();
//		} catch (ServletException e1) {
//			e1.printStackTrace();
//		}
//		/*try {
//			String result = proxy.execute();
//			System.out.println(result);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}*/
//	}
//	@Test
//	public void test(){
//		String servletPath = this.request.getServletPath();
//		String realPath = this.request.getSession().getServletContext()
//				.getRealPath(servletPath);
//		System.out.println(realPath);
//	}
//}
