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

    //HEIGHTMAP RENDERING VARS
    var shader_vertex_source_heightMap="$SHADER_VERTEX_HEIGHTMAP$",
        shader_fragment_source_heightMap="$SHADER_FRAGMENT_HEIGHTMAP$";
        
    var shader_program_heightMap;
    
    var scale_heightMap, centre_heightMap,
        position_heightMap,
        sampler_heightMap,
        alpha_heightMap;

    
    //HEIGHTMAP SURFACE RENDERING VARS
    var shader_vertex_source_heightMapSurface="$SHADER_VERTEX_HEIGHTMAPSURFACE$",
        shader_fragment_source_heightMapSurface="$SHADER_FRAGMENT_HEIGHTMAPSURFACE$";
        
    var shader_program_heightMapSurface;
    
    var scale_heightMapSurface, centre_heightMapSurface,
        position_heightMapSurface,
        sampler_heightMapSurface,
        samplerHeightMap_heightMapSurface,
        hMax_heightMapSurface,
        matrice_objet_heightMapSurface,
        matrice_vue_heightMapSurface,
        matrice_projection_heightMapSurface;
    
    //DEFAULT RENDERING VARS
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
            //HEIGHTMAPSURFACE RENDERING
            shader_program_heightMapSurface=get_shaderProgram(shader_vertex_source_heightMapSurface, shader_fragment_source_heightMapSurface);
            matrice_projection_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "matrice_projection");
            matrice_vue_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "matrice_vue");
            matrice_objet_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "matrice_objet");
	   
            scale_heightMapSurface=GL.getUniformLocation(shader_program_heightMapSurface, "scale");
            centre_heightMapSurface=GL.getUniformLocation(shader_program_heightMapSurface, "centre");
            sampler_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "sampler");
            samplerHeightMap_heightMapSurface =  GL.getUniformLocation(shader_program_heightMapSurface, "samplerHeightMap");
	    hMax_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "hMax");
	    
            position_heightMapSurface = GL.getAttribLocation(shader_program_heightMapSurface, "position");
            
            
            //HEIGHTMAP RENDERING
            shader_program_heightMap=get_shaderProgram(shader_vertex_source_heightMap, shader_fragment_source_heightMap);
            scale_heightMap=GL.getUniformLocation(shader_program_heightMap, "scale");
            centre_heightMap=GL.getUniformLocation(shader_program_heightMap, "centre");
            sampler_heightMap = GL.getUniformLocation(shader_program_heightMap, "sampler");
	    alpha_heightMap = GL.getUniformLocation(shader_program_heightMap, "alpha");
	    
            position_heightMap = GL.getAttribLocation(shader_program_heightMap, "position");
            
            
            
            //DEFAULT RENDERING
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
        },
        set_defaultShader: function() {
            GL.useProgram(shader_program);
            GL.enableVertexAttribArray(position);
            GL.enableVertexAttribArray(UV);
        },
        unset_defaultShader: function() {
            GL.disableVertexAttribArray(position);
            GL.disableVertexAttribArray(UV);
        },
        
        
        
        //HEIGHTMAP RENDERING :
        set_heightMap_shaders: function() {
            GL.useProgram(shader_program_heightMap);
            GL.enableVertexAttribArray(position_heightMap);
        },
        unset_heightMap_shaders: function() {
            GL.disableVertexAttribArray(position_heightMap);
        },
        set_node_heightMap: function(scale, position, alpha){
            GL.uniform2fv(scale_heightMap, scale);
            GL.uniform2fv(centre_heightMap, position);
            GL.uniform1f(alpha_heightMap, alpha);
        },
        set_vertexPointers_heightMap: function() {
            GL.vertexAttribPointer(position_heightMap, 2, GL.FLOAT, false,8,0) ;
        },
        
        
        
        //HEIGHTMAPSURFACE RENDERING
        set_heightMapSurface_shaders: function() {
            GL.useProgram(shader_program_heightMapSurface);
            GL.enableVertexAttribArray(position_heightMapSurface);
            GL.uniform1i(sampler_heightMapSurface, 0);
            GL.uniform1i(samplerHeightMap_heightMapSurface, 1);
        },
        unset_heightMapSurface_shaders: function() {
            GL.disableVertexAttribArray(position_heightMapSurface);
        },
        set_vertexPointers_heightMapSurface: function() {
            GL.vertexAttribPointer(position_heightMapSurface, 2, GL.FLOAT, false,8,0) ;
        },
        set_matriceObjet_heightMapSurface: function(matrice) {
            GL.uniformMatrix4fv(matrice_objet_heightMapSurface, false, matrice);
        },
        set_matriceProjection_heightMapSurface: function(matrice) {
            GL.uniformMatrix4fv(matrice_projection_heightMapSurface, false, matrice);
        },
        set_matriceVue_heightMapSurface: function(matrice) {
            GL.uniformMatrix4fv(matrice_vue_heightMapSurface, false, matrice);
        },
        set_hMax_heightMapSurface: function(hMax){
            GL.uniform1f(hMax_heightMapSurface, hMax);
        },
        set_dim_heightMapSurface: function(scale, centre){
            GL.uniform2fv(scale_heightMapSurface, scale);
            GL.uniform2fv(centre_heightMapSurface,centre);
        }
        
        
    };
    SHADERS=that;
    return that;

})();


