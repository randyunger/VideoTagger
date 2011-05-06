<%--
  Created by IntelliJ IDEA.
  User: Randy
  Date: 4/17/11
  Time: 4:39 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
 <head>
    <meta charset="utf-8" />
    <title>Video watcher</title>
 </head>
<body>
    <link rel="stylesheet" href="docs/styles.css" />
    <canvas id="canvas" width="300" height="300"></canvas>
    <%--<div>Video goes here</div>--%>
    <div>
        <video id="video" src="bbb.m4v" width="300" height="300" autoplay></video>
    <%--<video class="nativeEmbedPlayerPid" id="pid_vid1"--%>
    <%--src="bbb_trailer_iphone.m4v"--%>
    <%--style="width: 400px; height: 400px; z-index: 1; ">--%>
    <%--</video>--%>
    <%--<a href="bbb.m4v">clicky</a>--%>
    </div>
    <script type="text/javascript" src="docs/jquery.js"></script>
    <script type="text/javascript" src="docs/draw.js"></script>
    <script type="text/javascript" src="docs/data.js"></script>
</body>
</html>