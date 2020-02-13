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
		pageNumber:1,
		pageSize:15,
		pageList:[15,30,45],
		fit:true,
		fitColumns:true,
		nowarp:false,
		border:true,
		remoteSort:true,
		idField:'pkid',
		queryParams:{sqlKey:"com.kmzc.dao.dsj.Survey2.getCars",rownum:100},
		//queryParams:{configName:"Survey2",sql:"getCars",params:"String#"+100+";;String#$[2]"},
		columns:[[
				 {title:'业务ID',field:'pkid',hidden:true,width:80,align:'center'},
				 {title:'车牌号码',field:'carcardnumber',width:80,align:'center'},
				 {title:'VIN',field:'vin',width:80,align:'center'},
				 {title:'燃料种类',field:'rlzl',width:80,align:'center'},
		         {title:'车辆类型',field:'cllx',width:80,align:'center'},
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
	window.open(rootPath + "/view/mainpage/visual2.do?carPkid="+pkid);
}

function getycyd(){
	var carnumberstrat=$("#carnumberstrat").val();
	var carnumberend=$("#carnumber").val();
	var carcardnumber=carnumberstrat+carnumberend;
	/*var param="";
	param+="String#$[1]";
	if(carcardnumber==""||carcardnumber==null){
		param+=";;String#$[2]";
	}else{
		param+=";;String#"+"%"+carcardnumber+"%";
	}
	testDg.datagrid("load",{configName:"Survey2",sql:"getCars",params: param});*/
	
	var param = {
			sqlKey:"com.kmzc.dao.dsj.Survey2.getCars",
			carcardnumber:"%"+carcardnumber+"%"
	}
	
	testDg.datagrid("load",param);
}
