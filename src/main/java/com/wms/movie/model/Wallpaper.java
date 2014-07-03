/**
 * 
 */
package com.wms.movie.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * @author WMS
 * 
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "wallpaper_table")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Wallpaper implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(length = 50)
	private String name;

	@Column(length = 250)
	private String path;

	@Enumerated(EnumType.STRING)
	private WallpaperEnum wallpaperType;

	@Temporal(TemporalType.TIMESTAMP)
	private Date addDate;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public WallpaperEnum getWallpaperType() {
		return wallpaperType;
	}

	public void setWallpaperType(WallpaperEnum wallpaperType) {
		this.wallpaperType = wallpaperType;
	}

	public Date getAddDate() {
		return addDate;
	}

	public void setAddDate(Date addDate) {
		this.addDate = addDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public enum WallpaperEnum {
		动漫, 游戏, 创意, 苹果, 写真, 可爱, 小清新, 摄影, 非主流, 设计, 手绘, 月历, 体育, 影视, 美食, 军事, 艺术, 品牌, CG, 高清, 宽屏, 浪漫爱情, 伤感, 其他;
	}
}
