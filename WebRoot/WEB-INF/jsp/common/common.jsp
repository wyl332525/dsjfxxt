<%@page import="com.kmzc.cache.Config,com.kmzc.cache.SecurityConfig"%>
<%@page import="com.kmzc.cache.SysConfigCache"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String userId=(String)session.getAttribute("userId");
	String userName=(String)session.getAttribute("userName");
	String xtfg=(String)session.getAttribute("xtfg");//default gray black metro material bootstrap 
	if(xtfg==null || "".equals(xtfg)){
		xtfg="default";
	}
	String tbfg=(String)session.getAttribute("tbfg");//default vintage  dark macarons  roma infographic
	if(tbfg==null || "".equals(tbfg)){
		tbfg="default";
	}
	String rootPath = request.getContextPath();
	String isCsrfProtection=SecurityConfig.getConfig("isCsrfProtection","0");//1表示启用csrf
	//获取车牌号码前缀的默认值，加载到cphm_start中
	String cphmqz = SysConfigCache.getSysConfig1("xt_jc_mrcs");
	//报表跟路径
	String reportRootPath=SysConfigCache.getSysConfig1("reportRootPath");
	String areaPrefix = Config.getConfig("projectName");
	if(reportRootPath==null || "".equals(reportRootPath)){
		reportRootPath=rootPath;
	}
	
	String xt_title = SysConfigCache.getSysConfig1("xt_title");
	String map_server = SysConfigCache.getSysConfig1("map_server");
	
