/**视频预览使用方法,需要同时引用此js和webVideoCtrl.js
 * args{
 *    ckwidth:100   div窗口的宽度
 *    ckheight:100  div窗口的高度
 *    initid:'aaaaa'    放置在哪个div下，使用id
 *    windNum:2
 *    isphoto:'1'        是否显示拍照按键，1为是，0为否
 * }
 */
function initZkytSpyl(args){
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
	var windNum = operObj.windNum;
	if(windNum == null || windNum == ""|| windNum == undefined){
		windNum = 2;
	}
	//初始化一个2*2的窗口
	WebVideoCtrl.I_InitPlugin(operObj.ckwidth, operObj.ckheight, {
        iWndowType:windNum,
        bWndFull:true
	});
	//把控件加载出来
	WebVideoCtrl.I_InsertOBJECTPlugin(operObj.initid);
}

function startPlay(nvrip,tdh){
	var dataObj = getZkytData({configName:"zxyw",sql:"queryNvrxxByIp",params:"String#"+nvrip});
	if(dataObj != null){
		var dlyhm = dataObj["dlyhm"];
		var dlmm = dataObj["dlmm"];
		var dkh = dataObj["dkh"];
		//首先进行登录
		var options = {
				iChannelID:tdh
		};
	    //首先进行登录
		//alert(nvrip+","+1+","+80+","+dlyhm+","+dlmm);
		var iRet = WebVideoCtrl.I_Login(nvrip,1,80,dlyhm,dlmm,{
			//async:false,
			success:function(){
				//成功之后回调函数，执行开始预览操作
				//alert("@#:"+nvrip);
				
				var i = WebVideoCtrl.I_StartRealPlay(nvrip,options);
			},
			error:function(){
				$.messager.alert("错误提示：","登录NVR失败！！");
			}
		});
		if (-1 == iRet) {
			//
			//alert("yidengl");
			WebVideoCtrl.I_StartRealPlay(nvrip,options);
		}
	}
	else{
		$.messager.alert("错误提示：","未查询到NVR信息！！");
	}
}

function stopPlay(iWndIndex){
	if(iWndIndex != null || iWndIndex != ""){
		WebVideoCtrl.I_Stop();
	}else{
		WebVideoCtrl.I_Stop(iWndIndex);
	}
}

function takePhoto(){
	var oDate = new Date(); //实例一个时间对象；
	var year = oDate.getFullYear();   //获取系统的年；
	var month = oDate.getMonth()+1;   //获取系统月份，由于月份是从0开始计算，所以要加1
	var day = oDate.getDate(); // 获取系统日，
	var hour = oDate.getHours(); //获取系统时，
	var minute = oDate.getMinutes(); //分
	var second = oDate.getSeconds(); //秒
	var time = year+"-"+month+"-"+day+"-"+hour+"-"+minute+"-"+second+".jpg";
	var aaa = WebVideoCtrl.I_GetLocalCfg();
	alert(aaa);
	WebVideoCtrl.I_CapturePic(time);
}
function fullScreen(){
	WebVideoCtrl.I_FullScreen(true);
}

function changeWndNum(iType) {
	iType = parseInt(iType, 10);
	WebVideoCtrl.I_ChangeWndNum(iType);
}