<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<%@ include file="../common/common.jsp"%>
<script type="text/javascript" src="<%=rootPath %>/js/main/home.js"></script>
<html>
  <head>    
    <title>桌面主页</title>
	<style type="text/css">
		.cdTop{
			text-align:center;
			padding-left:10px;
			padding-right:10px;
			color:#ffffff;
			cursor:pointer;
		}
	</style>
	
	<script type="text/javascript">
	var cdColm=2;//每行的个数，默认为2
	 $(document).ready(function(){
	 	var cdInfo=parent.cdInfo;
	 	//设置背景图片大小为全屏
	 	$("body").css({"background-size":window.top.topWidth+"px "+window.top.topHeight+"px"});
	 	//根据图标个数计算每行有几个，总图标个数/(（总高度-头的高度）/每个图标的高度135),最后+0.99是为了采用进1法
	 	cdColm=Math.floor(cdInfo.length/Math.floor((window.top.topHeight-$("#_topHeaderdiv").height())/135)+0.99);
	 	
	 	if(cdColm==0){
	 		cdColm=1;
	 	}
		var topCD="<table style='width:"+(cdColm*85)+"px'><tr>";
	 	var topCD2="<tr>";
	 	for(var i=0;i<cdInfo.length;i++){
			var m=cdInfo[i];
			if(m["cdtb"]==null || ""==m["cdtb"]){
				topCD+="<td class='cdTop' onclick=topCd('"+m["pkid"]+"')></td>";
			}else{
				topCD+="<td class='cdTop' onclick=topCd('"+m["pkid"]+"')><img style='width:80px;height:80px;margin-bottom:-6px;margin-top:15px;' src='<%=rootPath %>/img/main/homeIcon/"+m["cdtb"]+"'/></td>";
			}
			topCD2+="<td class='cdTop' onclick=topCd('"+m["pkid"]+"')>"+m["cdmc"]+"</td>";
			if((i+1)%cdColm==0){
				topCD+="</tr>"+topCD2+"</tr>";
				topCD2="<tr>";
			}
		}
		if(cdInfo.length%cdColm==0){
			topCD+="</table>";
		}else{
			topCD+="</tr>"+topCD2+"</tr></table>";
		}
		
	 	$("#_topCDdiv").append(topCD);
	 	
	 	$("#set_xtfg").combobox({onChange:function(newV,oldV){
				$("#xtfg_img").attr("src",rootPath+"/img/main/fgDemo/xt_"+newV+".png");//设置图表风格默认的示例图片
			}
		});
		$("#set_tbfg").combobox({onChange:function(newV,oldV){
				$("#tbfg_img").attr("src",rootPath+"/img/main/fgDemo/tb_"+newV+".png");//设置图表风格默认的示例图片
			}
		});
		
	});
	 //退出函数
	 function tcHome(){
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
	 //如果pkid(菜单id)为空，则恢复原来的状态，否则重新加载菜单。
	 function topCd(pkid){
	 	parent.homeReturn(pkid);
	 }
	 //返回函数
	 function fanhuiMain(){
	 	parent.homeReturn();
	 }
	 //更换皮肤
	function huanfuHome(){
		$("#set_xtfg").combobox("setValue",xtfg);//设置系统风格的默认值
		$("#set_tbfg").combobox("setValue",tbfg);//设置图表风格的默认值
		$("#xtfg_img").attr("src",rootPath+"/img/main/fgDemo/xt_"+xtfg+".png");//设置系统风格默认的示例图片
		$("#tbfg_img").attr("src",rootPath+"/img/main/fgDemo/tb_"+tbfg+".png");//设置图表风格默认的示例图片
		$("#ghpfWinDiv").window("open");
	}
	//保存皮肤
	function savePf(){
		var newXtfg=$("#set_xtfg").combobox("getValue");
		var newTbfg=$("#set_tbfg").combobox("getValue");
		if(newXtfg==xtfg && newTbfg==tbfg){
			$.messager.alert("温馨提示：","您没有更换系统风格选项，因为不用进行保存！");
		}else{
			$.messager.confirm("温馨提示：","您确定要设置新的系统/图表风格吗？注意：设置后会自动刷新系统。",function(r){
				if(r==true){
					var ret=operateDb({configName:"common",sql:"home_set_xtfg",params:"String#"+newXtfg+";;String#"+newTbfg+";;String#"+userId},1);
					if(ret==1){
						$.messager.alert("操作提示：","设置新风格成功！");
						xtfg=newXtfg;
						tbfg=newTbfg;
						$.ajax({//去后台更新session
							url:rootPath+"/session/set.yt",
							data:{xtfg:newXtfg,tbfg:newTbfg},
							async:false,type:"post",
							success:function(num){//成功后，刷新页面
								parent.isUpdateXtfg="1";
								window.location.reload();
							},
							error:function(e){
								
							}
						});
					}
				}
			});
		}
	}
	//平台桌面设置
	function shezhiHome(){
		$.messager.alert("","敬请期待，随后开发！！！");
	}
	//关闭更换皮肤窗口
	function colsePfWin(){
		$("#ghpfWinDiv").window("close");
	}
	</script>
  </head>
  
  <body style="background:url('<%=rootPath%>/xtfg/<%=xtfg%>/home_bg.png') no-repeat;">
    	<div id="_topHeaderdiv" style='weith:100%;'>
	    	<table style="width:100%;">
	    		<tr>
	    			<td id='homeLogoTd' style='padding-left:20px;width:520px;'><img src="<%=rootPath %>/img/main/logo.png"/></td>
	    			<td style='text-align:center;width:120px;color:#ffffff;'>
		    			<%=userName%>,欢迎您！
		    		</td>
	    			<td style='text-align:right;' id="mainCdTd" >
	    				<span id="fh_span" onclick="fanhuiMain();" style="cursor:pointer;color:#ffffff;font-weight: bolder;"><img id='xx_img' src="<%=rootPath %>/img/main/mainIcon/fh.png" style='margin-bottom:-2px;margin-right:3px;'/>返回</span>
	    				<span id="hf_span" onclick="shezhiHome();" style="cursor:pointer;color:#ffffff;font-weight: bolder;margin-left:20px;"><img id='xx_img' src="<%=rootPath %>/img/main/mainIcon/sz.png" style='margin-bottom:-2px;margin-right:3px;'/>设置</span>
		    			<span id="hf_span" onclick="huanfuHome();" style="cursor:pointer;color:#ffffff;font-weight: bolder;margin-left:20px;"><img id='xx_img' src="<%=rootPath %>/img/main/mainIcon/pf.png" style='margin-bottom:-4px;margin-right:3px;'/>换肤</span>
		    			<span id="tc_span" onclick="tcHome();" style="cursor:pointer;color:#ffffff;font-weight: bolder;margin-left:20px;margin-right:38px;"><img id='xx_img' src="<%=rootPath %>/img/main/mainIcon/tc.png" style='margin-bottom:-3px;margin-right:3px;'/>退出</span>
		    		</td>
	    		</tr>
	    	</table>
    	</div>
    	<div id="_topCDdiv">
    		
    	</div>
    	
    	<!-- 换肤 窗口 -->
	   	<div id="ghpfWinDiv"  class="easyui-window" title="更换系统皮肤" style="width:820px;height:430px"   
        	data-options="iconCls:'icon-edit',modal:true,collapsible:false,minimizable:false,closed:true">
	   		<table style="text-align:center">
	   			<tr>
	   				<td>
	   					系统风格:
	   					<select id='set_xtfg' class="easyui-combobox">
    						<option value='default'> 默认 </option>
    						<option value='gray'> 灰色 </option>
    						<option value='black'> 黑色 </option>
    						<option value='metro'> 橙色 </option>
    						<option value='material'> 深绿色 </option>
    						<option value='bootstrap'> 蓝色 </option>
    					</select>
	   				</td>
	   				<td>
	   					图标风格:
	   					<select id='set_tbfg' class="easyui-combobox">
    						<option value='default'> 默认 </option>
    						<option value='vintage'> 葡萄 </option>
    						<option value='dark'> 酒 </option>
    						<option value='macarons'> 马卡龙饼干 </option>
    						<option value='roma'> 罗马 </option>
    						<option value='infographic'> 图表 </option>
    					</select>
	   				</td>
	   			</tr>
	   			<tr>
	   				<td>
	   					<img onClick="showZkytImg($('#xtfg_img').attr('src'),1)" id="xtfg_img" src="" style="width:470px;height:300px;border:1px solid;"/>
	   				</td>
	   				<td>
	   					<img onClick="showZkytImg($(this).attr('src'),1)" id="tbfg_img" src="" style="width:320px;height:300px;border:1px solid;"/>
	   				</td>
	   			</tr>
	   			<tr>
	   				<td colspan="2">
	   					<a class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="savePf();">设置</a>
	   					<a class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="colsePfWin();">关闭</a>
	   				</td>
	   			</tr>
	   		</table>
	   	</div>
  </body>
</html>
