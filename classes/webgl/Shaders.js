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

    var get_shaderProgram=function(vertex_source, fragment_source, strtype){
            var shader_vertex=get_shader(vertex_source, GL.VERTEX_SHADER, strtype+" VERTEX_SHADER");
            var shader_fragment=get_shader(fragment_source, GL.FRAGMENT_SHADER, strtype+" FRAGMENT_SHADER");
            shader_program=GL.createProgram();

            GL.attachShader(shader_program, shader_vertex);
            GL.attachShader(shader_program, shader_fragment);

            GL.linkProgram(shader_program);

            return shader_program;
    }

    //WATER SHADERS
    var shader_vertex_source_water="$SHADER_VERTEX_WATER$",
        shader_fragment_source_water="$SHADER_FRAGMENT_WATER$",
        shader_program_water;

    var matrice_vue_water,
        matrice_projection_water,
        matrice_objet_water,
        position_water,
        samplerCiel_water,
        samplerFond_water,
        camera_water,
        amplitudes_water,
        ks_water,
        ws_water,
        indice_refraction_water,
        profondeur_water,
        couleur_eau_water,
        visibilite_water,
        lumiere_water,
        time_water,
        fogDmin_water,
        fogDmax_water,
        fogColor_water;


    //TEXTURE READ SHADERS
    var shader_vertex_source_textureRead="$SHADER_VERTEX_TEXTUREREAD$",
        shader_fragment_source_textureRead="$SHADER_FRAGMENT_TEXTUREREAD$";

    var shader_program_textureRead;

    var position_textureRead,
        sampler_textureRead;



    //HEIGHTMAP TO NORMAL MAP VARS
     var shader_vertex_source_normals="$SHADER_VERTEX_NORMALS$",
        shader_fragment_source_normals="$SHADER_FRAGMENT_NORMALS$";

    var shader_program_normals;

    var position_normals,
        sampler_normals,
        wh_normals,
        H_normals,
        size_normals;


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
        scaleUV_heightMapSurface,
        position_heightMapSurface,
        sampler_heightMapSurface,
        sampler_islandHeightMap,
        samplerNormals_heightMapSurface,
        samplerHeightMap_heightMapSurface,
        hMax_heightMapSurface,
        hMaxIsland_heightMapSurface,
        scaleIsland_heightMapSurface,
        offsetIsland_heightMapSurface,
        matrice_objet_heightMapSurface,
        matrice_vue_heightMapSurface,
        matrice_projection_heightMapSurface,
        fogDmin_heightMapSurface,
        fogDmax_heightMapSurface,
        fogColor_heightMapSurface,
        lightDir_heightMapSurface;
    
    //ISLAND HEIGHTMAP SURFACE RENDERING VARS
    var shader_vertex_source_islandHeightMapSurface="$SHADER_VERTEX_ISLANDHEIGHTMAPSURFACE$",
        shader_fragment_source_islandHeightMapSurface="$SHADER_FRAGMENT_ISLANDHEIGHTMAPSURFACE$";
        
    var shader_program_islandHeightMapSurface;
    
    var scale_islandHeightMapSurface, centre_islandHeightMapSurface,
        scaleUV_islandHeightMapSurface,
        position_islandHeightMapSurface,
        sampler_islandHeightMapSurface,
        samplerNormals_islandHeightMapSurface,
        samplerHeightMap_islandHeightMapSurface,
        hMax_islandHeightMapSurface,
        matrice_objet_islandHeightMapSurface,
        matrice_vue_islandHeightMapSurface,
        matrice_projection_islandHeightMapSurface,
        fogDmin_islandHeightMapSurface,
        fogDmax_islandHeightMapSurface,
        fogColor_islandHeightMapSurface,
        lightDir_islandHeightMapSurface;
        
    
    //GLASS RENDERING VARS
    var shader_vertex_source="$SHADER_VERTEX$",
        shader_fragment_source="$SHADER_FRAGMENT$";

    var shader_program;

    var matrice_vue,
        matrice_projection,
        matrice_objet,
        scale, centre,hightLight,
        position,
        camera,
        lightDir,
        sampler,
        alpha;



    var that={
        instance: function(spec) {
            //WATER SHADERS
            shader_program_water=get_shaderProgram(shader_vertex_source_water, shader_fragment_source_water, "WATER");
            matrice_projection_water = GL.getUniformLocation(shader_program_water, "matrice_projection");
            matrice_vue_water = GL.getUniformLocation(shader_program_water, "matrice_vue");
            matrice_objet_water = GL.getUniformLocation(shader_program_water, "matrice_objet");
            camera_water = GL.getUniformLocation(shader_program_water, "camera");
            samplerCiel_water = GL.getUniformLocation(shader_program_water, "samplerCiel");
            samplerFond_water = GL.getUniformLocation(shader_program_water, "samplerFond");
            amplitudes_water=GL.getUniformLocation(shader_program_water, "As");
            ks_water=GL.getUniformLocation(shader_program_water, "ks");
            ws_water=GL.getUniformLocation(shader_program_water, "ws");
            indice_refraction_water=GL.getUniformLocation(shader_program_water, "i");
            profondeur_water=GL.getUniformLocation(shader_program_water, "H");
            couleur_eau_water=GL.getUniformLocation(shader_program_water, "couleur_eau");
            visibilite_water=GL.getUniformLocation(shader_program_water, "visibilite");
            lumiere_water=GL.getUniformLocation(shader_program_water, "lumiere");
            time_water=GL.getUniformLocation(shader_program_water, "t");
            fogDmin_water = GL.getUniformLocation(shader_program_water, "fogDmin");
            fogDmax_water = GL.getUniformLocation(shader_program_water, "fogDmax");
            fogColor_water = GL.getUniformLocation(shader_program_water, "fogColor");
        
            position_water = GL.getAttribLocation(shader_program_water, "position");
            
            

            //TEXTURE READ SHADERS
            shader_program_textureRead=get_shaderProgram(shader_vertex_source_textureRead, shader_fragment_source_textureRead, "TEXTURE READ");
            sampler_textureRead = GL.getUniformLocation(shader_program_textureRead, "sampler");
            position_textureRead = GL.getAttribLocation(shader_program_textureRead, "position");


            //HEIGHTMAP TO NORMALS MAP RENDERING
            shader_program_normals=get_shaderProgram(shader_vertex_source_normals, shader_fragment_source_normals, "NORMALS");
            sampler_normals = GL.getUniformLocation(shader_program_normals, "sampler");
            wh_normals = GL.getUniformLocation(shader_program_normals, "wh");
            H_normals = GL.getUniformLocation(shader_program_normals, "H");
            size_normals = GL.getUniformLocation(shader_program_normals, "size");
            position_normals = GL.getAttribLocation(shader_program_normals, "position");


            //HEIGHTMAPSURFACE RENDERING
            shader_program_heightMapSurface=get_shaderProgram(shader_vertex_source_heightMapSurface, shader_fragment_source_heightMapSurface, "HEIGHTMAP SURFACE");
            matrice_projection_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "matrice_projection");
            matrice_vue_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "matrice_vue");
            matrice_objet_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "matrice_objet");

            scaleUV_heightMapSurface=GL.getUniformLocation(shader_program_heightMapSurface, "scaleUV");
            scale_heightMapSurface=GL.getUniformLocation(shader_program_heightMapSurface, "scale");
            centre_heightMapSurface=GL.getUniformLocation(shader_program_heightMapSurface, "centre");
            sampler_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "sampler");
            sampler_islandHeightMap = GL.getUniformLocation(shader_program_heightMapSurface, "samplerIsland");
            samplerNormals_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "samplerNormals");
            samplerHeightMap_heightMapSurface =  GL.getUniformLocation(shader_program_heightMapSurface, "samplerHeightMap");
	    hMax_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "hMax");
	    hMaxIsland_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "hMaxIsland");
            offsetIsland_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "offsetIsland");
            scaleIsland_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "scaleIsland");
            lightDir_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "lightDir");
            fogDmin_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "fogDmin");
            fogDmax_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "fogDmax");
            fogColor_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "fogColor");
        
            position_heightMapSurface = GL.getAttribLocation(shader_program_heightMapSurface, "position");
            
            //ISLAND HEIGHTMAPSURFACE RENDERING
            shader_program_islandHeightMapSurface=get_shaderProgram(shader_vertex_source_islandHeightMapSurface, shader_fragment_source_islandHeightMapSurface, "HEIGHTMAP SURFACE");
            matrice_projection_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "matrice_projection");
            matrice_vue_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "matrice_vue");
            matrice_objet_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "matrice_objet");

            scaleUV_islandHeightMapSurface=GL.getUniformLocation(shader_program_islandHeightMapSurface, "scaleUV");
            scale_islandHeightMapSurface=GL.getUniformLocation(shader_program_islandHeightMapSurface, "scale");
            centre_islandHeightMapSurface=GL.getUniformLocation(shader_program_islandHeightMapSurface, "centre");
            sampler_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "sampler");
            samplerNormals_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "samplerNormals");
            samplerHeightMap_islandHeightMapSurface =  GL.getUniformLocation(shader_program_islandHeightMapSurface, "samplerHeightMap");
	    hMax_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "hMax");
	    lightDir_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "lightDir");
            fogDmin_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "fogDmin");
            fogDmax_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "fogDmax");
            fogColor_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "fogColor");
            
            
            position_islandHeightMapSurface = GL.getAttribLocation(shader_program_islandHeightMapSurface, "position");
            
            
            //HEIGHTMAP RENDERING
            shader_program_heightMap=get_shaderProgram(shader_vertex_source_heightMap, shader_fragment_source_heightMap, "HEIGHTMAP");
            scale_heightMap=GL.getUniformLocation(shader_program_heightMap, "scale");
            centre_heightMap=GL.getUniformLocation(shader_program_heightMap, "centre");
            sampler_heightMap = GL.getUniformLocation(shader_program_heightMap, "sampler");
	    alpha_heightMap = GL.getUniformLocation(shader_program_heightMap, "alpha");
	    
            position_heightMap = GL.getAttribLocation(shader_program_heightMap, "position");
            
            
            
            //DEFAULT RENDERING
            shader_program=get_shaderProgram(shader_vertex_source, shader_fragment_source, "DEFAULT");

            matrice_projection = GL.getUniformLocation(shader_program, "matrice_projection");
            matrice_vue = GL.getUniformLocation(shader_program, "matrice_vue");
            matrice_objet = GL.getUniformLocation(shader_program, "matrice_objet");
	    sampler = GL.getUniformLocation(shader_program, "sampler");
            camera = GL.getUniformLocation(shader_program, "camera");
            
            scale=GL.getUniformLocation(shader_program, "scale");
            centre=GL.getUniformLocation(shader_program, "centre");
            hightLight=GL.getUniformLocation(shader_program, "hightLight");
            alpha=GL.getUniformLocation(shader_program, "alpha");
            lightDir=GL.getUniformLocation(shader_program, "lightDir");

            position = GL.getAttribLocation(shader_program, "position");
        },

        set_matriceProjection: function(matrice) {
            GL.uniformMatrix4fv(matrice_projection, false, matrice);
        },
        set_vue: function(matrice, camPos) {
            GL.uniform3fv(camera, camPos);
            GL.uniformMatrix4fv(matrice_vue, false, matrice);
        },
        set_matriceObjet: function(matrice) {
            GL.uniformMatrix4fv(matrice_objet, false, matrice);
        },
        set_vertexPointers: function() {
            GL.vertexAttribPointer(position, 3, GL.FLOAT, false,12,0);
        },
        set_scale: function(s){
            GL.uniform1f(scale, s);
        },
        set_position: function(pos){
            GL.uniform3fv(centre, pos)
        },
        set_alpha: function(a){
            GL.uniform1f(alpha, a);
        },
        set_hightLight: function(hl){
            GL.uniform1f(hightLight, hl);
        },
        set_defaultShader: function() {
            GL.useProgram(shader_program);
            GL.enableVertexAttribArray(position);
            GL.uniform1i(sampler, 0);
            GL.uniform3fv(lightDir, SETTINGS.light.direction);
        },
        unset_defaultShader: function() {
            GL.disableVertexAttribArray(position);
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
            GL.uniform1i(sampler_heightMapSurface, 0),
            GL.uniform1i(samplerHeightMap_heightMapSurface, 1),
            GL.uniform1i(samplerNormals_heightMapSurface, 2),
            GL.uniform1i(sampler_islandHeightMap, 3);
            GL.uniform3fv(lightDir_heightMapSurface, SETTINGS.light.direction);
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
        },
        set_scaleUV_heightMapSurface: function(scaleU, scaleV){
            GL.uniform2f(scaleUV_heightMapSurface, scaleU, scaleV);
        },
        set_island_heightMapSurface: function(hMax, scale, offset){
            GL.uniform1f(hMaxIsland_heightMapSurface, hMax);
            GL.uniform2fv(scaleIsland_heightMapSurface, scale);
            GL.uniform2fv(offsetIsland_heightMapSurface, offset);
        },
        set_fog_heightMapSurface : function(dMin, dMax, color){
            GL.uniform1f(fogDmin_heightMapSurface, dMin),
            GL.uniform1f(fogDmax_heightMapSurface, dMax),
            GL.uniform3fv(fogColor_heightMapSurface, color);
        },


        //ISLAND HEIGHTMAPSURFACE RENDERING
        set_islandHeightMapSurface_shaders: function() {
            GL.useProgram(shader_program_islandHeightMapSurface);
            GL.enableVertexAttribArray(position_islandHeightMapSurface);
            GL.uniform1i(sampler_islandHeightMapSurface, 0);
            GL.uniform1i(samplerHeightMap_islandHeightMapSurface, 1);
            GL.uniform1i(samplerNormals_islandHeightMapSurface, 2);
            GL.uniform3fv(lightDir_islandHeightMapSurface, SETTINGS.light.direction);
        },
        unset_islandHeightMapSurface_shaders: function() {
            GL.disableVertexAttribArray(position_islandHeightMapSurface);
        },
        set_vertexPointers_islandHeightMapSurface: function() {
            GL.vertexAttribPointer(position_islandHeightMapSurface, 2, GL.FLOAT, false,8,0) ;
        },
        set_matriceObjet_islandHeightMapSurface: function(matrice) {
            GL.uniformMatrix4fv(matrice_objet_islandHeightMapSurface, false, matrice);
        },
        set_matriceProjection_islandHeightMapSurface: function(matrice) {
            GL.uniformMatrix4fv(matrice_projection_islandHeightMapSurface, false, matrice);
        },
        set_matriceVue_islandHeightMapSurface: function(matrice) {
            GL.uniformMatrix4fv(matrice_vue_islandHeightMapSurface, false, matrice);
        },        
        set_hMax_islandHeightMapSurface: function(hMax){
            GL.uniform1f(hMax_islandHeightMapSurface, hMax);
        },
        set_dim_islandHeightMapSurface: function(scale, centre){
            GL.uniform2fv(scale_islandHeightMapSurface, scale);
            GL.uniform2fv(centre_islandHeightMapSurface,centre);
        },
        set_scaleUV_islandHeightMapSurface: function(scaleU, scaleV){
            GL.uniform2f(scaleUV_islandHeightMapSurface, scaleU, scaleV);
        },
        set_fog_islandHeightMapSurface : function(dMin, dMax, color){
            GL.uniform1f(fogDmin_islandHeightMapSurface, dMin),
            GL.uniform1f(fogDmax_islandHeightMapSurface, dMax),
            GL.uniform3fv(fogColor_islandHeightMapSurface, color);
        },



        //HEIGHTMAP TO NORMAL MAP RENDERING
        set_normals_shaders: function() {
            GL.useProgram(shader_program_normals);
            GL.enableVertexAttribArray(position_normals);
            GL.uniform1i(sampler_normals,0);
        },
        unset_normals_shaders: function() {
            GL.disableVertexAttribArray(position_normals);
        },
        set_vertexPointers_normals: function() {
            GL.vertexAttribPointer(position_normals, 2, GL.FLOAT, false,8,0) ;
        },
        set_whHSize: function(w,h, H, sx, sy){
            GL.uniform2f(wh_normals,w,h);
            GL.uniform1f(H_normals, H);
            GL.uniform2f(size_normals, sx,sy);
        },



        //SIMPLE TEXTURE RENDERING
        set_textureRead_shaders: function() {
            GL.useProgram(shader_program_textureRead);
            GL.enableVertexAttribArray(position_textureRead);
            GL.uniform1i(sampler_textureRead,0);
        },
        unset_textureRead_shaders: function() {
            GL.disableVertexAttribArray(position_textureRead);
        },
        set_vertexPointers_textureRead: function() {
            GL.vertexAttribPointer(position_textureRead, 2, GL.FLOAT, false,8,0) ;
        },


        //WATER RENDERING
        set_water_shader: function() {
            GL.useProgram(shader_program_water);
            GL.enableVertexAttribArray(position_water);
            GL.uniform1i(samplerCiel_water, 0);
            GL.uniform1i(samplerFond_water, 1);
        },
        set_fog_water : function(dMin, dMax, color){
            GL.uniform1f(fogDmin_water, dMin),
            GL.uniform1f(fogDmax_water, dMax),
            GL.uniform3fv(fogColor_water, color);
        },
        unset_water_shader: function() {
            GL.disableVertexAttribArray(position_water);
        },
        set_time_water: function(t) {
            GL.uniform1f(time_water, t);
        },
        set_liquid_water: function(i, h, couleur,vis,lum) {
            GL.uniform1f(indice_refraction_water, i);
            GL.uniform1f(profondeur_water, h);
            GL.uniform4fv(couleur_eau_water, couleur);
            GL.uniform1f(visibilite_water, vis);
            GL.uniform3fv(lumiere_water, lum);
        },
        set_vagues_water: function(as, ks_, ws_) {
            GL.uniform1fv(amplitudes_water, as);
            GL.uniform2fv(ks_water, ks_);
            GL.uniform1fv(ws_water, ws_);
        },
        set_matrices_water: function(projection, vue) {
            GL.uniformMatrix4fv(matrice_projection_water, false, projection);
            GL.uniformMatrix4fv(matrice_vue_water, false, vue);
        },
        set_matriceObjet_water: function(matrice) {
            GL.uniformMatrix4fv(matrice_objet_water, false, matrice);
        },
        set_camera_water: function(c) {
            GL.uniform3fv(camera_water, c);
        },
        set_vertexPointers_water: function() {
            GL.vertexAttribPointer(position_water, 3, GL.FLOAT, false,12,0);
        }

        
    };
    SHADERS=that;
    return that;

})();


