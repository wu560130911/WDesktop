/**
 * 
 */
package com.wms.movie.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.wms.movie.model.Movie;
import com.wms.movie.model.User;
import com.wms.movie.repository.MovieRepository;
import com.wms.movie.service.MovieService;

/**
 * @author WMS
 * @version 4.1
 */
@Service(value="MovieService")
public class MovieServiceImpl implements MovieService {

	@Autowired
	private MovieRepository movierespository;
	
	
	public MovieRepository getMovierespository() {
		return movierespository;
	}

	public void setMovierespository(MovieRepository movierespository) {
		this.movierespository = movierespository;
	}

	/* (non-Javadoc)
	 * @see com.wms.movie.service.MovieService#saveMovie(com.wms.movie.model.Movie)
	 */
	@Override
	public void saveMovie(Movie movie) {

		this.movierespository.save(movie);
	}

	/* (non-Javadoc)
	 * @see com.wms.movie.service.MovieService#updateMovie(com.wms.movie.model.Movie)
	 */
	@Override
	public void updateMovie(Movie movie) {

		this.movierespository.save(movie);
	}

	/* (non-Javadoc)
	 * @see com.wms.movie.service.MovieService#deleteMovie(com.wms.movie.model.Movie)
	 */
	@Override
	public void deleteMovie(Movie movie) {

		this.movierespository.delete(movie);
	}

	/* (non-Javadoc)
	 * @see com.wms.movie.service.MovieService#findById(long)
	 */
	@Override
	public Movie findById(long id) {

		return this.movierespository.findOne(id);
	}

	/* (non-Javadoc)
	 * @see com.wms.movie.service.MovieService#findAll()
	 */
	@Override
	public List<Movie> findAll() {

		return this.movierespository.findAll();
	}


	@Override
	public Page<Movie> findAll(Pageable paramPageable) {

		return this.movierespository.findAll(paramPageable);
	}

	@Override
	public long count() {

		return this.movierespository.count();
	}

	@Override
	public Page<Movie> findByUser(User user, Pageable paramPageable,
			boolean scope) {

		if(!scope){
			user.setId("%"+user.getId()+"%");
		}
		
		return this.movierespository.findByUser(user, paramPageable);
	}

	@Override
	public Page<Movie> findByLike(String value, Pageable paramPageable,
			String column, boolean scope) {

		Page<Movie> temp = null;
		
		if(!scope){
			value = "%"+value+"%";
		}
		
		if(column.equals("title")){
			temp = this.movierespository.findByTitleLike(value, paramPageable);
		}else if(column.equals("author")){
			temp = this.movierespository.findByAuthorLike(value, paramPageable);
		}else if(column.equals("actor")){
			temp = this.movierespository.findByActorLike(value, paramPageable);
		}else if(column.equals("type")){
			temp = this.movierespository.findByTypeLike(value, paramPageable);
		}
		
		return temp;
	}

}
