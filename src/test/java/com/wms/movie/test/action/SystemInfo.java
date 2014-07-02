///**
// * 
// */
//package com.wms.movie.test.action;
//
//import java.io.FileNotFoundException;
//import java.io.IOException;
//import java.util.Properties;
//
//import org.junit.Test;
//import org.springframework.core.io.ClassPathResource;
//
///**
// * @author WMS
// * @version 4.2
// */
//public class SystemInfo {
//
//	Properties pro = new Properties();
//	@Test
//	public void test() {
//		try {
//			ClassPathResource resource = new ClassPathResource("setting.properties");
//			pro.load(resource.getInputStream());
//			pro.setProperty("wms", "wms");
//			System.out.println(pro.getProperty("MovieWMS.fixtime"));
//		} catch (FileNotFoundException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}
//
//}
