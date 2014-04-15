/*
 * Big island with several L-systems
 * 
 * spec.centre : center of the Island
 * spec.LsystemRadius : collision radius for Lsystems
 * spec.size : size of the full island (size max)
 * 
 * spec.sizePx : Size of the heightMap in pixels. must be pot
 * spec.patchGaussSizePx: Real size of a patch in pixels. must be POT
 *
 * spec.patchSizeAvgPx : Average Size of a patch in pixels as it will be applied on the heighMap
 * spec.patchSizeRandomPx : Random part of a patch in pixels as it will be applied on the heighMap
 * 
 * spec.patchAlphaAvg : Average Alpha a patch as it will be applied on the heighMap
 * spec.patchAlphaRandom : Random part of the alpha of a patch as it will be applied on the heighMap
 * 
 * spec.hMax : total height
 * spec.nPatch : number of patchs
 * 
 * spec.Lsystems: Array of Lsystems specs
 *
 * spec.textureColorURL : url of the texture
 * spec.textureNormalsURL
 * 
 * spec.scaleUV : number of color/normal texture tiles
 */
var SuperIsland=(function() {
    var debug={
            islandHeightMap: SETTINGS.debug.islandHeightMap,
            islandNormalMap: SETTINGS.debug.islandNormalMap
        };
    var _dt=SETTINGS.physics.dt/1000;    
            
    return {
        instance: function(spec){
            
            //if some parameters are not set, put it at default values
            spec.centre=spec.centre || [0,0,0],
            spec.LsystemRadius=spec.LsystemRadius||10,
            spec.size=spec.size||100,
            
            spec.sizePx=spec.sizePx || SETTINGS.islands.sizePx,
            spec.patchGaussSizePx=spec.patchGaussSizePx || SETTINGS.islands.patchGaussSizePx,
 
            spec.patchSizeAvgPx=spec.patchSizeAvgPx || SETTINGS.islands.patchSizeAvgPx,
            spec.patchSizeRandomPx=spec.patchSizeRandomPx || SETTINGS.islands.patchSizeRandomPx,
            
            spec.patchAlphaAvg=spec.patchAlphaAvg || SETTINGS.islands.patchAlphaAvg,
            spec.patchAlphaRandom=spec.patchAlphaRandom || SETTINGS.islands.patchAlphaRandom,

            spec.hMax = spec.hMax || SETTINGS.islands.hMax,
            spec.nPatch = spec.nPatch || SETTINGS.islands.nPatch,
            
            spec.scaleUV = spec.scaleUV || SETTINGS.islands.textureTileInWidth;
            
    
            var matrix=lib_matrix4.get_I4();
            //lib_matrix_mv.set_position(matrix, spec.centre);
            
            var _gl=GL;
            var lsystems=[];
 
            var colorTexture=Texture.instance({
                url: spec.textureColorURL || SETTINGS.islands.textureColorURL
            });
            var normalsTexture=Texture.instance({
                url: spec.textureNormalsURL || SETTINGS.islands.textureNormalsURL
            });
            var scaleSurface = [spec.size, spec.size];
            var centre2d=[spec.centre[0]-spec.size/2,spec.centre[1]-spec.size/2]
            
            //build Lsystems
            var centers=[],
                scaleIsland=[],
                offsetIsland=[];
        
            spec.Lsystems.map(function(lspec){
                //choose position
                var i,x,y,dx,dy,collide=true,n=0,xNorm,yNorm;
                
                while(collide && n<100) {
                    x=spec.LsystemRadius+Math.random()*(spec.size-2*spec.LsystemRadius),
                    y=spec.LsystemRadius+Math.random()*(spec.size-2*spec.LsystemRadius);
                    
                    collide=false;
                    for (i=0; i<centers.length; i++){
                        dx=x-centers[i][0],
                        dy=y-centers[i][1];
                        
                        collide = dx*dx+dy*dy<spec.LsystemRadius*spec.LsystemRadius;
                        if (collide) break;
                    }
                    n++;
                }
                if (n>=100){
                    console.log("SuperIsland warning : to many collisions");
                }
                centers.push([x,y]);
                var centre=[
                    spec.centre[0]+x-spec.size/2,
                    spec.centre[1]+y-spec.size/2,
                    spec.centre[2]-SETTINGS.islands.vtOffset]; //offset Z to avoid flickering
                
                //create Lsystem
                lspec.centre=centre;
                var lsystem=Lsystem.instance(lspec);
                if (STOP) return false;
                lsystems.push(lsystem);
                LSYSTEMS.push(lsystem);
                
                //compute heightmap matching coefficients
                scaleIsland.push([
                    (lsystem.get_sizeX())/spec.size,
                    (lsystem.get_sizeY())/spec.size
                ]);
                
                //center coordinates between 0 and 1
                xNorm=(x-0*lsystem.get_sizeX()/2)/spec.size,
                yNorm=(y-0*lsystem.get_sizeY()/2)/spec.size;
                
                offsetIsland.push([
                    xNorm, yNorm
                ]);
                
            }); //end Lsystems loop
            
            if (STOP || SETTINGS.debug.LsystemHeightMap || SETTINGS.debug.LsystemNormalMap) return;
                
                
            //get gauss texture as floatTexture
            var islandGaussTexture=Gauss.get_gaussTexture(_gl, spec.patchGaussSizePx, true);
             
            //create island heightmap texture
            var islandHeightMapTexture=_gl.createTexture();
            _gl.bindTexture(_gl.TEXTURE_2D, islandHeightMapTexture);            
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.LINEAR);
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
            _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,spec.sizePx, spec.sizePx, 0, _gl.RGBA, _gl.FLOAT, null);
            _gl.bindTexture(_gl.TEXTURE_2D, null);
            
            
            //setup render to texture for heightmap
            var islandHeightMapFBO=_gl.createFramebuffer();
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, islandHeightMapFBO);
            _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, islandHeightMapTexture, 0);
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
                
           
            //setup normalMapTexture
            var islandNormalMapTexture=_gl.createTexture();
            _gl.bindTexture(_gl.TEXTURE_2D, islandNormalMapTexture);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.LINEAR);
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
            _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,spec.sizePx, spec.sizePx, 0, _gl.RGBA, _gl.FLOAT, null);
            _gl.bindTexture(_gl.TEXTURE_2D, null);

            //setup render to texture for normalmap
            var islandNormalMapFBO=_gl.createFramebuffer();
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, islandNormalMapFBO);
            _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, islandNormalMapTexture, 0);
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
            });
            
            //build grid
            /* var grid=Grid.instance({
                x:512,
                y:512
            });*/
            
            
            var drawLsystem=function(lsystem, index){
                Shaders.set_heightMapSurface_shaders();
                Shaders.set_island_heightMapSurface(spec.hMax, scaleIsland[index], offsetIsland[index]);
                if (index===0) {
                    Shaders.set_fog_heightMapSurface(SETTINGS.fog.dMin, SETTINGS.fog.dMax, SETTINGS.fog.color );
                }
                lsystem.draw();
            };
            
            var _rivers=false;
            
            var that={
                compute: function(){
                    //compute height map
                    
                    Shaders.set_heightMap_shaders();
                    
                    if (!debug.islandHeightMap) _gl.bindFramebuffer(_gl.FRAMEBUFFER, islandHeightMapFBO);
                    if (debug.islandHeightMap) {
                        CV.width=spec.sizePx, CV.height=spec.sizePx;
                        document.body.style.backgroundColor="white";
                        SCENE.stop();
                    }
                    
                    _gl.clearColor(0.,0.,0.,1.);
                    _gl.disable(_gl.DEPTH_TEST);
                    _gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE);
                    _gl.viewport(0.0, 0.0, spec.sizePx, spec.sizePx);
                    _gl.clear(_gl.COLOR_BUFFER_BIT);
                    
                    
                    gaussianPatchVBO.draw_heightMap();
                    gaussianPatchVBOIndices.bind();
                    _gl.bindTexture(_gl.TEXTURE_2D, islandGaussTexture);                    
                    //draw patches loop
                    var x,y,i, lsi, lsj, k, patchScale, patchPosition=[0,0], patchAlpha, d;
                    
                    for (i=0; i<spec.nPatch; i++){
                        
                        //choose 2 random lsystem with index lsi and lsj
                        lsi=Math.floor(Math.random()*spec.Lsystems.length);
                        lsj=lsi;
                        while(lsj===lsi)
                            lsj=Math.floor(Math.random()*spec.Lsystems.length);
                        
                        //compute exclusion
                        d=SETTINGS.islands.patchExclusionRadius/lib_vector.distanceDim2(centers[lsi], centers[lsj]);
                        
                        
                        //take a random position between the 2 lsystems
                        k=d+((1-2*d)*Math.random());
                        //k=Math.random();
                        x=k*centers[lsi][0]+(1-k)*centers[lsj][0],
                        y=k*centers[lsi][1]+(1-k)*centers[lsj][1];
                     
                        x+=SETTINGS.islands.patchDistanceMaxRandom*Math.random(),
                        y+=SETTINGS.islands.patchDistanceMaxRandom*Math.random(),
                     
                        //position between -1 and 1
                        patchPosition[0]=(2*x/spec.size)-1,
                        patchPosition[1]=(2*y/spec.size)-1;
                                
                        //scale and transparency of the gaussian bump
                        patchScale=(spec.patchSizeAvgPx+ (Math.random()-0.5)*2*spec.patchSizeRandomPx)/spec.sizePx;
                        patchAlpha=spec.patchAlphaAvg+ (Math.random()-0.5)*2*spec.patchAlphaRandom;
                        
                        Shaders.set_node_heightMap([patchScale,patchScale], patchPosition, patchAlpha);
                        gaussianPatchVBOIndices.draw_Elements();
                    } //end draw patches loop
                    
                    _gl.bindTexture(_gl.TEXTURE_2D, null);
                    _gl.flush();                    
                    
                    Shaders.unset_heightMap_shaders();                    
                    if (debug.islandHeightMap) return;


                    
                    //COMPUTE ISLAND NORMAL MAP
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, (debug.islandNormalMap)?null:islandNormalMapFBO);
                    if (debug.islandNormalMap) {
                        CV.width=spec.sizePx, CV.height=spec.sizePx;
                        document.body.style.backgroundColor="white";
                        SCENE.stop();
                    }

                    Shaders.set_normals_shaders();
                    Shaders.set_whHSize(spec.sizePx, spec.sizePx, spec.hMax, spec.size, spec.size);
                    _gl.clearColor(0.,0.,0.,0.);
                    _gl.clear(_gl.COLOR_BUFFER_BIT);

                    _gl.activeTexture(_gl.TEXTURE0);
                    _gl.bindTexture(_gl.TEXTURE_2D, islandHeightMapTexture);
                    gaussianPatchVBO.draw_normalMap();
                    gaussianPatchVBOIndices.draw();
                    Shaders.unset_normals_shaders();
                    
                    _gl.enable(_gl.DEPTH_TEST);
                    _gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA);
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
                    
                    //generate mipmaps
                    _gl.bindTexture(_gl.TEXTURE_2D, islandNormalMapTexture);
                    _gl.generateMipmap(_gl.TEXTURE_2D);
                    _gl.bindTexture(_gl.TEXTURE_2D, null);
                    
                    _rivers=RiverSystem.instance({
                        heightMapTexture :  islandNormalMapTexture,
                        hMax : spec.hMax,
                        sizePx : spec.sizePx,
                        width : spec.size,
                        height : spec.size,
                        rain: 0.001
                    });
            
                }, //end compute
                
                //draw in the render loop
                draw: function(){
                     //DISTANCE TEST
                     var distance=VUE.distanceToCamera(spec.centre);
                     if (distance>SETTINGS.islands.hideDistance) return false;
                     
                     //DRAW SUPER ISLAND
                     Shaders.set_islandHeightMapSurface_shaders();
                     Shaders.set_fog_islandHeightMapSurface(SETTINGS.fog.dMin, SETTINGS.fog.dMax, SETTINGS.fog.color)
                     VUE.drawIslandHeightMapSurface();
                
                     Shaders.set_hMax_islandHeightMapSurface(spec.hMax);
                     Shaders.set_scaleUV_islandHeightMapSurface(spec.scaleUV, spec.scaleUV);
                     Shaders.set_dim_islandHeightMapSurface(scaleSurface, centre2d);
                    
                     //draw Island height
                    _gl.activeTexture(_gl.TEXTURE1);
                    _gl.bindTexture(_gl.TEXTURE_2D, islandNormalMapTexture);
                    _gl.activeTexture(_gl.TEXTURE2);
                    normalsTexture.draw();
                    _gl.activeTexture(_gl.TEXTURE3);
                    if (_rivers) _rivers.draw();
                    _gl.activeTexture(_gl.TEXTURE0);
                    colorTexture.draw();
                    
                    LodGrids.drawAsIslandHeightMapSurface(matrix, distance);

                    Shaders.unset_islandHeightMapSurface_shaders();
                    
                    
                    //draw Lsystems
                    _gl.activeTexture(_gl.TEXTURE3);
                    _gl.bindTexture(_gl.TEXTURE_2D, islandNormalMapTexture);
                    
                    lsystems.map(drawLsystem);
                     
                    return true;
                },
                
                drawPhysics: function(){
                    lsystems.map(function(ls){
                        ls.drawPhysics(_dt);
                    });
                    
                    //LOD for water simulation refresh
                    if (VUE.distanceToCamera(spec.centre)<SETTINGS.islands.riversRefreshDistance) {
                        _rivers.compute(_dt);
                    }
                },
                
                moveNodesAbove: function() { //used after heightmap computation to move nodes above the heightmap
                    //draw heightmap to get it with readpixel
                    var _pixelsBuffer=new Uint8Array(spec.sizePx*spec.sizePx*4);
                    
                    //read island heightmap pixels
                     _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);

                     Shaders.set_textureRead_shaders();
                      _gl.viewport(0.0, 0.0, spec.sizePx, spec.sizePx);
                     _gl.clearColor(0.,0.,0.,0.);
                     _gl.clear(_gl.COLOR_BUFFER_BIT);
                     _gl.disable(_gl.DEPTH_TEST);

                     _gl.bindTexture(_gl.TEXTURE_2D, islandHeightMapTexture);
                     gaussianPatchVBO.draw_textureRead();
                     gaussianPatchVBOIndices.draw();
                     
                     _gl.flush();                     
                     _gl.readPixels(0,0,spec.sizePx, spec.sizePx, _gl.RGBA, _gl.UNSIGNED_BYTE, _pixelsBuffer);

                     Shaders.unset_textureRead_shaders();
                    
                     _gl.enable(_gl.DEPTH_TEST);

                     //move nodes
                     var moveLsystem=function(lsystem){
                        var nodes=lsystem.get_nodes();
                        var hMaxAABB=0, hMinAABB=0;
                        
                        //get the pixel heightmap color from xPx and yPx, between 0 and 255
                        //xPx and yPx between 0 and spec.sizePx
                        var getH255=function(xPx,yPx){
                            //get the pixel index on the readpixel data
                            var i=xPx+spec.sizePx*yPx;
                            return _pixelsBuffer[4*i]; //red channel -> height
                        }
                        
                        nodes.map(function(node){ //move node
                            //compute x,y in texture UV (between 0 and 1)
                            //of the node on the island heightmap
                            var x=0.5+(node.position[0]-spec.centre[0])/spec.size,
                                y=0.5+(node.position[1]-spec.centre[1])/spec.size;

                            //node.position[2]+=spec.hMax; return;
                            if (x<0 || y<0 || x>1 || y>1) return; //node is out of the island heightmap
                            
                           
                            //transform UV coordinates into pixel coordinates
                            var xPx=x*spec.sizePx,
                                yPx=y*spec.sizePx;
                            
                            var x1=Math.floor(xPx), y1=Math.floor(yPx),
                                x2=Math.ceil(xPx),  y2=Math.ceil(yPx);
                                    
                            //height between 0 and 255
                            /*var h255=((x1-x2)*(y1-y2))?lib_maths.bilinear_interpolation(
                                    xPx, yPx,
                                    x1, y1,
                                    x2, y2,
                                    getH255(x1,y1),
                                    getH255(x1,y2),
                                    getH255(x2,y1),
                                    getH255(x2,y2)
                                    ):getH255(x1,y1);*/
                            var h255=lib_maths.bilinear_interpolation(
                                    xPx, yPx,
                                    x1, y1,
                                    x2, y2,
                                    getH255(x1,y1),
                                    getH255(x1,y2),
                                    getH255(x2,y1),
                                    getH255(x2,y2)
                                    );
                            //for debug - h with no interpolation
                            //var h255 = getH255(Math.round(xPx), Math.round(yPx));
                            
                            var h=spec.hMax*h255/255; //height in world coordinates;

                            //move the node, and also apply sphere offset
                            node.position[2]+=h+SETTINGS.sphere.zOffset;
                            hMaxAABB=Math.max(h, hMaxAABB),
                            hMinAABB=Math.min(h, hMinAABB);
                        
                        });//end nodes map
                        
                        var AABB=lsystem.get_AABB();
                        
                        //move the bounding box to be able to compute a nice octree
                        AABB.zMax+=hMaxAABB+SETTINGS.sphere.zOffset,
                        AABB.zMin+=hMinAABB+SETTINGS.sphere.zOffset;
             
                        lsystem.computeOctree(); 
                     }; //end Lsystems map
                     
                     lsystems.map(moveLsystem);
                     
                     
                } //end moveNodesAbove
                
                
            }; //end that
            
            that.compute();
            if (!debug.islandHeightMap && !debug.islandNormalMap){
                that.moveNodesAbove();
            }
            return that;
            
        } //end instance
        
    };
    
    
})();

