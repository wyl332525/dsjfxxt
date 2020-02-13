package com.kmzc.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.mybatis.generator.api.MyBatisGenerator;
import org.mybatis.generator.config.Configuration;
import org.mybatis.generator.config.Context;
import org.mybatis.generator.config.JDBCConnectionConfiguration;
import org.mybatis.generator.config.JavaClientGeneratorConfiguration;
import org.mybatis.generator.config.JavaModelGeneratorConfiguration;
import org.mybatis.generator.config.ModelType;
import org.mybatis.generator.config.SqlMapGeneratorConfiguration;
import org.mybatis.generator.config.TableConfiguration;
import org.mybatis.generator.internal.DefaultShellCallback;

/**
 * 描述：MyBatis MBG 数据库表2代码生成器
 * 
 * 2018年3月29日 上午10:13:43
 */
public class MyBatisMbgUtils {
	public final static String MyBatis3="MyBatis3";
	public final static String MyBatis3Simple="MyBatis3Simple";
	/**
	 * 描述：产生数据库表映射及相关mapper
	 * @param p      业务类型，最终会生成一个包，如果该参数为xxx，则对应的包为com.kmzc.dao.xxx
	 * @param tables 需要映射的数据库表List<Map<String,String>>，每个map是一个，map里面tabName为数据库表面，objName生成对象名
	 * @throws Exception
	 *
	 * 
	 * 2018年3月29日 下午2:36:22
	 */
	public static void generator(String p,String targetType,List<Map<String,String>> tables) throws Exception{
		List<String> warnings = new ArrayList<String>();
		boolean overwrite = true;
		Configuration config = new Configuration();
		Context context=new Context(ModelType.FLAT);
		context.setId(p+"123");
		context.setTargetRuntime(targetType);//MyBatis3 MyBatis3Simple  MyBatis3DynamicSql
		for(Map<String,String> t:tables){
			context.setJdbcConnectionConfiguration(getJdbcConnectionConfiguration());
			context.setJavaModelGeneratorConfiguration(getJavaModelGenerator(p));
			context.setSqlMapGeneratorConfiguration(getSqlMapGenerator(p));
			context.setJavaClientGeneratorConfiguration(getJavaClientGenerator(p));
			context.addTableConfiguration(getTable(context,t));
		}

		config.addContext(context);
		DefaultShellCallback callback = new DefaultShellCallback(overwrite);
		MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
		myBatisGenerator.generate(null);
	}
	
	private static JDBCConnectionConfiguration getJdbcConnectionConfiguration(){
		JDBCConnectionConfiguration connection=new JDBCConnectionConfiguration();
		connection.setDriverClass("com.mysql.jdbc.Driver");	
		connection.setConnectionURL("jdbc:mysql://192.168.0.3:3306/jdc?useSSL=false");
		connection.setUserId("root");
		connection.setPassword("jdc2018");
		return connection;
	}
	
	private static JavaModelGeneratorConfiguration getJavaModelGenerator(String p){
		JavaModelGeneratorConfiguration jmg=new JavaModelGeneratorConfiguration();
		jmg.setTargetPackage("com.kmzc.entity."+p);
		jmg.setTargetProject("./src");
		jmg.addProperty("enableSubPackages", "true");
		jmg.addProperty("trimStrings", "true");
		return jmg;
	}
	
	private static SqlMapGeneratorConfiguration getSqlMapGenerator(String p){
		SqlMapGeneratorConfiguration sqlpg=new SqlMapGeneratorConfiguration();
		sqlpg.setTargetPackage("mybatis.mappers."+p);
		sqlpg.setTargetProject("./conf");
		sqlpg.addProperty("enableSubPackages", "true");
		return sqlpg;
	}
	
	private static JavaClientGeneratorConfiguration getJavaClientGenerator(String p){
		JavaClientGeneratorConfiguration jcg=new JavaClientGeneratorConfiguration();
		jcg.setTargetPackage("com.kmzc.dao."+p);
		jcg.setTargetProject("./src");
		jcg.addProperty("enableSubPackages", "true");
		jcg.setConfigurationType("XMLMAPPER");
		return jcg;
	}
	
	private static TableConfiguration getTable(Context context,Map<String,String> t){
		TableConfiguration table=new TableConfiguration(context);
		table.setTableName(t.get("tabName"));
		table.setDomainObjectName(t.get("objName"));
		return table;
	}
}
