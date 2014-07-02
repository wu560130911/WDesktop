/**
 * 
 */
package com.wms.movie.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.wms.movie.model.Theme;
import com.wms.movie.model.User;

/**
 * @author WMS
 * @version 4.5
 */
public interface ThemeService {

	public void save(Theme theme);

	public void delete(Theme theme);

	public void update(Theme theme);

	public Theme findById(int id);

	public void delete(int id);

	public List<Theme> findAll();

	public Page<Theme> findAll(Pageable pageable);

	public Page<Theme> findByUser(User user, Pageable pageable);

	public List<Theme> findByUser(User user);
	
	public Theme getDefaultTheme();
}
