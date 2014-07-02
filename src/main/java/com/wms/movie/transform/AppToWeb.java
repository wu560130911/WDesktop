/**
 * 
 */
package com.wms.movie.transform;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.struts2.json.annotations.JSON;

import com.wms.movie.model.Application;
import com.wms.movie.model.Application.ApplicationType;

/**
 * @author WMS
 * 
 */
@SuppressWarnings("serial")
public class AppToWeb implements Serializable {

	private int id;

	private String name;

	private String iconCls;

	private String module;

	private String version;

	private String tip;

	private Date addDate;

	private ApplicationType typeGroup;

	public AppToWeb() {
	}

	public AppToWeb(Application app) {
		this.addDate = app.getAddDate();
		this.iconCls = app.getIconCls();
		this.id = app.getId();
		this.module = app.getModule();
		this.name = app.getName();
		this.tip = app.getTip();
		this.typeGroup = app.getTypeGroup();
		this.version = app.getVersion();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getTip() {
		return tip;
	}

	public void setTip(String tip) {
		this.tip = tip;
	}

	@JSON(format = "yyyy-MM-dd HH:mm:ss")
	public Date getAddDate() {
		return addDate;
	}

	public void setAddDate(Date addDate) {
		this.addDate = addDate;
	}

	public ApplicationType getTypeGroup() {
		return typeGroup;
	}

	public void setTypeGroup(ApplicationType typeGroup) {
		this.typeGroup = typeGroup;
	}

	@Override
	public String toString() {

		StringBuilder sb = new StringBuilder();
		sb.append("Application to AppToWeb:@+id:" + this.id + ",name:"
				+ this.name);
		return sb.toString();
	}

	public static List<AppToWeb> change(List<Application> lps) {
		List<AppToWeb> apps = new ArrayList<AppToWeb>();

		for (Application app : lps) {
			if (app == null) {
				continue;
			}
			AppToWeb atw = new AppToWeb(app);
			apps.add(atw);
		}
		return apps;
	}
}
