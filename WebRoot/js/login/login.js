//获取屏幕高度自适应全屏展示
$(function(){
    var height=window.innerHeight;
    document.body.style.height= height+"px";
    $("#main").css({
        //页面主体部分获取减去首尾的高度值
        height:height-65+'px'
    });
    $(window).resize(function () {
        var height=window.innerHeight;
        document.body.style.height= height+"px";
        $("#main").css({
            height:height-65+'px'
        });
    });
});

//切换二维码功能
$(".smallCode").mouseenter(function(){
    $("#login").hide(100);
    $(".code").show(100);
    $(".smallCode").hide(100);
});
$(".loginBox").mouseleave(function(){
    $("#login").show(100);
    $(".code").hide(100);
    $(".smallCode").show(100);
});

// select选择框功能
$(document).ready(function(){
    $(".select_box").click(function(event){
        event.stopPropagation();
        $(this).find(".option").toggle();
        $(this).parent().siblings().find(".option").hide();
    });
    $(document).click(function(event){
        var eo=$(event.target);
        if($(".select_box").is(":visible") && eo.attr("class")!="option" && !eo.parent(".option").length)
            $('.option').hide();
    });
    /*赋值给文本框*/
    $(".option a").click(function(){
        var value=$(this).text();
        $(this).parent().siblings(".select_txt").text(value);
        $("#select_value").val(value)
    })
});

var headerHeight=90;//默认header头高度
var bottomHeight=45;//默认bottom高度
var bgHeight=417;//背景图片的默认高度
var bgWidth=1267;//背景图片的默认宽度
var codes = "";//验证码
$(document).ready(function(){
	if(alertInfo=="1"){
		alert("退出提醒：您已成功退出系统;");
	}

	//显示验证码
	showYzm();
	
	//用户名回车事件
	$('#userId').keydown(function(event){
		if (event.keyCode == '13') {
		   	$('#password').focus();
		}
	});
	//密码回车事件
	$("#password").keydown(function(event){
		if (event.keyCode == '13') {
			if($("#password").val()==""){
				$("#password").focus();
			}else{
			    if(sfxyyzm=="1"){//有验证码
			    	$('#jcaptcha').focus();
			    	showYzm();
			    }else{//没有验证码
			    	$("#dlBtn").click();
			    }
			}
		}
	});
	//验证码回车事件
	$('#jcaptcha').keypress(function(event){
		if (event.keyCode == '13') {
			if($('#jcaptcha').val()==""){
				$('#jcaptcha').focus();
				showYzm();
			}else{
				//$("#yzm_WinId").hide();
		    	$("#dlBtn").click();
			}
		}
	});

	//处理按钮执行函数
	$("#dlBtn").click(function(){
		var UserID = $("#userId").val(); 
	    if(UserID.replace(/(^\s*)|(\s*$)/g, "") == ""){
	       alert("操作提示：用户名不能为空！");
	        $('#userId').focus();
	        return false;
	    }
	    var PassWord = $("#password").val(); 
	    if(PassWord.replace(/(^\s*)|(\s*$)/g, "") == ""){
	    	alert("操作提示：密码不能为空！");
	        $('#password').focus();
	        return false;
	    }
	   
	     var Verify =$("#jcaptcha").val(); 
	      if(Verify.replace(/(^\s*)|(\s*$)/g, "") == "" && sfxyyzm=="1") {
	    	alert("操作提示：校验码不能为空");
	        $('#jcaptcha').focus();
	        return false;
	    }
	    var ret = validCode();//判断验证码是否正确 
	    if(ret == true){
	    	var jmPassWord=base64encode(PassWord);
		    var uid=base64encode(UserID);

			$.ajax({
				url:rootPath+"/login/yz.yt",
				data:{userId:uid,userPd:jmPassWord,userYzm:Verify,dlsj:new Date().getTime()},
				async:false,type:"post",
				success:function(data){
					if(data.substr(0,5)=="error"){
						alert("操作提示："+data.substr(6));
						showYzm();
					}else{
						var index=data.indexOf("?info=");
						var info="";
						if(index>0){
							info=data.substr(index+6);
							data=data.substr(0,index);
						}
						$("body").append("<form id='loginForm' method='post' action='"+rootPath+data+"'><input id='info' name='info' value='"+info+"'></form>");
						$("#loginForm").submit();
					}
				},
				error:function(e){
					alert("出错提示：登录时出现未知错误！");
				}
			});
	    }
	});
});

//显示验证码的值
function showYzm(){
	var yzm = getCode();
	$("#jcaptcha").val("");//清空验证码
	$("#yzm").text(yzm);
}

//验证验证码
function validCode(){
	if(sfxyyzm == "1"){
		var codeValue = $("#jcaptcha").val().toUpperCase();
		if(codeValue == 0){
			alert("请输入验证码!");
			return ;
		}else if(codeValue != codes.toUpperCase()){
			alert("验证码不正确，请重新输入!");
			showYzm();
			return ;
		}
	}
	return true;
}

/*base64编码加密*/
function base64encode(str) { 
	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; 
	var base64DecodeChars = new Array( 
	    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
	    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
	    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 
	    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, 
	    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
	    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, 
	    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
	    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1); 
	
    var out, i, len; 
    var c1, c2, c3; 

    len = str.length; 
    i = 0; 
    out = ""; 
    while(i < len) { 
    c1 = str.charCodeAt(i++) & 0xff; 
    if(i == len) 
    { 
        out += base64EncodeChars.charAt(c1 >> 2); 
        out += base64EncodeChars.charAt((c1 & 0x3) << 4); 
        out += "=="; 
        break; 
    } 
    c2 = str.charCodeAt(i++); 
    if(i == len) 
    { 
        out += base64EncodeChars.charAt(c1 >> 2); 
        out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4)); 
        out += base64EncodeChars.charAt((c2 & 0xF) << 2); 
        out += "="; 
        break; 
    } 
    c3 = str.charCodeAt(i++); 
    out += base64EncodeChars.charAt(c1 >> 2); 
    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4)); 
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6)); 
    out += base64EncodeChars.charAt(c3 & 0x3F); 
    } 
    //base64编码后在按自己的算法在进行编码
    return out; 
} 

//随机生成四位验证码
function getCode(){
	//var arr="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var arr="";
	if(sfsz == "1"){
		arr += "0123456789";
	}
	if(zmlx == "1"){
		arr += "abcdefghjklmnpqrstuvwxyz";
	}else if(zmlx == "2"){
		arr += "ABCDEFGHJKLMNPQRSTUVWXYZ";
	}else{
		arr += "abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	}
	codes="";
	for(var i=0; i<4; i++){
		var index = Math.floor(Math.random()*(arr.length));
		codes += arr.charAt(index);
	}	
	return codes;
} 

