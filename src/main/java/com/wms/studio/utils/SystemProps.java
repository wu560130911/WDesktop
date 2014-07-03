/**
 * 
 */
package com.wms.studio.utils;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Properties;

import org.springframework.core.io.support.PropertiesLoaderUtils;

/**
 * @author WMS
 * 
 */
public class SystemProps {

	public static final String SERVER_FILE = "server.properties";

	public static Properties props = null;

	public static final String TIME_FORMAT="yyyy-MM-dd HH:mm:ss";
	
	public static SimpleDateFormat sdf = new SimpleDateFormat(TIME_FORMAT);
	
	public static boolean InitProps() {
		try {
			props = PropertiesLoaderUtils.loadAllProperties(SERVER_FILE);
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		return props != null;
	}

	public static String getValue(String key, String defaultValue) {
		return props.getProperty(key, defaultValue);
	}

	public static String getValue(String key) {
		return getValue(key, null);
	}
	
	public static String getDateFormatString(long times){
		return sdf.format(times);
	}
	
}
