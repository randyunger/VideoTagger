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

        this.record = function(){
            var s = "";
            //todo hardcoded vdeo

            for(var ix in myScene.objs){
                myScene.objs[ix].record($("#video").get(0).currentTime);
            }
        };

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
                try{
                    myScene.record();    //use a timeout or not?
                }catch(e){}
                myScene.modified=false;
                setTimeout(myScene.draw, 100);
//                setTimeout(myScene.record, 102);
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
            ,recorded:new Array()
            ,draw:function(ctx){
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
                this.selected = !this.selected;
                this.xHandle = coords.x - this.x;
                this.yHandle = coords.y - this.y;
            }
            ,record:function(timeKey){
                if(timeKey>10) debugger;
                if(!this.selected) return;
                    $("#video").get(0).pause();
                var n = //newdata(timeKey);
                    {
                         startTime:timeKey
                        ,endTime:timeKey
                        ,startPos:{x:this.x, y:this.y, height:this.h, width:this.w}
                        ,endPos:{x:this.x, y:this.y, height:this.h, width:this.w}
                        ,id:0
                    };
                if(this.recorded.length == 0) this.recorded[this.recorded.length]=n;
                else if(JSON.stringify(n.startPos) == JSON.stringify(this.recorded[this.recorded.length-1].startPos)) {
                    //update time for pre-existing
                    this.recorded[this.recorded.length-1].endTime = n.endTime;
                }
                else {
                    this.recorded[this.recorded.length]=n;
                }
                    $("#video").get(0).play();
                return this.recorded;
            }

        };

        $.extend(true, proto, obj);
        $.extend(true, this, proto);
    }

   // Your code here
