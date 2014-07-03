/**
 * 
 */
package com.wms.movie.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.wms.movie.model.Notebook;
import com.wms.movie.model.User;

/**
 * @author WMS
 * @version 4.0
 */
public interface NoteBookService {

	public void saveNote(Notebook note);

	public void deleteNote(Notebook note);

	public void updateNote(Notebook notebook);

	public Page<Notebook> findByUser(User user, Pageable pageable);
}
