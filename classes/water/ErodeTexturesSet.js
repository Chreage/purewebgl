/*
 * Set of random erosion textures which can be applied to an heightmap
 * spec.texturesURL: array of erosion textures URL
 * spec.onload : function to launch when texture set is ready
 * 
 * It uses erode shaders
 * 
 * instancied in Contexte.js
 * Used in Heightmap.js
 * 
 * 
 */

var ErodeTexturesSet=(function() {
    var _quadMesh, _initialized=false;
    var _fbo;
    var _debug=SETTINGS.debug.ErodeTexture;
    
    return {
        init: function() {
            _initialized=true;
            _quadMesh=Maillage.instance({
                vertices: [
                    -0.5,-0.5,
                    -0.5,0.5,
                    0.5,0.5,
                    0.5,-0.5
                ],
                indices: [
                    0,1,2, 0,2,3
                ]
            });
            _fbo=GL.createFramebuffer();
        },
        
        instance: function(spec){
            if (!_initialized) {
                console.log('Error : ErodeTexturesSet must be initialized before. Abort');
                return;
            }
            
            var _nTextures=spec.texturesURL.length,
                _textures=[],
                _nLoaded=0;
        
            spec.texturesURL.map(function(textureURL){
               _textures.push(Texture.instance({
                   url: textureURL,
                   onload: function() {
                       _nLoaded++;
                       if (_nLoaded===_nTextures && spec.onload) spec.onload();
                   }
                }));
            });
            
            return {
                //apply erosion texture to heightMap
                erode: function(heightmap, sizeOutputPx, emboss) {
                    
                    //create output texture and link it to the rendering fbo
                    var outputTexture=GL.createTexture();
                    GL.bindTexture(GL.TEXTURE_2D, outputTexture);
                    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
                    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
                    GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA,sizeOutputPx,sizeOutputPx, 0, GL.RGBA, GL.FLOAT, null);
                    GL.bindTexture(GL.TEXTURE_2D, null);

                    GL.bindFramebuffer(GL.FRAMEBUFFER, _fbo);
                    GL.framebufferTexture2D(GL.FRAMEBUFFER, GL.COLOR_ATTACHMENT0, GL.TEXTURE_2D, outputTexture, 0);

                    if (_debug)  {
                        GL.bindFramebuffer(GL.FRAMEBUFFER, null);
                        SCENE.stop();
                    }
                    
                    //choose a random texture index :
                    var i=Math.floor(Math.random()*_nTextures);
                  
                    //draw output texture
                    Shaders.set_erode_shaders((emboss)?1:0);
                    GL.clearColor(0,0,0,0);
                    GL.clear(GL.COLOR_BUFFER_BIT);
                    
                    GL.activeTexture(GL.TEXTURE1);
                    _textures[i].draw(); //zou
                    GL.activeTexture(GL.TEXTURE0);
                    GL.bindTexture(GL.TEXTURE_2D, heightmap);
                    _quadMesh.drawErode();
                    
                    
                    Shaders.unset_erode_shaders();
                    return (_debug)?false:outputTexture;
                }
            };
        }
    };
})();