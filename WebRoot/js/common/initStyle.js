var syxzHtmls = "";//使用性质样式
var syxzArr = [];//使用性质json
var rlzlHtmls = "";//燃料种类样式
var rlzlArr = [];//燃料种类json
$(document).ready(function(){
	syxzStyleAll();
	rlzlStyleAll();
});
/**
 * 初始化车牌颜色样式
 * color 车牌颜色
 * card  车牌号码
 */
function initCardStyle(color,card){
	var htmlColor = "";
	if(color == '蓝'){
		htmlColor = "<div class='plate plate1'>"+card+"</div>";
	}else if(color == '黄'){
		htmlColor = "<div class='plate plate2'>"+card+"</div>";
	}else if(color == '绿'){
		htmlColor = "<div class='plate plate3'>"+card+"</div>";
	}else if(color == '黑'){
		htmlColor = "<div class='plate plate4'>"+card+"</div>";
	}else if(color == '白'){
		htmlColor = "<div class='plate plate5'>"+card.substring(0, 6)+"<span>"+card.substr(6)+"</span>"+"</div>";
	}else{
		htmlColor = card;
	}
	return htmlColor;
}
//特殊需要居左的车牌号
function initTbCardStyle(color,card){
	var htmlColor = "";
	if(color == '蓝'){
		htmlColor = "<div class='platetb plate1'>"+card+"</div>";
	}else if(color == '黄'){
		htmlColor = "<div class='platetb plate2'>"+card+"</div>";
	}else if(color == '绿'){
		htmlColor = "<div class='platetb plate3'>"+card+"</div>";
	}else if(color == '黑'){
		htmlColor = "<div class='platetb plate4'>"+card+"</div>";
	}else if(color == '白'){
		htmlColor = "<div class='platetb plate5'>"+card.substring(0, 6)+"<span>"+card.substr(6)+"</span>"+"</div>";
	}else{
		htmlColor = card;
	}
	return htmlColor;
}

/**
 * 初始化状态样式
 * state 可以是状态代码，也可以是状态名称
 */
function initStateStyle(state){
	var htmlState = "";
	if(state == '正常' || state == '1'){
		htmlState = "<div class='ztys' style='border: 1px solid #5FC184;background-color: #5FC184;'>正常</div>";
	}else if(state == '警告' || state == '2'){
		htmlState = "<div class='ztys' style='border: 1px solid #E45F45;background-color: #E45F45;'>警告</div>";
	}else if(state == '锁定' || state == '3'){
		htmlState = "<div class='ztys' style='border: 1px solid #EB8234;background-color: #EB8234;'>锁定</div>";
	}else if(state == '注销' || state == '4'){
		htmlState = "<div class='ztys' style='border: 1px solid #CBC6C6;background-color: #CBC6C6;'>注销</div>";
	}else if(state == '已删除' || state == '5'){
		htmlState = "<div class='ztys' style='border: 1px solid #cdb5cd;background-color: red;'>已删除</div>";
	}else{
		htmlState = state;
	}
	return htmlState;
}

/**
 * 初始化处理审核状态样式
 * state 可以是状态代码，也可以是状态名称
 */
function initDealStateStyle(state){
	var htmlState = "";
	if(state == '已申请未处理' || state == '0'){
		htmlState = "<div class='shztys' style='border: 1px solid #E45F45;background-color: #E45F45;'>未处理</div>";
	}else if(state == '在处理' || state == '1'){
		htmlState = "<div class='shztys' style='border: 1px solid #EB8234;background-color: #EB8234;'>在处理</div>";
	}else if(state == '已处理(同意)' || state == '2'){
		htmlState = "<div class='shztys' style='border: 1px solid #5FC184;background-color: #5FC184;'>已同意</div>";
	}else if(state == '已处理(不同意)' || state == '4'){
		htmlState = "<div class='shztys' style='border: 1px solid #46A0E5;background-color: #46A0E5;'>不同意</div>";
	}else if(state == '已撤销' || state == '3'){
		htmlState = "<div class='shztys' style='border: 1px solid #CBC6C6;background-color: #CBC6C6;'>已撤销</div>";
	}else{
		htmlState = state;
	}
	return htmlState;
}

/**
 * 初始化处理检测是否合格
 * state 可以是状态代码，也可以是状态名称
 */
