///**
// * 
// */
//package com.wms.movie.test.service;
//
//import java.util.Date;
//
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//
//import com.wms.movie.model.Music;
//import com.wms.movie.model.User;
//import com.wms.movie.service.MusicService;
//
///**
// * @author WMS
// * 
// */
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
//public class MusicServiceTest {
//
//	@Autowired
//	private MusicService musicservice;
//
//	/**
//	 * @return the musicservice
//	 */
//	public MusicService getMusicservice() {
//		return musicservice;
//	}
//
//	/**
//	 * @param musicservice
//	 *            the musicservice to set
//	 */
//	public void setMusicservice(MusicService musicservice) {
//		this.musicservice = musicservice;
//	}
//
//	@Test
//	public void save() {
//		Music music = new Music();
//		music.setDescription("测试代码");
//		music.setDuration(100);
//		music.setSinger("Test");
//		music.setSize(1000);
//		music.setTime(new Date());
//		music.setTitle("Test");
//		music.setType("Test");
//		music.setUser(new User("test"));
//		this.musicservice.saveMusic(music);
//	}
//	
//	@Test
//	public void update(){
//		Page<Music> pages = this.musicservice.findByUser(new User("test"), new PageRequest(0, 20));
//		if(pages.getTotalElements()==0){
//			this.save();
//		}
//		pages = this.musicservice.findByUser(new User("test"), new PageRequest(0, 20));
//		Music music = pages.getContent().get(0);
//		music.setTime(new Date());
//		this.musicservice.updateMusic(music);
//	}
//	
//	@Test
//	public void delete(){
//		Page<Music> pages = this.musicservice.findByUser(new User("test"), new PageRequest(0, 20));
//		if(pages.getTotalElements()==0){
//			this.save();
//		}
//		pages = this.musicservice.findByUser(new User("test"), new PageRequest(0, 20));
//		Music music = pages.getContent().get(0);
//		this.musicservice.deleteMusic(music);
//	}
//	
//	@Test
//	public void findByYear(){
//		Page<Music> pages = this.musicservice.findByYear(2002, new PageRequest(0, 20));
//		if(pages.getTotalElements()!=0){
//			System.out.println("SUCCESS");
//		}
//	}
//}
