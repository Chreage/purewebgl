var lib_intersect={

    /*
     * retourne la normale au triangle T
     * tri est un tableau de 3 points
     */
    normale_triangle: function(tri) {
        var AB=lib_vector.subNew(tri[1],tri[0]),
            AC=lib_vector.subNew(tri[2], tri[0]);
        var N=lib_vector.prodVect(AB, AC);        
        lib_vector.normalize(N);
        return N;
    },

    /*
     *projette le point P sur l'axe défini par un vecteur directeur unitaire u et un point O
     *retourne son abscisse sur l'axe par rapport au point O
     */
    abscisse_point_axis: function(O, u, P) {
        var OP=lib_vector.subNew(P,O);
        return lib_vector.dot(OP, u);
    },

    /*
     *retourne une liste d'arrêtes du triangle T, spécifié par une liste de 3 points
     */
    get_tri_arretes: function(T) {
        return [lib_vector.subNew(T[1], T[0]),
                lib_vector.subNew(T[2], T[1]),
                lib_vector.subNew(T[0], T[2])];
    },

    /*
     * fonction de coincidence
     * A et B sont des listes de points
     * Ru est le vecteur unitaire de l'axe R
     * RP est un point de l'axe R
     * retourne vrai si ça coincide
     */
    SAT: function(A,B,Ru,RP) {
        var xA=[], xB=[], i, r=true;
        for (i=0; i<A.length; i++) {
            xA.push(this.abscisse_point_axis(RP, Ru, A[i]));
        }
        xA.sort(function(a,b) {return a-b});

        for (i=0; i<B.length; i++) {
            xB.push(this.abscisse_point_axis(RP, Ru, B[i]));
        }
        xB.sort(function(a,b) {return a-b});
        
        if((xA[0]>xB[xB.length-1]) || (xA[xA.length-1]<xB[0])) {            
            r=false;
        }
        
        xA=null; xB=null;
        return r;
    },

    /*
     *test intersection between an AABB with center C and dimension dim
     *and a sphere of center P and radius r
     */
    intersect_boite_sphere_permissif: function(C, dim, P,r){
        return (
            P[0]<C[0]+dim[0]*0.5+r && P[0]>C[0]-dim[0]*0.5-r
            && P[1]<C[1]+dim[1]*0.5+r && P[1]>C[1]-dim[1]*0.5-r
            && P[2]<C[2]+dim[2]*0.5+r && P[2]>C[2]-dim[2]*0.5-r
        );
    },

    /*
     * Teste l'intersection entre un parallélépipède rectangle C et un triangle T
     * T est une liste de points d'un triangle
     * Cd=[Cx, Cy, Cz] sont respectivement les dimensions suivant x, y, z du parallélépipède rectangle
     * CO est la position du centre du parallélépipède rectangle
     * C est aligné sur les axes du repère
     *
     * Il est possible de beaucoup beaucoup optimiser cette fonction
     */
    intersect_boite_tri: function(CO, Cd, T) {
        //créé l'ensemble de points du parallélépipède rectangle
        var C=[], x,y,z, O=[0,0,0], i,j, W;
        for (x=-0.5; x<=0.5; x++) {
            for (y=-0.5; y<=0.5; y++)  {
                for (z=-0.5; z<=0.5; z++) {
                    C.push([CO[0]+x*Cd[0], CO[1]+y*Cd[1], CO[2]+z*Cd[2]]);
                }
            }
        }        

        //axes de C :
        var Caxes=[[1,0,0], [0,1,0], [0,0,1]];

        //arrêtes de T
        var Tarretes=this.get_tri_arretes(T);

        //Teste s'il y a un axe séparateur orthogonal à T
        var N=this.normale_triangle(T);
        if (!this.SAT(C, T, N, O)) return false;        

        //Teste s'il y a un axe séparateur orthogonal à une face de C
        for (i=0; i<3; i++) {
            if (!this.SAT(C, T, Caxes[i], O)) return false;
        }
        

        //Teste s'il y a un axe séparateur orthogonal à une arrête de T
        for (i=0; i<3; i++) {
            for (j=0; j<3; j++) {
                W=lib_vector.prodVect(Caxes[i], Tarretes[j]);
                lib_vector.normalize(W);
                if (!this.SAT(C,T,W,O)) return false;
            }
        }
        return true;
    },

    /*
     * détermine la boite englobante alignée sur les axes d'un tableau de points
     * retourne un objet ayant pour attributs :
     * - centre, le centre de la AABB
     * - dim, les dimensions de la AABB
     */
    get_AABB: function(points) {
        var max=lib_vector.copyNew(points[0]),
            min=lib_vector.copyNew(points[0]);

        var p,c;
        for (p=0; p<points.length; p++) {
            for (c=0; c<3; c++)  {
                if (points[p][c]<min[c]) min[c]=points[p][c];
                if (points[p][c]>max[c]) max[c]=points[p][c];
            }
        }
        var dim=lib_vector.subNew(max, min);        
        return {dim : dim,
                centre: lib_vector.addHalfNew(min, dim)};
    },

    /*
     * Calcule les coordonnées de plucker pour un segment [A,B]
     */
    plucker_vecteur: function(A,B) {
        return [
            A[0]*B[1]-A[1]*B[0],
            A[0]*B[2]-A[2]*B[0],
            A[0]-B[0],
            A[1]*B[2]-A[2]*B[1],
            A[2]-B[2],
            B[1]-A[1]
        ];
    },

    /*
     * Calcule les coordonnées de plucker pour un axe d'origine P et de vecteur u
     */
    plucker_axe: function(P,u) {
        return [
            P[0]*u[1]-P[1]*u[0],
            P[0]*u[2]-P[2]*u[0],
            -u[0],
            P[1]*u[2]-P[2]*u[1],
            -u[2],
            u[1]
        ]
    },

    /*
     * fonction side() utilisant les coordonnées de plucker
     * L correspond au segment orienté R à l'axe
     */
    side: function(L,R) {
        return R[2]*L[3]+R[5]*L[1]+R[4]*L[0]+R[1]*L[5]+R[0]*L[4]+R[3]*L[2];
    },

    /*
     * intersection entre un triangle représenté par un tableau de coordonnées de plucker de ses arrètes, pluck_arretes
     * avec un rayon représenté par ses coordonnées de plucker, pluck_R
     */
    intersect_ray_tri: function(pluck_R, pluck_arretes) {
        var side0=this.side(pluck_arretes[0], pluck_R);        
        if (side0*this.side(pluck_arretes[1], pluck_R)<0) return false;
        if (side0*this.side(pluck_arretes[2], pluck_R)<0) return false;
        return true;
    },

    /*
     * intersectiond 'un rayon (P, u) avec une sphere (C,r)
     * u must be a unit vector
     *
     *
     */
    intersect_ray_sphere: function(P,u,C,r) {
        //norm(PC vec u)
        var PC=[C[0]-P[0],C[1]-P[1],C[2]-P[2]];
        PCvecu=lib_vector.prodVect(PC,u);
        return ( lib_vector.size2(PCvecu)<r*r);
    },



    /*
     * retourne le point d'intersection entre un triangle T et un rayon (P,u)
     */
    intersection_point_ray_tri: function(T,P,u,face) {
        var AB=lib_vector.subNew(T[1], T[0]),
            AC=lib_vector.subNew(T[2], T[0]),
            AP=lib_vector.subNew(P, T[0]);

        var k_num=lib_vector.det(AP,AB,AC),
            k_denom=lib_vector.det(u,AB,AC);
        if (k_denom==0) return false;
        var k=-k_num/k_denom;
        if (k>0) return false;
        return {I: lib_vector.fmaNew(P, u, k), d: -k, T:T, face:face};
    },

    /*
     * intersection entre un quad représenté par un tableau de coordonnées de plucker de ses arrètes, pluck_arretes
     * avec un rayon représenté par ses coordonnées de plucker, pluck_R
     */
    intersect_ray_quad: function(pluck_R, pluck_arretes) {
        var side0=this.side(pluck_arretes[0], pluck_R);
        if (side0*this.side(pluck_arretes[1], pluck_R)<0) return false;
        if (side0*this.side(pluck_arretes[2], pluck_R)<0) return false;
        if (side0*this.side(pluck_arretes[3], pluck_R)<0) return false;
        return true;
    },

    /*
     * retourne les coordonnées de plucker des arrêtes d'un triangle
     * prend en argument les 3 sommets du triangle
     */
    plucker_tri: function(A,B,C) {
        return [this.plucker_vecteur(A,B),
                this.plucker_vecteur(B,C),
                this.plucker_vecteur(C,A)
        ]
    },

    /*
     * retourne les coordonnées de plucker des arrêtes d'un quad
     * prend en argument les 4 sommets du quad
     */
    plucker_quad: function(A,B,C,D) {
        return [this.plucker_vecteur(A,B),
                this.plucker_vecteur(B,C),
                this.plucker_vecteur(C,D),
                this.plucker_vecteur(D,A)
        ]
    },

    /*
     * retourne les coordonnées de plucker des arrêtes des 4 quads à tester pour effecter le teste d'intersection boite-rayon
     * c est le centre de la boite et d ses dimensions
     */
    plucker_boite: function(c, d) {
        //coordonnées des points de la boite
        var A=[c[0]+0.5*d[0], c[1]-0.5*d[1], c[2]-0.5*d[2]],
            B=[c[0]+0.5*d[0], c[1]+0.5*d[1], c[2]-0.5*d[2]],
            C=[c[0]+0.5*d[0], c[1]+0.5*d[1], c[2]+0.5*d[2]],
            D=[c[0]+0.5*d[0], c[1]-0.5*d[1], c[2]+0.5*d[2]],
            E=[c[0]-0.5*d[0], c[1]-0.5*d[1], c[2]-0.5*d[2]],
            F=[c[0]-0.5*d[0], c[1]+0.5*d[1], c[2]-0.5*d[2]],
            G=[c[0]-0.5*d[0], c[1]+0.5*d[1], c[2]+0.5*d[2]],
            H=[c[0]-0.5*d[0], c[1]-0.5*d[1], c[2]+0.5*d[2]];
        return [
            this.plucker_quad(B,C,H,E),
            this.plucker_quad(A,D,G,F),
            this.plucker_quad(A,B,F,E),
            this.plucker_quad(D,C,G,H)
        ]
    },

    /*
     * intersection entre une boite, représentée par un tableau contenant les coordonnées de plucker des 4 quads à tester
     * avec un rayon représenté par ses coordonnées de plucker, pluck_R
     */
    intersect_ray_boite: function(pluck_R, quads) {
        if (this.intersect_ray_quad(pluck_R, quads[0])) return true;
        if (this.intersect_ray_quad(pluck_R, quads[1])) return true;
        if (this.intersect_ray_quad(pluck_R, quads[2])) return true;
        if (this.intersect_ray_quad(pluck_R, quads[3])) return true;
        return false;
    }
};