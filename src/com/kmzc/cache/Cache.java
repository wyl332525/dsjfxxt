package com.kmzc.cache;
/**
 * 描述：所有缓存都需要实现该接口，并且加上@Component注解，则系统在启动的时候会自动进行初始化
 */
public interface Cache {
	public void init();
}
