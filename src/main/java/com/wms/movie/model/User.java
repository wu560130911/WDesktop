/**
 * 
 */
package com.wms.movie.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
 * @author WMS_WIN8
 * @version 1.5
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class User implements Serializable {

	private static final long serialVersionUID = 7553951047096739767L;

	@Id
	@Column(length = 20, nullable = false)
	private String id;
	@Column(length = 20, nullable = false)
	private String name;
	@Column(length = 80, nullable = false)
	private String password;
	@Lob
	private String description;
	@Column(length = 40, nullable = false)
	private String birthplace;
	@Temporal(TemporalType.DATE)
	private Date birthday;
	@Column(length = 30, nullable = false)
	private String email;
	@Column(length = 20)
	private String qq;
	@Column(length = 15, nullable = false)
	private String ip;
	@Column(length = 10, nullable = false)
	private long credit = 0;
	@Temporal(TemporalType.TIMESTAMP)
	private Date registertime;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
	private List<Credit> credits;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
	private List<LoginLog> loginlogs;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
	private List<Music> musics;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
	private List<Movie> movies;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
	private List<MoviePlaylist> movieplaylists;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
	private List<MusicPlaylist> musicplaylists;

	@Column(length = 20)
	private String userRole = "user";

	@ManyToOne
	@JoinColumn(name = "theme_id")
	private Theme theme;

	private boolean vStatus = false;

	private boolean disable = false;
	
	private String salt;// 加密字符串

	@Temporal(TemporalType.TIMESTAMP)
	private Date lastLoginDate;

	public User() {

	}

	public User(String id) {

		this.id = id;
	}

	@JSON(name = "uid")
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@JSON(serialize = false)
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getBirthplace() {
		return birthplace;
	}

	public void setBirthplace(String birthplace) {
		this.birthplace = birthplace;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public long getCredit() {
		return credit;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public void setCredit(long credit) {
		this.credit = credit;
	}

	@JSON(serialize = false)
	public List<Credit> getCredits() {
		return credits;
	}

	public void setCredits(List<Credit> credits) {
		this.credits = credits;
	}

	@JSON(serialize = false)
	public List<LoginLog> getLoginlogs() {
		return loginlogs;
	}

	public void setLoginlogs(List<LoginLog> loginlogs) {
		this.loginlogs = loginlogs;
	}

	@JSON(serialize = false)
	public List<Music> getMusics() {
		return musics;
	}

	public void setMusics(List<Music> musics) {
		this.musics = musics;
	}

	@JSON(serialize = false)
	public List<Movie> getMovies() {
		return movies;
	}

	public void setMovies(List<Movie> movies) {
		this.movies = movies;
	}

	public Date getRegistertime() {
		return registertime;
	}

	public void setRegistertime(Date registertime) {
		this.registertime = registertime;
	}

	/**
	 * @return the movieplaylists
	 */
	@JSON(serialize = false)
	public List<MoviePlaylist> getMovieplaylists() {
		return movieplaylists;
	}

	/**
	 * @param movieplaylists
	 *            the movieplaylists to set
	 */
	public void setMovieplaylists(List<MoviePlaylist> movieplaylists) {
		this.movieplaylists = movieplaylists;
	}

	/**
	 * @return the musicplaylists
	 */
	@JSON(serialize = false)
	public List<MusicPlaylist> getMusicplaylists() {
		return musicplaylists;
	}

	/**
	 * @param musicplaylists
	 *            the musicplaylists to set
	 */
	public void setMusicplaylists(List<MusicPlaylist> musicplaylists) {
		this.musicplaylists = musicplaylists;
	}

	public String getUserRole() {
		return userRole;
	}

	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}

	public boolean isvStatus() {
		return vStatus;
	}

	public void setvStatus(boolean vStatus) {
		this.vStatus = vStatus;
	}

	public boolean isDisable() {
		return disable;
	}

	public void setDisable(boolean disable) {
		this.disable = disable;
	}

	public Date getLastLoginDate() {
		return lastLoginDate;
	}

	public void setLastLoginDate(Date lastLoginDate) {
		this.lastLoginDate = lastLoginDate;
	}

	public Theme getTheme() {
		return theme;
	}

	public void setTheme(Theme theme) {
		this.theme = theme;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

}
