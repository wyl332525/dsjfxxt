/**
 * 使用直接调用方法var fileUpload= new initZkytFileUpload(arg)参数说明如下;上传直接调用方法fileUpload.startUploadFile();
 * arg={id:"存放input的id可以是div、span、td等容器",rootPath:'上传的应用根目录，默认是commonUpload',
 * 		isProcess:"是否需要上传进度条1要0不要，默认要",isUploadBtn:"是否要上传按钮1要，0不要，默认是0",
 * 		initFileNum:"初始的上传文件的个数默认是1",isChangNum:"是否允许增加和删除一个文件1允许0不允许，默认是0",
 * 		inputLen:"input的长度默认是350",successFun:function(sucArg){"上传完成后的回调方法，参数为json对象，具体如下说明"},
 * 		allowFile:".gif,.png（允许的文件类型，多个以逗号隔开，空表示所有都允许，不区分大小写）",
 * 		forbidFile:".exe（禁止上传的文件类型，多个以逗号隔开，空表示都不限制，不区分大小写）"
 * 	}
 * 回调函数参数：sucArg=
 * 		[
	  		{
	 	  	fileName:"上传文件的原来文件名称带扩展名",
	  	  	savePath:"文件保存在服务器上的绝对路径带文件名称",
	  	  	isSuccess:"上传是否成功“1”成功“0”失败",
	     	errInfo:"上传失败时候的错误信息，成功时为空的字符串"
 	     	},
     		{...},
     		...
     	]
  上传图片后，在页面上显示图片（回调函数中执行）：$("#showImg").attr("src",rootPath+"/getViewImg.yt?imgPath="+sucArg[0].savePath)
 */
