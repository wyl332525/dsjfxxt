<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<%@ include file="../common/common.jsp"%>
<html>
  <head>
    <title><%=SysConfigCache.getSysConfig1("xt_title") %></title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<%
		String cdxNum=SysConfigCache.getSysConfig1("xt_common_pz");
		if(cdxNum==null || "".equals(cdxNum)){
			cdxNum="10";
		}
	 %>
	<script type="text/javascript">
		var cdxNum="<%=cdxNum%>";
	</script>
	<style type="text/css">
		.datagrid-row { 
		  height: 32px; 
		}  
		
		.cdTop{
			text-align:center;
			color:#ffffff;
			cursor:pointer;
			width:60px;
		}
		/*header*/
		.default_main_header{
			background-color:#0098b9;
			width:100%;height:100%;
			margin:0px;padding:0px;
		}
		.gray_main_header{
			background-color:#5786d1;
			width:100%;height:100%;
			margin:0px;padding:0px;
		}
		.black_main_header{
			background-color:#455d7a;
			width:100%;height:100%;
			margin:0px;padding:0px;
		}
		.metro_main_header{
			background-color:#eb851d;
			width:100%;height:100%;
			margin:0px;padding:0px;
		}
		.material_main_header{
			background-color:#068e9c;
			width:100%;height:100%;
			margin:0px;padding:0px;
		}
		.bootstrap_main_header{
			background-color:#1c84c6;
			width:100%;height:100%;
			margin:0px;padding:0px;
		}
		/*bottom*/
		.default_main_bottom{
			background-color:#0098b9;
			width:100%;height:100%;
			margin:0px;padding:0px;
		}
		.gray_main_bottom{
			background-color:#0fccdd;
			width:100%;height:100%;
			margin:0px;padding:0px;
		}
		.black_main_bottom{
			background-color:#455d7a;
			width:100%;height:100%;
			margin:0px;padding:0px;
		}
		.metro_main_bottom{
			background-color:#eb851d;
			width:100%;height:100%;
			margin:0px;padding:0px;
		}
		.material_main_bottom{
			background-color:#068e9c;
			width:100%;height:100%;
			margin:0px;padding:0px;
		}
		.bootstrap_main_bottom{
			background-color:#1c84c6;
			width:100%;height:100%;
			margin:0px;padding:0px;
		}
		/*更改左侧菜单高度*/
		.datagrid-btable tr{
			height: 45px;
		}
		.panel-title{
			height: 30px;
			line-height: 30px;
		}
		.panel-header{
			height: 30px;
			line-height: 30px;
		}
		/*改变页面右侧头部样式*/
		#centermenu .tabs{
			height: 28px!important;
			border-bottom: 2px solid #b5cce5; 
		}
		#centermenu .tabs>li>.tabs-inner{
			margin-top: 3px;
			height: 24px!important;
			line-height: 23px!important;
			border-bottom: 2px solid #b5cce5;
			color: #0061be;
    	background-color: #b5cce5;
      background: -webkit-gradient(linear, 0 100%, 0 0, from(#b5cce5), to(#b5cce5));
      background: -webkit-linear-gradient(#b5cce5 0%, #b5cce5 100%);
      background: -moz-linear-gradient(#b5cce5 0%, #b5cce5 100%);
      background: -o-linear-gradient(#b5cce5 0%, #b5cce5 100%);
      background: linear-gradient(#b5cce5 0%, #b5cce5 100%);
     
      padding-right: 10px;
      padding-left: 2px;
		}
		#centermenu .tabs>li>.tabs-inner>.tabs-title{
			font-size: 14px!important;
		}
		/*顶部标签页样式*/
		#topCDtd table tbody tr:first-child{
			display: none;
		}
		#topLogoTd{
			width: 420px!important;
		}
		#topCDtd table tbody td{
	    color: #bfd3ef;
	    display: block;
	    font-size: 1.2rem;
	    font-weight: bold;
	    float: left;
	    width: 6rem;
	    height: 3rem;
	    line-height: 3rem;
	    text-align: center;
	    background: url(<%=rootPath %>/img/main/yewuchuli_default.png) no-repeat 0.2rem 0.1rem;
	 		background-size:6.1rem 2.9rem;
	    margin-right: 0.8rem;
	    padding-right: 0.2rem;
	    padding-top: 0.15rem;
	    cursor: pointer;
	    margin-top: 0.15rem;
		}
		.topCDtdClick{
		  background: url(<%=rootPath %>/img/main/zonghejianguan_press.png) no-repeat 0.2rem 0.1rem!important;
		  background-size:6.1rem 2.9rem!important;
      color: #3b80d9!important;
		}
		#topCDtd table tbody td:last-child{
			background: url(<%=rootPath %>/img/main/yewuchuli_default.png) no-repeat 12rem 12rem;
		}
		/*左侧菜单栏样式*/
		.accordion .accordion-header{
			background-color: #f7f6f6;
			
		}
		.accordion .accordion-header-selected{
			background-color: #f7f6f6;
			
		}
		.accordion .accordion-header-selected .panel-title{
			color: #0061be;
		}
		.datagrid-btable>tbody>tr>td:nth-of-type(4){
			color: #616161;
		}
		.datagrid-btable>tbody>tr>td:nth-of-type(3) .datagrid-cell{
			visibility: hidden;
		}
		/*弹窗样式*/
		.window{
			padding: 0px!important;
			border: none;
		}
		.window>.panel-header {
	    height: 28px!important;
	    border: none!important;
	    padding: 0px;
	    background-color: #6792D6;
		}
		.window>.panel-header .panel-tool{
			position: absolute;
			top: 17px!important;
		  right: 18px!important;
		}
		.window>.panel-header>.panel-title{
			padding-left:2%;
			color: #FFFFFF;
			line-height: 24px;
		}
	</style>
	<%
		String cdPkid=request.getParameter("pkid");
		if(cdPkid==null){cdPkid="";}
		String alertInfo=request.getParameter("info");//登录成功，但是有提示信息
		if(alertInfo==null){
			alertInfo="";
		}else{
			alertInfo=new String(alertInfo.getBytes("ISO-8859-1"),"UTF-8");
		}
	 %>
	<script type="text/javascript">
	var cdPkid="<%=cdPkid%>";
	var alertInfo="<%=alertInfo%>";//登录成功，但是有提示信息
	var dhsj=400;//动画显示的时间
	var topCD="<table style='float:right;'><tr><td class='cdTop' onclick=topCd('TOP_HOME')><img src='<%=rootPath %>/img/main/mainIcon/gis.png'/></td>";
	//var topCDWord="<tr><td class='cdTop' onclick=topCd('TOP_HOME')>首页</td>";
	var topCDWord="<tr><td class='cdTop' onclick=topCd('TOP_HOME')>综合监管</td>";
	var cdInfo=null;//菜单对象信息
	var chatWs=null;//websocket对象
	var wdxxNum=0;//非即时信息未读的数量
	var isJsxxNum=0;//即时信息未阅读的数量
	(function($) {

    $.fn.fontFlex = function(min, max, mid) {

        var $this = this;

        $(window).resize(function() {

            var size = window.innerWidth / mid;

            if (size < min) size = min;
            if (size > max) size = max;

            $this.css('font-size', size + 'px');

        }).trigger('resize');
    };
	
	})(jQuery);
	$('html').fontFlex(12, 20, 114);
	
	$.ajax({
		url:rootPath+"/login/getCd.yt",
		async:false,type:"post",dataType:"json",
		success:function(data){	
			cdInfo=data;
		},
		error:function(data){
			$.messager.alert("错误提示：","加载菜单时出现未知错误！！");
		}
	});
	
	/*顶级菜单单击事件，加载该顶级菜单对应的子菜单*/
	 function topCd(pkid){
	 	if("TOP_HOME"==pkid){
	 		cdxClick("main_cd_cdx","main_cd_cdx",'/common/main/home.yt');
	 		isUpdateXtfg="0";
	 		fullScreen(true);
	 	}else{
	 		showTopCd(pkid);
	 	}
	 }
	 /*加载显示顶级菜单对应的子菜单*/
	 function showTopCd(pkid){
	 	clearCd();
	 	for(var i=0;i<cdInfo.length;i++){
	 		if(pkid==cdInfo[i]["pkid"]){
				var m=cdInfo[i];
				var children2=m["children2"];
				var children1=m["children1"];
				if(children2!=null){
					//for(var c2 in children2){
						//$("#main_cd_div").accordion("add",{
							//title: children2[c2]["cdmc"],
							//content: "<div id='cd_grid_"+children2[c2]["pkid"]+"'></div>",
							//selected: true
						//});
						//if(children2[c2]["children"]!=null && children2[c2]["pkid"]!=null){
						//	getCdxContent(children2[c2]["children"],children2[c2]["pkid"]);
						//}
					//}
					for(var j=0;j<children2.length;j++){
						if(j==0){
							$("#main_cd_div").accordion("add",{
								title: children2[j]["cdmc"],
								content: "<div id='cd_grid_"+children2[j]["pkid"]+"'></div>",
								selected: true
							});
						}else{
							$("#main_cd_div").accordion("add",{
								title: children2[j]["cdmc"],
								content: "<div id='cd_grid_"+children2[j]["pkid"]+"'></div>",
								selected: false
							});
						}
						
						if(children2[j]["children"]!=null && children2[j]["pkid"]!=null){
							getCdxContent(children2[j]["children"],children2[j]["pkid"]);
						}
					}
				}
				
				if(children1!=null){
					$("#main_cd_div").accordion("add",{
						title: m["cdmc"],
						content: "<div id='cd_grid_"+m["pkid"]+"'></div>",
						selected: true
					});
					getCdxContent(children1,m["pkid"]);
				}
				break;
			}
		}
	 }
	 //根据菜单项数组，组织菜单项内容
	 function getCdxContent(cdxData,pkid){
	 	var cdDatas=new Array();
	 	for(var i=0;i<cdxData.length;i++){
	 		var cdx=cdxData[i];
	 		var cdImg="";
	 		if(cdx.cdtb!=null && cdx.cdtb!=""){
	 			cdImg="<img src='<%=rootPath %>/xtfg/<%=xtfg %>/img/"+cdx.cdtb+"'/>"
	 		}
	 		cdDatas[i]={pkid:cdx.pkid,cdlj:cdx.cdlj,cdtb:cdImg,cdmc:cdx.cdmc};
	 	}
	 	$("#cd_grid_"+pkid).datagrid({
			pagination:false,rownumbers:false,
			singleSelect:true,showHeader:false,striped:false,width:"100%",
			fit:true,//为true时铺满他的父窗口或浏览器
			nowarp:false,border:false,
			autoRowHeight:true,remoteSort:false,
			idField:'pkid',data:cdDatas,
			columns:[[
			         {title:'菜单id',field:'pkid',hidden:true},
			         {title:'菜单路径',field:'cdlj',hidden:true},
			         {title:'信息标题',field:'cdtb',width:27,styler:function(){return 'border:0;';}},
			         {title:'菜单名称',align:"left",field:'cdmc',width:200,styler:function(){return 'border:0;';}}
			        ]],
			onClickRow:function(rowIndex,rowData){
				cdxClick(rowData.pkid,rowData.cdmc,rowData.cdlj);
				$("#cd_grid_"+pkid).datagrid("unselectRow",rowIndex);
			}        
	 	});
	 }
	 //清空已经加载的菜单数据
	 function clearCd(){
	 	var panels=$("#main_cd_div").accordion("panels");
	 	for(var i=panels.length-1;i>=0;i--){
	 		$("#main_cd_div").accordion("remove",i);
	 	}
	 }
	 var cdxOpends={};//已经打开的菜单项，
	 //菜单项点击事件
	 function cdxClick(pkid,cdmc,cdlj){
	 	if($("#centermenu").tabs('exists',cdmc)){
			$('#centermenu').tabs('select',cdmc);
		}else{
			$('#centermenu').tabs('add',{
				title:cdmc,
				fit:true,
				closable:true,
				content:"<iframe src="+rootPath+"/"+cdlj+" width='100%' height='99.2%' style='overflow:auto;border:0px;padding:0px;margin:0px;'/>"
			});
		}
	 }
	 //处理已经打开的菜单项，如果已经超出最大的菜单允许值，则自动关闭最不长用的菜单
	 function dealOpendCdx(cdmc){
	 	cdxOpends[cdmc]=new Date().getTime();
	 	var nowNum=0;//当前已经打开的菜单的数量
	 	var closeCdx="";//准备关闭的菜单项
	 	var colseTime=0;//准备关闭的菜单项的最后访问的时间戳
	 	for(var cdx in cdxOpends){
	 		nowNum++;
	 		if(colseTime>cdxOpends[cdx] || colseTime==0){//如果时间戳大于当前的菜单项的时间戳，则说明当前菜单项更早时间没有使用，则准备关闭当前的菜单项
	 			closeCdx=cdx;
	 			colseTime=cdxOpends[cdx];
	 		}
	 	}
	 	//如果当前打开的菜单数量大于允许的菜单项，则执行关闭最不常使用的菜单。
	 	if(nowNum>cdxNum){
	 		$("#centermenu").tabs('close',closeCdx);
	 		delete cdxOpends[closeCdx];
	 	}
	 	
	 }
	function mrjzcd(){
	   	topCd("sjgl");
	   	cdxClick("jcbggl_zxd","检测数据查询","common/jcsjgl/jcbggl.yt");
	}
	//信息窗口
	var myXxWin=null;
	//屏幕的宽和高
	var topWidth=1366;
	var topHeight=768;
	 //加载系统顶级菜单
	$("document").ready(function(){
		mrjzcd();
		topWidth=$(window).width();
		topHeight=$(window).height();
		//设置顶级菜单的总宽度
		$("#topCDtd").css("width",topWidth-$("#topLogoTd").width()-$("#topXxTd").width()-20);
		chatWs=getWebsocket();
		chatWs.onopen=wsOnOpen;
		chatWs.onclose=wsOnClose;
		chatWs.onmessage=wsOnMessage;
		
		if(alertInfo!=null && alertInfo!=""){
			$.messager.alert("温馨提示：",alertInfo);
		}
		//选中菜单选项卡，需要执行的函数
		$('#centermenu').tabs({ 
		    onSelect:function(cdmc,index){    
		        dealOpendCdx(cdmc); 
		    }    
		});  
		
		for(var i=0;i<cdInfo.length;i++){
			var m=cdInfo[i];
			if(m["cdtb"]==null || ""==m["cdtb"]){
				topCD+="<td class='cdTop' onclick=topCd('"+m["pkid"]+"')></td>";
			}else{
				topCD+="<td class='cdTop' onclick=topCd('"+m["pkid"]+"')><img src='<%=rootPath %>/img/main/mainIcon/"+m["cdtb"]+"'/></td>";
			}
			topCDWord+="<td class='cdTop' onclick=topCd('"+m["pkid"]+"')>"+m["cdmc"]+"</td>";
		}
		//添加上退出按钮 
		topCD+="<td class='cdTop' onclick='tcMain();'><img src='<%=rootPath %>/img/main/mainIcon/tc.png'/></td>";
		topCDWord+="<td class='cdTop' onclick='tcMain();'>退出</td>";
		topCD+="</tr>"+topCDWord+"</tr></table>";
		//alert(topCD)
		$("#topCDtd").append(topCD);
		if(cdPkid!=""){
			topCd(cdPkid);
		}
		myXxWin=createTopWindow("myXxWin","<iframe src='"+rootPath+"/common/xx/xxzy.yt' id='myXxWinIframe' scrolling='no' frameborder='0'></iframe>",
			{title:"信息管理窗口",width:topWidth-100, height:topHeight-80,modal:true,closed:true,maximizable:false,minimizable:false,
			onBeforeClose:function(){
				loadXxNum();//加载未阅读信息数据
				if(isJsxxNum>0){
					showMyXx();
					//$.messager.show({
					//	title:'信息提示',
					//	msg:'您有即时阅读信息未查看，不能关闭信息查看窗口！',
					//	showType:'slide'
					//});
					$.messager.alert("信息提示：","您有即时阅读信息未查看，不能关闭信息查看窗口！");
					return false;
				}else{
					return true;
				}
			}});
		loadXxNum();//加载未阅读信息数据
		if(isJsxxNum>0){
		showMyXx();
		}
		xxAnim();//启动信息闪动，动画
		$(".cdTop").mouseover(function(){
			$(this).css({filter:"Alpha(opacity=80)",opacity:0.8});
		}).mouseout(function(){
			$(this).css({filter:"Alpha(opacity=100)",opacity:1});
		});
	});
	//加载未阅读信息数据
	function loadXxNum(){
		var xxInfoObj=loadDatasAjax({configName:"common",sql:"main_cxxx_num",params:"String#"+userId});
		if(xxInfoObj.total>0){
			var xxNum=xxInfoObj["rows"][0];
			if(xxNum!=null){
				var pt=xxNum["ptxx"];
				var js=xxNum["jsxx"]
				wdxxNum=((pt==null||pt=="" || pt=="null")?0:Number(pt));//非即时信息未读的数量
				isJsxxNum=((js==null||js=="" ||pt=="null")?0:Number(js));//即时信息未阅读的数量
			}
		}else{
			wdxxNum=0;//非即时信息未读的数量
			isJsxxNum=0;//即时信息未阅读的数量
		}
		var all=wdxxNum+isJsxxNum;
		$("#xxNumSpan").html("("+all+")");
		$("#xxNumA").attr("alt","您有 "+all+" 条信息未读！");
	}
	//显示我的信息窗口
	function showMyXx(){ 
		myXxWin.window('open');
		if((wdxxNum+isJsxxNum)>0){//此时说明有未阅读的信息，需要信息页面重新刷新一下，获取到新的信息
			document.getElementById('myXxWinIframe').contentWindow.refreshXx();
		}
	}
	//全屏操作falg为true全屏，否则恢复（也就是不全屏）
	function fullScreen(flag){
		if(flag==true){
			$("#mainBodyLayout").layout("expand","west");//先把最左边的面板给展开，因为如果是折叠的话，会有个竖条
			$(".layout-panel-north").hide();
			$(".layout-panel-west").hide();
			$(".layout-expand-west").hide();
			$(".layout-panel-south").hide();
			$("#centermenu").tabs("hideHeader");
			$("#mainBodyLayout").layout("resize");
		}else{
			$(".layout-panel-north").show();
			$(".layout-panel-west").show();
			$(".layout-panel-south").show();
			$("#centermenu").tabs("showHeader");
			$("#mainBodyLayout").layout("resize");
		}
	}
	//从home页面调用的函数，如果cdId为空，则恢复原来的状态，否则重新加载菜单。isUpdateXtfg是否更新了系统风格，如果更新，则刷新当天页面
	var isUpdateXtfg="0";
	function homeReturn(cdId){
		if(isUpdateXtfg=="1"){//isRefresh是否更新了系统风格，如果更新，则刷新当天页面
			if(cdId!=null && cdId!=""){//如果菜单id不等于空，就重新加载菜单
				var href=location.href;
				var argIndex=href.indexOf("?pkid=");
				if(argIndex>0){
					location.href=href.substring(0,argIndex)+"?pkid="+cdId;
				}else{
					location.href=href+"?pkid="+cdId;
				}
			}else{
				location.reload(); 
			}
		}else{
			if(cdId!=null && cdId!=""){//如果菜单id不等于空，就重新加载菜单，否则只用关闭主菜单的选项卡就可以了
				//关闭所有的tabs
				while($("#centermenu").tabs("exists",0)){
					$("#centermenu").tabs("close",0);
				}
				cdxOpends={};
				//初始化
				topCd(cdId);
			}else{//否则只用关闭 主菜单就可以了
				$("#centermenu").tabs("close","main_cd_cdx");
			}
			//恢复原来的布局
			fullScreen(false);
		}
	}
	
	function wsOnOpen(){
		//webSocket打开时执行的函数
	}
	function wsOnClose(){
		//webSocket关闭时执行的函数
	}
	function wsOnMessage(obj){
		var info=eval("["+obj.data+"]")[0];
		if(info.type=="jsxx"){
			if(info.xxlb=="00"){//即时阅读
				showMyXx();
				isJsxxNum=isJsxxNum+1;//即时信息未阅读的数量
			}else{
				wdxxNum=wdxxNum+1;//非即时信息未读的数量
			}
			var all=wdxxNum+isJsxxNum;
			$("#xxNumSpan").html("("+all+")");
			$("#xxNumA").attr("alt","您有 "+all+" 条信息未读！");
		}
		/*
		$.messager.show({
						title:'提示信息',
						msg:'收到的信息是：'+obj.data,
						showType:'show'
				});
				*/
	}
	//webSocket 向后台发送信息
	function sendMessage(info){
		if(chatWs.readyState !== 1){
			chatWs.close();
			chatWs=getWebsocket();
			setTimeout(function() {
	            sendMessage();
	        }, 250);
		}else{
			chatWs.send(info);
		}
	}
	
	function getWebsocket(){
		var url="/chat?"+userId
		var ws;
		if (window.location.protocol == 'http:') {
	       host='ws://' + window.location.host +rootPath+ url;
	    } else {
	       host='wss://' + window.location.host +rootPath+ url;
	    }
	
		 if ('WebSocket' in window) {
	         ws= new WebSocket(host);
	     } else if ('MozWebSocket' in window) {
	         ws= new MozWebSocket(host);
	     } else {
	         ws=null;
	     }
	     return ws;
	}
	//信息图标动画
	function xxAnim(){
		window.setInterval(function() {
			if(wdxxNum>0){//如果未读信息数量大于0，则进行闪动提示
				$("#xx_img").animate({
				    opacity: 'toggle'
				}, "slow");
			}
		}, 800);
	}
	
	//系统退出
	function tcMain(){
		$.messager.confirm("退出提醒：", "您确定要退出系统吗？", function(r) {
			if(r==true){
				$.ajax({
					url:rootPath+"/logout/logout.yt",
					data:{},
					async:false,type:"post",
					success:function(){
						window.top.location=rootPath+"/login/login.yt?alertInfo=1";
					},
					error:function(e){
						$.messager.alert("出错提示：","退出系统时出现未知错误！");
					}
				});
			}
		});
	}
	
	
