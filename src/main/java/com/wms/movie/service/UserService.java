/**
 * 
 */
package com.wms.movie.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.wms.movie.model.User;

/**
 * @author WMS
 * @version 3.5
 */
public interface UserService {

	public void saveUser(User user);
	
	public void updateUser(User user);
	
	public void deleteUser(User user);
	
	public User findUser(String id);
	
	public boolean isExist(String id);
	
	public List<User> findAll();
	
	public Page<User> findAll(Pageable pageable);
	
	public boolean login(User user,String password);
}
