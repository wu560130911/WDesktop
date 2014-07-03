package com.wms.movie.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.wms.movie.model.User;
import com.wms.movie.model.Wallpaper;
import com.wms.movie.model.Wallpaper.WallpaperEnum;
import com.wms.movie.repository.WallpaperRepository;
import com.wms.movie.service.WallpaperService;

@Service("WallpaperService")
public class WallpaperServiceImpl implements WallpaperService {

	@Autowired
	private WallpaperRepository repository;

	@Override
	public void save(Wallpaper wallpaper) {

		this.repository.save(wallpaper);
	}

	@Override
	public void delete(Wallpaper wallpaper) {
		this.repository.delete(wallpaper);
	}

	@Override
	public void update(Wallpaper wallpaper) {
		this.repository.save(wallpaper);
	}

	@Override
	public List<Wallpaper> findAll() {
		return this.repository.findAll();
	}

	@Override
	public Page<Wallpaper> findAll(Pageable pageable) {

		return this.repository.findAll(pageable);
	}

	@Override
	public List<Wallpaper> findByUser(User user) {

		return this.repository.findByUser(user);
	}

	@Override
	public Page<Wallpaper> findByUser(User user, Pageable pageable) {

		return this.repository.findByUser(user, pageable);
	}

	@Override
	public List<Wallpaper> findByWallpaperType(WallpaperEnum we) {

		return this.repository.findByWallpaperType(we);
	}

	@Override
	public List<Wallpaper> findByWallpaperType(WallpaperEnum we,
			Pageable pageable) {

		return this.repository.findByWallpaperType(we, pageable);
	}

	@Override
	public Wallpaper findById(int id) {

		return this.repository.findOne(id);
	}

	@Override
	public void delete(int id) {
		this.repository.delete(id);
	}

}
