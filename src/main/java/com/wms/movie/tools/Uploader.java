package com.wms.movie.tools;

import java.io.*;
import java.util.*;
import org.apache.commons.fileupload.*;
import org.apache.commons.fileupload.FileUploadBase.InvalidContentTypeException;
import org.apache.commons.fileupload.FileUploadBase.SizeLimitExceededException;
import org.apache.commons.fileupload.util.*;
import org.apache.commons.fileupload.servlet.*;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;

import javax.servlet.http.HttpServletRequest;

/**
 * @author WMS
 * @version 3.3
 */
public class Uploader {
	// 输出文件地址
	private String url = "";
	private String fileName = "";
	private String state = "";
	// 文件类型
	private String type = "";
	private String originalName = "";
	// 文件大小
	private String size = "";

	private HttpServletRequest request = null;

	private String title = "";

	// 保存路径
	private String savePath;
	// 文件允许格式
	private String[] allowFiles = { ".rar", ".doc", ".docx", ".zip", ".pdf",
			".txt", ".swf", ".wmv", ".gif", ".png", ".jpg", ".jpeg", ".bmp",
			".mp4", ".mp3" };
	// 文件大小限制，单位KB
	private int maxSize = 10000;

	private HashMap<String, String> errorInfo = new HashMap<String, String>();

	/**
	 * 
	 * @param request
	 */
	public Uploader(HttpServletRequest request) {
		this.request = request;
		HashMap<String, String> tmp = this.errorInfo;
		tmp.put("SUCCESS", "SUCCESS"); // 默认成功
		tmp.put("NOFILE", "未包含文件上传域");
		tmp.put("TYPE", "不允许的文件格式");
		tmp.put("SIZE", "文件大小超出限制");
		tmp.put("ENTYPE", "请求类型ENTYPE错误");
		tmp.put("REQUEST", "上传请求异常");
		tmp.put("IO", "IO异常");
		tmp.put("DIR", "目录创建失败");
		tmp.put("UNKNOWN", "未知错误");
		tmp.put("Exist", "文件已经存在");
		tmp.put("FALSE", "本系统处于测试阶段，不允许上传");

	}

	/**
	 * 
	 * @throws Exception
	 */
	public void upload() throws Exception {
		
		boolean isMultipart = ServletFileUpload
				.isMultipartContent(this.request);
		if (!isMultipart) {
			this.state = this.errorInfo.get("NOFILE");
			return;
		}
		DiskFileItemFactory dff = new DiskFileItemFactory();

		dff.setRepository(new File(savePath));
		try {
			ServletFileUpload sfu = new ServletFileUpload(dff);
			sfu.setSizeMax(this.maxSize * 1024);
			sfu.setHeaderEncoding("utf-8");
			FileItemIterator fii = sfu.getItemIterator(this.request);

			while (fii.hasNext()) {
				FileItemStream fis = fii.next();

				if (!fis.isFormField()) {

					this.originalName = fis.getName().substring(
							fis.getName().lastIndexOf(
									System.getProperty("file.separator")) + 1);
					if (!this.checkFileType(this.originalName)) {
						this.state = this.errorInfo.get("TYPE");
						continue;
					}
					this.type = this.getFileExt(this.originalName);
					if (this.request.getParameter("musictitle") != null) {
						this.fileName = this.request.getParameter("musictitle")
								+ this.type;
					} else {
						this.fileName = this.request.getParameter("movietitle")
								+ this.type;
					}

					System.out.println(this.fileName);

					File dir = new File(this.getPhysicalPath(this.url
							+ this.savePath));

					if (!dir.exists()) {
						dir.mkdir();
					}

					this.url = savePath + "/" + this.fileName;

					BufferedInputStream in = new BufferedInputStream(
							fis.openStream());
					File file = new File(this.getPhysicalPath(this.url));
					if (file.exists()) {
						this.state = this.errorInfo.get("Exist");
						break;
					}

					FileOutputStream out = new FileOutputStream(file);

					// System.out.println(this.getPhysicalPath(this.url));

					BufferedOutputStream output = new BufferedOutputStream(out);
					Streams.copy(in, output, true);

					this.state = this.errorInfo.get("SUCCESS");
					this.url = this.getPhysicalPath(this.url);
				} else {
					String fname = fis.getFieldName();
					if (!fname.equals("pictitle")) {
						continue;
					}
					BufferedInputStream in = new BufferedInputStream(
							fis.openStream());
					BufferedReader reader = new BufferedReader(
							new InputStreamReader(in));
					StringBuffer result = new StringBuffer();
					while (reader.ready()) {
						result.append((char) reader.read());
					}
					this.title = new String(result.toString().getBytes(),
							"utf-8");
					reader.close();

				}
			}
		} catch (SizeLimitExceededException e) {
			this.state = this.errorInfo.get("SIZE");
		} catch (InvalidContentTypeException e) {
			this.state = this.errorInfo.get("ENTYPE");
		} catch (FileUploadException e) {
			this.state = this.errorInfo.get("REQUEST");
		} catch (Exception e) {
			e.printStackTrace();
			this.state = this.errorInfo.get("UNKNOWN");
		}
	}

	/**
	 * 文件类型判断
	 * 
	 * @param fileName
	 * @return true or false
	 */
	private boolean checkFileType(String fileName) {
		Iterator<String> type = Arrays.asList(this.allowFiles).iterator();
		while (type.hasNext()) {
			String ext = type.next();
			if (fileName.toLowerCase().endsWith(ext)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 
	 * @return string
	 */
	private String getFileExt(String fileName) {
		return fileName.substring(fileName.lastIndexOf("."));
	}

	/**
	 * 
	 * @param path
	 * @return PhysicalPath
	 */
	private String getPhysicalPath(String path) {

		String servletPath = this.request.getServletPath();
		String realPath = this.request.getSession().getServletContext()
				.getRealPath(servletPath);

		realPath = realPath.split("editor")[0];

		return new File(realPath).getParent() + request.getContextPath() + "/"
				+ path;
	}

	public void setSavePath(String savePath) {
		this.savePath = savePath;
	}

	public void setAllowFiles(String[] allowFiles) {
		this.allowFiles = allowFiles;
	}

	public void setMaxSize(int size) {
		this.maxSize = size;
	}

	public String getSize() {
		return size;
	}

	public String getUrl() {
		return url;
	}

	public String getFileName() {
		return fileName;
	}

	public String getState() {
		return state;
	}

	public String getTitle() {
		return title;
	}

	public String getType() {
		return type;
	}

	public String getOriginalName() {
		return originalName;
	}

}
