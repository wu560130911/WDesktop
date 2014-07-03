/**
 * 
 */
package com.wms.movie.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * @author WMS
 * @version 4.2
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MoviePlaylist extends Playlist  implements Serializable{

	private static final long serialVersionUID = 282862049796848984L;
	
	@ManyToOne
	@JoinColumn(name="movieid")
	private Movie movie;

	public MoviePlaylist(long movieid) {
		super.setId(movieid);
	}
	
	public MoviePlaylist() {
		
	}

	/**
	 * @return the movie
	 */
	public Movie getMovie() {
		return movie;
	}

	/**
	 * @param movie the movie to set
	 */
	public void setMovie(Movie movie) {
		this.movie = movie;
	}
}
