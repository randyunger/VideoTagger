<%--
  Created by IntelliJ IDEA.
  User: Randy
  Date: 5/5/11
  Time: 6:02 PM
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>
<%@ page import="com.google.appengine.api.users.User" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
UserService userService = UserServiceFactory.getUserService();
User user = userService.getCurrentUser();

String url = userService.createLoginURL(request.getRequestURI());
String urlLinktext = "Login";

if (user != null){
    url = userService.createLogoutURL(request.getRequestURI());
    urlLinktext = "Logout";
}

%>


<html>
<head><title>Welcome</title></head>
<body>
    <h1>Welcome!</h1>
    <div><a href="view.jsp">View</a></div>
    <div><a href="edit.jsp">Edit</a></div>
    <a href="<%=url%>"><%=urlLinktext%></a>
</body>
</html>