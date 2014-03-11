/*
 * spec.AABB : Axis Aligned Bounding Box
 * spec.nodes : elements
 */
var Octree=(function() {
    return {
        instance: function(spec) {
            spec.AABB.centre=[
                (spec.AABB.xMax+spec.AABB.xMin)/2,
                (spec.AABB.yMax+spec.AABB.yMin)/2,
                (spec.AABB.zMax+spec.AABB.zMin)/2
            ];
            spec.AABB.dim=[
                spec.AABB.xMax-spec.AABB.xMin,
                spec.AABB.yMax-spec.AABB.yMin,
                spec.AABB.zMax-spec.AABB.zMin
            ];

            
            var racine=Boite.instance({C: spec.AABB.centre, dim: spec.AABB.dim, nodes : spec.nodes, maxNodes: 32});


            return {
                intersect: function(centre,u) {                    
                    return racine.intersect(lib_intersect.plucker_axe(centre, u), centre, u);
                }
            }
        }
    }
})();

