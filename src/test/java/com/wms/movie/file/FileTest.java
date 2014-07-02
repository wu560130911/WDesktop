/**
 * 
 */
package com.wms.movie.file;

import java.io.IOException;
import java.io.InputStream;

import org.hibernate.cache.ehcache.EhCacheRegionFactory;
import org.junit.Test;
import org.springframework.core.io.ClassPathResource;

/**
 * @author WMS
 * @version 1.0
 * @date 2013-5-10 下午7:02:36
 */
public class FileTest {

	byte[] bytes = new byte[2048];
	
	@Test
	public void test() {
		ClassPathResource resource = new ClassPathResource("setting.properties");
		try {
			InputStream is = resource.getInputStream();
			int state = is.read(bytes, 1, 2047);
			System.out.println(state);
			System.out.println(new String(bytes).substring(0, state));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
