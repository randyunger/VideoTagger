//$(document).ready(function(){
var myScene, canvas, ctx;
var xx=0;
function doDraw() {
//    var myScene, canvas, ctx;

    function Scene(ctx) {
        this.modified = false;
        this.context = ctx;
        this.objs = new Array();

        this.add = function(obj) {
            xx++;
            $("#DEBUG").find("#sceneCount").html(xx-1);
//            if(xx > 11) debugger;
            this.modified = true;
            var index;
            if (obj.id) index = obj.id;
//            index = this.objs.length;
            this.objs[index] = obj;
            return index;
        };
        function getRelCoords(e) {
            var tRect = event.target.getClientRects()[0];
            return {x: event.clientX - tRect.left,
                y: event.clientY - tRect.top};
        }

        this.record = function() {
            var s = "";
            //todo un-hardcoded vdeo

            for (var ix in myScene.objs) {
                myScene.objs[ix].record($("#video").get(0).currentTime);
            }
        };

        this.click = function(e) {
//            $("#video").get(0).pause();
            var coords = getRelCoords(e);
//            var len = myScene.objs.length;
//            for(var i=0;i<len;i++){
            for (var ix in myScene.objs) {
                var obj = myScene.objs[ix];
                if (obj && obj.click && obj.containsPoint && obj.containsPoint(coords)) {
                    obj.click(coords);
                }
            }
//            $("#video").get(0).play();
        };

        this.mouseMove = function(e) {
//            $("#video").get(0).pause();
            var coords = getRelCoords(e);
            for (var ix in myScene.objs) {
                var obj = myScene.objs[ix]; //send movement to all objs, allow them to self select
                if (obj && obj.mouseMove) {  //&& obj.containsPoint && obj.containsPoint(coords)){
                    obj.mouseMove(coords);
                }
            }
//            $("#video").get(0).play();
        };

        this.draw = function() {
//            if(xx>2) debugger;
            try {
//$("#video").get(0).pause();
                if (myScene && myScene.modified) {
                    myScene.context.clearRect(0, 0, myScene.context.canvas.height, myScene.context.canvas.width);
                    for (i in myScene.objs) {
                        if (myScene.objs[i] && myScene.objs[i].draw) {
                            myScene.objs[i].draw(myScene.context);
//                            myScene.objs.length--;             //todo: is this right?
//                            delete myScene.objs[i]; //deletes selecting hiLite?
                        }
                        else debugger
                    }
                }
            }
            finally {
                try {
                    myScene.record();    //use a timeout or not?
//$("#video").get(0).play();
                } catch(e) {
                }
                myScene.modified = false;
                setTimeout(myScene.draw, 100);
//                setTimeout(myScene.record, 102);
            }
        };

        this.remove = function(index) {
//            this.modified = true;   //todo not removing properly
//            delete this.objs[index];
        };

        this.serialize = function() {
            //only works for one obj for now!, need to concat cleanly
            var total = "";
            for (var ix in myScene.objs) {
                var obj = myScene.objs[ix];
                if (obj && obj.serialize) {
                    total = total + obj.serialize();
                }
            }
            return total;
        }
//        this.draw();
    }

    var anIndex = 0;
//    function Rectangle(id,color,x,y,w,h,click){
    function Rectangle(obj) {
        var proto = {
            borderWidth:2
            ,color:"rgba(30,30,30,100)"
            ,x:0
            ,y:0
            ,w:0
            ,h:0
            ,selected:false
            ,recorded:new Array()
            ,draw:function(ctx) {
                ctx.fillStyle = this.color; //"rgba(200,200,200,0.4)";
                ctx.fillRect(this.x, this.y, this.w, this.h);
                ctx.clearRect(this.x + this.borderWidth, this.y + this.borderWidth
                        , this.w - this.borderWidth * 2, this.h - this.borderWidth * 2);
            }
            ,containsPoint:function(coords) {
                if (coords.x >= this.x &&
                        coords.x <= this.x + this.w &&
                        coords.y >= this.y &&
                        coords.y <= this.y + this.h)
                    return true;
                else return false;
            }
            ,click:function(coords) {    //offset from xy
                if(viewing){
                    $(".adOut").find(".title").html(ads[this.id].title);
                    $(".adOut").find(".copy").html(ads[this.id].copy);
                }
                else{
                    this.selected = !this.selected;
                    this.xHandle = coords.x - this.x;
                    this.yHandle = coords.y - this.y;
                }
            }
            ,record:function(time) {
                function numDecimals(num, places) {
                    var factor = Math.pow(10, places);
                    num = num * factor;
                    num = Math.round(num);
                    num = num / factor;
                    return num;
                }

                var timeKey = numDecimals(time, 2);
//                if(timeKey>10)
                if (!this.selected) return;
//                    $("#video").get(0).pause();
                var currentId = $("#adSelect").val();

                var n = //newdata(timeKey);
                {
                    startTime:timeKey
                    ,endTime:timeKey
                    ,startPos:{x:this.x, y:this.y, height:this.h, width:this.w}
                    ,endPos:{x:this.x, y:this.y, height:this.h, width:this.w}
                    ,id:currentId   //should be id of currently selected Ad
                };
                //next, set :id to id of current ad

                var doAdd = false;
                if (this.recorded.length == 0) doAdd = true;//this.recorded[this.recorded.length]=n;
                else if (JSON.stringify(n.startPos) == JSON.stringify(this.recorded[this.recorded.length - 1].startPos)) {
                    //update time for pre-existing
                    this.recorded[this.recorded.length - 1].endTime = n.endTime;
                }
                else {
                    //this.recorded[this.recorded.length]=n;
                    doAdd = true;
                }
                if (doAdd) {  //todo dangerous to modify other?
                    if (this.recorded.length > 0) this.recorded[this.recorded.length - 1].endTime = n.startTime;
                    this.recorded[this.recorded.length] = n;
                }
//                    $("#video").get(0).play();
                return this.recorded;
            }
            ,serialize:function() {
                return JSON.stringify(this.recorded);
            }

        };

        $.extend(true, proto, obj);
        $.extend(true, this, proto);
    }
//    var myScene = new Scene(ctx);
//        var timeLine = new function(){

    /*
    Timeline deals with all events that are scheduled to happen at a future time

     */

    var timeLine = new function() {
        this.data = null;
        this.lastIndex = 0;
        this.events = new function() {
            this.eventList = new Array();
            this.put = function(time, pos, id, action) {
                if (this.eventList[time]) { //if (this.eventList[time + "/" + id]) {
                    if ((time+"").indexOf(".") == -1) time = parseFloat(time + ".01"); //to prevent collisions
                    else time = parseFloat(time + "01")
                }
                this.eventList[this.eventList.length] = {
                     adId:id
                    ,time:time
                    ,pos:pos
                    ,action:action
                };
//                this.eventList[time + "/" + id] = {time:time, id:id, action:action};
//                    if(this.eventList[key] == null) this.eventList[key] = new Array();
//                    this.eventList[key][this.eventList[key].length] = {key:key, id:id, action:action};
            };
            this.get = function(time) {
                var eventsToProcess = new Array();
                while(this.eventList[timeLine.lastIndex].time < time){
                    eventsToProcess.unshift(this.eventList[timeLine.lastIndex]); //add to list
                    timeLine.lastIndex++; //increment so we never view the same index twice
                }
                return eventsToProcess;
            };

//                    $("#video").get(0).pause();
//                var list = new Array();
//                for (var storedTime in this.eventList) {
//                    if (time >= storedTime.substr(0, storedTime.indexOf("/"))) {
//                        list[list.length] = this.eventList[storedTime];
//                        delete this.eventList[storedTime];
//                    }
//                }
////                    $("#video").get(0).play();
//                return list;
//            };
        };
        this.register = function(input) {
            this.data = input;
            for (var item in input) {
                this.events.put(input[item].startTime, input[item].startPos, input[item].id, "START");
                this.events.put(input[item].endTime, input[item].endPos, input[item].id, "END");
                //todo: sort event list??
            }
        };
        this.checkEvents = function(selector) {
            return this.events.get($(selector).get(0).currentTime)

        };
        this.doEvents = function(currentEvents) {
//            $("#video").get(0).pause();
            var i = -1;
            for (var event in currentEvents) {
                i++;
                //Get shape data
//                var currentEvent = eventList[i];

                //get ad data
                //create new shape with ad data
                //load new shape



                var currentEvent = currentEvents[i];
//                var eventData = this.data[eventList[event].id];   //todo: i think this is the line that is wrong
                if (currentEvent.action == "START") {
                    var newRect = new Rectangle({
                        id:currentEvent.adId
                        ,color:"rgba(100,100,100,0.8)"
                        ,x:currentEvent.pos.x
                        ,y:currentEvent.pos.y
                        ,w:currentEvent.pos.width
                        ,h:currentEvent.pos.height
                    });
                    $("#DEBUG").find("#eventLoad").html(JSON.stringify(newRect));
                    myScene.add(newRect);
//                    eventData.id = myScene.add(newRect); //todo: is this also wrong?
//                    mostRecentEvent.id = myScene.add(newRect);

//                    ctx.fillRect(eventData.startPos.x, eventData.startPos.y, eventData.startPos.width, eventData.startPos.height);
//                    ctx.clearRect(eventData.startPos.x+borderWidth, eventData.startPos.y+borderWidth
//                            , eventData.startPos.width-borderWidth*2, eventData.startPos.height-borderWidth*2);
                }
                else if (currentEvent.action == "END") { //Should clear canvas and redraw
                    myScene.remove(currentEvent.adId);
//                    ctx.clearRect(eventData.endPos.x, eventData.endPos.y, eventData.endPos.width, eventData.endPos.height);
                }
//                $("#video").get(0).play();  //only needed for debugging
            }
        };
        this.startPoll = function(selector) {
            window.setTimeout(function() {
                var currentEvents = timeLine.checkEvents(selector);
                if (currentEvents.length > 0) timeLine.doEvents(currentEvents);
                timeLine.startPoll(selector);          //test comment//another
            }, 100)
        };
    };

    if (viewing) {
        $("#play").click(function() {
            startVideo();
        });
    } else {
        startVideo();  //don't start on load unless editing
    }

    function startVideo() {
        //    $("#video").get(0).pause();

        if(ads==null || pos==null) return;

        try {
            if (viewing) {
                var oneHiLite, oneAdId, onePosId;
                for (oneHiLite in hiLites) {
                }
                oneAdId = hiLites[oneHiLite].adId;
                onePosId = hiLites[oneHiLite].hiLitePositionId;
                var posData = JSON.parse(pos[onePosId].data);
                timeLine.register(posData);
            }
        } catch(e) {
        }

        timeLine.startPoll("#video");
        $("#video").get(0).play();
    }

//    var
    canvas = document.getElementById("canvas");
//    var
    ctx = canvas.getContext("2d");
    myScene = new Scene(ctx);
    myScene.draw();

    canvas.rMode = "draw";
    var rect, pressed;
    canvas.onmousedown = function(event) {
        var tRect = event.target.getClientRects()[0];
        rect = {x: event.clientX - tRect.left,
            y: event.clientY - tRect.top,
            width: 1, height: 1};
        pressed = true;
    };

    canvas.onmouseup = function(event) {
        pressed = false;
//        ctx.fillStyle = "rgba(200,200,200,0.4)";
//        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    };

    var hiLiteRect = new Rectangle({    //Only for creating new hiLites
        id:"hiLite"
        ,color:"rgba(200,200,200,0.4)"
        ,mouseMove:function(coords) {
            if (!this.xHandle || !this.yHandle) return;
            if (this.xHandle == coords.x && this.yHandle == coords.y) return;  //Have not moved
//                    $("#video").get(0).pause();
            this.x = (coords.x - this.xHandle);
            this.y = (coords.y - this.yHandle);
//                    $("#video").get(0).play();
            myScene.modified = true;
        }
    });

    myScene.add(hiLiteRect);

    canvas.onmousemove = function(event) {
        if (canvas.rMode == "select") myScene.mouseMove(event);
        else if (canvas.rMode == "draw") {
            if (!rect || !pressed || canvas.rMode != "draw") {
                return;
            }
            var tRect = event.target.getClientRects()[0];
            rect.width = event.clientX - tRect.left - rect.x;
            rect.height = event.clientY - tRect.top - rect.y;

            hiLiteRect.x = rect.x;
            hiLiteRect.y = rect.y;
            hiLiteRect.w = rect.width;
            hiLiteRect.h = rect.height;
            myScene.modified = true;

            //        myScene.add(hiLiteRect);

            //        ctx.fillStyle = "rgba(200,200,200,0.4)";
            //        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        }
    };

    canvas.onclick = function(event) {
        if (viewing) myScene.click(event);  //if viewing, just pass along
        if (canvas.rMode == "draw") canvas.rMode = "select";


//        @todo


//        else if(canvas.rMode=="select") canvas.rMode="draw";
        else myScene.click(event);
    };

}
//});
// //       draw();    //3!


// //       $("body").click(toggleVideo());

//    canvas.onmousedown = function(event) {
//        var tRect=event.target.getClientRects()[0];
//        rect = {x: event.clientX - tRect.left,
//                y: event.clientY - tRect.top,
//                width: 1, height: 1};
//        pressed = true;
//    }
//    canvas.onmouseup = function(event) {
//        pressed = false;
//    }


    function drawInit() {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);
        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);
    }
    function pause(){
        var elem = $("#video");
        elem.pause();
        alert(elem.currentTime);
        alert(JSON.parse(timeline))
    }
    function toggleVideo(){
//        $("#video").get(0).play();
    }
//
// });