function initJcjgStyle(jcjg){
	var htmlJcjg = "";
	if(jcjg == '通过' || jcjg == '1'){
		htmlJcjg = "<div class='jcjgys' style='border: 1px solid #5FC184;background-color: #5FC184;'>通过</div>";
	}else if(jcjg == '不通过' || jcjg == '2'){
		htmlJcjg = "<div class='jcjgys' style='border: 1px solid #E45F45;background-color: #E45F45;'>不通过</div>";
	}else{
		htmlJcjg = jcjg;
	}
	return htmlJcjg;
}

/**
 * 初始化处理检测报告状态
 * state 可以是状态代码，也可以是状态名称
 */
function initJcbgStyle(sjzt){
	var htmlSjzt = "";
	if(sjzt == '正常'){
		htmlJcjg = "<div class='jcbg' style='border: 1px solid #5FC184;background-color: #5FC184;'>正常</div>";
	}else if(sjzt == '作废'){
		htmlJcjg = "<div class='jcbg' style='border: 1px solid #CBC6C6;background-color: #CBC6C6;'>作废</div>";
	}else if(sjzt == '删除'){
		htmlJcjg = "<div class='jcbg' style='border: 1px solid #CBC6C6;background-color: #CBC6C6;'>删除</div>";
	}else if(sjzt == '报警'){
		htmlJcjg = "<div class='jcbg' style='border: 1px solid #E45F45;background-color: #E45F45;'>报警</div>";
	}else{
		htmlJcjg = sjzt;
	}
	return htmlJcjg;
}

/**
 * 初始化处理审核状态
 * state是状态名称
 */
function initShjgStyle(jcjg){
	var htmlJcjg = "";
	if(jcjg == '通过' || jcjg == '1'){
		htmlJcjg = "<div class='jcjgys' style='border: 1px solid #5FC184;background-color: #5FC184;'>通过</div>";
	}else if(jcjg == '不通过' || jcjg == '2'){
		htmlJcjg = "<div class='jcjgys' style='border: 1px solid #E45F45;background-color: #E45F45;'>不通过</div>";
	}else if(jcjg == '未审核' || jcjg == '0'){
		htmlJcjg = "<div class='jcjgys' style='border: 1px solid #CBC6C6;background-color: #CBC6C6;'>未审核</div>";
	}else{
		htmlJcjg = jcjg;
	}
	return htmlJcjg;
}

/**
 * 初始化燃料种类样式
 * fultype 可以是燃料主键，也可以是燃料名称
 */
function initFultypeStype(fultype){
	var html = fultype;
	for(var i=0; i<rlzlArr.length; i++){
		if(fultype == rlzlArr[i].htmlkey){
			html = rlzlArr[i].htmlvalue;
		}
	}
	return html;
}

//获取燃料种类的所有样式
function rlzlStyleAll(){
	var html = "";
	rlzlHtmls = "[";
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"initStyle",sql:"rlzlysall"},
			async:false,type:"post",
		success:function(data){	
			for(var i=0;i<data.rows.length;i++){
				var ys=data.rows[i].ys;
				var jc=data.rows[i].jc;
				var pkid=data.rows[i].pkid;
				var len = 5;
				html = "<div class='rlzlys' style='border: 1px solid #"+ys+";background-color: #"+ys+";width:"+12*len+"px;'>";
				html += jc;
				html += "</div>";
				if(i==data.rows.length-1){
					rlzlHtmls += "{\"htmlkey\":\""+jc+"\",\"htmlvalue\":\""+html+"\"},{\"htmlkey\":\""+pkid+"\",\"htmlvalue\":\""+html+"\"}";
				}else{
					rlzlHtmls += "{\"htmlkey\":\""+jc+"\",\"htmlvalue\":\""+html+"\"},{\"htmlkey\":\""+pkid+"\",\"htmlvalue\":\""+html+"\"},";
				}
				
			}
		}
	});
	rlzlHtmls += "]";
	rlzlArr = eval(rlzlHtmls);
}

/**
 * 初始化使用性质样式
 * syxz 可以是使用性质主键，也可以是使用性质名称
 */
function initSyxzStyle(syxz){
	var html = syxz;
	for(var i=0; i<syxzArr.length; i++){
		if(syxz == syxzArr[i].htmlkey){
			html = syxzArr[i].htmlvalue;
		}
	}
	return html;
}

