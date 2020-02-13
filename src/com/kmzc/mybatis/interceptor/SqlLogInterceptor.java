package com.kmzc.mybatis.interceptor;

import java.lang.reflect.Field;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.mapping.ParameterMode;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.scripting.defaults.DefaultParameterHandler;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.type.TypeHandlerRegistry;
import org.apache.log4j.Logger;

import com.kmzc.cache.Config;
import com.kmzc.security.user.ZcUserDetails;
import com.kmzc.utils.SqlLogsSaveThread;


/**
 * 描述：拦截mybatis的，记录当前执行的sql语句和参数
 * 
 *  2018年3月23日 上午11:05:21
 */
@Intercepts({//ParameterHandler 、ResultSetHandler 、StatementHandler 、Executor 
	@Signature(type = StatementHandler.class, method = "query", args = {Statement.class, ResultHandler.class}),
	@Signature(type = StatementHandler.class, method = "queryCursor", args = {Statement.class}),
	@Signature(type = StatementHandler.class, method = "update", args = {Statement.class}),
	@Signature(type = StatementHandler.class, method = "batch", args = { Statement.class })
	})
public class SqlLogInterceptor implements Interceptor {
	private static Logger logger=Logger.getLogger(SqlLogInterceptor.class);
	private static boolean isPrint=false;
	private SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	static{
		if("1".equals(Config.getConfig("sqlIsPrint"))){isPrint=true;}else{isPrint=false;}
	}
	@Override
	public Object intercept(Invocation invocation) throws Throwable {
		Object target = invocation.getTarget();//得到拦截的对象，其实就是StatementHandler
		long startTime = System.currentTimeMillis();//获取当前的开始时间戳
		String startTimeStr=sdf.format(new Date());//记录当前时间
		StatementHandler statementHandler = (StatementHandler) target;
		try {
			return invocation.proceed();
		} finally {
			long endTime = System.currentTimeMillis();
			long exeTime = endTime - startTime;//sql的执行的时间
			try{
				//获取绑定的SQL对象
				BoundSql boundSql = statementHandler.getBoundSql();
				//得到需要执行的sql语句，并进行格式
				String sql = boundSql.getSql();
				sql=formatSql(sql);
				if(sql.startsWith("insert into xt_rz_sql(")){//此时是插入的sql日志内容，不用去处理
					//什么都不用做
				}else{
					//得到默认的参数处理器
					DefaultParameterHandler dph=(DefaultParameterHandler)statementHandler.getParameterHandler();
					//利用反射机制，从DefaultParameterHandler获取Configuration和TypeHandlerRegistry
					Field configurationField=dph.getClass().getDeclaredField("configuration");
					Field typeHandlerRegistryField=dph.getClass().getDeclaredField("typeHandlerRegistry");
					configurationField.setAccessible(true);//设置私有属性可访问
					typeHandlerRegistryField.setAccessible(true);//设置私有属性可访问
					Configuration configuration=(Configuration) configurationField.get(dph);
					TypeHandlerRegistry typeHandlerRegistry=(TypeHandlerRegistry) typeHandlerRegistryField.get(dph);
					//sql的参数对象
					Object parameterObject = boundSql.getParameterObject();
					//需要绑定的参数映射对象
					List<ParameterMapping> parameterMappingList = boundSql.getParameterMappings();
					//处理sql的参数，该部分参考的是DefaultParameterHandler中setParameters方法中的实现
					StringBuffer args=new StringBuffer();
					if(parameterMappingList!=null && parameterMappingList.size()>0){
						for(ParameterMapping parameterMapping:parameterMappingList){
							//如果该参数不是输出参数，则进行处理
					        if (parameterMapping.getMode() != ParameterMode.OUT) {
					        	Object value;
					        	//参数的名字，属性
					        	String propertyName = parameterMapping.getProperty();
					        	//先从附加的，主要是list、array等的处理
					        	if (boundSql.hasAdditionalParameter(propertyName)) { // issue #448 ask first for additional params
					        		value = boundSql.getAdditionalParameter(propertyName);
					        	} else if (parameterObject == null) {
					        		value = null;
					        	} else if (typeHandlerRegistry.hasTypeHandler(parameterObject.getClass())) {
					        		//typeHandlerRegistry注册了某个类的处理
					        		value = parameterObject;
					        	} else {
					        		//默认的MetaObject 的处理，根据参数获取值
					        		MetaObject metaObject = configuration.newMetaObject(parameterObject);
					        		value = metaObject.getValue(propertyName);
					        	}
					        	if(value!=null){
					        		if(value instanceof Date){
					        			value=sdf.format(value);//如果是日期，则格式化一下
					        		}
					        	}
					        	args.append(",").append(value);
					        }
						}
						args.deleteCharAt(0);//删除第一个逗号
					}
					//处理日志，将数据封装到map中
					Map<String, String> sqlInfo=new HashMap<String,String>();
					sqlInfo.put("sql", sql);
					sqlInfo.put("args", args.toString());
					sqlInfo.put("startTime", startTimeStr);
					sqlInfo.put("exeTime", String.valueOf(exeTime));
					sqlInfo.put("userId", ZcUserDetails.getCurrentUserId());
					SqlLogsSaveThread.addSqlInfo(sqlInfo);//将SQL执行的相关信息，输入到日志记录线程中
					if(isPrint){//根据配置，是否需要在控制台上输出sql的执行信息
						System.out.println("sql:["+sql+"],参数:["+args+"],执行开始时间:["+startTimeStr+"],执行时间:["+exeTime+"ms],执行人:["+sqlInfo.get("userId")+"]");
					}
				}
			}catch(Exception e){
				logger.error("记录SQL日志时出现异常："+e.getMessage(),e);
			}
		}
	}
	
	@Override
	public Object plugin(Object target) {
		return Plugin.wrap(target, this);
	}

	@Override
	public void setProperties(Properties properties) {

	}
	/**
	 * 
	 * 描述：将多行和多个空格的sql语句格式化为一行
	 * @param sql 需要格式化的sql语句
	 * @return 返回格式化后的sql语句
	 *
	 * 
	 * 2018年3月26日 下午3:52:25
	 */
	private String formatSql(String sql) {
		// 输入sql字符串空判断
		if (sql == null || sql.length() == 0) {
			return "";
		}
		//格式sql 将回车换行制表符等替换成空，在将连续多个空格替换成1个空格，然后在去掉左右括号两边的空格，在去掉逗号左右两个的空格
		return sql.replaceAll("[\\t\\n\\x0B\\f\\r]", "").replaceAll(" +", " ")
				.replaceAll(" *\\( *", "(").replaceAll(" *\\) *", ")").replaceAll(" *, *", ",");

	}
}
