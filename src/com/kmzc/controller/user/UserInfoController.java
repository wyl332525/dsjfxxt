package com.kmzc.controller.user;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.kmzc.cache.StaticVar;
import com.kmzc.security.user.ZcPasswordEncoder;
import com.kmzc.security.user.ZcUserDetails;
import com.kmzc.service.common.OperateDataService;
import com.kmzc.utils.Base64Util;
import com.kmzc.utils.ComboTree;
import com.kmzc.utils.CommonUtils;
import com.kmzc.utils.DbUtils;

import net.sf.json.JSONArray;

@Controller
@RequestMapping("/user")
public class UserInfoController {
	@Autowired
	private SessionRegistry sessionRegistry;
	@Autowired
	private OperateDataService optService;
	@Autowired
	protected ZcPasswordEncoder kmzcPasswordEncoder;
	
	
	private static Logger log = Logger.getLogger(UserInfoController.class);
	
	@RequestMapping("/loginAll")
	public void getAllCurrentUsers(HttpServletResponse response){
		List<Object> principals = sessionRegistry.getAllPrincipals(); 
		List<ZcUserDetails> usersList = new ArrayList<ZcUserDetails>();  
		for (Object principal: principals) {  
			if (principal instanceof ZcUserDetails) {  
				usersList.add((ZcUserDetails) principal);  
			}
		}  
		System.out.println("count:"+usersList.size()+"=>"+usersList);  
		response.setContentType("application/json;charset=UTF-8");
		try {
			response.getWriter().print(JSONArray.fromObject(usersList).toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/jsQxComboTree")
	public void jsQxComboTree(HttpServletResponse response,HttpServletRequest request){
		Map<String,Object> params=DbUtils.getArgs(request);
		SqlSession sqlSession = StaticVar.sqlSessionFactory.openSession();
		String sql=(String) params.get("sqlKey");//sql语句的key
		String ret = "";
		StringBuffer sb = new StringBuffer();//返回的jsion字符串
		List<Map<String,Object>> lists=null;
		List<Map<String,Object>> fatherlists = new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> midCdLists=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> addMidCdLists=new ArrayList<Map<String,Object>>();//保存从叶子节点移除出来的只有二级菜单的记录
		List<Map<String,Object>> childlists = new ArrayList<Map<String,Object>>();
		Map<String,Object> args=(Map<String, Object>) params.get("args");
		
		if(CommonUtils.isEmpty(sql)){
		}else{
			lists=sqlSession.selectList(sql,args);
		}
		
		if(lists!=null){
			for(Map<String,Object> m:lists){
				String fj = (String)m.get("fjcd");
				String yz = (String)m.get("sfcdx");
				String lx = (String)m.get("cdlx");//菜单类型 1为检测端，否则为管理端
				if(lx == "1" || "1".equals(lx)){
					if("TOP".equalsIgnoreCase(fj)){  //顶层菜单
						fatherlists.add(m);
						midCdLists.add(m);//中间菜单
					}else if("1".equalsIgnoreCase(yz)){ //叶子节点菜单
						childlists.add(m);
					}
				}else{
					if("TOP".equalsIgnoreCase(fj)){  //顶层菜单
						fatherlists.add(m);
					}else if("1".equalsIgnoreCase(yz)){ //叶子节点菜单
						childlists.add(m);
					}else{
						midCdLists.add(m);//中间菜单
					}
				}
				
			}
		}
		List<ComboTree> retList = new ArrayList<ComboTree>();
		if(fatherlists.size() > 0){
			for(Map<String,Object> m:fatherlists){
				//先取到父级菜单
				String pkid = (String)m.get("pkid");
				String cdmc = (String)m.get("cdmc");
				ComboTree ct = new ComboTree();
				ct.setId(pkid);
				ct.setText(cdmc);
				ct.setState("closed");
				//ct.setIconCls("icon-close");
				List<ComboTree> midList = new ArrayList<ComboTree>();
				for(Map<String,Object> midmap : midCdLists){ //中间菜单
					ComboTree ct2 = new ComboTree();
					String pkid2="";
					if(pkid.equals((String)midmap.get("fjcd"))){
						pkid2 = (String)midmap.get("pkid");
						String cdmc2 = (String)midmap.get("cdmc");
						ct2.setId(pkid2);
						ct2.setText(cdmc2);
						ct.setState("opend");
						midList.add(ct2);
					}
					
					List<ComboTree> childList = new ArrayList<ComboTree>();
					for(Map<String,Object> childmap : childlists){   //子菜单,还要考虑 如果fjcd是TOP的情况 
						if((pkid2.equals((String)childmap.get("fjcd"))) && !"TOP".equals((String)childmap.get("fjcd"))){
							ComboTree ct3 = new ComboTree();
							String pkid3 = (String)childmap.get("pkid");
							String cdmc3 = (String)childmap.get("cdmc");
							ct3.setId(pkid3);
							ct3.setText(cdmc3);
							ct2.setState("opend");
							//ct.setIconCls("icon-open");
							childList.add(ct3);  //会重复
						}else{  //如果fjcd是TOP的情况,即两级菜单的情况
							addMidCdLists.add(childmap);
						}
					}
					if(childList.size()>0){
						ct2.setChildren(childList);
					}
					
				}
				//处理二级菜单
				//去重复
				Set<Map<String,Object>> addMidCdSet =new HashSet<Map<String,Object>>();
				addMidCdSet.addAll(addMidCdLists);
				List<Map<String,Object>> addMidCdLists2=new ArrayList<Map<String,Object>>();
				addMidCdLists2.addAll(addMidCdSet);
				List<ComboTree> mapList = new ArrayList<ComboTree>();
				if(addMidCdLists.size()>0){
					for(Map<String,Object> map : addMidCdLists2){
						ComboTree ct4 = new ComboTree();
						String pkid4="";
						if(pkid.equals((String)map.get("fjcd"))){
							pkid4 = (String)map.get("pkid");
							String cdmc4 = (String)map.get("cdmc");
							ct4.setId(pkid4);
							ct4.setText(cdmc4);
							ct.setState("opend");
							mapList.add(ct4);
						}
					}
				}
				
				if(midList.size()>0){
					ct.setChildren(midList);
				}
				else if(mapList.size()>0){
					ct.setChildren(mapList);
				}
				
				
				
				retList.add(ct);
			}
			JSONArray retJson = JSONArray.fromObject(retList);
			sb.append(retJson.toString());
			ret = sb.toString();
			ret = ret.replaceAll(",\"children\":\\[\\]", "");
//			System.out.println("树形菜单：" +ret);
		}else{
			ret="0";
		}
		try {
			response.setContentType("text/html;charset=UTF-8");	
			response.getWriter().print(ret);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	
	
	/**
	 * 修改用户个人密码
	 * @param request
	 * @param response
	 * @param userId 用户ID
	 * @param regionCode 用户授权码
	 * @param jmm 旧密码
	 * @param xmm 新秘密
	 * @throws Exception
	 */
	@RequestMapping("/xgyhmm")
	public void xgyhmm(@RequestParam Map<String,Object> params,HttpServletResponse response,HttpSession session) throws Exception{
		response.setContentType("application/html;charset=UTF-8"); 
		SqlSession sqlSession = StaticVar.sqlSessionFactory.openSession();
		String jmm = (String)params.get("jmm");
		jmm=Base64Util.encode(jmm);
		String xmm = (String)params.get("xmm");
		String userId = (String)session.getAttribute("userId");//登录用户id
		Object[] param=new Object[1];
        param[0]=userId;
        int res=0;
	List<Map<String,Object>> users=sqlSession.selectList("com.kmzc.dao.xt.YhJsCdMapper.getXgYhMm",userId);

	if(users.size()>0){
		Map<String,Object> user=users.get(0);
		if(kmzcPasswordEncoder.matches(jmm,user.get("yhmm").toString())){
			//修改密码
			xmm=kmzcPasswordEncoder.encode(xmm);
			Map<String,Object> args=new HashMap<String, Object>();
			args.put("pkid",userId);
			args.put("yhmm",xmm);
			try{
				res=optService.operateSql("com.kmzc.dao.xt.YhJsCdMapper.updateYhmm", args);
				}catch(Exception e){
					log.error(e.getMessage(),e);
				}
			if(res==0){
				log.error("修改用户密码时出现错误!");
			}
		}else{
			res=-1;
			log.error("原密码输入错误，不能修改密码!");
		}
	}
	
	try { 
		response.getWriter().print(res);
	} catch (IOException e) {
		log.error(e.getMessage(),e);
	}
	
	}
	
	
	/*
	 * 
	 * @param yhParams  用户参数值
	 * @param jsParams  角色参数值
	 * @param response
	 * @param session
	 * @throws Exception
	 */
	@RequestMapping("/saveYh")
	public void saveYh(@RequestParam Map<String,Object> params,HttpServletResponse response,HttpSession session) throws Exception{
		String yhzh = (String)params.get("yhzh");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		params.remove("yhzh");
		params.put("pkid", yhzh);
		String yhItemId = (String)params.get("yhItemId");//获取yhid集合
		yhItemId =yhItemId.replace("yhzh", "pkid");
		String jsItemId = (String)params.get("jsItemId");
		
		//把不是表中的键值对删除
		params.remove("yhItemId");
		params.remove("jsItemId");
		params.remove("jsObj");
		String[] jsIds = null;
		if("" != jsItemId || null != jsItemId ){
			jsIds = jsItemId.split(";;");
		}
		String userId = (String)session.getAttribute("userId");//登录用户id
		String userName=(String)session.getAttribute("userName");//用户名称
		String yhmm="";
		try {
			yhmm = kmzcPasswordEncoder.encode("123456");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}//密码加密后 
		params.put("cjrzh", userId);
		params.put("cjrmc", userName);
		params.put("cjsj", df.format(new Date()));
		params.put("yhmm", yhmm);
		int ret = 1;
		int res=optService.operateSql("com.kmzc.dao.xt.YhJsCdMapper.insertXtYH",params);
		if(res!=1){
			ret = 0;
			log.error("新增用户和角色信息时出现错误!");
		}
		if(ret ==1 && jsIds !=null){
			insertjs(yhzh,jsIds);//保存角色
		}
		try {
			response.getWriter().print(ret);
		} catch (IOException e) {
			log.error(e.getMessage(),e);
		}
	}
	
	//添加用户角色
	public int insertjs(String yhzh, String[] jsId) {
		int n = 0;
		List<Map<String, Object>> args = new ArrayList<Map<String, Object>>();
		String[] sqls = new String[jsId.length];
		for (int i = 0; i < jsId.length; i++) {
			sqls[i] = "com.kmzc.dao.xt.YhJsCdMapper.addYhJS";
			args.add(new HashMap<String, Object>());
			args.get(i).put("yhzh", yhzh);
			args.get(i).put("jsid", jsId[i]);
		}
		if (sqls.length > 0) {
			List<Integer> res = optService.operateSqls(sqls, args);
			for (int k : res) {
				if (k != 1) {
					n = -1;
					log.error("新增用户和角色信息时出现错误!");
					break;
				}
			}
		}
		return n;
	}
	
	/**
	 * 更新用户信息
	 * @param params
	 * @param response
	 * @param session
	 */
	
	@RequestMapping("/updateYhJs")
	public void updateYhJs(@RequestParam Map<String,Object> params,HttpServletResponse response,HttpSession session){
		String yhzh = (String)params.get("yhzh");//用户账号
		String jsItemId = (String)params.get("jsItemId");
		String jsValues = (String)params.get("jsObj");
		String userId = (String)session.getAttribute("userId");//登录用户id
		String userName=(String)session.getAttribute("userName");//用户名称
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		String[] jsIds = null;
		if("" != jsItemId && null != jsItemId ){
			jsIds = jsItemId.split(";;");
		}
		String[] jsV =null;
		if("" != jsValues && null != jsValues ){
			jsV = jsValues.split(";;");
		}
		params.put("pkid", yhzh);
		params.put("zhxgrzh", userId);
		params.put("zhxgrmc", userName);
		params.put("zhxgsj", df.format(new Date()));
		int ret = 1;
		int res=optService.operateSql("com.kmzc.dao.xt.YhJsCdMapper.updateXtYh",params);
		if(res!=1){
			ret = 0;
			log.error("更新用户和角色信息时出现错误!");
		}
		
		//组装角色更新或插入语句 值为1是新增，值为0 是删除
		if(jsIds!=null){
			List<Map<String,Object>> args=new ArrayList<Map<String,Object>>();
			String[] sqls = new String[jsIds.length];
			for(int i=0; i < jsIds.length; i++){
				String jsValue=jsV[i];
				args.add(new HashMap<String, Object>());
				args.get(i).put("yhzh", yhzh);
				args.get(i).put("jsid", jsIds[i]);
				if("".equals(jsValue) || "0".equals(jsValue)){//值为空或者为0，表示删除。否则表示增加
					sqls[i]="com.kmzc.dao.xt.YhJsCdMapper.delYhJS";
				}else{
					sqls[i]="com.kmzc.dao.xt.YhJsCdMapper.addYhJS";
				}
			}
			if(sqls.length>0){
				List<Integer> reas = optService.operateSqls(sqls, args);
				for(int k :reas){
					if(k != 1){
						ret = 0;
						log.error("更新用户和角色信息时出现错误!");
						break;
					}
				}
			}
		}
		try {
			response.getWriter().print(ret);
		} catch (IOException e) {
			log.error(e.getMessage(),e);
		}
	}
	
}
