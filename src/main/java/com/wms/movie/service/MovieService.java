/**
 * 
 */
package com.wms.movie.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.wms.movie.model.Movie;
import com.wms.movie.model.User;

/**
 * @author WMS
 * @version 1.5
 */
public interface MovieService {

	public void saveMovie(Movie movie);
	
	public void updateMovie(Movie movie);
	
	public void deleteMovie(Movie movie);
	
	public Movie findById(long id);
	
	public List<Movie> findAll();
	
	public Page<Movie> findAll(Pageable paramPageable);
	
	public long count();
	
	public Page<Movie> findByUser(User user,Pageable paramPageable,boolean scope);
	
	public Page<Movie> findByLike(String value,Pageable paramPageable,String column,boolean scope);
	
}
