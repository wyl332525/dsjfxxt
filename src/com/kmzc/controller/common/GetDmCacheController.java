package com.kmzc.controller.common;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kmzc.cache.CodeCache;
import com.kmzc.cache.StaticVar;
import com.kmzc.utils.ComboTree;

import net.sf.json.JSONArray;

@Controller
@RequestMapping("/dm")
@Scope("prototype")
public class GetDmCacheController {
	
	@RequestMapping("/cacheData")
	public void cacheData(HttpServletResponse response,HttpServletRequest request){
		String tn = request.getParameter("tn");
		String valueField = request.getParameter("valueField");
		String textField = request.getParameter("textField");
		String isFirst = request.getParameter("isFirst");
		String defaultFirst = request.getParameter("defaultFirst");
		String params = request.getParameter("params");
		StringBuffer sb=new StringBuffer();
		sb.append("[");
		if(tn!=null && !"".equals(tn)){
			tn=tn.toLowerCase();
			if(valueField==null || "".equals(valueField)){
				valueField="pkid";
			}else{
				valueField=valueField.toLowerCase();
			}
			if(textField==null || "".equals(textField)){
				textField="jc";
			}else{
				textField=textField.toLowerCase();
			}
			List<Map<String,Object>> lists=null;
			if(params!=null && !"".equals(params)){
				SqlSession sqlSession = StaticVar.sqlSessionFactory.openSession();
				Map m = new HashMap();
				m.put(params, params);
				lists = sqlSession.selectList("com.kmzc.dao.xt.CacheMapper."+tn,params);
			}else{
				lists=CodeCache.getCode(tn,true);
			}
			
			if(lists!=null){
				boolean isOne=true;
				if("1".equals(isFirst)){
					isOne=false;
					if(defaultFirst==null || "".equals(defaultFirst)){defaultFirst="**请选择**";}
					sb.append("{\"").append(valueField).append("\":\"\",\"")
						.append(textField).append("\":\"").append(defaultFirst).append("\"}");
				}
				for(Map<String,Object> m:lists){
					if(isOne){
						isOne=false;
					}else{
						sb.append(",");
					}
					sb.append("{\"").append(valueField).append("\":\"").append(m.get(valueField)).append("\",\"")
					.append(textField).append("\":\"").append(m.get(textField)).append("\"}");
				}
				sb.append("]");
			}else{
				sb.append("{\"").append(valueField).append("\":\"\",\"")
					.append(textField).append("\":\"*没有查询到数据*\"}").append("]");
			}
		}else{
			sb.append("{\"").append(valueField).append("\":\"\",\"")
				.append(textField).append("\":\"*传入的表名为空*\"}").append("]");
		}
		response.setContentType("text/html;charset=UTF-8");
		try {
			response.getWriter().print(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	@RequestMapping("/cacheComboTree")
	public void cacheComboTree(HttpServletResponse response,HttpServletRequest request){
		String ret = "";
		String tn = request.getParameter("tn");
		String valueField = request.getParameter("valueField");
		String textField = request.getParameter("textField");
		String isFirst = request.getParameter("isFirst");
		String defaultFirst = request.getParameter("defaultFirst");
		String args = request.getParameter("params");
		//拼接返回的json串
		StringBuffer sb = new StringBuffer();
		//sb.append("[");
		if(tn != null && !"".equals(tn)){
			tn=tn.toLowerCase();
			if(valueField == null || "".equals(valueField)){
				valueField = "pkid";
			}else{
				valueField = valueField.toLowerCase();
			}
			if(textField == null || "".equals(textField)){
				textField = "jc";
			}else{
				textField = textField.toLowerCase();
			}
			List<Map<String,Object>> lists = null;
			List<Map<String,Object>> fatherlists = new ArrayList<Map<String,Object>>();
			List<Map<String,Object>> childlists = new ArrayList<Map<String,Object>>();
			if(args != null && !"".equals(args)){
				SqlSession sqlSession = StaticVar.sqlSessionFactory.openSession();
				Map<String,Object> m = new HashMap<String, Object>();
				m.put(args, args);
				m.put("_parameter", tn);
				lists = sqlSession.selectList("com.kmzc.dao.xt.CacheMapper.getCodeCache",m);
			}else{
				lists = CodeCache.getCode(tn,true);
			}
			if(lists!=null){
				for(Map<String,Object> m:lists){
					String fj = (String)m.get("fj");
					if("0".equals(fj)){
						fatherlists.add(m);
					}
					else{
						childlists.add(m);
					}
				}
			}
			List<ComboTree> retList = new ArrayList<ComboTree>();
			if(fatherlists.size() > 0){
				for(Map<String,Object> m:fatherlists){
					//先取到父级菜单
					ComboTree ct = new ComboTree();
					String pkid = (String)m.get("pkid");
					String jc = (String)m.get("jc");
					ct.setId(pkid);
					ct.setText(jc);
					ct.setState("closed");
					List<ComboTree> childList = new ArrayList<ComboTree>();
					for(Map<String,Object> childmap : childlists){
						if(pkid.equals((String)childmap.get("fj"))){
							ComboTree ct2 = new ComboTree();
							String pkid2 = (String)childmap.get("pkid");
							String jc2 = (String)childmap.get("jc");
							ct2.setId(pkid2);
							ct2.setText(jc2);
							childList.add(ct2);
						}
					}
					ct.setChildren(childList);
					retList.add(ct);
				}
				JSONArray retJson = JSONArray.fromObject(retList);
				sb.append(retJson.toString());
				ret = sb.toString();
				ret = ret.replaceAll(",\"children\":\\[\\]", "");
			}else{
				sb.append("{\"").append(valueField).append("\":\"\",\"")
					.append(textField).append("\":\"*没有查询到数据*\"}").append("]");
			}
		}else{
			sb.append("{\"").append(valueField).append("\":\"\",\"")
				.append(textField).append("\":\"*传入的表名为空*\"}").append("]");
		}
		response.setContentType("text/html;charset=UTF-8");
		try {
			//ret = "[{\"jc\":\"面包车\",\"children\":[{\"jc\":\"小型面包车\",\"children\":[],\"pkid\":\"A11\"}]}]";
			response.getWriter().print(ret);
		} catch (IOException e) {
			e.printStackTrace();
		}
	} 
}
