/*
 *  Inherit from Heightmap
 *  spec.hMax : hMax
 *  spec.centre : centre
 */

var HeightmapSurface=(function() {
    return {
        instance: function(spec){
            var that=Heightmap.instance(spec);
            var _gl=spec.gl

            
            var colorTexture=Texture.instance({
                url: "images/textures/stones.jpg"
            });
            var normalsTexture=Texture.instance({
                url: "images/textures/stones_normal.jpg"
            });
            
            var grid=Grid.instance({
                x: spec.size,
                y: spec.size
            });

            grid.set_position(spec.centre);
            
            that.drawSurface=function() { //draw heightmap
                // _gl.enable(_gl.BLEND);

                Shaders.unset_defaultShader();
                Shaders.set_heightMapSurface_shaders();
                VUE.drawHeightMapSurface();

                Shaders.set_hMax_heightMapSurface(spec.hMax);                

                _gl.activeTexture(_gl.TEXTURE1);
                that.draw();
                _gl.activeTexture(_gl.TEXTURE2);
                normalsTexture.draw();
                _gl.activeTexture(_gl.TEXTURE0);
                colorTexture.draw();
                grid.drawAsHeightMapSurface();
                
                Shaders.unset_heightMapSurface_shaders();
                Shaders.set_defaultShader();
               //  _gl.disable(_gl.BLEND);
            }
            
            return that;
        }
    }
})();