function initZkytFileUpload(arg){
	var zkytFileArg=arg;
	var fileObj=this;
	if(arg.id==null){alert("参数Id不能为空！");return;}
	if(arg.isProcess!="0"){zkytFileArg.isProcess="1";}
	if(arg.isUploadBtn!="1"){zkytFileArg.isUploadBtn="0";}
	if(!arg.rootPath){zkytFileArg.rootPath="commonUpload";}
	if(arg.allowFile==null){zkytFileArg.allowFile="";}else{zkytFileArg.allowFile=arg.allowFile+",";}
	if(arg.forbidFile==null){zkytFileArg.forbidFile="";}else{zkytFileArg.forbidFile=arg.forbidFile+",";}
	var inputLen=350;
	if(arg.inputLen){inputLen=arg.inputLen;}
	zkytFileArg.inputLen=inputLen;
	
	if(arg.isChangNum=="1"){
		if(zkytFileArg.isUploadBtn=="1"){
			$("#"+arg.id).append("<div id='zkyt_file_"+arg.id+"'><input name='fileUploadName' id='zkyt_file_"+arg.id+"_file' style='width:"+inputLen+"px;'/>&nbsp;<a id='"+arg.id+"_addBtn' href='javascript:addOneZkytFile(\""+arg.id+"\")'>增加</a>&nbsp;<a id='"+arg.id+"_uploadBtn' href='javascript:seltStartUploadFile(\""+arg.id+"\")'>上传</a></div>");	
		}else{
			$("#"+arg.id).append("<div id='zkyt_file_"+arg.id+"'><input name='fileUploadName' id='zkyt_file_"+arg.id+"_file' style='width:"+inputLen+"px;'/>&nbsp;<a id='"+arg.id+"_addBtn' href='javascript:addOneZkytFile(\""+arg.id+"\")'>增加</a></div>");	
		}
	}else{
		zkytFileArg.isChangNum="0";
		
		if(zkytFileArg.isUploadBtn=="1"){
			$("#"+arg.id).append("<div id='zkyt_file_"+arg.id+"'><input name='fileUploadName' id='zkyt_file_"+arg.id+"_file' style='width:"+inputLen+"px;'/>&nbsp;<a id='"+arg.id+"_uploadBtn' href='javascript:seltStartUploadFile(\""+arg.id+"\")'>上传</a></div>");	
		}else{
			$("#"+arg.id).append("<div id='zkyt_file_"+arg.id+"'><input name='fileUploadName' id='zkyt_file_"+arg.id+"_file' style='width:"+inputLen+"px;'/></div>");	
		}
	}
	var initFileNum=arg.initFileNum;
	if(!initFileNum){zkytFileArg.initFileNum=1;}
	$("#"+zkytFileArg.id).data("uploadFileArg",zkytFileArg);
	if(initFileNum>1){
		for(var i=0;i<initFileNum-1;i++){
			addOneZkytFile(arg.id);
		}
	}
	//验证是否有问题，如果有问题则返回问题，如果没有问题，则返回空的字符串("");
	this.validateFile=function(){
		var filesObj=$("#"+zkytFileArg.id+" input[name='fileUploadName']");
		var errImgTxt="";
		var fileNum=filesObj.size();
		var forbid=zkytFileArg.forbidFile.replace("/，/ig",",").toLocaleLowerCase();
		var allow=zkytFileArg.allowFile.replace("/，/ig",",").toLocaleLowerCase();
		if(fileNum==0){
			errImgTxt="请添加需要上传的文件";
		}else{
			filesObj.each(function(i,o){
				var v=$(o).val();
				if(v==""){
					if(fileNum==1){
						errImgTxt+="，您没有选择需要上传的文件";
					}else{
						errImgTxt+="，\r\n第 "+(i+1)+" 行没有选择上传的文件";
					}
				}else{
					var fileType=v.substring(v.lastIndexOf(".")).toLocaleLowerCase()+",";
					if(allow!=""){
						if(allow.indexOf(fileType)<0){
							if(fileNum==1){
								errImgTxt+="，您所选择的文件类型"+fileType.substring(0,fileType.length-1)+"不允许被上传,允许的文件类型为："+allow.substring(0,allow.length-1);
							}else{
								errImgTxt+="，\r\n第 "+(i+1)+" 您所选择的文件类型"+fileType.substring(0,fileType.length-1)+"不允许被上传,允许的文件类型为："+allow.substring(0,allow.length-1);
							}
							return;
						}
					}
					if(forbid!=""){
						if(forbid.indexOf(fileType)>=0){
							if(fileNum==1){
								errImgTxt+="，您所选择的文件类型"+fileType.substring(0,fileType.length-1)+"不允许被上传！";
							}else{
								errImgTxt+="，\r\n第 "+(i+1)+" 您所选择的文件类型"+fileType.substring(0,fileType.length-1)+"不允许被上传！";
							}
							return;
						}
					}
				}
			});
		}
		if(errImgTxt!=""){
			errImgTxt=errImgTxt.substring(1)+"，请检查！";
		}
		return errImgTxt
	}
	//开始上传文件,如果有问题，则返回false
	this.startUploadFile=function(){
		var uploadFileRoot=zkytFileArg.rootPath;
		var isProcess=zkytFileArg.isProcess;
		var files=new Array();
		var filesObj=$("#"+zkytFileArg.id+" input[name='fileUploadName']");
		var errImgTxt="";
		var fileNum=filesObj.size();
		var forbid=zkytFileArg.forbidFile.replace("/，/ig",",").toLocaleLowerCase();
		var allow=zkytFileArg.allowFile.replace("/，/ig",",").toLocaleLowerCase();
		if(fileNum==0){
			alert("请添加需要上传的文件");
			return;
		}else{
			filesObj.each(function(i,o){
				var v=$(o).val();
				if(v==""){
					if(fileNum==1){
						errImgTxt+="，您没有选择需要上传的文件";
					}else{
						errImgTxt+="，\r\n第 "+(i+1)+" 行没有选择上传的文件";
					}
					return;
				}else{
					var fileType=v.substring(v.lastIndexOf(".")).toLocaleLowerCase()+",";
					if(allow!=""){
						if(allow.indexOf(fileType)<0){
							if(fileNum==1){
								errImgTxt+="，您所选择的文件类型"+fileType.substring(0,fileType.length-1)+"不允许被上传,允许的文件类型为："+allow.substring(0,allow.length-1);
							}else{
								errImgTxt+="，\r\n第 "+(i+1)+" 您所选择的文件类型"+fileType.substring(0,fileType.length-1)+"不允许被上传,允许的文件类型为："+allow.substring(0,allow.length-1);
							}
							return;
						}
					}
					if(forbid!=""){
						if(forbid.indexOf(fileType)>=0){
							if(fileNum==1){
								errImgTxt+="，您所选择的文件类型"+fileType.substring(0,fileType.length-1)+"不允许被上传！";
							}else{
								errImgTxt+="，\r\n第 "+(i+1)+" 您所选择的文件类型"+fileType.substring(0,fileType.length-1)+"不允许被上传！";
							}
							return;
						}
					}
				}
				files.push($(o).attr("id"));
			});
		}
		if(errImgTxt!=""){
			alert(errImgTxt.substring(1)+"，请检查！");
			return;
		}
		var startTime=new Date().getTime();
		$("#"+zkytFileArg.id).data("fileUploadRet",null);
		//开始上传文件
		$.ajaxFileUpload({
			url : rootPath+"/fileUpload/upload.yt",
			data:{saveRoot:uploadFileRoot},
			fileElementId:files,
			cache : false,async : false,
			type : "post",dataType : 'json',
			success : function (ret){
				if(intervalBar!=null){window.clearInterval(intervalBar);};
				window.top.$("#"+startTime+"_modle_fileProcess").remove();
				if(ret==""){
					alert("上传文件时出现未知错误！");
				}else{
					if(zkytFileArg.successFun){
						zkytFileArg.successFun(ret);
					}
					var fileBoxArray=$("#"+arg.id).data("fileboxObjs");
					for(var i=fileBoxArray.length-1;i>=0;i--){
						$("#"+fileBoxArray[i]).filebox("clear");
					}
				}
			},
			error:function(){
				if(intervalBar!=null){window.clearInterval(intervalBar);};
				window.top.$("#"+startTime+"_modle_fileProcess").remove();
				alert("上传文件失败，可能是文件太大! ");
			}
		});
		//是否需要启动进度条
		var processBar=null;
		var intervalBar=null;
		if(isProcess=="1"){
			var width=window.top.$("body").outerWidth();
			var processHtml="<div id='"+startTime+"_modle_fileProcess' style='text-align:center;filter:alpha(opacity=70);-moz-opacity:0.7;width:100%;height:100%;z-index:100001;position:absolute;top:0;left:0;background-color:gray'>";
			processHtml+="<div id='"+startTime+"_modle_process' class='easyui-progressbar' style='width:500px;margin-top:200px;margin-left:"+(width-550)/2+"px'></div>";
			processHtml+="<table style='width:500px;margin-left:"+(width-550)/2+"px'></td></tr>"+
						"<tr><td id='percentDone_"+startTime+"' align='left' width='50%'></td><td id='whichItem_"+startTime+"' align='left'></td></tr>"+
						"<tr><td id='timeInfo_"+startTime+"' align='left' width='50%'></td><td id='needTime_"+startTime+"' align='left'></td></tr>"+
						"<tr><td id='theContentLength_"+startTime+"' align='left' width='50%'></td><td id='theBytesRead_"+startTime+"' align='left'></td></tr>"+
						"<tr><td id='curSpeed_"+startTime+"' align='left' width='50%'></td><td id='avgSpeed_"+startTime+"' align='left'></td></tr>"+
						"</table><div>";
			window.top.$("body").append(processHtml);
			window.top.$("#"+startTime+"_modle_process").progressbar({
			    value: 0,
			    height:20,
			    width:500
			});
			intervalBar=window.setInterval("getZkytFileUploadProcess("+startTime+")",1000);
			window.top.$("#"+startTime+"_modle_fileProcess").data("'"+startTime+"'",intervalBar);
		}
	}
	$("#zkyt_file_"+arg.id+"_file").filebox({buttonAlign: 'right',buttonText: '请选择文件'});
	$("#"+arg.id+"_addBtn").linkbutton({iconCls: 'icon-add'});  
	$("#"+arg.id+"_uploadBtn").linkbutton({iconCls: 'icon-ok'}); 
	//缓存filebox的id数组
	var fileBoxArray=new Array();
	fileBoxArray.push("zkyt_file_"+arg.id+"_file");
	$("#"+arg.id).data("fileboxObjs",fileBoxArray);
}

