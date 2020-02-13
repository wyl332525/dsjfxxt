package com.kmzc.controller.system;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kmzc.cache.YhJsCdCache;
import com.kmzc.security.user.ZcUserDetails;

import net.sf.json.JSONArray;

@Controller
@RequestMapping("/menu")
public class MenuInfoController {
	@RequestMapping("/getCd")
	public void getUserCd(HttpSession session,HttpServletResponse response){
		List<Map<String,String>> cds=YhJsCdCache.getCdObjectByYh(ZcUserDetails.getCurrentUserId());
		List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
		for(Map<String, String> m:cds){
			Map<String,Object> c=new HashMap<String, Object>();
			for(Map.Entry<String, String> e:m.entrySet()){
				c.put(e.getKey(), e.getValue());
			}
			list.add(c);
		}
		session.setAttribute("cd", list);
        JSONArray cdInfo=JSONArray.fromObject(dealCd(list));
//        JSONArray cdInfo=JSONArray.fromObject(cds);
        PrintWriter out=null;   
		try {
			response.setContentType("application/json;charset=UTF-8");
			out=response.getWriter();
//			System.out.println(cdInfo.toString());
			out.print(cdInfo.toString());
		}catch (Exception e){
			System.out.println(e.getMessage());;
		}finally {
			try {
				out.close();
			} catch (Exception e) {
				System.out.println(e.getMessage());;
			}
		}
	}
	//处理格式化菜单
	private List<Map<String,Object>> dealCd(List<Map<String,Object>> cds){
		List<Map<String,Object>> topCdList=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> midCdList=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> cdxCdList=new ArrayList<Map<String,Object>>();
		Map<String,Map<String,Object>> temp=new HashMap<String,Map<String,Object>>();
		for(Map<String,Object> m:cds){
			if("TOP".equalsIgnoreCase((String)m.get("fjcd"))){//顶层菜单
				topCdList.add(m);
			}else if("1".equals(m.get("sfcdx"))){//叶子节点(菜单项)
				cdxCdList.add(m);
			}else{//中间一级菜单
				midCdList.add(m);
			}
		}
		for(Map<String,Object> m:cdxCdList){//处理菜单项
			Object fjcd=m.get("fjcd");
			boolean exist=false;
			for(Map<String,Object> m1:midCdList){//先看菜单项是否属于中间一级菜单
				if(fjcd.equals(m1.get("pkid"))){
					if(m1.containsKey("children")){
						((List<Map<String,Object>>)m1.get("children")).add(m);
					}else{
						List<Map<String,Object>> tm=new ArrayList<Map<String,Object>>();
						tm.add(m);
						m1.put("children", tm);
					}
					exist=true;
					break;
				}
			}
			if(!exist){//再看菜单项是否属于顶级菜单
				for(Map<String,Object> m1:topCdList){
					if(fjcd.equals(m1.get("pkid"))){
						if(m1.containsKey("children1")){
							((List<Map<String,Object>>)m1.get("children1")).add(m);
						}else{
							List<Map<String,Object>> tm=new ArrayList<Map<String,Object>>();
							tm.add(m);
							m1.put("children1", tm);
						}
						break;
					}
				}
			}
		}
		
		for(Map<String,Object> m:midCdList){//处理中间一级菜单，看中间一级菜单项，是属于哪个顶级菜单的。
			Object fjcd=m.get("fjcd");
			for(Map<String,Object> m1:topCdList){
				if(fjcd.equals(m1.get("pkid"))){
					if(m1.containsKey("children2")){
						((List<Map<String,Object>>)m1.get("children2")).add(m);
					}else{
						List<Map<String,Object>> tm=new ArrayList<Map<String,Object>>();
						tm.add(m);
						m1.put("children2", tm);
					}
					break;
				}
			}
		}
		
		return topCdList;
	}
}
