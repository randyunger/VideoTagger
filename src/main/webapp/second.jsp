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
    <title>Ad Editor</title>
    <link rel="stylesheet" href="docs/styles.css" type="text/css">
 </head>
 <body onload="draw()">
    <div class="header">MyApp</div>
    <div class="topContent">Please use this app</div>
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
    <script type="text/javascript" src="docs/jquery.js"></script>
    <script type="text/javascript" src="docs/draw.js"></script>
    <script type="text/javascript" src="docs/data.js"></script>
 </body>
</html>