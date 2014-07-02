///**
// * 
// */
//package com.wms.movie.test.service;
//
//import java.util.Date;
//import java.util.List;
//
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//
//import com.wms.movie.model.Notebook;
//import com.wms.movie.model.User;
//import com.wms.movie.service.NoteBookService;
//import com.wms.movie.service.UserService;
//
///**
// * @author WMS
// * @version 4.2
// */
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
//public class NoteBookServiceTest {
//
//	@Autowired
//	private NoteBookService notebookservice;
//
//	@Autowired
//	private UserService userservice;
//
//	public NoteBookService getNotebookservice() {
//		return notebookservice;
//	}
//
//	public void setNotebookservice(NoteBookService notebookservice) {
//		this.notebookservice = notebookservice;
//	}
//
//	/**
//	 * @return the userservice
//	 */
//	public UserService getUserservice() {
//		return userservice;
//	}
//
//	/**
//	 * @param userservice
//	 *            the userservice to set
//	 */
//	public void setUserservice(UserService userservice) {
//		this.userservice = userservice;
//	}
//
//	@Test
//	public void list() {
//		Page<Notebook> note = this.notebookservice.findByUser(new User("201158080111"), new PageRequest(1,2));
//		List<Notebook> notes = note.getContent();
//		Notebook tnote = notes.get(0);
//		tnote.setWritetime(new Date());
//		this.notebookservice.saveNote(tnote);
//		this.notebookservice.deleteNote(notes.get(1));
//	}
//
//	@Test
//	public void add() {
//		User user = this.userservice.findUser("201158080111");
//		Notebook note = new Notebook();
//		note.setUser(user);
//		note.setNotedate(new Date());
//		note.setWritetime(new Date());
//		note.setType("学习日记");
//		note.setMood("Good");
//		note.setWeather("阴");
//		note.setDescription("无");
//		this.notebookservice.saveNote(note);
//	}
//
//}
