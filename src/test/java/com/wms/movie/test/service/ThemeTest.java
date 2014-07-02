/**
 * 
 *//*
package com.wms.movie.test.service;

import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.wms.movie.model.Theme;
import com.wms.movie.model.User;
import com.wms.movie.service.ThemeService;
import com.wms.movie.service.UserService;

*//**
 * @author WMS
 * @version 4.5
 *//*
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
public class ThemeTest {

	@Autowired
	private UserService userService;
	
	@Autowired
	private ThemeService themeService;
	
	
	@Test
	public void test() {
		User user = this.userService.findUser("201158080111");
		if(user!=null){
			Theme theme = new Theme();
			theme.setName("默认风格");
			theme.setImgPath("desktop/resources/theme/default.png");
			theme.setPath("desktop/resources/extjs4.2.2/resources/css/theme-default.css");
			theme.setAddDate(new Date());
			theme.setDescription("默认风格");
			theme.setUser(user);
			
			Theme theme1 = new Theme();
			theme1.setName("现代风格");
			theme1.setImgPath("desktop/resources/theme/access.png");
			theme1.setPath("desktop/resources/extjs4.2.2/resources/css/theme-access.css");
			theme1.setAddDate(new Date());
			theme1.setDescription("现代风格");
			theme1.setUser(user);
			
			Theme theme2 = new Theme();
			theme2.setName("银灰风格");
			theme2.setImgPath("desktop/resources/theme/gray.png");
			theme2.setPath("desktop/resources/extjs4.2.2/resources/css/theme-gray.css");
			theme2.setAddDate(new Date());
			theme2.setDescription("银灰风格");
			theme2.setUser(user);
			
			Theme theme3 = new Theme();
			theme3.setName("海王星");
			theme3.setImgPath("desktop/resources/theme/default.png");
			theme3.setPath("desktop/resources/extjs4.2.2/resources/css/theme-neptune.css");
			theme3.setAddDate(new Date());
			theme3.setDescription("海王星");
			theme3.setUser(user);
			
			this.themeService.save(theme);
			this.themeService.save(theme1);
			this.themeService.save(theme2);
			this.themeService.save(theme3);
		}
	}

}
*/