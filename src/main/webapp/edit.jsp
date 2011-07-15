
<%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>
<%@ page import="com.google.appengine.api.users.User" %>
<%@ page import="com.ungersoft.videotagger.pojos.Account" %>
<%@ page import="com.ungersoft.videotagger.services.datastore.DataService" %>
<%@ page import="javax.ws.rs.core.Response" %>
<%@ page import="com.ungersoft.videotagger.pojos.Ad" %>
<%@ page import="java.util.List" %>
<%@ page import="com.ungersoft.videotagger.pojos.HiLitePosition" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
UserService userService = UserServiceFactory.getUserService();
User user = userService.getCurrentUser();

String url = userService.createLoginURL(request.getRequestURI());
String urlLinktext = "Login";
//Account account = new Account();
//    account.getAccount(user.getEmail());
Ad a = new Ad();  //todo: this sucks
HiLitePosition p = new HiLitePosition();

String adJ = a.getAds(user.getEmail());
String posJ = p.get(user.getEmail());

if (user != null){

//    DataService.getInstance().retrieve()

    if(!user.getEmail().toLowerCase().equals("randy.unger@gmail.com") &&
       !user.getEmail().toLowerCase().equals("test@example.com")    ){
        response.sendRedirect("/index.jsp");
    }

    url = userService.createLogoutURL(request.getRequestURI());
    urlLinktext = "Logout";

//    account.getAccount(user.getEmail());
//    account = null;
//    account = (Account)DataService.apply().retrieve(Account.class, user.getUserId());
}

%>
<html>
 <head>
    <title>Editor</title>
    <link rel="stylesheet" href="docs/styles.css" type="text/css">
    <script type="text/javascript">
        var ads = JSON.parse(<%=adJ%>);
        var pos = JSON.parse(<%=posJ%>);
//        var a = 1+1
//        a+2
    </script>
 </head>
 <body onload="drawInit()">
    <header class="header">
        <div>MyApp</div>
        <div class="topContent">Please use this appp</div>
        <div class="logInOut">
            <span id="email"><%=user.getEmail()%></span><br/>
            <a href="<%=url%>"><%=urlLinktext%></a>
        </div>
    </header>
    <div class="main">
        <div class="canvas">
            <video id="video" src="Ferrell-1.m4v" width="500" height="500" autoplay></video>
            <canvas id="canvas" width="600" height="600"></canvas>
        </div>
        <div class="slider">
            <input name="speed" type="range" id="speed" min="0" max="200" step="4" value="100">
        </div>
        <%--<input name="r" type="range" min="1" max="11" value="9">--%>
        <div class="adInput">
            <form>
                <div>
                    <h2 class="sectHead">Data</h2>
                    <input class="saveButton" type="button" name="update" id="saveAd" value="Save"/>
                </div>
                <div class="clear"></div>
                <label>Select an Existing:<br/>
                    <select id="adSelect" name="id"><option value="0">Create New</option></select>
                </label><label>Title: <input type="text" id="adTitle" name="title" style="width:200px"/></label><br/>
                <br/>
                <label>Label: <input type="text" id="adLabel" name="label"/></label><br/>
                <label>Copy:  <textarea rows=2 cols=20 id="adCopy" name="copy"></textarea></label><br/>
            </form>

            <form>
                <div>
                    <h2 class="sectHead">Position</h2>
                    <input class="saveButton" type="button" name="update" id="savePos" value="Save"/>
                </div>
                <%--<div class="clear"></div>--%>
                <%--<label>Select an Existing:<br/>--%>
                    <%--<select id="adSelect" name="id"><option value="0">Create New</option></select>--%>
                <%--</label><label>Title: <input type="text" id="adTitle" name="title" style="width:200px"/></label><br/>--%>
                <%--<br/>--%>
                <%--<label>Label: <input type="text" id="adLabel" name="label"/></label><br/>--%>
                <%--<label>Copy:  <textarea rows=2 cols=20 id="adCopy" name="copy"></textarea></label><br/>--%>
            </form>


        </div>
    </div>

    <script type="text/javascript" src="docs/jquery.js"></script>

    <script type="text/javascript" src="docs/data.js"></script>

    <script type="text/javascript" src="docs/draw.js"></script>

 </body>
</html>