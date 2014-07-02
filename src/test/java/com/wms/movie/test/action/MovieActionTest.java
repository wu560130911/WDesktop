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
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//
//import com.wms.movie.action.movie.MovieAction;
//
///**
// * @author WMS
// * @version 4.2
// */
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
//public class MovieActionTest extends StrutsSpringJUnit4TestCase<MovieAction> {
//
//	@Test
//	public void list() {
//		request.setParameter("page", "1");
//		request.setParameter("limit", "25");
//		try {
//			String result = executeAction("/movie_list.action");
//			System.out.println(result);
//		} catch (UnsupportedEncodingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (ServletException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//
//	}
//
//}