//	头部导航栏增加点击效果
	$(function  () {
		$(".window .panel-header").draggable();
		$('#topCDtd table tbody td').click(
		function () {
			$('#topCDtd table tbody td').removeClass('topCDtdClick');
			$(this).addClass('topCDtdClick');
			$('#topCDtd table tbody td:last-child').removeClass('topCDtdClick');
			$('.datagrid-row').click(
		function () {
			$('.datagrid-row').children('td:nth-of-type(3)').children('.datagrid-cell').css('visibility','hidden');
			$('.datagrid-cell').css('color','#616161');
			$(this).children('td:nth-of-type(3)').children('.datagrid-cell').css('visibility','visible');
			$(this).children('td').children('.datagrid-cell').css('color','#6b9dd4');
			
		}
	);
		}
	);
		
	}
	);
	</script>
	
  </head>
  <body id="mainBodyLayout" class="easyui-layout" style="padding:0px;margin:0px;">
    	<div id="title" data-options="region:'north',split:false" class="<%=xtfg %>_main_header" style="height:70px;padding:0px;margin:0px;">
    		<table style="width:100%;height:100%;border:0;padding: 0px;margin: 0px;border-collapse: collapse;">
    			<tr>
    				<td id='topLogoTd' style='padding-left:20px;width:520px;'><img src="<%=rootPath %>/img/main/logo.png"/></td>
    				<td id='topXxTd' style='text-align:center;width:130px;color:#ffffff;'>
    						<table>
    							<tr>
    								<td colspan="2"><%=userName%>,欢迎您！</td>
    							</tr>
    							<tr onclick="showMyXx();" style="cursor: pointer;">
    								<td style='width:17px;'><img id='xx_img' src="<%=rootPath %>/img/main/mainIcon/xx.png" style='margin-bottom:-2px;margin-left:2px;'/></td>
    								<td><a href='javascript:showMyXx();' id='xxNumA'  style="color:#ffffff;cursor: pointer;text-align:left;">我的信息<span id='xxNumSpan'></span></a></td>
    							</tr>
    						</table>
    				</td>
    				<td id="topCDtd" style="text-align:right;margin:0px;">
    					
    				</td>
    			</tr>
    		</table>
    		
    	</div>   
	    <div id="westmenu" data-options="region:'west',title:'  功能菜单',split:false" style="width:230px;padding:0px;overflow:hidden">
	    	<div style="height:100%;width:100%;marging:0px;" class="easyui-accordion" id="main_cd_div">
				<!--<table style='border-collapse:collapse;width:100%;border:0;text-align:left;' id="menuTable"></table>  -->
			</div>
		</div>  

	   <div region="center"  style="overflow:hidden;"> 
	   		<div id="centermenu"  class="easyui-tabs" fit="true" border="false">  </div>
	    </div> 
	   <!--  
	    <div id='footer' data-options="region:'south',split:false" class="<%=xtfg %>_main_bottom" style="height:35px;">
	   		<table style="width:99%;height:100%">
	   			<tr>
	   				<td><a style="margin-left:20px;" href='<%=rootPath%>/downLoad/czsc.doc'>操作手册</a></td>
	   				<td style="text-align:center;">技术支持：中科宇图科技股份有限公司</td>
	   				<td style="text-align:right;margin-right:20px;"></td>
	   			</tr>
	   		</table>
	   	</div>-->
  </body>
</html>
