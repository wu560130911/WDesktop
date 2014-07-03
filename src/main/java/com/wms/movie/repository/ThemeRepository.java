/**
 * 
 */
package com.wms.movie.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.wms.movie.model.Theme;
import com.wms.movie.model.User;

/**
 * @author WMS
 *
 */
public interface ThemeRepository extends JpaRepository<Theme, Integer> {

	public List<Theme> findByUser(User user);
	
	public Page<Theme> findByUser(User user,Pageable pageable);
	
	public List<Theme> findByDefaultThemeTrue();
}
