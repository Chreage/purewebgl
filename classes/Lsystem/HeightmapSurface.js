/*
 *  Inherit from Heightmap
 * 
 * 
 */

var HeightmapSurface=(function() {
    return {
        instance: function(spec){
            var that=Heightmap.instance(spec);
            var _gl=spec.gl
            
            var colorTexture=Texture.instance({
                url: "images/tux.jpg"
            });
            
            var grid=Grid.instance({
                x: spec.size,
                y: spec.size
            });
            
            that.drawSurface=function() {
                Shaders.unset_defaultShader();
                Shaders.set_heightMapSurface_shaders();
                VUE.drawHeightMapSurface();
                
                Shaders.set_hMax_heightMapSurface(4);
                
                _gl.activeTexture(_gl.TEXTURE1);
                that.draw();
                _gl.activeTexture(_gl.TEXTURE0);
                colorTexture.draw();
                grid.drawAsHeightMapSurface();
                
                Shaders.unset_heightMapSurface_shaders();
                Shaders.set_defaultShader();
            }
            
            return that;
        }
    }
})();


