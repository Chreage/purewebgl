/*
 * Create a Lsystem
 * spec.centre : vec3 array - centre
 * spec.islandNumber : number of the island
 * spec.lsystemNumber : number of the lsystem
 */
var Lsystem=(function() {
     var __NimageReqs=0,
         __NtexturesLoaded=0,
         __LsystemWithTextureLoaded=[];
     
     return {
         instance: function(spec){
            var _nodes=[], //nodes array
                _textureLoaded=false,
                _textureLoading=false,
                _textureWidth,
                _textureHeight,
                _textureIconUV=[.5,.5],
                _texture=false,
                _draw=false;

            //bounding box - used to compute octree
            var AABB={
                xMax: -1e12,
                xMin: 1e12,
                yMax: -1e12,
                yMin: 1e12,
                zMax: -1e12,
                zMin: 1e12
            };
            
            spec.nodes.map(function(node, index){
                if (SETTINGS.debug.NnodesMaxPerLsystem && index>SETTINGS.debug.NnodesMaxPerLsystem) return;
                var generation=parseInt(node.p);
                var scale=Math.pow((13-generation)/13,2);
                
                var position=[
                    parseFloat(node.x)+spec.centre[0],
                    parseFloat(node.y)+spec.centre[1],
                    SETTINGS.Lsystems.hMax*scale+spec.centre[2]
                ];
                
                if (SETTINGS.debug.NnodesMax && NNODES>SETTINGS.debug.NnodesMax) return;
                NNODES++;
                
                AABB.xMax=Math.max(AABB.xMax, position[0]+scale),
                AABB.xMin=Math.min(AABB.xMin, position[0]+scale),
                AABB.yMax=Math.max(AABB.yMax, position[1]+scale),
                AABB.yMin=Math.min(AABB.yMin, position[1]+scale),
                AABB.zMax=Math.max(AABB.zMax, position[2]+scale),
                AABB.zMin=Math.min(AABB.zMin, position[2]+scale);

                _nodes.push({
                    scale: scale,
                    generation: generation,
                    position: position,
                    highlight: 0,
                    label: node.url,
                    uv: [parseFloat(node.u), parseFloat(node.v)],
                    weight: 0,
                    alpha: 1
                });
            });
            
            delete(spec.nodes);
            
            //compute heightMap
            var heightmapSurface=HeightmapSurface.instance({
                AABB : AABB,
                size: SETTINGS.Lsystems.heightmapSizePx,
                margin: SETTINGS.Lsystems.heightmapMargin,
                gl: GL,
                nodes: _nodes,
                hMax: SETTINGS.Lsystems.hMax,
                centre: spec.centre,
                erodeTexturesSet: ERODETEXTURESSET
            });

            //move spheres above heightmap
            heightmapSurface.moveNodesAbove();

            //compute octree
            var octree=false;
            
          //  var defaultTextureBinded=false;
            var alpha=-1;
            
            var drawNode=function(node){
                if (node.alpha<0) return;
                //if (node.weight<WEIGHTNODEMIN) return;
                NNODESDISPLAYED++;

                if (node.generation<CURRENTGEN) {
                    Shaders.set_hightLight(node.highlight);
                    if (node.alpha!==alpha)
                    {
                        Shaders.set_alpha(node.alpha);
                        alpha=node.alpha;
                    }
                   // if (node.alpha<1) node.alpha+=0.01;
                    if (_draw) Shaders.set_iconUV(node.uv);
                    LodSpheres.draw(node);
                }
            };
            
            var sortNode=function(nodeA, nodeB){
                return nodeB.weight-nodeA.weight;
            };

            var that={
                // GETTERS
                get_sizeX: function() {
                    return AABB.xMax-AABB.xMin;
                },
                get_sizeY: function() {
                    return AABB.yMax-AABB.yMin;
                },
                get_sizeZ: function() {
                    return AABB.zMax-AABB.zMin;
                },
                get_nodes: function() {
                    return _nodes;
                },
                get_AABB: function(){
                    return AABB;
                },
                get_centre: function() {
                    return spec.centre;
                },
                
                //COMPUTERS
                computeOctree: function(){
                    if (!SETTINGS.debug.noOctree){
                        octree=Octree.instance({
                            AABB: AABB,
                            nodes: _nodes
                        });
                    }
                },
                
                //unload webgl resources to free GPU mem. called by SuperIsland
                webglUnload: function() {
                    that.unload_texture();
                    heightmapSurface.webglUnload();
                },
                
                webglLoad : function() {
                    heightmapSurface.webglLoad();
                },
                
                //DYNAMIC METHODS
                draw: function() {
                    //heightMapSurface shader is already in use
                    //draw heightMap
                    heightmapSurface.drawSurface();
                    
                    //draw Spheres
                    if (SETTINGS.debug.hideSpheres) return;
                    
                    
                    if (!_textureLoaded && !_textureLoading && __NimageReqs<SETTINGS.culling.maxSpheresTextureAtlasReqs && VUE.distanceToCamera(spec.centre)<SETTINGS.culling.maxTextureDistance) {
                        _textureLoading=true,
		        __NimageReqs++;
                        var textureImage=new Image();
                        textureImage.onload=function() {
			    __NimageReqs--,
                            __NtexturesLoaded++,
                            _textureLoading=false,
                            _textureLoaded=true,
                            __LsystemWithTextureLoaded.push(that),
                            _texture=GL.createTexture(),
                            _textureWidth=textureImage.width,
                            _textureHeight=textureImage.height;
                            
                            //unload textures
                            if (__LsystemWithTextureLoaded.length>SETTINGS.culling.maxLsystemTextureAtlasLoaded){
                                console.log("Lsystems - garbage collector");
                                __LsystemWithTextureLoaded.sort(function(lsa,lsb){
                                    return VUE.distanceToCamera(lsa.get_centre())-VUE.distanceToCamera(lsb.get_centre());
                                });
                                for (var i=0; i<SETTINGS.culling.lsystemTextureAtlasUnload; i++){
                                    __LsystemWithTextureLoaded.unload_texture();
                                }
                                __LsystemWithTextureLoaded.splice(0,SETTINGS.culling.lsystemTextureAtlasUnload);
                            }
                            
                    
                            GL.bindTexture(GL.TEXTURE_2D, _texture);
                            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
                            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST_MIPMAP_LINEAR);
                            GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, false);
                            GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, textureImage);
                            GL.generateMipmap(GL.TEXTURE_2D);
			    GL.bindTexture(GL.TEXTURE_2D, null);
                            
                            _textureIconUV[0]=SETTINGS.Lsystems.faviconSizePx/_textureWidth,
                            _textureIconUV[1]=SETTINGS.Lsystems.faviconSizePx/_textureHeight;
                            textureImage=null;
                        };
			var textureURL=SETTINGS.Lsystems.world+"textures/atlas_"+spec.islandNumber+"_"+spec.lsystemNumber+".jpg";
			console.log("load texture ", textureURL);
                        textureImage.src=textureURL;
                    } else if (_textureLoaded) {
                        _draw=true;
                    } //end if textureLoaded
                    
                    //if (_draw) {
                        //console.log('plapp');
                        Shaders.set_defaultShader();
                        LodSpheres.reset();
                        GL.bindTexture(GL.TEXTURE_2D, (_draw)?_texture:Texture.get_default());

                        Shaders.set_textureIconUV(_textureIconUV);
                    //}
                    alpha=-1;

                    var i, node;
                    for (i=0; i<_nodes.length; i++){
                        node=_nodes[i];
                        if (node.weight<WEIGHTNODEMIN-WEIGHTALPHATOL) break;
                        if (node.weight<WEIGHTNODEMIN){
                            node.alpha=1-(WEIGHTNODEMIN-node.weight)/WEIGHTALPHATOL;
                        } else {
                            node.alpha=1;
                        }
                        drawNode(node);
                    } //end for nodes
                    
                    //if (_draw) {
                        Shaders.unset_defaultShader();
                    //}
                },
                
                unload_texture: function() {
                    if (!_textureLoaded) return;
                    GL.deleteTexture(_texture);
                    _texture=null,
                    _textureLoaded=false,
                    _textureLoading=false,
                    _draw=false;
                    __NtexturesLoaded--;
                },
                
                drawPhysics: function(dt) {
                    //update water system
                    heightmapSurface.drawPhysics(dt);
                },

                pick: function(camera, u) {
                    if (!octree) return false;
                    var pick=octree.intersect(camera, u);
                    if (pick) pick.lsystem=that;
                    return pick;
                },

                sort: function(camera){
                    //refresh weight
                    _nodes.map(function(node){
                        node.weight=-(1/(1+node.scale))*lib_vector.distanceMinus(node.position, camera);
                    });

                    //sort by weight
                    _nodes.sort(sortNode);
                }


            };//end that
            return that;
         } //end instance func
     }; //end return
})();