function seltStartUploadFile(id){
	var zkytFileArg=$("#"+id).data("uploadFileArg");
	var uploadFileRoot=zkytFileArg.rootPath;
	var isProcess=zkytFileArg.isProcess;
	var files=new Array();
	var filesObj=$("#"+zkytFileArg.id+" input[name='fileUploadName']");
	var errImgTxt="";
	var fileNum=filesObj.size();
	var forbid=zkytFileArg.forbidFile.replace("/，/ig",",").toLocaleLowerCase();
	var allow=zkytFileArg.allowFile.replace("/，/ig",",").toLocaleLowerCase();
	if(fileNum==0){
		alert("请添加需要上传的文件");
		return;
	}else{
		filesObj.each(function(i,o){
			var v=$(o).val();
			if(v==""){
				if(fileNum==1){
					errImgTxt+="，您没有选择需要上传的文件";
				}else{
					errImgTxt+="，\r\n第 "+(i+1)+" 行没有选择上传的文件";
				}
				return;
			}else{
				var fileType=v.substring(v.lastIndexOf(".")).toLocaleLowerCase()+",";
				if(allow!=""){
					if(allow.indexOf(fileType)<0){
						if(fileNum==1){
							errImgTxt+="，您所选择的文件类型"+fileType.substring(0,fileType.length-1)+"不允许被上传,允许的文件类型为："+allow.substring(0,allow.length-1);
						}else{
							errImgTxt+="，\r\n第 "+(i+1)+" 您所选择的文件类型"+fileType.substring(0,fileType.length-1)+"不允许被上传,允许的文件类型为："+allow.substring(0,allow.length-1);
						}
						return;
					}
				}
				if(forbid!=""){
					if(forbid.indexOf(fileType)>=0){
						if(fileNum==1){
							errImgTxt+="，您所选择的文件类型"+fileType.substring(0,fileType.length-1)+"不允许被上传！";
						}else{
							errImgTxt+="，\r\n第 "+(i+1)+" 您所选择的文件类型"+fileType.substring(0,fileType.length-1)+"不允许被上传！";
						}
						return;
					}
				}
			}
			files.push($(o).attr("id"));
		});
	}
	if(errImgTxt!=""){
		alert(errImgTxt.substring(1)+"，请检查！");
		return;
	}
	var startTime=new Date().getTime();
	$("#"+zkytFileArg.id).data("fileUploadRet",null);
	//开始上传文件
	$.ajaxFileUpload({
		url : rootPath+"/fileUpload/upload.yt",
		data:{saveRoot:uploadFileRoot},
		fileElementId:files,
		cache : false,async : false,
		type : "post",dataType : 'json',
		success : function (ret){
			if(intervalBar!=null){window.clearInterval(intervalBar);};
			window.top.$("#"+startTime+"_modle_fileProcess").remove();
			if(ret==""){
				alert("上传文件时出现未知错误！");
			}else{
				if(zkytFileArg.successFun){
					zkytFileArg.successFun(ret);
				}
				var fileBoxArray=$("#"+id).data("fileboxObjs");
				for(var i=fileBoxArray.length-1;i>=0;i--){
					$("#"+fileBoxArray[i]).filebox("clear");
				}
			}
		},
		error:function(){
			if(intervalBar!=null){window.clearInterval(intervalBar);};
			window.top.$("#"+startTime+"_modle_fileProcess").remove();
			alert("上传文件失败，可能是文件太大! ");
		}
	});
	//是否需要启动进度条
	var processBar=null;
	var intervalBar=null;
	if(isProcess=="1"){
		var width=window.top.$("body").outerWidth();
		var processHtml="<div id='"+startTime+"_modle_fileProcess' style='text-align:center;filter:alpha(opacity=70);-moz-opacity:0.7;width:100%;height:100%;z-index:100001;position:absolute;top:0;left:0;background-color:gray'>";
		processHtml+="<div id='"+startTime+"_modle_process' class='easyui-progressbar' style='width:500px;margin-top:200px;margin-left:"+(width-550)/2+"px'></div>";
		processHtml+="<table style='width:500px;margin-left:"+(width-550)/2+"px'></td></tr>"+
					"<tr><td id='percentDone_"+startTime+"' align='left' width='50%'></td><td id='whichItem_"+startTime+"' align='left'></td></tr>"+
					"<tr><td id='timeInfo_"+startTime+"' align='left' width='50%'></td><td id='needTime_"+startTime+"' align='left'></td></tr>"+
					"<tr><td id='theContentLength_"+startTime+"' align='left' width='50%'></td><td id='theBytesRead_"+startTime+"' align='left'></td></tr>"+
					"<tr><td id='curSpeed_"+startTime+"' align='left' width='50%'></td><td id='avgSpeed_"+startTime+"' align='left'></td></tr>"+
					"</table><div>";
		window.top.$("body").append(processHtml);
		window.top.$("#"+startTime+"_modle_process").progressbar({
		    value: 0,
		    height:20,
		    width:500
		});
		intervalBar=window.setInterval("getZkytFileUploadProcess("+startTime+")",1000);
		window.top.$("#"+startTime+"_modle_fileProcess").data("'"+startTime+"'",intervalBar);
	}
}

