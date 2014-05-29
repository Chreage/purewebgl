/*
 * Big island with several L-systems
 * 
 * spec.centre : center of the Island
 * spec.LsystemRadius : collision radius for Lsystems
 * spec.LsystemRadiusMargin collision radius for margins
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
 * spec.mountainTexturesSet : texture collection of mountain heightmaps
 * 
 * spec.number : number of the island
 * 
 */
var SuperIsland=(function() {
    var __islands=false, __gaussianPatchVBO,__gaussianPatchVBOIndices;
    
    var debug={
            islandHeightMap: SETTINGS.debug.islandHeightMap,
            islandNormalMap: SETTINGS.debug.islandNormalMap
        };
    var _dt=SETTINGS.physics.dt/1000;    
            
    return {
        init: function() {
            //setup gaussian patch (textured with gaussTetxure)
            __gaussianPatchVBO=VBO.instance({
                tableau_js: [
                    -0.5,-0.5,
                    -0.5,0.5,
                    0.5,0.5,
                    0.5,-0.5
                ]
            });
            __gaussianPatchVBOIndices=VBO_indices.instance({
                tableau_js: [
                    0,1,2, 0,2,3
                ]
            });
        },
        
        set_islandsData: function(data){
            __islands=data;
            
            __islands.map(function(island){
                island.loaded=false,
                island.loading=false,
                island.webglLoaded=false,
                island.instance=false;
            });
            SuperIsland.update_islands();
        },
        
        update_islands: function() {
            
            //sort islands array from nearest to furthest
            var camera=VUE.get_cameraPosition();
            __islands.sort(function(islandA,islandB){
                var dxA=islandA.xy[0]+camera[0],
                    dyA=islandA.xy[1]+camera[1],
                    dxB=islandB.xy[0]+camera[0],
                    dyB=islandB.xy[1]+camera[1];
                
                return (dxA*dxA+dyA*dyA)-(dxB*dxB+dyB*dyB);
            });
            
            
            __islands.map(function(island, islandIndex){
                if (islandIndex<4){ //island must be loaded
                    if (island.loading || island.loaded) return;
                    
                    console.log('Load island n°'+island.i+" (position : "+islandIndex+")");
                    //load island
                    if (island.webglLoaded) {
                        island.instance.webglLoad();
                        island.loaded=true;
                    } else {
                        island.loading=true;
                        lib_ajax.get(SETTINGS.Lsystems.world+'json/island_'+island.i+'.json', function(data){
                            var islandData=JSON.parse(data);
                            console.log('centre ', island.xy);

                            island.instance=SuperIsland.instance({
                                number: island.i,
                                Lsystems: islandData.lsystems,
                                centre: [island.xy[0], island.xy[1], 0],
                                LsystemRadius: SETTINGS.islands.collisionRadius,
                                LsystemRadiusMargin: SETTINGS.islands.collisionRadiusMargin,
                                size: SETTINGS.islands.size,
                                mountainTexturesSet: MOUNTAINTEXTURESSET
                            }); 
                            SCENE.add_island(island.instance);

                            island.webglLoaded=true,
                            island.loaded=true,
                            island.loading=false;
                        });
                    } //end if island webglLoaded
                } else if (islandIndex <7){ //we do not care (hysteresis effect)
                    return;
                } else if (islandIndex>=7) { //island must be unloaded
                    if (island.loading || !island.loaded) return;
                    
                    SCENE.remove_island(island.instance);
                    island.instance.webglUnload();
                   
                    console.log('Unload island n°'+island.i+" (position : "+islandIndex+")");
                    island.loaded=false;
                }
            });
        },
        
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
            
    
            var matrix=lib_matrix4.get_I4(),
                _gl=GL,
                lsystems=[],
                _patches=[];
 
            var colorTexture, normalsTexture,
                islandHeightMapTexture,islandHeightMapFBO,
                islandNormalMapTexture,islandNormalMapFBO,
                scaleSurface = [spec.size, spec.size],
                centre2d=[spec.centre[0]-spec.size/2,spec.centre[1]-spec.size/2],
            
            //build Lsystems
                centers=[],
                scaleIsland=[],
                offsetIsland=[];
        
            spec.Lsystems.map(function(lspec, index){
                if (SETTINGS.debug.NlsystemsMax && index>=SETTINGS.debug.NlsystemsMax) return;
                
                
                //choose position
                var i,x,y,dx,dy,collide=true,n=0,xNorm,yNorm;
                var dxCenter, dyCenter;
                var centerExclusionRadius2=SETTINGS.islands.centerExclusionRadius*SETTINGS.islands.centerExclusionRadius;
                
                while(collide && n<100) {
                    //x and y in world units, between 0 and spec.Size
                    x=spec.LsystemRadiusMargin+Math.random()*(spec.size-2*spec.LsystemRadiusMargin),
                    y=spec.LsystemRadiusMargin+Math.random()*(spec.size-2*spec.LsystemRadiusMargin);
                    dxCenter=x-spec.size/2,
                    dyCenter=y-spec.size/2;
                    
                    if (dxCenter*dxCenter+dyCenter*dyCenter<centerExclusionRadius2) {
                        n++;
                        continue;
                    }
                    
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
                var lsystem=Lsystem.instance({
                    nodes: lspec,
                    centre: centre,
                    islandNumber: spec.number,
                    lsystemNumber: index
                });
                
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
            //var islandGaussTexture=Gauss.get_gaussTexture(_gl, spec.patchGaussSizePx, true);
            var islandGaussTexture=Gauss.get_islandGaussTexture();
             
            var drawLsystem=function(lsystem, index){
                Shaders.set_heightMapSurface_shaders();
                Shaders.set_island_heightMapSurface(spec.hMax, scaleIsland[index], offsetIsland[index]);
                if (index===0) {
                    Shaders.set_fog_heightMapSurface(SETTINGS.fog.dMin, SETTINGS.fog.dMax, SETTINGS.fog.color );
                }
                lsystem.draw();
            };
            
            var _rivers=false, _riversEnabled=false;
            
            var that={
                webglUnload: function(){
                    colorTexture.remove();
                    normalsTexture.remove();
                    _gl.deleteTexture(islandHeightMapTexture);
                    _gl.deleteTexture(islandNormalMapTexture);
                    _gl.deleteFramebuffer(islandHeightMapFBO);
                    _gl.deleteFramebuffer(islandNormalMapFBO);
                    lsystems.map(function(lsystem){
                       lsystem.webglUnload(); 
                    });
                    if (_riversEnabled) _rivers.remove();
                    delete(_rivers);
                    _rivers=false;
                },
                
                webglLoad: function() {
                    colorTexture=Texture.instance({
                        url: spec.textureColorURL || SETTINGS.islands.textureColorURL
                    }),
                        normalsTexture=Texture.instance({
                        url: spec.textureNormalsURL || SETTINGS.islands.textureNormalsURL
                    });
               
                    //create island heightmap texture
                    islandHeightMapTexture=_gl.createTexture();
                    _gl.bindTexture(_gl.TEXTURE_2D, islandHeightMapTexture);            
                    _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
                    _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.LINEAR);
                    _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
                    _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
                    _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,spec.sizePx, spec.sizePx, 0, _gl.RGBA, _gl.FLOAT, null);
                    _gl.bindTexture(_gl.TEXTURE_2D, null);


                    //setup render to texture for heightmap
                    islandHeightMapFBO=_gl.createFramebuffer();
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, islandHeightMapFBO);
                    _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, islandHeightMapTexture, 0);
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);


                    //setup normalMapTexture
                    islandNormalMapTexture=_gl.createTexture();
                    _gl.bindTexture(_gl.TEXTURE_2D, islandNormalMapTexture);
                    _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
                    _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.LINEAR);
                    _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
                    _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
                    _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,spec.sizePx, spec.sizePx, 0, _gl.RGBA, _gl.FLOAT, null);
                    _gl.bindTexture(_gl.TEXTURE_2D, null);

                    //setup render to texture for normalmap
                    islandNormalMapFBO=_gl.createFramebuffer();
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, islandNormalMapFBO);
                    _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, islandNormalMapTexture, 0);
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);

                    lsystems.map(function(lsystem){
                       lsystem.webglLoad(); 
                    });
                    that.compute();
                },
                
                computePatches: function() {
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
                        
                        _patches.push({
                            position: patchPosition,
                            alpha: patchAlpha,
                            scale: [patchScale,patchScale]
                        });
                        
                    } //end draw patches loop                    
                },
                
                compute: function(){
                    //compute height map
                    
                    if (!debug.islandHeightMap) _gl.bindFramebuffer(_gl.FRAMEBUFFER, islandHeightMapFBO);
                    
                    Shaders.set_heightMap_shaders();
                    
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
                    
                    __gaussianPatchVBO.draw_heightMap();
                    __gaussianPatchVBOIndices.bind();
                    _gl.bindTexture(_gl.TEXTURE_2D, islandGaussTexture); 
                    
                    _patches.map(function(patch){
                        Shaders.set_node_heightMap(patch.scale, patch.position, patch.alpha);
                        __gaussianPatchVBOIndices.draw_Elements();
                    });
                    
                    _gl.bindTexture(_gl.TEXTURE_2D, null);
                    _gl.flush();                    
                    
                    Shaders.unset_heightMap_shaders();                    
                    if (debug.islandHeightMap) return;


                    //COMPUTE EMBOSSING EROSION
                    if (spec.mountainTexturesSet) {
                        islandHeightMapTexture=spec.mountainTexturesSet.erode(islandHeightMapTexture, spec.sizePx, true);
                        if (!islandHeightMapTexture){ //debug mode or error happens
                            return false;
                        }
                    }

                    
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
                    __gaussianPatchVBO.draw_normalMap();
                    __gaussianPatchVBOIndices.draw();
                    Shaders.unset_normals_shaders();
                    
                    _gl.enable(_gl.DEPTH_TEST);
                    _gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA);
                    
                    
                    //generate mipmaps
                    _gl.bindTexture(_gl.TEXTURE_2D, islandNormalMapTexture);
                    _gl.generateMipmap(_gl.TEXTURE_2D);
                    _gl.bindTexture(_gl.TEXTURE_2D, null);
                    
                    if (SETTINGS.islands.enableRivers) {
                        _rivers=RiverSystem.instance({
                            heightMapTexture :  islandNormalMapTexture,
                            hMax : spec.hMax,
                            simuSizePx : spec.sizePx,
                            width : spec.size,
                            height : spec.size,
                            rain: 0.00001,
                            nPass: 1,
                            gravity: 4,
                            waterHMax: 3,
                            avgStabilizationCoeff: 0.1
                        });
                        _riversEnabled=true;
                    } //end if enableRivers
                    
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
                }, //end compute
                
                //draw in the render loop
                draw: function(){
                     //DISTANCE TEST
                     var distance=VUE.distanceToCamera(spec.centre);
                     if (distance>SETTINGS.islands.hideDistance) return false;
                     
                     //DRAW SUPER ISLAND
                     Shaders.set_islandHeightMapSurface_shaders();
                     Shaders.set_fog_islandHeightMapSurface(SETTINGS.fog.dMin, SETTINGS.fog.dMax, SETTINGS.fog.color);
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
                    if (_riversEnabled) _rivers.draw();
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
                    if (_riversEnabled && VUE.distanceToCamera(spec.centre)<SETTINGS.islands.riversRefreshDistance) {
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
                     __gaussianPatchVBO.draw_textureRead();
                     __gaussianPatchVBOIndices.draw();
                     
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
                        };
                        
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
                     
                     delete(_pixelsBuffer);
                } //end moveNodesAbove
                
                
            }; //end that
            
            that.computePatches();
            that.webglLoad();
            //that.compute();
            
    
            if (!debug.islandHeightMap && !debug.islandNormalMap){
                that.moveNodesAbove();
            }
            
            delete(spec.Lsystems);
            
            return that;
            
        } //end instance
    };
})();