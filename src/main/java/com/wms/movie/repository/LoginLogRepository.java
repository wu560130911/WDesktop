/**
 * 登入日志的持久化操作
 */
package com.wms.movie.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wms.movie.model.LoginLog;
import com.wms.movie.model.User;

/**
 * @author WMS
 * @version 3.0
 */
public interface LoginLogRepository extends JpaRepository<LoginLog, Long> {

	@Query("delete from LoginLog log where log.user=?1")
	public void deleteLogs(User user);

	@Query("select log from LoginLog log where log.user=?1")
	public List<LoginLog> findByuid(User user);
	
	public List<LoginLog> findByLogintimeBetween(Date logintime,Date endtime);
}
