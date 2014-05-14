/*
 * spec: tableau_js : tableau js des indices
 * spec.int32Indices : bool
 */
var VBO_indices=(function() {
    return {
       instance: function(spec) {
            if (!spec.int32Indices) spec.int32Indices=false;
            var vbo= GL.createBuffer ();
            GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, vbo);
            GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,
	  		   (spec.int32Indices)?new Uint32Array(spec.tableau_js):new Uint16Array(spec.tableau_js),
			  GL.STATIC_DRAW);
            var taille=spec.tableau_js.length;
            delete(spec.tableau_js);
            return {
                draw: function() {
                   GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, vbo);
                   GL.drawElements(GL.TRIANGLES, taille, (spec.int32Indices)?GL.UNSIGNED_INT:GL.UNSIGNED_SHORT, 0);
                },
                
                bind: function() {
                    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, vbo);
                },
                
                draw_Elements: function() {
                    GL.drawElements(GL.TRIANGLES, taille, GL.UNSIGNED_SHORT, 0);
                }
            }
       }
    }
})();


