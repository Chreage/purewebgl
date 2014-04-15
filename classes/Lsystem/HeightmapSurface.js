/*
 *  Inherit from Heightmap
 *  spec.hMax : hMax
 *  spec.centre : centre
 *  
 *  spec.textureColorURL : url of the texture
 *  spec.textureNormalsURL
 *  
 *  
 *  instancied in Lsystem
 */

var HeightmapSurface=(function() {
    return {
        instance: function(spec){
            var that=Heightmap.instance(spec);
            var _gl=spec.gl; //we do not use automatically the global webgl context GL
                             //so as we can use another webgl context
            
            //material textures (color & bump)
            var _colorTexture=Texture.instance({
                url: spec.textureColorURL || SETTINGS.Lsystems.textureColorURL
            });
            var _normalsTexture=Texture.instance({
                url: spec.textureNormalsURL || SETTINGS.Lsystems.textureNormalsURL
            });
    
            //position matrix
            var _matrix=lib_matrix4.get_I4();
            lib_matrix_mv.set_position(_matrix, spec.centre);
    
    
            //river system
            
            var _rivers=RiverSystem.instance({
                heightMapTexture : that.get_normalTexture(),
                hMax : spec.hMax || SETTINGS.Lsystems.hMax,
                sizePx : SETTINGS.Lsystems.heightmapSizePx,
                width : spec.AABB.xMax-spec.AABB.xMin+2*spec.margin,
                height : spec.AABB.yMax-spec.AABB.yMin+2*spec.margin,
                rain: 0.0001,
                waterHMax: 0.7
            });
           
            
    
            that.drawSurface=function() { //draw heightmap
                //called by Lsystem draw method
                //heightMapSurface shader is already in use
                
                VUE.drawHeightMapSurface();

                Shaders.set_hMax_heightMapSurface(spec.hMax);                

                _gl.activeTexture(_gl.TEXTURE1);
                that.draw();
                _gl.activeTexture(_gl.TEXTURE2);
                _normalsTexture.draw();
                _gl.activeTexture(_gl.TEXTURE4);
                _rivers.draw();
                _gl.activeTexture(_gl.TEXTURE0);
                _colorTexture.draw();
                
                var distance=VUE.distanceToCamera(spec.centre);
                LodGrids.drawAsHeightMapSurface(_matrix, distance);
                
                Shaders.unset_heightMapSurface_shaders();
            };
            
            that.drawPhysics=function(dt){
                //apply LOD on water simulation (very expensive)
                if (VUE.distanceToCamera(spec.centre)<SETTINGS.Lsystems.riversRefreshDistance){
                    _rivers.compute(dt);
                }
            };
            return that;
        }
    };
})();
