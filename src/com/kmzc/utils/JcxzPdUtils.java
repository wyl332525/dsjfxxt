package com.kmzc.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kmzc.cache.StaticVar;

/**
 * 检测方法判定类
 * @description 
 * @author      fupl
 * @date        2018年6月14日
 */
@Transactional
@Service
public class JcxzPdUtils {
	
	public static String getJcxz(String carpkid,String jcff){
		String xzpkid = "";
		SqlSession sqlSession = StaticVar.sqlSessionFactory.openSession();
		List<Map<String,Object>> carlist = sqlSession.selectList("com.kmzc.dao.utils.JxczPdMapper.clxxQuery",carpkid);
		Map<String,Object> mcar = carlist.get(0);
		String cldjrq = (String)mcar.get("cldjrq");
		String qclx = (String)mcar.get("qclx");
		//如果检测方法是双怠速法
		if("1".equals(jcff)){
			Map<String,Object> map = new HashMap<String, Object>();
			map.put("cldjrq", cldjrq);
			map.put("qclx", qclx);
			List<Map<String,Object>> xzlist = sqlSession.selectList("com.kmzc.dao.utils.JxczPdMapper.sdsxzQuery",map);
			xzpkid = (String)xzlist.get(0).get("pkid");
		}
		//如果检测方法是稳态工况法
		else if("2".equals(jcff)){
			int jzzl = (Integer)mcar.get("zbzl") + 100;
			Map<String,Object> map = new HashMap<String, Object>();
			map.put("cldjrq", cldjrq);
			map.put("qclx", qclx);
			map.put("jzzl", jzzl);
			List<Map<String,Object>> xzlist = sqlSession.selectList("com.kmzc.dao.utils.JxczPdMapper.wtxzQuery",map);
			xzpkid = (String)xzlist.get(0).get("pkid");
		}
		//如果检测方法是简易瞬态工况法
		else if("3".equals(jcff)){
			int jzzl = (Integer)mcar.get("zbzl") + 100;
			Map<String,Object> map = new HashMap<String, Object>();
			map.put("cldjrq", cldjrq);
			map.put("qclx", qclx);
			map.put("jzzl", jzzl);
			List<Map<String,Object>> xzlist = sqlSession.selectList("com.kmzc.dao.utils.JxczPdMapper.jystxzQuery",map);
			xzpkid = (String)xzlist.get(0).get("pkid");
		}
		//如果检测方法是加载减速法
		else if("4".equals(jcff)){
			Map<String,Object> map = new HashMap<String, Object>();
			map.put("cldjrq", cldjrq);
			map.put("qclx", qclx);
			List<Map<String,Object>> xzlist = sqlSession.selectList("com.kmzc.dao.utils.JxczPdMapper.jzjsxzQuery",map);
			xzpkid = (String)xzlist.get(0).get("pkid");
		}
		//如果检测方法是不透光烟度法
		else if("5".equals(jcff)){
			String jqfs = (String)mcar.get("jqfs");
			Map<String,Object> map = new HashMap<String, Object>();
			map.put("cldjrq", cldjrq);
			map.put("jqfs", jqfs);
			List<Map<String,Object>> xzlist = sqlSession.selectList("com.kmzc.dao.utils.JxczPdMapper.btgydxzQuery",map);
			xzpkid = (String)xzlist.get(0).get("pkid");
		}
		//如果检测方法是滤纸烟度法
		else if("6".equals(jcff)){
			Map<String,String> map = new HashMap<String, String>();
			map.put("cldjrq", cldjrq);
			List<Map<String,Object>> xzlist = sqlSession.selectList("com.kmzc.dao.utils.JxczPdMapper.lzydxzQuery",map);
			xzpkid = (String)xzlist.get(0).get("pkid");
		}
		//如果检测方法是摩托车双怠速法
		else if("7".equals(jcff)){
			int ccs = (Integer)mcar.get("ccs");
			Map<String,Object> map = new HashMap<String, Object>();
			map.put("cldjrq", cldjrq);
			map.put("ccs", ccs);
			List<Map<String,Object>> xzlist = sqlSession.selectList("com.kmzc.dao.utils.JxczPdMapper.mtcsdsxzQuery",map);
			xzpkid = (String)xzlist.get(0).get("pkid");
		}
		return xzpkid;
	}
	
}
