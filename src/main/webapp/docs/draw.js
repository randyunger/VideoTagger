//$(document).ready(function(){
var myScene, canvas, ctx;
function doDraw(){
//    var myScene, canvas, ctx;

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
            //todo un-hardcoded vdeo

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

        this.serialize = function(){
            //only works for one obj for now!, need to concat cleanly
            var total="";
            for(var ix in myScene.objs){
                var obj = myScene.objs[ix];
                if(obj && obj.serialize ){
                    total=total+obj.serialize();
                }
            }
            return total;
        }
//        this.draw();
    }

    var anIndex=0;
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
            ,record:function(time){
                function numDecimals(num, places) {
                    var factor = Math.pow(10,places);
                    num=num*factor;
                    num = Math.round(num);
                    num=num/factor;
                    return num;
                }

                var timeKey = numDecimals(time, 2);
//                if(timeKey>10) debugger;
                if(!this.selected) return;
//                    $("#video").get(0).pause();
                var n = //newdata(timeKey);
                    {
                         startTime:timeKey
                        ,endTime:timeKey
                        ,startPos:{x:this.x, y:this.y, height:this.h, width:this.w}
                        ,endPos:{x:this.x, y:this.y, height:this.h, width:this.w}
                        ,id:0   //anIndex++
                    };
                var doAdd=false;
                if(this.recorded.length == 0) doAdd=true;//this.recorded[this.recorded.length]=n;
                else if(JSON.stringify(n.startPos) == JSON.stringify(this.recorded[this.recorded.length-1].startPos)) {
                    //update time for pre-existing
                    this.recorded[this.recorded.length-1].endTime = n.endTime;
                }
                else {
                    //this.recorded[this.recorded.length]=n;
                    doAdd=true;
                }
                if(doAdd){  //todo dangerous to modify other?
                    if(this.recorded.length>0) this.recorded[this.recorded.length-1].endTime = n.startTime;
                    this.recorded[this.recorded.length]=n;
                }
//                    $("#video").get(0).play();
                return this.recorded;
            }
            ,serialize:function(){
//                debugger;
                return JSON.stringify(this.recorded);
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

//    data =    [{"startTime":4.363603115081787,"endTime":4.762561798095703,"startPos":{"x":169,"y":53,"height":21,"width":47},"endPos":{"x":169,"y":53,"height":21,"width":47},"id":-1},{"startTime":4.762561798095703,"endTime":4.86256217956543,"startPos":{"x":166,"y":50,"height":21,"width":47},"endPos":{"x":166,"y":50,"height":21,"width":47},"id":1},{"startTime":4.86256217956543,"endTime":5.160521984100342,"startPos":{"x":160,"y":46,"height":21,"width":47},"endPos":{"x":160,"y":46,"height":21,"width":47},"id":2},{"startTime":5.160521984100342,"endTime":5.26052188873291,"startPos":{"x":151,"y":41,"height":21,"width":47},"endPos":{"x":151,"y":41,"height":21,"width":47},"id":3},{"startTime":5.26052188873291,"endTime":5.559481143951416,"startPos":{"x":144,"y":37,"height":21,"width":47},"endPos":{"x":144,"y":37,"height":21,"width":47},"id":4},{"startTime":5.559481143951416,"endTime":5.658481121063232,"startPos":{"x":135,"y":36,"height":21,"width":47},"endPos":{"x":135,"y":36,"height":21,"width":47},"id":5},{"startTime":5.658481121063232,"endTime":5.958439826965332,"startPos":{"x":120,"y":35,"height":21,"width":47},"endPos":{"x":120,"y":35,"height":21,"width":47},"id":6},{"startTime":5.958439826965332,"endTime":6.0594401359558105,"startPos":{"x":103,"y":37,"height":21,"width":47},"endPos":{"x":103,"y":37,"height":21,"width":47},"id":7},{"startTime":6.0594401359558105,"endTime":6.359397888183594,"startPos":{"x":86,"y":44,"height":21,"width":47},"endPos":{"x":86,"y":44,"height":21,"width":47},"id":8},{"startTime":6.359397888183594,"endTime":6.463397979736328,"startPos":{"x":71,"y":55,"height":21,"width":47},"endPos":{"x":71,"y":55,"height":21,"width":47},"id":9},{"startTime":6.463397979736328,"endTime":6.776358127593994,"startPos":{"x":61,"y":69,"height":21,"width":47},"endPos":{"x":61,"y":69,"height":21,"width":47},"id":10},{"startTime":6.776358127593994,"endTime":6.879357814788818,"startPos":{"x":57,"y":81,"height":21,"width":47},"endPos":{"x":57,"y":81,"height":21,"width":47},"id":11},{"startTime":6.879357814788818,"endTime":7.217536926269531,"startPos":{"x":54,"y":101,"height":21,"width":47},"endPos":{"x":54,"y":101,"height":21,"width":47},"id":12},{"startTime":7.217536926269531,"endTime":7.31853723526001,"startPos":{"x":55,"y":115,"height":21,"width":47},"endPos":{"x":55,"y":115,"height":21,"width":47},"id":13},{"startTime":7.31853723526001,"endTime":7.640717029571533,"startPos":{"x":60,"y":119,"height":21,"width":47},"endPos":{"x":60,"y":119,"height":21,"width":47},"id":14},{"startTime":7.640717029571533,"endTime":7.740716934204102,"startPos":{"x":71,"y":131,"height":21,"width":47},"endPos":{"x":71,"y":131,"height":21,"width":47},"id":15},{"startTime":7.740716934204102,"endTime":8.038676261901855,"startPos":{"x":86,"y":136,"height":21,"width":47},"endPos":{"x":86,"y":136,"height":21,"width":47},"id":16},{"startTime":8.038676261901855,"endTime":8.138675689697266,"startPos":{"x":95,"y":130,"height":21,"width":47},"endPos":{"x":95,"y":130,"height":21,"width":47},"id":17},{"startTime":8.138675689697266,"endTime":8.239676475524902,"startPos":{"x":113,"y":106,"height":21,"width":47},"endPos":{"x":113,"y":106,"height":21,"width":47},"id":18},{"startTime":8.239676475524902,"endTime":8.536635398864746,"startPos":{"x":127,"y":87,"height":21,"width":47},"endPos":{"x":127,"y":87,"height":21,"width":47},"id":19},{"startTime":8.536635398864746,"endTime":8.637635231018066,"startPos":{"x":134,"y":74,"height":21,"width":47},"endPos":{"x":134,"y":74,"height":21,"width":47},"id":20},{"startTime":8.637635231018066,"endTime":8.937593460083008,"startPos":{"x":143,"y":63,"height":21,"width":47},"endPos":{"x":143,"y":63,"height":21,"width":47},"id":21},{"startTime":8.937593460083008,"endTime":9.038593292236328,"startPos":{"x":156,"y":50,"height":21,"width":47},"endPos":{"x":156,"y":50,"height":21,"width":47},"id":22},{"startTime":9.038593292236328,"endTime":9.336552619934082,"startPos":{"x":163,"y":48,"height":21,"width":47},"endPos":{"x":163,"y":48,"height":21,"width":47},"id":23},{"startTime":9.336552619934082,"endTime":9.436553001403809,"startPos":{"x":173,"y":64,"height":21,"width":47},"endPos":{"x":173,"y":64,"height":21,"width":47},"id":24},{"startTime":9.436553001403809,"endTime":9.77373218536377,"startPos":{"x":180,"y":80,"height":21,"width":47},"endPos":{"x":180,"y":80,"height":21,"width":47},"id":25},{"startTime":9.77373218536377,"endTime":9.87373161315918,"startPos":{"x":184,"y":95,"height":21,"width":47},"endPos":{"x":184,"y":95,"height":21,"width":47},"id":26},{"startTime":9.87373161315918,"endTime":9.87373161315918,"startPos":{"x":188,"y":103,"height":21,"width":47},"endPos":{"x":188,"y":103,"height":21,"width":47},"id":27}];
//            [{"startTime":6.932734966278076,"endTime":8.126885414123535,"startPos":{"x":188,"y":17,"height":38,"width":32},"endPos":{"x":188,"y":17,"height":38,"width":32},"id":0},{"startTime":8.126885414123535,"endTime":8.226884841918945,"startPos":{"x":185,"y":19,"height":38,"width":32},"endPos":{"x":185,"y":19,"height":38,"width":32},"id":6},{"startTime":8.226884841918945,"endTime":8.523843765258789,"startPos":{"x":182,"y":22,"height":38,"width":32},"endPos":{"x":182,"y":22,"height":38,"width":32},"id":7},{"startTime":8.523843765258789,"endTime":8.623844146728516,"startPos":{"x":178,"y":23,"height":38,"width":32},"endPos":{"x":178,"y":23,"height":38,"width":32},"id":8},{"startTime":8.623844146728516,"endTime":8.946022033691406,"startPos":{"x":175,"y":26,"height":38,"width":32},"endPos":{"x":175,"y":26,"height":38,"width":32},"id":9},{"startTime":8.946022033691406,"endTime":9.046022415161133,"startPos":{"x":173,"y":28,"height":38,"width":32},"endPos":{"x":173,"y":28,"height":38,"width":32},"id":10},{"startTime":9.046022415161133,"endTime":9.343708992004395,"startPos":{"x":169,"y":30,"height":38,"width":32},"endPos":{"x":169,"y":30,"height":38,"width":32},"id":11},{"startTime":9.343708992004395,"endTime":9.443709373474121,"startPos":{"x":167,"y":33,"height":38,"width":32},"endPos":{"x":167,"y":33,"height":38,"width":32},"id":12},{"startTime":9.443709373474121,"endTime":9.764887809753418,"startPos":{"x":163,"y":35,"height":38,"width":32},"endPos":{"x":163,"y":35,"height":38,"width":32},"id":13},{"startTime":9.764887809753418,"endTime":9.864888191223145,"startPos":{"x":159,"y":38,"height":38,"width":32},"endPos":{"x":159,"y":38,"height":38,"width":32},"id":14},{"startTime":9.864888191223145,"endTime":9.864888191223145,"startPos":{"x":155,"y":42,"height":38,"width":32},"endPos":{"x":155,"y":42,"height":38,"width":32},"id":15}];
//    var data;
//    if(posData && posData[0]){
//        data = posData[0];
//    }
//    else{
//        data = [{"startTime":2.4618349075317383,"endTime":2.763355016708374,"startPos":{"x":171,"y":24,"height":23,"width":34},"endPos":{"x":171,"y":24,"height":23,"width":34},"id":0},{"startTime":2.763355016708374,"endTime":2.8633549213409424,"startPos":{"x":165,"y":24,"height":23,"width":34},"endPos":{"x":165,"y":24,"height":23,"width":34},"id":0},{"startTime":2.8633549213409424,"endTime":2.9591140747070312,"startPos":{"x":156,"y":24,"height":23,"width":34},"endPos":{"x":156,"y":24,"height":23,"width":34},"id":0},{"startTime":2.9591140747070312,"endTime":3.0591139793395996,"startPos":{"x":149,"y":24,"height":23,"width":34},"endPos":{"x":149,"y":24,"height":23,"width":34},"id":0},{"startTime":3.0591139793395996,"endTime":3.154874086380005,"startPos":{"x":144,"y":25,"height":23,"width":34},"endPos":{"x":144,"y":25,"height":23,"width":34},"id":0},{"startTime":3.154874086380005,"endTime":3.2548739910125732,"startPos":{"x":132,"y":27,"height":23,"width":34},"endPos":{"x":132,"y":27,"height":23,"width":34},"id":0},{"startTime":3.2548739910125732,"endTime":3.36063289642334,"startPos":{"x":124,"y":28,"height":23,"width":34},"endPos":{"x":124,"y":28,"height":23,"width":34},"id":0},{"startTime":3.36063289642334,"endTime":3.4606330394744873,"startPos":{"x":113,"y":28,"height":23,"width":34},"endPos":{"x":113,"y":28,"height":23,"width":34},"id":0},{"startTime":3.4606330394744873,"endTime":3.5563929080963135,"startPos":{"x":105,"y":28,"height":23,"width":34},"endPos":{"x":105,"y":28,"height":23,"width":34},"id":0},{"startTime":3.5563929080963135,"endTime":3.657392978668213,"startPos":{"x":93,"y":29,"height":23,"width":34},"endPos":{"x":93,"y":29,"height":23,"width":34},"id":0},{"startTime":3.657392978668213,"endTime":3.763153076171875,"startPos":{"x":81,"y":31,"height":23,"width":34},"endPos":{"x":81,"y":31,"height":23,"width":34},"id":0},{"startTime":3.763153076171875,"endTime":3.858513116836548,"startPos":{"x":74,"y":36,"height":23,"width":34},"endPos":{"x":74,"y":36,"height":23,"width":34},"id":0},{"startTime":3.858513116836548,"endTime":3.958513021469116,"startPos":{"x":71,"y":42,"height":23,"width":34},"endPos":{"x":71,"y":42,"height":23,"width":34},"id":0},{"startTime":3.958513021469116,"endTime":4.064272880554199,"startPos":{"x":70,"y":47,"height":23,"width":34},"endPos":{"x":70,"y":47,"height":23,"width":34},"id":0},{"startTime":4.064272880554199,"endTime":4.164272785186768,"startPos":{"x":72,"y":52,"height":23,"width":34},"endPos":{"x":72,"y":52,"height":23,"width":34},"id":0},{"startTime":4.164272785186768,"endTime":4.260033130645752,"startPos":{"x":81,"y":55,"height":23,"width":34},"endPos":{"x":81,"y":55,"height":23,"width":34},"id":0},{"startTime":4.260033130645752,"endTime":4.36003303527832,"startPos":{"x":95,"y":56,"height":23,"width":34},"endPos":{"x":95,"y":56,"height":23,"width":34},"id":0},{"startTime":4.36003303527832,"endTime":4.45579195022583,"startPos":{"x":111,"y":56,"height":23,"width":34},"endPos":{"x":111,"y":56,"height":23,"width":34},"id":0},{"startTime":4.45579195022583,"endTime":4.555791854858398,"startPos":{"x":129,"y":53,"height":23,"width":34},"endPos":{"x":129,"y":53,"height":23,"width":34},"id":0},{"startTime":4.555791854858398,"endTime":4.6615519523620605,"startPos":{"x":143,"y":52,"height":23,"width":34},"endPos":{"x":143,"y":52,"height":23,"width":34},"id":0},{"startTime":4.6615519523620605,"endTime":4.761551856994629,"startPos":{"x":157,"y":52,"height":23,"width":34},"endPos":{"x":157,"y":52,"height":23,"width":34},"id":0},{"startTime":4.761551856994629,"endTime":4.858312129974365,"startPos":{"x":170,"y":54,"height":23,"width":34},"endPos":{"x":170,"y":54,"height":23,"width":34},"id":0},{"startTime":4.858312129974365,"endTime":4.958312034606934,"startPos":{"x":179,"y":62,"height":23,"width":34},"endPos":{"x":179,"y":62,"height":23,"width":34},"id":0},{"startTime":4.958312034606934,"endTime":5.064071178436279,"startPos":{"x":188,"y":72,"height":23,"width":34},"endPos":{"x":188,"y":72,"height":23,"width":34},"id":0},{"startTime":5.064071178436279,"endTime":5.1598310470581055,"startPos":{"x":189,"y":75,"height":23,"width":34},"endPos":{"x":189,"y":75,"height":23,"width":34},"id":0},{"startTime":5.1598310470581055,"endTime":5.259830951690674,"startPos":{"x":188,"y":75,"height":23,"width":34},"endPos":{"x":188,"y":75,"height":23,"width":34},"id":0},{"startTime":5.259830951690674,"endTime":5.3655900955200195,"startPos":{"x":174,"y":73,"height":23,"width":34},"endPos":{"x":174,"y":73,"height":23,"width":34},"id":0},{"startTime":5.3655900955200195,"endTime":5.465590000152588,"startPos":{"x":155,"y":71,"height":23,"width":34},"endPos":{"x":155,"y":71,"height":23,"width":34},"id":0},{"startTime":5.465590000152588,"endTime":5.562748908996582,"startPos":{"x":132,"y":71,"height":23,"width":34},"endPos":{"x":132,"y":71,"height":23,"width":34},"id":0},{"startTime":5.562748908996582,"endTime":5.66274881362915,"startPos":{"x":111,"y":71,"height":23,"width":34},"endPos":{"x":111,"y":71,"height":23,"width":34},"id":0},{"startTime":5.66274881362915,"endTime":5.759509086608887,"startPos":{"x":99,"y":73,"height":23,"width":34},"endPos":{"x":99,"y":73,"height":23,"width":34},"id":0},{"startTime":5.759509086608887,"endTime":5.859508991241455,"startPos":{"x":79,"y":95,"height":23,"width":34},"endPos":{"x":79,"y":95,"height":23,"width":34},"id":0},{"startTime":5.859508991241455,"endTime":6.261027812957764,"startPos":{"x":71,"y":104,"height":23,"width":34},"endPos":{"x":71,"y":104,"height":23,"width":34},"id":0},{"startTime":6.261027812957764,"endTime":6.366787910461426,"startPos":{"x":69,"y":114,"height":23,"width":34},"endPos":{"x":69,"y":114,"height":23,"width":34},"id":0},{"startTime":6.366787910461426,"endTime":6.46314811706543,"startPos":{"x":65,"y":127,"height":23,"width":34},"endPos":{"x":65,"y":127,"height":23,"width":34},"id":0},{"startTime":6.46314811706543,"endTime":6.56414794921875,"startPos":{"x":63,"y":137,"height":23,"width":34},"endPos":{"x":63,"y":137,"height":23,"width":34},"id":0},{"startTime":6.56414794921875,"endTime":6.668306827545166,"startPos":{"x":62,"y":144,"height":23,"width":34},"endPos":{"x":62,"y":144,"height":23,"width":34},"id":0},{"startTime":6.668306827545166,"endTime":6.768307209014893,"startPos":{"x":60,"y":146,"height":23,"width":34},"endPos":{"x":60,"y":146,"height":23,"width":34},"id":0},{"startTime":6.768307209014893,"endTime":6.865667819976807,"startPos":{"x":62,"y":147,"height":23,"width":34},"endPos":{"x":62,"y":147,"height":23,"width":34},"id":0},{"startTime":6.865667819976807,"endTime":6.965668201446533,"startPos":{"x":68,"y":144,"height":23,"width":34},"endPos":{"x":68,"y":144,"height":23,"width":34},"id":0},{"startTime":6.965668201446533,"endTime":7.061427116394043,"startPos":{"x":75,"y":137,"height":23,"width":34},"endPos":{"x":75,"y":137,"height":23,"width":34},"id":0},{"startTime":7.061427116394043,"endTime":7.161427021026611,"startPos":{"x":82,"y":129,"height":23,"width":34},"endPos":{"x":82,"y":129,"height":23,"width":34},"id":0},{"startTime":7.161427021026611,"endTime":7.266585826873779,"startPos":{"x":86,"y":122,"height":23,"width":34},"endPos":{"x":86,"y":122,"height":23,"width":34},"id":0},{"startTime":7.266585826873779,"endTime":7.366586208343506,"startPos":{"x":93,"y":113,"height":23,"width":34},"endPos":{"x":93,"y":113,"height":23,"width":34},"id":0},{"startTime":7.366586208343506,"endTime":7.462945938110352,"startPos":{"x":103,"y":103,"height":23,"width":34},"endPos":{"x":103,"y":103,"height":23,"width":34},"id":0},{"startTime":7.462945938110352,"endTime":7.56294584274292,"startPos":{"x":115,"y":95,"height":23,"width":34},"endPos":{"x":115,"y":95,"height":23,"width":34},"id":0},{"startTime":7.56294584274292,"endTime":7.66770601272583,"startPos":{"x":127,"y":88,"height":23,"width":34},"endPos":{"x":127,"y":88,"height":23,"width":34},"id":0},{"startTime":7.66770601272583,"endTime":7.763465881347656,"startPos":{"x":140,"y":86,"height":23,"width":34},"endPos":{"x":140,"y":86,"height":23,"width":34},"id":0},{"startTime":7.763465881347656,"endTime":7.863465785980225,"startPos":{"x":152,"y":86,"height":23,"width":34},"endPos":{"x":152,"y":86,"height":23,"width":34},"id":0},{"startTime":7.863465785980225,"endTime":7.9612250328063965,"startPos":{"x":163,"y":86,"height":23,"width":34},"endPos":{"x":163,"y":86,"height":23,"width":34},"id":0},{"startTime":7.9612250328063965,"endTime":8.167984962463379,"startPos":{"x":165,"y":87,"height":23,"width":34},"endPos":{"x":165,"y":87,"height":23,"width":34},"id":0},{"startTime":8.167984962463379,"endTime":8.267985343933105,"startPos":{"x":166,"y":87,"height":23,"width":34},"endPos":{"x":166,"y":87,"height":23,"width":34},"id":0},{"startTime":8.267985343933105,"endTime":8.365744590759277,"startPos":{"x":175,"y":96,"height":23,"width":34},"endPos":{"x":175,"y":96,"height":23,"width":34},"id":0},{"startTime":8.365744590759277,"endTime":8.465744972229004,"startPos":{"x":184,"y":108,"height":23,"width":34},"endPos":{"x":184,"y":108,"height":23,"width":34},"id":0},{"startTime":8.465744972229004,"endTime":8.570504188537598,"startPos":{"x":188,"y":115,"height":23,"width":34},"endPos":{"x":188,"y":115,"height":23,"width":34},"id":0},{"startTime":8.570504188537598,"endTime":8.670503616333008,"startPos":{"x":193,"y":123,"height":23,"width":34},"endPos":{"x":193,"y":123,"height":23,"width":34},"id":0},{"startTime":8.670503616333008,"endTime":8.767264366149902,"startPos":{"x":196,"y":128,"height":23,"width":34},"endPos":{"x":196,"y":128,"height":23,"width":34},"id":0},{"startTime":8.767264366149902,"endTime":8.873023986816406,"startPos":{"x":203,"y":133,"height":23,"width":34},"endPos":{"x":203,"y":133,"height":23,"width":34},"id":0},{"startTime":8.873023986816406,"endTime":8.973024368286133,"startPos":{"x":215,"y":132,"height":23,"width":34},"endPos":{"x":215,"y":132,"height":23,"width":34},"id":0},{"startTime":8.973024368286133,"endTime":9.068782806396484,"startPos":{"x":225,"y":123,"height":23,"width":34},"endPos":{"x":225,"y":123,"height":23,"width":34},"id":0},{"startTime":9.068782806396484,"endTime":9.169782638549805,"startPos":{"x":227,"y":112,"height":23,"width":34},"endPos":{"x":227,"y":112,"height":23,"width":34},"id":0},{"startTime":9.169782638549805,"endTime":9.265542984008789,"startPos":{"x":227,"y":99,"height":23,"width":34},"endPos":{"x":227,"y":99,"height":23,"width":34},"id":0},{"startTime":9.265542984008789,"endTime":9.365543365478516,"startPos":{"x":227,"y":87,"height":23,"width":34},"endPos":{"x":227,"y":87,"height":23,"width":34},"id":0},{"startTime":9.365543365478516,"endTime":9.47230339050293,"startPos":{"x":223,"y":80,"height":23,"width":34},"endPos":{"x":223,"y":80,"height":23,"width":34},"id":0},{"startTime":9.47230339050293,"endTime":9.57230281829834,"startPos":{"x":219,"y":72,"height":23,"width":34},"endPos":{"x":219,"y":72,"height":23,"width":34},"id":0},{"startTime":9.57230281829834,"endTime":9.668062210083008,"startPos":{"x":214,"y":66,"height":23,"width":34},"endPos":{"x":214,"y":66,"height":23,"width":34},"id":0},{"startTime":9.668062210083008,"endTime":9.768061637878418,"startPos":{"x":207,"y":60,"height":23,"width":34},"endPos":{"x":207,"y":60,"height":23,"width":34},"id":0},{"startTime":9.768061637878418,"endTime":9.873822212219238,"startPos":{"x":198,"y":57,"height":23,"width":34},"endPos":{"x":198,"y":57,"height":23,"width":34},"id":0},{"startTime":9.873822212219238,"endTime":9.973821640014648,"startPos":{"x":188,"y":51,"height":23,"width":34},"endPos":{"x":188,"y":51,"height":23,"width":34},"id":0},{"startTime":9.973821640014648,"endTime":9.973821640014648,"startPos":{"x":170,"y":43,"height":23,"width":34},"endPos":{"x":170,"y":43,"height":23,"width":34},"id":0}] ;
//    }
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

//                debugger;
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
//            $("#video").get(0).pause();
//            debugger;
            for(var event in eventList){
                var eventData = this.data[eventList[event].id];
//                var canvas = document.getElementById("canvas");
//                var ctx = canvas.getContext("2d");
//                var borderWidth = 2;
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
                else if(eventList[event].action=="END"){ //Should clear canvas and redraw
                    myScene.remove(eventData.id);
//                    ctx.clearRect(eventData.endPos.x, eventData.endPos.y, eventData.endPos.width, eventData.endPos.height);
                }
//                $("#video").get(0).play();  //only needed for debugging
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

//    $("#video").get(0).pause();
//    debugger;
    try{
        timeLine.register(data);
    }catch(e){}

    timeLine.startPoll("#video");
//    $("#video").get(0).play();

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
//debugger;
        if(canvas.rMode=="draw") canvas.rMode="select";


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