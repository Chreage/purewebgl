/*
 * une boite est un parallépipède rectangle contenant :
 * - soit un tableau de faces
 * - soit 8 autres boites
 * Elle est exclusivement utilisée par la classe Octree
 *
 * paramètres :
 * spec.C : centre de la boite
 * spec.dim : dimensions de la boite
 * spec.faces : tableau des faces
 * spec.maxFaces : nombre maximal de faces dans une boite
 */
var Boite=(function() {
    return {
        instance: function(spec) {
            var pluck_boite=lib_intersect.plucker_boite(spec.C, spec.dim);

            var i,F=[], sous_boites=[];            
            for (var i=0; i<spec.faces.length; i++) {       //boucle sur les faces                
                if (lib_intersect.intersect_boite_tri(spec.C, spec.dim, spec.faces[i])) {
                    F.push(spec.faces[i]);
                }
            }
            var feuille=(F.length>spec.maxFaces);

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
                                faces: F,
                                maxFaces: spec.maxFaces
                            }));
                        }
                    }
                }
            } else {
                //calcule les coordonnées de plucker des arrêtes des faces
                var F_plucker=[];                
                for (i=0; i<F.length; i++) {                    
                    F_plucker.push(lib_intersect.plucker_tri(F[i][0], F[i][1], F[i][2]));
                }
            }


            return {
                is_feuille: function() {
                    return feuille;
                },
                
                intersect: function(plucker_rayon, P, u) {
                    // si le rayon n'intersecte pas la boite retourne faux
                    if (!lib_intersect.intersect_ray_boite(plucker_rayon, pluck_boite)) return false;
                    var d_min=99999999, intersection_proche=false;
                    if (feuille) {                        
                        //teste toutes les faces de la feuille
                        var i, intersection;
                        for (var i=0; i<F_plucker.length; i++) {                            
                            if (lib_intersect.intersect_ray_tri(plucker_rayon, F_plucker[i])) {
                                intersection=lib_intersect.intersection_point_ray_tri(F[i],P,u);
                                if (intersection) {
                                    if (intersection.d<d_min) {
                                        d_min=intersection.d;
                                        intersection_proche=intersection;
                                    }
                                }
                            }
                        }
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


