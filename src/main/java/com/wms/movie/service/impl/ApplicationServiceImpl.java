package com.wms.movie.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.wms.movie.model.Application;
import com.wms.movie.repository.ApplicationRepository;
import com.wms.movie.service.ApplicationService;

/**
 * 
 * @author WMS
 * @version 4.5
 */
@Service("ApplicationService")
public class ApplicationServiceImpl implements ApplicationService {

	@Autowired
	private ApplicationRepository repository;
	
	public void setRepository(ApplicationRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public void save(Application app) {
		this.repository.save(app);
	}

	@Override
	public void delete(Application app) {

		this.repository.delete(app);
	}

	@Override
	public void update(Application app) {

		this.repository.save(app);
	}

	@Override
	public Application findById(int id) {

		return this.repository.findOne(id);
	}

	@Override
	public Page<Application> findAll(Pageable pageable) {

		return this.repository.findAll(pageable);
	}

	@Override
	public List<Application> findAll() {

		return this.repository.findAll();
	}

}
