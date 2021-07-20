$cur = $("#home") ;

$(document).ready(function() {
    // $cur.addClass('active');
    update("home");
});

function update(name){

    $("[name='" + $cur.attr("id") + "']").hide();
    $cur = $("#" + name);
    deactive();
    $cur.addClass('active');
    $cur.show() ;

    var pic = "keda";
    if(name == "home"){
        pic = "keda" ;
    }
    else if(name == "contact" || name == "download" || name == "gallery"){
        pic = "building" ;
    }
    else {
        pic = "building" ;
    }

    document.getElementById('bg').src = './bg/' + pic + '.jpg';
    $("[name='" + $cur.attr("id") + "']").fadeIn("slow") ;

    if(name=="home"){
        loadNews("/doc/news.csv");
    } else if(name =="reg"){
        loadAttendee("/doc/table.csv");
    }

    // if( name == "venue" ) {
    //     loadmap();
    // }
}

function loadNews(file){
  var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function ()
      {
          if(rawFile.readyState === 4)
          {
              if(rawFile.status === 200 || rawFile.status == 0)
              {
                 $("#news").html("");
                  var allText = rawFile.responseText;
                  var strings = allText.split('\n');
                  var last = null;
                  for(var j = 0, str; str = strings[j]; j++){
                    var elems = str.split('##');
                    var dat = document.createElement('td');
                    dat.innerHTML=elems[0];
                    dat.setAttribute("class", "time");
                    var info = document.createElement('td');
                    info.innerHTML=elems[1];
                    info.setAttribute("class", "news-info");

                    var row = document.createElement('tr');
                    row.insertBefore(dat, null);
                    row.insertBefore(info, null);

                    document.getElementById('news').insertBefore(row, last);
                    last=row;
                  }
              }
          }
      }
      rawFile.send(null);
}

function loadAttendee(file){
    var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function ()
      {
          if(rawFile.readyState === 4)
          {
              if(rawFile.status === 200 || rawFile.status == 0)
              {
                 $("#attendee").html("");
                  var allText = rawFile.responseText;
                  var strings = allText.split('\n');
                  for(var j = 0, str; str = strings[j]; j++){
                    var elems = str.split(',');
                    var row = document.createElement('tr');
                    var header = document.createElement('td');
                    if(j == 0){
                        header.innerHTML= "序号";
                    } else{
                        header.innerHTML=j;
                    }
                    row.insertBefore(header, null);
                    for(var k = 0, ele; ele = elems[k]; k++){
                        var column = document.createElement('td');
                        column.innerHTML=ele;
                        row.insertBefore(column, null);
                    }
                    document.getElementById('attendee').insertBefore(row, null);
                  }
                  var footer = document.createElement('tr');
                  for(var o = 0; o <= strings[0].split(',').length; o++){
                      var empty = document.createElement('td');
                      empty.innerHTML=" ";
                      footer.insertBefore(empty, null);
                  }
                  document.getElementById('attendee').insertBefore(footer, null);
              }
          }
      }
      rawFile.send(null);
}


function deactive(){
    $("#home").removeClass('active') ;
    $("#call").removeClass('active') ;
    $("#date").removeClass('active') ;
    $("#committee").removeClass('active') ;
    $("#keynote").removeClass('active') ;
    $("#reg").removeClass('active') ;
    $("#program").removeClass('active') ;
    $("#venue").removeClass('active') ;
    $("#contact").removeClass('active') ;
    $("#download").removeClass('active') ;
    $("#gallery").removeClass('active') ;
    $("#img11").removeClass('active') ;
    $("#academic").removeClass('active') ;
}

// baidu map
function loadmap() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    // script.src = "http://api.map.baidu.com/api?v=2.0&ak=yIyMbumSqkcuRseHnvK2MASp&callback=init";
    script.src="http://api.map.baidu.com/api?v=2.0&ak=wN0z0jIxpM0uYe3sS0QrQMrzGzOd39oT&callback=init";
    document.body.appendChild(script);
}
function init() {
    venure_address();
    //route1();
}

// map for address
function venure_address() {
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.320434,39.996555);   // 创建点坐标
    var marker = new BMap.Marker(point);                // 创建标注
    map.addOverlay(marker);
    map.centerAndZoom(point,15);
    map.enableScrollWheelZoom();                        //启用滚轮放大缩小
    var opts = {
        width : 260,                // 信息窗口宽度
        height: 50,                 // 信息窗口高度
        title : "北京大学英杰交流中心",
        enableMessage:false,
        message:"null"
    }
    var infoWindow = new BMap.InfoWindow("地址：北京市海淀区颐和园路5号", opts);  // 创建信息窗口对象
    marker.addEventListener("click", function(){
        map.openInfoWindow(infoWindow,point);
    });
}

// map for route airport
function route1() {
    var map = new BMap.Map("route1");
    map.centerAndZoom(new BMap.Point(121.622638,38.874104), 11);
    var p1 = new BMap.Point(121.622638,38.874104);
    var p2 = new BMap.Point(121.622638,38.874104);
    var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
    driving.search(p1, p2);
}
