var colors = new Array();
function getColor(group){
    if(!colors[group]) {
        colors[group] = {
             r:Math.random()*255
            ,g:Math.random()*255
            ,b:Math.random()*255
        }
    }
    return colors[group];
}

function edge(input, context) {
//    debugger;
    var w = input.width, h = input.height;
    var output = context.createImageData(w, h);
    var inputData = input.data;
    var outputData = output.data;
    var bytesPerRow = w * 4;
    var pixel = bytesPerRow + 4; // Start at (1,1)
    var hm1 = h - 1;
    var wm1 = w - 1;

    var hitCounter = 0;
    var hitContext = document.getElementById("hits").getContext("2d");
    var hitData = hitContext.createImageData(w,h);

    function showHits(){
        function getBiggestGroups(){
            groupSizes.sort(function(a,b){
                return b.size-a.size;
            });
            return groupSizes.slice(0,1);
        }

        function getPixels(groupNum){
            var gStr = groups[groupNum];
            return gStr.split(".")
        }

        debugger;
//        var gr = getBiggestGroups();
//        for(var i=0;i<gr.length;i++){   //get pixels in each group
//            var pix = getPixels(gr[i].group);
////            var rr = Math.random()*255;
////            var gg = Math.random()*255;
////            var bb = Math.random()*255;
//            for(var j=0;j<pix.length;j+=4){
//                hitData.data[pix[j]]=getColor(gr[i].group).r;
//                hitData.data[pix[j]+1]=getColor(gr[i].group).g;
//                hitData.data[pix[j]+2]=getColor(gr[i].group).b;
//                hitData.data[pix[j]+3]=127;
//            }
//        }

        for(var i=0;i<hitData.data.length;i+=4){
            hitData.data[i]=255;
            hitData.data[i+1]=255;
            hitData.data[i+2]=255;
            hitData.data[i+3]=127;
        }

        hitContext.putImageData(hitData, 0,0);
    }

    var hits = new Array();
    var groups = new Array();
    var groupSizes = new Array();
//    var hitData = new Array();
//    for(var i=0;i<inputData.length;i++){
//        hitData[i]=0;
//    }

    for (var y = 1; y < hm1; ++y) {
        // Prepare initial cached values for current row

        var centerRow = pixel - 4;
        var priorRow = centerRow - bytesPerRow;
        var nextRow = centerRow + bytesPerRow;

        var r1 = inputData[priorRow]   + inputData[centerRow]   + inputData[nextRow];
        var g1 = inputData[++priorRow] + inputData[++centerRow] + inputData[++nextRow];
        var b1 = inputData[++priorRow] + inputData[++centerRow] + inputData[++nextRow];

        var rp = inputData[priorRow += 2];
        var gp = inputData[++priorRow];
        var bp = inputData[++priorRow];

        var rc = inputData[centerRow += 2];
        var gc = inputData[++centerRow];
        var bc = inputData[++centerRow];

        var rn = inputData[nextRow += 2];
        var gn = inputData[++nextRow];
        var bn = inputData[++nextRow];

        var r2 = rp + rc + rn;
        var g2 = gp + gc + gn;
        var b2 = bp + bc + bn;
        
        // Main convolution loop
        for (var x = 1; x < wm1; ++x) {
//debugger;
            centerRow = pixel + 4;
            priorRow = centerRow - bytesPerRow;
            nextRow = centerRow + bytesPerRow;

            var ground = 127;//127

            var r = ground + (rc << 3) - r1 - rp - rn;
            var g = ground + (gc << 3) - g1 - gp - gn;
            var b = ground + (bc << 3) - b1 - bp - bn;

            r1 = r2;
            g1 = g2;
            b1 = b2;

            rp = inputData[  priorRow];
            gp = inputData[++priorRow];
            bp = inputData[++priorRow];

            rc = inputData[  centerRow];
            gc = inputData[++centerRow];
            bc = inputData[++centerRow];

            rn = inputData[  nextRow];
            gn = inputData[++nextRow];
            bn = inputData[++nextRow];

            r2 = rp + rc + rn;
            g2 = gp + gc + gn;
            b2 = bp + bc + bn;

            //todo scalable scan width
            //todo scalable threshold
            var thresh = 250;

            var edge = 0;
            if(r - r2 > thresh) edge = 255;
            if(g - g2 > thresh) edge = 255;
            if(b - b2 > thresh) edge = 255;

            //track hits
            if(edge==255) {
                var group = hitCounter++;
                hits[pixel] = group;
                //scan backwards for adj hits
                var prevAdjPix = findPrevAdjPix(pixel, w);

                for(var i=0;i<prevAdjPix.length;i++){
                    var prevPix=prevAdjPix[i];
                    //if found, current val = min (adj val, current val)
                    if(outputData[prevPix] == 255){    //if adj to other hit
                        group = Math.min(hits[pixel], hits[prevPix]);
                        hits[prevPix] = group;
                        hits[pixel] = group;
                    }
                }
                                   //track group size
                if(!groups[group]) groups[group] = pixel;         //1;
                else groups[group] = groups[group]+"."+pixel;                   //groups[group]+1;
//                debugger;
                if(!groupSizes[group]) groupSizes[group] = {group:group, size:1};
                else groupSizes[group] = {group:group, size:groupSizes[group].size+1};
                //inc group counter
            }

            outputData[pixel] = edge;
            outputData[++pixel] = edge;
            outputData[++pixel] = edge;
            outputData[++pixel] = 255; // alpha

//            outputData[pixel] = r - r2 > thresh ? 255: 0;
//            outputData[++pixel] = g - g2 > thresh ? 255: 0;
//            outputData[++pixel] = b - b2 > thresh ? 255: 0;
//            outputData[++pixel] = 255; // alpha
            ++pixel;
        }
        pixel += 8;
    }


    showHits(hitData);

    return output;
}
    /*
    var base = -1;
    for (var y = 0; y < h; ++y) {
        outputData[++base] = inputData[base];
        outputData[++base] = inputData[base];
        outputData[++base] = inputData[base];
        outputData[++base] = inputData[base];
        base += w * 4 - 8;
        outputData[++base] = inputData[base];
        outputData[++base] = inputData[base];
        outputData[++base] = inputData[base];
        outputData[++base] = inputData[base];
    }
    var top = -1;
    var bottom = -1 + w * (h - 1) * 4;
    for (var x = 0; x < w; x++) {
        outputData[++top] = inputData[top];
        outputData[++top] = inputData[top];
        outputData[++top] = inputData[top];
        outputData[++top] = inputData[top];
        outputData[++bottom] = inputData[bottom];
        outputData[++bottom] = inputData[bottom];
        outputData[++bottom] = inputData[bottom];
        outputData[++bottom] = inputData[bottom];
    }*/                                     //0123|4567|8901|2345             0|1|2|3
//    return output;                          //rgba|rgba|rgba|rgba           0|
//}                                           //rgba|rgba|rgba|rgba           1|
                                            //rgba|rgba|rgba|rgba           2|
                                            //rgba|rgba|rgba|rgba           3|
//function findPrevAdjPix(pixel, width){
//    var response = new Array();
//    return response;
//}



//    if(pixel - width*4 - 4 > 0) {
//        response[response.length] = pixel - width*4 - 4;
//    }
//    if(pixel - 4 > 0) response[response.length] = pixel - 4;
function findPrevAdjPix(pixel, width){
    var left = pixel - 4;
    var up = pixel - width*4;
    var upLeft = up - 4;
    var upRight = up + 4;
    return Array (upLeft, up, upRight, left);
}

//0123|4567|8901|2345
//rgba|rgba|rgba|rgba
//rgba|rgba|rgba|rgba
//rgba|rgba|rgba|rgba
//rgba|rgba|rgba|rgba