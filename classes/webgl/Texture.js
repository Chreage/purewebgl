/*
 * spec.url: texture url
 * spec.minFilter
 */
var Texture=(function () {
    return {
        instance: function(spec) {
           var loaded=false,
               texture=GL.createTexture(),
               image=new Image();

           spec.minFilter=spec.minFilter ||  GL.NEAREST_MIPMAP_LINEAR;
           
           image.src=spec.url;
           var load=function() {
                    //GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
                    GL.bindTexture(GL.TEXTURE_2D, texture);
                    GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image);
                    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
                    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, spec.minFilter);
                    //GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
                    GL.generateMipmap(GL.TEXTURE_2D);
                    GL.bindTexture(GL.TEXTURE_2D, null);
                    loaded=true;
           }
           image.onload=function() { load(); }

            var that={
                   is_loaded: function() { return loaded; },
                   draw: function() {
                       if (!loaded) return false;
                       GL.bindTexture(GL.TEXTURE_2D, texture);
                       return true;
                   }
            };
            return that;
        }
    };
})();



