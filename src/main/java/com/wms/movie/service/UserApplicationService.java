/**
 * 
 */
package com.wms.movie.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.wms.movie.model.User;
import com.wms.movie.model.UserApplication;

/**
 * @author WMS
 *
 */
public interface UserApplicationService {

	public void save(UserApplication ua);
	
	public void update(UserApplication ua);
	
	public void delete(UserApplication ua);
	
	public void delete(int id);
	
	public UserApplication findById(int id);
	
	public List<UserApplication> findByUser(User user);
	
	public Page<UserApplication> findByUser(User user,Pageable pageable);
	
	public List<UserApplication> findAll();
	
	public Page<UserApplication> findAll(Pageable pageable);
}
