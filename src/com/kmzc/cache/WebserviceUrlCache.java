package com.kmzc.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.kmzc.utils.SpringUtils;

/**
 * 描述：缓存各检测站端系统需要用到的webservice 的地址 
 * 
 * @date 2017年8月17日 下午3:35:42
 */
public class WebserviceUrlCache {
	private static Map<String,Map<String,Object>> urls=new HashMap<String,Map<String,Object>>();
	static{
		init();
	}
	public static void init(){
		List<Map<String, Object>> configs=SpringUtils.getJdbcTemplate().queryForList("SELECT pkid,serviceurlzx,serviceurljcz,serviceurlsbjk,serviceurlrep,serviceurlby1,serviceurlby2 FROM jc_jcz_jczjbxx");
		if(configs!=null && configs.size()>0){
			String key="";
			for(Map<String,Object> m:configs){
				key=(String)m.get("pkid");
				urls.put(key, m);
			}
		}
	}
	/**
	 * 描述：得到检测站端系统需要用到的webservice相关地址
	 * 
	 * @date 2017年8月17日 下午4:08:27
	 * @param jczbh 检测站编号
	 * @param type  类型：zx（中心端webservice地址），jcz（检测站端webservice地址），rep（报表服务地址），sbjk（设备接口webservice地址），by1（备用1地址），by2（备用2地址）
	 * @return 返回相关地址，如果不存在，则返回空的字符串
	 */
	public static String getWebServiceUrl(String jczbh,String type){
		Map<String, Object> m=urls.get(jczbh);
		if(m==null){
			return "";
		}else{
			Object ret=m.get("serviceurl"+type);
			if(ret==null){
				return "";
			}else{
				return ret.toString();
			}
		}
	}
}
