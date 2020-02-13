/**视频回放使用方法,需要同时引用此js和webVideoCtrl.js
 * args{
 *    ckwidth:100   div窗口的宽度
 *    ckheight:100  div窗口的高度
 *    initid:'aaaaa'    放置在哪个div下，使用id
 *    isfull:'1'        是否显示全屏按键，1为是，0为否
 *    isphoto:'1'        是否显示拍照按键，1为是，0为否
 *    isslow:'1'        是否显示慢放按键，1为是，0为否
 *    isfast:'1'        是否显示快放按键，1为是，0为否
 *    sxjid:''			摄像机id
 *    starttime:'2017-09-17 10:00:11'
 *    endtime:'2017-09-17 10:10:11'
 * }
 */
function initZkytSphf(args){
	var operObj = args;
	//首先检查插件是否已经安装过
    var iRet = WebVideoCtrl.I_CheckPluginInstall();
	if (-2 == iRet) {
		alert("您的浏览器版本不支持此插件，请使用IE11以上浏览器！");
		return;
	} else if (-1 == iRet) {
        alert("您还未安装过插件，请先安装视频插件后重新进入此页面！");
        var download  = "<a href='"+rootPath+"/downLoad/WebComponentsKit.exe'>视频控件下载</a>";
        $('#'+operObj.initid).html(download);
		return;
    }
	//初始化一个1*1的窗口，因为视频回放只能同时看一个窗口
	WebVideoCtrl.I_InitPlugin(operObj.ckwidth, operObj.ckheight, {
        iWndowType: 1
	});
	var spxx ={
		sxjid:operObj.sxjid,
		starttime:operObj.starttime,
		endtime:operObj.endtime
	}
	//生成div
	var div = "<div id='sphfmain' style='text-align:right;'>";
	div += "<div id='sphfkjdiv'></div>";
	div += "<div id='tools'>";
	div += "<input id='startBtn' type='button' value='开' />";
	div += "<input id='pauseBtn' type='button' value='暂' />";
	div += "<input id='resumeBtn' type='button' value='恢' />";
	div += "<input id='stopBtn' type='button' value='停' />";
	/*****************判断是否显示自定义按钮start*******************/
	//这里判断是否传了全屏按钮参数
	var sfqp = operObj.isfull;
	if(sfqp != "0"){
		div += "<input id='fullBtn' type='button' value='全' />";
	}
	//这里判断是否传了拍照按钮参数
	var sfpz = operObj.isphoto;
	if(sfpz != "0"){
		div += "<input id='photoBtn' type='button' value='拍' />";
	}
	//这里判断是否传了慢放按钮参数
	var sfmf = operObj.isslow;
	if(sfmf != "0"){
		div += "<input id='slowBtn' type='button' value='慢' />";
	}
	//这里判断是否传了快放按钮参数
	var sfkf = operObj.isfast;
	if(sfkf != "0"){
		div += "<input id='fastBtn' type='button' value='快' />";
	}
	/*****************判断是否显示自定义按钮end*******************/
	div += "</div></div>";
	//把加载好的视频div加入到传入的div中去
	document.getElementById(operObj.initid).innerHTML = div;
	//把控件加载出来
	WebVideoCtrl.I_InsertOBJECTPlugin("sphfkjdiv");
	/************对按钮进行绑定start*************/
	//全屏按钮事件绑定
	$("#fullBtn").bind("click",function(){
		WebVideoCtrl.I_FullScreen(true);
	});
	//拍照按钮事件绑定
	$("#photoBtn").bind("click",function(){
		WebVideoCtrl.I_CapturePic("C:");
	});
	//停止按钮事件绑定
	$("#stopBtn").bind("click",function(){
		WebVideoCtrl.I_Stop();
	});
	//暂停按钮事件绑定
	$("#pauseBtn").bind("click",function(){
		WebVideoCtrl.I_Pause();
	});
	//恢复播放按钮事件绑定
	$("#resumeBtn").bind("click",function(){
		WebVideoCtrl.I_Resume();
	});
	//慢放按钮事件绑定
	$("#slowBtn").bind("click",function(){
		WebVideoCtrl.I_PlaySlow();
	});
	//快放按钮事件绑定
	$("#fastBtn").bind("click",function(){
		WebVideoCtrl.I_PlayFast();
	});
	
	//播放按钮事件绑定
	$("#startBtn").bind("click",function(){
		startPlay(spxx);
	});
	/************对按钮进行绑定end*************/
	//开始播放按钮特殊处理，有2种情况，
	//第一种是传一个业务ID进来根据检测业务主表的开始时间和结束时间
	//第二种情况是在页面上选择检测线摄像头、选择时间
}

function startPlay(spxx){
	var startTime = spxx.starttime;
	var endTime = spxx.endtime;
	var sxjid = spxx.sxjid;
	var nvrip = "";
	var dlyhm = "";
	var dlmm = "";
	var dkh = "";
	var tdh = "";
	//如果sxjid不为空，查询数据库获取信息
	if(sxjid != null && sxjid != ""){
//		startTime = $('#startTime').datetimebox('getValue');
//		endTime = $('#endTime').datetimebox('getValue');
		//获取摄像头ID,
//		sxjid = $('#sxjid').combobox('getValue');
		var dataObj = getZkytData({configName:"zxyw",sql:"querySpxxBySxjid",params:"String#"+sxjid});
		if(dataObj != null){
			nvrip = dataObj["nvrip"];
			dlyhm = dataObj["dlyhm"];
			dlmm = dataObj["dlmm"];
			dkh = dataObj["dkh"];
			tdh = dataObj["tdh"];
		}
	}
	//首先进行登录
	var iRet = WebVideoCtrl.I_Login(nvrip,1,80,dlyhm,dlmm,{
		success:function(){
			//成功之后回调函数，执行开始预览操作
			var options = {
					iChannelID:tdh,
					szStartTime:startTime,
					szEndTime:endTime
			};
			WebVideoCtrl.I_StartPlayback(nvrip,options);
		},
		error:function(){
			alert("登录NVR失败！");
		}
	});
}
