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
            var nUV=10;
            var scaleNode=25; //patch size
            var patchAlphaRandom=0.2,
                patchAlphaMin=0.1;

            var debug={
                heightMap: false,
                normalMap: false
            }
            
            //create textures
            var heightMapTexture=_gl.createTexture(),
                normalMapTexture=_gl.createTexture(),
                gaussTexture=Gauss.get_gaussTexture(_gl, nGauss);
            
            //setup heightMapTexture
            _gl.bindTexture(_gl.TEXTURE_2D, heightMapTexture);            
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
            _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,spec.size, spec.size, 0, _gl.RGBA, _gl.UNSIGNED_BYTE, null);
            _gl.bindTexture(_gl.TEXTURE_2D, null);

            //setup render to texture for heightmap
            var heightMapFBO=_gl.createFramebuffer();
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, heightMapFBO);
            _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, heightMapTexture, 0);
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);

            //setup normalMapTexture
            _gl.bindTexture(_gl.TEXTURE_2D, normalMapTexture);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR_MIPMAP_LINEAR);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
            _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,spec.size, spec.size, 0, _gl.RGBA, _gl.UNSIGNED_BYTE, null);
            _gl.bindTexture(_gl.TEXTURE_2D, null);

            //setup render to texture for normalmap
            var normalMapFBO=_gl.createFramebuffer();
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, normalMapFBO);
            _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, normalMapTexture, 0);
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
        
            if (debug.heightMap) console.log("Heightmap : Compute heightmap for "+heightMapWidth+" X "+heightMapHeight+" area size");
            
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

            var scaleU=nUV;
            var scaleV=scaleU*heightMapHeight/heightMapWidth;


            var drawNode=function(node){
                nodeScale[0]=node.scale*scaleNode[0],
                nodeScale[1]=node.scale*scaleNode[1];
        
                //position between -1 and 1
                nodePosition[0]=2*(((node.position[0]-spec.centre[0])*scaleXReal)/heightMapWidth),
                nodePosition[1]=2*(((node.position[1]-spec.centre[1])*scaleYReal)/heightMapHeight);
                
                var nodeAlpha=patchAlphaMin+Math.random()*patchAlphaRandom;
                nodeAlpha*=node.scale;

                SHADERS.set_node_heightMap(nodeScale, nodePosition, nodeAlpha);
                gaussianPatchVBOIndices.draw_Elements();
            }
            
            
            var that={
                compute: function() {
                    //COMPUTE HEIGHTMAP
                    Shaders.unset_defaultShader();
                    Shaders.set_heightMap_shaders();
                   
                    if (!debug.heightMap) _gl.bindFramebuffer(_gl.FRAMEBUFFER, heightMapFBO);
                    if (debug.heightMap) SCENE.stop();
                    
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
                    
                    _gl.flush();                    
                    
                    Shaders.unset_heightMap_shaders();                    



                    //COMPUTE NORMAL MAP
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, (debug.normalMap)?null:normalMapFBO);
                    if (debug.normalMap) SCENE.stop();

                    Shaders.set_normals_shaders();
                    Shaders.set_wh(spec.size, spec.size);
                    _gl.clearColor(0.,0.,0.,0.);
                    _gl.clear(_gl.COLOR_BUFFER_BIT);

                    _gl.bindTexture(_gl.TEXTURE_2D, heightMapTexture);
                    gaussianPatchVBO.draw_normalMap();
                    gaussianPatchVBOIndices.draw();
                    Shaders.unset_normals_shaders();

                    _gl.enable(_gl.DEPTH_TEST);
                    _gl.disable(_gl.BLEND);

                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);

                    //generate mipmaps
                    _gl.bindTexture(_gl.TEXTURE_2D, normalMapTexture);
                    _gl.generateMipmap(_gl.TEXTURE_2D);
                    _gl.bindTexture(_gl.TEXTURE_2D, null);


                    Shaders.set_defaultShader();

                  //  _gl.clearColor(1.,1.,1.,1.);
                },
                
                draw: function(){
                    //_gl.bindTexture(_gl.TEXTURE_2D, heightMapTexture);
                    Shaders.set_scaleUV_heightMapSurface(scaleU, scaleV);
                    _gl.bindTexture(_gl.TEXTURE_2D, normalMapTexture);
                    Shaders.set_dim_heightMapSurface(scaleSurface, centerSurface);
                },

                moveNodesAbove: function() { //used after heightmap computation to move nodes above the heightmap
                    //draw heightmap to get it with readpixel
                    var _pixelsBuffer=new Uint8Array(spec.size*spec.size*4);

                    Shaders.unset_defaultShader();
                     _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);

                     Shaders.set_textureRead_shaders();
                      _gl.viewport(0.0, 0.0, spec.size, spec.size);
                     _gl.clearColor(0.,0.,0.,0.);
                     _gl.clear(_gl.COLOR_BUFFER_BIT);
                     _gl.disable(_gl.DEPTH_TEST);

                     _gl.bindTexture(_gl.TEXTURE_2D, heightMapTexture);
                     gaussianPatchVBO.draw_textureRead();
                     gaussianPatchVBOIndices.draw();   
                     
                     _gl.flush();                     
                     _gl.readPixels(0,0,spec.size, spec.size, _gl.RGBA, _gl.UNSIGNED_BYTE, _pixelsBuffer);

                     Shaders.unset_textureRead_shaders();
                     Shaders.set_defaultShader();
                     _gl.enable(_gl.DEPTH_TEST);

                     //move nodes
                     var moveNode=function(node){
                        var x=(spec.margin+node.position[0]-spec.AABB.xMin)/(heightMapWidth+2*spec.margin);
                        var y=(spec.margin+node.position[1]-spec.AABB.yMin)/(heightMapHeight+2*spec.margin);

                        var xPx=Math.round(x*spec.size),
                            yPx=Math.round(y*spec.size);

                        var i=xPx+spec.size*yPx;

                        var h=spec.hMax*(_pixelsBuffer[4*i]/255); //red channel -> z

                        node.position[2]+=h;

                     }
                     
                     spec.nodes.map(moveNode);

                     spec.AABB.zMax+=spec.hMax;

                }
                
                
                
            }
            that.compute();
            return that;
        }
    }
})();


