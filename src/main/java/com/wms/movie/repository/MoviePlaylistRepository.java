/**
 * 
 */
package com.wms.movie.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.wms.movie.model.Movie;
import com.wms.movie.model.MoviePlaylist;
import com.wms.movie.model.User;

/**
 * @author WMS
 * @version 4.2
 */
public interface MoviePlaylistRepository extends
		JpaRepository<MoviePlaylist, Long> {

	public List<MoviePlaylist> findByMovie(Movie movie);
	
	/*@Modifying
	@Transactional
	@Query("delete from MoviePlaylist playlist where playlist.user=?1")
	public void deleteByUser(User user);
	

	@Modifying
	@Transactional
	@Query("delete from MoviePlaylist playlist where playlist.movie=?1")
	public void deleteByMedia(Movie movie);*/
	
	
	public Page<MoviePlaylist> findByUser(User user,Pageable pageable);
	
	public List<MoviePlaylist> findByUser(User user);
	
	public MoviePlaylist findByUserAndMovie(User user,Movie movie);
}
