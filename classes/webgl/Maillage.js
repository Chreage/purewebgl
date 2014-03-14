/*
 * spec.vertices : tableau js des vertex
 * spec.indices : tableau js des indices
 */
var Maillage=(function () {
    return {
        instance: function(spec) {
            var vbo=VBO.instance({tableau_js: spec.vertices});
            var vbo_indices=VBO_indices.instance({tableau_js: spec.indices,  int32Indices: spec.int32Indices});

            return {
                drawAsHeightMapSurface: function() {
                    vbo.drawAsHeightMapSurface();
                    vbo_indices.draw();
                },
                
                draw: function() {
                    vbo.draw();
                    vbo_indices.draw();
                },

                drawVBO: function() {
                    vbo.draw();
                },

                drawVBOIndices: function()  {
                    vbo_indices.draw();
                },
                
                bindVBOIndices: function(){
                    vbo_indices.bind();
                },
                
                drawVBOIndices_opt: function()  {
                    vbo_indices.draw_Elements();
                }
            }
        }
    }
}());


