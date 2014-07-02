/**
 * 
 */
package com.wms.movie.action.server;

import java.io.IOException;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.opensymphony.xwork2.ActionSupport;

/**
 * @author WMS
 * @version 4.2
 */
@SuppressWarnings("serial")
@Service("SettingService")
public class SettingService extends ActionSupport {

	private static Logger log = Logger.getLogger(SettingService.class);
	private static Properties pro = new Properties();
	
	public SettingService() {
		log.info("初始化系统配置文件");
		try {
			ClassPathResource resource = new ClassPathResource("setting.properties");
			pro.load(resource.getInputStream());
		} catch (IOException e) {
			log.info(e.getLocalizedMessage());
		}
	}
	
	public static String getValue(String key){
		if(log.isDebugEnabled()){
			log.info("获取系统配置文件----"+key+"="+pro.getProperty(key));
		}
		return pro.getProperty(key);
	}
}
