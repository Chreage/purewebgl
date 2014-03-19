/*
 * une boite est un parallépipède rectangle contenant :
 * - soit un tableau de nodes
 * - soit 8 autres boites
 * Elle est exclusivement utilisée par la classe Octree
 *
 * paramètres :
 * spec.AABB : axis aligned bounding box
 * spec.nodes : nodes array
 * spec.maxNodes: 32
 *
 */
var Boite=(function() {
    return {
        instance: function(spec) {
            var pluck_boite=lib_intersect.plucker_boite(spec.C, spec.dim);

            var i,inside_nodes=[], sous_boites=[];

            spec.nodes.map(function(node){
                if (lib_intersect.intersect_boite_sphere_permissif(spec.C, spec.dim, node.position, node.scale)) {
                    inside_nodes.push(node);
                }
            });

            
            var feuille=(inside_nodes.length<spec.maxNodes);
            //console.log(inside_nodes.length, feuille);

            if (!feuille) {
                //subdivise la boite en 8 boites filles
                var x,y,z;
                var dim_sousBoite=lib_vector.halfNew(spec.dim);
                for (x=-0.5; x<=0.5; x++) {
                    for (y=-0.5; y<=0.5; y++) {
                        for (z=-0.5; z<=0.5; z++) {
                            sous_boites.push(Boite.instance({
                                C: [
                                    spec.C[0]+x*spec.dim[0]/2,
                                    spec.C[1]+y*spec.dim[1]/2,
                                    spec.C[2]+z*spec.dim[2]/2
                                ],
                                dim: dim_sousBoite,
                                nodes: inside_nodes,
                                maxNodes: spec.maxNodes
                            }));
                        }
                    }
                }
            } 

            return {
                is_feuille: function() {
                    return feuille;
                },
                
                intersect: function(plucker_rayon, P, u) {
                    // si le rayon n'intersecte pas la boite retourne faux
                    if (!lib_intersect.intersect_ray_boite(plucker_rayon, pluck_boite)) return false;
                    var d_min=1e12, intersection_proche=false;
                    if (feuille) {                        
                        //teste toutes les spheres de la feuille
                        var i, intersection=false, node, d;
                        for (i=0; i<inside_nodes.length; i++) {
                            node=inside_nodes[i];
                            if (node.weight<WEIGHTNODEMIN-WEIGHTALPHATOL) continue; //pick visible only
                            if (lib_intersect.intersect_ray_sphere(P,u,node.position, node.scale)) {
                                d=lib_vector.distance(node.position, P);
                                if (d<d_min){
                                    d_min=d;
                                    if (!intersection) intersection={}
                                    intersection.d=d_min;
                                    intersection.node=node;
                                    intersection.picked=true;
                                }
                            }
                        }
                        intersection_proche=intersection;
                    } else {
                        //teste si le rayon intersecte les boites filles
                        for(var i=0; i<8; i++) {                            
                            intersection=sous_boites[i].intersect(plucker_rayon, P, u);
                            if (intersection) {
                                if (intersection.d<d_min) {
                                    d_min=intersection.d;
                                    intersection_proche=intersection;
                                }
                            }
                        }
                    }
                    if (intersection_proche) return intersection_proche;
                    return false;
                }

            }
        }
    }
})();


