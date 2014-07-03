/**
 * 电影的持久化操作
 */
package com.wms.movie.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.wms.movie.model.Movie;
import com.wms.movie.model.User;

/**
 * @author WMS
 * @version 3.0
 */
public interface MovieRepository extends JpaRepository<Movie, Long> {

	public Page<Movie> findByUser(User user, Pageable pageable);

	public Page<Movie> findByTitleLike(String title, Pageable pageable);

	public Page<Movie> findByAuthorLike(String author, Pageable pageable);

	public Page<Movie> findByActorLike(String actor, Pageable pageable);

	public Page<Movie> findByTypeLike(String type, Pageable pageable);

}
