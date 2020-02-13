<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../common/common.jsp"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>弹窗</title>
    <link href="<%=rootPath %>/js/map/CSS/bootstrap.css" rel="stylesheet" />
    <link href="<%=rootPath %>/js/map/Scripts/plugins/bootstraptable/bootstrap-table.css" rel="stylesheet" />
    <script src="<%=rootPath %>/js/map/Scripts/jquery-1.11.3.js"></script>
	<script src="<%=rootPath %>/js/map/Scripts/custom/coustomTool.js"></script>
	<script src="<%=rootPath %>/js/map/Scripts/plugins/bootstraptable/bootstrap-table.js"></script>
	<script src="<%=rootPath %>/js/map/Scripts/build.js"></script>
	<script src="<%=rootPath %>/js/map/Panel/infoWindow/window.js"></script>
    <link href="<%=rootPath %>/js/map/Panel/infoWindow/window.css" rel="stylesheet" />
</head>
<body>
    <div class="title">
        <b class="titleName">基本信息</b>


        <span class="closeTc"></span>
        <span class="xxtj"></span>
        <span class="jbxx active"></span>
    </div>
    <div class="tjb">
        <table id="jbxx">
            <tr>
                <td>机构名称</td>
                <td class="jyjgmc" colspan='3'></td>
            </tr>
            <tr>
            	<td>所在地市</td>
                <td class="szds"></td>
                <td>法人</td>
                <td class="fr"></td>
            </tr>
            <tr>
                <td>机构代码</td>
                <td class="zzjgdm"></td>
                <td>注册时间</td>
                <td class="zcsj"></td>
            </tr>
            <tr>
                <td>负责人</td>
                <td class="fzr"></td>
                <td>联系电话</td>
                <td class="fzrphone"></td>
            </tr>
            
            <tr>
                <td>计量编号</td>
                <td class="jlzsbh"></td>
                <td>有效期至</td>
                <td class="yxqz"></td>
            </tr>
            
            <tr>
                <td>详细地址</td>
                <td class="adress" colspan="3">
                </td>
            </tr>
        </table>
        <div id="xxtj" style="display:none;">
            <table id="xxtjTable">
            	<thead>
	                <tr>
	                    <td>线名称</td>
	                    <!-- <td>线类型</td> -->
	                    <td>当日检测总数</td>
	                    <td>合格率</td>
	                    <!--<td>工位机IP</td> -->
	                    <!-- <td>操作</td> -->
	                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</body>
</html>
