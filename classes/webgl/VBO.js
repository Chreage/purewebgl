/*
 * spec: tableau_js : tableau js des vertex
 */
var VBO=(function() {
    return {
       instance: function(spec) {
            var vbo= GL.createBuffer ();
            GL.bindBuffer(GL.ARRAY_BUFFER, vbo);
            GL.bufferData(GL.ARRAY_BUFFER,
	  		  new Float32Array(spec.tableau_js),
			  GL.STATIC_DRAW);
            return {
                draw: function() { //for default rendering (nodes)             
                   GL.bindBuffer(GL.ARRAY_BUFFER, vbo) ;
                   SHADERS.set_vertexPointers();
                },
                
                draw_heightMap: function() { //draw with heightmap creation shaders
                    GL.bindBuffer(GL.ARRAY_BUFFER, vbo) ;
                    SHADERS.set_vertexPointers_heightMap();
                },
                
                drawAsHeightMapSurface: function() {  //draw with heightmap surface shaders
                    GL.bindBuffer(GL.ARRAY_BUFFER, vbo) ;
                    SHADERS.set_vertexPointers_heightMapSurface();
                }
            }
       }
    }
})();

