/**
 * 
 */
package com.wms.movie.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.wms.movie.model.Music;
import com.wms.movie.model.MusicPlaylist;
import com.wms.movie.model.User;

/**
 * @author WMS
 * @version 4.2
 */
public interface MusicPlaylistRepository extends
		JpaRepository<MusicPlaylist, Long> {

	/*@Modifying
	@Transactional
	@Query("delete from MusicPlaylist playlist where playlist.user=?1")
	public void deleteByUser(User user);

	@Modifying
	@Transactional
	@Query("delete from MusicPlaylist playlist where playlist.music=?1")
	public void deleteByMedia(Music movie);*/

	public Page<MusicPlaylist> findByUser(User user, Pageable pageable);

	public List<MusicPlaylist> findByUser(User user);
	
	public List<MusicPlaylist> findByMusic(Music movie);
}
