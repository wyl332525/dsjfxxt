package com.kmzc.controller.jsxx;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kmzc.cache.StaticVar;
import com.kmzc.service.common.OperateDataService;
import com.kmzc.service.jsxx.JsxxService;

@Controller
@RequestMapping("/jsxx")
@Scope("prototype")
@Transactional
public class JsxxDealController {
	@Autowired
	private OperateDataService optService;
	@Autowired
	JsxxService jsxxService;
	private static Logger log=Logger.getLogger(JsxxDealController.class);
	/**
	 * 
	 * @param request
	 * @param response
	 * @param session
	 * 功能描述:处理发送信息功能
	 * 
	 * @date 2017-1-16 下午4:49:40
	 */
	@RequestMapping("/send")
	public void sendJsxx(HttpServletRequest request,HttpServletResponse response,HttpSession session){
		String ret="ok";
		//得到发送到后台的信息
		String pkid=request.getParameter("id");
		String xxbt=request.getParameter("bt");
		String xxnr=request.getParameter("nr");
		String xxlb=request.getParameter("lb");
		String sfyfj=request.getParameter("fj");
		String fjInfo=request.getParameter("fjnr");
		String bz=request.getParameter("bz");
		String sfxyhf=request.getParameter("hf");
		String hfsm=request.getParameter("hfsm");
		String jszzh=request.getParameter("zh");
		String jszmc=request.getParameter("mc");
		String jszlx=request.getParameter("lx");
		String userId=(String) session.getAttribute("userId");
		String userName=(String) session.getAttribute("userName");
		
		try{
			//发送主表数据入库
			Map<String,Object> arg1 = new HashMap<String,Object>();
			arg1.put("pkid", pkid);
			arg1.put("xxbt", xxbt);
			arg1.put("xxnr", xxnr);
			arg1.put("sfyfj", sfyfj);
			arg1.put("xxlb", xxlb);
			arg1.put("bz", bz);
			arg1.put("sfxyhf", sfxyhf);
			arg1.put("hfsm", hfsm);
			arg1.put("jszzh", jszzh);
			arg1.put("jszmc", jszmc);
			arg1.put("jszlx", jszlx);
			arg1.put("fsrzh", userId);
			arg1.put("fsrmc", userName);
			String sql1 = "com.kmzc.dao.jsxx.JsxxDealMapper.insertZb";
			int c = optService.operateSql(sql1, arg1);
			if(c<=0){
				ret="操作数据库失败，信息发送失败！";
				log.error(ret);
			}else{
				//处理附件信息
				if("有".equals(sfyfj)){
					JSONArray fjArray=JSONArray.fromObject(fjInfo);
					List<Map<String,Object>> listObject=new ArrayList<Map<String,Object>>();
					String[] sql2 = new String[fjArray.size()];
					for(int i=0;i<fjArray.size();i++){
						JSONObject jb=fjArray.getJSONObject(i);
						Map<String,Object> arg2 = new HashMap<String,Object>();
						arg2.put("pkid", pkid+"_"+i);
						arg2.put("xxid", pkid);
						arg2.put("fjmc", jb.get("fileName"));
						arg2.put("fjlj", jb.get("savePath"));
						arg2.put("fjsxh", i+1);
						listObject.add(arg2);
						sql2[i]="com.kmzc.dao.jsxx.JsxxDealMapper.insertFjb";
					}
					optService.operateSqls(sql2, listObject);
				}
				//开始插入个人主数据接收表
				JSONObject jszObj=JSONObject.fromObject(jszzh);
				String zxd=jszObj.getString("zxd");
				String jcz=jszObj.getString("jcz");
				String queryUser="";
				Map<String,Object> arg3 = null;
				if("按人".equals(jszlx)){
					String allUser="";
					if(!"".equals(zxd) && null!=zxd){
						allUser=zxd;
					}
					if(!"".equals(jcz) && null!=jcz){
						if("".equals(allUser)){
							allUser=jcz;
						}else{
							allUser+=","+jcz;
						}
					}
					queryUser="com.kmzc.dao.jsxx.JsxxDealMapper.insertGrzbAr";
					arg3 = new HashMap<String,Object>();
					arg3.put("pkidList", "'"+allUser.replace(",", "','")+"'");
					//queryUser="select pkid as yhid,yhmc,yhlx,ssjg from xt_yh where pkid in('"+allUser.replace(",", "','")+"')";
					
				}else{//按组
					String jczJs=jszObj.getString("jczJs");
					queryUser="com.kmzc.dao.jsxx.JsxxDealMapper.insertGrzbAz";
					arg3 = new HashMap<String,Object>();
					arg3.put("zxd", zxd);
					if(zxd!=null && !"".equals(zxd)){//中心端的人查询
						arg3.put("zxdList", "'"+zxd.replace(",", "','")+"'");
						//queryUser="select yh.pkid as yhid,yh.yhmc,yh.yhlx,ssjg from xt_yh yh where yh.yhlx='2' and ssjg in('"+zxd.replace(",", "','")+"')";
					}
					arg3.put("jczJs", jczJs);
					arg3.put("jcz", jcz);
					if(jczJs!=null && jcz!=null && !"".equals(jczJs) && !"".equals(jcz)){
						arg3.put("queryUser", queryUser);
						arg3.put("jczList", "'"+jcz.replace(",", "','")+"'");
						arg3.put("jczJsList", "'"+jczJs.replace(",", "','")+"'");
//						if(!"".equals(queryUser)){
//							queryUser+=" UNION ALL ";
//						}
//						//检测站端的人查询
//						queryUser+="select yh.pkid as yhid,yh.yhmc,yh.yhlx,ssjg from xt_yh yh where yh.yhlx='1' and ssjg in('"+jcz.replace(",", "','")+"')"+
//								" and exists (select 1 from xt_yhjs js where yh.pkid=js.yhzh and js.jsid in('"+jczJs.replace(",", "','")+"'))";			
					}
				}
				//查询出人员后，向信息接收表中插入数据
				SqlSession sqlSession = StaticVar.sqlSessionFactory.openSession();
				List<Map<String,Object>> us= sqlSession.selectList(queryUser, arg3);
				//List<Map<String,Object>> us=queService.selectDatas(queryUser);
				List<Map<String,Object>> jsxxList=new ArrayList<Map<String,Object>>();
				String[] sql4 = new String[us.size()];
				for(int i=0;i<us.size();i++){
					Map<String,Object> arg4 = new HashMap<String,Object>();
					arg4.put("pkid", pkid+"_"+us.get(i).get("yhid"));
					arg4.put("xxid", pkid);
					arg4.put("xxbt", xxbt);
					arg4.put("xxnr", xxnr);
					arg4.put("sfyfj", sfyfj);
					arg4.put("sfxyhf", sfxyhf);
					arg4.put("hfsm", hfsm);
					arg4.put("jszzh", us.get(i).get("yhid"));
					arg4.put("jszmc", us.get(i).get("yhmc"));
					arg4.put("bz", bz);
					arg4.put("xxlb", xxlb);
					arg4.put("fsrzh", userId);
					arg4.put("fsrmc", userName);
					jsxxList.add(arg4);
					sql4[i]="com.kmzc.dao.jsxx.JsxxDealMapper.insertXxjsb";
				}
				optService.operateSqls(sql4, jsxxList);
				//后台操作处理完毕，处理实时通讯部分,websocket通知，提示有新的信息
				jsxxService.wsTz(us, xxlb);
			}
		}catch(Exception e){
			log.error(e.getMessage(),e);
			ret=e.getMessage();
			//失败后进行删除补偿
			String[] sql5=new String[3];
			sql5[0]="com.kmzc.dao.jsxx.JsxxDealMapper.delXxjszb";
			sql5[1]="com.kmzc.dao.jsxx.JsxxDealMapper.delXxfj";
			sql5[2]="com.kmzc.dao.jsxx.JsxxDealMapper.delXxfszb";
			List<Map<String,Object>> list5=new ArrayList<Map<String,Object>>();
			Map<String,Object> a1 = new HashMap<String,Object>();
			a1.put("pkid", pkid);
			Map<String,Object> a2 = new HashMap<String,Object>();
			a2.put("pkid", pkid);
			Map<String,Object> a3 = new HashMap<String,Object>();
			a3.put("pkid", pkid);
			list5.add(a1);
			list5.add(a2);
			list5.add(a3);
			optService.operateSqls(sql5, list5);
		}
		//操作完成后返回信息
		response.setContentType("html/text;charset=UTF-8");
		try {
			response.getWriter().print(ret);
		} catch (IOException e) {
			log.error(e.getMessage(),e);
		}
	}
}
