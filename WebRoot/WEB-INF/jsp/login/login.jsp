<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../common/common.jsp"%>
<% 
	String sfxyyzm=SysConfigCache.getSysConfig1("login_yzm");
	String sfsz = SysConfigCache.getSysConfig3("login_yzm");
	String zmlx = SysConfigCache.getSysConfig4("login_yzm");
	String display="1".equals(sfxyyzm)?"display":"none";
	String alertInfo=request.getParameter("alertInfo");//需要提示的信息
%>
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="renderer" content="webkit"> 
	<title><%=SysConfigCache.getSysConfig1("xt_title") %></title>
	<!--登录页css-->
	<link rel="stylesheet" href="<%=rootPath %>/css/login/login.css">
	<style type="text/css">
	.yzm{
		background: url("<%=rootPath %>/img/login/codeBox.png") no-repeat;
	}
	.loginBox{
		background: url("<%=rootPath %>/img/login/bg3.png") no-repeat;
	}
	.btnLogin{
		background: url("<%=rootPath %>/img/login/btnBg.png") no-repeat;
	}
	.smallCode{
		background: url("<%=rootPath %>/img/login/code.png") no-repeat;
	}
	</style>
	<script type="text/javascript">
		if(userId!=null && userId!="null" && userId!=""){
			alert("注意：本机已经用“"+userName+"”登录未退出，系统已强制退出，请刷新页面后重新登录。");
			<%
				if(session.getAttribute("userId")!=null){
					session.setAttribute("logoutWay", "本机另一账号登录被强制退出");
	    			session.invalidate();
	    		}
    		%>
		};
		var sfxyyzm="<%=sfxyyzm%>";
		var alertInfo="<%=alertInfo%>";
		var display = "<%=display%>";
		var sfsz = "<%=sfsz%>";
		var zmlx = "<%=zmlx%>";
	</script>
</head>
<body>
	<!-- 页首 -->
	<div id="header">
		<img src="<%=rootPath %>/img/login/logo.png">
	</div>
	<!-- 主体部分 -->
	<div id="main">
		<!--车体图-->
		<div class="imgBox">
			<img src="<%=rootPath %>/img/login/car.gif" alt="car">
		</div>
		<!--登录窗体-->
		<div class="loginBox">
			<div id="login">
				<p class="title lt">用户登录</p>
				<!--<i></i>-->
				<div class="tableBox">
					<table id="loginTable">
						<tr>
							<td>
								<input type="text" id="userId" placeholder="请输入用户名">
							</td>
						</tr>
						<tr>
							<td>
								<input type="password" id="password" placeholder="请输入密码">
							</td>
						</tr>
						 <tr>
							<td>
							    <div  style='display:<%=display %>'>
								<input class="verificationCode" id="jcaptcha" type="text" placeholder="请输入验证码">
								<span class="yzm" id="yzm" onclick="showYzm()" title="点击更换验证码"></span>
								</div>
							</td>
						</tr>  
					</table>
					<button id='dlBtn' class="btnLogin">登&nbsp;录</button>
				</div>
			</div>
			<!--二维码控件-->
			<div class="smallCode">
				<img class="small" src="<%=rootPath %>/img/login/code.png">
			</div>
			<!--二维码-->
			<div class="code">
				<img src="<%=rootPath %>/img/login/test.jpg">
			</div>
		</div>
	</div>
	<%  Cookie[] cookies=request.getCookies();//上次登录的用户名
      if(cookies!=null){
	      for(Cookie s:cookies){
	      	 if("userId".equals(s.getName())){
	      	 	%>
	      	 	<script type="text/javascript">
	      	 		$('#userId').val("<%=s.getValue()%>");
	      	 	</script>
	      	 	<%
	      	 	break;
	      	 }
	      } 	
	  }
    %>	
	<!-- 页尾 -->
	<div id="footer">
		<div class="footerBox">
			<div>版权所有：中科宇图科技股份有限公司</div>
			<p>适用于：<b>360浏览器</b>&nbsp;&nbsp;&nbsp;<span>IE9+</span></p>
		</div>
	</div>
	<!--jQuery-->
	<script src="<%=rootPath %>/js/jquery-1.11.3.js"></script>
	<!--登录页脚本-->
	<script src="<%=rootPath %>/js/login/login.js"></script>
</body>
</html>
