<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <%@ include file="../common/common.jsp"%>
     <link rel="stylesheet" type="text/css" href="<%=rootPath%>/css/main.css">
    <link rel="stylesheet" type="text/css" href="<%=rootPath%>/css/initStyle.css">
    <script type="text/javascript" src="<%=rootPath %>/js/common/initStyle.js"></script>
     <script type="text/javascript" src="<%=rootPath %>/js/common/zkyt.fileupload.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/js/jxh/alarmInfo.js"></script>
    <title>查看报警详情</title>
    <%
    	String pkid = request.getParameter("pkid");
     %>
     <script type="text/javascript">
     	var pkid ='<%=pkid %>';
     </script>
  </head>
  
  <body>
  	<div style="width:100%;height:100%;">
  		<div id="queryPanel" class="easyui-panel" title="" style="width:100%;" data-options="iconCls:'icon-search',collapsible:true">
			<table style="width:100%;"> 
				<tr>
					<td style="text-align:right;width:20%;">检测站名称：</td>
					<td style="text-align:left;width:30%;" >
						<input class="easyui-textbox" id="jczjc" disabled="disabled" style='width:80%;'/>
					</td>
					<td style="text-align:right;width:15%;">检测线名称：</td>
					<td style="text-align:left;width:35%;" >
						<input class="easyui-textbox" id="jcxmc" disabled="disabled" style='width:70%;'/>
					</td>
				</tr>
				<tr>
					<td style="text-align:right;width:15%;">车牌号码：</td>
					<td style="text-align:left;width:35%;" id="tdCphm">
					</td>
					<td style="text-align:right;">车架号：</td>
					<td style="text-align:left;" >
						<input class="easyui-textbox" id="vin" disabled="disabled" style='width:70%;'/>
					</td>
				</tr>
				<tr>
					<td style="text-align:right;">录入人名称：</td>
					<td style="text-align:left;" >
						<input class="easyui-textbox" id="lrrmc" disabled="disabled" style='width:80%;'/>
					</td>
					<td style="text-align:right;">检测人名称：</td>
					<td style="text-align:left;" >
						<input class="easyui-textbox" id="jcrmc" disabled="disabled" style='width:70%;'/>
					</td>
				</tr>
				<tr>
					<td style="text-align:right;">驾驶人名称：</td>
					<td style="text-align:left;" >
						<input class="easyui-textbox" id="jsrmc" disabled="disabled" style='width:80%;'/>
					</td>
					<td style="text-align:right;">状态：</td>
					<td style="text-align:left;" >
						<input class="easyui-textbox" id="bj" disabled="disabled" style='width:70%;'/>
					</td>
				</tr>
				<tr>
					<td style="text-align:right;">检测方法：</td>
					<td style="text-align:left;" >
						<input class="easyui-textbox" id="jcff" disabled="disabled" style='width:80%;'/>
					</td>
					<td style="text-align:right;">检测完成时间：</td>
					<td style="text-align:left;" >
						<input class="easyui-textbox" id="jcwcsj" disabled="disabled" style='width:70%;'/>
					</td>
				</tr>
				<tr>
					<td style="text-align:right;">报警类别：</td>
					<td colspan="3" style="text-align:left;" >
						<input class="easyui-textbox" id="bjmc" disabled="disabled" style='width:89%;'/>
					</td>
				</tr>
				<tr>
					<td style="text-align:right;">报警说明：</td>
					<td colspan="3" style="text-align:left;" >
						<input class="easyui-textbox" labelPosition="top" disabled="disabled" id="bjsm" style='width:89%;height:70px;' multiline="true"/>
					</td>
				</tr>
			</table>
		</div>
  	</div>
  	<div id='div1' style='width:100%;text-align:center;margin-top: 20px;'>
  		<a id="zdyGrayButton" style="width:75px;" href="javascript:closeWin();" class="easyui-linkbutton">返   回</a>
  	</div>
  </body>
</html>
