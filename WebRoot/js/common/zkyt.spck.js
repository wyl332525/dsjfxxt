/**
 * args{
 *    ckwidth:100px   div窗口的宽度
 *    ckheight:100px  div窗口的高度
 *    ckname:'text'   div窗口的名称
 *    ckkjname:'123123' div里面视频控件的名称
 *    initid:'aaaaa'    放置在哪个div下，使用id
 *    isfull:'1'        是否显示全屏按键，1为是，0为否
 *    isphoto:'1'        是否显示全屏按键，1为是，0为否
 * }
 */
function initZkytHkwsSpck(args){
	var operObj = args;
	var webkj =  new hkwsspcj(operObj.ckkjname);
	var kk = operObj.ckkjname;
	kk = kk.toString();
	var div = "<div id='"+operObj.ckname+"_ck' style='text-align:right;'>";
	div += "<div id='"+operObj.ckname+"'></div>";
	div += "<div id='tools'>";
	//这里判断是否传了全屏按钮参数
	var sfqp = operObj.isfull;
	if(sfqp != null && sfqp != ""){
		if(sfqp == "1"){
			div += "<input type='button' value='全屏' onclick='fullScreen1()'/>";
		}
	}
	else{
		//如果没传该字段，默认加上全屏按钮
		div += "<input type='button' value='全屏' onclick='fullScreen("+operObj.ckkjname+")'/>";
	}
	//这里判断是否传了拍照按钮参数
	var sfpz = operObj.isphoto;
	if(sfpz != null && sfpz != ""){
		if(sfqp == "1"){
			div += "<input type='button' value='拍照' onclick='takePhoto("+operObj.ckkjname+")'/>";
		}
	}
	else{
		//如果没传该字段，默认加上拍照按钮
		div += "<input type='button' value='拍照' onclick='takePhoto("+ckkjname+")'/>";
	}
	div += "</div></div>";
	document.getElementById(operObj.initid).innerHTML = div;
	webkj.I_InitPlugin(operObj.ckwidth, operObj.ckheight, {
        iWndowType: 1
	});
	webkj.I_InsertOBJECTPlugin(operObj.ckname);
	
	//webkj.I_FullScreen(true);
}

function fullScreen1(){
	var k = document.getElementById('hkkj');
	var k1 = document.getElementByName('hkkj');
	alert(k1);
	k1.I_FullScreen(true);
}