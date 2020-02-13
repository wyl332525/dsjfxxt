function getBrowserType() {
    if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
        return "Firefox火狐";
    }
    if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
        return "Camino";
    }
    if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
        return "Gecko";
    }
    if (isMozilla = navigator.userAgent.indexOf("360SE") > 0) {
        return "360SE";
    }
    if (isMozilla = navigator.userAgent.indexOf("Maxthon") > 0) {
        return "Maxthon傲游";
    }
    if (isMozilla = navigator.userAgent.indexOf("TheWorld") > 0) {
        return "TheWorld世界之窗";
    }
    if (isChrome = navigator.userAgent.indexOf("Chrome") > 0) {
        return "Chrome";
    }
    if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
        return "Safari";
    }
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        return "MSIE";
    }
    if(window.ActiveXObject || "ActiveXObject" in window) {
    	return "IE";
    }
}
