var checkCarList=null;
var check = "";
$(function(){

	checkCarList=window.parent.checkCarList;
	if(checkCarList.rows.length>0){
		makeCheckListTable(checkCarList);
		
	}
})


//组装车辆检测信息表格
function makeCheckListTable(data) {
	var htmlsdb = "<tr><td width='20%'>检测时间</td><td width='20%'>检测方法</td><td width='25%'>低怠速CO</td><td width='20%'>低怠速HC</td><td width='15%'>高怠速CO</td><td width='15%'>高怠速HC</td></tr>";
	var htmlswt = "<tr><td width='20%'>检测时间</td><td width='20%'>检测方法</td><td width='25%'>5025工况CO检测值</td><td width='25%'>5025工况HC检测值</td><td width='25%'>5025工况NO检测值</td><td width='25%'>2540工况CO检测值</td><td width='25%'>2540工况HC检测值</td><td width='25%'>2540工况NO检测值</td></tr>";
	var htmlsld = "<tr><td width='20%'>检测时间</td><td width='20%'>检测方法</td><td width='25%'>100检测值</td><td width='20%'>90检测值</td><td width='15%'>80检测值</td><td width='15%'>轮边功率</td></tr>";
	var htmlstg = "<tr><td width='20%'>检测时间</td><td width='20%'>检测方法</td><td width='25%'>第一次烟度值</td><td width='20%'>第二次烟度值</td><td width='15%'>第三次烟度值</td><td width='15%'>平均值</td></tr>";
	var htmlsig = "<tr><td width='20%'>检测时间</td><td width='20%'>检测方法</td><td width='25%'>CO检测值</td><td width='20%'>HC检测值</td><td width='15%'>NO检测值</td></tr>";
	if(data.rows.length >0){
		for(var j=0;j<data.rows.length;j++){
			var businessid = data.rows[j].pkid;
			var checkmethod = data.rows[j].checkmethod;
			if(checkmethod == 'DB'){//双怠速法
				check = "DB";
				var db = {
						sqlKey : "com.kmzc.dao.dsj.Survey.getDB",
						businessid:businessid
					}
				var abdata = loadDatasAjax(db);
				if(abdata.rows.length >0){
					var num = abdata.rows.length;
					checkCarList=data;
					for (var i = 0; i < num; i++) {
						var obj = data.rows[i];
						var obj2 = abdata.rows[i];
						htmlsdb += "<tr><td>";
						htmlsdb += obj.checktime.substring(0,11);
						htmlsdb += "</td><td>";
						htmlsdb += obj.jcff;
						htmlsdb += "</td><td>";
						htmlsdb += obj2.colowvalue;
						htmlsdb += "</td><td>";
						htmlsdb += obj2.hclowvalue;
						htmlsdb += "</td><td>";
						htmlsdb += obj2.cohighvalue;
						htmlsdb += "</td><td>";
						htmlsdb += obj2.hchighvalue;
						htmlsdb +="</tr>";
					}
				}
			}
			if(checkmethod =='WT'){//稳态工况法
				check = "WT";
				var wt = {
						sqlKey : "com.kmzc.dao.dsj.Survey.getWT",
						businessid:businessid
					}
				var wtdata = loadDatasAjax(wt);
				if(wtdata.rows.length >0){
					var num = wtdata.rows.length;
					checkCarList=data;
					for (var i = 0; i < num; i++) {
						var obj = data.rows[i];
						var obj2 = wtdata.rows[i];
						htmlswt += "<tr><td>";
						htmlswt += obj.checktime.substring(0,11);
						htmlswt += "</td><td>";
						htmlswt += obj.jcff;
						htmlswt += "</td><td>";
						htmlswt += obj2.co5025;
						htmlswt += "</td><td>";
						htmlswt += obj2.hc5025;
						htmlswt += "</td><td>";
						htmlswt += obj2.no5025;
						htmlswt += "</td><td>";
						htmlswt += obj2.co2540;
						htmlswt += "</td><td>";
						htmlswt += obj2.hc2540;
						htmlswt += "</td><td>";
						htmlswt += obj2.no2540;
						htmlswt +="</tr>";
					}
				}
			}
			if(checkmethod =='LD'){//加载减速工况法
				check = "LD";
				var ld = {
						sqlKey : "com.kmzc.dao.dsj.Survey.getLD",
						businessid:businessid
					}
				var lddata = loadDatasAjax(ld);
				if(lddata.rows.length >0){
					var num = lddata.rows.length;
					checkCarList=data;
					for (var i = 0; i < num; i++) {
						var obj = data.rows[i];
						var obj2 = lddata.rows[i];
						htmlsld += "<tr><td>";
						htmlsld += obj.checktime.substring(0,11);
						htmlsld += "</td><td>";
						htmlsld += obj.jcff;
						htmlsld += "</td><td>";
						htmlsld += obj2.smokek100;
						htmlsld += "</td><td>";
						htmlsld += obj2.smokek90;
						htmlsld += "</td><td>";
						htmlsld += obj2.smokek80;
						htmlsld += "</td><td>";
						htmlsld += obj2.power;
						htmlsld +="</tr>";
					}
				}	
			}
			if(checkmethod =='TG'){//不透光烟度法
				check = "TG";
				var tg = {
						sqlKey : "com.kmzc.dao.dsj.Survey.getTG",
						businessid:businessid
					}
				var tgdata = loadDatasAjax(tg);
				if(tgdata.rows.length >0){
					var num = tgdata.rows.length;
					checkCarList=data;
					for (var i = 0; i < num; i++) {
						var obj = data.rows[i];
						var obj2 = tgdata.rows[i];
						htmlstg += "<tr><td>";
						htmlstg += obj.checktime.substring(0,11);
						htmlstg += "</td><td>";
						htmlstg += obj.jcff;
						htmlstg += "</td><td>";
						htmlstg += obj2.smokevalue1;
						htmlstg += "</td><td>";
						htmlstg += obj2.smokevalue2;
						htmlstg += "</td><td>";
						htmlstg += obj2.smokevalue3;
						htmlstg += "</td><td>";
						htmlstg += obj2.avgsmokevalue;
						htmlstg +="</tr>";
					}
				}
			}
			if(checkmethod =='IG'){//简易瞬态工况法
				check = "IG";
				var ig = {
						sqlKey : "com.kmzc.dao.dsj.Survey.getIG",
						businessid:businessid
					}
				var igdata = loadDatasAjax(ig);
				if(igdata){
					var num = igdata.rows.length;
					checkCarList=data;
					for (var i = 0; i < num; i++) {
						var obj = data.rows[i];
						var obj2 = abdata.rows[i];
						htmlsig += "<tr><td>";
						htmlsig += obj.checktime.substring(0,11);
						htmlsig += "</td><td>";
						htmlsig += obj.jcff;
						htmlsig += "</td><td>";
						htmlsig += obj2.valueco;
						htmlsig += "</td><td>";
						htmlsig += obj.valuehc;
						htmlsig += "</td><td>";
						htmlsig += obj.valueno;
						htmlsig +="</tr>";
					}
				}	
			}
		}
		if(check == "DB"){
			$("#carTextTable").append(htmlsdb);
		}
		if(check == "WT"){
			$("#carTextTable").append(htmlswt);
		}
		if(check == "LD"){
			$("#carTextTable").append(htmlsld);
		}
		if(check == "TG"){
			$("#carTextTable").append(htmlstg);
		}
		if(check == "IG"){
			$("#carTextTable").append(htmlsig);
		}
	}
	
}