//增加一个上传的inpunt对象
function addOneZkytFile(contentId){
	var arg=$("#"+contentId).data("uploadFileArg")
	var id="zkyt_file_"+new Date().getTime();
	var html="";
	if(arg.isChangNum=="1"){
		html="<div id='"+id+"'><input name='fileUploadName' id='"+id+"_file' style='width:"+arg.inputLen+"px;'/>&nbsp;<a id='"+id+"_delBtn' href='javascript:delThisZkytFile(\""+id+"\",\""+contentId+"\")'>删除</a></div>";
	}else{
		html="<div id='"+id+"'><input name='fileUploadName' id='"+id+"_file' style='width:"+arg.inputLen+"px;'/></div>";
	}
	$("#"+arg.id).append(html);
	$("#"+id+"_file").filebox({buttonAlign: 'right',buttonText: '请选择文件'});
	var fileBoxArray=$("#"+contentId).data("fileboxObjs");
	fileBoxArray.push(id+"_file");
	$("#"+contentId).data("fileboxObjs",fileBoxArray);
	if(arg.isChangNum=="1"){
		$("#"+id+"_delBtn").linkbutton({iconCls: 'icon-remove'});  
	}
}
//删除一个上传的inpunt对象
function delThisZkytFile(id,contentId){
	$("#"+id).remove();
	var fileBoxArray=$("#"+contentId).data("fileboxObjs");
	for(var i=fileBoxArray.length-1;i>=0;i--){
		if(fileBoxArray[i]==id+"_file"){
			fileBoxArray.splice(i,1);
			break;
		}
	}
	$("#"+contentId).data("fileboxObjs",fileBoxArray);
}
//获取上传的进度
function getZkytFileUploadProcess(startTime){
	$.ajax({
		url : rootPath+"/fileUpload/getProcess.yt",
		data:{},
		async:false,
		type:"post",
		dataType:"json",
		success:function(data){
			var percentDone=data.percentDone;
			if(percentDone!=null){
				var theBytesRead=data.theBytesRead;
				var theContentLength=data.theContentLength;
				var whichItem=data.whichItem;
				var curTime=new Date().getTime();
				var usedTime=Math.round((curTime-startTime)/1000);
				var timeInfo="已经使用时间："+Math.floor(usedTime/60)+"分"+(usedTime%60)+"秒";
				var needTime=Math.round((theContentLength-theBytesRead)/theBytesRead*usedTime);
				var needTime="预计剩余时间："+Math.floor(needTime/60)+"分"+(needTime%60)+"秒";
				var lastRead=window.top.$("#"+startTime+"_modle_fileProcess").data("lastRead");//上一次的读取长度
				if(lastRead==null){
					lastRead=theBytesRead;
				}
				window.top.$("#"+startTime+"_modle_fileProcess").data("lastRead",theBytesRead);
				
				window.top.$("#timeInfo_"+startTime).html(timeInfo);
				window.top.$("#needTime_"+startTime).html(needTime);
				window.top.$("#percentDone_"+startTime).html("已经完成进度："+percentDone+"%");
				window.top.$("#whichItem_"+startTime).html("当前正在上传：第"+(whichItem-1)+"个文件");
				window.top.$("#theContentLength_"+startTime).html("总共文件大小："+Math.round(theContentLength/1024/1024*100)/100+"MB");
				window.top.$("#theBytesRead_"+startTime).html("已经上传大小："+Math.round(theBytesRead/1024/1024*100)/100+"MB");
				var curSpeed=(theBytesRead-lastRead)/1024
				if(curSpeed>=1000){
					curSpeed="当前上传速度："+Math.round(curSpeed/1024*100)/100+"MB/S";
				}else{
					curSpeed="当前上传速度："+Math.round(curSpeed*100)/100+"KB/S";
				}
				window.top.$("#curSpeed_"+startTime).html(curSpeed);
				var avgSpeed=theBytesRead/1024;
				if(avgSpeed>=1000){
					avgSpeed="平均上传速度："+Math.round(avgSpeed/1024/usedTime*100)/100+"MB/S";
				}else{
					avgSpeed="平均上传速度："+Math.round(avgSpeed/usedTime*100)/100+"KB/S";
				}
				window.top.$("#avgSpeed_"+startTime).html(avgSpeed);
				window.top.$("#"+startTime+"_modle_process").progressbar('setValue', percentDone);
				if(Number(percentDone)>=100){
					window.clearInterval(window.top.$("#"+startTime+"_modle_fileProcess").data("'"+startTime+"'"));
					window.top.$("#"+startTime+"_modle_fileProcess").remove();
				}
			}
		},
		error:function(e){
		}
	});
}

