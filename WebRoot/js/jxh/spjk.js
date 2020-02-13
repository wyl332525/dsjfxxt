var checksxqkWin = null;
$(function() {
	getsxqk(); //联网情况
})

function getsxqk() {
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxhnew.getsxtlwqk",
			belongtostation:stationid
		}
	var lwObj = loadDatasAjax(args1).rows;
	
	/*var lwObj = loadDatasAjax({
		configName : "jxhnew",
		sql : "getsxtlwqk",
		params : "String#" + stationid
	}).rows;*/
	var lwhtml = "";
	for (var i = 0; i < lwObj.length; i++) {

		if (lwObj[i].cameratype == "1") {
			lwhtml += "<tr><td width='45%'>" + lwObj[i].linename + "(前置摄像头)";
			if (lwObj[i].camera1 == "1") {
				lwhtml += "<div class='lw'></div></td>";
			} else {
				lwhtml += "<div class='wlw'></div></td>";
			}
		}
		else if (lwObj[i].cameratype == "2") {
			lwhtml += "<td width='45%'>" + lwObj[i].linename + "(后置摄像头)";
			if (lwObj[i].camera2 == "1") {
				lwhtml += "<div class='lw'></div></td></tr>";
			} else {
				lwhtml += "<div class='wlw'></div></td></tr>";
			}
		}
	}
	$("#carTextTable").html(lwhtml);
}