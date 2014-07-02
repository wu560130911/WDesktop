/**
 * 
 */
package com.wms.movie.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.wms.movie.model.Movie;
import com.wms.movie.model.MoviePlaylist;
import com.wms.movie.model.User;

/**
 * @author WMS
 * @version 4.2
 */
public interface MoviePlaylistService {

	public void save(MoviePlaylist playlist);
	
	public void save(List<MoviePlaylist> playlists);

	public void delete(MoviePlaylist playlist);
	
	public void delete(long id);
	
	public void delete(List<MoviePlaylist> playlists);
	
	public List<MoviePlaylist> findByUser(User user);
	
	public Page<MoviePlaylist> findByUser(User user,Pageable pageable);
	
	public void deleteByUser(User user);
	
	public void deleteByMedia(Movie media);
	
	public MoviePlaylist findByUserAndMedia(User user,Movie media);
}
