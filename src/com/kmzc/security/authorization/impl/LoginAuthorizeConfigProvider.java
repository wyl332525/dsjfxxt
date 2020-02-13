package com.kmzc.security.authorization.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.stereotype.Component;

import com.kmzc.cache.SecurityConfig;
import com.kmzc.security.authorization.AuthorizeConfigProvider;

@Component
@Order(1)
public class LoginAuthorizeConfigProvider  implements AuthorizeConfigProvider{

	@Override
	public void config(ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry config) {
		String[] configUrls=StringUtils.splitByWholeSeparatorPreserveAllTokens(SecurityConfig.getConfig("loginAccessUrls", ""), ",");
		String[] fixedUrls={
				"/js/**/**/**",
				"/img/**/**/**",
				"/services/**/**/**",
				"/wechat/main.do",
				"/dg/*.do",
				"/MP_verify_DsEhMUTkqnoeTWqE.txt",
				"/zc/download.do",
				"/login/login.do",
				"/zc/fileExist.do",
				"/fileUpload/*.do",
				"/getViewImg.do",
				"//zc/xx/xxzy.do",
				"/menu/getCd.do",
				"/zc/xx/xxql.do",//阅读信息处理页面
				"/xxinfo/ql.do",//信息处理Controller
				"/zc/jczshgl/editJczsq.do",//
				"/zc/jcywsqcl/sqxgJcffXq.do",//
				"/zc/djcljc/djclthlb.do",//
				"/dm/cacheData.do",
				"/dm/cacheComboTree.do",
				"/zc/jczjk/lsspckOfbg.do",
				"/zc/carInfo/carInfo.do",
				"/zc/cljcjk/jk.do",
				"/zc/waitcheck/sqxgClxx.do",
				"/zc/yhqxgl/dwInfo.do",//单位管理添加修改
				"/zc/dealUnlockCar/shPrint.do",
				"/zc/jcsjgl/imgPrview.do",
				"/zc/jcsjgl/wxxx.do",
				"/zc/spyl/sphfback.do",
				"/zc/jcsjgl/wgcy.do",
				"/zc/jcsjgl/gcsj.do",
				"/jcbg/getCheckMsg.do",
				"/jcbg/getImgPriew.do",
				"/jcbg/getWxxx.do",
				"/jcbg/getWgcy.do",
				"/jcbg/getSphfXx.do",
				"/checkinfo/getCheckData.do",
				"/jcbg/getImgPriew.do",
				"/zc/jcsjgl/showDetail.do",
				"/zc/jcsjgl/toCheckData.do",
				"/zc/carInfo/carInfo.do",
				"/zc/jcsjgl/showClxgxx.do",
				"/zc/jcsjgl/showClghxx.do",
				"/zc/jcsjgl/ygjc.do",
				"/zc/jcsjgl/bjxx.do",
				"/jcbg/getYgjcData.do",
				"/jcbg/getYgjcjg.do",
				"/zc/jcsjgl/showDetailXg.do",
				"/zc/jcsjgl/ygjcjg.do",
				"/zc/yzyd/jczInfo.do",
				"/zc/yzydgl/xg.do",
				"/zc/yzyd/jcxlist.do",
				"/zc/yzyd/yhlist.do",
				"/zc/yzyd/bzwzlist.do",
				"/zc/yzyd/nvrlist.do",
				"/zc/yzyd/spsblist.do",
				"/zc/yzyd/xgxxjl.do",
				"/zc/yzyd/jcxInfo.do",//从检测线列表跳转检测线详细
				"/zc/yzyd/yhInfo.do",//从用户列表跳转用户详细
				"/zc/yzyd/bzwzInfo.do",//从标准物质列表跳转标准物质详细
				"/zc/yzydgl/addCom.do",//添加信息
				"/zc/yzyd/spsbInfo.do",//从视频设备列表跳转视频设备详细
				"/zc/yzyd/addVideoEquip.do",//添加视频设备信息
				"/zc/yzyd/nvrInfo.do",//从NVR列表跳转到详情页面
				"/zc/yzydgl/deleteSpsb.do",//删除视频设备
				"/zc/yzyd/jcsbInfo",//检测设备跳转到详情
				"/zc/yzydgl/xgJcsb.do",//修改检测设备
				"/zc/yzyd/jcsbxxgl.do",//检测设备列表
				"/zc/jczshgl/jczsh.do",
				"/zc/jfgl/addJf.do",//记分管理详情
				"/zc/jfgl/jfInfo.do",//查看检测站申请的记分反馈详情
				"/jfgl/addJf.do",//增加记分管理
				
				"/zc/yhqxgl/jsInfo.do",//添加修改角色
				"/zc/yhqxgl/jsQxInfo.do",//角色权限
				"/user/jsQxComboTree.do",//权限树
				"/zc/yhqxgl/yhInfo.do",//用户编辑信息
				"/zc/yhqxgl/jsInfo.do",//添加修改角色
				"/zc/yhqxgl/jsQxInfo.do",//角色权限
				"/user/jsQxComboTree.do",//权限树
				"/user/saveYh.do",//添加用户
				"/user/updateYhJs.do",//修改用户
				"/user/xgyhmm.do",//修改用户密码
				"/zc/yhqxgl/yhInfo.do",//用户编辑信息
				
				/*fpl*/
				"/zc/jcywsqcl/sqxgJcffXq.do",//查看修改检测方法申请
				"/jcywsqcl/dealSqxgjcff.do",//处理修改检测方法
				"/jsxx/send.do",//发送信息
				"/zc/jcywsqcl/sqxgClxxXq.do",//查看修改车辆信息申请
				"/jcywsqcl/dealSqxgclxx.do",//处理修改车辆信息
				"/dealUnlockCar/dealUnlockCarManage.do",//处理跨站检测解锁申请
				"/zc/dealUnlockCar/editUnlockCar.do",//查看跨站检测解锁申请
				"/zc/dealUnlockCar/toCheckData.do",//查看检测数据
				"/zc/dealUnlockCar/shPrint.do",
				"/zc/jcywsqcl/toCheck.do",//查看审核维修信息
				"/zc/jcywsqcl/imgPrview.do",//查看维修照片
				"/zc/dealJcbgzf/editJcbgzf.do",//处理作废检测报告
				"/jcbg/toLock.do",//锁定检测报告
				"/jcbg/noLock.do",//解锁检测报告
				"/jcbg/applyCheck.do",//审核检测报告
				"/zc/dealJcbgzf/viewJcbgcdy.do",//查看检测报告重打印信息
				"/zc/jczshgl/jczsh.do",//查看检测站申请列表
				"/zc/jczshgl/editJczsq.do",//查看检测站申请
				"/jczshgl/toLock.do",//锁定检测站申请
				"/jczshgl/noLock.do",//解锁检测站
				"/jczshgl/dealSq.do",//处理检测站申请
				"/jsxx/send.do",//信息发送
				"/zc/xx/xxxq.do",//已发送信息详情
				
			    "/system/onlineUsers/getOnline.do",//获取在线用户
				"/system/onlineUsers/logout.do",//强制退出在线用户
				"/zc/jsxxrypz/jsxxrypz.do",//接收信息人员配置
				"/jsxxrypz/Queryyh.do",//接收信息人员查询
				"/zc/zjbdpz/jczqpzInfo.do",//添加修改检测周期配置
				"/zc/jcywcspz/bzdmInfo.do",//标准代码添加修改
				"/zc/zjbdpz/zjbd1.do",//双怠速法自检标定
				"/zc/zjbdpz/zjbd2.do",//稳态工况自检标定
				"/zc/zjbdpz/zjbd3.do",//简易瞬态自检标定
				"/zc/zjbdpz/zjbd4.do",//加载减速工况法自检标定
				"/zc/zjbdpz/zjbd5.do",//不透光烟度法自检标定
				"/zc/zjbdpz/zjbd6.do",//滤纸烟度法自检标定
				"/zc/zjbdpz/zjbd7.do",//瞬态工况法自检标定
				"/zc/jcywsqcl/jczgzsjdxx.do",//修改检测站时间段
				"/zc/jcywsqcl/jczjjrszxx.do",//新增检测站节假日
				"/zc/jcywsqcl/addtag.do",//新增标签
				"/zc/jcywsqcl/yhbqgl.do",//用户添加/修改标签
				"/zc/jcywsqcl/dtwglxx.do",//添加/修改单图文信息
			    SecurityConfig.getConfig("logoutPage","/zc/loginout/logout.do"),//退出页面
				"/db/*.do"};
		//下面是将两个数组合并
		String[] allUrls=new String[configUrls.length+fixedUrls.length];
		System.arraycopy(configUrls, 0, allUrls, 0, configUrls.length);
		System.arraycopy(fixedUrls, 0, allUrls, configUrls.length, fixedUrls.length);
		
		config.antMatchers(allUrls).authenticated();//匹配到的这个路径，只用正常登录就可以访问
	}

}
