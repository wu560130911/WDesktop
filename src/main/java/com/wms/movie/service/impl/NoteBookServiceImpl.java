/**
 * 
 */
package com.wms.movie.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.wms.movie.model.Notebook;
import com.wms.movie.model.User;
import com.wms.movie.repository.NoteBookRepository;
import com.wms.movie.service.NoteBookService;

/**
 * @author WMS
 * @version 4.1
 */
@Service(value = "NoteBookService")
public class NoteBookServiceImpl implements NoteBookService {

	@Autowired
	private NoteBookRepository noterepository;

	public NoteBookRepository getNoterepository() {
		return noterepository;
	}

	public void setNoterepository(NoteBookRepository noterepository) {
		this.noterepository = noterepository;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wms.movie.service.NoteBookService#saveNote(com.wms.movie.model.Notebook
	 * )
	 */
	@Override
	public void saveNote(Notebook note) {

		this.noterepository.save(note);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wms.movie.service.NoteBookService#deleteNote(com.wms.movie.model.
	 * Notebook)
	 */
	@Override
	public void deleteNote(Notebook note) {

		this.noterepository.delete(note);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wms.movie.service.NoteBookService#updateNote(com.wms.movie.model.
	 * Notebook)
	 */
	@Override
	public void updateNote(Notebook notebook) {

		this.noterepository.save(notebook);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wms.movie.service.NoteBookService#findByUser(com.wms.movie.model.
	 * User, org.springframework.data.domain.Pageable)
	 */
	@Override
	public Page<Notebook> findByUser(User user, Pageable pageable) {

		return this.noterepository.findByUser(user,pageable);
	}

}
