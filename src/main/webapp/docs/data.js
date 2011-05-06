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
    $.ajax({
         type:"GET"
        ,url:"/api/account"
        ,data: "email="+email
        ,dataType: "json"
        ,success:function(data){
            debugger;
        }
        ,error:function(data){
            debugger;
        }
    });
}

//var  =
function hookupButtons (){
    $("#saveAd").click(function(){
        var opts = {
             type:"ad"
            ,value:$("#saveAd").closest("div").find(":input").serialize()
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
//debugger;
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