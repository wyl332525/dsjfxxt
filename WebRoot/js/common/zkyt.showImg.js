//直接传图片的绝对地址，就可以进行图片查看,如果是相对路径，则islocal应为1或true，这样就直接用图片路径
function showZkytImg(path,islocal){
	var imgUrl=rootPath+"/getViewImg.yt?imgPath="+path;
	if(islocal==true || islocal==1){
		imgUrl=path;
	}
	var winHeight=window.top.topHeight-20;//弹出窗口的高度，浏览器总高度减去20
	var winWidth=winHeight*1.5;//弹出窗口的宽度，为高度的1.5倍
	if(winWidth>window.top.topWidth){//如果宽度比浏览器的宽度还宽，则默认为浏览器的宽度
		winWidth=window.top.topWidth;
	}
	if(getTopWindow("show_Img_top_Win")!=null){//如果该图片浏览窗口已经创建，则不用重新创建，只用进行初始化就可以了
		window.top.$('#win_show_div_img').css({'width':'','height':''});
		window.top.$("#win_show_div_img").attr("src",imgUrl);//首先将图片的src路径设置为要看的图片
		window.top.$('#win_show_div_img').css({'position':'static'});//将图片的position设置为static
		window.top.$('#div_slider_img_win').data("imgValue",1);//设置缓存的图片放大倍数初始为1
		window.top.imgRotate(0);//给已经旋转的图片复位
		window.top.$('#div_slider_img_win').data("imgRotate",0);//图片旋转度数默认为0
		window.top.$('#div_slider_img_win').data("imgWidth",0);//重新缓存图片的宽度和高度
		window.top.$('#div_slider_img_win').data("imgHeight",0);
		window.top.$("#rotate_value").combobox("setValue",90);//旋转度数下拉框默认为90度
		 //重新初始化滑动条，不然会报错
		window.top.$("#slider_img_win").slider({//初始化滑动条
		    mode: 'h',  
		    width:300,
		    height:50,
		    value:100,
		    min:1,
		    max:500,
		    step:1,
		    showTip:true,
		    onChange:function(newV,oldV){//滑动条数据改变事件
		    	var winObj=window.top.$('#div_slider_img_win');
		    	var imgValue=newV/100;
		    	winObj.data('imgValue',imgValue);
		    	if(winObj.data('imgWidth')==0 || winObj.data('imgHeight')==0){
		    		winObj.data('imgWidth',window.top.$("#win_show_div_img").width());
		    		winObj.data('imgHeight',window.top.$("#win_show_div_img").height());
		    	}
		    	var pObj=window.top.$('#win_show_div_img').parent();
		    	var pObjOffset=pObj.offset();
				var newW=winObj.data('imgWidth')*imgValue;
				var newH=winObj.data('imgHeight')*imgValue;
				var newTop=pObjOffset.top;
				var newLeft=pObjOffset.left;
				var position='absolute';
				if(newW<pObj.width()){
					newLeft=(pObj.width()-newW)/2;
				}else{
					position='static';
				}
				if(newH<pObj.height()){
					newTop=(pObj.height()-newH)/2;
				}else{
					position='static';
				}
				window.top.$('#win_show_div_img').css({'width':newW,'height':newH,'position':position,'top':newTop,'left':newLeft}); 
		    },
		    tipFormatter: function(value){
		    	var temp="";
		    	if(value>100){
		    		temp="放大到";
		    	}else if(value<100){
		    		temp="缩小到";
		    	}
		        return temp+value+'%';    
		    }
		});  
		getTopWindow("show_Img_top_Win").window('open');//打开该图片窗口
	}else{
		//组装图片的查看html数据
		var htmlImg="<div id='show_Img_top_Win' style='width:100%;height:100%;overflow: hidden;text-align: center;'>" +	//最外层的div
				"<div style='width:100%;height:"+(winHeight-110)+"px;overflow:auto;'>" +//图片查看的div
					"<img id='win_show_div_img' src='"+imgUrl +"'/>" +//要查看的图片
				"</div>" +
				"<div id='div_slider_img_win' style='width:100%;height:60px;margin-top:10px;text-align:center;'>" +//操作按钮div
					"<table style='margin:auto;background-color:#ffffff;'>" +
						"<tr>" +
							"<td style='padding:5px;'><img id='small_Img' onclick='dealImgChange(1)' src='"+rootPath+"/img/imgView/small.png' title='缩小' alt='缩小'/></td>"+
							"<td style='padding:5px;'><input id='slider_img_win'/></td>"+//滑动条
							"<td style='padding:5px;'><img id='big_Img' onclick='dealImgChange(2)' src='"+rootPath+"/img/imgView/big.png' title='放大' alt='放大'/></td>"+
							"<td style='padding:5px;'><img id='reback_Img' onclick='dealImgChange(3)' src='"+rootPath+"/img/imgView/reback.png' title='还原' alt='还原'/></td>"+
							"<td style='padding:5px;'><img id='left_Img' onclick='dealImgRotate(-1)' src='"+rootPath+"/img/imgView/left.png' title='向左旋转' alt='向左旋转'/></td>"+
							"<td style='padding:5px;'><img id='right_Img' onclick='dealImgRotate(1)' src='"+rootPath+"/img/imgView/right.png' title='向右旋转' alt='向右旋转'/></td>"+
							"<td style='padding:5px;'><input id='rotate_value' /></td>"+//旋转度数下拉框
							"<td style='padding:5px;'><img id='left_Img' onclick=getTopWindow('show_Img_top_Win').window('close') src='"+rootPath+"/img/imgView/close.png' title='关闭窗口' alt='关闭窗口'/></td>"+
						"</tr>" +
					"</table>"+
				"</div>" +
				"<script type='text/javascript'> " +
					"function dealImgChange(v){" +//放大、缩小和还原处理函数
						"var winObj=$('#div_slider_img_win'); " +//缓存数据的对象
						"if(winObj.data('imgWidth')==0 || winObj.data('imgHeight')==0){" +//如果缓存的宽度和高度数据为0则从新缓存
						"	winObj.data('imgWidth',window.top.$('#win_show_div_img').width());" +
						"	winObj.data('imgHeight',window.top.$('#win_show_div_img').height());" +
						"}"+
						"var imgValue=winObj.data('imgValue'); "+//得到缓存的放大倍数
						"if(v==1){ " +//v为1表示缩小
						"	if(imgValue<=0.02){"+//提示不能继续缩小
//						"		$.messager.show({title:'温馨提示：',msg:'图片不能继续缩小了。',timeout:3000,showType:'slide'});" +
						"		$.messager.alert('温馨提示：','图片不能继续缩小了。');" +
						"		return;" +
						"	}else if(imgValue<0.4){" +//缩小倍数小于0.4，则每次为原来的0.8倍
						"		imgValue=imgValue*0.8;" +
						"	}else{" +//在0.4到1之间则每次缩小0.2
						"		imgValue=imgValue-0.2;" +
						"	}"+
						"}else if(v==2){ "+//放大
						"	if(imgValue>=5){"+
//						"		$.messager.show({title:'温馨提示：',msg:'图片不能继续放大 了。',timeout:3000,showType:'slide'});" +
						"		$.messager.alert('温馨提示：','图片不能继续放大了。');" +
						"		return;" +
						"	}else if(imgValue>1.8){" +
						"		imgValue=imgValue*1.2;" +
						"	}else{" +
						"		imgValue=imgValue+0.2;" +
						"	} "+
						"}else if(v==3){ "+//恢复，还原
						"	imgValue=1; " +//放大缩小倍数为1
						"	imgRotate(0);"+//执行旋转到0
						"	winObj.data('imgRotate',0);" +//缓存旋转度数为0
						"	$('#win_show_div_img').css({'position':'static'});"+//position设置为static
						"} "+
						"imgValue=Math.round(imgValue * 100)/100;"+
						"$('#slider_img_win').slider('setValue',imgValue*100); "+//设置滑动条的值为放大缩小倍数
						"winObj.data('imgValue',imgValue); " +
						"var pObj=window.top.$('#win_show_div_img').parent();"+//得到父级对象，然后计算img的位置和宽高
				    	"var pObjOffset=pObj.offset();"+
						"var newW=winObj.data('imgWidth')*imgValue;"+
						"var newH=winObj.data('imgHeight')*imgValue;"+
						"var newTop=pObjOffset.top;"+
						"var newLeft=pObjOffset.left;"+
						"var position='absolute';"+//如果宽度和高度都小于父级对象，则position为absolute，否则为static
						"if(newW<pObj.width()){"+
						"	newLeft=(pObj.width()-newW)/2;"+
						"}else{"+
						"	position='static';"+
						"}"+
						"if(newH<pObj.height()){"+
						"	newTop=(pObj.height()-newH)/2;"+
						"}else{"+
						"	position='static';"+
						"}"+
						"window.top.$('#win_show_div_img').css({'width':newW,'height':newH,'position':position,'top':newTop,'left':newLeft}); " +
					"} " +
					
					"function dealImgRotate(n){" +//处理旋转
					"	var winObj=$('#div_slider_img_win'); " +//如果缓存的宽度和高度数据为0则从新缓存
					"	if(winObj.data('imgWidth')==0 || winObj.data('imgHeight')==0){" +
					"		winObj.data('imgWidth',window.top.$('#win_show_div_img').width());" +
					"		winObj.data('imgHeight',window.top.$('#win_show_div_img').height());" +
					"	}" +
					"	var ds=winObj.data('imgRotate')+$('#rotate_value').combobox('getValue')*n;" +//计算旋转的度数
					"	imgRotate(ds);"+//执行旋转
					"	winObj.data('imgRotate',ds);" +//缓存旋转的度数
					"}" +
					
					"function imgRotate(ds){" +//执行旋转的函数，用css3方式实现
					"	$('#win_show_div_img').css({ 'transform':'rotate('+ds+'deg)','-ms-transform':'rotate('+ds+'deg)','-moz-transform':'rotate('+ds+'deg)','-webkit-transform':'rotate('+ds+'deg)','-o-transform':'rotate('+ds+'deg)'});" +
					"}"+
				"</script>"+
			"</div>";
		//创建img窗口对象
		var win=createTopWindow("show_Img_top_Win",htmlImg,{title:"图片查看：",width:winWidth,height:winHeight,collapsible:false,minimizable:false,maximizable:true,closed:false,modal:true});
		win.window('open');
		window.top.$("#rotate_value").combobox({//初始化旋转度数下拉
			valueField: 'value',
			textField: 'label',
			width:78,
			data: [
				{label: '旋转90度',value: 90},
				{label: '旋转60度',value: 60},
				{label: '旋转30度',value: 30},
				{label: '旋转15度',value: 15},
				{label: '旋转5度',	value: 5},
				{label: '旋转1度',	value: 1}
			]
		});
		window.top.$("#rotate_value").combobox("setValue",90);//设置旋转度数默认值为90度
		window.top.$("#slider_img_win").slider({//初始化滑动条
		    mode: 'h',  
		    width:300,
		    height:50,
		    value:100,
		    min:1,
		    max:500,
		    step:1,
		    showTip:true,
		    onChange:function(newV,oldV){//滑动条数据改变事件
		    	var winObj=window.top.$('#div_slider_img_win');
		    	var imgValue=newV/100;
		    	winObj.data('imgValue',imgValue);
		    	if(winObj.data('imgWidth')==0 || winObj.data('imgHeight')==0){
		    		winObj.data('imgWidth',window.top.$("#win_show_div_img").width());
		    		winObj.data('imgHeight',window.top.$("#win_show_div_img").height());
		    	}
		    	var pObj=window.top.$('#win_show_div_img').parent();
		    	var pObjOffset=pObj.offset();
				var newW=winObj.data('imgWidth')*imgValue;
				var newH=winObj.data('imgHeight')*imgValue;
				var newTop=pObjOffset.top;
				var newLeft=pObjOffset.left;
				var position='absolute';
				if(newW<pObj.width()){
					newLeft=(pObj.width()-newW)/2;
				}else{
					position='static';
				}
				if(newH<pObj.height()){
					newTop=(pObj.height()-newH)/2;
				}else{
					position='static';
				}
				window.top.$('#win_show_div_img').css({'width':newW,'height':newH,'position':position,'top':newTop,'left':newLeft}); 
		    },
		    tipFormatter: function(value){
		    	var temp="";
		    	if(value>100){
		    		temp="放大到";
		    	}else if(value<100){
		    		temp="缩小到";
		    	}
		        return temp+value+'%';    
		    }
		});  
	
		window.top.$("#div_slider_img_win img").css(
			{filter:"Alpha(opacity=60)",opacity:0.6,cursor:"pointer"}
		).mouseover(function(){
			$(this).css({filter:"Alpha(opacity=100)",opacity:1});
		}).mouseout(function(){
			$(this).css({filter:"Alpha(opacity=60)",opacity:0.6});
		});
		window.top.$('#div_slider_img_win').data("imgWidth",0);//这里先不获取宽度和高度，因为有些浏览器获取不到，在放大缩小事件中在获取
		window.top.$('#div_slider_img_win').data("imgHeight",0);
		window.top.$('#div_slider_img_win').data("imgValue",1);
		window.top.$('#div_slider_img_win').data('imgRotate',0);
		}
}
