<html>
 <head>
  <%--<script type="application/javascript">--%>
<%--function draw() {--%>
 <%--var canvas = document.getElementById("canvas");--%>
 <%--var ctx = canvas.getContext("2d");--%>
 <%--ctx.fillStyle = "rgb(200,0,0)";--%>
 <%--ctx.fillRect (10, 10, 55, 50);--%>
 <%--ctx.fillStyle = "rgba(0, 0, 200, 0.5)";--%>
 <%--ctx.fillRect (30, 30, 55, 50);--%>
<%--}--%>
  <%--</script>--%>
    <script type="text/javascript" src="docs/jquery.js"></script>
    <link rel="stylesheet" href="docs/styles.css" type="text/css">
 </head>
 <body onload="draw()">
    <div class="header">MyApp</div>
    <div class="topContent">Please use this app</div>
    <div class="canvas">
        <canvas id="canvas" width="300" height="300"></canvas>
    </div>
    <div class="input">
        <input type="text" name="adCopy"/>
        <input type="button" name="update" id="update" value="do it"/>
    </div>
 </body>
</html>