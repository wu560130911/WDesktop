/**
 * 日记的持久化操作
 */
package com.wms.movie.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.wms.movie.model.Notebook;
import com.wms.movie.model.User;

/**
 * @author WMS
 * @version 3.0
 */
public interface NoteBookRepository extends JpaRepository<Notebook, Long> {

	public Page<Notebook> findByUser(User user,Pageable pageable);
}
