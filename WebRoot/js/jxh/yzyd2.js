var checksxqkWin=null;
var testDg=null;
$(function(){
	//getsxqk();//联网情况
	
	testDg=$("#gridTable").datagrid({
		//url:rootPath+'/dataGrid/getDataByParam.yt',
		url:rootPath+'/dg/getData.do',
		pagination:true,  //是否启用分页
		rownumbers:true,  //是否显示列数
		singleSelect:true, //是否允许单选中行
		striped:true, 
		pageSize:15,
		pageList:[15,30,45],
		
		fit:true,
		fitColumns:true,
		nowarp:false,
		border:true,
		remoteSort:true,
		idField:'pkid',
		queryParams:{sqlKey:"com.kmzc.dao.dsj.Survey2.getStations",region:area},
		//queryParams:{configName:"Survey2",sql:"getStations",params:"String#$[1];;String#$[2]"},
		columns:[[
				 {title:'业务ID',field:'pkid',hidden:true,width:80,align:'center'},
				 {title:'检测站名称',field:'stationname',width:100,align:'center'},
				 {title:'检测站简称',field:'stationshortname',width:60,align:'center'},
				 {title:'所属州(市)',field:'area',width:60,align:'center'},
		         {title:'注册时间',field:'registdate',width:60,align:'center'},
		         {title:'地址',field:'stationaddress',width:100,align:'center'},
		         {title:'详情',field:'manage',width:80,align:'center',formatter:formatOper}
		        ]],
		        onLoadSuccess:function(data){
//		        	initStyle(data);//初始化样式
//		        	$('.lookButton').linkbutton({iconCls:'icon-search'});
//					$('#gridTable').datagrid('fixRowHeight');
		        }
	});
	$("#gridTable").datagrid('getPager').pagination({
		beforePageText:'第',
		afterPageText:'页	 共 {pages} 页',
		displayMsg:'当前显示 {from} - {to} 条记录          共 {total} 条记录',
	});
})


function formatOper(val,row,index){
	var html = "<div style='cursor:pointer;'onclick='toLook(\""+row.pkid+"\")' class='check'>查看</div>";
	return html;
}

function toLook(pkid){
	window.open(rootPath + "/view/mainpage/yzyd.do?stationPkid="+pkid);
}

function getyzyd(){
	var station=$("#stationname").val();
	/*var param="";
	if(carcardnumber==""||carcardnumber==null){
		param+="String#$[1]";
	}else{
		param+="String#"+"%"+carcardnumber+"%";
	}
	if(station==""||station==null){
		param+=";;"+"String#$[2]";
	}else{
		param+=";;"+"String#"+"%"+station+"%";
	}*/
	var param = {
			sqlKey:"com.kmzc.dao.dsj.Survey2.getStations",
			stationname:"%"+station+"%"
	}
	
	//testDg.datagrid("load",{configName:"Survey2",sql:"getStations",params: param});
	testDg.datagrid("load",param);
}