/**
 * 
 */
package com.wms.movie.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.apache.struts2.json.annotations.JSON;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * @author WMS
 * @version 3.5
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Notebook implements Serializable {

	private static final long serialVersionUID = -8858004141819401077L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;// 编号
	@ManyToOne
	@JoinColumn(name = "uid")
	private User user;// 用户
	@Lob
	private String description;// 内容
	@Column(length = 10, nullable = false)
	private String type;// 分类 生活日记、工作日记、观察日记，学习日记
	@Column(length = 30, nullable = false)
	private String weather;// 天气
	@Column(length = 30, nullable = false)
	private String mood;// 心情

	@Temporal(TemporalType.DATE)
	private Date notedate;

	@Temporal(TemporalType.TIMESTAMP)
	private Date writetime;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getWeather() {
		return weather;
	}

	public void setWeather(String weather) {
		this.weather = weather;
	}

	public String getMood() {
		return mood;
	}

	public void setMood(String mood) {
		this.mood = mood;
	}

	@JSON(format = "yyyy-MM-dd")
	public Date getNotedate() {
		return notedate;
	}

	public void setNotedate(Date notedate) {
		this.notedate = notedate;
	}

	@JSON(format = "yyyy-MM-dd HH:mm:ss")
	public Date getWritetime() {
		return writetime;
	}

	public void setWritetime(Date writetime) {
		this.writetime = writetime;
	}

}
