package com.wms.movie.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.wms.movie.model.Theme;
import com.wms.movie.model.User;
import com.wms.movie.repository.ThemeRepository;
import com.wms.movie.service.ThemeService;

/**
 * 
 * @author WMS
 * @version 4.5
 */
@Service("ThemeService")
public class ThemeServiceImpl implements ThemeService {

	@Autowired
	private ThemeRepository repository;

	public void setRepository(ThemeRepository repository) {

		this.repository = repository;
	}

	@Override
	public void save(Theme theme) {

		this.repository.save(theme);
	}

	@Override
	public void delete(Theme theme) {

		this.repository.delete(theme);
	}

	@Override
	public void update(Theme theme) {

		this.repository.save(theme);
	}

	@Override
	public Theme findById(int id) {

		return this.repository.findOne(id);
	}

	@Override
	public void delete(int id) {

		this.repository.delete(id);
	}

	@Override
	public List<Theme> findAll() {

		return this.repository.findAll();
	}

	@Override
	public Page<Theme> findAll(Pageable pageable) {

		return this.repository.findAll(pageable);
	}

	@Override
	public Page<Theme> findByUser(User user, Pageable pageable) {

		return this.repository.findByUser(user, pageable);
	}

	@Override
	public List<Theme> findByUser(User user) {

		return this.repository.findByUser(user);
	}

	@Override
	public Theme getDefaultTheme() {
		List<Theme> themes = this.repository.findByDefaultThemeTrue();
		if(themes!=null&&themes.size()>0){
			return themes.get(0);
		}
		return null;
	}

}
