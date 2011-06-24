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
    if(ads){
//        for(var i=0;i<ads.length;i++){
        for(ix in ads){
            $('#adSelect').append($("<option></option>").attr("value",ix).text(ads[ix].title));
        }
    }
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
}

//var  =
function hookupButtons (){
    $("#saveAd").click(function(){
        var opts = {
             type:"ad"
            ,value:$("#saveAd").closest("form").find(":input").serialize()
        };
        save(opts);
    });

    $("#savePos").click(function(){
        var opts = {
             type:"pos"
            ,value:"id=1&data=someTestData"
        };
        save(opts);
    });

}

//var save =
function save (opts){
    var props = {
         type: "ad"
        ,value:"title='blank'"
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
            debugger;
        }
        ,error:function(data){
            debugger;
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