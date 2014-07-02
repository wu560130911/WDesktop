/**
 * 积分模块的持久化操作
 */
package com.wms.movie.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wms.movie.model.Credit;

/**
 * @author WMS
 * @version 3.0
 */
public interface CreditRepository extends JpaRepository<Credit, Long> {

}
