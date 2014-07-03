/**
 *
 * 本实体的用途是：用于积分管理系统，保存积分的产生、消费等。
 * 
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
public class Credit  implements Serializable{

	private static final long serialVersionUID = 6962743249624422271L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;// 编号
	@ManyToOne
	@JoinColumn(name = "uid")
	private User user;// 用户
	@Column(length = 100, nullable = false)
	private String reason;// 积分原因
	@Temporal(TemporalType.DATE)
	private Date time;// 时间

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
	 * @return the reason
	 */
	public String getReason() {
		return reason;
	}

	/**
	 * @param reason
	 *            the reason to set
	 */
	public void setReason(String reason) {
		this.reason = reason;
	}

	/**
	 * @return the time
	 */
	public Date getTime() {
		return time;
	}

	/**
	 * @param time
	 *            the time to set
	 */
	public void setTime(Date time) {
		this.time = time;
	}

}
