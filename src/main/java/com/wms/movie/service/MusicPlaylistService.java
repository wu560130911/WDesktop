/**
 * 
 */
package com.wms.movie.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.wms.movie.model.Music;
import com.wms.movie.model.MusicPlaylist;
import com.wms.movie.model.User;

/**
 * @author WMS
 * @version 4.2
 */
public interface MusicPlaylistService {

	public void save(MusicPlaylist playlist);
	
	public void save(List<MusicPlaylist> playlists);
	
	public void delete(MusicPlaylist playlist);
	
	public void delete(long id);
	
	public void delete(List<MusicPlaylist> playlists);
	
	public List<MusicPlaylist> findByUser(User user);
	
	public Page<MusicPlaylist> findByUser(User user,Pageable pageable);
	
	public void deleteByUser(User user);
	
	public void deleteByMedia(Music music);
}
