/**
 * 
 */
package com.wms.movie.test.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.wms.movie.model.User;
import com.wms.movie.service.UserService;
import com.wms.movie.tools.Encryption;
import com.wms.studio.utils.Encodes;

/**
 * @author WMS
 * 
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
public class UserServiceTest {

	@Autowired
	private UserService userservice;

	/**
	 * @return the userservice
	 */
	public UserService getUserservice() {
		return userservice;
	}

	/**
	 * @param userservice
	 *            the userservice to set
	 */
	public void setUserservice(UserService userservice) {
		this.userservice = userservice;
	}

	@Test
	public void save() {
		User user = this.userservice.findUser("test");
		if (user == null) {
			user = new User();
		} else {
			return;
		}
		user.setId("test" + System.currentTimeMillis() % 1000);
		user.setPassword(Encryption.generatePassword("hello world"));
		user.setEmail("");
		user.setName(user.getId());
		user.setBirthday(new Date());
		user.setBirthplace("hello,world");
		user.setIp("127.0.0.1");
		this.userservice.saveUser(user);
	}

	@Test
	public void saveOne() {
		User user = new User();
		user.setId("560130911");
		user.setPassword("5601309");
		user.setEmail("560130911@163.com");
		user.setName(user.getId());
		user.setBirthday(new Date());
		user.setBirthplace("hello,world");
		user.setIp("127.0.0.1");
		this.userservice.saveUser(user);

	}

	@Test
	public void update() {
		User user = this.userservice.findUser("test");
		if (user == null) {
			return;
		}
		user.setName("WMS");
		this.userservice.updateUser(user);
	}

	@Test
	public void delete() {
		User user = this.userservice.findUser("test");
		if (user == null) {
			return;
		}
		this.userservice.deleteUser(user);
	}

	@Test
	public void isExist() {
		System.out.println(this.userservice.isExist("test"));
	}

	@Test
	public void findAll() {

		this.userservice.findAll();
	}

	@Test
	public void test() {

		User user = this.userservice.findUser("201158080111");
		System.out.println(user.getPassword());
		byte[] test = gen(user.getSalt(),"201158080111");
		String cp = Encodes.encodeHex(test);
		System.out.println(cp);
		System.out.println(this.userservice.login(user, "201158080111"));
	}
	
	public byte[] gen(String salt,String password){
		
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-1");
			
			digest.reset();
			
			digest.update(Encodes.decodeHex(salt));
			
			byte[] hashed = digest.digest(password.getBytes());
			
			for (int i = 0; i < 1023; i++) {
	            digest.reset();
	            hashed = digest.digest(hashed);
	        }
			
			return hashed;
			
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		
		return null;
	}
}
