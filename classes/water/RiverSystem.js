/*
 * GPGPU River system 
 * works like an autonomous part
 * 
 * must be initialized with the GL context
 * 
 * spec.heightMapTexture : texture of the heightmap
 * spec.hMax             : height of the texture
 * spec.sizePx           : size of the heightmap in pixels
 * spec.width            : size along x axis
 * spec.height           : size along y axis
 * spec.simuSizePx       : size of the simulation texture in pixels
 * spec.rain             : rain coefficient
 * spec.gravity          : gravity
 * spec.waterHMax        : max height of the water
 * 
 * spec.heightMapTexture is a floating point texture
 * height is stored in red channel, and normal in gba channels
 * 
 * All computation are done in fragment shader
 * 
 * instanciated into :
 * HeightmapSurface.js
 */
var RiverSystem=(function() {
    var _gl=false,
        _debug=true,
        _initialized=false,
        _waterMaterialImageSrc="classes/water/images/blue.jpg",
        
        _shader_program_copy, _shader_program_gpgpu, _shader_program_rendering,
 
        _position_copy, _position_gpgpu, _position_rendering,
        
        _sampler_copy,
        
        _dx_gpgpu, _dy_gpgpu,  _scaleXY_gpgpu, _dt_gpgpu, _rain_gpgpu, _gravity_gpgpu,
        _terrainHMax_gpgpu, _waterHMax_gpgpu,
        _samplerWater_gpgpu, _samplerTerrain_gpgpu,
        
        _samplerWater_rendering, _samplerMaterial_rendering,
         _dx_rendering, _dy_rendering,
        
        _quadVerticesVBO, _quadIndicesVBO,
        
        _waterMaterialTexture;
    
    return  {
        init: function(gl) {
            _gl=gl;
            _initialized=true;
            
             //COMPILE SHADERS FUNCTIONS
             var get_shader=function(source, type, strtype) {
                    var shader = _gl.createShader(type);
                    _gl.shaderSource(shader, source);
                    _gl.compileShader(shader);
                    if (!_gl.getShaderParameter(shader, _gl.COMPILE_STATUS)) {
                        alert(strtype+" : "+_gl.getShaderInfoLog(shader));
                        return false;
                    }
                    return shader;
            };

            var get_shaderProgram=function(vertex_source, fragment_source, strtype){
                    var shader_vertex=get_shader(vertex_source, _gl.VERTEX_SHADER, strtype+" VERTEX_SHADER");
                    var shader_fragment=get_shader(fragment_source, _gl.FRAGMENT_SHADER, strtype+" FRAGMENT_SHADER");
                    shader_program=_gl.createProgram();

                    _gl.attachShader(shader_program, shader_vertex);
                    _gl.attachShader(shader_program, shader_fragment);

                    _gl.linkProgram(shader_program);

                    return shader_program;
            };
            
            
            //COPY SHADER PROGRAM
             var shader_fragment_source_copy="$SHADER_FRAGMENT_COPY$",
                shader_vertex_source_copy="$SHADER_VERTEX_COPY$";
            
            _shader_program_copy=get_shaderProgram(shader_vertex_source_copy, shader_fragment_source_copy, "RIVERSYSTEM COPY");
            
            _sampler_copy = _gl.getUniformLocation(_shader_program_copy, "sampler"),
            
            _position_copy = _gl.getAttribLocation(_shader_program_copy, "position");
       
            //GPGPU SHADER PROGRAM
            var shader_fragment_source_gpgpu="$SHADER_FRAGMENT_GPGPU$",
                shader_vertex_source_gpgpu="$SHADER_VERTEX_GPGPU$";
            
            _shader_program_gpgpu=get_shaderProgram(shader_vertex_source_gpgpu, shader_fragment_source_gpgpu, "RIVERSYSTEM GPGPU");
            
            _dx_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "dx"),
            _dy_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "dy"),
            _scaleXY_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "scaleXY"),
            _dt_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "dt"),
            _rain_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "rain"),
            _gravity_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "gravity"),
            _terrainHMax_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "terrainHMax"),
            _waterHMax_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "waterHMax"),
            _samplerWater_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "samplerWater"),
            _samplerTerrain_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "samplerTerrain");
            
            _position_gpgpu = _gl.getAttribLocation(_shader_program_gpgpu, "position");
            
            //init some uniforms
            _gl.useProgram(_shader_program_gpgpu);
            _gl.uniform1i(_samplerWater_gpgpu, 0);
            _gl.uniform1i(_samplerTerrain_gpgpu, 1);
            
            
            //RENDERING SHADER PROGRAM
            var shader_fragment_source_rendering="$SHADER_FRAGMENT_RENDERING$",
                shader_vertex_source_rendering="$SHADER_VERTEX_RENDERING$";
            
            _shader_program_rendering=get_shaderProgram(shader_vertex_source_rendering, shader_fragment_source_rendering, "RIVERSYSTEM RENDERING");
            
            _dx_rendering = _gl.getUniformLocation(_shader_program_rendering, "dx"),
            _dy_rendering = _gl.getUniformLocation(_shader_program_rendering, "dy"),
            _samplerWater_rendering = _gl.getUniformLocation(_shader_program_rendering, "samplerWater"),
            _samplerMaterial_rendering = _gl.getUniformLocation(_shader_program_rendering, "samplerMaterial");
            
            _position_rendering = _gl.getAttribLocation(_shader_program_rendering, "position");
            
            //init some uniforms
            _gl.useProgram(_shader_program_rendering);
            _gl.uniform1i(_samplerWater_rendering, 0);
            _gl.uniform1i(_samplerMaterial_rendering, 1);
            
            
            //QUAD VBOs
            _quadVerticesVBO = _gl.createBuffer ();
            _gl.bindBuffer(_gl.ARRAY_BUFFER, _quadVerticesVBO);
            _gl.bufferData(_gl.ARRAY_BUFFER, new Float32Array([
                -1,-1,
                -1,1,
                1,1,
                1,-1
            ]),_gl.STATIC_DRAW);
            
            _quadIndicesVBO = _gl.createBuffer ();
            _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, _quadIndicesVBO);
            _gl.bufferData(_gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2, 0,2,3]),_gl.STATIC_DRAW);
            
            
            //WATER MATERIAL TEXTURE
            _waterMaterialTexture=_gl.createTexture();
            var waterMaterialImage=new Image();
            waterMaterialImage.onload=function() {
                _gl.bindTexture(_gl.TEXTURE_2D, _waterMaterialTexture);
                _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.LINEAR);
                _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
                _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA, _gl.RGBA, _gl.UNSIGNED_BYTE, waterMaterialImage);
                _gl.bindTexture(_gl.TEXTURE_2D, null);
            };
            waterMaterialImage.src=_waterMaterialImageSrc;
            
        },
        
        instance: function(spec){
            if (!_initialized) {
                console.log("Error : RiverSystem must be initialized first with RiverSystem.init(gl context)");
                return false;
            }
            
            //set default parameters
            spec.simuSizePx = spec.simuSizePx || spec.sizePx,
            spec.rain = spec.rain || 0.0000001,
            spec.nPass = spec.nPass || 4,
            spec.gravity = spec.gravity ||0.6,
            spec.waterHMax = spec.waterHMax || 1.2;
            
            //INIT WATER HEIGHTAND SPEED TEXTURE
            //WATER HEIGHT is stored into red channel
            //SPEED is stored into green, blue, alpha channels
            //it is a floating point texture
            var heightSpeed_texture=_gl.createTexture();
            _gl.bindTexture(_gl.TEXTURE_2D, heightSpeed_texture);            
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
            _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,spec.simuSizePx,spec.simuSizePx, 0, _gl.RGBA, _gl.FLOAT, null);
            _gl.bindTexture(_gl.TEXTURE_2D, null);
            
            //create a framebuffer linked to heightSpeed texture
             var heightSpeed_FBO=_gl.createFramebuffer();
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, heightSpeed_FBO);
            _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, heightSpeed_texture, 0);
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
            
            //INIT WATER HEIGHTAND SPEED TEXTURE COPY
            //WATER HEIGHT is stored into red channel
            //SPEED is stored into green, blue, alpha channels
            //it is a floating point texture
            var heightSpeed_texture_copy=_gl.createTexture();
            _gl.bindTexture(_gl.TEXTURE_2D, heightSpeed_texture_copy);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
            _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,spec.simuSizePx,spec.simuSizePx, 0, _gl.RGBA, _gl.FLOAT, null);
            _gl.bindTexture(_gl.TEXTURE_2D, null);
            
            //create a framebuffer linked to heightSpeed texture copy
             var heightSpeed_FBO_copy=_gl.createFramebuffer();
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, heightSpeed_FBO_copy);
            _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, heightSpeed_texture_copy, 0);
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
            
            //INIT WATER RENDERING TEXTURE
            var rendering_texture=_gl.createTexture();
            _gl.bindTexture(_gl.TEXTURE_2D, rendering_texture);            
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
            _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,spec.simuSizePx,spec.simuSizePx, 0, _gl.RGBA, _gl.FLOAT, null);
            _gl.bindTexture(_gl.TEXTURE_2D, null);
            
            //create a framebuffer linked to water rendering texture
             var rendering_FBO=_gl.createFramebuffer();
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, rendering_FBO);
            _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, rendering_texture, 0);
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
            
            var dx=.5/spec.simuSizePx;
            var dy=dx*spec.height/spec.width;
            
            var scaleXY=[spec.width, spec.height];
            var rainTimer=0;
            
            var that={
                //draw the rivers on a colormap
                draw: function(){
                    _gl.bindTexture(_gl.TEXTURE_2D, rendering_texture);
                },
                
                //compute a pass with delta time dt in seconds
                compute: function(dt){
                    rainTimer+=dt;
                    var rain=0;
                    if (rainTimer>1){ //apply rain every second
                        rainTimer=0;
                        rain=spec.rain;
                    }
                    _gl.disable(_gl.BLEND); //to use alpha channel like a normal channel
                    
                    _gl.clearColor(0,0,0,0);
                    _gl.depthMask(false);
                    _gl.viewport(0,0,spec.simuSizePx,spec.simuSizePx);
                  
                  //bind quad buffers
                    _gl.bindBuffer(_gl.ARRAY_BUFFER, _quadVerticesVBO) ;
                    _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);
                    _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, _quadIndicesVBO);
                    
                 var i;  
                 for (i=0; i<spec.nPass; i++){ 
                  //FIRST PASS : COPY PHYSICS TEXTURE
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, heightSpeed_FBO_copy); 
                    _gl.useProgram(_shader_program_copy);
                    _gl.enableVertexAttribArray(_position_copy);
                    
                    //bind texture
                    _gl.bindTexture(_gl.TEXTURE_2D, heightSpeed_texture);
                    
                    //draw quad
                    _gl.vertexAttribPointer(_position_copy, 2, _gl.FLOAT, false,8,0);
                    _gl.drawElements(_gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0);
                                        
                    _gl.disableVertexAttribArray(_position_copy);
                    
                    
                  //SECOND PASS : UPDATE PHYSICS
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, heightSpeed_FBO);
                    _gl.useProgram(_shader_program_gpgpu);
                    _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);
                    _gl.enableVertexAttribArray(_position_gpgpu);
                    
                    //set uniforms
                    if (!i) {
                    _gl.uniform1f(_dx_gpgpu, dx);
                    _gl.uniform1f(_dy_gpgpu, dy);
                    _gl.uniform2fv(_scaleXY_gpgpu, scaleXY);
                    _gl.uniform1f(_dt_gpgpu, dt/spec.nPass);
                    _gl.uniform1f(_rain_gpgpu, rain);
                    _gl.uniform1f(_gravity_gpgpu, spec.gravity);
                    _gl.uniform1f(_waterHMax_gpgpu, spec.waterHMax);
                    _gl.uniform1f(_terrainHMax_gpgpu, spec.hMax);
                    } else if (i===1) {
                        _gl.uniform1f(_rain_gpgpu, 0);
                    }
                    
                    
                    //bind textures
                    _gl.activeTexture(_gl.TEXTURE1);
                    _gl.bindTexture(_gl.TEXTURE_2D, spec.heightMapTexture);
                    
                    _gl.activeTexture(_gl.TEXTURE0);
                    _gl.bindTexture(_gl.TEXTURE_2D, heightSpeed_texture_copy);
                    
                    //draw quad
                    //_gl.bindBuffer(_gl.ARRAY_BUFFER, _quadVerticesVBO) ;
                    _gl.vertexAttribPointer(_position_gpgpu, 2, _gl.FLOAT, false,8,0);
                    //_gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, _quadIndicesVBO);
                    _gl.drawElements(_gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0);
                    
                    _gl.disableVertexAttribArray(_position_gpgpu);
                    
                    }//end for i
                    
                  //THIRD PASS : COMPUTE WATER RENDERING
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER,rendering_FBO);
                    _gl.useProgram(_shader_program_rendering);
                    _gl.enableVertexAttribArray(_position_rendering);
                    
                    _gl.uniform1f(_dx_rendering, dx*2.5);
                    _gl.uniform1f(_dy_rendering, dy*2.5);
                    
                    //bind textures
                    _gl.activeTexture(_gl.TEXTURE1);
                    _gl.bindTexture(_gl.TEXTURE_2D, _waterMaterialTexture);
                    
                    _gl.activeTexture(_gl.TEXTURE0);
                    _gl.bindTexture(_gl.TEXTURE_2D, heightSpeed_texture);
                    
                    //draw quad
                    //_gl.bindBuffer(_gl.ARRAY_BUFFER, _quadVerticesVBO) ;
                    _gl.vertexAttribPointer(_position_rendering, 2, _gl.FLOAT, false,8,0);
                    //_gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, _quadIndicesVBO);
                    _gl.drawElements(_gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0);
                    
                    _gl.disableVertexAttribArray(_position_rendering);
                    
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
                    _gl.enable(_gl.BLEND); 
                    _gl.flush();
                    _gl.depthMask(true);
                    _gl.clearColor(1,1,1,1);
                }
                
                
            };//end that
            return that;
        }
        
        
    };
})();
