/**
 * 
 */
package com.wms.movie.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.wms.movie.model.User;
import com.wms.movie.model.Wallpaper;
import com.wms.movie.model.Wallpaper.WallpaperEnum;

/**
 * @author WMS
 * 
 */
public interface WallpaperRepository extends JpaRepository<Wallpaper, Integer> {

	public List<Wallpaper> findByUser(User user);
	
	public Page<Wallpaper> findByUser(User user,Pageable pageable);
	
	public List<Wallpaper> findByWallpaperType(WallpaperEnum we);
	
	public List<Wallpaper> findByWallpaperType(WallpaperEnum we,Pageable pageable);
	
}
