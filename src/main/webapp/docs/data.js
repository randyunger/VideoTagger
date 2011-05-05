/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 5/5/11
 * Time: 7:01 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function(){
    hookupButtons();
});

//var  =
function hookupButtons (){
    $("#saveAd").click(function(){
        var opts = {
             type:"Ad"
            ,value:$("#saveAd").closest("div").find(":input").serialize()
        };
        save(opts);
    });
}

//var save =
function save (opts){
    var props = {
         type: "Ad"
        ,value:"title='blank'"
//        ,value: {
//             copy:  "A new ad. Buy now!"
//            ,title: "Ad Title"
//            ,label: "Not shown to user"
//        }
    };
debugger;
    $.extend(true, props, opts);

    var url = "/api/save"+props["type"];
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