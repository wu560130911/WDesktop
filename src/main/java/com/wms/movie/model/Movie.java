package com.wms.movie.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.apache.struts2.json.annotations.JSON;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * 
 * @author WMS
 * @version 4.2
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Movie  implements Serializable{

	private static final long serialVersionUID = 6812123191237534409L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;// 编号
	@Column(length = 100, nullable = false)
	private String title;// 片名
	@Column(length = 50, nullable = false)
	private String author;// 导演
	@Column(length = 100, nullable = false)
	private String actor;// 主演
	@Temporal(TemporalType.DATE)
	private Date madetime;// 制作时间
	@Column(length = 20, nullable = false)
	private String type;// 类型
	private int duration;// 时长
	private long size;// 文件大小
	@ManyToOne
	@JoinColumn(name = "uid")
	private User user;// 上传用户
	@Temporal(TemporalType.TIMESTAMP)
	private Date time;// 上传时间
	@Lob
	private String description;// 文件描述
	@Column(nullable=true,length=30)
	private String filename;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "movie", cascade = CascadeType.ALL)
	private List<MoviePlaylist> movieplaylists;

	public Movie() {
	}
	
	public Movie(long id) {
		this.id = id;
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getActor() {
		return actor;
	}

	public void setActor(String actor) {
		this.actor = actor;
	}

	@JSON(format="yyyy-MM-dd")
	public Date getMadetime() {
		return madetime;
	}

	public void setMadetime(Date madetime) {
		this.madetime = madetime;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@JSON(format="yyyy-MM-dd HH:mm:ss")
	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the movieplaylists
	 */
	@JSON(serialize=false)
	public List<MoviePlaylist> getMovieplaylists() {
		return movieplaylists;
	}

	/**
	 * @param movieplaylists the movieplaylists to set
	 */
	public void setMovieplaylists(List<MoviePlaylist> movieplaylists) {
		this.movieplaylists = movieplaylists;
	}

	/**
	 * @return the filename
	 */
	public String getFilename() {
		return filename;
	}

	/**
	 * @param filename the filename to set
	 */
	public void setFilename(String filename) {
		this.filename = filename;
	}

}
