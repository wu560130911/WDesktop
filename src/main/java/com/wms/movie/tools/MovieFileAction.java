package com.wms.movie.tools;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.wms.movie.model.Movie;
import com.wms.movie.model.MoviePlaylist;
import com.wms.movie.model.User;
import com.wms.movie.service.MoviePlaylistService;

/**
 * @author WMS
 * @version 4.2 Servlet implementation class MovieFileAction
 */
@WebServlet(description = "获取电影文件", urlPatterns = { "/movie.wms" })
public class MovieFileAction extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private Movie movie = new Movie();
	private String userId;
	@Autowired
	private MoviePlaylistService movieplayservice;
	private String filepath;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public MovieFileAction() {
		super();
	}

	/**
	 * @return the movie
	 */
	public Movie getMovie() {
		return movie;
	}

	/**
	 * @param movie
	 *            the movie to set
	 */
	public void setMovie(Movie movie) {
		this.movie = movie;
	}

	/**
	 * @return the userId
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * @param userId
	 *            the userId to set
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

	/**
	 * @param movieplayservice
	 *            the movieplayservice to set
	 */
	public void setMovieplayservice(MoviePlaylistService movieplayservice) {
		this.movieplayservice = movieplayservice;
	}

	/**
	 * @return the filepath
	 */
	public String getFilepath() {
		return filepath;
	}

	/**
	 * @param filepath the filepath to set
	 */
	public void setFilepath(String filepath) {
		this.filepath = filepath;
	}

	/* (non-Javadoc)
	 * @see javax.servlet.GenericServlet#init()
	 */
	@Override
	public void init() throws ServletException {
		super.init();
		ServletContext servletContext = this.getServletContext();
		WebApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(servletContext);
		this.movieplayservice = (MoviePlaylistService) ctx.getBean("MoviePlaylistService");
	}
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * javax.servlet.http.HttpServlet#service(javax.servlet.http.HttpServletRequest
	 * , javax.servlet.http.HttpServletResponse)
	 */
	@Override
	protected void service(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.userId = (String) request.getSession().getAttribute("user_id");
		try {
			this.movie.setId(Long.valueOf(request.getParameter("movie.id")));
			this.movie.setFilename(request.getParameter("movie.name"));
		} catch (NumberFormatException e) {
			response.sendRedirect(".");
			return;
		}
		if (this.userId == null || "".equalsIgnoreCase(userId)
				|| this.movie.getFilename() == null
				|| "".equalsIgnoreCase(this.movie.getFilename())) {
			response.sendRedirect(".");
			return;
		}
		MoviePlaylist play = new MoviePlaylist();
		play.setMovie(movie);
		play.setUser(new User(userId));
		this.movieplayservice.save(play);
		String servletPath = request.getServletPath();
		this.filepath = request.getSession().getServletContext()
				.getRealPath(servletPath).split("movie.wms")[0];
		this.filepath+="Movie/"+this.movie.getFilename();
		File file = new File(this.filepath+".mp4");
		if(!file.isFile()){
			file = new File(this.filepath+".webm");
			if(!file.isFile()){
				response.sendRedirect(".");
				return;
			}else{
				this.filepath+=".webm";
			}
		}else{
			this.filepath+=".mp4";
		}
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		 String range = request.getHeader("range"); 
		  String browser = request.getHeader("User-Agent"); 
		  System.out.println(browser);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
	}

}