//    var data = [{
//        startTime:3.5
//        , endTime:6
//        , startPos: {x:150, y:120, width:20, height:20}    //x,y,width,height
//        , endPos:  {x:150, y:120, width:20, height:20}
//        , id:0
//    }];

    var data =
            [{"startTime":2.6658549308776855,"endTime":2.765855073928833,"startPos":{"x":128,"y":51,"height":52,"width":55},"endPos":{"x":128,"y":51,"height":52,"width":55},"id":0},{"startTime":3.2381339073181152,"endTime":3.2381339073181152,"startPos":{"x":131,"y":51,"height":52,"width":55},"endPos":{"x":131,"y":51,"height":52,"width":55},"id":0},{"startTime":3.3381340503692627,"endTime":3.3381340503692627,"startPos":{"x":137,"y":51,"height":52,"width":55},"endPos":{"x":137,"y":51,"height":52,"width":55},"id":0},{"startTime":3.7764129638671875,"endTime":3.7764129638671875,"startPos":{"x":139,"y":52,"height":52,"width":55},"endPos":{"x":139,"y":52,"height":52,"width":55},"id":0},{"startTime":3.876413106918335,"endTime":4.289371967315674,"startPos":{"x":139,"y":54,"height":52,"width":55},"endPos":{"x":139,"y":54,"height":52,"width":55},"id":0},{"startTime":4.566112041473389,"endTime":4.566112041473389,"startPos":{"x":139,"y":53,"height":52,"width":55},"endPos":{"x":139,"y":53,"height":52,"width":55},"id":0},{"startTime":4.666111946105957,"endTime":4.666111946105957,"startPos":{"x":132,"y":50,"height":52,"width":55},"endPos":{"x":132,"y":50,"height":52,"width":55},"id":0},{"startTime":4.766111850738525,"endTime":4.766111850738525,"startPos":{"x":120,"y":49,"height":52,"width":55},"endPos":{"x":120,"y":49,"height":52,"width":55},"id":0},{"startTime":5.065071105957031,"endTime":5.065071105957031,"startPos":{"x":108,"y":49,"height":52,"width":55},"endPos":{"x":108,"y":49,"height":52,"width":55},"id":0},{"startTime":5.1650710105896,"endTime":5.1650710105896,"startPos":{"x":91,"y":62,"height":52,"width":55},"endPos":{"x":91,"y":62,"height":52,"width":55},"id":0},{"startTime":5.463029861450195,"endTime":5.463029861450195,"startPos":{"x":80,"y":75,"height":52,"width":55},"endPos":{"x":80,"y":75,"height":52,"width":55},"id":0},{"startTime":5.563029766082764,"endTime":5.563029766082764,"startPos":{"x":71,"y":91,"height":52,"width":55},"endPos":{"x":71,"y":91,"height":52,"width":55},"id":0},{"startTime":5.860989093780518,"endTime":5.860989093780518,"startPos":{"x":69,"y":103,"height":52,"width":55},"endPos":{"x":69,"y":103,"height":52,"width":55},"id":0},{"startTime":5.960988998413086,"endTime":5.960988998413086,"startPos":{"x":69,"y":107,"height":52,"width":55},"endPos":{"x":69,"y":107,"height":52,"width":55},"id":0},{"startTime":6.258947849273682,"endTime":6.258947849273682,"startPos":{"x":71,"y":109,"height":52,"width":55},"endPos":{"x":71,"y":109,"height":52,"width":55},"id":0},{"startTime":6.35994815826416,"endTime":6.35994815826416,"startPos":{"x":81,"y":110,"height":52,"width":55},"endPos":{"x":81,"y":110,"height":52,"width":55},"id":0},{"startTime":6.658906936645508,"endTime":6.658906936645508,"startPos":{"x":93,"y":110,"height":52,"width":55},"endPos":{"x":93,"y":110,"height":52,"width":55},"id":0},{"startTime":6.758906841278076,"endTime":6.758906841278076,"startPos":{"x":106,"y":110,"height":52,"width":55},"endPos":{"x":106,"y":110,"height":52,"width":55},"id":0},{"startTime":6.858907222747803,"endTime":6.858907222747803,"startPos":{"x":119,"y":110,"height":52,"width":55},"endPos":{"x":119,"y":110,"height":52,"width":55},"id":0},{"startTime":7.156684875488281,"endTime":7.156684875488281,"startPos":{"x":131,"y":106,"height":52,"width":55},"endPos":{"x":131,"y":106,"height":52,"width":55},"id":0},{"startTime":7.25668478012085,"endTime":7.25668478012085,"startPos":{"x":137,"y":100,"height":52,"width":55},"endPos":{"x":137,"y":100,"height":52,"width":55},"id":0},{"startTime":7.556826114654541,"endTime":7.556826114654541,"startPos":{"x":139,"y":85,"height":52,"width":55},"endPos":{"x":139,"y":85,"height":52,"width":55},"id":0},{"startTime":7.656826019287109,"endTime":7.656826019287109,"startPos":{"x":135,"y":69,"height":52,"width":55},"endPos":{"x":135,"y":69,"height":52,"width":55},"id":0},{"startTime":7.955603122711182,"endTime":7.955603122711182,"startPos":{"x":128,"y":54,"height":52,"width":55},"endPos":{"x":128,"y":54,"height":52,"width":55},"id":0},{"startTime":8.05560302734375,"endTime":8.05560302734375,"startPos":{"x":119,"y":48,"height":52,"width":55},"endPos":{"x":119,"y":48,"height":52,"width":55},"id":0},{"startTime":8.353562355041504,"endTime":8.353562355041504,"startPos":{"x":111,"y":47,"height":52,"width":55},"endPos":{"x":111,"y":47,"height":52,"width":55},"id":0},{"startTime":8.453561782836914,"endTime":8.453561782836914,"startPos":{"x":105,"y":49,"height":52,"width":55},"endPos":{"x":105,"y":49,"height":52,"width":55},"id":0},{"startTime":8.751521110534668,"endTime":8.751521110534668,"startPos":{"x":102,"y":57,"height":52,"width":55},"endPos":{"x":102,"y":57,"height":52,"width":55},"id":0},{"startTime":8.851520538330078,"endTime":8.851520538330078,"startPos":{"x":99,"y":67,"height":52,"width":55},"endPos":{"x":99,"y":67,"height":52,"width":55},"id":0},{"startTime":8.951520919799805,"endTime":8.951520919799805,"startPos":{"x":97,"y":78,"height":52,"width":55},"endPos":{"x":97,"y":78,"height":52,"width":55},"id":0},{"startTime":9.247481346130371,"endTime":9.247481346130371,"startPos":{"x":97,"y":88,"height":52,"width":55},"endPos":{"x":97,"y":88,"height":52,"width":55},"id":0},{"startTime":9.347480773925781,"endTime":9.347480773925781,"startPos":{"x":97,"y":95,"height":52,"width":55},"endPos":{"x":97,"y":95,"height":52,"width":55},"id":0},{"startTime":9.647439956665039,"endTime":9.647439956665039,"startPos":{"x":99,"y":99,"height":52,"width":55},"endPos":{"x":99,"y":99,"height":52,"width":55},"id":0},{"startTime":9.74843978881836,"endTime":9.74843978881836,"startPos":{"x":105,"y":99,"height":52,"width":55},"endPos":{"x":105,"y":99,"height":52,"width":55},"id":0}];



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
            for(var event in eventList){
                var eventData = this.data[eventList[event].id];
//                var canvas = document.getElementById("canvas");
//                var ctx = canvas.getContext("2d");
                var borderWidth = 2;
                if(eventList[event].action=="START"){
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
            },100)
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
//        ctx.fillStyle = "rgba(200,200,200,0.4)";
//        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    };

    var hiLiteRect = new Rectangle({
         id:"hiLite"
        ,color:"rgba(200,200,200,0.4)"
        ,mouseMove:function(coords){
            if(!this.xHandle || !this.yHandle) return;
            if(this.xHandle == coords.x && this.yHandle==coords.y) return;  //Have not moved
//                    $("#video").get(0).pause();
            this.x = (coords.x - this.xHandle);
            this.y = (coords.y - this.yHandle);
//                    $("#video").get(0).play();
            myScene.modified=true;
        }
    });

    myScene.add(hiLiteRect);

    canvas.onmousemove = function(event) {
        if(canvas.rMode=="select") myScene.mouseMove(event);
        else if(canvas.rMode=="draw"){
            if (!rect || !pressed || canvas.rMode!="draw") { return; }
            var tRect=event.target.getClientRects()[0];
            rect.width = event.clientX - tRect.left - rect.x;
            rect.height = event.clientY - tRect.top -rect.y;

            hiLiteRect.x = rect.x;
            hiLiteRect.y = rect.y;
            hiLiteRect.w = rect.width;
            hiLiteRect.h = rect.height;

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