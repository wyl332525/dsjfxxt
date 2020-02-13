
/**
 * 使用方法 引入该js后需要下载时，直接调用方法zkytFileDownload(fileName,saveName)就可以完成下载
 * @param fileName 需要下载文件名带绝对路径
 * @param saveName 下载后的文件名带文件扩展名，默认就是需要下载的文件名fileName的除去路径部分
 */
function zkytFileDownload(fileName,saveName){
	var downUrl="download";
	if(fileName==null){
		$.messager.alert("错误提示！","需要传入待下载的文件！");
		return;
	}
	if(saveName==null){
		saveName="";
		downUrl="downloadByName";
	}
	if(fileExist(fileName)){
		getDownloadForm(downUrl);
		$("#zkytDownloadFileName").val(fileName);
		$("#zkytDownloadSaveName").val(saveName);
		var formObj=$("#zkytDownloadForm");
		formObj.submit();
		formObj.remove();
		$("#zkytDownloadFormTarget").remove();
	}
}
//判断要下载的文件是否存在
function fileExist(tName){
	var ret=false;
	$.ajax({
		url:rootPath+"/common/fileExist.yt",
		data:{fileName:tName},
		async:false,type:"post",
		dataType:"text",
		success:function(data){
			if(data==""){//空表示存在
				ret=true;
			}else{
				$.messager.alert("错误提示！",data);
			}
		}
	});
	return ret;
}
function getDownloadForm(downUrl){
	$("#zkytDownloadForm").remove();
	var form = "<form id='zkytDownloadForm' style='display:none',target='zkytDownloadFormTarget',method='post' action='"+
		rootPath+"/common/"+downUrl+".yt'>"+
		"<input name='zkytDownloadFileName' id='zkytDownloadFileName' type='hidden'/>"+
		"<input name='zkytDownloadSaveName' id='zkytDownloadSaveName' type='hidden'/>"+
	"</form><iframe id='zkytDownloadFormTarget' style='display:none'></iframe>";  
	$('body').append(form); 
}