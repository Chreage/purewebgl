/*
 * 
 * spec.nodes : nodes array - from Lsystem
 * spec.size : size of the depthmap in px - must be POT. default : 1024
 * spec.gl : webgl context
 * spec.margin: margin between border and nodes - default : 1
 * spec.AABB : bounding box
 */
var Heightmap=(function() {
    return {
        instance: function(spec){
            spec.size=spec.size || 1024;
            spec.margin=spec.margin || 1;
            
            
            
            var _gl=spec.gl
            var nGauss=16;
            var scaleNode=16;
            var debug=false;
            
            //create textures
            var heightMapTexture=_gl.createTexture();
            var gaussTexture=Gauss.get_gaussTexture(_gl, nGauss);
            
            //setup heightMapTexture
            _gl.bindTexture(_gl.TEXTURE_2D, heightMapTexture);
            //_gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.LINEAR);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR_MIPMAP_LINEAR);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
            _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,spec.size, spec.size, 0, _gl.RGBA, _gl.UNSIGNED_BYTE, null);
            _gl.bindTexture(_gl.TEXTURE_2D, null);

            //setup render to texture
            var heightMapFBO=_gl.createFramebuffer();
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, heightMapFBO);
            _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, heightMapTexture, 0);
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
            
            //setup gaussian patch (textured with gaussTetxure)
            var gaussianPatchVBO=VBO.instance({
                tableau_js: [
                    -0.5,-0.5,
                    -0.5,0.5,
                    0.5,0.5,
                    0.5,-0.5
                ]
            });
            var gaussianPatchVBOIndices=VBO_indices.instance({
                tableau_js: [
                    0,1,2, 0,2,3
                ]
            })
            
            //compute scale factors
            var heightMapWidth=spec.AABB.xMax-spec.AABB.xMin,
                heightMapHeight=spec.AABB.yMax-spec.AABB.yMin,
                heightMapCenterX=(spec.AABB.xMax+spec.AABB.xMin)/2,
                heightMapCenterY=(spec.AABB.yMax+spec.AABB.yMin)/2;
        
            var heightMapWidthReal=heightMapWidth-2*spec.margin,
                heightMapHeightReal=heightMapHeight-2*spec.margin;
                    
            var scaleXReal=heightMapWidthReal/heightMapWidth,
                scaleYReal=heightMapHeightReal/heightMapHeight;
        
            if (debug) console.log("Heightmap : Compute heightmap for "+heightMapWidth+" X "+heightMapHeight+" area size");
            
            //scale factor for a patch
            var scaleNode=[
                scaleNode*1/(heightMapWidth),
                scaleNode*1/(heightMapHeight)
            ];
            
            
            var nodeScale=[0,0],
                nodePosition=[0,0];
        
            var scaleSurface=[
                heightMapWidth+2*spec.margin,
                heightMapHeight+2*spec.margin
            ],
            centerSurface=[
                -heightMapWidth/2-spec.margin,
                -heightMapHeight/2-spec.margin
            ];
            
            var drawNode=function(node){
                nodeScale[0]=node.scale*scaleNode[0],
                nodeScale[1]=node.scale*scaleNode[1];
        
                //position between -1 and 1
                nodePosition[0]=2*((node.position[0]*scaleXReal)/heightMapWidth),
                nodePosition[1]=2*((node.position[1]*scaleYReal)/heightMapHeight);
                
                var nodeAlpha=0.05+Math.random()*0.1;
                        
                SHADERS.set_node_heightMap(nodeScale, nodePosition, nodeAlpha);
                gaussianPatchVBOIndices.draw_Elements();
            }
            
            
            var that={
                compute: function() {
                    Shaders.unset_defaultShader();
                    Shaders.set_heightMap_shaders();
                   
                    if (!debug) _gl.bindFramebuffer(_gl.FRAMEBUFFER, heightMapFBO);
                    if (debug) SCENE.stop();
                    
                    _gl.clearColor(0.,0.,0.,1.);
                    _gl.disable(_gl.DEPTH_TEST);
                    _gl.enable(_gl.BLEND);
                    _gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE);
                    _gl.viewport(0.0, 0.0, spec.size, spec.size);
                    _gl.clear(_gl.COLOR_BUFFER_BIT);
                    
                    gaussianPatchVBO.draw_heightMap();
                    gaussianPatchVBOIndices.bind();
                    _gl.bindTexture(_gl.TEXTURE_2D, gaussTexture);
                    
                    spec.nodes.map(drawNode);
                    
                    _gl.enable(_gl.DEPTH_TEST);
                    _gl.disable(_gl.BLEND);
                    _gl.flush();
                    
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
                    
                    //generate mipmaps
                    _gl.bindTexture(_gl.TEXTURE_2D, heightMapTexture);
                    _gl.generateMipmap(_gl.TEXTURE_2D);
                    _gl.bindTexture(_gl.TEXTURE_2D, null);
                    
                    Shaders.unset_heightMap_shaders();
                    Shaders.set_defaultShader();  
                    
                  //  _gl.clearColor(1.,1.,1.,1.);
                },
                
                draw: function(){
                    _gl.bindTexture(_gl.TEXTURE_2D, heightMapTexture);
                    Shaders.set_dim_heightMapSurface(scaleSurface, centerSurface);
                },
                
                debug: function() {
                    
                }
                
            }
            that.compute();
            return that;
        }
    }
})();


