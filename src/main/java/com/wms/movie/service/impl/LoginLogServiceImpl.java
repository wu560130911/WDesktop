/**
 * 
 */
package com.wms.movie.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wms.movie.model.LoginLog;
import com.wms.movie.model.User;
import com.wms.movie.repository.LoginLogRepository;
import com.wms.movie.service.LoginLogService;

/**
 * @author WMS
 * @version 4.1
 */
@Service(value="LoginLogService")
public class LoginLogServiceImpl implements LoginLogService {

	@Autowired
	private LoginLogRepository logrepository;
	
	public LoginLogRepository getLogrepository() {
		return logrepository;
	}

	public void setLogrepository(LoginLogRepository logrepository) {
		this.logrepository = logrepository;
	}

	/* (non-Javadoc)
	 * @see com.wms.movie.service.LoginLogService#saveLog(com.wms.movie.model.LoginLog)
	 */
	@Override
	public void saveLog(LoginLog log) {

		this.logrepository.save(log);
	}

	/* (non-Javadoc)
	 * @see com.wms.movie.service.LoginLogService#deleteLog(com.wms.movie.model.LoginLog)
	 */
	@Override
	public void deleteLog(LoginLog log) {

		this.logrepository.delete(log);
		
	}

	/* (non-Javadoc)
	 * @see com.wms.movie.service.LoginLogService#deleteLogs(java.lang.String)
	 */
	@Override
	public void deleteLogs(User user) {

		this.logrepository.deleteLogs(user);
		
	}

	/* (non-Javadoc)
	 * @see com.wms.movie.service.LoginLogService#findByuid(java.lang.String)
	 */
	@Override
	public List<LoginLog> findByuid(User user) {
		
		return this.logrepository.findByuid(user);
	}

	@Override
	public List<LoginLog> findByLogintimeBetween(Date logintime, Date endtime) {

		return this.logrepository.findByLogintimeBetween(logintime, endtime);
	}

}
