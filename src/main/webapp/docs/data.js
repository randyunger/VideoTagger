/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 5/5/11
 * Time: 7:01 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function(){
    var email = $("#email").text();
    if(email) loadInitData(email);
    hookupButtons();
    doDraw();
});

function loadInitData(email){
//    $.ajax({
//         type:"GET"
//        ,url:"/api/account"
//        ,data: "email="+email
////        ,dataType: "json"
//        ,success:function(data){
////            debugger;
//        }
//        ,error:function(data){
//            debugger;
//        }
//    });
    //page includes data
    try{
        if(ads){
    //        for(var i=0;i<ads.length;i++){
            for(ix in ads){
                $('#adSelect').append($("<option></option>").attr("value",ix).text(ads[ix].title));
            }
        }
    }catch(e){}
    $('#adSelect').change(function(){
        var ix = $("#adSelect").val();
        if(ix==0){  //New ad
            $("#adLabel").val("");
            $("#adCopy").val("");
            $("#adTitle").val("");
        }
        else{     //Editing existing
            $("#adTitle").val(ads[ix].title);
            $("#adLabel").val(ads[ix].label);
            $("#adCopy").val(ads[ix].copy);
        }
    });

//    var posData = null;
//    try{
//        posData = JSON.parse(JSON.parse(pos).data);
//    }catch(e){}

//    if(pos){
//        posData = pos;
//    }

}

//var  =
function hookupButtons (){

    $("#saveAd").click(function(){
        var opts = {
             type:"ad"
            ,value:$("#saveAd").closest("form").find(":input").serialize()
            ,success:function(data){
                var newAds = JSON.parse(data);
                var ad;
                for(ad in newAds){
                    ads[ad] = newAds[ad]
                }
                $("#adSelect").select(ad);
            }
        };
        save(opts);
    });

    $("#savePos").click(function(){
        var d = myScene.serialize();
        var opts = {
             type:"pos"
            ,value:"data="+d
            ,success:function(data){
                //save hiLite
                debugger;
                var resp = JSON.parse(data);
                var adId = $("#adSelect").val();
                var hiLitePositionId;
                for(hiLitePositionId in resp){} //sets hiLitePositionId
                var hiLiteOpts = {
                     type:"hiLite"
                    ,value:"adId="+adId+"&hiLitePositionId="+hiLitePositionId
                };
                save(hiLiteOpts);
            }
        };
        save(opts);



    });

    $("#speed").change(function(){
        $("#video")[0].playbackRate = $("#speed").val() / 100;
    });

}

//var save =
function save (opts){
    var props = {
         type: "ad"
        ,value:"title='blank'"
        ,error:function(resp){debugger;}
//        ,value: {
//             copy:  "A new ad. Buy now!"
//            ,title: "Ad Title"
//            ,label: "Not shown to user"
//        }
    };

    $.extend(true, props, opts);

//    var url = "/api/save"+props["type"];
    var url = "/api/"+props["type"];
    var data = props["value"];

    $.ajax({
         type:"POST"
        ,url:url
        ,data: data
        ,dataType: "json"
        ,success:function(data){
            if(props.success) props.success(data)
        }
        ,error:function(data){
            if(props.error) props.error(data)
        }
    });


}
//
//function savePos (opts){
//    var props = {
//         type: "ad"
//        ,value:"title='blank'"
////        ,value: {
////             copy:  "A new ad. Buy now!"
////            ,title: "Ad Title"
////            ,label: "Not shown to user"
////        }
//    };
//
//    $.extend(true, props, opts);
//
////    var url = "/api/save"+props["type"];
//    var url = "/api/"+props["type"];
//    var data = props["value"];
//
//    $.ajax({
//         type:"POST"
//        ,url:url
//        ,data: data
//        ,dataType: "json"
//        ,success:function(data){
////            debugger;
//        }
//        ,error:function(data){
////            debugger;
//        }
//    });
//
//
//}