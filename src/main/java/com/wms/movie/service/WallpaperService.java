/**
 * 
 */
package com.wms.movie.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.wms.movie.model.User;
import com.wms.movie.model.Wallpaper;
import com.wms.movie.model.Wallpaper.WallpaperEnum;

/**
 * @author WMS
 * @version 4.5
 */
public interface WallpaperService {

	public void save(Wallpaper wallpaper);

	public void delete(Wallpaper wallpaper);
	
	public Wallpaper findById(int id);
	
	public void delete(int id);

	public void update(Wallpaper wallpaper);

	public List<Wallpaper> findAll();

	public Page<Wallpaper> findAll(Pageable pageable);

	public List<Wallpaper> findByUser(User user);

	public Page<Wallpaper> findByUser(User user, Pageable pageable);

	public List<Wallpaper> findByWallpaperType(WallpaperEnum we);

	public List<Wallpaper> findByWallpaperType(WallpaperEnum we,
			Pageable pageable);
}