%>
<link rel="stylesheet" type="text/css" href="<%=rootPath %>/js/plugins/jqueryEasyui/themes/black/easyui.css" />  
<link rel="stylesheet" type="text/css" href="<%=rootPath %>/js/plugins/jqueryEasyui/themes/icon.css" />    
<link rel="stylesheet" href="<%=rootPath %>/css/jxh/bk.css" />  
<script type="text/javascript" src="<%=rootPath %>/js/plugins/jquery-min.js"></script>
<script type="text/javascript" src="<%=rootPath %>/js/plugins/jqueryEasyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=rootPath %>/js/plugins/jqueryEasyui/locale/easyui-lang-zh_CN.js"></script> 
<script type="text/javascript"> 
	var userId="<%=userId%>";
	var userName="<%=userName%>";
	var rootPath="<%=rootPath%>";
	var cphmqz="<%=cphmqz%>";
	var xtfg="<%=xtfg%>";
	var tbfg="<%=tbfg%>"
	var reportRootPath="<%=reportRootPath%>";//报表跟路径
	var isCsrfProtection="<%=isCsrfProtection%>";
	var mapServer = "<%=map_server%>";
	//得到系统当前日期 参数为日期格式(rqgs),可以为空，默认是yyyy-mm-dd(年用yyyy，月用mm，日用dd，不区分大小写,其他字符原样输出),可以是yyyy-mm(只返回年和月)。例如：getCurrentDate("yyyy");getCurrentDate("yyyy年mm月");getCurrentDate("mm月");
	function getCurrentDate(rqgs){var now=new Date(); now.setTime(now.getTime()+24*60*60*1000);if(rqgs==null || rqgs==""){rqgs="yyyy-mm-dd";}rqgs=rqgs.toLocaleLowerCase();var month=now.getMonth();if(month<9){month="0"+(month+1);}else{month=month+1;}rqgs=rqgs.replace("mm", month);var day=now.getDate();if(day<10){day="0"+day;}rqgs=rqgs.replace("dd", day);rqgs=rqgs.replace("yyyy", now.getFullYear());return rqgs;}
	//向后台加载数据，参数obj={configName:"common",sql:"xxcx_cx_xxfj",params:"String#dddd;;String#bb"}，返回的数据格式是json对象;具体字符串格式：{"total":总条数,"rows":[{"a":"12","b":"22","c":"dd"},{"a":"22","b":"33","c":"ee"},{...}]}
	function loadDatasAjax(dataObj){var ret=null;$.ajax({url:rootPath+"/db/query.do",data:dataObj,async:false,type:"post",dataType : "json",success:function(data){ret=data; },error:function(data){$.messager.alert("统计结果：","向后台加载数据时出现未知错误，在common.jsp页面。");}});return ret;}
	//在窗口顶层创建window，并返回创建的窗口对象； 参数id唯一标示窗口("myWindow123")，content窗口的html内容("<div id='myWindow123'></div>")，obj初始的对象（{title:"",width:"",...}）
	function createTopWindow(id,content,obj){if(window.top.$("body").data(id)!=null){window.top.$("body").data(id).window().parent().remove();window.top.$("body").data(id,"");}var win=window.top.$(content).appendTo(window.top.document.body);win.window(obj);window.top.$("body").data(id,win); return win;}
	function createTopWindow1(id,content,obj){
		if(window.$("body").data(id)!=null){
			window.$("body").data(id).window().parent().remove();
			window.$("body").data(id,"");
		}
		var win=window.$(content).appendTo(window.document.body);
		win.window(obj);
		window.$("body").data(id,win); 
		return win;
	}
	
	//根据键从redis取出相对应的数据  数据结构 {'key':'aaa'(key是从redis取出来数据的键)}  返回结果: {'result':'0','errorInfo':'没有找与该键相符的值','cache':'{'123':'123'}'}
	function fromRedisGetData(dataObj) {
		var ret = null;
		$.ajax({
			url : rootPath + "/redis/getCache.do",
			data : dataObj,
			async : false,
			type : "post",
			dataType : "json",
			success : function(data) {
				ret = data;
			},
			error : function(data) {
				$.messager.alert("获取结果：", "向后台获取缓存时出错，在common.jsp页面。");
			}
		});
		return ret;
	}
	//根据id返回创建的顶层window，返回对象可以直接操作，winObj.window("open");
	function getTopWindow(id){return window.top.$("body").data(id);}
	//obj={tn:表名 不能为空（或是sqlkey不能为空）,valueField:值的字段名，默认pkid，可为空,textField:显示值，默认为jc，可为空,isFirst:是否需要第一个，1需要第一个，否则不需要，可空,defaultFirst:第一个的显示字符串，可空,params:sql参数，可以为空，格式：String#123;;Integer#66}
	function getCodeSelect(obj) {var params = obj.params;if (params == null) {}var tn = obj.tn.toLowerCase();var info = window.top.$("body").data(tn + params);if (info == null || info == "") {loadCodeFromServer({tn : obj.tn,valueField : obj.valueField,textField : obj.textField,params : params});info = window.top.$("body").data(tn + params);}if (info == null || info == "") {info = [ {pkid : "",jc : "**没有查询到数据**"} ];} else {info = eval(info);if (obj.isFirst == "1") {if (!obj.defaultFirst) {obj.defaultFirst = "**全部**";}/*info.splice(0, 0, {pkid : "",jc : obj.defaultFirst});*/var val="";if(obj.textField == null || obj.textField == ""){val='{pkid : "",jc:"'+obj.defaultFirst+'"}';}else{val='{pkid : "",'+obj.textField+':"'+obj.defaultFirst+'"}';} info.splice(0, 0, eval("("+val+")")); }}return info;}
	//obj={tn:表名 不能为空,valueField:值的字段名，默认pkid，可为空,textField:显示值，默认为jc，可为空,params:sql参数，可以为空，格式：String#123;;Integer#66}
	function loadCodeFromServer(obj) {var tn = obj.tn.toLowerCase();$.ajax({url : rootPath + "/dm/cacheData.yt",data : obj,async : false,type : "post",dataType : "text",success : function(data) {if (data != null) {if (data.indexOf("*没有查询到数据*") < 0 && data.indexOf("*传入的表名为空*") < 0) {window.top.$("body").data(tn+ obj.params, data);}}},error : function() {alert("查询数据时出现未知错误，请联系管理员！");}});}
	//操作后台数据库 obj={configName:"common",sql:"test_insert",params:"String#congif1;;String#config2"},row=1表示操作的是1个语句，否则操作的是多个语句，，如果是多个语句的话 obj={configName:"common",sql:"[TEST_DEL],[Test_update]",params:"[String#testPkid],[String#congif11111;;String#config22222;;String#test111]"}
	function operateDb(obj,row){var ret="";	var url="operSql.yt";if(row>1){url="operSqls.yt";}$.ajax({url:rootPath+"/db/"+url,data:obj,async:false,type:"post",success:function(num){ret=num;},error:function(e){$.messager.alert("出错提示：","执行操作时出现未知错误！");}});return ret;}
	//验证字符串长度不能超过给定的值，注意按字节算，一个汉字占2个字节
	$.extend($.fn.validatebox.defaults.rules,{maxLength: {validator: function(value, param){return strLen(value) <= param[0] && value.indexOf(";;")<0;},message: "注意：字符长度不能超过 {0}，一个汉字占2个字符;\r\n且字符中不能包含两个连续的分号“;;”。"}});
	 //验证只能输入数字类型
    $.extend($.fn.validatebox.defaults.rules,{number:{validator: function(value, param){return validateNumber(value,null,null);},message: "注意：这里只能输入数字。"}});
    //验证只能输入数字类型，且不能大于最大值
    $.extend($.fn.validatebox.defaults.rules,{numberMax:{validator: function(value, param){return validateNumber(value,null,param[0]);},message: "注意：这里只能输入数字,且不能大于{0}。"}});
 	//验证只能输入数字类型，且不能小于最小值
    $.extend($.fn.validatebox.defaults.rules,{numberMin:{validator: function(value, param){return validateNumber(value,param[0],null);},message: "注意：这里只能输入数字，且不能小于{0}。"}});
    //验证只能输入数字类型，且数值介于最小和最大之间
    $.extend($.fn.validatebox.defaults.rules,{numberMinMax:{validator: function(value, param){return validateNumber(value,param[0],param[1]);},message: "注意：这里只能输入数字，且只能在{0}到{1}之间。"}});
    //验证只能输入整数
    $.extend($.fn.validatebox.defaults.rules,{integer:{validator: function(value, param){return validateInteger(value,null,null);},message: "注意：这里只能输入整数。"}});
    //验证只能输入整数，且不能大于最大值
    $.extend($.fn.validatebox.defaults.rules,{integerMax:{validator: function(value, param){return validateInteger(value,null,param[0]);},message: "注意：这里只能输入整数,且不能大于{0}。"}});
    //验证只能输入整数，且不能小于最小值
    $.extend($.fn.validatebox.defaults.rules,{integerMin:{validator: function(value, param){return validateInteger(value,param[0],null);},message: "注意：这里只能输入整数，且不能小于{0}。"}});
    //验证只能输入整数，且数值介于最小和最大之间
    $.extend($.fn.validatebox.defaults.rules,{integerMinMax:{validator: function(value, param){return validateInteger(value,param[0],param[1]);},message: "注意：这里只能输入整数，且只能在{0}到{1}之间。"}});
    /*验证实数*/
    function validateNumber(value,minLength,maxLength){RegExpPtn=/^(\+|-)?\d+($|\.\d+$)/; 	if (!RegExpPtn.test(value) ){return false;}else{if(maxLength && Number(value)>Number(maxLength)) return false;if(minLength && Number(value)<Number(minLength)) return false;}return true;} 
	/*验证整数*/
	 function validateInteger(value,minLength,maxLength){RegExpPtn=/^[\d]+$/;if (!RegExpPtn.test(value) ){return false;}else{if(maxLength && Number(value)>Number(maxLength)) return false;if(minLength && Number(value)<Number(minLength)) return false;}return true;} 
    /* 取得字符串的字节长度 */
	function strLen(str){var len = 0;for (var i=0;i<str.length;i++){if (str.charCodeAt(i)>255) len+=2; else len++;} return len;} 
	/*日期控件的格式化和解析yyyy-mm-dd*/	
	function rqFmter(date) {var y = date.getFullYear();var m = date.getMonth() + 1;	var d = date.getDate();	return y + '-' + (m < 10 ? ('0' + m) : m) + '-'+ (d < 10 ? ('0' + d) : d);}
	function rqParser(s) {if (!s){return new Date();}var ss = (s.split('-'));var y = parseInt(ss[0], 10);var m = parseInt(ss[1], 10);var d = parseInt(ss[2], 10);if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {return new Date(y, m - 1, d);	} else {return new Date();}
	}
	
	(function($) {
	/*给默认的日历控件增加上清空按钮*/
	var buttons = $.extend([], $.fn.datebox.defaults.buttons);buttons.splice(1, 0, {text : function(target) {return $(target).datebox("options").cleanText},handler : function(target) {$(target).datebox("setValue", "");$(target).datebox("hidePanel");}}); $.extend($.fn.datebox.defaults, {buttons : buttons});
	/*给默认的日历时间控件增加上清空按钮*/
	var datetimebuttons = $.extend([], $.fn.datetimebox.defaults.buttons);datetimebuttons.splice(2, 0, {text : function(target) {return $(target).datetimebox("options").cleanText},handler : function(target) {$(target).datetimebox("setValue", "");$(target).datetimebuttons("hidePanel");}}); $.extend($.fn.datetimebox.defaults, {buttons : datetimebuttons});	
	})(jQuery)
</script>
<script type="text/javascript" src="<%=rootPath %>/js/common/browserType.js"></script>
<script type="text/javascript" src="<%=rootPath %>/js/common/resizeHtml.js"></script>
<script type="text/javascript" src="<%=rootPath%>/js/jxh/My97DatePicker/WdatePicker.js"></script>
