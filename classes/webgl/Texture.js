/*
 * spec.url: texture url
 * spec.minFilter. default : GL.NEAREST_MIPMAP_LINEAR
 */
var Texture=(function () {
    var defaultTextureLoaded, defaultTexture;
    return {
        //this function must be called after the creation of webgl context GL
        init: function() { 
            //build default texture
            
            var defaultTextureImage=new Image();
            defaultTextureImage.onload=function(event){
                GL.bindTexture(GL.TEXTURE_2D, defaultTexture);
                GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, defaultTextureImage);
                GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
                GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR_MIPMAP_LINEAR);
                GL.generateMipmap(GL.TEXTURE_2D);
                GL.bindTexture(GL.TEXTURE_2D, null);
                defaultTextureLoaded=true;
            }
            
            defaultTextureImage.src=SETTINGS.Lsystems.defaultTextureImageURL;
        },
        
        get_default: function() {
            return defaultTexture;
        },
        
        instance: function(spec) {
           var loaded=false,
               texture=GL.createTexture(),
               image=new Image();

           spec.minFilter=spec.minFilter ||  GL.NEAREST_MIPMAP_LINEAR;
           
           image.src=spec.url;
           var load=function() {
                    GL.bindTexture(GL.TEXTURE_2D, texture);
                    GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image);
                    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
                    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, spec.minFilter);
                    //GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
                    GL.generateMipmap(GL.TEXTURE_2D);
                    GL.bindTexture(GL.TEXTURE_2D, null);
                    loaded=true;
           };
           image.onload=function() { load(); };

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



