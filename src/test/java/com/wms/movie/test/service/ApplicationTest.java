/**
 * 
 */
package com.wms.movie.test.service;

import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.wms.movie.model.Application;
import com.wms.movie.model.Application.ApplicationType;
import com.wms.movie.model.User;
import com.wms.movie.service.ApplicationService;
import com.wms.movie.service.UserService;

/**
 * @author WMS
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
public class ApplicationTest {

	@Autowired
	private UserService userService;
	
	@Autowired
	private ApplicationService appService;
	
	@Test
	public void test(){
		User user = this.userService.findUser("201158080111");
		if(user!=null){
			Application app = new Application();
			app.setAddDate(new Date());
			app.setAddUser(user);
			app.setDescription("查看本系统运行状态");
			app.setIconCls("cpu-shortcut");
			app.setModule("Wdesktop.desktop.widget.SystemStatus");
			app.setName("SystemStatus");
			app.setTip("查看服务器的运行状态");
			app.setTypeApp(false);
			app.setTypeGroup(ApplicationType.管理);
			app.setVersion("1.0.0");
			this.appService.save(app);
		}
	}
}
