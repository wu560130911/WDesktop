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
public class Music  implements Serializable{

	private static final long serialVersionUID = -925864886145063615L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;// 编号
	@Column(length = 100, nullable = false)
	private String title;// 标题
	@Column(length = 50, nullable = false)
	private String singer;// 歌手
	private int year;// 年份
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
	private String description;//文件描述
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "music", cascade = CascadeType.ALL)
	private List<MusicPlaylist> musicplaylists;

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

	public String getSinger() {
		return singer;
	}

	public void setSinger(String singer) {
		this.singer = singer;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
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
	 * @return the musicplaylists
	 */
	@JSON(serialize=false)
	public List<MusicPlaylist> getMusicplaylists() {
		return musicplaylists;
	}

	/**
	 * @param musicplaylists the musicplaylists to set
	 */
	public void setMusicplaylists(List<MusicPlaylist> musicplaylists) {
		this.musicplaylists = musicplaylists;
	}

}
