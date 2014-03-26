/*
 * returns a canvas with gaussian law coefficients
 *
 */

var Gauss=(function() {
    var that={
        get_gaussCanvas: function(n){
            var cv=document.createElement("canvas");
            cv.width=n, cv.height=n;
            var ctx=cv.getContext("2d");

            var xCtr=(n-1)/2, yCtr=(n-1)/2;
            var imageData=ctx.createImageData(n,n);

            var x,y,i, val, xNorm, yNorm;
            var a=1/3; //ecart type

            for(x=0; x<n; x++){
                xNorm=2*(x-xCtr)/(n-1)

                for (y=0; y<n; y++){
                    yNorm=2*(y-yCtr)/(n-1);
                    i=4*(x+y*n);

                    val=Math.exp(-(xNorm*xNorm+yNorm*yNorm)/a);
                    imageData.data[i]=Math.round(val*255);
                    imageData.data[i+3]=255;
                }
            }

            ctx.putImageData(imageData,0,0);
            return cv;
        },

        get_gaussTexture: function(gl, n, floatTexture){
            var cv=that.get_gaussCanvas(n);
            var texture=gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,gl.RGBA, (floatTexture)?gl.FLOAT:gl.UNSIGNED_BYTE, cv );
            return texture;
        }

    }
    return that;

})();

