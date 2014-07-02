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
import com.wms.movie.model.MusicPlaylist;
import com.wms.movie.model.User;
import com.wms.movie.repository.MusicPlaylistRepository;
import com.wms.movie.service.MusicPlaylistService;
/**
 * @author WMS
 * @version 4.1
 */
@Service("MusicPlaylistService")
public class MusicPlaylistServiceImpl implements MusicPlaylistService{

	@Autowired
	private MusicPlaylistRepository playlistrepository;

	/**
	 * @return the playlistrepository
	 */
	public MusicPlaylistRepository getPlaylistrepository() {
		return playlistrepository;
	}

	/**
	 * @param playlistrepository the playlistrepository to set
	 */
	public void setPlaylistrepository(MusicPlaylistRepository playlistrepository) {
		this.playlistrepository = playlistrepository;
	}

	@Override
	public void save(MusicPlaylist playlist) {

		this.playlistrepository.save(playlist);
	}

	@Override
	public void save(List<MusicPlaylist> playlists) {

		this.playlistrepository.save(playlists);
	}

	@Override
	public void delete(MusicPlaylist playlist) {

		this.playlistrepository.delete(playlist);
	}

	@Override
	public void delete(long id) {

		this.playlistrepository.delete(id);
	}

	@Override
	public void delete(List<MusicPlaylist> playlists) {

		this.playlistrepository.delete(playlists);
	}

	@Override
	public List<MusicPlaylist> findByUser(User user) {

		return this.playlistrepository.findByUser(user);
	}

	@Override
	public Page<MusicPlaylist> findByUser(User user, Pageable pageable) {

		return this.playlistrepository.findByUser(user, pageable);
	}

	@Override
	public void deleteByUser(User user) {

		if(user!=null){
			List<MusicPlaylist> mpls = this.playlistrepository.findByUser(user);
			if(mpls!=null&&mpls.size()>0){
				this.playlistrepository.delete(mpls);
			}
		}
		//this.playlistrepository.deleteByUser(user);
	}

	@Override
	public void deleteByMedia(Music music) {

		if(music!=null){
			List<MusicPlaylist> mpls = this.playlistrepository.findByMusic(music);
			if(mpls!=null&&mpls.size()>0){
				this.playlistrepository.delete(mpls);
			}
		}
		//this.playlistrepository.deleteByMedia(music);
	}
}
