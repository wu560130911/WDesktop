/**
 * 
 */
package com.wms.movie.action.playlist;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.wms.movie.model.Movie;
import com.wms.movie.model.MoviePlaylist;
import com.wms.movie.model.User;
import com.wms.movie.service.MoviePlaylistService;

/**
 * @author WMS
 * @version 4.2
 */
@SuppressWarnings("serial")
@Controller("MoviePlaylistAction")
@Scope("prototype")
public class MoviePlaylistAction extends ActionSupport {

	@Autowired
	private MoviePlaylistService playlistservice;

	private List<MoviePlaylist> datas;

	private String message;

	private long movieid;

	/**
	 * @return the playlistservice
	 */
	public MoviePlaylistService getPlaylistservice() {
		return playlistservice;
	}

	/**
	 * @param playlistservice
	 *            the playlistservice to set
	 */
	public void setPlaylistservice(MoviePlaylistService playlistservice) {
		this.playlistservice = playlistservice;
	}

	/**
	 * @return the datas
	 */
	public List<MoviePlaylist> getDatas() {
		return datas;
	}

	/**
	 * @param datas
	 *            the datas to set
	 */
	public void setDatas(List<MoviePlaylist> datas) {
		this.datas = datas;
	}

	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * @param message
	 *            the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	/**
	 * @return the movieid
	 */
	public long getMovieid() {
		return movieid;
	}

	/**
	 * @param movieid
	 *            the movieid to set
	 */
	public void setMovieid(long movieid) {
		this.movieid = movieid;
	}

	public String list() {

		String user_id = this.Userid();
		if (user_id == null) {
			this.message = "error";
			return SUCCESS;
		}
		this.datas = this.playlistservice.findByUser(new User(user_id));
		this.message = "SUCCESS";
		return SUCCESS;
	}

	public String add() {

		String user_id = this.Userid();
		if (user_id == null) {
			this.message = "error";
			return SUCCESS;
		}
		User user = new User(user_id);
		for (MoviePlaylist playlist : datas) {
			playlist.setUser(user);
			this.playlistservice.save(playlist);
		}
		this.message = "SUCCESS";
		return SUCCESS;
	}

	public String delete() {

		if (this.movieid != 0 && Userid() != null) {
			this.playlistservice.deleteByMedia(new Movie(this.movieid));
			this.message = "SUCCESS";
		} else {
			this.message = "error";
		}
		return SUCCESS;
	}

	public String Userid() {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		return (String) session.getAttribute("user_id");
	}
}