//获取所有的使用性质样式
function syxzStyleAll(){
	var html = "";
	syxzHtmls = "[";
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"initStyle",sql:"syxzysall"},
			async:false,type:"post",
		success:function(data){	
			for(var i=0;i<data.rows.length;i++){
				var ys=data.rows[i].ys;
				var jc=data.rows[i].jc;
				var pkid=data.rows[i].pkid;
				//var len = jc.length;
				var len = 5;
				html = "<div class='syxzys' style='border: 1px solid #"+ys+";background-color: #"+ys+";width:"+12*len+"px;'>";
				html += jc;
				html += "</div>";
				if(i==data.rows.length-1){
					syxzHtmls += "{\"htmlkey\":\""+jc+"\",\"htmlvalue\":\""+html+"\"},{\"htmlkey\":\""+pkid+"\",\"htmlvalue\":\""+html+"\"}";
				}else{
					syxzHtmls += "{\"htmlkey\":\""+jc+"\",\"htmlvalue\":\""+html+"\"},{\"htmlkey\":\""+pkid+"\",\"htmlvalue\":\""+html+"\"},";
				}
				
			}
		}
	});
	syxzHtmls += "]";
	syxzArr = eval(syxzHtmls);
}

/**
 * 扣分状态样式
 * state 可以是状态代码，也可以是状态名称
 */
function initMarksStateStyle(state){
	var htmlState = "";
	if(state == '已申诉未处理' || state == '1'){
		htmlState = "<div class='kfztys' style='border: 1px solid #E45F45;background-color: #E45F45;'>已申诉未处理</div>";
	}else if(state == '在处理申诉' || state == '2'){
		htmlState = "<div class='kfztys' style='border: 1px solid #EB8234;background-color: #EB8234;'>在处理申诉</div>";
	}else if(state == '申诉成功(撤销)' || state == '4'){
		htmlState = "<div class='kfztys' style='border: 1px solid #5FC184;background-color: #5FC184;'>申诉成功(撤销)</div>";
	}else if(state == '申诉成功(删除)' || state == '5'){
		htmlState = "<div class='kfztys' style='border: 1px solid #46A0E5;background-color: #46A0E5;'>申诉成功(删除)</div>";
	}else if(state == '申诉失败' || state == '3'){
		htmlState = "<div class='kfztys' style='border: 1px solid #CD0000;background-color: #CD0000;'>申诉失败</div>";
	}else{
		htmlState = "<div class='kfztys' style='border: 1px solid #CBC6C6;background-color: #CBC6C6;'>未申诉</div>";
	}
	return htmlState;
}

/**
 * num： 被扣分数
 */
function initNumStyle(num){
	var html = "";
	if(num <= 1){
		html = "<div class='bkfsys' style='border: 1px solid #CDC9C9;background-color: #CDC9C9;'>"+num+"</div>";
	}else if(num > 1 && num <= 2){
		html = "<div class='bkfsys' style='border: 1px solid #CDBA96;background-color: #CDBA96;'>"+num+"</div>";
	}else if(num > 2 && num <= 3){
		html = "<div class='bkfsys' style='border: 1px solid #EECBAD;background-color: #EECBAD;'>"+num+"</div>";
	}else if(num > 3 && num <= 6){
		html = "<div class='bkfsys' style='border: 1px solid #EEA2AD;background-color: #EEA2AD;'>"+num+"</div>";
	}else if(num > 6 && num <= 12){
		html = "<div class='bkfsys' style='border: 1px solid #EE7942;background-color: #EE7942;'>"+num+"</div>";
	}else{
		html = "<div class='bkfsys' style='border: 1px solid #CD0000;background-color: #CD0000;'>"+num+"</div>";
	}
	return html;
}

/**
 * fs 巡查方式
 */
function initXcfs(fs){
	var htmlState = "";
	if(fs == '明查'){
		htmlState = "<div class='xcfs' style='border: 1px solid ##fc765b;background-color: #fc765b;'>明查</div>";
	}else if(fs == '暗访'){
		htmlState = "<div class='xcfs' style='border: 1px solid #41A1E1;background-color: #41A1E1;'>暗访</div>";
	}else{
		htmlState = fs;
	}
	return htmlState;
}

function initXcrwState(state){
	var htmlState = "";
	if(state == '待执行'){
		htmlState = "<div class='xcrw' style='border: 1px solid ##41A1E1;background-color: #41A1E1;'>待执行</div>";
	}else if(state == '执行中'){
		htmlState = "<div class='xcrw' style='border: 1px solid #5ECA7C;background-color: #5ECA7C;'>执行中</div>";
	}else if(state == '已完成'){
		htmlState = "<div class='xcrw' style='border: 1px solid #FB8B38;background-color: #FB8B38;'>已完成</div>";
	}else if(state == '已超期'){
		htmlState = "<div class='xcrw' style='border: 1px solid #FC5B5B;background-color: #FC5B5B;'>已超期</div>";
	}else{
		htmlState = state;
	}
	return htmlState;
}