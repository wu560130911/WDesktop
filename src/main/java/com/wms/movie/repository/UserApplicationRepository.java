/**
 * 
 */
package com.wms.movie.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.wms.movie.model.User;
import com.wms.movie.model.UserApplication;

/**
 * @author WMS
 * @version 4.5
 */
public interface UserApplicationRepository extends
		JpaRepository<UserApplication, Integer> {

	public List<UserApplication> findByUser(User user);

	public Page<UserApplication> findByUser(User user, Pageable pageable);
}
