/**
 * 
 */
package com.wms.movie.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.wms.movie.model.Application;

/**
 * @author WMS
 * @version 4.5
 */
public interface ApplicationService {

	public void save(Application app);
	
	public void delete(Application app);
	
	public void update(Application app);
	
	public Application findById(int id);
	
	public Page<Application> findAll(Pageable pageable);
	
	public List<Application> findAll();
}
