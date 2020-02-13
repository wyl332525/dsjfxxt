var amplificationWin = null;//放大倍数窗口
var titleT = "";//曲线标题
var fields = "";//过程数据文件的列名
$(document).ready(function(){
	if(jcff == 'DB'){//双怠速
		titleT = "HC(10-6vol),CO(%vol),CO2(%vol),O2(%vol),发动机转速";
	}else if(jcff == 'WT'){//稳态工况法
		titleT = "HC(10-6vol),CO(%vol),NO(10-6vol),CO2(%vol),O2(%vol),车速";
	}else if(jcff == 'IG'){//简易瞬态法
		titleT = "HC(10-6vol),CO(%vol),NO(10-6vol),CO2(%vol),O2(%vol),车速";
	}else if(jcff == 'LD'){//加载减速工况法
		titleT = "实时车速,发动机转速,轮边功率,烟度值";
	}else if(jcff == 'TG'){//不透光烟度法   
		titleT = "烟度,发动机转速";
	}

	if(fields != null && fields != ""){
		var field = fields.split(";;");
		var title = titleT.split(",");
		var html="<table style='width:100%;border:1;'> ";
		for(var i=0;i<field.length-1;i++){
			var idvalue=field[i];
			var id = idvalue.split(":")[0];
			var value = idvalue.split(":")[1];
			var name = title[i];
			html += "<tr><td style='text-align:right;width:40%;'>"+name+"</td>";
			html += "<td style='text-align:left;width:60%;' >";
			html += "<input type='text' class='text' id='"+id+"' value='"+value+"' onkeypress=\"keyPress(this)\" onkeyup=\"keyUp(this)\" onblur=\"onBlur(this)\"/>";
			html += "</td></tr>";
		}
		html += "</table>";
		$("#fdPanel").append(html);
	}
	
});

//确定
function save(){
	var bs = '';//格式     id:值;;id:值;;...
	$('.text').each(function(){//许可业务
		var item_id = $(this).attr('id');
		var valueStr = document.getElementById(item_id).value;
		bs += item_id+":";
		if(null != valueStr && valueStr != ''){
			bs += valueStr+";;";
		}else{
			bs += "1;;"
		}
	});

	amplificationWin = getTopWindow('amplificationWin');
	window.top.$("#amplificationWinIframe").data('openid').getGcsj(jcbgPkid,bs);//调用父窗口方法
	amplificationWin.window('close');
	
}

//关闭并刷新父窗口
function closeWin(){
	amplificationWin = getTopWindow('amplificationWin');
	amplificationWin.window('close');
}

//只能输入正数字
function keyPress(ob){
	if(!ob.value.match(/^[\+]?\d*?\.?\d*?$/)){
		ob.value = ob.t_value;
	}else{
		ob.t_value = ob.value;
	}
	if(ob.value.match(/^(?:[\+]?\d+(?:\.\d+)?)?$/)){
		ob.o_value = ob.value;
	}
}
function keyUp(ob){
	if(!ob.value.match(/^[\+]?\d*?\.?\d*?$/)){
		ob.value = ob.t_value;
	}else{
		ob.t_value = ob.value;
	}
	if(ob.value.match(/^(?:[\+]?\d+(?:\.\d+)?)?$/)){
		ob.o_value = ob.value;
	}
}
function onBlur(ob){
	if(!ob.value.match(/^(?:[\+]?\d+(?:\.\d+)?|\.\d*?)?$/)){
		ob.value = ob.o_value;
	}else{
		if(ob.value.match(/^\.\d+$/)){
			ob.value = 0+ob.value;
		}
		if(ob.value.match(/^\.$/)){
			ob.value = 0;
			ob.o_value = ob.value;
		}
	}
	
}