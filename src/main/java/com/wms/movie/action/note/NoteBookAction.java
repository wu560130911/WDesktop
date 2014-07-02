package com.wms.movie.action.note;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.wms.movie.model.Notebook;
import com.wms.movie.model.User;
import com.wms.movie.service.NoteBookService;
import com.wms.movie.service.UserService;

/**
 * @author WMS
 * @version 3.5
 */
@SuppressWarnings("serial")
@Controller("NoteBookAction")
@Scope(value = "prototype")
public class NoteBookAction extends ActionSupport {

	private Notebook note;
	@Autowired
	private NoteBookService noteservice;
	@Autowired
	private UserService userservice;

	private String message;

	private List<Notebook> notes;

	private int page;

	private int limit;

	private int start;

	private int total;

	public Notebook getNote() {
		return note;
	}

	public void setNote(Notebook note) {
		this.note = note;
	}

	public void setNoteservice(NoteBookService noteservice) {
		this.noteservice = noteservice;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public void setUserservice(UserService userservice) {
		this.userservice = userservice;
	}

	public List<Notebook> getNotes() {
		return notes;
	}

	public void setNotes(List<Notebook> notes) {
		this.notes = notes;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public String add() {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		if (session != null) {
			User user = this.userservice.findUser((String) session
					.getAttribute("user_id"));
			if (user != null) {
				this.note.setUser(user);
				this.note.setWritetime(new Date());
				this.noteservice.saveNote(note);
				this.message = "success";
			} else {
				this.message = "请先登入";
			}
		} else {
			this.message = "请先登入";
		}
		return SUCCESS;
	}

	public String list() {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		if (session != null) {
			User user = this.userservice.findUser((String) session
					.getAttribute("user_id"));
			if (user != null) {
				Page<Notebook> pageNote = this.noteservice.findByUser(user,
						new PageRequest(page - 1, limit));
				this.notes = pageNote.getContent();
				this.total = (int) pageNote.getTotalElements();
				this.message = "success";
				return SUCCESS;
			}
		}
		this.message = "login";
		return SUCCESS;
	}
}
