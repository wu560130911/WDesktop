/**
 * 
 * 主要用于保存用户的音乐或者电影列表，不使用关系的原因是本处直接处理比较简单，维护也更方便
 * 
 */
package com.wms.movie.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * @author WMS
 * @version 4.1
 */
@MappedSuperclass
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Playlist {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;// 编号

	@ManyToOne
	@JoinColumn(name = "uid")
	private User user;

	public Playlist() {
	}
	
	public Playlist(long id) {
		this.id = id;
	}
	
	/**
	 * @return the id
	 */
	public long getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(long id) {
		this.id = id;
	}

	/**
	 * @return the user
	 */
	public User getUser() {
		return user;
	}

	/**
	 * @param user
	 *            the user to set
	 */
	public void setUser(User user) {
		this.user = user;
	}

}
