package com.kmzc.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

/**
 * 描述：缓存用户的角色和菜单的相关数据
 * 
 * 2018年5月2日 下午3:41:27
 */
@Component
public class YhJsCdCache implements Cache{
	/**缓存的是用户ID和该用户拥有的角色集合 */
	private static Map<String,Set<String>> yhjs;
	/**缓存的是角色ID和该角色拥有的菜单集合 */
	private static Map<String,Set<String>> jscd;
	/**缓存的是所有菜单（按 cdpx 字段进行升序排序asc）*/
	private static List<Map<String,String>> cd;

	/** 
	 * 描述：重新加载数据到内存中，如果相关数据有改变，则需要执行该静态方法重新初始化。
	 * 
	 * 2018年5月3日 上午9:42:41
	 */
	public void init(){
		if("myself".equalsIgnoreCase(StaticVar.cacheType)){
			//自己写缓存
			/*初始化用户-》角色*/
//			SqlSession sqlSession=StaticVar.sqlSessionFactory.openSession();
//			List<Map<String,String>> lists=sqlSession.selectList("com.kmzc.dao.xt.YhJsCdMapper.selectYhJsAll");
//			Map<String,Set<String>> yhjsTemp=new HashMap<String,Set<String>>();
//			for(Map<String,String> m:lists){
//				String key=m.get("yhzh");
//				Set<String> s=yhjsTemp.get(key);
//				if(s==null){
//					s=new HashSet<String>();
//				}
//				s.add(m.get("jsid"));
//			}
//			yhjs=yhjsTemp;
//			
//			/*初始化角色-》菜单*/
//			lists=sqlSession.selectList("com.kmzc.dao.xt.YhJsCdMapper.selectJsCdAll");
//			Map<String,Set<String>> jscdTemp=new HashMap<String,Set<String>>();
//			for(Map<String,String> m:lists){
//				String key=m.get("jsid");
//				Set<String> s=jscdTemp.get(key);
//				if(s==null){
//					s=new HashSet<String>();
//				}
//				s.add(m.get("cdid"));
//			}
//			jscd=jscdTemp;
//			
//			/*初始化菜单*/
//			cd=sqlSession.selectList("com.kmzc.dao.xt.YhJsCdMapper.selectCdAll");
		}else if("redis".equalsIgnoreCase(StaticVar.cacheType)){
			//采用redis缓存
		}
	}
	/**
	 * 描述：根据用户id返回用户的所有角色ID集合
	 * @param userId
	 * @return
	 * 
	 * 2018年5月2日 下午2:22:17
	 */
	public static Set<String> getJsByYh(String userId){
		return yhjs.get(userId);
	}
	/**
	 * 描述：根据用户ID得到用户的所有可以访问的url地址集合
	 * @param userId
	 * @return
	 *
	 * 
	 * 2018年5月2日 下午3:27:35
	 */
	public static Set<String> getCdUrlByYh(String userId){
		Set<String> ret=new HashSet<String>();
		Set<String> cds=getCdidsByYh(userId);
		for(Map<String,String> c:cd){
			//如果该菜单是菜单项，并且用户拥有该菜单，或者是该菜单是都可访问的，则添加到待返回集合中（注意只返回菜单项，非菜单项没有菜单则不返回）
			if("1".equals(c.get("sfcdx")) && (cds.contains(c.get("pkid")) || "1".equals(c.get("sfdkfw")))){
				ret.add(c.get("cdlj"));
			}
		}
		return ret;
	}
	/**
	 * 描述：根据用户ID得到用户的所有的菜单对象集合,返回的是按照 cdpx字段排序后的顺序
	 * @param userId
	 * @return
	 *
	 * 
	 * 2018年5月2日 下午3:37:26
	 */
	public static List<Map<String,String>> getCdObjectByYh(String userId){
		List<Map<String,String>> ret=new ArrayList<Map<String,String>>();
		Set<String> cds=getCdidsByYh(userId);
		for(Map<String,String> c:cd){
			//如果用户拥有该菜单，或者是该菜单是都可访问的，则添加到待返回List中
			if(cds.contains(c.get("pkid")) || "1".equals(c.get("sfdkfw"))){
				ret.add(c);
			}
		}
		return ret;
	}
	/**
	 * 描述：根据用户Id,返回该用户的所有菜单id的集合
	 * @param userId
	 * @return
	 *
	 * 
	 * 2018年5月2日 下午3:34:35
	 */
	private static Set<String> getCdidsByYh(String userId){
		Set<String> jss=yhjs.get(userId);
		Set<String> cds=new HashSet<String>();
		if(jss!=null){
			for(String js:jss){
				cds.addAll(jscd.get(js));
			}
		}
		return cds;
	}
}
