/**
 * 
 */
package com.wms.movie.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wms.movie.model.Application;

/**
 * @author WMS
 * @version 4.5
 */
public interface ApplicationRepository extends
		JpaRepository<Application, Integer> {

}
