/*
 * Create a Lsystem
 * spec.centre : vec3 array - centre
 * spec.nGenerations : int - number of generations
 * spec.list : list of items - string array
 * spec.gap : gap between 2 items in spec.list
 * spec.offset : item offset - must be < spec.gap
 * spec.defaultImage : url of the default texture image
 */
var Lsystem=(function() {
	var ScaleAdjust = SETTINGS.Lsystems.scaleAdjust,
            ScaleBranch = SETTINGS.Lsystems.scaleBranch,
            RotateZ = SETTINGS.Lsystems.angle;

	function createNode(nGeneration, position, scale, label, AABB){
            AABB.xMax=Math.max(AABB.xMax, position[0]+scale),
            AABB.xMin=Math.min(AABB.xMin, position[0]+scale),
            AABB.yMax=Math.max(AABB.yMax, position[1]+scale),
            AABB.yMin=Math.min(AABB.yMin, position[1]+scale),
            AABB.zMax=Math.max(AABB.zMax, position[2]+scale),
            AABB.zMin=Math.min(AABB.zMin, position[2]+scale);

            return {
                scale: scale,
                children: [],
                generation: nGeneration,
                position: position,
                highlight: 0,
                label: label,
                imageAvailable: true,
                textureLoaded: false,
                imageBusy: false,
                image: false,
                texture: false,
                weight: 0,
                alpha: 1
            }
	}

     return {
         instance: function(spec){
            var nodes=[];
            
            var sphere=Sphere.instance({
                centre: [0,0,0],
                rayon: 1,
                bandes: SETTINGS.sphere.nBands,
                couronnes: SETTINGS.sphere.nCrowns
            });

            var maxGeneration	= spec.nGenerations || 10;
            var curs=spec.offset; //cursor in the label list


            //bounding box - used to compute octree
            var AABB={
                xMax: -1e12,
                xMin: 1e12,
                yMax: -1e12,
                yMin: 1e12,
                zMax: -1e12,
                zMin: 1e12
            }
            
            //create first node :
            var firstGeneration	= createNode(0, spec.centre || [0,0,0], 1, spec.list[curs], AABB);
            nodes.push(firstGeneration);

            function computerNextGeneration(){           
                nodes.map(function(node){
                    if (node.children.length) return;
                   
                    //node has no children -> create children
                    var angle=node.generation*RotateZ;
                    var cRotateZ=Math.cos(angle),
                        sRotateZ=Math.sin(angle);

                    var n=node.generation+1;
                    var sc=node.scale*ScaleAdjust; //n/(n+ScaleAdjust);

                    curs+=spec.gap;
                    if (curs>spec.list.length) return;

                    var x=node.position[0]+sc*ScaleBranch*sRotateZ,
                        y=node.position[1]+sc*ScaleBranch*cRotateZ,
                        z=node.position[2];
                    var child1	= createNode(node.generation+1, [x,y,z], sc, spec.list[curs], AABB);
                    nodes.push(child1);

                    curs+=spec.gap;
                    if (curs>spec.list.length) return;
                    
                    x=node.position[0]-sc*ScaleBranch*sRotateZ,
                    y=node.position[1]-sc*ScaleBranch*cRotateZ,
                    z=node.position[2];

                    var child2	= createNode(node.generation+1, [x,y,z], sc, spec.list[curs], AABB);
                    
                    node.children=[nodes.length, nodes.length+1];
                    nodes.push(child2);
                });
            }

            var nGeneration;
            for(nGeneration = 1; nGeneration < maxGeneration; nGeneration++){
                 computerNextGeneration();                   
            }

            
            //compute heightMap
            var heightmapSurface=HeightmapSurface.instance({
                AABB : AABB,
                size: SETTINGS.Lsystems.heightmapSizePx,
                margin: SETTINGS.Lsystems.heightmapMargin,
                gl: GL,
                nodes: nodes,
                hMax: SETTINGS.Lsystems.hMax,
                centre: spec.centre
            });

            //move spheres above heightmap
            heightmapSurface.moveNodesAbove();

            //compute octree
            var octree=Octree.instance({
                AABB: AABB,
                nodes: nodes
            });

            //create default texture image
            var defaultTexture=GL.createTexture(),
                defaultTextureLoaded=false;
        
            var defaultTextureImage=new Image();
            defaultTextureImage.onload=function(event){
                GL.bindTexture(GL.TEXTURE_2D, defaultTexture);
                GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, defaultTextureImage);
                GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
                GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR_MIPMAP_LINEAR);
                GL.generateMipmap(GL.TEXTURE_2D);
                GL.bindTexture(GL.TEXTURE_2D, null);
                defaultTextureLoaded=true;
            }
            defaultTextureImage.src=spec.defaultImage || SETTINGS.Lsystems.defaultTextureImageURL;
            
            
            
            var defaultTextureBinded=false;
            var alpha=-1;
            
            var drawNode=function(node){
                //if (node.weight<WEIGHTNODEMIN) return;
                NNODESDISPLAYED++;
                if (NIMAGEREQS<MAXIMAGEREQS && !node.imageBusy && node.imageAvailable && !node.textureLoaded){
                    //request texture
                    node.imageBusy=true,
                    node.image=new Image();
                    node.image.onload=function(event) {
                        node.imageAvailable=true;
                        node.imageBusy=false;
                        node.texture=GL.createTexture();
                        GL.bindTexture(GL.TEXTURE_2D, node.texture);
                        GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, node.image);
                        GL.texParameteri( GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE );
                        GL.texParameteri( GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE );
                        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
                        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST_MIPMAP_LINEAR);
                        GL.generateMipmap(GL.TEXTURE_2D);
                        GL.bindTexture(GL.TEXTURE_2D, null);
                        node.textureLoaded=true;
                        node.image=null;
                        NIMAGEREQS--;
                    }
                    node.image.onerror=function(event){
                        node.imageAvailable=false;
                        node.imageBusy=false;
                        NIMAGEREQS--;
                    }
                    node.image.src='php/favicons/favicons/'+node.label.replace(/\./g, '_')+'.png';
                    console.log("get ", node.image.src);
                    NIMAGEREQS++;
                }
                if (node.textureLoaded) {
                     GL.bindTexture(GL.TEXTURE_2D, node.texture);
                     defaultTextureBinded=false;
                } else if (!defaultTextureBinded && defaultTextureLoaded){
                     GL.bindTexture(GL.TEXTURE_2D, defaultTexture);
                     defaultTextureBinded=true;
                }
               
                if (node.generation<CURRENTGEN) {
                    Shaders.set_hightLight(node.highlight);
                    if (node.alpha!==alpha)
                    {
                        Shaders.set_alpha(node.alpha);
                        alpha=node.alpha;
                    }
                   // if (node.alpha<1) node.alpha+=0.01;
                    sphere.drawInstance(node.scale, node.position);
                }
            };
            
            var sortNode=function(nodeA, nodeB){
                return nodeB.weight-nodeA.weight;
            };

            var that={
                get_sizeX: function() {
                    return AABB.xMax-AABB.xMin;
                },
                get_sizeY: function() {
                    return AABB.yMax-AABB.yMin;
                },
                get_sizeZ: function() {
                    return AABB.zMax-AABB.zMin;
                },
                draw: function() {
                    //heightMapSurface shader is already in use
                    //draw heightMap
                    heightmapSurface.drawSurface();
                    
                    //draw Spheres
                    Shaders.set_defaultShader();
                    sphere.drawResources();
                    defaultTextureBinded=false;
                    
                    
                    alpha=-1;
                    for (var i=0; i<nodes.length; i++){
                        if (nodes[i].weight<WEIGHTNODEMIN-WEIGHTALPHATOL) break;
                        if (nodes[i].weight<WEIGHTNODEMIN){
                            nodes[i].alpha=1-(WEIGHTNODEMIN-nodes[i].weight)/WEIGHTALPHATOL;
                        } else {
                            nodes[i].alpha=1;
                        }
                        drawNode(nodes[i]);
                    }
                    Shaders.unset_defaultShader();
                    
                },

                pick: function(camera, u) {
                    var pick=octree.intersect(camera, u);
                    if (pick) pick.lsystem=that;
                    return pick;
                },

                sort: function(camera){
                    //refresh weight
                    nodes.map(function(node){
                        node.weight=-(1/(0+node.scale))*lib_vector.distanceMinus(node.position, camera);
                        //if (node.weight<WEIGHTNODEMIN) node.alpha=0;
                        if (node.weight<WEIGHTNODEMIN-WEIGHTGCTOL){
                            //free the texture
                            if (node.imageAvailable && node.textureLoaded 
                                && !node.imageBusy) {
                                node.imageAvailable=true,
                                node.textureLoaded=false;
                                GL.deleteTexture(node.texture);
                                node.texture=null;
                            }
                        }
                    });

                    //sort by weight
                    nodes.sort(sortNode);
                }


            };//end that
            return that;
         } //end instance func
     }; //end return
})();