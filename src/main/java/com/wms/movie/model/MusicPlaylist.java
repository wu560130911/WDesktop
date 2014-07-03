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
public class MusicPlaylist extends Playlist  implements Serializable{

	private static final long serialVersionUID = -1552178539052428239L;
	
	@ManyToOne
	@JoinColumn(name="musicid")
	private Music music;

	public MusicPlaylist() {

	}
	
	public MusicPlaylist(long id) {
		setId(id);
	}
	
	/**
	 * @return the music
	 */
	public Music getMusic() {
		return music;
	}

	/**
	 * @param music the music to set
	 */
	public void setMusic(Music music) {
		this.music = music;
	}

	
}
