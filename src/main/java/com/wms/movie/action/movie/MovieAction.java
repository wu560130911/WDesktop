/**
 * 
 */
package com.wms.movie.action.movie;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.wms.movie.model.Movie;
import com.wms.movie.model.User;
import com.wms.movie.service.MovieService;
import com.wms.movie.service.UserService;

/**
 * @author WMS
 * @version 4.2
 * 
 *          处理电影的相关请求,包含上传电影、电影列表（分页）、删除电影
 * 
 */
@SuppressWarnings("serial")
@Controller(value = "MovieAction")
@Scope("prototype")
public class MovieAction extends ActionSupport {

	@Autowired
	private MovieService movieservice;

	@Autowired
	private UserService userservice;

	private Movie movie;

	private String message;

	private List<Movie> movies;

	private int page;

	private int limit;

	private int start;

	private int total;

	private String search_value;

	private String search_type;

	private boolean search_scope;

	private static Logger log = Logger.getLogger(MovieAction.class);

	@JSON(serialize = false)
	public MovieService getMovieservice() {
		return movieservice;
	}

	public void setMovieservice(MovieService movieservice) {
		this.movieservice = movieservice;
	}

	public UserService getUserservice() {
		return userservice;
	}

	public void setUserservice(UserService userservice) {
		this.userservice = userservice;
	}

	public Movie getMovie() {
		return movie;
	}

	public void setMovie(Movie movie) {
		this.movie = movie;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<Movie> getMovies() {
		return movies;
	}

	public void setMovies(List<Movie> movies) {
		this.movies = movies;
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

	public String getSearch_value() {
		return search_value;
	}

	public void setSearch_value(String search_value) {
		this.search_value = search_value;
	}

	public String getSearch_type() {
		return search_type;
	}

	public void setSearch_type(String search_type) {
		this.search_type = search_type;
	}

	public boolean isSearch_scope() {
		return search_scope;
	}

	public void setSearch_scope(boolean search_scope) {
		this.search_scope = search_scope;
	}

	public static Logger getLog() {
		return log;
	}

	public static void setLog(Logger log) {
		MovieAction.log = log;
	}

	/**
	 * 处理客户端的增加请求
	 * 
	 * @return SUCCESS
	 */
	public String add() {

		User user = this.userservice.findUser(movie.getUser().getId());

		if (user == null) {
			this.message = "请先登入";
		} else {
			this.movie.setUser(user);
			this.movie.setTime(new Date());
			this.movieservice.saveMovie(movie);
			this.message = "success";
			log.info("上传一个电影成功！电影名称是:" + this.movie.getTitle());
		}

		return SUCCESS;
	}

	/**
	 * 处理客户端的电影列表请求，请求中包含分页、当前记录数等信息， 如果包含搜索信息，则调用相应的搜索函数并进行分页
	 * 
	 * @return SUCCESS
	 */
	public String list() {

		if (page < 0 || limit < 0) {
			return SUCCESS;
		}
		try {
			Page<Movie> music = null;

			if (this.search_type == null || "".equals(this.search_type)
					|| this.search_value == null || "".equals(search_value)) {

				music = this.movieservice.findAll(new PageRequest(page - 1,
						limit));

				this.movies = music.getContent();

				// total = (int) this.movieservice.count();
			} else {

				music = this.movieservice.findByLike(search_value,
						new PageRequest(page - 1, limit), search_type,
						search_scope);

				this.movies = music.getContent();

				// total = (int) this.movieservice.countByLike(search_value,
				// new PageRequest(page - 1, limit), search_type,
				// search_scope);
			}
			this.total = (int) music.getTotalElements();
			log.info("查找影片内容！第" + page + "页，共" + total + "条记录.");

		} catch (IllegalArgumentException e) {

			log.error(e.getStackTrace());

		}

		return SUCCESS;
	}

}
