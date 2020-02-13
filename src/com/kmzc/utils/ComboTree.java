package com.kmzc.utils;

import java.util.List;
import java.util.Map;
/**
 * 
 * @author baixg
 * @date 2017-09-11
 * 树形下拉类
 */
public class ComboTree {
	private String id;  
    private String text; 
    private String iconCls;
    private String state;
    private Map<String,String> attributes;
    private List<ComboTree> children;

    public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public void setText(String text) {
		this.text = text;
	}
	public Map<String, String> getAttributes() {
		return attributes;
	}
	public void setAttributes(Map<String, String> attributes) {
		this.attributes = attributes;
	}
	public List<ComboTree> getChildren() {
		return children;
	}
	public void setChildren(List<ComboTree> children) {
		this.children = children;
	}  
    
    
}
