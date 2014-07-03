/**
 * 
 */
package com.wms.movie.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.wms.movie.model.Music;
import com.wms.movie.model.User;

/**
 * @author WMS
 * @version 1.5
 */
public interface MusicService {

	public void saveMusic(Music music);

	public void deleteMusic(Music music);

	public void updateMusic(Music music);

	public Music findMusic(long id);

	public List<Music> findAll();

	public Page<Music> findAll(Pageable paramPageable);
	
	public long count();
	
	public Page<Music> findByLike(String value,Pageable paramPageable,String column,boolean scope);
	
	public Page<Music> findByYear(int year,Pageable pageable);
	
	public Page<Music> findByUser(User user,Pageable pageable);
	
}
