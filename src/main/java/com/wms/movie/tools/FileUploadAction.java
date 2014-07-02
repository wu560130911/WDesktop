package com.wms.movie.tools;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author WMS
 * @version 1.3
 * 
 */
@SuppressWarnings("serial")
public class FileUploadAction extends HttpServlet {

	private String[] fileType;
	private int maxSize;

	/**
	 * 获得文件类型
	 * @return fileType
	 */
	public String[] getFileType() {
		return fileType;
	}

	/**
	 * 设置文件类型
	 * @param fileType
	 */
	public void setFileType(String[] fileType) {
		this.fileType = fileType;
	}


	public int getMaxSize() {
		return maxSize;
	}

	/**
	 * @param maxSize
	 */
	public void setMaxSize(int maxSize) {
		this.maxSize = maxSize;
	}

	public FileUploadAction() {
		super();
	}

	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
	}

	/**
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException, IOException
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html");
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		Uploader up = new Uploader(request);
		if(request.getParameter("musictitle")!=null){
			up.setSavePath("Music"); // 保存路径
		}else{
			up.setSavePath("Movie"); // 保存路径
		}
		
		up.setAllowFiles(fileType);
		up.setMaxSize(this.maxSize); // 允许的文件最大尺寸，单位KB
		try {
			up.upload();
		} catch (Exception e) {
			e.printStackTrace();
		}

		File file = new File(up.getUrl());
		
		String result = "{";
		
		if(up.getState().equals("SUCCESS")){
			result+="'success':true,'size':"+file.length()/1024+",";
		}else{
			result+="'success':false,";
		}
		result+="'state':'" + up.getState() + "'}";
		System.out.println(up.getState());
		out.println(result);
		out.flush();
		out.close();
	}

	/**
	 */
	public void init() throws ServletException {

		this.fileType = getInitParameter("fileType").split(",");
		this.maxSize = Integer.valueOf(getInitParameter("MaxSize"));

	}

}
