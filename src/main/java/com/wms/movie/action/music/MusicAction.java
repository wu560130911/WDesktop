/**
 * 
 */
package com.wms.movie.action.music;

import java.util.Date;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import com.opensymphony.xwork2.ActionSupport;
import com.wms.movie.model.Music;
import com.wms.movie.model.User;
import com.wms.movie.service.MusicService;
import com.wms.movie.service.UserService;

/**
 * @author WMS
 * @version 1.5
 * 处理音乐应用的控制类，包含音乐的上传、删除、修改、列表分页的处理
 */
@SuppressWarnings("serial")
@Controller(value = "MusicAction")
@Scope(value = "prototype")
public class MusicAction extends ActionSupport {

	@Autowired
	private MusicService musiceservice;
	
	@Autowired
	private UserService userservice;

	private Music music;

	private String message;
	
	private List<Music> musics;
	
	private int page;
	
	private int limit;
	
	private int start;
	
	private int total;
	
	private String search_value;
	
	private String search_type;
	
	private boolean search_scope;

	public MusicService getMusiceservice() {
		return musiceservice;
	}

	public void setMusiceservice(MusicService musiceservice) {
		this.musiceservice = musiceservice;
	}

	public UserService getUserservice() {
		return userservice;
	}

	public void setUserservice(UserService userservice) {
		this.userservice = userservice;
	}
	
	public Music getMusic() {
		return music;
	}

	public void setMusic(Music music) {
		this.music = music;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<Music> getMusics() {
		return musics;
	}

	public void setMusics(List<Music> musics) {
		this.musics = musics;
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

	/**
	 * 处理上传音乐的函数
	 * 
	 * @return SUCCESS
	 */
	public String add(){
		
		User user = this.userservice.findUser(this.music.getUser().getId());
		if(user==null){
			message = "账号不存在";
		}else{
			this.music.setUser(user);
			this.music.setTime(new Date());
			this.musiceservice.saveMusic(music);
			message = "success";
		}
		
		return SUCCESS;
	}
	
	
	/*public String title(){
		
		try{
			Page<Music> music = this.musiceservice.findAll(new PageRequest(page-1,limit));
			
			this.musics = music.getContent();
			
			total = (int) this.musiceservice.count();
			
		}catch (IllegalArgumentException e) {
			
		}
		return SUCCESS;
	}*/
	
	/**
	 * 处理音乐的列表，包含分页信息及其处理，
	 * 如果包含音乐的搜索选项，则调用相关的函数，对其处理并进行分页操作
	 * @return SUCCESS
	 */
	
	public String list(){
		
		try{
			
			Page<Music> music = null;
			
			if(search_type==null||search_value==null||"".equals(search_value)){
				
				music = this.musiceservice.findAll(new PageRequest(page-1,limit));
				
				this.musics = music.getContent();
				
				//total = (int) this.musiceservice.count();
				
			}else if(search_type.equals("year")){
				
				music = this.musiceservice.findByYear(Integer.valueOf(search_value), new PageRequest(page-1,limit));
				
				this.musics = music.getContent();
				
				//total = (int)this.musiceservice.countByYear(Integer.valueOf(search_value));
			}else{
				
				music = this.musiceservice.findByLike(search_value, new PageRequest(page-1,limit), search_type, search_scope);
				
				this.musics = music.getContent();
				
				//total = (int)this.musiceservice.countByLike(search_value, new PageRequest(page-1,limit), search_type, search_scope);
				
			}
			this.total = (int) music.getTotalElements();
			
		}catch (IllegalArgumentException e) {
			
		}
		return SUCCESS;
	}
}
