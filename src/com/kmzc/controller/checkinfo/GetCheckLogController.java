package com.kmzc.controller.checkinfo;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kmzc.cache.SysConfigCache;


@Controller
@RequestMapping("/checkinfo")
@Scope(value="prototype")
@Transactional
public class GetCheckLogController {
	private static Logger log = Logger.getLogger(GetCheckLogController.class);
	@Autowired
	private SqlSession sqlSession;
	
	@RequestMapping("/getCheckData")
	public void  getCheckData(HttpServletRequest request,HttpServletResponse response,HttpSession session){
			String fields=request.getParameter("fields");//显示的曲线标题
			String pkid=request.getParameter("pkid");//车辆主键 即过程数据的文件名称
			log.error("进来读取过程数据1！");
			//首先获取到过程数据根目录
			String saveRoot = SysConfigCache.getSysConfig1("gcsj_save_root");
			//根据PKID获取检测时间、检测站、检测线
			//String checkInfoSql = SqlCache.getSql("jxh", "getcheckPathInfo");
			Map<String, Object> queryMap = new HashMap<String, Object>();
			queryMap.put("pkid", pkid);
			//List<Map<String,Object>> list = SqlOperatUtils.selectDatas(checkInfoSql,pkid);
			List<Map<String,Object>> list = sqlSession.selectList("com.kmzc.dao.dsj.jxh.getcheckPathInfo",queryMap);
			log.error("list="+list);
			Map<String,Object> mlist = list.get(0);
			log.error("mlist="+mlist);
			String jcrq = (String)mlist.get("CHECKTIME");
			String[] arr1 = jcrq.split("-");
			String jcz = (String)mlist.get("STATIONPKID");
			String jcx = (String)mlist.get("CHECKLINEPKID");
			String filePath = saveRoot+"/"+arr1[0]+"/"+arr1[1]+"/"+arr1[2]+"/"+jcz+"/"+jcx+"/"+pkid+".csv";
			StringBuffer retJson = new StringBuffer();
			File f = new File(filePath);
			log.error("过程数据的文件路径："+f);
			if(!f.exists()){
				retJson.append("{\"result\":0}");
			}else{
				BufferedReader br = null;
				ArrayList<String> checkLogs = new ArrayList<String>();
				try{
					br = new BufferedReader(new FileReader(f));
					//String head1 = br.readLine();//第一行 标题
					String head = br.readLine();
					String line = br.readLine();
					while(line != null){
						if(!"".equals(line)){
							checkLogs.add(line);
						}
						line = br.readLine();
					}
					
					//把过程数据csv文件里面的信息转化成list对象，每一条信息封装成一个map对象
					List<Map<String,Object>> map = toMap(head, checkLogs);
					//拼装数据格式
					String cols[] = fields.split(";;");//要查询的列名
					String arr[] = new String[cols.length];
					retJson.append("{\"result\":\"").append(map.size()).append("\",");
					for(Map<String,Object> m:map){
						for(int i=0; i<=cols.length-1; i++){
							String bs[] = cols[i].split(":");
							if(m.get(bs[0].toLowerCase()) != null){
								double num = Double.valueOf((String) m.get(bs[0].toLowerCase()));
								double bs1 = Double.valueOf(bs[1]);
								arr[i] += ","+num*bs1;
							}
						}
					}
					for(int j=0; j<=cols.length-1; j++){
						if(j==cols.length-1){
							retJson.append("\"").append(cols[j].split(":")[0]).append("\":[").append(arr[j].substring(5)).append("]}");
						}else{
							retJson.append("\"").append(cols[j].split(":")[0]).append("\":[").append(arr[j].substring(5)).append("],");
						}
					}
				}catch (Exception e) {
					e.printStackTrace();
				}finally{
					try{
						if(br != null){
							br.close();
						}
					}catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		response.setContentType("html/text;charset=UTF-8");

		try {
			response.getWriter().print(retJson.toString());
		} catch (IOException e) {
			log.error(e.getMessage(),e);
		}
	}
	
	/**
	 * @param request
	 * @param response
	 * 返回值：{"total":240,"rows":
	 * [{"fr":"任溶溶","lxrdh":"22222222","lxr":"万维网"},
	 * {"fr":"null","lxrdh":"13600326756","lxr":"赵文波"},
	 * {"fr":"null","lxrdh":"26606199","lxr":"张才海"}
	 * ]}
	 */
	@RequestMapping("/getCheckDataList")
	public void  getCheckDataList(HttpServletRequest request,HttpServletResponse response,HttpSession session){/*
			String jcbgPkid=request.getParameter("jcbgPkid");//检测报告主键 即过程数据的文件名称

			//首先获取到过程数据根目录
			String saveRoot = SysConfigCache.getSysConfig1("gcsj_save_root");
			//根据PKID获取检测时间、检测站、检测线
			String checkInfoSql = SqlCache.getSql("jxh", "getPathInfo");
			List<Map<String,Object>> list = SqlOperatUtils.selectDatas(checkInfoSql,jcbgPkid);
			Map<String,Object> mlist = list.get(0);
			String jcrq = (String)mlist.get("jcsj");
			String[] arr1 = jcrq.split("-");
			String jcz = (String)mlist.get("jcz");
			String jcx = (String)mlist.get("jcx");
			String filePath = saveRoot+"/"+arr1[0]+"/"+arr1[1]+"/"+arr1[2]+"/"+jcz+"/"+jcx+"/"+jcbgPkid+".csv";
			StringBuffer retJson = new StringBuffer();
			
			File f = new File(filePath);
			if(!f.exists()){
				retJson.append("{\"total\":0,\"rows\":[]}");
			}else{
				BufferedReader br = null;
				ArrayList<String> checkLogs = new ArrayList<String>();
				try{
					br = new BufferedReader(new FileReader(f));
					String head1 = br.readLine();//第一行 标题
					String head = br.readLine();
					String line = br.readLine();
					while(line != null){
						if(!"".equals(line)){
							checkLogs.add(line);
						}
						line = br.readLine();
					}
					
					//把过程数据csv文件里面的信息转化成list对象，每一条信息封装成一个map对象
					List<Map<String,Object>> map = toMap(head, checkLogs);
					
					//拼装数据格式
					retJson.append("{\"total\":\"").append(map.size()).append("\",\"rows\":[");
					for(Map<String,Object> m:map){
						retJson.append("{");
						for(String key:m.keySet()){
							retJson.append("\"").append(key.toLowerCase()).append("\":\"").append(m.get(key)).append("\",");
						}
						retJson.deleteCharAt(retJson.length()-1).append("},");
					}
					retJson.deleteCharAt(retJson.length()-1).append("]}");

				}catch (Exception e) {
					e.printStackTrace();
				}finally{
					try{
						if(br != null){
							br.close();
						}
					}catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		response.setContentType("html/text;charset=UTF-8");

		try {
			response.getWriter().print(retJson.toString());
		} catch (IOException e) {
			log.error(e.getMessage(),e);
		}
	*/}
	
	/**
	 * 把过程数据csv文件里面的信息转化成list对象，每一条信息封装成一个map对象
	 * @param head 标题 列头
	 * @param checkLogs 过程数据
	 * @return
	 */
	private List<Map<String,Object>> toMap(String head, ArrayList<String> checkLogs){
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		String[] keys = head.split(",");
		for(String str : checkLogs){
			String[] vals = str.split(",");
			Map<String,Object> map = new HashMap<String, Object>();

			for(int i=0; i<vals.length; i++){
				map.put(keys[i].toLowerCase(), vals[i]);
			}
			list.add(map);
		}
		return list;
	}
}

