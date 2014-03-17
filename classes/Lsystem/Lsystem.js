/*
 * Create a Lsystem
 * spec.centre : vec3 array - centre
 * spec.nGenerations : int - number of generations
 * spec.list : list of items - string array
 * spec.gap : gap between 2 items in spec.list
 * spec.offset : item offset - must be < spec.gap
 *
 */
var Lsystem=(function() {
	//////////////////////////////////////////////////////////////////////////////////
	//		createNode()							//
	//////////////////////////////////////////////////////////////////////////////////
	var ScaleAdjust = 0.8,
            ScaleBranch = 6,
            RotateZ = Math.PI/5;


	function createNode(color, nGeneration, position, scale, label, AABB){
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
                image: false,
                weight: 0,
                absPosition: [0,0,0]
            }
	}

     return {
         instance: function(spec){            

            var nodes=[];
            
            var sphere=Sphere.instance({
                centre: [0,0,0],
                rayon: 1,
                bandes: 32,
                couronnes: 32
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
            var firstGeneration	= createNode('white', 0, spec.centre || [0,0,0], 1, spec.list[curs], AABB);
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
                    var child1	= createNode('white', node.generation+1, [x,y,z], sc, spec.list[curs], AABB);
                    nodes.push(child1);

                    curs+=spec.gap;
                    if (curs>spec.list.length) return;
                    
                    x=node.position[0]-sc*ScaleBranch*sRotateZ,
                    y=node.position[1]-sc*ScaleBranch*cRotateZ,
                    z=node.position[2];

                    var child2	= createNode('white', node.generation+1, [x,y,z], sc, spec.list[curs], AABB);
                    
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
                size: 512,
                margin: 2,
                gl: GL,
                nodes: nodes,
                hMax: 4,
                centre: spec.centre
            });

            //move spheres above heightmap
            heightmapSurface.moveNodesAbove();

            //compute octree
            var octree=Octree.instance({
                AABB: AABB,
                nodes: nodes
            });

            //compte absolute position
            nodes.map(function(node){
                node.absPosition[0]=node.position[0]+spec.centre[0],
                node.absPosition[1]=node.position[1]+spec.centre[1],
                node.absPosition[2]=node.position[2]+spec.centre[2];
            });
            
            var drawNode=function(node){
                if (node.weight<WEIGHTNODEMIN) return;
                NNODESDISPLAYED++;
                SHADERS.set_hightLight(node.highlight);
                if (node.generation<CURRENTGEN) {
                    sphere.drawInstance(node.scale, node.position);
                }
            }

            var that={
                draw: function() {
                    sphere.drawResources();
                    nodes.map(drawNode);
                    
                    heightmapSurface.drawSurface();
                },

                pick: function(camera, u) {
                    var pick=octree.intersect(camera, u);
                    if (pick) pick.lsystem=that;
                    return pick;
                },

                sort: function(camera){
                    //refresh weight
                    nodes.map(function(node){
                        node.weight=lib_vector.distance(node.position, camera);
                    })

                    //sort by weight
                    nodes.sort(function(nodeA, nodeB){
                        return nodeA.weight-nodeB.weight;
                    });
                }


            }//end that
            return that;
         } //end instance func
     } //end return
})();