jQuery.extend( {
	createUploadIframe : function(id, uri) {
	//创建Iframe
		var frameId = 'jUploadFrame' + id;
		var iframeHtml = '<iframe id="'+frameId+'" name="'+frameId+'" style="position:absolute; top:-9999px; left:-9999px"';
		if (window.ActiveXObject) {
			if (typeof uri == 'boolean') {
				iframeHtml += ' src="'+'javascript:false'+'"';
			} else if (typeof uri == 'string') {
				iframeHtml+=' src="'+uri+'"';
			}
		}
		iframeHtml+=' />';
		jQuery(iframeHtml).appendTo(document.body);
		return jQuery('#' + frameId).get(0);
	},
	createUploadForm : function(id, fileElementId, data) {
		//创建提交的form
		var formId = 'jUploadForm' + id;
		var fileId = 'jUploadFile' + id;
		var form = jQuery('<form  action="" method="POST" name="'+formId+'" id="'+formId+'" enctype="multipart/form-data"></form>');
		if (data) {
			for ( var i in data) {
				jQuery('<input type="hidden" name="' + i + '" value="'+ data[i] + '" />').appendTo(form);
			}
		}
		if (fileElementId.constructor == String && fileElementId != "") {
			var oldElement = jQuery('#' + fileElementId);
			var newElement = jQuery(oldElement).clone();
			jQuery(oldElement).attr('id', fileId);
			jQuery(oldElement).before(newElement);
			jQuery(oldElement).appendTo(form);
		} else if (fileElementId.constructor == Array && fileElementId.length > 0) {
			var forid=1;
			for (var iii=0;iii<fileElementId.length;iii++) {
				var oldElement = jQuery('#' + fileElementId[iii]);
				var newElement = jQuery(oldElement).clone();
				jQuery(oldElement).attr('id', fileId+(forid++));
				jQuery(oldElement).before(newElement);
				jQuery(oldElement).appendTo(form);
			}
		}
		//设置css属性
		jQuery(form).css('position', 'absolute');
		jQuery(form).css('top', '-1200px');
		jQuery(form).css('left', '-1200px');
		jQuery(form).appendTo('body');
		return form;
	},

	ajaxFileUpload : function(s) {
		// TODO introduce global settings, allowing the client to modify them for all requests, not only timeout		
		s = jQuery.extend( {}, jQuery.ajaxSettings, s);
		var id = new Date().getTime()
		var form = jQuery.createUploadForm(id, s.fileElementId,(typeof (s.data) == 'undefined' ? false : s.data));
		var io = jQuery.createUploadIframe(id, s.secureuri);
		var frameId = 'jUploadFrame' + id;
		var formId = 'jUploadForm' + id;
		// Watch for a new set of requests
		if (s.global && !jQuery.active++) {
			jQuery.event.trigger("ajaxStart");
		}
		var requestDone = false;
		// Create the request object
		var xml = {}
		if (s.global)
			jQuery.event.trigger("ajaxSend", [ xml, s ]);
		// Wait for a response to come back
		var uploadCallback = function(isTimeout) {
			var io = document.getElementById(frameId);
			try {
				if (io.contentWindow) {
					xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML:null;
					xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument:io.contentWindow.document;
				} else if (io.contentDocument) {
					xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML:null;
					xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument:io.contentDocument.document;
				}
			} catch (e) {
				jQuery.handleError(s, xml, null, e);
			}
			if (xml || isTimeout == "timeout") {
				requestDone = true;
				var status;
				try {
					status = isTimeout != "timeout" ? "success" : "error";
					// Make sure that the request was successful or notmodified
					if (status != "error") {
						// process the data (runs the xml through httpData regardless of callback)
						var data = jQuery.uploadHttpData(xml, s.dataType);
						// If a local callback was specified, fire it and pass it the data
						if (s.success)s.success(data, status);
						// Fire the global callback
						if (s.global)jQuery.event.trigger("ajaxSuccess", [ xml, s ]);
					} else
						jQuery.handleError(s, xml, status);
				} catch (e) {
					status = "error";
					jQuery.handleError(s, xml, status, e);
				}
				// The request was completed
				if (s.global)jQuery.event.trigger("ajaxComplete", [ xml, s ]);
				// Handle the global AJAX counter
				if (s.global && !--jQuery.active)jQuery.event.trigger("ajaxStop");

				// Process result
				if (s.complete)s.complete(xml, status);

				jQuery(io).unbind()

				setTimeout(function() {
					try {
						jQuery(io).remove();
						jQuery(form).remove();
					} catch (e) {
						jQuery.handleError(s, xml, null, e);
					}
				}, 100)
				xml = null
			}
		}
		// Timeout checker
		if (s.timeout > 0) {
			setTimeout(function() {
				// Check to see if the request is still happening
					if (!requestDone)uploadCallback("timeout");
				}, s.timeout);
		}
		try {
			var form = jQuery('#' + formId);
			jQuery(form).attr("action", s.url);
			jQuery(form).attr("method", "POST");
			jQuery(form).attr("target", frameId);
			if (form.encoding) {
				jQuery(form).attr('encoding', "multipart/form-data");
			} else {
				jQuery(form).attr('enctype', "multipart/form-data");
			}
			//alert(jQuery(form).parent().html())
			jQuery(form).submit();

		} catch (e) {
			jQuery.handleError(s, xml, null, e);
		}

		jQuery('#' + frameId).load(uploadCallback);
		return {abort : function() {}
		};

	},

	 handleError: function( s, xhr, status, e )      {  
        if ( s.error ) {  
        	s.error.call( s.context || s, xhr, status, e );  
    	}  
        if ( s.global ) {  
            (s.context ? jQuery(s.context) : jQuery.event).trigger( "ajaxError", [xhr, s, e] );  
        }  
    },  
	uploadHttpData : function(r, type) {
		var data = !type;
		data = type == "xml" || data ? r.responseXML : r.responseText;
		// If the type is "script", eval it in global context
		if (type == "script")
			jQuery.globalEval(data);
		// Get the JavaScript object, if JSON is used.
		if (type == "json")
			eval("data = " + data);
		// evaluate scripts within html
		if (type == "html")
			jQuery("<div>").html(data).evalScripts();
		return data;
	}
});
