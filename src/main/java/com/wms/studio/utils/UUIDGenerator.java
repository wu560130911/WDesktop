/**
 * 
 */
package com.wms.studio.utils;

import java.util.UUID;

/**
 * @author WMS
 *
 */
public class UUIDGenerator {

	public static String getUUID(String uid){
		UUID uuid = UUID.randomUUID();
		return uid+"-"+uuid.toString().replace("-", "");
	}
	
	public static String getUUID(){
		UUID uuid = UUID.randomUUID();
		return uuid.toString().replace("-", "");
	}
}
