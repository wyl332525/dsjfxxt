function dataLoading() {
    $.ajax({
        url: interfaceUrl + "zhjg/getAllStation.yt",
        async: false,
        data: {},
        type: "post",
        dataType: "jsonp",
        callback: "callback",
        //crossDomain: true,
        success: function (data) {
            var json;
            var result = data.result;
            if (result == "1") {
                json = data.data;
                //btgsl:"7"
                //jcz:"60000001"
                //jd:"2.000000"
                //tgsl:"52"
                //wd:"2.000000"
                var urlParam = new Object();
                for (var i = 0; i < json.length; i++) {
                    //检测站名称
                    json[i]["p_name"] = json[i]["jczjc"] || "";
                    //检测站编码
                    json[i]["p_id"] = json[i]["jcz"];
                    //经度
                    json[i]["p_lon"] = json[i]["jd"];
                    //纬度
                    json[i]["p_lat"] = json[i]["wd"];
                    //合格数
                    json[i]["qualifiedNumber"] = [Number(json[i]["tgsl"])];
                    //不合格数
                    json[i]["unqualifiedNumber"] = [Number(json[i]["btgsl"])];
                    urlParam[json[i]["p_id"]] = "&name=" + json[i]["p_name"] + "&code=" + json[i]["p_id"] + "&lon=" + json[i]["p_lon"] + "&lat=" + json[i]["p_lat"];
                }
                var popWindowUrl = "";
                var popWindowParam = {};
                popWindowParam["popWindowUrl"] = popWindowUrl;
                popWindowParam["urlParam"] = urlParam;
                popWindowParam["popHeight"] = 280;
                popWindowParam["popWidth"] = 400;
                map_AddPointInfoToMap("jczxx", json, popWindowParam);
            }
            else if (result == "0") {
            }
            //console.log("data", json);
        },
        error: function (e) {
            console.log('error');
        }
    });
}