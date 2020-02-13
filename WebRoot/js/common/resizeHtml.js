function resizeHeight(){
	var browser = getBrowserType();
	if(browser == "IE"){
		$("#dataTable").height((document.body.scrollHeight -$("#queryTable").height()));
	}
	else{
		$("#dataTable").height((document.body.scrollHeight -$("#queryTable").height()) * 0.98);
	}
}