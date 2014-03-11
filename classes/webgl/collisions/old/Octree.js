/*
 * spec.indices : tableau d'indices des faces
 * spec.vertices : tableau des vertex
 * spec.vTaille : nombre d'éléments d'un vertex
 */
var Octree=(function() {
    return {
        instance: function(spec) {
            //détermine le tableau des faces
            var faces=[], p, co, N_faces=spec.indices.length/3, f, indice;
            for (f=0; f<N_faces; f++) {               //boucle sur les faces
                var pts=[[0,0,0], [0,0,0], [0,0,0]];
                for (p=0; p<3; p++) {                 //boucle sur les points de la face
                    indice=spec.indices[f*3+p];       //indice du vertex
                    for (co=0; co<3; co++) {          //boucle sur les coordonnées du point
                        pts[p][co]=spec.vertices[indice*spec.vTaille+co];                     
                    }                    
                }
                faces.push(pts);
            }

            //détermine la AABB
            var points=[], N_points=spec.vertices.length/spec.vTaille;
            for (p=0; p<N_points; p++) {
                points.push([
                    spec.vertices[p*spec.vTaille],
                    spec.vertices[p*spec.vTaille+1],
                    spec.vertices[p*spec.vTaille+2]
                ]);
            }
            var AABB=lib_intersect.get_AABB(points);
            lib_vector.add(AABB.dim, [0.05,0.05,0.05]);

            var racine=Boite.instance({C: AABB.centre, dim: AABB.dim, faces: faces, maxFaces: 16});
           
            return {
                intersect: function(centre,u) {                    
                    return racine.intersect(lib_intersect.plucker_axe(centre, u), centre, u);
                }
            }
        }
    }
})();

