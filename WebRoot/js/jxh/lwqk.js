var checksxqkWin=null;
$(function(){
	getsxqk();//联网情况
})

function getsxqk(){
	var lwObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.getzslwqk",areacode: areacode}).rows;
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
//	if (checksxqkWin == null || checksxqkWin == "") {
//		checksxqkWin = createTopWindow("checksxqkWin", "<iframe src='' id='checksxqkWinIframe' scrolling='no' frameborder='0'></iframe>",
//			{
//				title : "详情列表",
//				width : window.innerWidth - 600,
//				height : window.innerHeight - 200,
//				collapsible : false,
//				modal : true,
//				closed : true,
//				maximizable : false,
//				minimizable : false
//			});
//	}
//	window.top.$("#checksxqkWinIframe").data('openid', window); //把父窗口对象缓存起来
//	window.top.$("#checksxqkWinIframe").attr("src", rootPath + "/common/jxh/spjk.yt?stationid="+stationid);
//	checksxqkWin.window('open');
	parent.popWindow.init(850, 600, rootPath + "/view/jxh/spjk.do?stationid="+stationid);
}