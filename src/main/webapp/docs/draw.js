$(document).ready(function(){
    var myScene, canvas, ctx;

    function Scene(ctx){
        this.modified = false;
        this.context=ctx;
        this.objs = new Array();
        this.add = function(obj){
            this.modified = true;
            var index;
            if(obj.id) index = obj.id;
            index = this.objs.length;
            this.objs[index]=obj;
            return index;
        };
        function getRelCoords(e){
            var tRect=event.target.getClientRects()[0];
            return {x: event.clientX - tRect.left,
                y: event.clientY - tRect.top};
        }
        this.click = function(e){
//            $("#video").get(0).pause();
            var coords = getRelCoords(e);
//            var len = myScene.objs.length;
//            for(var i=0;i<len;i++){
            for(var ix in myScene.objs){
                var obj = myScene.objs[ix];
                if(obj && obj.click && obj.containsPoint && obj.containsPoint(coords)){
                    obj.click(coords);
                }
            }
//            $("#video").get(0).play();
        };

        this.mouseMove = function(e){
//            $("#video").get(0).pause();
            var coords = getRelCoords(e);
            for(var ix in myScene.objs){
                var obj = myScene.objs[ix]; //send movement to all objs, allow them to self select
                if(obj && obj.mouseMove ){  //&& obj.containsPoint && obj.containsPoint(coords)){
                    obj.mouseMove(coords);
                }
            }
//            $("#video").get(0).play();
        };

        this.draw = function(){
            try{
                if(myScene && myScene.modified){
                    myScene.context.clearRect(0,0,myScene.context.canvas.height, myScene.context.canvas.width);
                    for(var i=0;i<myScene.objs.length;i++){
                        if(myScene.objs[i] && myScene.objs[i].draw){
                            myScene.objs[i].draw(myScene.context);
                        }
                    }
                }
            }
            finally{
                myScene.modified=false;
                setTimeout(myScene.draw, 100);
            }
        };
        this.remove = function(index){
            this.modified = true;   //todo not removing properly
            delete this.objs[index];
        };
//        this.draw();
    }

//    function Rectangle(id,color,x,y,w,h,click){
    function Rectangle(obj){
        var proto = {
             borderWidth:2
            ,color:"rgba(30,30,30,100)"
            ,x:0
            ,y:0
            ,w:0
            ,h:0
            ,selected:false
            ,draw:function(ctx){
    //            debugger;
                ctx.fillStyle = this.color; //"rgba(200,200,200,0.4)";
                ctx.fillRect(this.x, this.y, this.w, this.h);
                ctx.clearRect(this.x+this.borderWidth, this.y+this.borderWidth
                        , this.w-this.borderWidth*2, this.h-this.borderWidth*2);
            }
            ,containsPoint:function(coords){
                if(coords.x >= this.x &&
                   coords.x <= this.x+this.w &&
                   coords.y >= this.y &&
                   coords.y <= this.y+this.h     )
                    return true;
                else return false;
            }
            ,click:function(coords){    //offset from xy
                this.xHandle = coords.x - this.x;
                this.yHandle = coords.y - this.y;
            }
        };

        $.extend(true, proto, obj);
        $.extend(true, this, proto);

//        this.id = def.id;
//        this.borderWidth = def.borderWidth;
//        this.color = def.color;
//        this.x = def.x;
//        this.y = def.y;
//        this.h = def.h;
//        this.w = def.w;
//        this.click = def.click;


    }

   // Your code here
    var data = [{
        startTime:3.5
        , endTime:6
        , startPos: {x:150, y:120, width:20, height:20}    //x,y,width,height
        , endPos:  {x:150, y:120, width:20, height:20}
        , id:0
    }];

//    var myScene = new Scene(ctx);
//        var timeLine = new function(){
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
//                var canvas = document.getElementById("canvas");
//                var ctx = canvas.getContext("2d");
                var borderWidth = 2;
                if(eventList[event].action=="START"){
//                        var ctx = $("#video").get(0).getContext("2d");
//                    ctx.fillStyle = "rgba(200,200,200,0.4)";
//                    var newRect = new Rectangle(eventData.id,"rgba(200,200,200,0.4)", eventData.startPos.x,
//                            eventData.startPos.y, eventData.startPos.width, eventData.startPos.height,
//                            function(){
//                                debugger;
//                            });

                    var newRect = new Rectangle({
                         id:eventData.id
                        ,color:"rgba(100,100,100,0.8)"
                        ,x:eventData.startPos.x
                        ,y:eventData.startPos.y
                        ,w:eventData.startPos.width
                        ,h:eventData.startPos.height
                    });
                    eventData.id = myScene.add(newRect);

//                    ctx.fillRect(eventData.startPos.x, eventData.startPos.y, eventData.startPos.width, eventData.startPos.height);
//                    ctx.clearRect(eventData.startPos.x+borderWidth, eventData.startPos.y+borderWidth
//                            , eventData.startPos.width-borderWidth*2, eventData.startPos.height-borderWidth*2);
                }
                if(eventList[event].action=="END"){ //Should clear canvas and redraw
                    myScene.remove(eventData.id);
//                    ctx.clearRect(eventData.endPos.x, eventData.endPos.y, eventData.endPos.width, eventData.endPos.height);
                }
                $("#video").get(0).play();  //only needed for debugging
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

    timeLine.register(data);
    timeLine.startPoll("#video");

//    var
            canvas = document.getElementById("canvas");
//    var
            ctx = canvas.getContext("2d");
    myScene = new Scene(ctx);
    myScene.draw();

    canvas.rMode = "draw";
    var rect, pressed;
    canvas.onmousedown = function(event) {
        var tRect=event.target.getClientRects()[0];
        rect = {x: event.clientX - tRect.left,
                y: event.clientY - tRect.top,
                width: 1, height: 1};
        pressed = true;
    };

    canvas.onmouseup = function(event) {
        pressed = false;
//        debugger;
//        ctx.fillStyle = "rgba(200,200,200,0.4)";
//        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    };

//    var hiLiteRect = new Rectangle("hiLite","rgba(200,200,200,0.4)", 0,0,0,0,
//            function(){
//                debugger;
//            });
    var hiLiteRect = new Rectangle({
         id:"hiLite"
        ,color:"rgba(200,200,200,0.4)"
        ,mouseMove:function(coords){
            if(!this.xHandle || !this.yHandle) return;
            if(this.xHandle == coords.x && this.yHandle==coords.y) return;  //Have not moved
                    $("#video").get(0).pause();
//                debugger;
            this.x = (coords.x - this.xHandle);
            this.y = (coords.y - this.yHandle);
                    $("#video").get(0).play();
            myScene.modified=true;
        }
//        ,click:function(){
//            debugger;
//        }
    });

    myScene.add(hiLiteRect);

//    function debug(){
//        $("#video").get(0).pause();
//        debugger;
//        $("#video").get(0).play();
//    }

    canvas.onmousemove = function(event) {
        if(canvas.rMode=="select") myScene.mouseMove(event);
        else if(canvas.rMode=="draw"){
            if (!rect || !pressed || canvas.rMode!="draw") { return; }
    //        debug();
            var tRect=event.target.getClientRects()[0];
            rect.width = event.clientX - tRect.left - rect.x;
            rect.height = event.clientY - tRect.top -rect.y;

            hiLiteRect.x = rect.x;
            hiLiteRect.y = rect.y;
            hiLiteRect.w = rect.width;
            hiLiteRect.h = rect.height;
    //debugger;
            myScene.modified=true;

    //        myScene.add(hiLiteRect);

    //        ctx.fillStyle = "rgba(200,200,200,0.4)";
    //        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        }
    };

    canvas.onclick = function(event){
        if(canvas.rMode=="draw") canvas.rMode="select";
        else myScene.click(event);
    };


});
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
        $("#video").get(0).play();
    }
//
// });