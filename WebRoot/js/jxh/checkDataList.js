var checkDg = null;
var columnT;
var titleT;
var titleA = null;//可以选择做曲线的项目，是一个数组，前面是列的name值，后面是列的名称
var head = "";//用来显示不在报表中的标题名称
$(document).ready(function(){
	if(jcff == 1){//双怠速法
		columnT=[[
			{title:'工况类型',field:'gklx',width:100,align:'center',sortable:true,formatter:function(value){
				 if(value == "0")return "70%额定转速";
	        	 else if(value == "1")return "高怠速准备";
	        	 else if(value == "2")return "高怠速检测";
	        	 else if(value == "3")return "怠速准备";
	        	 else if(value == "4")return "怠速检测";
	         }},
        	{title:'测试工况[HC]每秒数据', field:'hccsgk',width:150,align:'center',sortable:true},
        	{title:'测试工况[CO]每秒数据', field:'cocsgk',width:150,align:'center',sortable:true},
	        {title:'测试工况[CO2]每秒数据', field:'co2csgk',width:180,align:'center',sortable:true},
	        {title:'测试工况 分析仪[O2]每秒数据', field:'o2csgkfxy',width:200,align:'center',sortable:true},
	        {title:'机油油温', field:'jyyw',width:80,align:'center',sortable:true},
	        {title:'λ过量空气系数', field:'glkqxs',width:120,align:'center',sortable:true},
	        {title:'发动机转速每秒数据',field:'fdjzs',width:150,align:'center',sortable:true},
	        {title:'数据接收时间', field:'sjjssj',width:150,align:'center',sortable:true}
	    ]];
		titleT = "gklx,hccsgk,cocsgk,co2csgk,o2csgkfxy,jyyw,glkqxs,fdjzs,jcjssj";
		titleA = ["gklx:工况类型","hccsgk:测试工况[HC]每秒数据","cocsgk:测试工况[CO]每秒数据","co2csgk:测试工况[CO2]每秒数据",
				"o2csgkfxy:测试工况 分析仪[O2]每秒数据","jyyw:机油油温","glkqxs:λ过量空气系数","fdjzs:发动机转速每秒数据","sjjssj:数据接收时间"];
		head = "双怠速过程数据";
	}else if(jcff == 2){//稳态工况法
		columnT=[[
			{title:'工况类型',field:'gklx',width:80,align:'center',sortable:true,formatter:function(value){
				 if(value == "0")return "准备阶段";
	        	 else if(value == "1")return "5025阶段";
	        	 else if(value == "2")return "加速阶段";
	        	 else if(value == "3")return "2540阶段";
	         }},
        	{title:'HC测量值每秒数据', field:'hcclz',width:150,align:'center',sortable:true},
        	{title:'CO测量值每秒数据', field:'coclz',width:150,align:'center',sortable:true},
	        {title:'NO测量值每秒数据', field:'noclz',width:150,align:'center',sortable:true},
	        {title:'O2测量值每秒数据', field:'o2clz',width:150,align:'center',sortable:true},
	        {title:'CO2测量值每秒数据', field:'co2clz',width:150,align:'center',sortable:true},
	        {title:'车速每秒数据', field:'cs',width:100,align:'center',sortable:true},
	        {title:'转速每秒数据',field:'zs',width:100,align:'center',sortable:true},
	        {title:'扭力',field:'nl',width:50,align:'center',sortable:true},
        	{title:'底盘测功机负载', field:'dpcgjfz',width:100,align:'center',sortable:true},
        	{title:'稀释修正系数每秒数据', field:'xsxzxs',width:150,align:'center',sortable:true},
	        {title:'湿度修正系数每秒数据', field:'sdxzxs',width:150,align:'center',sortable:true},
	        {title:'测试工况总加载功率每秒数据', field:'csgkzjzgl',width:200,align:'center',sortable:true},
	        {title:'测试工况寄生功率每秒数据', field:'csgkjsgl',width:200,align:'center',sortable:true},
	        {title:'测试工况指示功率每秒数据', field:'csgkzsgl',width:200,align:'center',sortable:true},
	        {title:'测试工况环境温度每秒数据',field:'wd',width:200,align:'center',sortable:true},
	        {title:'测试工况环境大气压力每秒数据', field:'qy',width:220,align:'center',sortable:true},
	        {title:'测试工况环境相对湿度每秒数据', field:'sd',width:220,align:'center',sortable:true},
	        {title:'油温每秒数据',field:'yw',width:100,align:'center',sortable:true},
	        {title:'数据接收时间', field:'sjjssj',width:150,align:'center',sortable:true}
	    ]];
		titleT = "gklx,hcclz,coclz,noclz,o2clz,co2clz,cs,zs,nl,dpcgjfz,xsxzxs,sdxzxs,csgkzjzgl" +
				",csgkjsgl,csgkzsgl,wd,qy,sd,yw,sjjssj";
		titleA = ["gklx:工况类型","hcclz:HC测量值每秒数据","coclz:CO测量值每秒数据","noclz:NO测量值每秒数据",
				"o2clz:O2测量值每秒数据","co2clz:CO2测量值每秒数据","cs:车速每秒数据","zs:转速每秒数据","nl:扭力",
				"dpcgjfz:底盘测功机负载","xsxzxs:稀释修正系数每秒数据","sdxzxs:湿度修正系数每秒数据","csgkzjzgl:测试工况总加载功率每秒数据",
				"csgkjsgl:测试工况寄生功率每秒数据","csgkzsgl:测试工况指示功率每秒数据","wd:测试工况环境温度每秒数据","qy:测试工况环境大气压力每秒数据",
				"sd:测试工况环境相对湿度每秒数据","yw:油温每秒数据","sjjssj:数据接收时间"];
		head = "稳态工况过程数据";
	}else if(jcff == 3){//简易瞬态法
		columnT=[[
			{title:'工况类型',field:'gklx',width:100,align:'center',sortable:true,formatter:function(value){
				 if(value == "0")return "设备准备";
	        	 else if(value == "1")return "检测前怠速准备";
	        	 else if(value == "2")return "195秒数据";
	         }},
        	{title:'测试工况[HC]每秒数据', field:'hccsgk',width:150,align:'center',sortable:true},
        	{title:'测试工况[CO]每秒数据', field:'cocsgk',width:150,align:'center',sortable:true},
	        {title:'测试工况[CO2]每秒数据', field:'co2csgk',width:160,align:'center',sortable:true},
	        {title:'测试工况[NO]每秒数据', field:'nocsgk',width:150,align:'center',sortable:true},
	        {title:'测试工况分析仪[O2]每秒数据', field:'o2csgkfxy',width:200,align:'center',sortable:true},
	        {title:'测试工况流量计[O2]每秒数据', field:'o2csgkllj',width:200,align:'center',sortable:true},
	        {title:'环境O2浓度',field:'o2hjnd',width:100,align:'center',sortable:true},
	        {title:'实际流量每秒数据', field:'sjll',width:130,align:'center',sortable:true},
	        {title:'标准流量每秒数据',field:'bzll',width:130,align:'center',sortable:true},
	        {title:'汽车尾气流量每秒数据',field:'qcwqll',width:150,align:'center',sortable:true},
	        {title:'HC排放质量每秒数据', field:'hcpfbz',width:150,align:'center',sortable:true},
        	{title:'CO排放质量每秒数据', field:'copfbz',width:150,align:'center',sortable:true},
	        {title:'NO排放质量每秒数据', field:'nopfbz',width:150,align:'center',sortable:true},
	        {title:'车速每秒数据', field:'cs',width:100,align:'center',sortable:true},
	        {title:'标准时速', field:'bzss',width:80,align:'center',sortable:true},
	        {title:'发动机转速', field:'fdjzs',width:100,align:'center',sortable:true},
	        {title:'测试工况总加载功率每秒数据',field:'csgkzjzgl',width:200,align:'center',sortable:true},
	        {title:'测试工况寄生功率每秒数据', field:'csgkjsgl',width:180,align:'center',sortable:true},
	        {title:'测试工况指示功率每秒数据',field:'csgkzsgl',width:180,align:'center',sortable:true},
	        {title:'扭力',field:'nl',width:50,align:'center',sortable:true},
	        {title:'测试工况流量计大气压力每秒数据', field:'csgklljdqyl',width:220,align:'center',sortable:true},
	        {title:'测试工况流量计温度每秒数据', field:'csgklljwd',width:200,align:'center',sortable:true},
	        {title:'测试工况环境温度每秒数据',field:'csgkhjwd',width:180,align:'center',sortable:true},
	        {title:'测试工况环境大气压力每秒数据', field:'csgkhjdqyl',width:200,align:'center',sortable:true},
	        {title:'测试工况环境相对湿度每秒数据',field:'csgkhjxdsd',width:200,align:'center',sortable:true},
	        {title:'测试工况稀释修正系数每秒数据',field:'csgkxsxzxs',width:200,align:'center',sortable:true},
	        {title:'测试工况湿度修正系数每秒数据', field:'csgksdxzxs',width:200,align:'center',sortable:true},
	        {title:'稀释比每秒数据',field:'ssb',width:120,align:'center',sortable:true},
	        {title:'分析仪管路压力',field:'fxyglyl',width:120,align:'center',sortable:true},
	        {title:'数据接收时间', field:'sjjssj',width:150,align:'center',sortable:true}
	    ]];
		titleT = "gklx,hccsgk,cocsgk,co2csgk,nocsgk,o2csgkfxy,o2csgkllj,o2hjnd,sjll,bzll,qcwqll," +
				"hcpfbz,copfbz,nopfbz,cs,bzss,fdjzs,csgkzjzgl,csgkjsgl,csgkzsgl,nl,csgklljdqyl," +
				"csgklljwd,csgkhjwd,csgkhjdqyl,csgkhjxdsd,csgkxsxzxs,csgksdxzxs,ssb,fxyglyl,jcjssj";
		titleA = ["gklx:工况类型","hccsgk:测试工况[HC]每秒数据","cocsgk:测试工况[CO]每秒数据","co2csgk:测试工况[CO2]每秒数据",
			"nocsgk:测试工况[NO]每秒数据","o2csgkfxy:测试工况分析仪[O2]每秒数据","o2csgkllj:测试工况流量计[O2]每秒数据",
			"o2hjnd:环境O2浓度","sjll:实际流量每秒数据","bzll:标准流量每秒数据","qcwqll:汽车尾气流量每秒数据","hcpfbz:HC排放质量每秒数据",
			"copfbz:CO排放质量每秒数据","nopfbz:NO排放质量每秒数据","cs:车速每秒数据","bzss:标准时速","fdjzs:发动机转速",
			"csgkzjzgl:测试工况总加载功率每秒数据","csgkjsgl:测试工况寄生功率每秒数据","csgkzsgl:测试工况指示功率每秒数据",
			"nl:扭力","csgklljdqyl:测试工况流量计大气压力每秒数据","csgklljwd:测试工况流量计温度每秒数据","csgkhjwd:测试工况环境温度每秒数据",
			"csgkhjdqyl:测试工况环境大气压力每秒数据","csgkhjxdsd:测试工况环境相对湿度每秒数据","csgkxsxzxs:测试工况稀释修正系数每秒数据",
			"csgksdxzxs:测试工况湿度修正系数每秒数据","ssb:稀释比每秒数据","fxyglyl:分析仪管路压力","sjjssj:数据接收时间"];
		head = "简易瞬态过程数据";
	}else if(jcff == 4){//加载减速法
		columnT=[[
			{title:'工况类型',field:'gklx',width:150,align:'center',sortable:true,formatter:function(value){
				 if(value == "0")return "功率扫描中";
	        	 else if(value == "1")return "恢复到100%VelMaxHP过程";
	        	 else if(value == "2")return "100%VelMaxHP点检验过程";
	        	 else if(value == "3")return "90%VelMaxHP点检验过程";
	        	 else if(value == "4")return "80%VelMaxHP点检验过程";
	         }},
        	{title:'功率扫描阶段功率每秒数据', field:'smjdgl',width:180,align:'center',sortable:true},
        	{title:'功率扫描阶段车速每秒数据', field:'smjdcs',width:180,align:'center',sortable:true},
	        {title:'发动机转速每秒数据', field:'fdjzs',width:140,align:'center',sortable:true},
	        {title:'扭力', field:'nl',width:50,align:'center',sortable:true},
	        {title:'环境温度每秒数据', field:'wd',width:120,align:'center',sortable:true},
	        {title:'环境大气压力每秒数据', field:'qy',width:150,align:'center',sortable:true},
	        {title:'环境相对湿度每秒数据',field:'sd',width:150,align:'center',sortable:true},
	        {title:'功率修正系数', field:'glxzxs',width:100,align:'center',sortable:true},
	        {title:'轮边功率每秒数据',field:'lbgl',width:120,align:'center',sortable:true},
	        {title:'光吸收系数每秒数据',field:'gxsxs',width:150,align:'center',sortable:true},
	        {title:'数据接收时间', field:'sjjssj',width:150,align:'center',sortable:true}
	    ]];
		titleT = "gklx,smjdgl,smjdcs,fdjzs,nl,wd,qy,sd,glxzxs,lbgl,gxsxs,jcjssj";
		titleA = ["gklx:工况类型","smjdgl:功率扫描阶段功率每秒数据","smjdcs:功率扫描阶段车速每秒数据","fdjzs:发动机转速每秒数据",
				"nl:扭力","wd:环境温度每秒数据","qy:环境大气压力每秒数据","sd:环境相对湿度每秒数据",
				"glxzxs:功率修正系数","lbgl:轮边功率每秒数据","gxsxs:光吸收系数每秒数据","sjjssj:数据接收时间"];
		head = "加载减速过程数据";
	}else if(jcff == 5){//不透光烟度法
		columnT=[[
       	 	{title:'工况类型',field:'gklx',width:70,align:'center',sortable:true,formatter:function(value){
	        	 if(value == "1")return "第一次";
	        	 else if(value == "2")return "第二次";
	        	 else if(value == "3")return "第三次";
	         }},
       	 	{title:'烟度值', field:'ydz',width:60,align:'center',sortable:true},
       	 	{title:'发动机转速', field:'fdjzs',width:100,align:'center',sortable:true},
	        {title:'数据接收时间', field:'sjjssj',width:150,align:'center',sortable:true}
	    ]];
		titleT = "gklx,ydz,fdjzs,sjjssj";
		titleA = ["gklx:工况类型","ydz:烟度值","fdjzs:发动机转速","sjjssj:检测结束时间"];
		head = "不透光烟度过程数据";
	}
	
	checkDg=$("#gridTable").datagrid({
		url:rootPath+"/checkinfo/getCheckDataList.yt?jcbgPkid="+jcbgPkid,
		pagination:false,  //是否启用分页
		rownumbers:true,  //是否显示列数
		singleSelect:true, //是否允许单选中行
		striped:true, 
		height:"600",
		fit:true,
		fitColumns:false,
		nowarp:true,
		border:true,
		remoteSort:true,
		columns:columnT,
		toolbar:[{
			text:'导出过程数据',iconCls:'icon-save',handler:function(){exportCsv();}
		},'-']
	});
});

//导出过程数据为csv文件
function exportCsv(){
	var titles = "";
	var keys = new Array();
	for(var i=0; i<titleA.length; i++){
		var o = titleA[i].split(":");
		keys[i] = o[0];
		titles += ","+o[1];
	}
	titles = titles.substr(1);
	var rows = $("#gridTable").datagrid("getRows");
	var contents = "";
	for(var j=0; j<rows.length; j++){
		var id=rows[j];
		for(var x=0; x<keys.length; x++){
			var idT = id[keys[x]] == undefined?"":id[keys[x]];
			if(x==0){
				contents += idT;
			}else{
				contents += ","+idT;
			}
		}
		contents += "\r\n";
	}
	$("#filename").val(head);
	$("#titles").val(titles);
	$("#contents").val(contents);
	$("#export2csvForm").submit();
}