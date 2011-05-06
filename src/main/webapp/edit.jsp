
<%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>
<%@ page import="com.google.appengine.api.users.User" %>
<%@ page import="com.ungersoft.videotagger.pojos.Account" %>
<%@ page import="com.ungersoft.videotagger.datastore.DataService" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
UserService userService = UserServiceFactory.getUserService();
User user = userService.getCurrentUser();

String url = userService.createLoginURL(request.getRequestURI());
String urlLinktext = "Login";
//Account account = null;

if (user != null){
    url = userService.createLogoutURL(request.getRequestURI());
    urlLinktext = "Logout";
//    account = (Account)DataService.apply().retrieve(Account.class, user.getUserId());
}

%>
<html>
 <head>
    <title>Ad Editor</title>
    <link rel="stylesheet" href="docs/styles.css" type="text/css">
 </head>
 <body onload="draw()">
    <header class="header">
        <div>MyApp</div>
        <div class="topContent">Please use this app</div>
        <div class="logInOut">
            <span id="email"><%=user.getEmail()%></span><br/>
            <a href="<%=url%>"><%=urlLinktext%></a>
        </div>
    </header>
    <div class="main">
        <div class="canvas">
            <canvas id="canvas" width="300" height="300"></canvas>
        </div>
        <div class="adInput">
            <h2>Ad Data</h2><br/>
            <label>Label: <input type="text" name="label"/></label><br/>
            <label>Title: <input type="text" name="title"/></label><br/>
            <label>Copy:  <textarea rows=2 cols=20 name="copy"></textarea></label><br/>
            <input type="button" name="update" id="saveAd" value="Save Ad"/>
        </div>
    </div>
    <script type="text/javascript" src="docs/jquery.js"></script>
    <script type="text/javascript" src="docs/draw.js"></script>
    <script type="text/javascript" src="docs/data.js"></script>
 </body>
</html>