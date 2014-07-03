package com.wms.movie.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.wms.movie.model.User;
import com.wms.movie.model.UserApplication;
import com.wms.movie.repository.UserApplicationRepository;
import com.wms.movie.service.UserApplicationService;

/**
 * 
 * @author WMS
 * @version 4.5
 */
@Service("UserApplicationService")
public class UserApplicationServiceImpl implements UserApplicationService {

	@Autowired
	private UserApplicationRepository repository;

	public void setRepository(UserApplicationRepository repository) {
		this.repository = repository;
	}

	@Override
	public void save(UserApplication ua) {

		this.repository.save(ua);
	}

	@Override
	public void update(UserApplication ua) {
		this.repository.save(ua);
	}

	@Override
	public void delete(UserApplication ua) {
		this.repository.delete(ua);
	}

	@Override
	public void delete(int id) {
		this.repository.delete(id);
	}

	@Override
	public UserApplication findById(int id) {
		return this.repository.findOne(id);
	}

	@Override
	public List<UserApplication> findByUser(User user) {
		return this.repository.findByUser(user);
	}

	@Override
	public Page<UserApplication> findByUser(User user, Pageable pageable) {

		return this.repository.findByUser(user, pageable);
	}

	@Override
	public List<UserApplication> findAll() {

		return this.repository.findAll();
	}

	@Override
	public Page<UserApplication> findAll(Pageable pageable) {
		return this.repository.findAll(pageable);
	}

}
