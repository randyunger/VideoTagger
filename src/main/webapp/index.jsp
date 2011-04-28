<%--
  Created by IntelliJ IDEA.
  User: Randy
  Date: 4/17/11
  Time: 4:39 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>

 <head>
    <script type="text/javascript" src="docs/jquery.js"></script>
    <script type="application/javascript">
     $(document).ready(function(){
   // Your code here
        var data = [{
            startTime:3.5
            , endTime:6
            , startPos: {x:150, y:120, width:20, height:20}    //x,y,width,height
            , endPos:  {x:150, y:120, width:20, height:20}
            , id:0
        }];
//        debugger;
        var timeLine = new function(){
            this.data=null;
            this.events = new function(){
                this.eventList = new Array();
                this.put = function(time, id, action){
                    this.eventList[time+"/"+id] = {time:time, id:id, action:action};
//                    if(this.eventList[key] == null) this.eventList[key] = new Array();
//                    this.eventList[key][this.eventList[key].length] = {key:key, id:id, action:action};
                };
                this.get = function(time){

//                    $("#video").get(0).pause();
//                    debugger;
                    var list = new Array();
                    for(var storedTime in this.eventList){
                        if(time >= storedTime.substr(0,storedTime.indexOf("/"))){
                            list[list.length]=this.eventList[storedTime];
                            delete this.eventList[storedTime];
                        }
                    }

//                    $("#video").get(0).play();
                    return list;
                };
            };
            this.register = function(input){
               this.data = input;
               for(var item in input){
                   this.events.put(input[item].startTime, input[item].id, "START");
                   this.events.put(input[item].endTime, input[item].id, "END");
               }
            };
            this.checkEvents = function(selector){
                return this.events.get($(selector).get(0).currentTime)

            };
            this.doEvents = function(eventList){
                $("#video").get(0).pause();
//                debugger;//comment
                for(var event in eventList){
                    var eventData = this.data[eventList[event].id];
                    var canvas = document.getElementById("canvas");
                    var ctx = canvas.getContext("2d");
                    var borderWidth = 2;
                    if(eventList[event].action=="START"){
//                        var ctx = $("#video").get(0).getContext("2d");
                        ctx.fillStyle = "rgba(200,200,200,0.4)";
                        ctx.fillRect(eventData.startPos.x, eventData.startPos.y, eventData.startPos.width, eventData.startPos.height);
                        ctx.clearRect(eventData.startPos.x+borderWidth, eventData.startPos.y+borderWidth
                                , eventData.startPos.width-borderWidth*2, eventData.startPos.height-borderWidth*2);
                    }
                    if(eventList[event].action=="END"){ //Should clear canvas and redraw
                        ctx.clearRect(eventData.endPos.x, eventData.endPos.y, eventData.endPos.width, eventData.endPos.height);
                    }
                    $("#video").get(0).play();
                }
            };
            this.startPoll = function(selector){
                window.setTimeout(function(){
                    var eventList = timeLine.checkEvents(selector);
                    if(eventList.length>0) timeLine.doEvents(eventList);
                    timeLine.startPoll(selector);          //test comment//another
                },1000)
            };
        };
//        draw();    //3!
        timeLine.register(data);
        timeLine.startPoll("#video");
//        $("body").click(toggleVideo());

    function draw() {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);
        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);
    }
    function pause(){
        debugger;
        var elem = $("#video");
        elem.pause();
        alert(elem.currentTime);
        alert(JSON.parse(timeline))
    }
    function toggleVideo(){
        debugger;
        $("#video").get(0).play();
    }

 });
    </script>
     <style type="text/css">
         #canvas{
             position:absolute; top:50px; left:0px; z-index:1;
         }
         #video{
             position:absolute; top:0px; left:0px;
         }
     </style>
    <title>Video watcher</title>
 </head>
<body>
   <canvas id="canvas" width="300" height="300"></canvas>
  <%--<div>Video goes here</div>--%>
  <div>
      <video id="video" src="bbb.m4v" width="300" height="300" autoplay></video>
        <%--<video class="nativeEmbedPlayerPid" id="pid_vid1"--%>
               <%--src="bbb_trailer_iphone.m4v"--%>
               <%--style="width: 400px; height: 400px; z-index: 1; ">--%>
        <%--</video>--%>
      <%--<a href="bbb.m4v">clicky</a>--%>
  </div>
  </body>
</html>