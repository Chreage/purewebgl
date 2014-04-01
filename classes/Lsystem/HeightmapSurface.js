/*
 *  Inherit from Heightmap
 *  spec.hMax : hMax
 *  spec.centre : centre
 *  
 *  spec.textureColorURL : url of the texture
 *  spec.textureNormalsURL
 *  
 *  instancied in Lsystem
 */

var HeightmapSurface=(function() {
    return {
        instance: function(spec){
            var that=Heightmap.instance(spec);
            var _gl=spec.gl; //we do not use automatically the global webgl context GL
                             //so as we can use another webgl context
            
            var colorTexture=Texture.instance({
                url: spec.textureColorURL || SETTINGS.Lsystems.textureColorURL
            });
            var normalsTexture=Texture.instance({
                url: spec.textureNormalsURL || SETTINGS.Lsystems.textureNormalsURL
            });
           
            var matrix=lib_matrix4.get_I4();
            lib_matrix_mv.set_position(matrix, spec.centre);
    
            that.drawSurface=function() { //draw heightmap
                //called by Lsystem draw method
                //heightMapSurface shader is already in use
                
                
                VUE.drawHeightMapSurface();

                Shaders.set_hMax_heightMapSurface(spec.hMax);                

                _gl.activeTexture(_gl.TEXTURE1);
                that.draw();
                _gl.activeTexture(_gl.TEXTURE2);
                normalsTexture.draw();
                _gl.activeTexture(_gl.TEXTURE0);
                colorTexture.draw();
                
                var distance=VUE.distanceToCamera(spec.centre);
                LodGrids.drawAsHeightMapSurface(matrix, distance);
                
                Shaders.unset_heightMapSurface_shaders();
            };
            
            return that;
        }
    };
})();
