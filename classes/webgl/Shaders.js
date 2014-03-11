/*
 * spec: empty
 */
var SHADERS;
var Shaders=(function (){

    var get_shader=function(source, type, strtype) {
            var shader = GL.createShader(type);
            GL.shaderSource(shader, source);
            GL.compileShader(shader);
            if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
                alert(strtype+" : "+GL.getShaderInfoLog(shader));
                return false;
            }
            return shader;
    };

    var get_shaderProgram=function(vertex_source, fragment_source){
            shader_vertex=get_shader(vertex_source, GL.VERTEX_SHADER, "VERTEX_SHADER");
            shader_fragment=get_shader(fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT_SHADER");
            shader_program=GL.createProgram();

            GL.attachShader(shader_program, shader_vertex);
            GL.attachShader(shader_program, shader_fragment);

            GL.linkProgram(shader_program);

            return shader_program;
    }

    var shader_vertex_source="$SHADER_VERTEX$",
        shader_fragment_source="$SHADER_FRAGMENT$";

    var shader_program;

    var matrice_vue,
        matrice_projection,
        matrice_objet,
        scale, centre,hightLight,
        position,
        UV,
        sampler;

    var that={
        instance: function(spec) {           
            shader_program=get_shaderProgram(shader_vertex_source, shader_fragment_source);

            matrice_projection = GL.getUniformLocation(shader_program, "matrice_projection");
            matrice_vue = GL.getUniformLocation(shader_program, "matrice_vue");
            matrice_objet = GL.getUniformLocation(shader_program, "matrice_objet");
	    sampler = GL.getUniformLocation(shader_program, "sampler");
	    
            scale=GL.getUniformLocation(shader_program, "scale");
            centre=GL.getUniformLocation(shader_program, "centre");
            hightLight=GL.getUniformLocation(shader_program, "hightLight");

            position = GL.getAttribLocation(shader_program, "position");
            UV = GL.getAttribLocation(shader_program, "UV");
	    
            GL.enableVertexAttribArray(position);
            GL.enableVertexAttribArray(UV);
	    
            GL.useProgram(shader_program);            
        },

        set_matriceProjection: function(matrice) {
            GL.uniformMatrix4fv(matrice_projection, false, matrice);
        },

        set_matriceVue: function(matrice) {
            GL.uniformMatrix4fv(matrice_vue, false, matrice);
        },

        set_matriceObjet: function(matrice) {
            GL.uniformMatrix4fv(matrice_objet, false, matrice);
        },

        set_vertexPointers: function() {
            GL.vertexAttribPointer(position, 3, GL.FLOAT, false,20,0) ;
            GL.vertexAttribPointer(UV, 2, GL.FLOAT, false,20,12) ;
        },

        set_scale: function(s){
            GL.uniform1f(scale, s);
        },

        set_position: function(pos){
            GL.uniform3fv(centre, pos)
        },

        set_hightLight: function(hl){
            GL.uniform1f(hightLight, hl);
        }

    };
    SHADERS=that;
    return that;

})();


