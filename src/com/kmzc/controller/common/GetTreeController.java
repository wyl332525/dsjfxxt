package com.kmzc.controller.common;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
/**
 * @author baixg
 * 获取树形菜单
 */
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kmzc.cache.StaticVar;
import com.kmzc.utils.ComboTree;

import net.sf.json.JSONArray;
/**
 * {data: [{
			id:'id1',
			text: 'Item1',
			state: 'closed',
			children: [{
				id:'id2',
				text: 'Item2'
			},{
				id:'id3',
				text: 'Item3'
			}]
		},{
			id:'id4',
			text: 'Item4'
		}]
	}
 * @author yt
 *
 */
@Controller
@RequestMapping("/tree")
@Scope("prototype")
public class GetTreeController {
	
	@RequestMapping("/getJczTree")
	public void getSpjktree(HttpServletResponse response,HttpServletRequest request){
		SqlSession sqlSession = StaticVar.sqlSessionFactory.openSession();
		//首先获取检测站节点
		List<Map<String,Object>> jczlist = sqlSession.selectList("com.kmzc.dao.jcjg.SpylMapper.selectJcz");
		List<ComboTree> treeList = new ArrayList<ComboTree>();
		for(Map<String,Object> jczmap : jczlist){
			String jczbh = (String)jczmap.get("pkid");
			String jczjc = (String)jczmap.get("jczjc");
			ComboTree jczct = new ComboTree();
			jczct.setId(jczbh);
			jczct.setText(jczjc);
			jczct.setState("closed");
			jczct.setIconCls("icon-close");
			//往检测站节点里面增加检测线节点
			Map<String,Object> jczM = new HashMap<String, Object>();
			jczM.put("jczbh", jczbh);
			List<Map<String,Object>> jcxlist = sqlSession.selectList("com.kmzc.dao.jcjg.SpylMapper.selectJcx",jczM);
			List<ComboTree> jcxTree = new ArrayList<ComboTree>();
			for(Map<String,Object> jcxmap : jcxlist){
				String jcxbh = (String)jcxmap.get("pkid");
				String jcxmc = (String)jcxmap.get("jcxmc");
				ComboTree jcxct = new ComboTree();
				jcxct.setId(jcxbh);
				jcxct.setText(jcxmc);
				jcxct.setState("closed");
				jcxct.setIconCls("icon-close");
				jcxTree.add(jcxct);
				//往检测线节点里面增加摄像机节点
				Map<String,Object> sxjM = new HashMap<String, Object>();
				sxjM.put("jcxbh", jcxbh);
				List<Map<String,Object>> sxjlist=sqlSession.selectList("com.kmzc.dao.jcjg.SpylMapper.selectSxj",sxjM);
				List<ComboTree> sxjTree = new ArrayList<ComboTree>();
				for(Map<String,Object> sxjmap : sxjlist){
					String sxjbh = (String)sxjmap.get("pkid");
					String sxjmc = (String)sxjmap.get("sxjmc");
					ComboTree sxjct = new ComboTree();
					sxjct.setId(sxjbh);
					sxjct.setText(sxjmc);
					Map<String,String> m = new HashMap<String,String>();
					m.put("sxjip", (String)sxjmap.get("sxjip"));
					m.put("sxjtdh", (Integer)sxjmap.get("sxjtdh")+"");
					m.put("nvrip", (String)sxjmap.get("nvrip"));
					sxjct.setAttributes(m);
					sxjct.setState("opend");
					sxjct.setIconCls("icon-sxj");
					sxjTree.add(sxjct);
				}
				if(sxjlist.size() <= 0){
					jcxct.setState("opend");
					jcxct.setIconCls("icon-open");
				}
				jcxct.setChildren(sxjTree);
			}
			if(jcxlist.size() <= 0){
				jczct.setState("opend");
				jczct.setIconCls("icon-open");
			}
			jczct.setChildren(jcxTree);
			treeList.add(jczct);
		}
		JSONArray retJson = JSONArray.fromObject(treeList);
		String ret = retJson.toString();
		ret = ret.replaceAll(",\"children\":\\[\\]", "");
		System.out.println(ret);
		response.setContentType("text/html;charset=UTF-8");	
		try {
			response.getWriter().print(ret);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
