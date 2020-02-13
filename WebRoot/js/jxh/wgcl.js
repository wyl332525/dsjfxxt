var checksxqkWin=null;
var testDg1=null;
$(function(){
	//getsxqk();//联网情况
	
	
	testDg1=$("#gridTable").datagrid({
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
		queryParams:{sqlKey:"com.kmzc.dao.dsj.Survey.getwgcl",region:area},
		columns:[[
				 {title:'业务ID',field:'pkid',hidden:true,width:80,align:'center'},
				 {title:'车牌号码',field:'wgcphm',width:80,align:'center'},
				 {title:'违规时间',field:'wgsj',width:80,align:'center'},
		         {title:'检测站名称',field:'stationshortname',width:80,align:'center'},
		         {title:'违规类型',field:'wglx',width:80,align:'center'},
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
	//window.open(rootPath + "/common/jxh/visual4.yt?wgpkid="+pkid);
	var okUrl=rootPath + "/view/mainpage/visual4.do?wgpkid="+pkid;
//	window.open(okUrl,"","fullscreen=no,width="+ window.screen.width+",height="+ window.screen.height+",top=0,left=0,toolbar=no,menubar=no,resizable=yes,location=no,scrollbars=no,status=no");
//	window.open('','_parent','');
//	window.close();
	parent.ymtz(okUrl);
}
function getwgcl(){
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
	}
	testDg1.datagrid("load",{configName:"Survey",sql:"getwgcl",params: param});*/
	var param = {
			sqlKey:"com.kmzc.dao.dsj.Survey.getwgcl",
			wgcphm:"%"+carcardnumber+"%",
			stationshortname:"%"+station+"%",
	}
	testDg1.datagrid("load",param);
}

function getsxqk(){
	var lwObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.getzslwqk",configName:"jxhnew",areacode: areacode}).rows;
	var lwhtml="";
	for(var i=0;i<lwObj.length;i++){
		lwhtml += "<tr><td width='23%' onclick='tosxqkList("+lwObj[i].pkid+")'>"+lwObj[i].stationshortname+"";
		if(lwObj[i].sj>30){
			lwhtml+="<div class='wlw'></div></td>";
		}else{
			lwhtml+="<div class='lw'></div></td>";
		}
		if(i<lwObj.length-1){
			i++;
		}else{
			break;
		}
		lwhtml += "<td width='23%' onclick='tosxqkList("+lwObj[i].pkid+")'>"+lwObj[i].stationshortname+"";
		if(lwObj[i].sj>30){
			lwhtml+="<div class='wlw'></div></td>";
		}else{
			lwhtml+="<div class='lw'></div></td>";
		}
		if(i<lwObj.length-1){
			i++;
		}else{
			break;
		}
		lwhtml += "<td width='23%' onclick='tosxqkList("+lwObj[i].pkid+")'>"+lwObj[i].stationshortname+"";
		if(lwObj[i].sj>30){
			lwhtml+="<div class='wlw'></div></td></tr>";
		}else{
			lwhtml+="<div class='lw'></div></td></tr>";
		}
	}
	$("#carTextTable").html(lwhtml);
}


//联网情况详情
function tosxqkList(stationid) {
//	parent.popWindow.init(850, 600, rootPath + "/common/jxh/spjk.yt?stationid="+stationid);
	
}