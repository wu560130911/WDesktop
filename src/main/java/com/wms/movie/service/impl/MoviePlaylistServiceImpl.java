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
import com.wms.movie.model.MoviePlaylist;
import com.wms.movie.model.User;
import com.wms.movie.repository.MoviePlaylistRepository;
import com.wms.movie.service.MoviePlaylistService;

/**
 * @author WMS
 * @version 4.1
 */
@Service("MoviePlaylistService")
public class MoviePlaylistServiceImpl implements MoviePlaylistService {

	@Autowired
	private MoviePlaylistRepository playlistrepository;

	/**
	 * @return the playlistrepository
	 */
	public MoviePlaylistRepository getPlaylistrepository() {
		return playlistrepository;
	}

	/**
	 * @param playlistrepository
	 *            the playlistrepository to set
	 */
	public void setPlaylistrepository(MoviePlaylistRepository playlistrepository) {
		this.playlistrepository = playlistrepository;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wms.movie.service.MoviePlaylistService#save(com.wms.movie.model.
	 * MoviePlaylist)
	 */
	@Override
	public void save(MoviePlaylist playlist) {

		if (this.findByUserAndMedia(playlist.getUser(), playlist.getMovie()) == null) {
			this.playlistrepository.save(playlist);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wms.movie.service.MoviePlaylistService#save(java.util.List)
	 */
	@Override
	public void save(List<MoviePlaylist> playlists) {

		this.playlistrepository.save(playlists);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wms.movie.service.MoviePlaylistService#delete(com.wms.movie.model
	 * .MoviePlaylist)
	 */
	@Override
	public void delete(MoviePlaylist playlist) {

		this.playlistrepository.delete(playlist);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wms.movie.service.MoviePlaylistService#delete(long)
	 */
	@Override
	public void delete(long id) {

		this.playlistrepository.delete(id);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wms.movie.service.MoviePlaylistService#delete(java.util.List)
	 */
	@Override
	public void delete(List<MoviePlaylist> playlists) {

		this.playlistrepository.delete(playlists);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wms.movie.service.MoviePlaylistService#findByUser(com.wms.movie.model
	 * .User)
	 */
	@Override
	public List<MoviePlaylist> findByUser(User user) {

		return this.playlistrepository.findByUser(user);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wms.movie.service.MoviePlaylistService#findByUser(com.wms.movie.model
	 * .User, org.springframework.data.domain.Pageable)
	 */
	@Override
	public Page<MoviePlaylist> findByUser(User user, Pageable pageable) {

		return this.playlistrepository.findByUser(user, pageable);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wms.movie.service.MoviePlaylistService#deleteByUser(com.wms.movie
	 * .model.User)
	 */
	@Override
	public void deleteByUser(User user) {

		if (user != null) {
			List<MoviePlaylist> mpls = this.playlistrepository.findByUser(user);
			if (mpls != null && mpls.size() > 0) {
				this.playlistrepository.delete(mpls);
			}
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wms.movie.service.MoviePlaylistService#deleteByMedia(com.wms.movie
	 * .model.Movie)
	 */
	@Override
	public void deleteByMedia(Movie media) {

		if (media != null) {
			List<MoviePlaylist> mpls = this.playlistrepository
					.findByMovie(media);
			if (mpls != null && mpls.size() > 0) {
				this.playlistrepository.delete(mpls);
			}
		}
		// this.playlistrepository.deleteByMedia(media);
	}

	@Override
	public MoviePlaylist findByUserAndMedia(User user, Movie media) {

		return this.playlistrepository.findByUserAndMovie(user, media);
	}

}
