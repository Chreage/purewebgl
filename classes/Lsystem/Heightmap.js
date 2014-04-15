/*
 * 
 * spec.nodes : nodes array - from Lsystem
 * spec.size : size of the depthmap in px - must be POT. default : 1024
 * spec.gl : webgl context
 * spec.margin: margin between border and nodes - default : 1
 * spec.AABB : bounding box
 * spec.erodeTexturesSet: instance of ErodeTexturesSet. facultative
 * 
 * 
 * instancied in HeightmapSurface
 */
var Heightmap=(function() {
    var debug={
        heightMap: SETTINGS.debug.LsystemHeightMap,
        normalMap: SETTINGS.debug.LsystemNormalMap
    };
    
    var _initialized=false, _gl;
    var _gaussTexture, _gaussianPatchVBO, _gaussianPatchVBOIndices=VBO_indices;      
    var _normalMapFBO, _heightMapFBO;
            
    return {
        init: function(gl) {
            _gl=gl;
            var nGauss=SETTINGS.Lsystems.heightMapGaussPatchSizePx;
            _initialized=true;
            
            _gaussTexture=Gauss.get_gaussTexture(_gl, nGauss, true);
           //setup gaussian patch (textured with gaussTetxure)
            _gaussianPatchVBO=VBO.instance({
                tableau_js: [
                    -0.5,-0.5,
                    -0.5,0.5,
                    0.5,0.5,
                    0.5,-0.5
                ]
            });
            _gaussianPatchVBOIndices=VBO_indices.instance({
                tableau_js: [
                    0,1,2, 0,2,3
                ]
            });
            
            _normalMapFBO=_gl.createFramebuffer(),
            _heightMapFBO=_gl.createFramebuffer();
        },
        
        instance: function(spec){
            if (!_initialized){
                console.log("Heightmap must be initialized with Heightmap.init before use. Abort");
                return false;
            };
            
            spec.size=spec.size || 1024,
            spec.margin=spec.margin || 1;
            
            var nUV=spec.nUV || SETTINGS.Lsystems.textureTileInWidth; //number of colored texture patch on the heightmap
            var scaleNode=SETTINGS.Lsystems.heightMapPatchSizePx; //patch size
            var patchAlphaRandom=SETTINGS.Lsystems.heightMapPatchAlphaRandom,
                patchAlphaMin=SETTINGS.Lsystems.heightMapPatchAlphaMin;
            
            //create textures
            var heightMapTexture=_gl.createTexture(),
                normalMapTexture=_gl.createTexture();
                //get gauss texture as floating point texture
            
            //setup heightMapTexture
            _gl.bindTexture(_gl.TEXTURE_2D, heightMapTexture);            
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.LINEAR);
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
            _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,spec.size, spec.size, 0, _gl.RGBA, _gl.FLOAT, null);
            _gl.bindTexture(_gl.TEXTURE_2D, null);

            //setup render to texture for heightmap
            //var heightMapFBO=_gl.createFramebuffer();
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, _heightMapFBO);
            _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, heightMapTexture, 0);
            //_gl.bindFramebuffer(_gl.FRAMEBUFFER, null);

            //setup normalMapTexture
            _gl.bindTexture(_gl.TEXTURE_2D, normalMapTexture);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR_MIPMAP_LINEAR);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.LINEAR);
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
            _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,spec.size, spec.size, 0, _gl.RGBA, _gl.FLOAT, null);
            _gl.bindTexture(_gl.TEXTURE_2D, null);

            //setup render to texture for normalmap
            //var normalMapFBO=_gl.createFramebuffer();
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, _normalMapFBO);
            _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, normalMapTexture, 0);
            //_gl.bindFramebuffer(_gl.FRAMEBUFFER, null);

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
                if (node.generation>SETTINGS.Lsystems.heightMapPatchMaxGen) return;
                nodeScale[0]=node.scale*scaleNode[0],
                nodeScale[1]=node.scale*scaleNode[1];
        
                //position between -1 and 1
                nodePosition[0]=2*(((node.position[0]-spec.centre[0])*scaleXReal)/heightMapWidth),
                nodePosition[1]=2*(((node.position[1]-spec.centre[1])*scaleYReal)/heightMapHeight);
                
                var nodeAlpha=patchAlphaMin+Math.random()*patchAlphaRandom;
                nodeAlpha*=node.scale;

                Shaders.set_node_heightMap(nodeScale, nodePosition, nodeAlpha);
                _gaussianPatchVBOIndices.draw_Elements();
            }
            
            
            var that={
                get_normalTexture: function() {
                    return normalMapTexture;
                },
                
                compute: function() {
                    //COMPUTE HEIGHTMAP
                    Shaders.set_heightMap_shaders();
                   
                    if (!debug.heightMap) _gl.bindFramebuffer(_gl.FRAMEBUFFER, _heightMapFBO);
                    if (debug.heightMap) SCENE.stop();
                    
                    _gl.clearColor(0.,0.,0.,1.);
                    _gl.disable(_gl.DEPTH_TEST);
                    _gl.depthMask(false);
                    _gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE);
                    _gl.viewport(0.0, 0.0, spec.size, spec.size);
                    _gl.clear(_gl.COLOR_BUFFER_BIT);
                    
                    _gaussianPatchVBO.draw_heightMap();
                    _gaussianPatchVBOIndices.bind();
                    _gl.bindTexture(_gl.TEXTURE_2D, _gaussTexture);                    
                    spec.nodes.map(drawNode);                    
                    
                    _gl.flush();                    
                    
                    Shaders.unset_heightMap_shaders();                    
                    if (debug.heightMap) return false;

                    //COMPUTE EROSION
                    if (spec.erodeTexturesSet && !SETTINGS.debug.noErosionLsystems) {
                        heightMapTexture=spec.erodeTexturesSet.erode(heightMapTexture, spec.size, false);
                        if (!heightMapTexture){ //debug mode or error happens
                            return false;
                        }
                    }

                    //COMPUTE NORMAL MAP
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, (debug.normalMap)?null:_normalMapFBO);
                    if (debug.normalMap) {
                        SCENE.stop();
                    }

                    Shaders.set_normals_shaders();
                    Shaders.set_whHSize(spec.size, spec.size, spec.hMax, heightMapWidth, heightMapHeight);
                    _gl.clearColor(0.,0.,0.,0.);
                    _gl.clear(_gl.COLOR_BUFFER_BIT);

                    _gl.bindTexture(_gl.TEXTURE_2D, heightMapTexture);
                    _gaussianPatchVBO.draw_normalMap();
                    _gaussianPatchVBOIndices.draw();
                    Shaders.unset_normals_shaders();

                    _gl.enable(_gl.DEPTH_TEST);
                    _gl.depthMask(true);
                    _gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA);
                    
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);

                    //generate mipmaps
                    _gl.bindTexture(_gl.TEXTURE_2D, normalMapTexture);
                    _gl.generateMipmap(_gl.TEXTURE_2D);
                    _gl.bindTexture(_gl.TEXTURE_2D, null);
                },
                
                draw: function(){
                    Shaders.set_scaleUV_heightMapSurface(scaleU, scaleV);
                    _gl.bindTexture(_gl.TEXTURE_2D, normalMapTexture);
                    Shaders.set_dim_heightMapSurface(scaleSurface, centerSurface);
                },
                
                moveNodesAbove: function() { //used after heightmap computation to move nodes above the heightmap
                    if (debug.heightMap || debug.normalMap || !heightMapTexture) return;
                    //draw heightmap to get it with readpixel
                    var _pixelsBuffer=new Uint8Array(spec.size*spec.size*4);

                    
                     _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);

                     Shaders.set_textureRead_shaders();
                      _gl.viewport(0.0, 0.0, spec.size, spec.size);
                     _gl.clearColor(0.,0.,0.,0.);
                     _gl.clear(_gl.COLOR_BUFFER_BIT);
                     _gl.disable(_gl.DEPTH_TEST);

                     _gl.bindTexture(_gl.TEXTURE_2D, heightMapTexture);
                     _gaussianPatchVBO.draw_textureRead();
                     _gaussianPatchVBOIndices.draw();   
                     
                     _gl.flush();                     
                     _gl.readPixels(0,0,spec.size, spec.size, _gl.RGBA, _gl.UNSIGNED_BYTE, _pixelsBuffer);

                     Shaders.unset_textureRead_shaders();
                    
                     _gl.enable(_gl.DEPTH_TEST);

                     //move nodes
                     var hMaxAABB=0, hMinAABB=0;
                     var moveNode=function(node){
                        //compute x,y on heightmap texture UV (between 0 and 1) of the node on the island heightmap 
                        var x=(spec.margin+node.position[0]-spec.AABB.xMin)/(heightMapWidth+2*spec.margin),
                            y=(spec.margin+node.position[1]-spec.AABB.yMin)/(heightMapHeight+2*spec.margin);

                        //transform UV coordinates into pixel coordinates
                        //TODO : add linear interpolation
                        var xPx=Math.round(x*spec.size),
                            yPx=Math.round(y*spec.size);

                        //get the pixel index on the readpixel data
                        var i=xPx+spec.size*yPx;

                        var h=spec.hMax*(_pixelsBuffer[4*i]/255); //red channel -> height
                        hMaxAABB=Math.max(h, hMaxAABB),
                        hMinAABB=Math.min(h, hMinAABB);
                        //move the node
                        node.position[2]+=h;

                     };
                     
                     spec.nodes.map(moveNode);
                     spec.AABB.zMax+=hMaxAABB,
                     spec.AABB.zMin+=hMinAABB;
                     _gl.clearColor(1.,1.,1.,1.);
                }
                
            };
            that.compute();
            return that;
        }
    };
})();


