var alarmInfoWin = null;//本窗口对象
$(document).ready(function(){
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"jxh",
			sql:"alarmInfo",params:"String#"+pkid},
			async:false,type:"post",
		success:function(data){	
			if(null != data.rows && "" != data.rows){
				if(data.rows.length > 0){
					var obj = data.rows[0];
					initText(obj);
				} 
			}else{
				$.messager.alert("温馨提示：","没有报警信息!");
				return ;
			}
		},
		error:function(data){
			$.messager.alert("错误提示：","查询数据出错!");
			return ;
		}
	});
	
});

//关闭并刷新父窗口
function closeWin(){
	alarmInfoWin = getTopWindow('alarmInfoWin');
	alarmInfoWin.window('close');
}

//填充数据
function initText(data){
    if(null != data && "" != data){
        //给所有的textbox赋值
        $('.easyui-textbox').each(function(){
            var item_id = $(this).attr('id');
            $(this).textbox('setValue',data[item_id]=='null'?'':data[item_id]);
            $('#'+item_id).data(item_id,data[item_id]=='null'?'':data[item_id]);
        });
        $("#tdCphm").html(initTbCardStyle(data.cpys,data.cphm));
    }
}
