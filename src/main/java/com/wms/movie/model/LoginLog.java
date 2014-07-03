/**
 * 登入日志
 */
package com.wms.movie.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * @author WMS_WIN8
 * @version 1.5
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LoginLog  implements Serializable{

	private static final long serialVersionUID = -5597998919846931469L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;// 编号
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "uid")
	private User user;// 用户
	@Temporal(TemporalType.TIMESTAMP)
	private Date logintime;// 登入时间
	@Column(length = 40, nullable = false)
	private String ip;// 登入ip

	private boolean loginsuccess;// 登入状态

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

	/**
	 * @return the logintime
	 */
	public Date getLogintime() {
		return logintime;
	}

	/**
	 * @param logintime
	 *            the logintime to set
	 */
	public void setLogintime(Date logintime) {
		this.logintime = logintime;
	}

	/**
	 * @return the ip
	 */
	public String getIp() {
		return ip;
	}

	/**
	 * @param ip
	 *            the ip to set
	 */
	public void setIp(String ip) {
		this.ip = ip;
	}

	/**
	 * @return the loginsuccess
	 */
	public boolean isLoginsuccess() {
		return loginsuccess;
	}

	/**
	 * @param loginsuccess
	 *            the loginsuccess to set
	 */
	public void setLoginsuccess(boolean loginsuccess) {
		this.loginsuccess = loginsuccess;
	}

}
