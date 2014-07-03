/**
 * 用户的持久化操作
 */
package com.wms.movie.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wms.movie.model.User;

/**
 * @author WMS
 * @version 3.0
 */
public interface UserRepository extends JpaRepository<User,String>{

}
