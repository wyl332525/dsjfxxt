var checksxqkWin=null;
var testDg=null;
$(function(){
	
	testDg=$("#gridTable1").datagrid({
		url:rootPath+'/dg/getData.do',
		//url:rootPath+'/dataGrid/getDataByParam.yt',
		pagination:true,  //是否启用分页
		rownumbers:true,  //是否显示列数
		singleSelect:true, //是否允许单选中行
		striped:true, 
		pageNumber:1,
		pageSize:15,
		pageList:[15,30,45],
		fit:true,
		fitColumns:true,
		nowarp:false,
		border:true,
		remoteSort:true,
		idField:'pkid',
		queryParams:{sqlKey:"com.kmzc.dao.dsj.Survey.getycsjxx",region:area},
		//queryParams:{configName:"Survey",sql:"getycsjxx",params:"String#$[1];;String#$[2]"},
		columns:[[
				 {title:'车辆ID',field:'pkid',hidden:true,width:80,align:'center'},
				 {title:'车牌号码',field:'carcardnumber',width:60,align:'center'},
				 {title:'燃油种类',field:'fueltype',width:60,align:'center'},
				 {title:'检测方法',field:'name',width:60,align:'center'},
		         {title:'检测站名称',field:'stationshortname',width:60,align:'center'},
		         {title:'检测时间',field:'checktime',width:80,align:'center'},
		         {title:'异常原因',field:'yyxx',width:120,align:'center'},
		         {title:'详情',field:'manage',width:60,align:'center',formatter:formatOper}
		        ]],
		        onLoadSuccess:function(data){
		        	
		        }
	});
	$("#gridTable1").datagrid('getPager').pagination({
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
	//window.open(rootPath + "/view/mainpage/visual2.do?carPkid="+pkid);
	window.open(rootPath + "/view/mainpage/ycsj2.do?pkid="+pkid);
}

function getycsj(){
	var carnumberstrat=$("#carnumberstrat").val();
	var carnumberend=$("#carnumber").val();
	var carcardnumber=carnumberstrat+carnumberend;
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
			sqlKey:"com.kmzc.dao.dsj.Survey.getycsjxx",
			carcardnumber:"%"+carcardnumber+"%",
			stationshortname:"%"+station+"%"
	}
	//testDg.datagrid("load",{configName:"Survey",sql:"getycsjxx",params: param});
	testDg.datagrid("load",param);
}
