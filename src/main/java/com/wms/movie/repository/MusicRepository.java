/**
 * 音乐的持久化操作
 */
package com.wms.movie.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.wms.movie.model.Music;
import com.wms.movie.model.User;

/**
 * @author WMS
 * @version 3.0
 */
public interface MusicRepository extends JpaRepository<Music, Long> {

	public Page<Music> findByUser(User user,Pageable pageable);
	
	public Page<Music> findByTitleLike(String title,Pageable pageable);
	
	public Page<Music> findBySingerLike(String singer,Pageable pageable);

	public Page<Music> findByYear(int year,Pageable pageable);
	
	public Page<Music> findByTypeLike(String type,Pageable pageable);
}
