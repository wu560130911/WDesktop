/**
 * 
 */
package com.wms.movie.service;

import java.util.Date;
import java.util.List;

import com.wms.movie.model.LoginLog;
import com.wms.movie.model.User;

/**
 * @author WMS
 * @version 1.5
 */
public interface LoginLogService {

	public void saveLog(LoginLog log);
	
	public void deleteLog(LoginLog log);
	
	public void deleteLogs(User user);
	
	public List<LoginLog> findByuid(User user);
	
	public List<LoginLog> findByLogintimeBetween(Date logintime,Date endtime);
}
