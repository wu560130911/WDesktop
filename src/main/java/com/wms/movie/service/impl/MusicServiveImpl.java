/**
 * 
 */
package com.wms.movie.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.wms.movie.model.Music;
import com.wms.movie.model.User;
import com.wms.movie.repository.MusicRepository;
import com.wms.movie.service.MusicService;

/**
 * @author WMS
 * @version 4.1
 */
@Service(value = "MusicService")
public class MusicServiveImpl implements MusicService {

	@Autowired
	private MusicRepository musicrepository;

	public MusicRepository getMusicrepository() {
		return musicrepository;
	}

	public void setMusicrepository(MusicRepository musicrepository) {
		this.musicrepository = musicrepository;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wms.movie.service.MusicService#saveMusic(com.wms.movie.model.Music)
	 */
	@Override
	public void saveMusic(Music music) {

		this.musicrepository.save(music);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wms.movie.service.MusicService#deleteMusic(com.wms.movie.model.Music)
	 */
	@Override
	public void deleteMusic(Music music) {

		this.musicrepository.delete(music);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wms.movie.service.MusicService#updateMusic(com.wms.movie.model.Music)
	 */
	@Override
	public void updateMusic(Music music) {

		this.musicrepository.save(music);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wms.movie.service.MusicService#findMusic(long)
	 */
	@Override
	public Music findMusic(long id) {

		return this.musicrepository.findOne(id);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wms.movie.service.MusicService#findAll()
	 */
	@Override
	public List<Music> findAll() {

		return this.musicrepository.findAll();
	}

	@Override
	public Page<Music> findAll(Pageable paramPageable) {

		return this.musicrepository.findAll(paramPageable);
	}

	@Override
	public long count() {

		return this.musicrepository.count();
	}

	@Override
	public Page<Music> findByLike(String value, Pageable paramPageable,
			String column, boolean scope) {

		Page<Music> temp = null;

		if (!scope) {
			value = "%" + value + "%";
		}

		if (column.equals("title")) {

			temp = this.musicrepository.findByTitleLike(value, paramPageable);

		} else if (column.equals("singer")) {
			temp = this.musicrepository.findBySingerLike(value, paramPageable);
		} else if (column.equals("type")) {
			temp = this.musicrepository.findByTypeLike(value, paramPageable);
		}

		return temp;
	}

	@Override
	public Page<Music> findByYear(int year, Pageable pageable) {

		return this.musicrepository.findByYear(year, pageable);
	}

	@Override
	public Page<Music> findByUser(User user, Pageable pageable) {

		return this.musicrepository.findByUser(user, pageable);
	}

}
