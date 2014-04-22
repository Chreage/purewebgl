var SETTINGS={
    //debug settings : all must be set to false for release version
    debug: {
        LsystemHeightMap: false, //if true, display Lsystem heighmap and exit
        LsystemNormalMap: false, //if true, display Lsystem normalmap and exit
        islandHeightMap: false,  //if true, display island heighmap and exit
        islandNormalMap: false,  //if true, display island normalmap and exit
        hideSpheres :     true,   //if true, hide Spheres
        ErodeTexture:     false,  //if true, display Lsystem heighmap with erosion and exit
        noErosionLsystems: true,  //if true, do not erode Lsystems
    },
    
    //mouse and keyboard
    navigation: {
        mouse_sensibility_x: 0.0007, //mouse sensibility for horizontal rotation
        mouse_sensibility_y: 0.0005, //mouse sensibility for vertical rotation
        keyboard_sensibility: 0.9,  //keyboard move speed
        wheel_sensibility: -0.5,     //mouse wheel mode speed
        mouse_amortization: 0.85     //0->no armotization 1->full amortization
    },
    
    //camera and initial position settings
    camera: {
        position0: [0,0,-50], //initial position of the camera (X,Y,Z)
        phi0: 0,              //initial angle between the camera axis and the vertical axis in rad
        theta0: -Math.PI/6,   //initial angle between the camera axis and the horizontal plane in rad
        zNear: 2,             //elements between the camera and this distance plane are hidden
        zFar: 300,            //elements after this distance plane are hidden
        viewAngle: 45         //camera view angle in degrees
    },
    
    //cinematics/time management
    physics: {
        dt: 16   //DT in ms
    },
    
    //show only nearest spheres
    culling: {
        NSpheres : 2000,    //total number of sphere to display on a simple rendering
        NSpheresTextured: 400, //number of textured spheres
        weightAlphaTol: 20, //spheres between weightmin and this weight are semi-transp
        weightGCTol: 100,   //sphere with weight < weightmin-this value are unloaded
        weightNodeIncrease: 1.1, //used in Scene class in render loop to adjust weightmin. higher value -> reactivity but may be unstable
        maxImageReqs: 30       //max number of simultaneous image requests
    },
    
    //lsystems settings
    Lsystems : {
        number: 5,        //number of L-systems
        rank: 15,         //rank of each L-system
        showGenDt: 800,   //at loading, show next generation after ... ms
        
        scaleAdjust: 0.8, //scale factor of a sphere between 2 generations
        scaleBranch: 6,   //scale of a branch at gen 0
        angle: Math.PI/5,  //angle
        
        heightmapSizePx: 1024,                 //heightmap size in pixels. must be POT
        heightmapMargin: 4,                   //heightmap margin in world units
        hMax: 3,                              //max height of the Lsystem, excluding island height
        heightMapGaussPatchSizePx: 512,        //size of a gauss patch in pixels. Must be POT
        heightMapPatchSizePx: 70,  //50            //max size of the gauss patch in pixels on the heightmap. Will be multiplied by the node radius
        heightMapPatchAlphaMin: 0.1,//0.05         //min alpha of a gauss patch. Must be between 0 (fully transparent) and 1 (opaque)
        heightMapPatchAlphaRandom: 0.1,      //random part of the gauss patch transparency.
        heightMapPatchMaxGen:8,               //draw patch for L systems generation < this level
        
        defaultTextureImageURL: "images/textures/pixelBlack.jpg",  //when there is no favicon, use this. must be POT
        textureColorURL:"images/textures/sand.png",                //for heightmap surface - must be POT
        textureNormalsURL :"images/textures/sand_normal.png",      //normal texture for previous texture. must match previous texture
        textureTileInWidth: 10,                                    //number of color texture repeatition in width
        
        gridDistanceLodMin: 300,                                     //distance from the camera to the center of the grid from which grid is display with its minimum LOD
        erodeTexturesURL: ['images/textures/erosion/grandcan2.jpg'],  //list of erosion texture which will be randomly applied to Lsystem heightmaps (1 texture per heightmap)
        riversRefreshDistance: 80                                   //refresh rivers system only if distance to camera is smaller than this distance
        
    },
    
    //super island settings
    islands : {
        sizePx: 1024,                               //size in pixels of the heightmap of the island. must be POT
        size: 180,                                  //size of an island (length of a side) in world units
        hMax: 16,                                   //max height of the island
        nPatch: 300,                                //number of gaussian patch applied to build the heightmap
        patchSizeAvgPx: 600,                        //average size of a patch in pixels
        patchSizeRandomPx: 400,                     //random delta size of a patch in pixels
        patchGaussSizePx: 512,                      //size of a gaussian patch texture in pixel. must be POT
        patchAlphaAvg: 0.005,                        //average transparency of a patch. 0->fully transparent, 1-> fully opaque
        patchAlphaRandom: 0.005,
        patchDistanceMaxRandom: 10,                  //distance max to add to the patch position
        textureColorURL:"images/textures/sand.png", //for heightmap surface - must be POT
        textureNormalsURL :"images/textures/sand_normal.png", //normal texture for previous texture. must match previous texture
        textureTileInWidth: 100,                                    //number of color texture repeatition in width
        vtOffset: 0.001,                                  //vertical positive offset of the island
        collisionRadius: 45,                              //minimum distance between 2 Lsystems, in world units
        collisionRadiusMargin: 40,                        //minimum distance between a Lsystem and the border of the island, in world units
        centerExclusionRadius: 60,                         //minimum distance between the center of a Lsystem and the center of the island
        patchExclusionRadius: 10,                            //minimum distance between the center of a Lsystem and a patch
        mountainTexturesURL: ['images/textures/erosion/mountain1024.png'],  //list of mountain heightmaps which will be randomly applied to the island heightmap
        
        
        gridDistanceLodMin: 400,                        //distance from the camera to the center of the grid from which grid is display with its minimum LOD
        hideDistance: 500,                              //do not draw the island if it is more distant than this distance
        riversRefreshDistance: 150                      //refresh rivers system only if distance to camera is smaller than this distance
    },
    
    sphere: {
        zOffset: 1,     //vertical offset of a sphere, to avoid collision with the ground
        nBands: 24,       //number of bands in a sphere mesh for LOD 0
        nCrowns: 24,      //number of crowns in a sphere mesh for LOD 0
        nLods: 4,          //number of LOD levels
        changeLodDWeight: 10,
        lodMinWeight: -200,
        lodMaxWeight: -50
    },
    
    //works for super island grid and Lsystem grid
    grids: {
       LOD0Size: 512, //size of the side at LOD0
       nLods: 6       //number of LOD levels
    },
    
    //water surface settings
    water: {
        enable : true,                             //if false, water won't be displayed on the final scene
        sky : "images/textures/water/ciel_white.jpg",   //texture used for sky reflection - must be POT
        ground : "images/textures/water/sand2.jpg", //texture used for ground refraction - must be POT
        refractionIndice: 1.5,
        depth : 3,
        gridSize : 512,                            //water surface is a square with gridSize*gridSize points
        dimension : 800,                          //size of the water surface
        curve : 5,                                 //spherical curve of the water surface
        color: [0.2, 0.5, 0.9, 1.0], //[0.1, 0.2, 0.2, 1.0],               //water color
        visibility: 3.5,                           //visibility under water
        center: [0,0,0.2],                          //water surface center
        speed: 0.04
    },
    
    light: {
        skyColor: [1,1,1], //sky color in RGBA, all in [0..1]
        //direction: [0,0,1]  // [0,0,1] -> vertical light
        direction: [0,0.5,0.7]  // [0,0,1] -> vertical light
    },
    
    fog: {
        dMin: 70,               //fog start distance
        dMax: 250,              //fog stop distance
        color: [1,1,1]        //fog RGB color
    }
    
};

var lib_matrix4= {
    get_I4: function() { return [1,0,0,0,
                                 0,1,0,0,
                                 0,0,1,0,
                                 0,0,0,1]},
    set_I4: function(m) {
        m[0]=1; m[1]=0; m[2]=0; m[3]=0;
        m[4]=0; m[5]=1; m[6]=0; m[7]=0;
        m[8]=0; m[9]=0; m[10]=1; m[11]=0;
        m[12]=0; m[13]=0; m[14]=0; m[15]=1;
    },

    copyNew: function(m) {
        return [m[0], m[1], m[2], m[3],
                m[4], m[5], m[6], m[7],
                m[8], m[9], m[10], m[11],
                m[12], m[13], m[14], m[15]];
    },
};


var lib_matrix_projection={
    get: function(angle, a, zMin, zMax) {
        var tan=Math.tan(lib_maths.degToRad(0.5*angle)),
            A=-(zMax+zMin)/(zMax-zMin),
            B=(-2*zMax*zMin)/(zMax-zMin);

        return [
            .5/tan, 0 ,   0, 0,
            0, .5*a/tan,  0, 0,
            0, 0,         A, -1,
            0, 0,         B, 0
        ];
    },
};



var lib_matrix_rot4={
     rotateX: function(m, phi) {
          var c=Math.cos(phi);
          var s=Math.sin(phi);
          var mv1=m[1], mv5=m[5], mv9=m[9];
          m[1]=m[1]*c-m[2]*s;
          m[5]=m[5]*c-m[6]*s;
          m[9]=m[9]*c-m[10]*s;

          m[2]=m[2]*c+mv1*s;
          m[6]=m[6]*c+mv5*s;
          m[10]=m[10]*c+mv9*s;
    },

    rotateY: function(m, phi) {
          var c=Math.cos(phi);
          var s=Math.sin(phi);
          var mv0=m[0], mv4=m[4], mv8=m[8];
          m[0]=c*m[0]+s*m[2];
          m[4]=c*m[4]+s*m[6];
          m[8]=c*m[8]+s*m[10];

          m[2]=c*m[2]-s*mv0;
          m[6]=c*m[6]-s*mv4;
          m[10]=c*m[10]-s*mv8;
    },

    rotateZ: function(m, phi) {
          var c=Math.cos(phi);
          var s=Math.sin(phi);
          var mv0=m[0], mv4=m[4], mv8=m[8];
          m[0]=c*m[0]-s*m[1];
          m[4]=c*m[4]-s*m[5];
          m[8]=c*m[8]-s*m[9];

          m[1]=c*m[1]+s*mv0;
          m[5]=c*m[5]+s*mv4;
          m[9]=c*m[9]+s*mv8;
    }
};var lib_matrix_mv={
    translateRot: function(m,v) {
       m[12]+=v[0]*m[0]+v[1]*m[4]+v[2]*m[8];
       m[13]+=v[0]*m[1]+v[1]*m[5]+v[2]*m[9];
       m[14]+=v[0]*m[2]+v[1]*m[6]+v[2]*m[10];
    },


    /*
     * effectue la rotation inverse Ã  celle de m pour le vecteur v
     */
    do_inv_rot: function(m,v) {
        var v0=v[0], v1=v[1];
        v[0]=v0*m[0]+v1*m[1]+v[2]*m[2];
        v[1]=v0*m[4]+v1*m[5]+v[2]*m[6];
        v[2]=v0*m[8]+v1*m[9]+v[2]*m[10];
    },

    do_inv_rotNew: function(m,v) {
        return [v[0]*m[0]+v[1]*m[1]+v[2]*m[2],
                v[0]*m[4]+v[1]*m[5]+v[2]*m[6],
                v[0]*m[8]+v[1]*m[9]+v[2]*m[10]];
    },

    /*
     * effectue le mouvement inverse Ã  m :
     */
    do_inv_mvNew: function(m, v) {
        return [m[0]*v[0]+m[1]*v[1]+m[2]*v[2]-m[12]*m[0]-m[13]*m[1]-m[14]*m[2],
                m[4]*v[0]+m[5]*v[1]+m[6]*v[2]-m[12]*m[4]-m[13]*m[5]-m[14]*m[6],
                m[8]*v[0]+m[9]*v[1]+m[10]*v[2]-m[12]*m[8]-m[13]*m[9]-m[14]*m[10]];

    },

    set_position: function(m,v) {
        m[12]=v[0];
        m[13]=v[1];
        m[14]=v[2];
    },

    //inverse m et met le resultat dans n
    inv: function(m, n) {
        n[0]=m[0]; n[1]=m[4]; n[2]=m[8];
        n[4]=m[1]; n[5]=m[5]; n[6]=m[9];
        n[8]=m[2]; n[9]=m[6]; n[10]=m[10];

        n[12]=-m[0]*m[12]-m[1]*m[13]-m[2]*m[14];
        n[13]=-m[4]*m[12]-m[5]*m[13]-m[6]*m[14];
        n[14]=-m[8]*m[12]-m[9]*m[13]-m[10]*m[14];
    }
};var lib_vector={
    size: function(v) {
        return Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
    },

    distance: function(A,B) {
        return Math.sqrt((A[0]-B[0])*(A[0]-B[0])+(A[1]-B[1])*(A[1]-B[1])+(A[2]-B[2])*(A[2]-B[2]));
    },

    distanceDim2: function(A,B) {
        return Math.sqrt((A[0]-B[0])*(A[0]-B[0])+(A[1]-B[1])*(A[1]-B[1]));
    },
    
    distanceMinus: function(A,B) {
        return Math.sqrt((A[0]+B[0])*(A[0]+B[0])+(A[1]+B[1])*(A[1]+B[1])+(A[2]+B[2])*(A[2]+B[2]));
    },
    

    distance2: function(A,B) {
        return (A[0]-B[0])*(A[0]-B[0])+(A[1]-B[1])*(A[1]-B[1])+(A[2]-B[2])*(A[2]-B[2]);
    },

    size2: function(v) {
        return v[0]*v[0]+v[1]*v[1]+v[2]*v[2];
    },


    add: function(u,v) {
        u[0]+=v[0]; u[1]+=v[1]; u[2]+=v[2];
    },

    normalize: function(v) {
        var n=this.size(v);
        v[0]/=n; v[1]/=n; v[2]/=n;
    },

    //produit vectoriel
    prodVect: function(u,v) {
        return [u[1]*v[2]-v[1]*u[2],
                u[2]*v[0]-u[0]*v[2],
                u[0]*v[1]-u[1]*v[0]];
    },

    to_spherical: function(u) {
        var r=this.size(u);
        var phi=Math.acos(u[2]/r);
        var q=Math.acos(u[1]/Math.sqrt(u[0]*u[0]+u[1]*u[1]));
        var theta=(u[0]>=0)?q:2*Math.PI-q;
        return [r,theta, phi];
    },

    //produit scalaire
    dot: function(u, v) {
        return u[0]*v[0]+u[1]*v[1]+u[2]*v[2];
    },

    subNew: function(u,v) {
        return ([u[0]-v[0], u[1]-v[1], u[2]-v[2]]);
    },

    halfNew: function(u) {
        return [u[0]*0.5, u[1]*0.5, u[2]*0.5];
    },

    copy: function(src, dst) {
        dst[0]=src[0]; dst[1]=src[1]; dst[2]=src[2];
    },

    copyNew: function(u) {
        return [u[0], u[1], u[2]];
    },

    addHalfNew: function(u,v) {
        return [u[0]+0.5*v[0], u[1]+0.5*v[1], u[2]+0.5*v[2]];
    },

    //dÃ©terminant
    det: function(u,v,w) {
        return u[0]*(v[1]*w[2]-v[2]*w[1])-u[1]*(v[0]*w[2]-v[2]*w[0])+u[2]*(v[0]*w[1]-v[1]*w[0]);
    },

    fmaNew: function(u,v,a) {
        return [u[0]+a*v[0], u[1]+a*v[1], u[2]+a*v[2]];
    }
};

var lib_maths={
    degToRad: function(angle) {
        return angle*Math.PI/180;
    },
    
    /*
     * Bilinear interpolation
     * see : http://en.wikipedia.org/wiki/Bilinear_interpolation
     * 
     * F11=f(x1,y1),
     * F12=f(x1,y2),
     * F21=f(x2,y1),
     * F22=f(x2,y2)
     * 
     * return f(x,y)
     * 
     * wikipedia test - must return 146.1 :
     * lib_maths.bilinear_interpolation(14.5,20.2,
                                        14,20,15,21,
                                        91,162,210,95);
     */
    bilinear_interpolation: function(x,y,   x1,y1,x2,y2,    F11,F12,F21,F22) {
        return (1/((x2-x1)*(y2-y1)))*(
               F11 * (x2-x)*(y2-y)
               + F21 * (x-x1)*(y2-y)
               + F12 * (x2-x)*(y-y1)
               + F22 * (x-x1)*(y-y1));
    }
    
    

};var lib_array={
    get_random: function(a){
        return a[Math.floor(Math.random()*a.length)];
    }
};if ( !window.requestAnimationFrame ) {

	window.requestAnimationFrame = ( function() {

		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame;

	} )();

};

if ( !window.cancelRequestAnimationFrame ) {

	window.cancelRequestAnimationFrame = ( function() {

		return window.webkitCancelRequestAnimationFrame ||
		window.mozCancelRequestAnimationFrame ||
		window.oCancelRequestAnimationFrame ||
		window.msCancelRequestAnimationFrame;

	} )();

};


var lib_ajax={
    get: function(url, func) {        
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, true);
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status==200) {
                func(xmlHttp.responseText);   // la fonction de prise en charge
            }
        }
        xmlHttp.send();
    }
};


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
};/*
 * spec.canvas_id : id of the canvas
 */
var GL, CV, CURRENTGEN=0, LSYSTEMS=[];
var EXT_FLOAT, EXT_FLOAT2, EXT_UINT, EXT_FLOAT_LINEAR;

var NNODESDISPLAYEDMAX=SETTINGS.culling.NSpheres,
    NNODESTEXTUREDDISPLAYEDMAX=SETTINGS.culling.NSpheresTextured;
        
var NNODES=0;
var WEIGHTNODEMIN=-165;
var WEIGHTNODETEXTUREDMIN=-150;

var WEIGHTALPHATOL=SETTINGS.culling.weightAlphaTol;
var WEIGHTGCTOL=SETTINGS.culling.weightGCTol;
var WEIGHTNODEINCREASE=SETTINGS.culling.weightNodeIncrease;

var NNODESDISPLAYED=0,
    NNODESTEXTUREDDISPLAYED=0;

var MAXIMAGEREQS=SETTINGS.culling.maxImageReqs,
    NIMAGEREQS=0;

var ERODETEXTURESSET, MOUNTAINTEXTURESSET, ALEXADATA=false, STOP=false;


var Contexte=(function() {
    var nLoaded=0;
    
    return {
        instance: function(spec) {
            var canvas=document.getElementById(spec.canvas_id);
            CV=canvas;
            
            try {
		GL = canvas.getContext("webgl",
                    {antialias: true,
                     premultipliedAlpha: true,
                     alpha: true});
                //Init WebGL native extensions : 
                 
                //allow mesh point indexing with 32 bits integers 
                EXT_UINT = GL.getExtension("OES_element_index_uint") ||
                           GL.getExtension("MOZ_OES_element_index_uint") ||
                           GL.getExtension("WEBKIT_OES_element_index_uint");
        
                //allow texture float, useful for heightmaps
                EXT_FLOAT = GL.getExtension('OES_texture_float') ||
                            GL.getExtension('MOZ_OES_texture_float') ||
                            GL.getExtension('WEBKIT_OES_texture_float');
                
                EXT_FLOAT2 = GL.getExtension('OES_texture_half_float') ||
                             GL.getExtension('MOZ_OES_texture_half_float') ||
                             GL.getExtension('WEBKIT_OES_texture_half_float');
                     
                //enable linear filtering on floating point textures     
                EXT_FLOAT_LINEAR = GL.getExtension('OES_texture_float_linear') ||
                                   GL.getExtension('MOZ_OES_texture_float_linear') ||
                                   GL.getExtension('WEBKIT_OES_texture_float_linear');     
                 
                if (!EXT_FLOAT || !EXT_FLOAT2 || !EXT_UINT || !EXT_FLOAT_LINEAR){
                    console.log("Warning : some extension are lacking :(");
                }
            } catch (e) {
		alert("Webgl not found") ;
                return false;
            } ; //end GL initialisation
            
            Texture.init();
            LodSpheres.init();
            LodGrids.init();
            RiverSystem.init(GL);
            Heightmap.init(GL);
            ErodeTexturesSet.init();
            
            var scene=Scene.instance({});
            var shaders=Shaders.instance({});
            Shaders.set_defaultShader();
            
            var vue=Vue.instance({camera: SETTINGS.camera.position0,
                                  angle: SETTINGS.camera.viewAngle,
                                  zMin: SETTINGS.camera.zNear,
                                  zMax: SETTINGS.camera.zFar});
            vue.plein_ecran();

            var nav=Navigation.instance({vue: vue});
            nav.set();
            scene.set_navigation(nav);

            var N=SETTINGS.Lsystems.number; //number of Lsystems
            var n=SETTINGS.Lsystems.rank; //rank of 1 lsystem

            var checkLoaded=function() {
                nLoaded++;
                if (nLoaded!==3) return;
                
                
                var dataObj=JSON.parse(ALEXADATA);
                var alexa=dataObj.alexa;
                /*
                var specs=[], specs2=[];
                for (var i=0; i<N; i++){
                    specs.push({nGenerations: n, list: alexa, offset: 2*i, gap: 2*N});
                    specs2.push({nGenerations: n, list: alexa, offset: 2*i+1, gap: 2*N});
                }

                var myIsland=SuperIsland.instance({
                    Lsystems: specs,
                    centre: [90,0,0],
                    LsystemRadius: 25,
                    size: 160
                });

                scene.add_island(myIsland);

                var myIsland2=SuperIsland.instance({
                    Lsystems: specs2,
                    centre: [-90,0,0],
                    LsystemRadius: 25,
                    size: 160
                });

                scene.add_island(myIsland2);

                */
                var myIsland=SuperIsland.instance({
                    Lsystems: [{nGenerations: n, list: alexa, offset: 0, gap: N},
                               {nGenerations: n, list: alexa, offset: 1, gap: N},
                               {nGenerations: n, list: alexa, offset: 2, gap: N},
                               {nGenerations: n, list: alexa, offset: 3, gap: N}],
                    centre: [0,0,0],
                    LsystemRadius: SETTINGS.islands.collisionRadius,
                    LsystemRadiusMargin: SETTINGS.islands.collisionRadiusMargin,
                    size: SETTINGS.islands.size,
                    mountainTexturesSet: MOUNTAINTEXTURESSET
                    //mountainHeightMapURL: lib_array.get_random(SETTINGS.islands.mountainTexturesURL)
                }); 
                scene.add_island(myIsland);

                scene.start();

                var showGen=function() {
                    CURRENTGEN++;
                    if (CURRENTGEN>20) clearInterval(timerGen);
                };
                var timerGen=setInterval(showGen, SETTINGS.Lsystems.showGenDt);
                //}); //end ajax get

             }; //end checkLoaded()
             
             lib_ajax.get("php/alexa/alexa.json", function(data){
                 ALEXADATA=data;
                 checkLoaded();
             });
             
             MOUNTAINTEXTURESSET=ErodeTexturesSet.instance({
                    onload: checkLoaded,
                    texturesURL: SETTINGS.islands.mountainTexturesURL
             }); //end moutaintextureset instance
             
             ERODETEXTURESSET=ErodeTexturesSet.instance({
                    onload: checkLoaded,
                   texturesURL: SETTINGS.Lsystems.erodeTexturesURL
             }); //end ERODETEXTURESSET instanciation



            if(SETTINGS.water.enable) {
                var eau=SurfaceLiquide.instance({
                   URLciel: SETTINGS.water.sky,
                   URLfond: SETTINGS.water.ground
                });

                scene.set_water(eau);
            } //end if water enable
                        
            return true;
        }
    };
})();/*
 * spec.vertices : tableau js des vertex
 * spec.indices : tableau js des indices
 * spec.int32Indices: boolean
 */
var Maillage=(function () {
    return {
        instance: function(spec) {
            var vbo=VBO.instance({tableau_js: spec.vertices});
            var vbo_indices=VBO_indices.instance({tableau_js: spec.indices,  int32Indices: spec.int32Indices});

            return {
                drawAsHeightMapSurface: function() {
                    vbo.drawAsHeightMapSurface();
                    vbo_indices.draw();
                },
                
                drawAsIslandHeightMapSurface: function() {
                    vbo.drawAsIslandHeightMapSurface();
                    vbo_indices.draw();
                },
                
                draw: function() {
                    vbo.draw();
                    vbo_indices.draw();
                },

                drawVBO: function() {
                    vbo.draw();
                },
                
                drawErode: function() {
                    vbo.drawErode();
                    vbo_indices.draw();
                },

                drawVBOIndices: function()  {
                    vbo_indices.draw();
                },
                
                bindVBOIndices: function(){
                    vbo_indices.bind();
                },
                
                drawVBOIndices_opt: function()  {
                    vbo_indices.draw_Elements();
                },

                draw_water: function() {
                    vbo.draw_water();
                    vbo_indices.draw();
                }
            }
        }
    }
}());


/*
 * spec: empty
 */
var SCENE;
var Scene=(function () {
    return {
        instance: function(spec) {
            var lsystems=[], islands=[],
                navigation=false, stop=false, running=false, cursor="auto", water=false;
            var currentLsystemIndex=0;
            var timer_physics;

            var drawObjet=function(objet) {
                objet.draw();
            },
            drawObjetPhysics=function(objet){
                objet.drawPhysics();
            };

            //set initial WebGL states
            GL.enable(GL.DEPTH_TEST);
            GL.depthFunc(GL.LEQUAL);
            GL.clearDepth(1.0);
            
            GL.enable(GL.BLEND);
            GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);

            var highlightedNode=false;
            
            var that={
                
                   start: function(){
                       running=true;
                       that.draw();
                       timer_physics=setInterval(that.drawPhysics, SETTINGS.physics.dt);
                   },
                   
                   pause: function() {
                       running=false;
                   },
                   
                   stop: function(){
                       //for debug only
                       STOP=true;
                       stop=true;
                       running=false;
                       if (timer_physics) clearInterval(timer_physics);
                   },
                   
                   draw: function(timestamp) {
                       if (!running || stop) return;
                       NNODESDISPLAYED=0,
                       NNODESTEXTUREDDISPLAYED=0;
                       
                       Shaders.set_defaultShader();
                       GL.viewport(0.0, 0.0, CV.width, CV.height);
                       GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
                       VUE.draw();

                       
                       Shaders.unset_defaultShader();
                       
                       lsystems.map(drawObjet);
                       if (water) water.draw();
                       islands.map(drawObjet);                       
                       //if (water) water.draw();

                       GL.flush();
                       
                       var dNodesDisplayed=Math.min(NNODESDISPLAYED-NNODESDISPLAYEDMAX, NNODESDISPLAYEDMAX);
                        WEIGHTNODEMIN+=((dNodesDisplayed>0)?1:-1)
                                     * WEIGHTNODEINCREASE
                                    * Math.abs(dNodesDisplayed/NNODESDISPLAYEDMAX);
                     
                        var dNodesTexturedDisplayed=Math.min(NNODESTEXTUREDDISPLAYED-NNODESTEXTUREDDISPLAYEDMAX, NNODESTEXTUREDDISPLAYEDMAX);
                        WEIGHTNODETEXTUREDMIN+=((dNodesTexturedDisplayed>0)?1:-1)
                                     * WEIGHTNODEINCREASE
                                    * Math.abs(dNodesTexturedDisplayed/NNODESTEXTUREDDISPLAYEDMAX);
                            
                            
                       window.requestAnimationFrame(that.draw);
                   },

                   drawPhysics: function() {    
                       if (stop) return;
                       
                       //camera movement amortization
                       VUE.drawPhysics();
                       
                       //water movement
                       if (water) water.drawPhysics();

                       //rivers updates
                       islands.map(drawObjetPhysics);

                       //picking
                       if (navigation) navigation.drawPhysics();
                       
                       currentLsystemIndex=(currentLsystemIndex+1)%LSYSTEMS.length;
                       LSYSTEMS[currentLsystemIndex].sort(VUE.get_cameraPosition());
                   },

                   add_Lsystem: function(ls){
                       lsystems.push(ls);
                   },
                   
                   add_island: function(island){
                       islands.push(island);
                   },

                   set_navigation: function(nav){
                       navigation=nav;
                   },

                   set_water: function(eau){
                       water=eau;
                   },

                   pick: function(camera, u, Xp, Yp){
                       var lsystempicked=false, dpick=1e10;
                       LSYSTEMS.map(function(lsystem) {
                           var pick=lsystem.pick(camera, u);
                           if (!pick) return;
                           if (pick.d<dpick){
                            lsystempicked=lsystem;
                            dpick=pick.d;
                            if (highlightedNode) {
                                highlightedNode.highlight=0;
                            } else {                                
                                LABEL.style.display="block";
                            }
                            LABEL.style.top=(Yp+24)+"px",
                            LABEL.style.left=(Xp+24)+"px";

                            highlightedNode=pick.node;
                            pick.node.highlight=1;
                           }
                       });

                       if (highlightedNode){
                           if (cursor!=="pointer"){
                                CV.style.cursor="pointer";
                                cursor="pointer";
                           }
                           LABEL.innerHTML=highlightedNode.label;
                       } else {
                           if (cursor!=="auto"){
                               cursor="auto";
                               CV.style.cursor="auto";
                           }
                       }

                       if (!lsystempicked && highlightedNode){
                           highlightedNode.highlight=0;
                           highlightedNode=false;
                           LABEL.style.display="none";
                       }
                   }
            };
            SCENE=that;
            return that;
        }
    };
})();


/*
 * spec: empty
 */
var Shaders=(function (){

    var get_shader=function(source, type, strtype) {
            var shader = GL.createShader(type);
            GL.shaderSource(shader, source);
            GL.compileShader(shader);
            if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
                alert(strtype+" : "+GL.getShaderInfoLog(shader));
                return false;
            }
            return shader;
    };

    var get_shaderProgram=function(vertex_source, fragment_source, strtype){
            var shader_vertex=get_shader(vertex_source, GL.VERTEX_SHADER, strtype+" VERTEX_SHADER");
            var shader_fragment=get_shader(fragment_source, GL.FRAGMENT_SHADER, strtype+" FRAGMENT_SHADER");
            shader_program=GL.createProgram();

            GL.attachShader(shader_program, shader_vertex);
            GL.attachShader(shader_program, shader_fragment);

            GL.linkProgram(shader_program);

            return shader_program;
    };
    
    //ERODE SHADERS (2D)
    var shader_vertex_source_erode="attribute vec2 position;\n\
\n\
varying vec2 vUV;\n\
\n\
void main(void) {\n\
    vUV=position+vec2(.5, .5);\n\
    gl_Position = vec4(2.*position, 0., 1.);\n\
} \n\
",
        shader_fragment_source_erode="precision highp float;\n\
\n\
uniform float emboss;\n\
uniform sampler2D samplerErode, samplerHeight;\n\
\n\
varying vec2 vUV;\n\
\n\
void main(void) {\n\
    vec4 height=texture2D(samplerHeight, vUV);\n\
    vec4 erode=texture2D(samplerErode, vUV);\n\
\n\
    float eroded=height.r*(0.01+0.99*erode.r);\n\
    float embossed=max(height.r, erode.r);\n\
\n\
    float ziou=mix(eroded, embossed, emboss);\n\
    //float ziou=eroded;\n\
    //gl_FragColor=texture2D(sampler_height, vUV);\n\
    gl_FragColor=vec4(ziou, 0.,0.,1.);\n\
} \n\
",
        shader_program_erode;
  
    var position_erode,
        emboss_erode,
        sampler_erodeMap_erode,
        sampler_heightMap_erode;
    

    //WATER SHADERS (3D)
    var shader_vertex_source_water="precision mediump float;\n\
\n\
attribute vec2 position;\n\
\n\
uniform mat4 matrice_vue, matrice_projection, matrice_objet;\n\
uniform vec3 camera;         //camera position\n\
uniform vec2 ks[6];          //vecteurs d'onde\n\
uniform float As[6];         //amplitudes\n\
uniform float ws[6];         //frequences angulaires\n\
uniform float t;             //temps en secondes\n\
uniform float i;             //indice de réfraction\n\
uniform float H;             //profondeur\n\
uniform float visibilite;    //visibility\n\
uniform float fogDmin, fogDmax; //fog distances\n\
uniform vec3 lumiere;        //direction de la lumiere\n\
\n\
varying vec2 UVfond, UVciel; //UV coordinates for sky and ground\n\
varying float Kr, Kv;        //reflexion and refraction coefficiens\n\
varying float Il;            //light intensity\n\
varying float vFog, vCaustique;          //fog coefficient\n\
\n\
\n\
void main(void) {\n\
    vec3 dP=vec3(0.,0.,0.);                           //displacement of the wave\n\
    vec3 N=vec3(0.,1.,0.);                            //normal vector\n\
    float inSin;                                      \n\
    vec3 offset=vec3(camera.x,0., camera.y);\n\
    vec3 position3=vec3(position.x,0.,position.y);\n\
    vec3 positionOffset=position3-offset;\n\
    for (int i=0; i<6; ++i) {                         //wave loop\n\
        inSin=dot(ks[i], positionOffset.xz)+t*ws[i];\n\
        dP.y+=0.1*As[i]*sin(inSin);\n\
        N.xz+=As[i]*cos(inSin)*ks[i];                 //normale en une surface : N(x,y)=dM/dx ^ dM/dy\n\
    }\n\
    //N=vec3(0.,1.,0.);\n\
    vec3 P=position3+dP;                              //true point position\n\
    N=normalize(N);\n\
    vec3 C=-camera.xzy;                                \n\
    vec3 I=normalize(P+offset+C);                            //incident vector\n\
\n\
    vec3 R=reflect(I, N);                             //reflected ray\n\
    float theta=acos(R.x/sqrt(R.x*R.x+R.z*R.z));      //spherical coordinates for R : longitude\n\
    float phi=acos(R.y);                              //spherical coordinates for R : lattitude\n\
    UVciel=vec2(phi, theta)/6.28;\n\
\n\
    \n\
    vec3 Ra=refract(-I,N,i);                         //refracted ray\n\
\n\
    float k=H/Ra.y;                                  //distance runned by the ray underwater\n\
    UVfond=(P-offset+k*Ra).xz;    \n\
\n\
    Kv=smoothstep(0., visibilite,k);                 //Water ground visibility coefficient 1->we cannot see the ground\n\
    Kr=min(1., pow(dot(I, N),2.));                   //Fresnel coefficient 1->total refraction\n\
\n\
    //eclairage\n\
    vec3 Ie=lumiere.xzy;                              //light incidence\n\
    vec3 Re=reflect(Ie, N);                           //light reflected ray\n\
    Il=1.;                         //ambient lighting\n\
    Il+=2.*max(0.,pow(-1.5*dot(Re,Ie),8.));          //specular lighting\n\
\n\
    vCaustique=length(N.xz);                        //caustics. utterly empirical...\n\
\n\
    //fog\n\
    vFog =  1.-smoothstep(fogDmin, fogDmax, distance(P-offset,C));\n\
\n\
    gl_Position = matrice_projection * matrice_vue * matrice_objet * vec4(P, 1.0);\n\
}",
        shader_fragment_source_water="precision mediump float;\n\
\n\
uniform sampler2D samplerFond, samplerCiel;\n\
uniform vec4 couleur_eau;        //couleur de l'eau\n\
uniform vec3 fogColor;           //fog color\n\
\n\
varying vec2 UVfond, UVciel;     //Coordonnées de texture du ciel et du fond\n\
varying float Kr, Kv;            //coefficients de reflexion et de réfraction\n\
varying float Il;                //intensité lumineuse\n\
varying float vFog, vCaustique;\n\
\n\
void main(void) {\n\
    float Icaustique=1.+0.1*smoothstep(0.07,0.15,vCaustique); //intensité des caustiques\n\
    vec4 couleur_ciel=texture2D(samplerCiel, UVciel);\n\
    vec4 couleur_fond=mix(texture2D(samplerFond, UVfond)*Icaustique, couleur_eau, Kv);\n\
    vec4 couleur=mix(couleur_ciel, couleur_fond, Kr);\n\
    couleur.a=mix(0.8, 1., Kr);\n\
\n\
    vec3 waterColor =mix(vec3(0.,0.,0.), couleur.rgb*Il, couleur.a);\n\
\n\
    gl_FragColor = vec4(mix(fogColor,waterColor, vFog), 1.);\n\
\n\
}",
        shader_program_water;

    var matrice_vue_water,
        matrice_projection_water,
        matrice_objet_water,
        position_water,
        samplerCiel_water,
        samplerFond_water,
        camera_water,
        amplitudes_water,
        ks_water,
        ws_water,
        indice_refraction_water,
        profondeur_water,
        couleur_eau_water,
        visibilite_water,
        lumiere_water,
        time_water,
        fogDmin_water,
        fogDmax_water,
        fogColor_water;


    //TEXTURE READ SHADERS (2D)
    var shader_vertex_source_textureRead="attribute vec2 position;\n\
varying vec2 fragPos;\n\
\n\
void main(void) {\n\
    fragPos=position;\n\
    gl_Position = vec4(2.*position, 0., 1.);\n\
}",
        shader_fragment_source_textureRead="precision mediump float;\n\
\n\
uniform sampler2D sampler;\n\
varying vec2 fragPos;\n\
\n\
void main(void) {\n\
    gl_FragColor=texture2D(sampler, fragPos+vec2(.5, .5));\n\
}",
        shader_program_textureRead;

    var position_textureRead,
        sampler_textureRead;



    //HEIGHTMAP TO NORMAL MAP VARS (2D)
     var shader_vertex_source_normals="attribute vec2 position;\n\
varying vec2 fragPos;\n\
\n\
void main(void) {\n\
    fragPos=position;\n\
    gl_Position = vec4(2.*position, 0., 1.);\n\
}",
         shader_fragment_source_normals="precision highp float;\n\
\n\
uniform sampler2D sampler;\n\
uniform vec2 wh, size;\n\
uniform float H;\n\
varying vec2 fragPos;\n\
\n\
vec3 getPoint(float x, float y, vec2 uv, float dPx, float dPy){\n\
    vec4 t = texture2D(sampler, uv+vec2(x*dPx,y*dPy));\n\
    return vec3(x*dPx*size.x,y*dPy*size.y,H*t.x);\n\
}\n\
\n\
void main(void) {\n\
    float dPx=1./(wh.x);\n\
    float dPy=1./(wh.y);\n\
    vec2 uv=fragPos+vec2(.5, .5);\n\
    vec4 color=texture2D(sampler, uv);\n\
\n\
    //vec3 origin=vec3(0.,0.,color.r*H);\n\
    vec3 origin=getPoint(0.,0., uv, dPx, dPy);\n\
\n\
    vec3 points[4];\n\
    points[0]=getPoint(-1.,0., uv, dPx, dPy);\n\
    points[1]=getPoint(0.,-1., uv, dPx, dPy);\n\
    points[2]=getPoint(1. ,0., uv, dPx, dPy);\n\
    points[3]=getPoint(0. ,1., uv, dPx, dPy);\n\
\n\
    vec3 normal=normalize(cross(points[1]-points[3], points[2]-points[0]));\n\
\n\
    normal.xy=vec2(0.5,0.5)+normal.xy*0.5;\n\
\n\
    //normal= texture2D(sampler, uv).rgb;\n\
    //normal=vec3(1.,0.,0.);\n\
    //normal=vec3(0.5,0.5,1.);\n\
    gl_FragColor=vec4(color.r, normal);\n\
    //gl_FragColor=vec4(normal, 1.);\n\
\n\
}",
         shader_program_normals;

    var position_normals,
        sampler_normals,
        wh_normals,
        H_normals,
        size_normals;

    //HEIGHTMAP RENDERING VARS (2D)
    var shader_vertex_source_heightMap="attribute vec2 position;\n\
\n\
uniform vec2 centre, scale;\n\
\n\
varying vec2 vUV;\n\
\n\
void main(void) {\n\
    gl_Position = vec4(centre+scale*position, 0.,1.);\n\
    vUV = position+vec2(0.5,0.5);\n\
}",
        shader_fragment_source_heightMap="precision highp float;\n\
\n\
uniform sampler2D sampler;\n\
uniform float alpha;\n\
\n\
varying vec2 vUV;\n\
\n\
void main(void) {\n\
    vec4 colorGauss=texture2D(sampler, vUV);\n\
    colorGauss.a=colorGauss.r*alpha;\n\
    gl_FragColor = colorGauss;\n\
}",
        shader_program_heightMap;
    
    var scale_heightMap, centre_heightMap,
        position_heightMap,
        sampler_heightMap,
        alpha_heightMap;

    
    //HEIGHTMAP SURFACE RENDERING VARS (3D)
    var shader_vertex_source_heightMapSurface="attribute vec2 position;\n\
\n\
uniform mat4 matrice_vue, matrice_projection, matrice_objet;\n\
uniform float hMax, hMaxIsland,  fogDmin, fogDmax;\n\
uniform vec2 scale, centre, scaleIsland, offsetIsland;\n\
uniform sampler2D samplerHeightMap, samplerIsland;\n\
\n\
varying float vFog, vAlpha, vHeight;\n\
varying vec2 vUV;\n\
varying vec3 vNormal;\n\
\n\
void main(void) {\n\
    vec2 pos2=position*scale+centre;\n\
    vec3 pos=vec3(pos2.x,pos2.y,0.);\n\
    vec4 hmColor=texture2D(samplerHeightMap, position);\n\
    pos.z+=hmColor.r*hMax;\n\
\n\
    //smooth border between Lsystem and island :\n\
    vAlpha=smoothstep(0.001,0.01,hmColor.r);\n\
\n\
    vec4 islandHM=texture2D(samplerIsland, ((position-vec2(0.5,0.5))*scaleIsland)+offsetIsland);\n\
    pos.z+=islandHM.r*hMaxIsland;\n\
\n\
    vec4 posScene=matrice_vue * matrice_objet * vec4(pos, 1.0);\n\
    gl_Position = matrice_projection * posScene;    \n\
\n\
    vUV = position;\n\
    vNormal=normalize(hmColor.gba+islandHM.gba-vec3(1.,1.,.5));\n\
    vFog =  1.-smoothstep(fogDmin, fogDmax, length(posScene.xyz));\n\
    vHeight=smoothstep(0.2, 0.5, pos.z);\n\
}",
        shader_fragment_source_heightMapSurface="precision mediump float;\n\
\n\
uniform vec2 scaleUV;\n\
uniform vec3 lightDir, fogColor;\n\
uniform sampler2D sampler, samplerNormals, samplerRivers;\n\
\n\
varying float vFog, vAlpha, vHeight;\n\
varying vec2 vUV;\n\
varying vec3 vNormal;\n\
\n\
const vec3 Z=vec3(0.,0.,1.);\n\
\n\
//normal mapping : retourne la matrice de rotation d'axe u et d'angle theta\n\
mat3 rot_angleAxe(float theta, vec3 u) {\n\
    float c=cos(theta);\n\
    float s=sin(theta);\n\
    return mat3(\n\
        u.x*u.x+(1.-u.x*u.x)*c,  u.x*u.y*(1.-c)-u.z*s,    u.x*u.z*(1.-c)+u.y*s,\n\
        u.x*u.y*(1.-c)+u.z*s,    u.y*u.y+(1.-u.y*u.y)*c,  u.y*u.z*(1.-c)-u.x*s,\n\
        u.x*u.z*(1.-c)-u.y*s,    u.y*u.z*(1.-c)+u.x*s,    u.z*u.z+(1.-u.z*u.z)*c\n\
    );\n\
}\n\
\n\
//normal mapping : retourne la matrice de rotation qui envoie u sur v. u et v sont unitaires\n\
mat3 rot_vectVect(vec3 u,vec3 v) {\n\
    vec3 axe=normalize(cross(v,u));\n\
    float theta=acos(dot(u,v));\n\
    return rot_angleAxe(theta, axe);\n\
}\n\
\n\
\n\
void main(void) {\n\
    vec2 uvScaled=vUV*scaleUV;\n\
\n\
    vec4 colorRiver=texture2D(samplerRivers, vUV);\n\
\n\
    vec4 color=texture2D(sampler, uvScaled);\n\
    vec4 texture_normale=texture2D(samplerNormals, uvScaled);\n\
    vec3 n=vec3(2.*(texture_normale.x-0.5), 2.*(texture_normale.y-0.5), texture_normale.z);\n\
    mat3 rot=rot_vectVect(Z, normalize(vNormal));\n\
    float Kriver=step(0.1, colorRiver.a)*colorRiver.a;\n\
    vec3 bump_normal=mix(rot*n, vec3(0.,0.,1.1), min(1., Kriver*2.));\n\
\n\
    //light intensity\n\
    float I=dot(bump_normal,lightDir);\n\
 \n\
    float alpha=vAlpha*mix(1., vHeight,min(1.,16.*Kriver));\n\
\n\
    vec3 col=I*mix(color.rgb, colorRiver.rgb, Kriver);\n\
\n\
    gl_FragColor =  vec4(mix(fogColor, col, vFog), alpha);\n\
   \n\
}",
        shader_program_heightMapSurface;
    
    var scale_heightMapSurface, centre_heightMapSurface,
        scaleUV_heightMapSurface,
        position_heightMapSurface,
        sampler_heightMapSurface,
        sampler_islandHeightMap,
        samplerNormals_heightMapSurface,
        samplerRivers_heightMapSurface,
        samplerHeightMap_heightMapSurface,
        hMax_heightMapSurface,
        hMaxIsland_heightMapSurface,
        scaleIsland_heightMapSurface,
        offsetIsland_heightMapSurface,
        matrice_objet_heightMapSurface,
        matrice_vue_heightMapSurface,
        matrice_projection_heightMapSurface,
        fogDmin_heightMapSurface,
        fogDmax_heightMapSurface,
        fogColor_heightMapSurface,
        lightDir_heightMapSurface;
    
    //ISLAND HEIGHTMAP SURFACE RENDERING VARS (3D)
    var shader_vertex_source_islandHeightMapSurface="attribute vec2 position;\n\
\n\
uniform mat4 matrice_vue, matrice_projection, matrice_objet;\n\
uniform float hMax, fogDmin, fogDmax;\n\
uniform vec2 scale, centre;\n\
uniform sampler2D samplerHeightMap;\n\
\n\
\n\
varying float vFog, vHeight;\n\
varying vec2 vUV;\n\
varying vec3 vNormal;\n\
\n\
void main(void) {\n\
    vec2 pos2=position*scale+centre;\n\
    vec3 pos=vec3(pos2.xy,0.);\n\
\n\
    vec4 hmColor=texture2D(samplerHeightMap, position);\n\
    pos.z+=hmColor.r*hMax;\n\
\n\
    vec4 posScene=matrice_vue * matrice_objet * vec4(pos, 1.0);\n\
    gl_Position = matrice_projection * posScene;    \n\
\n\
    vUV = position;\n\
    vNormal=normalize(hmColor.gba-vec3(0.5,0.5,0.));\n\
    //vNormal=vec3(0.,0.,1.);\n\
    vFog =  1.-smoothstep(fogDmin, fogDmax, length(posScene.xyz));\n\
    vHeight = smoothstep(0.2, 0.5, pos.z);\n\
}",
        shader_fragment_source_islandHeightMapSurface="precision mediump float;\n\
\n\
uniform vec3 lightDir, fogColor;\n\
uniform vec2 scaleUV;\n\
uniform sampler2D sampler, samplerNormals, samplerRivers;\n\
\n\
varying float vFog, vHeight;\n\
varying vec2 vUV;\n\
varying vec3 vNormal;\n\
\n\
\n\
const vec3 Z=vec3(0.,0.,1.);\n\
\n\
//normal mapping : retourne la matrice de rotation d'axe u et d'angle theta\n\
mat3 rot_angleAxe(float theta, vec3 u) {\n\
    float c=cos(theta);\n\
    float s=sin(theta);\n\
    return mat3(\n\
        u.x*u.x+(1.-u.x*u.x)*c,  u.x*u.y*(1.-c)-u.z*s,    u.x*u.z*(1.-c)+u.y*s,\n\
        u.x*u.y*(1.-c)+u.z*s,    u.y*u.y+(1.-u.y*u.y)*c,  u.y*u.z*(1.-c)-u.x*s,\n\
        u.x*u.z*(1.-c)-u.y*s,    u.y*u.z*(1.-c)+u.x*s,    u.z*u.z+(1.-u.z*u.z)*c\n\
    );\n\
}\n\
\n\
//normal mapping : retourne la matrice de rotation qui envoie u sur v. u et v sont unitaires\n\
mat3 rot_vectVect(vec3 u,vec3 v) {\n\
    vec3 axe=normalize(cross(v,u));\n\
    float theta=acos(dot(u,v));\n\
    return rot_angleAxe(theta, axe);\n\
}\n\
\n\
\n\
void main(void) {\n\
    vec4 colorRiver=texture2D(samplerRivers, vUV);\n\
\n\
    vec2 UVscaled=vUV*scaleUV;\n\
    vec4 color=texture2D(sampler, UVscaled);\n\
    vec4 texture_normale=texture2D(samplerNormals, UVscaled);\n\
\n\
    //vec3 n=vec3((texture_normale.x-0.5), (texture_normale.y-0.5), texture_normale.z);\n\
    //mat3 rot=rot_vectVect(Z, vNormal);\n\
    //vec3 bump_normal=rot*n;\n\
    //vec3 bump_normal=mix(rot*n, vec3(0.,0.,1.), min(1., colorRiver.a*4.));\n\
\n\
    float riverK= step(0.1, colorRiver.a)*colorRiver.a;\n\
    vec3 bump_normal=mix(vNormal, vec3(0.,0.,1.), min(1., riverK*1.));\n\
\n\
    //light intensity\n\
    float I=dot(bump_normal,lightDir);\n\
    //float I=dot(vNormal,lightDir);\n\
\n\
   \n\
    vec3 col=I*mix(color.rgb, colorRiver.rgb, riverK);\n\
   \n\
    //compute alpha to mix water river and sea water near the seashore\n\
    float alpha=mix(1., vHeight,min(1.,16.*colorRiver.a));\n\
    //float alpha=vHeight;\n\
    gl_FragColor =  vec4(mix(fogColor, col, vFog), alpha);\n\
    //gl_FragColor = vec4(alpha,0.,0.,1.);\n\
}",
        shader_program_islandHeightMapSurface;
    
    var scale_islandHeightMapSurface, centre_islandHeightMapSurface,
        scaleUV_islandHeightMapSurface,
        position_islandHeightMapSurface,
        sampler_islandHeightMapSurface,
        samplerNormals_islandHeightMapSurface,
        samplerHeightMap_islandHeightMapSurface,
        samplerRivers_islandHeightMapSurface,
        hMax_islandHeightMapSurface,
        matrice_objet_islandHeightMapSurface,
        matrice_vue_islandHeightMapSurface,
        matrice_projection_islandHeightMapSurface,
        fogDmin_islandHeightMapSurface,
        fogDmax_islandHeightMapSurface,
        fogColor_islandHeightMapSurface,
        lightDir_islandHeightMapSurface;
        
    
    //GLASS RENDERING VARS (3D)
    var shader_vertex_source="\n\
precision mediump float;\n\
\n\
attribute vec3 position;\n\
\n\
uniform vec3 centre, camera, lightDir;\n\
uniform float scale, hightLight;\n\
uniform mat4 matrice_vue, matrice_projection, matrice_objet;\n\
\n\
varying float vI;\n\
varying vec2 vUV;\n\
\n\
\n\
void main(void) {\n\
    //compute position\n\
    vec4 pos= matrice_objet * vec4((position*scale)+centre, 1.0);\n\
\n\
    //compute refraction\n\
    vec3 incident=normalize(pos.xyz+camera);            //incident vector\n\
    vec3 refracted=refract(incident, position, 1./1.6);      //refracted vector\n\
    vec3 reflected=reflect(incident, position);\n\
    float k=(centre.z-pos.z)/refracted.z;              //M,k so as M=P + k * refracted belongs to (Centrexz)\n\
    vec3 M = ((pos.xyz + k*refracted)-centre)/scale;  \n\
    vUV=vec2(0.5,0.5)+5.*(M.xy*0.5);\n\
    \n\
    //compute lighting\n\
    vI=(0.6+0.5*hightLight);                                //mouseover hightlighting \n\
    vI*=0.8+0.3*max(dot(position, lightDir),0.);            //diffuse\n\
    vI*=(1.+max(0., 2.*pow(dot(reflected, lightDir), 6.))); //specular\n\
    \n\
    gl_Position = matrice_projection * matrice_vue * pos;\n\
}",
        shader_fragment_source="precision mediump float;\n\
\n\
uniform float alpha;\n\
uniform sampler2D sampler;\n\
\n\
varying float vI;\n\
varying vec2 vUV;\n\
\n\
\n\
void main(void) {\n\
    vec4 textureColor = texture2D(sampler, vUV);\n\
    gl_FragColor = vec4(textureColor.rgb*vI,alpha);\n\
}",
        shader_program;

    var matrice_vue,
        matrice_projection,
        matrice_objet,
        scale, centre,hightLight,
        position,
        camera,
        lightDir,
        sampler,
        alpha;



    var that={
        instance: function(spec) {
            //EROSION MAP SHADER
            shader_program_erode=get_shaderProgram(shader_vertex_source_erode, shader_fragment_source_erode, "ERODE");
            emboss_erode = GL.getUniformLocation(shader_program_erode, "emboss");
            sampler_erodeMap_erode = GL.getUniformLocation(shader_program_erode, "samplerErode");
            sampler_heightMap_erode = GL.getUniformLocation(shader_program_erode, "samplerHeight");
            position_erode = GL.getAttribLocation(shader_program_erode, "position");

            
            //WATER SHADERS
            shader_program_water=get_shaderProgram(shader_vertex_source_water, shader_fragment_source_water, "WATER");
            matrice_projection_water = GL.getUniformLocation(shader_program_water, "matrice_projection");
            matrice_vue_water = GL.getUniformLocation(shader_program_water, "matrice_vue");
            matrice_objet_water = GL.getUniformLocation(shader_program_water, "matrice_objet");
            camera_water = GL.getUniformLocation(shader_program_water, "camera");
            samplerCiel_water = GL.getUniformLocation(shader_program_water, "samplerCiel");
            samplerFond_water = GL.getUniformLocation(shader_program_water, "samplerFond");
            amplitudes_water=GL.getUniformLocation(shader_program_water, "As");
            ks_water=GL.getUniformLocation(shader_program_water, "ks");
            ws_water=GL.getUniformLocation(shader_program_water, "ws");
            indice_refraction_water=GL.getUniformLocation(shader_program_water, "i");
            profondeur_water=GL.getUniformLocation(shader_program_water, "H");
            couleur_eau_water=GL.getUniformLocation(shader_program_water, "couleur_eau");
            visibilite_water=GL.getUniformLocation(shader_program_water, "visibilite");
            lumiere_water=GL.getUniformLocation(shader_program_water, "lumiere");
            time_water=GL.getUniformLocation(shader_program_water, "t");
            fogDmin_water = GL.getUniformLocation(shader_program_water, "fogDmin");
            fogDmax_water = GL.getUniformLocation(shader_program_water, "fogDmax");
            fogColor_water = GL.getUniformLocation(shader_program_water, "fogColor");
        
            position_water = GL.getAttribLocation(shader_program_water, "position");
            
            

            //TEXTURE READ SHADERS
            shader_program_textureRead=get_shaderProgram(shader_vertex_source_textureRead, shader_fragment_source_textureRead, "TEXTURE READ");
            sampler_textureRead = GL.getUniformLocation(shader_program_textureRead, "sampler");
            position_textureRead = GL.getAttribLocation(shader_program_textureRead, "position");


            //HEIGHTMAP TO NORMALS MAP RENDERING
            shader_program_normals=get_shaderProgram(shader_vertex_source_normals, shader_fragment_source_normals, "NORMALS");
            sampler_normals = GL.getUniformLocation(shader_program_normals, "sampler");
            wh_normals = GL.getUniformLocation(shader_program_normals, "wh");
            H_normals = GL.getUniformLocation(shader_program_normals, "H");
            size_normals = GL.getUniformLocation(shader_program_normals, "size");
            position_normals = GL.getAttribLocation(shader_program_normals, "position");


            //HEIGHTMAPSURFACE RENDERING
            shader_program_heightMapSurface=get_shaderProgram(shader_vertex_source_heightMapSurface, shader_fragment_source_heightMapSurface, "HEIGHTMAP SURFACE");
            matrice_projection_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "matrice_projection");
            matrice_vue_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "matrice_vue");
            matrice_objet_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "matrice_objet");

            scaleUV_heightMapSurface=GL.getUniformLocation(shader_program_heightMapSurface, "scaleUV");
            scale_heightMapSurface=GL.getUniformLocation(shader_program_heightMapSurface, "scale");
            centre_heightMapSurface=GL.getUniformLocation(shader_program_heightMapSurface, "centre");
            sampler_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "sampler");
            sampler_islandHeightMap = GL.getUniformLocation(shader_program_heightMapSurface, "samplerIsland");
            samplerNormals_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "samplerNormals");
            samplerHeightMap_heightMapSurface =  GL.getUniformLocation(shader_program_heightMapSurface, "samplerHeightMap");
            samplerRivers_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "samplerRivers");
	    hMax_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "hMax");
	    hMaxIsland_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "hMaxIsland");
            offsetIsland_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "offsetIsland");
            scaleIsland_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "scaleIsland");
            lightDir_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "lightDir");
            fogDmin_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "fogDmin");
            fogDmax_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "fogDmax");
            fogColor_heightMapSurface = GL.getUniformLocation(shader_program_heightMapSurface, "fogColor");
        
            position_heightMapSurface = GL.getAttribLocation(shader_program_heightMapSurface, "position");
            
            //ISLAND HEIGHTMAPSURFACE RENDERING
            shader_program_islandHeightMapSurface=get_shaderProgram(shader_vertex_source_islandHeightMapSurface, shader_fragment_source_islandHeightMapSurface, "HEIGHTMAP SURFACE");
            matrice_projection_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "matrice_projection");
            matrice_vue_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "matrice_vue");
            matrice_objet_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "matrice_objet");

            scaleUV_islandHeightMapSurface=GL.getUniformLocation(shader_program_islandHeightMapSurface, "scaleUV");
            scale_islandHeightMapSurface=GL.getUniformLocation(shader_program_islandHeightMapSurface, "scale");
            centre_islandHeightMapSurface=GL.getUniformLocation(shader_program_islandHeightMapSurface, "centre");
            sampler_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "sampler");
            samplerNormals_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "samplerNormals");
            samplerHeightMap_islandHeightMapSurface =  GL.getUniformLocation(shader_program_islandHeightMapSurface, "samplerHeightMap");
            samplerRivers_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "samplerRivers");
	    hMax_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "hMax");
	    lightDir_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "lightDir");
            fogDmin_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "fogDmin");
            fogDmax_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "fogDmax");
            fogColor_islandHeightMapSurface = GL.getUniformLocation(shader_program_islandHeightMapSurface, "fogColor");
            
            
            position_islandHeightMapSurface = GL.getAttribLocation(shader_program_islandHeightMapSurface, "position");
            
            
            //HEIGHTMAP RENDERING
            shader_program_heightMap=get_shaderProgram(shader_vertex_source_heightMap, shader_fragment_source_heightMap, "HEIGHTMAP");
            scale_heightMap=GL.getUniformLocation(shader_program_heightMap, "scale");
            centre_heightMap=GL.getUniformLocation(shader_program_heightMap, "centre");
            sampler_heightMap = GL.getUniformLocation(shader_program_heightMap, "sampler");
	    alpha_heightMap = GL.getUniformLocation(shader_program_heightMap, "alpha");
	    
            position_heightMap = GL.getAttribLocation(shader_program_heightMap, "position");
            
            
            
            //DEFAULT RENDERING
            shader_program=get_shaderProgram(shader_vertex_source, shader_fragment_source, "DEFAULT");

            matrice_projection = GL.getUniformLocation(shader_program, "matrice_projection");
            matrice_vue = GL.getUniformLocation(shader_program, "matrice_vue");
            matrice_objet = GL.getUniformLocation(shader_program, "matrice_objet");
	    sampler = GL.getUniformLocation(shader_program, "sampler");
            camera = GL.getUniformLocation(shader_program, "camera");
            
            scale=GL.getUniformLocation(shader_program, "scale");
            centre=GL.getUniformLocation(shader_program, "centre");
            hightLight=GL.getUniformLocation(shader_program, "hightLight");
            alpha=GL.getUniformLocation(shader_program, "alpha");
            lightDir=GL.getUniformLocation(shader_program, "lightDir");

            position = GL.getAttribLocation(shader_program, "position");
        },

        set_matriceProjection: function(matrice) {
            GL.uniformMatrix4fv(matrice_projection, false, matrice);
        },
        set_vue: function(matrice, camPos) {
            GL.uniform3fv(camera, camPos);
            GL.uniformMatrix4fv(matrice_vue, false, matrice);
        },
        set_matriceObjet: function(matrice) {
            GL.uniformMatrix4fv(matrice_objet, false, matrice);
        },
        set_vertexPointers: function() {
            GL.vertexAttribPointer(position, 3, GL.FLOAT, false,12,0);
        },
        set_scale: function(s){
            GL.uniform1f(scale, s);
        },
        set_position: function(pos){
            GL.uniform3fv(centre, pos);
        },
        set_alpha: function(a){
            GL.uniform1f(alpha, a);
        },
        set_hightLight: function(hl){
            GL.uniform1f(hightLight, hl);
        },
        set_defaultShader: function() {
            GL.useProgram(shader_program);
            GL.enableVertexAttribArray(position);
            GL.uniform1i(sampler, 0);
            GL.uniform3fv(lightDir, SETTINGS.light.direction);
        },
        unset_defaultShader: function() {
            GL.disableVertexAttribArray(position);
        },
        
        
        
        //HEIGHTMAP RENDERING :
        set_heightMap_shaders: function() {
            GL.useProgram(shader_program_heightMap);
            GL.enableVertexAttribArray(position_heightMap);
        },
        unset_heightMap_shaders: function() {
            GL.disableVertexAttribArray(position_heightMap);
        },
        set_node_heightMap: function(scale, position, alpha){
            GL.uniform2fv(scale_heightMap, scale);
            GL.uniform2fv(centre_heightMap, position);
            GL.uniform1f(alpha_heightMap, alpha);
        },
        set_vertexPointers_heightMap: function() {
            GL.vertexAttribPointer(position_heightMap, 2, GL.FLOAT, false,8,0) ;
        },
        
        
        
        //HEIGHTMAPSURFACE RENDERING
        set_heightMapSurface_shaders: function() {
            GL.useProgram(shader_program_heightMapSurface);
            GL.enableVertexAttribArray(position_heightMapSurface);
            
            GL.uniform1i(sampler_heightMapSurface, 0),
            GL.uniform1i(samplerHeightMap_heightMapSurface, 1),
            GL.uniform1i(samplerNormals_heightMapSurface, 2),
            GL.uniform1i(sampler_islandHeightMap, 3),
            GL.uniform1i(samplerRivers_heightMapSurface, 4);
    
            GL.uniform3fv(lightDir_heightMapSurface, SETTINGS.light.direction);
        },
        unset_heightMapSurface_shaders: function() {
            GL.disableVertexAttribArray(position_heightMapSurface);
        },
        set_vertexPointers_heightMapSurface: function() {
            GL.vertexAttribPointer(position_heightMapSurface, 2, GL.FLOAT, false,8,0) ;
        },
        set_matriceObjet_heightMapSurface: function(matrice) {
            GL.uniformMatrix4fv(matrice_objet_heightMapSurface, false, matrice);
        },
        set_matriceProjection_heightMapSurface: function(matrice) {
            GL.uniformMatrix4fv(matrice_projection_heightMapSurface, false, matrice);
        },
        set_matriceVue_heightMapSurface: function(matrice) {
            GL.uniformMatrix4fv(matrice_vue_heightMapSurface, false, matrice);
        },        
        set_hMax_heightMapSurface: function(hMax){
            GL.uniform1f(hMax_heightMapSurface, hMax);
        },
        set_dim_heightMapSurface: function(scale, centre){
            GL.uniform2fv(scale_heightMapSurface, scale);
            GL.uniform2fv(centre_heightMapSurface,centre);
        },
        set_scaleUV_heightMapSurface: function(scaleU, scaleV){
            GL.uniform2f(scaleUV_heightMapSurface, scaleU, scaleV);
        },
        set_island_heightMapSurface: function(hMax, scale, offset){
            GL.uniform1f(hMaxIsland_heightMapSurface, hMax);
            GL.uniform2fv(scaleIsland_heightMapSurface, scale);
            GL.uniform2fv(offsetIsland_heightMapSurface, offset);
        },
        set_fog_heightMapSurface : function(dMin, dMax, color){
            GL.uniform1f(fogDmin_heightMapSurface, dMin),
            GL.uniform1f(fogDmax_heightMapSurface, dMax),
            GL.uniform3fv(fogColor_heightMapSurface, color);
        },


        //ISLAND HEIGHTMAPSURFACE RENDERING
        set_islandHeightMapSurface_shaders: function() {
            GL.useProgram(shader_program_islandHeightMapSurface);
            GL.enableVertexAttribArray(position_islandHeightMapSurface);
            GL.uniform1i(sampler_islandHeightMapSurface, 0),
            GL.uniform1i(samplerHeightMap_islandHeightMapSurface, 1),
            GL.uniform1i(samplerNormals_islandHeightMapSurface, 2),
            GL.uniform1i(samplerRivers_islandHeightMapSurface, 3);
            GL.uniform3fv(lightDir_islandHeightMapSurface, SETTINGS.light.direction);
        },
        unset_islandHeightMapSurface_shaders: function() {
            GL.disableVertexAttribArray(position_islandHeightMapSurface);
        },
        set_vertexPointers_islandHeightMapSurface: function() {
            GL.vertexAttribPointer(position_islandHeightMapSurface, 2, GL.FLOAT, false,8,0) ;
        },
        set_matriceObjet_islandHeightMapSurface: function(matrice) {
            GL.uniformMatrix4fv(matrice_objet_islandHeightMapSurface, false, matrice);
        },
        set_matriceProjection_islandHeightMapSurface: function(matrice) {
            GL.uniformMatrix4fv(matrice_projection_islandHeightMapSurface, false, matrice);
        },
        set_matriceVue_islandHeightMapSurface: function(matrice) {
            GL.uniformMatrix4fv(matrice_vue_islandHeightMapSurface, false, matrice);
        },        
        set_hMax_islandHeightMapSurface: function(hMax){
            GL.uniform1f(hMax_islandHeightMapSurface, hMax);
        },
        set_dim_islandHeightMapSurface: function(scale, centre){
            GL.uniform2fv(scale_islandHeightMapSurface, scale);
            GL.uniform2fv(centre_islandHeightMapSurface,centre);
        },
        set_scaleUV_islandHeightMapSurface: function(scaleU, scaleV){
            GL.uniform2f(scaleUV_islandHeightMapSurface, scaleU, scaleV);
        },
        set_fog_islandHeightMapSurface : function(dMin, dMax, color){
            GL.uniform1f(fogDmin_islandHeightMapSurface, dMin),
            GL.uniform1f(fogDmax_islandHeightMapSurface, dMax),
            GL.uniform3fv(fogColor_islandHeightMapSurface, color);
        },



        //HEIGHTMAP TO NORMAL MAP RENDERING
        set_normals_shaders: function() {
            GL.useProgram(shader_program_normals);
            GL.enableVertexAttribArray(position_normals);
            GL.uniform1i(sampler_normals,0);
        },
        unset_normals_shaders: function() {
            GL.disableVertexAttribArray(position_normals);
        },
        set_vertexPointers_normals: function() {
            GL.vertexAttribPointer(position_normals, 2, GL.FLOAT, false,8,0) ;
        },
        set_whHSize: function(w,h, H, sx, sy){
            GL.uniform2f(wh_normals,w,h);
            GL.uniform1f(H_normals, H);
            GL.uniform2f(size_normals, sx,sy);
        },



        //SIMPLE TEXTURE RENDERING
        set_textureRead_shaders: function() {
            GL.useProgram(shader_program_textureRead);
            GL.enableVertexAttribArray(position_textureRead);
            GL.uniform1i(sampler_textureRead,0);
        },
        unset_textureRead_shaders: function() {
            GL.disableVertexAttribArray(position_textureRead);
        },
        set_vertexPointers_textureRead: function() {
            GL.vertexAttribPointer(position_textureRead, 2, GL.FLOAT, false,8,0) ;
        },


        //WATER RENDERING
        set_water_shader: function() {
            GL.useProgram(shader_program_water);
            GL.enableVertexAttribArray(position_water);
            GL.uniform1i(samplerCiel_water, 0);
            GL.uniform1i(samplerFond_water, 1);
        },
        set_fog_water : function(dMin, dMax, color){
            GL.uniform1f(fogDmin_water, dMin),
            GL.uniform1f(fogDmax_water, dMax),
            GL.uniform3fv(fogColor_water, color);
        },
        unset_water_shader: function() {
            GL.disableVertexAttribArray(position_water);
        },
        set_time_water: function(t) {
            GL.uniform1f(time_water, t);
        },
        set_liquid_water: function(i, h, couleur,vis,lum) {
            GL.uniform1f(indice_refraction_water, i);
            GL.uniform1f(profondeur_water, h);
            GL.uniform4fv(couleur_eau_water, couleur);
            GL.uniform1f(visibilite_water, vis);
            GL.uniform3fv(lumiere_water, lum);
        },
        set_vagues_water: function(as, ks_, ws_) {
            GL.uniform1fv(amplitudes_water, as);
            GL.uniform2fv(ks_water, ks_);
            GL.uniform1fv(ws_water, ws_);
        },
        set_matrices_water: function(projection, vue) {
            GL.uniformMatrix4fv(matrice_projection_water, false, projection);
            GL.uniformMatrix4fv(matrice_vue_water, false, vue);
        },
        set_matriceObjet_water: function(matrice) {
            GL.uniformMatrix4fv(matrice_objet_water, false, matrice);
        },
        set_camera_water: function(c) {
            GL.uniform3fv(camera_water, c);
        },
        set_vertexPointers_water: function() {
            GL.vertexAttribPointer(position_water, 2, GL.FLOAT, false,8,0);
        },
        
        //EROSION
        set_erode_shaders: function(emboss) {
            GL.useProgram(shader_program_erode);
            GL.enableVertexAttribArray(position_erode);
            GL.uniform1i(sampler_erodeMap_erode,1);
            GL.uniform1i(sampler_heightMap_erode,0);
            GL.uniform1f(emboss_erode, emboss);
        },
        unset_erode_shaders: function() {
            GL.disableVertexAttribArray(position_erode);
        },
        set_vertexPointers_erode: function() {
            GL.vertexAttribPointer(position_erode, 2, GL.FLOAT, false,8,0) ;
        }
    };
    return that;

})();


/*
 * spec.url: texture url
 * spec.minFilter. default : GL.NEAREST_MIPMAP_LINEAR
 * spec.onload: function launched when texture is ready
 */
var Texture=(function () {
    var defaultTextureLoaded, defaultTexture;
    return {
        //this function must be called after the creation of webgl context GL
        init: function() { 
            //build default texture
            defaultTexture=GL.createTexture();
            var defaultTextureImage=new Image();
            defaultTextureImage.onload=function(event){
                GL.bindTexture(GL.TEXTURE_2D, defaultTexture);
                GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, defaultTextureImage);
                GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
                GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR_MIPMAP_LINEAR);
                GL.generateMipmap(GL.TEXTURE_2D);
                GL.bindTexture(GL.TEXTURE_2D, null);
                defaultTextureLoaded=true;
            };
            
            defaultTextureImage.src=SETTINGS.Lsystems.defaultTextureImageURL;
        },
        
        get_default: function() {
            return defaultTexture;
        },
        
        instance: function(spec) {
           var loaded=false,
               texture=GL.createTexture(),
               image=new Image();

           spec.minFilter=spec.minFilter ||  GL.NEAREST_MIPMAP_LINEAR;
           
           image.src=spec.url;
           var load=function() {
                    GL.bindTexture(GL.TEXTURE_2D, texture);
                    GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image);
                    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
                    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, spec.minFilter);
                    GL.generateMipmap(GL.TEXTURE_2D);
                    GL.bindTexture(GL.TEXTURE_2D, null);
                    loaded=true;
                    if (spec.onload) spec.onload();
           };
           image.onload=function() { load(); };

            var that={
                   is_loaded: function() { return loaded; },
                   draw: function() {
                       if (!loaded) return false;
                       GL.bindTexture(GL.TEXTURE_2D, texture);
                       return true;
                   }
            };
            return that;
        }
    };
})();



/*
 * spec: tableau_js : tableau js des vertex
 */
var VBO=(function() {
    return {
       instance: function(spec) {
            var vbo= GL.createBuffer ();
            GL.bindBuffer(GL.ARRAY_BUFFER, vbo);
            GL.bufferData(GL.ARRAY_BUFFER,
	  		  new Float32Array(spec.tableau_js),
			  GL.STATIC_DRAW);
            return {
                draw: function() { //for default rendering (nodes)             
                   GL.bindBuffer(GL.ARRAY_BUFFER, vbo) ;
                   Shaders.set_vertexPointers();
                },
                
                drawErode: function() { //for default rendering (nodes)             
                   GL.bindBuffer(GL.ARRAY_BUFFER, vbo) ;
                   Shaders.set_vertexPointers_erode();
                },
                
                draw_heightMap: function() { //draw with heightmap creation shaders
                    GL.bindBuffer(GL.ARRAY_BUFFER, vbo) ;
                    Shaders.set_vertexPointers_heightMap();
                },

                draw_normalMap: function() { //draw with heightmap creation shaders (heightmap -> normal map)
                    GL.bindBuffer(GL.ARRAY_BUFFER, vbo) ;
                    Shaders.set_vertexPointers_normals();
                },

                draw_textureRead: function() { 
                    GL.bindBuffer(GL.ARRAY_BUFFER, vbo) ;
                    Shaders.set_vertexPointers_textureRead();
                },
                
                drawAsHeightMapSurface: function() {  //draw with heightmap surface shaders
                    GL.bindBuffer(GL.ARRAY_BUFFER, vbo) ;
                    Shaders.set_vertexPointers_heightMapSurface();
                },
                
                drawAsIslandHeightMapSurface: function() {  //draw with heightmap surface shaders
                    GL.bindBuffer(GL.ARRAY_BUFFER, vbo) ;
                    Shaders.set_vertexPointers_islandHeightMapSurface();
                },

                draw_water: function() {
                    GL.bindBuffer(GL.ARRAY_BUFFER, vbo) ;
                    Shaders.set_vertexPointers_water();
                }
            }
       }
    }
})();

/*
 * spec: tableau_js : tableau js des indices
 * spec.int32Indices : bool
 */
var VBO_indices=(function() {
    return {
       instance: function(spec) {
            if (!spec.int32Indices) spec.int32Indices=false;
            var vbo= GL.createBuffer ();
            GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, vbo);
            GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,
	  		   (spec.int32Indices)?new Uint32Array(spec.tableau_js):new Uint16Array(spec.tableau_js),
			  GL.STATIC_DRAW);
            var taille=spec.tableau_js.length;
            return {
                draw: function() {
                   GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, vbo);
                   GL.drawElements(GL.TRIANGLES, taille, (spec.int32Indices)?GL.UNSIGNED_INT:GL.UNSIGNED_SHORT, 0);
                },
                
                bind: function() {
                    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, vbo);
                },
                
                draw_Elements: function() {
                    GL.drawElements(GL.TRIANGLES, taille, GL.UNSIGNED_SHORT, 0);
                }
            }
       }
    }
})();


/*
 * spec.maillage : maillage de l'objet (type Maillage)
 * spec.matrix: matrice de mouvement (defaut : I4)
 * spec.texture : Texture
 */
var Objet=(function() {
    return {
        instance: function(spec) {
            spec.matrix=spec.matrix || lib_matrix4.get_I4();
            var texture=spec.texture || false;
            var matrix=lib_matrix4.copyNew(spec.matrix);
            var that={
                drawAsHeightMapSurface: function(mat) {
                    Shaders.set_matriceObjet_heightMapSurface(mat);
                    spec.maillage.drawAsHeightMapSurface();
                },
                drawAsIslandHeightMapSurface: function(mat) {
                    Shaders.set_matriceObjet_islandHeightMapSurface(mat);
                    spec.maillage.drawAsIslandHeightMapSurface();
                },
            
                draw: function() {
                    if (texture) texture.draw();
                    Shaders.set_matriceObjet(matrix);
                    spec.maillage.draw();
                },
                rotateX: function(dTheta) {
                    lib_matrix_rot4.rotateX(matrix, dTheta);
                },
                rotateY: function(dTheta) {
                    lib_matrix_rot4.rotateY(matrix, dTheta);
                },
                rotateZ: function(dTheta) {
                    lib_matrix_rot4.rotateZ(matrix, dTheta);
                },

                drawPhysics: false,

                set_physics: function(phyFunc) {
                    that.drawPhysics=phyFunc;
                },

                set_position: function(pos){
                    lib_matrix_mv.set_position(matrix, pos);
                },

                drawResources: function() {
                    if (texture) texture.draw();
                    Shaders.set_matriceObjet(matrix);
                    spec.maillage.drawVBO();
                    spec.maillage.bindVBOIndices();
                    
                },

                drawInstance: function(position) {
                    Shaders.set_position(position);
                    spec.maillage.drawVBOIndices_opt();
                }
            };
            return that;
        }
    }
})();

/* Inherit from Objet class
 * spec.centre : position du centre du cube. defaut : [0,0,0]
 * spec.l : taille d'une arrete du cube. defaut : 1
 */
var Cube=(function() {
    return {        
        instance: function(spec) {
            spec.l=spec.l || 1;
            spec.centre=spec.centre || [0,0,0];
            var a=spec.l/2,
                c=spec.centre;
            return Objet.instance({
                    texture: spec.texture,
                    maillage: Maillage.instance({
                    vertices: [-a+c[0], -a+c[1], -a+c[2], //position du 1° sommer
                             0,0,                      //couleur du 1° sommet (noir)
                             -a+c[0], a+c[1], -a+c[2],
                             1,0,
                             a+c[0], a+c[1], -a+c[2],
                             1,1,
                             a+c[0], -a+c[1], -a+c[2],
                             0,1,
                             -a+c[0], -a+c[1], a+c[2],
                             0,0,
                             -a+c[0], a+c[1], a+c[2],
                             1,0,
                             a+c[0], a+c[1], a+c[2],
                             1,1,
                             a+c[0], -a+c[1], a+c[2],
                             0,1
                         ],
                    indices: [0,1,2, 0,2,3, //les 2 triangles de la face 1
                              1,5,6, 1,6,2,
                              3,2,6, 3,6,7,
                              0,4,7, 0,7,3,
                              0,1,5, 0,5,4,
                              4,5,6, 4,6,7
                    ]
            })});
        }
    }
})();


/* Inherit from Objet class
 * spec.centre : position du centre du cube. defaut : [0,0,0]
 * spec.rayon : rayon de la sphere. defaut : 1,
 * bandes : nombre de bandes. defaut : 16
 * couronnes : nombre de couronnes. defaut : 16
 */
var Sphere=(function() {
    return {
        instance: function(spec) {
            var centre=spec.centre || [0,0,0],
                rayon=spec.rayon || 1,
                bandes=spec.bandes ||16,
                couronnes=spec.couronnes || 16,
                vertices=[],
                indices=[];

            var c, b, theta, phi;
            for (c=0; c<=couronnes; c++) {
                phi=((c/couronnes)-0.5)*Math.PI;
                for (b=0; b<=bandes; b++) {
                    theta=(b/bandes)*2*Math.PI;
                    vertices.push(centre[0]+Math.cos(theta)*Math.cos(phi)*rayon, //X
                                  centre[1]+Math.sin(theta)*Math.cos(phi)*rayon, //Y
                                  centre[2]+Math.sin(phi)*rayon                 //Z
                                  );
                    
                    if (c!==0 ) {
                        if (c!==couronnes) indices.push(c*(bandes+1)+b, c*(bandes+1)+b-1, (c-1)*(bandes+1)+b);
                        if (c!==1) indices.push(c*(bandes+1)+b-1, (c-1)*(bandes+1)+b, (c-1)*(bandes+1)+b-1);
                    }
                }
                if (c===0 || c===couronnes) continue; //premiere ou derniere couronne

            }
            return Objet.instance({
                    texture: spec.texture,
                    maillage: Maillage.instance({
                    vertices: vertices,
                    indices: indices
            })});
        }
    };
})();

/* Inherit from Objet class
 * 
 * grid object
 * 
 * spec.x : number of x
 * spec.y : number of y
 * 
 */
var Grid=(function() {
    return {
        instance: function(spec){
            var x,y, i=0;
            var vertices=[], indices=[];
            for (x=0; x<=spec.x; x++){
                for (y=0; y<=spec.y; y++){
                    vertices.push(x/spec.x, y/spec.y);
                    if (x!==0 && y!==0){
                        indices.push(
                        i, i-1, i-1-(spec.y+1),
                        
                        i, i-1-(spec.y+1), i-(spec.y+1));
                    }
                    i++;
                }
            }
            
            console.log(vertices.length, indices.length);
            var that=Objet.instance({
                maillage: Maillage.instance({
                    vertices: vertices,
                    indices: indices,
                    int32Indices: true
                })
            });
           
            return that;
        }
    };
    
})();/*
 * spec.camera : position de la caméra. defaut : [0,0,0]
 * spec.theta : angle horizontal en radians. defaut : 0
 * spec.phi : angle vertical en radians. defaut : 0
 * spec.angle : angle de vue en degrés. Utilisé pour la matrice de projection. defaut : 45
 * spec.zMin : zMin de la matrice de projection. defaut : 1
 * spec. zMax : zMax de la matrice de projection. defaut : 10
 * spec.a : rapport L/H du canvas. defaut : CV.width/CV.height
 */
var VUE;
var Vue=(function() {
    return {
        instance: function(spec) {
            spec.camera=spec.camera || [0,0,0];
            spec.theta=spec.theta || 0;
            spec.phi=spec.phi ||0;
            spec.angle=spec.angle || 45;
            spec.zMin=spec.zMin || 1;
            spec.zMax=spec.zMax || 10;
            spec.a=CV.width/CV.height;

            var matrice_vue=lib_matrix4.get_I4(), matrice_projection;
            
            var calcule_matrice_projection=function(a) {
                matrice_projection=(spec.ortho)?lib_matrix_projection.getOrtho(spec.largeur, spec.a, spec.zMin, spec.zMax):lib_matrix_projection.get(spec.angle, a, spec.zMin, spec.zMax);
                if (RAY) RAY.set(matrice_projection, CV.width, CV.height);
            };
            calcule_matrice_projection(spec.a);

           
            var calcule_matrice=function() {
                lib_matrix4.set_I4(matrice_vue);
                lib_matrix_rot4.rotateZ(matrice_vue, spec.theta);
                
                lib_matrix_rot4.rotateX(matrice_vue, spec.phi);
                lib_matrix_mv.translateRot(matrice_vue, spec.camera);
            }

            var that={
                draw: function() {
                    Shaders.set_vue(matrice_vue, spec.camera);
                },
                drawHeightMapSurface: function() {
                    Shaders.set_matriceVue_heightMapSurface(matrice_vue);
                    Shaders.set_matriceProjection_heightMapSurface(matrice_projection);
                },
                drawIslandHeightMapSurface: function() {
                    Shaders.set_matriceVue_islandHeightMapSurface(matrice_vue);
                    Shaders.set_matriceProjection_islandHeightMapSurface(matrice_projection);
                },
                draw_water: function() {
                    Shaders.set_matrices_water(matrice_projection, matrice_vue);
                    Shaders.set_camera_water(spec.camera);
                },
                drawPhysics: function() {

                },
                plein_ecran: function() {
                    var dimensionne_canvas=function(event) {
                        CV.width=window.innerWidth;
                        CV.height=window.innerHeight;
                        calcule_matrice_projection(CV.width/CV.height);
                        Shaders.set_defaultShader();
                        Shaders.set_matriceProjection(matrice_projection);
                        Shaders.unset_defaultShader();
                    };
                    window.addEventListener("resize", dimensionne_canvas, true);
                    dimensionne_canvas();
                },
                set_angles: function(phi, theta){
                    spec.theta=theta,
                    spec.phi=phi;
                    calcule_matrice();
                },

                translateXVue: function(d)  { //left/right arrow
                    spec.camera[0]+=d*Math.cos(spec.theta);
                    spec.camera[1]-=d*Math.sin(spec.theta);

                    calcule_matrice();
                },

                translateYVue: function(d)  { //mouse wheel
                    spec.camera[2]+=d;
                    calcule_matrice();
                },

                translateZVue: function(d)  { //up/down arrow
                    spec.camera[1]+=d*Math.cos(spec.theta);
                    spec.camera[0]+=d*Math.sin(spec.theta);
                    calcule_matrice();
                },

                get_projectionMatrix: function() {
                    return matrice_projection;
                },

                get_vueMatrix: function(){
                    return matrice_vue;
                },

                get_cameraPosition: function() {
                    return spec.camera;
                },
                
                distanceToCamera: function(point){
                    return lib_vector.distanceMinus(spec.camera, point);
                },
                
                copy_cameraXY: function(matrix) {
                    matrix[12]=-spec.camera[0],
                    matrix[13]=-spec.camera[1];        
                }
            };
            
            calcule_matrice();
            Shaders.set_matriceProjection(matrice_projection);
            VUE=that;
            return that;
        }
    };
})();

/*
 * spec.vue: vue associée à la navigation
 */
var RAY=false;
var Navigation=(function () {
    return {
        instance: function(spec) {
            var sensibilite_x=SETTINGS.navigation.mouse_sensibility_x,
                sensibilite_y=SETTINGS.navigation.mouse_sensibility_y,
                sensibilite_touche=SETTINGS.navigation.keyboard_sensibility,
                sensibilite_wheel=SETTINGS.navigation.wheel_sensibility,
                amortissement_coeff=SETTINGS.navigation.mouse_amortization,
                theta=SETTINGS.camera.theta0,
                phi=SETTINGS.camera.phi0,
                dX=0,
                dY=0;

            RAY=Rayon.instance({});
            RAY.set(spec.vue.get_projectionMatrix(), CV.width, CV.height);
            
            var touches=[], eventHandlers=[], clic=false, mouseX0=0, mouseY0=0;
            var add_eventHandler=function(type, handler) {
                window.addEventListener(type, handler, false);
                eventHandlers.push({type: type, handler: handler});
            }


            //MOUSE EVENTS
            var mouseDown=function(e) {
                clic=true;
                mouseX0=e.pageX;
                mouseY0=e.pageY;
            }

            var mouseUp=function(e) {
                clic=false;
            }

            var mouseMove=function(e) {
                RAY.lance(e.pageX, e.pageY, spec.vue.get_vueMatrix(), spec.vue.get_cameraPosition() );
                
                if (!clic) return false;
                dX=(e.pageX-mouseX0)*sensibilite_x,
                dY=(e.pageY-mouseY0)*sensibilite_y;
                phi+=dX;
                theta+=dY;

                spec.vue.set_angles(theta, phi);

                mouseX0=e.pageX;
                mouseY0=e.pageY;
            }

            var mouseWheel=function(e){
                var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));               
                spec.vue.translateYVue(sensibilite_wheel*delta);
                return false;
            }

            //KEYBOARD EVENTS
            var keyDown=function(e) {                
                e.preventDefault();
                if (touches.indexOf(e.keyCode)!=-1) return false;
                touches.push(e.keyCode);
                return false;
            }

            var keyUp=function(e) {
                var position=touches.indexOf(e.keyCode);
                if (position!=-1) touches.splice(position, 1);
                e.preventDefault();
                return false;
            }



            var manage_touche=function(touche) {
                switch(touche) {
                    case 37: //fleche de gauche                        
                        spec.vue.translateXVue(sensibilite_touche);
                    break;
                    case 39: //fleche de droite
                        spec.vue.translateXVue(-sensibilite_touche);
                    break;
                    case 38: //fleche du haut
                        spec.vue.translateZVue(-sensibilite_touche);
                    break;
                    case 40: //fleche du bas
                        spec.vue.translateZVue(sensibilite_touche);
                    break;
                }
            }

            var that={
                   drawPhysics: function() {
                      touches.map(manage_touche);

                      if (clic) return false;
                      dX*=amortissement_coeff;
                      dY*=amortissement_coeff;                      
                      phi+=dX;
                      theta+=dY;
                      spec.vue.set_angles(theta, phi);
                      return true;
                   },
                   
                   set: function() {
                       add_eventHandler("mousedown", mouseDown);
                       add_eventHandler("mouseup", mouseUp);
                       add_eventHandler("mousemove", mouseMove);

                       add_eventHandler("keyup", keyUp);
                       add_eventHandler("keydown", keyDown);
                       
                       add_eventHandler("mousewheel", mouseWheel);
                       add_eventHandler("DOMMouseScroll", mouseWheel);
                   },

                   unset: function() {
                       eventHandlers.map(function(e) { window.removeEventListener(e.type, e.handler, false);})
                       eventHandlers=[];
                   }
                   
            };
            return that;
        }
    };
})();


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

/*
 * spec : empty
 */
var Rayon=(function() {
    var A,B, Ps=[0,0,0], coeff_Xva, coeff_Xvb, coeff_Yva, coeff_Yvb, camera=[0,0,0];
    return {

        instance: function(spec) {
            return {
                set: function(Mp,w,h) {                    
                    A=Mp[0];
                    B=Mp[5];
                    coeff_Xva=(-1/A)*(2/w);
                    coeff_Xvb=1/A;
                    coeff_Yva=(1/B)*(2/h);
                    coeff_Yvb=-1/B;
                },
                 // Xp,Yp: coordonnées en pixel par rapport au coin supérieur gauche du canvas
                 // M : matrice de mouvement scene->vue
                 // cam : position de la camera
                lance: function(Xp, Yp, M, cam) {
                    //calcule dans le référentiel vue                    
                    Ps[0]=(coeff_Xva*Xp+coeff_Xvb);
                    Ps[1]=(coeff_Yva*Yp+coeff_Yvb);
                    Ps[2]=1;
                    lib_vector.normalize(Ps);

                    //passe au référentiel scène
                    lib_matrix_mv.do_inv_rot(M, Ps);

                    camera[0]=-cam[0];
                    camera[1]=-cam[1];
                    camera[2]=-cam[2];

                    SCENE.pick(camera, Ps, Xp, Yp);
                }
            }
        }
    }
})();



/*
 * returns a canvas with gaussian law coefficients
 *
 */

var Gauss=(function() {
    var that={
        get_gaussCanvas: function(n){
            var cv=document.createElement("canvas");
            cv.width=n, cv.height=n;
            var ctx=cv.getContext("2d");

            var xCtr=(n-1)/2, yCtr=(n-1)/2;
            var imageData=ctx.createImageData(n,n);

            var x,y,i, val, xNorm, yNorm;
            var a=1/3; //ecart type

            for(x=0; x<n; x++){
                xNorm=2*(x-xCtr)/(n-1)

                for (y=0; y<n; y++){
                    yNorm=2*(y-yCtr)/(n-1);
                    i=4*(x+y*n);

                    val=Math.exp(-(xNorm*xNorm+yNorm*yNorm)/a);
                    imageData.data[i]=Math.round(val*255);
                    imageData.data[i+3]=255;
                }
            }

            ctx.putImageData(imageData,0,0);
            return cv;
        },

        get_gaussTexture: function(gl, n, floatTexture){
            var cv=that.get_gaussCanvas(n);
            var texture=gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,gl.RGBA, (floatTexture)?gl.FLOAT:gl.UNSIGNED_BYTE, cv );
            return texture;
        }

    }
    return that;

})();

/*
 * 
 * spec.nodes : nodes array - from Lsystem
 * spec.size : size of the depthmap in px - must be POT. default : 1024
 * spec.gl : webgl context
 * spec.margin: margin between border and nodes - default : 1
 * spec.AABB : bounding box
 * spec.erodeTexturesSet: instance of ErodeTexturesSet. facultative
 * 
 * 
 * instancied in HeightmapSurface
 */
var Heightmap=(function() {
    var debug={
        heightMap: SETTINGS.debug.LsystemHeightMap,
        normalMap: SETTINGS.debug.LsystemNormalMap
    };
    
    var _initialized=false, _gl;
    var _gaussTexture, _gaussianPatchVBO, _gaussianPatchVBOIndices=VBO_indices;      
    var _normalMapFBO, _heightMapFBO;
            
    return {
        init: function(gl) {
            _gl=gl;
            var nGauss=SETTINGS.Lsystems.heightMapGaussPatchSizePx;
            _initialized=true;
            
            _gaussTexture=Gauss.get_gaussTexture(_gl, nGauss, true);
           //setup gaussian patch (textured with gaussTetxure)
            _gaussianPatchVBO=VBO.instance({
                tableau_js: [
                    -0.5,-0.5,
                    -0.5,0.5,
                    0.5,0.5,
                    0.5,-0.5
                ]
            });
            _gaussianPatchVBOIndices=VBO_indices.instance({
                tableau_js: [
                    0,1,2, 0,2,3
                ]
            });
            
            _normalMapFBO=_gl.createFramebuffer(),
            _heightMapFBO=_gl.createFramebuffer();
        },
        
        instance: function(spec){
            if (!_initialized){
                console.log("Heightmap must be initialized with Heightmap.init before use. Abort");
                return false;
            };
            
            spec.size=spec.size || 1024,
            spec.margin=spec.margin || 1;
            
            var nUV=spec.nUV || SETTINGS.Lsystems.textureTileInWidth; //number of colored texture patch on the heightmap
            var scaleNode=SETTINGS.Lsystems.heightMapPatchSizePx; //patch size
            var patchAlphaRandom=SETTINGS.Lsystems.heightMapPatchAlphaRandom,
                patchAlphaMin=SETTINGS.Lsystems.heightMapPatchAlphaMin;
            
            //create textures
            var heightMapTexture=_gl.createTexture(),
                normalMapTexture=_gl.createTexture();
                //get gauss texture as floating point texture
            
            //setup heightMapTexture
            _gl.bindTexture(_gl.TEXTURE_2D, heightMapTexture);            
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.LINEAR);
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
            _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,spec.size, spec.size, 0, _gl.RGBA, _gl.FLOAT, null);
            _gl.bindTexture(_gl.TEXTURE_2D, null);

            //setup render to texture for heightmap
            //var heightMapFBO=_gl.createFramebuffer();
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, _heightMapFBO);
            _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, heightMapTexture, 0);
            //_gl.bindFramebuffer(_gl.FRAMEBUFFER, null);

            //setup normalMapTexture
            _gl.bindTexture(_gl.TEXTURE_2D, normalMapTexture);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR_MIPMAP_LINEAR);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.LINEAR);
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
            _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,spec.size, spec.size, 0, _gl.RGBA, _gl.FLOAT, null);
            _gl.bindTexture(_gl.TEXTURE_2D, null);

            //setup render to texture for normalmap
            //var normalMapFBO=_gl.createFramebuffer();
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, _normalMapFBO);
            _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, normalMapTexture, 0);
            //_gl.bindFramebuffer(_gl.FRAMEBUFFER, null);

            //compute scale factors
            var heightMapWidth=spec.AABB.xMax-spec.AABB.xMin,
                heightMapHeight=spec.AABB.yMax-spec.AABB.yMin,
                heightMapCenterX=(spec.AABB.xMax+spec.AABB.xMin)/2,
                heightMapCenterY=(spec.AABB.yMax+spec.AABB.yMin)/2;
        
            var heightMapWidthReal=heightMapWidth-2*spec.margin,
                heightMapHeightReal=heightMapHeight-2*spec.margin;
                    
            var scaleXReal=heightMapWidthReal/heightMapWidth,
                scaleYReal=heightMapHeightReal/heightMapHeight;
        
            if (debug.heightMap) console.log("Heightmap : Compute heightmap for "+heightMapWidth+" X "+heightMapHeight+" area size");
            
            //scale factor for a patch
            var scaleNode=[
                scaleNode*1/(heightMapWidth),
                scaleNode*1/(heightMapHeight)
            ];
            
            
            var nodeScale=[0,0],
                nodePosition=[0,0];
        
            var scaleSurface=[
                heightMapWidth+2*spec.margin,
                heightMapHeight+2*spec.margin
            ],
            centerSurface=[
                -heightMapWidth/2-spec.margin,
                -heightMapHeight/2-spec.margin
            ];

            var scaleU=nUV;
            var scaleV=scaleU*heightMapHeight/heightMapWidth;


            var drawNode=function(node){
                if (node.generation>SETTINGS.Lsystems.heightMapPatchMaxGen) return;
                nodeScale[0]=node.scale*scaleNode[0],
                nodeScale[1]=node.scale*scaleNode[1];
        
                //position between -1 and 1
                nodePosition[0]=2*(((node.position[0]-spec.centre[0])*scaleXReal)/heightMapWidth),
                nodePosition[1]=2*(((node.position[1]-spec.centre[1])*scaleYReal)/heightMapHeight);
                
                var nodeAlpha=patchAlphaMin+Math.random()*patchAlphaRandom;
                nodeAlpha*=node.scale;

                Shaders.set_node_heightMap(nodeScale, nodePosition, nodeAlpha);
                _gaussianPatchVBOIndices.draw_Elements();
            }
            
            
            var that={
                get_normalTexture: function() {
                    return normalMapTexture;
                },
                
                compute: function() {
                    //COMPUTE HEIGHTMAP
                    Shaders.set_heightMap_shaders();
                   
                    if (!debug.heightMap) _gl.bindFramebuffer(_gl.FRAMEBUFFER, _heightMapFBO);
                    if (debug.heightMap) SCENE.stop();
                    
                    _gl.clearColor(0.,0.,0.,1.);
                    _gl.disable(_gl.DEPTH_TEST);
                    _gl.depthMask(false);
                    _gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE);
                    _gl.viewport(0.0, 0.0, spec.size, spec.size);
                    _gl.clear(_gl.COLOR_BUFFER_BIT);
                    
                    _gaussianPatchVBO.draw_heightMap();
                    _gaussianPatchVBOIndices.bind();
                    _gl.bindTexture(_gl.TEXTURE_2D, _gaussTexture);                    
                    spec.nodes.map(drawNode);                    
                    
                    _gl.flush();                    
                    
                    Shaders.unset_heightMap_shaders();                    
                    if (debug.heightMap) return false;

                    //COMPUTE EROSION
                    if (spec.erodeTexturesSet && !SETTINGS.debug.noErosionLsystems) {
                        heightMapTexture=spec.erodeTexturesSet.erode(heightMapTexture, spec.size, false);
                        if (!heightMapTexture){ //debug mode or error happens
                            return false;
                        }
                    }

                    //COMPUTE NORMAL MAP
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, (debug.normalMap)?null:_normalMapFBO);
                    if (debug.normalMap) {
                        SCENE.stop();
                    }

                    Shaders.set_normals_shaders();
                    Shaders.set_whHSize(spec.size, spec.size, spec.hMax, heightMapWidth, heightMapHeight);
                    _gl.clearColor(0.,0.,0.,0.);
                    _gl.clear(_gl.COLOR_BUFFER_BIT);

                    _gl.bindTexture(_gl.TEXTURE_2D, heightMapTexture);
                    _gaussianPatchVBO.draw_normalMap();
                    _gaussianPatchVBOIndices.draw();
                    Shaders.unset_normals_shaders();

                    _gl.enable(_gl.DEPTH_TEST);
                    _gl.depthMask(true);
                    _gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA);
                    
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);

                    //generate mipmaps
                    _gl.bindTexture(_gl.TEXTURE_2D, normalMapTexture);
                    _gl.generateMipmap(_gl.TEXTURE_2D);
                    _gl.bindTexture(_gl.TEXTURE_2D, null);
                },
                
                draw: function(){
                    Shaders.set_scaleUV_heightMapSurface(scaleU, scaleV);
                    _gl.bindTexture(_gl.TEXTURE_2D, normalMapTexture);
                    Shaders.set_dim_heightMapSurface(scaleSurface, centerSurface);
                },
                
                moveNodesAbove: function() { //used after heightmap computation to move nodes above the heightmap
                    if (debug.heightMap || debug.normalMap || !heightMapTexture) return;
                    //draw heightmap to get it with readpixel
                    var _pixelsBuffer=new Uint8Array(spec.size*spec.size*4);

                    
                     _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);

                     Shaders.set_textureRead_shaders();
                      _gl.viewport(0.0, 0.0, spec.size, spec.size);
                     _gl.clearColor(0.,0.,0.,0.);
                     _gl.clear(_gl.COLOR_BUFFER_BIT);
                     _gl.disable(_gl.DEPTH_TEST);

                     _gl.bindTexture(_gl.TEXTURE_2D, heightMapTexture);
                     _gaussianPatchVBO.draw_textureRead();
                     _gaussianPatchVBOIndices.draw();   
                     
                     _gl.flush();                     
                     _gl.readPixels(0,0,spec.size, spec.size, _gl.RGBA, _gl.UNSIGNED_BYTE, _pixelsBuffer);

                     Shaders.unset_textureRead_shaders();
                    
                     _gl.enable(_gl.DEPTH_TEST);

                     //move nodes
                     var hMaxAABB=0, hMinAABB=0;
                     var moveNode=function(node){
                        //compute x,y on heightmap texture UV (between 0 and 1) of the node on the island heightmap 
                        var x=(spec.margin+node.position[0]-spec.AABB.xMin)/(heightMapWidth+2*spec.margin),
                            y=(spec.margin+node.position[1]-spec.AABB.yMin)/(heightMapHeight+2*spec.margin);

                        //transform UV coordinates into pixel coordinates
                        //TODO : add linear interpolation
                        var xPx=Math.round(x*spec.size),
                            yPx=Math.round(y*spec.size);

                        //get the pixel index on the readpixel data
                        var i=xPx+spec.size*yPx;

                        var h=spec.hMax*(_pixelsBuffer[4*i]/255); //red channel -> height
                        hMaxAABB=Math.max(h, hMaxAABB),
                        hMinAABB=Math.min(h, hMinAABB);
                        //move the node
                        node.position[2]+=h;

                     };
                     
                     spec.nodes.map(moveNode);
                     spec.AABB.zMax+=hMaxAABB,
                     spec.AABB.zMin+=hMinAABB;
                     _gl.clearColor(1.,1.,1.,1.);
                }
                
            };
            that.compute();
            return that;
        }
    };
})();


/*
 *  Inherit from Heightmap
 *  spec.hMax : hMax
 *  spec.centre : centre
 *  
 *  spec.textureColorURL : url of the texture
 *  spec.textureNormalsURL
 *  
 *  
 *  instancied in Lsystem
 */

var HeightmapSurface=(function() {
    return {
        instance: function(spec){
            var that=Heightmap.instance(spec);
            var _gl=spec.gl; //we do not use automatically the global webgl context GL
                             //so as we can use another webgl context
            
            //material textures (color & bump)
            var _colorTexture=Texture.instance({
                url: spec.textureColorURL || SETTINGS.Lsystems.textureColorURL
            });
            var _normalsTexture=Texture.instance({
                url: spec.textureNormalsURL || SETTINGS.Lsystems.textureNormalsURL
            });
    
            //position matrix
            var _matrix=lib_matrix4.get_I4();
            lib_matrix_mv.set_position(_matrix, spec.centre);
    
    
            //river system
            
            var _rivers=RiverSystem.instance({
                heightMapTexture : that.get_normalTexture(),
                hMax : spec.hMax || SETTINGS.Lsystems.hMax,
                sizePx : SETTINGS.Lsystems.heightmapSizePx,
                width : spec.AABB.xMax-spec.AABB.xMin+2*spec.margin,
                height : spec.AABB.yMax-spec.AABB.yMin+2*spec.margin,
                rain: 0.0001,
                waterHMax: 0.7
            });
           
            
    
            that.drawSurface=function() { //draw heightmap
                //called by Lsystem draw method
                //heightMapSurface shader is already in use
                
                VUE.drawHeightMapSurface();

                Shaders.set_hMax_heightMapSurface(spec.hMax);                

                _gl.activeTexture(_gl.TEXTURE1);
                that.draw();
                _gl.activeTexture(_gl.TEXTURE2);
                _normalsTexture.draw();
                _gl.activeTexture(_gl.TEXTURE4);
                _rivers.draw();
                _gl.activeTexture(_gl.TEXTURE0);
                _colorTexture.draw();
                
                var distance=VUE.distanceToCamera(spec.centre);
                LodGrids.drawAsHeightMapSurface(_matrix, distance);
                
                Shaders.unset_heightMapSurface_shaders();
            };
            
            that.drawPhysics=function(dt){
                //apply LOD on water simulation (very expensive)
                if (VUE.distanceToCamera(spec.centre)<SETTINGS.Lsystems.riversRefreshDistance){
                    _rivers.compute(dt);
                }
            };
            return that;
        }
    };
})();
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
            NNODES++;
            
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
            };
	}

     return {
         instance: function(spec){
            var nodes=[];
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

                    var n=node.generation+1,
                        sc=node.scale*ScaleAdjust;

                    //build first child
                    curs+=spec.gap;
                    if (curs>spec.list.length) return;

                    var x=node.position[0]+sc*ScaleBranch*sRotateZ,
                        y=node.position[1]+sc*ScaleBranch*cRotateZ,
                        z=node.position[2];
                    var child1	= createNode(node.generation+1, [x,y,z], sc, spec.list[curs], AABB);
                    nodes.push(child1);

                    //build second child
                    curs+=spec.gap;
                    if (curs>spec.list.length) return;
                    
                    x=node.position[0]-sc*ScaleBranch*sRotateZ,
                    y=node.position[1]-sc*ScaleBranch*cRotateZ,
                    z=node.position[2];

                    var child2	= createNode(node.generation+1, [x,y,z], sc, spec.list[curs], AABB);
                    
                    node.children=[nodes.length, nodes.length+1];
                    nodes.push(child2);
                });
            } //end computeNextGeneration

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
                centre: spec.centre,
                erodeTexturesSet: ERODETEXTURESSET
            });

            //move spheres above heightmap
            heightmapSurface.moveNodesAbove();

            //compute octree
            var octree=false;
            
            var defaultTextureBinded=false;
            var alpha=-1;
            
            var drawNode=function(node){
                //if (node.weight<WEIGHTNODEMIN) return;
                NNODESDISPLAYED++;
                if (NIMAGEREQS<MAXIMAGEREQS && !node.imageBusy && node.imageAvailable && !node.textureLoaded && node.weight>WEIGHTNODETEXTUREDMIN){
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
                } //end sphere texture request
                if (node.textureLoaded) {
                     NNODESTEXTUREDDISPLAYED++;
                     GL.bindTexture(GL.TEXTURE_2D, node.texture);
                     defaultTextureBinded=false;
                } else if (!defaultTextureBinded){
                     GL.bindTexture(GL.TEXTURE_2D, Texture.get_default());
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
                    return nodes;
                },
                get_AABB: function(){
                    return AABB;
                },
                
                //COMPUTERS
                computeOctree: function(){
                    octree=Octree.instance({
                        AABB: AABB,
                        nodes: nodes
                    });
                },
                
                //DYNAMIC METHODS
                draw: function() {
                    //heightMapSurface shader is already in use
                    //draw heightMap
                    heightmapSurface.drawSurface();
                    
                    //draw Spheres
                    if (SETTINGS.debug.hideSpheres) return;
                    Shaders.set_defaultShader();
                    LodSpheres.reset();
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
                    } //end for nodes
                    Shaders.unset_defaultShader();
                    
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
                    nodes.map(function(node){
                        node.weight=-(1/(0+node.scale))*lib_vector.distanceMinus(node.position, camera);
                        //if (node.weight<WEIGHTNODEMIN) node.alpha=0;
                        if (node.weight<WEIGHTNODETEXTUREDMIN-WEIGHTGCTOL){
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
})();/*
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
                        rain: 0.00001,
                        gravity: 4,
                        waterHMax: 3
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

/*
 * used for the sea
 * use standard shaders (in Shaders.js)
 * 
 * spec.centre : centre de la surface liquide
 * spec.URLciel : URL de la texture de la projection equirectangulaire du ciel
 * spec.URLfond : URL de la texture du fond. morceau de 1m * 1m du fond
 * spec.i : indice de réfraction
 * spec.d : dimension de la surface (elle est carrée)
 * spec.N : nombre de sous divisions de la surface sur un coté (nombre total : spec.N²)
 * spec.profondeur : profondeur
 * spec.lambda : longueur d'onde maximale
 * spec.couleur : couleur sous forme d'un vecteur3
 * spec.visibilite : distance de visibilité sous l'eau
 * spec.lumiere : position de la lumiere dans le référentiel objet
 */
var SurfaceLiquide=(function() {
    return {
        instance: function(spec) {
            spec.centre=spec.centre || SETTINGS.water.center;
            spec.i=spec.i || SETTINGS.water.refractionIndice; //1.33;
            spec.N=spec.N || SETTINGS.water.gridSize;
            spec.profondeur=spec.profondeur || SETTINGS.water.depth;
            spec.d=spec.d || SETTINGS.water.dimension;
            spec.lambda=spec.lambda || 8;
            spec.couleur=spec.couleur || SETTINGS.water.color;
            spec.visibilite=spec.visibilite || SETTINGS.water.visibility;
            spec.lumiere=spec.lumiere ||SETTINGS.light.direction; //[0,10,0];

            var matrix=lib_matrix4.get_I4();

            lib_matrix_rot4.rotateX(matrix, -Math.PI/2);
            lib_matrix_mv.set_position(matrix, spec.centre);
           

            //création des indices
            var vertices=[], indices=[], x,z;
            var nx,nz,signx,signz; //normalized x and y (between -1 and 1) - used for adaptative grid

            for (z=0; z<spec.N; z++) {
                nz=2*(z/spec.N-0.5);
                signz=(nz>=0)?1:-1;
                
                nz=Math.pow(Math.abs(nz), 3)*signz;
                
                for (x=0; x<spec.N; x++) {
                    nx=2*(x/spec.N-0.5);
                    signx=(nx>=0)?1:-1;
                
                    nx=Math.pow(Math.abs(nx), 3)*signx;
                
                    vertices.push(
                        spec.d*0.5*nx, //x
                        //0,                     //y
                        spec.d*0.5*nz          //z
                    );
                    if (x && z) {
                        indices.push(spec.N*z+x, spec.N*z+x-1,     spec.N*(z-1)+x-1,
                                     spec.N*z+x, spec.N*(z-1)+x-1, spec.N*(z-1)+x);
                    }
                }
            }

            var maillage=Maillage.instance({
                vertices: vertices,
                indices: indices,
                int32Indices: true
            });

            //paramètrage des vagues de la forme amplitude*cos(k.X + wt)
            var ks=[],          //vecteurs d'onde
                ws=[],          //celerités
                amplitudes=[];  //amplitudes

            var i,L,k, theta, kvec,c,w, A;
            var dispersion=Math.PI/2;                        //angle de dispersion en radians
            var theta0=Math.random()*2*Math.PI;              //direction des vagues
            for (i=0; i<6; i++) {                            //on utilise 8 vagues
                L=spec.lambda/Math.pow(1.5,i);               //longueur d'onde de la houle
                k=2*Math.PI/L;                               //norme du vecteur d'onde
                theta=Math.random()*Math.PI*2; //
               // theta=theta0+(Math.random()-0.5)*dispersion; //orientation de la vague
                kvec=[Math.cos(theta)*k, Math.sin(theta)*k]; //vecteur d'onde
                ks.push(kvec[0], kvec[1]);

                c=1.65*Math.sqrt(L);                         //célérité de la vague - relation empirique
                w=c*k;                                       //frequence angulaire
                ws.push(w);

                A=0.005*L;                                   //amplitude - relation empirique
                amplitudes.push(A);                
            }

            var textureCiel=Texture.instance({url: spec.URLciel}),
                textureFond=Texture.instance({url: spec.URLfond});


            var that=Objet.instance({maillage: maillage, matrix: matrix});

            var time=0;
            that.draw=function() {
                Shaders.set_water_shader();
                GL.clearColor(SETTINGS.light.skyColor[0],
                              SETTINGS.light.skyColor[1],
                              SETTINGS.light.skyColor[2],
                              SETTINGS.light.skyColor[3]);
                //GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
                //GL.enable(GL.BLEND);
                VUE.draw_water();
                Shaders.set_fog_water(SETTINGS.fog.dMin, SETTINGS.fog.dMax, SETTINGS.fog.color);

                Shaders.set_time_water(time);
                VUE.copy_cameraXY(matrix);
                Shaders.set_matriceObjet_water(matrix);
                Shaders.set_vagues_water(amplitudes, ks, ws);
                Shaders.set_liquid_water(1/spec.i, spec.profondeur, spec.couleur, spec.visibilite, spec.lumiere);

                GL.activeTexture(GL.TEXTURE1);
                textureFond.draw();
                GL.activeTexture(GL.TEXTURE0);
                textureCiel.draw();
                
                maillage.draw_water();

                Shaders.unset_water_shader();
                
               // GL.disable(GL.BLEND);
            };
            
            that.drawPhysics=function() {
                time+=SETTINGS.water.speed;
            };
                
            
            return that;
        }
    };
})();
/*
 * Set of random erosion textures which can be applied to an heightmap
 * spec.texturesURL: array of erosion textures URL
 * spec.onload : function to launch when texture set is ready
 * 
 * It uses erode shaders
 * 
 * instancied in Contexte.js
 * Used in Heightmap.js
 * 
 * 
 */

var ErodeTexturesSet=(function() {
    var _quadMesh, _initialized=false;
    var _fbo;
    var _debug=SETTINGS.debug.ErodeTexture;
    
    return {
        init: function() {
            _initialized=true;
            _quadMesh=Maillage.instance({
                vertices: [
                    -0.5,-0.5,
                    -0.5,0.5,
                    0.5,0.5,
                    0.5,-0.5
                ],
                indices: [
                    0,1,2, 0,2,3
                ]
            });
            _fbo=GL.createFramebuffer();
        },
        
        instance: function(spec){
            if (!_initialized) {
                console.log('Error : ErodeTexturesSet must be initialized before. Abort');
                return;
            }
            
            var _nTextures=spec.texturesURL.length,
                _textures=[],
                _nLoaded=0;
        
            spec.texturesURL.map(function(textureURL){
               _textures.push(Texture.instance({
                   url: textureURL,
                   onload: function() {
                       _nLoaded++;
                       if (_nLoaded===_nTextures && spec.onload) spec.onload();
                   }
                }));
            });
            
            return {
                //apply erosion texture to heightMap
                erode: function(heightmap, sizeOutputPx, emboss) {
                    
                    //create output texture and link it to the rendering fbo
                    var outputTexture=GL.createTexture();
                    GL.bindTexture(GL.TEXTURE_2D, outputTexture);
                    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
                    GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
                    GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA,sizeOutputPx,sizeOutputPx, 0, GL.RGBA, GL.FLOAT, null);
                    GL.bindTexture(GL.TEXTURE_2D, null);

                    GL.bindFramebuffer(GL.FRAMEBUFFER, _fbo);
                    GL.framebufferTexture2D(GL.FRAMEBUFFER, GL.COLOR_ATTACHMENT0, GL.TEXTURE_2D, outputTexture, 0);

                    if (_debug)  {
                        GL.bindFramebuffer(GL.FRAMEBUFFER, null);
                        SCENE.stop();
                    }
                    
                    //choose a random texture index :
                    var i=Math.floor(Math.random()*_nTextures);
                  
                    //draw output texture
                    Shaders.set_erode_shaders((emboss)?1:0);
                    GL.clearColor(0,0,0,0);
                    GL.clear(GL.COLOR_BUFFER_BIT);
                    
                    GL.activeTexture(GL.TEXTURE1);
                    _textures[i].draw(); //zou
                    GL.activeTexture(GL.TEXTURE0);
                    GL.bindTexture(GL.TEXTURE_2D, heightmap);
                    _quadMesh.drawErode();
                    
                    
                    Shaders.unset_erode_shaders();
                    return (_debug)?false:outputTexture;
                }
            };
        }
    };
})();/*
 * GPGPU River system 
 * works like an autonomous part
 * 
 * must be initialized with the GL context
 * 
 * spec.heightMapTexture : texture of the heightmap
 * spec.hMax             : height of the texture
 * spec.sizePx           : size of the heightmap in pixels
 * spec.width            : size along x axis
 * spec.height           : size along y axis
 * spec.simuSizePx       : size of the simulation texture in pixels
 * spec.rain             : rain coefficient
 * spec.gravity          : gravity
 * spec.waterHMax        : max height of the water
 * 
 * spec.heightMapTexture is a floating point texture
 * height is stored in red channel, and normal in gba channels
 * 
 * All computation are done in fragment shader
 * 
 * instanciated into :
 * HeightmapSurface.js
 */
var RiverSystem=(function() {
    var _gl=false,
        _debug=true,
        _initialized=false,
        _waterMaterialImageSrc="classes/water/images/blue.jpg",
        
        _shader_program_copy, _shader_program_gpgpu, _shader_program_rendering,
 
        _position_copy, _position_gpgpu, _position_rendering,
        
        _sampler_copy,
        
        _dx_gpgpu, _dy_gpgpu,  _scaleXY_gpgpu, _dt_gpgpu, _rain_gpgpu, _gravity_gpgpu,
        _terrainHMax_gpgpu, _waterHMax_gpgpu,
        _samplerWater_gpgpu, _samplerTerrain_gpgpu,
        
        _samplerWater_rendering, _samplerMaterial_rendering, _samplerWaterPrevious_rendering,
         _dx_rendering, _dy_rendering,
        
        _quadVerticesVBO, _quadIndicesVBO,
        
        _waterMaterialTexture;
    
    return  {
        init: function(gl) {
            _gl=gl;
            _initialized=true;
            
             //COMPILE SHADERS FUNCTIONS
             var get_shader=function(source, type, strtype) {
                    var shader = _gl.createShader(type);
                    _gl.shaderSource(shader, source);
                    _gl.compileShader(shader);
                    if (!_gl.getShaderParameter(shader, _gl.COMPILE_STATUS)) {
                        alert(strtype+" : "+_gl.getShaderInfoLog(shader));
                        return false;
                    }
                    return shader;
            };

            var get_shaderProgram=function(vertex_source, fragment_source, strtype){
                    var shader_vertex=get_shader(vertex_source, _gl.VERTEX_SHADER, strtype+" VERTEX_SHADER");
                    var shader_fragment=get_shader(fragment_source, _gl.FRAGMENT_SHADER, strtype+" FRAGMENT_SHADER");
                    shader_program=_gl.createProgram();

                    _gl.attachShader(shader_program, shader_vertex);
                    _gl.attachShader(shader_program, shader_fragment);

                    _gl.linkProgram(shader_program);

                    return shader_program;
            };
            
            
            //COPY SHADER PROGRAM
             var shader_fragment_source_copy="precision highp float;\n\
\n\
uniform sampler2D sampler;\n\
varying vec2 vUV; \n\
\n\
void main(void) {\n\
    gl_FragColor=texture2D(sampler, vUV);\n\
} ",
                shader_vertex_source_copy="attribute vec2 position;\n\
\n\
varying vec2 vUV;\n\
\n\
void main(void) {\n\
    vUV=0.5*position+vec2(0.5,0.5);\n\
    gl_Position=vec4(position,0.,1.);\n\
} \n\
 \n\
";
            
            _shader_program_copy=get_shaderProgram(shader_vertex_source_copy, shader_fragment_source_copy, "RIVERSYSTEM COPY");
            
            _sampler_copy = _gl.getUniformLocation(_shader_program_copy, "sampler"),
            
            _position_copy = _gl.getAttribLocation(_shader_program_copy, "position");
       
            //GPGPU SHADER PROGRAM
            var shader_fragment_source_gpgpu="/*\n\
* This shader implement shallow water equations\n\
* see http://en.wikipedia.org/wiki/Shallow_water_equations\n\
*\n\
* as a result it gives a floating point RGBA texture\n\
* R channel is used for water height\n\
* G,B,A channels are used for water speed\n\
*/\n\
\n\
\n\
precision highp float;\n\
\n\
uniform sampler2D samplerWater, samplerTerrain;\n\
uniform float dx, dy, dt, rain, gravity, terrainHMax, waterHMax;\n\
uniform vec2 scaleXY;\n\
\n\
varying vec2 vUV; \n\
\n\
void main(void) {\n\
    //get data at t from texture\n\
    vec4 waterData=texture2D(samplerWater, vUV);\n\
    float waterHeight=waterHMax*waterData.r;\n\
    vec3 waterSpeed=waterData.gba;\n\
\n\
    vec4 terrainData=texture2D(samplerTerrain, vUV);\n\
    float terrainHeight=terrainHMax*terrainData.r;\n\
    vec2 terrainNormal=0.5*(terrainData.gb-vec2(0.5,0.5))*scaleXY/terrainHMax;\n\
    \n\
    //compute wikipedia vars\n\
    float H=terrainHeight; //waterHeight; //total height\n\
    vec2 v=waterSpeed.xy;\n\
\n\
    //compute derivatives\n\
    vec2 dx2=vec2(dx,0.);\n\
    vec2 dy2=vec2(0.,dy);\n\
\n\
    vec4 DwDx=(-texture2D(samplerWater, vUV+dx2*2.)+8.*texture2D(samplerWater, vUV+dx2)-8.*texture2D(samplerWater, vUV-dx2)+texture2D(samplerWater, vUV-2.*dx2))/(12.*dx*scaleXY.x);\n\
\n\
    vec4 DwDy=(-texture2D(samplerWater, vUV+dy2*2.)+8.*texture2D(samplerWater, vUV+dy2)-8.*texture2D(samplerWater, vUV-dy2)+texture2D(samplerWater, vUV-2.*dy2))/(12.*dy*scaleXY.y);\n\
\n\
    //vec4 DwDy=(texture2D(samplerWater, vUV+dy2)-texture2D(samplerWater, vUV-dy2))/(12.*dy*scaleXY.y);\n\
\n\
\n\
\n\
    vec2 DhDxy=vec2(DwDx.r, DwDy.r)*waterHMax;\n\
    vec2 DvDx=DwDx.gb;\n\
    vec2 DvDy=DwDy.gb;\n\
    float DvDxy=DvDx.x+DvDy.y;\n\
\n\
    //apply shallow water equation\n\
    vec2 dv=-dt*((gravity*(DhDxy-terrainNormal.xy))+0.09*v);\n\
    float dh=-waterHeight*dt*DvDxy;\n\
    \n\
    //raining\n\
    dh+=(1.-smoothstep(0., 0.5, distance(vUV,vec2(0.5,0.5))))* rain;\n\
\n\
    //refresh vars\n\
    waterHeight+=dh;\n\
    waterSpeed.xy+=dv;\n\
\n\
    //absorption\n\
    waterHeight*=0.9+0.1*smoothstep(0.,0.001,terrainHeight);\n\
\n\
    //prevent explosion\n\
    waterHeight=clamp(waterHeight, -waterHMax, waterHMax);\n\
    //waterSpeed.xy=clamp(waterSpeed.xy, -vec2(1.,1.), vec2(1.,1.));\n\
\n\
    gl_FragColor=vec4(waterHeight/waterHMax,waterSpeed.xy, 1.);\n\
//    gl_FragColor=terrainData;\n\
\n\
}",
                shader_vertex_source_gpgpu="/*\n\
* All computations are done into fragment shader\n\
*/\n\
attribute vec2 position;\n\
\n\
varying vec2 vUV;\n\
\n\
void main(void) {\n\
    vUV=0.5*position+vec2(0.5,0.5);\n\
    gl_Position=vec4(position,0.,1.);\n\
} \n\
";
            
            _shader_program_gpgpu=get_shaderProgram(shader_vertex_source_gpgpu, shader_fragment_source_gpgpu, "RIVERSYSTEM GPGPU");
            
            _dx_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "dx"),
            _dy_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "dy"),
            _scaleXY_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "scaleXY"),
            _dt_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "dt"),
            _rain_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "rain"),
            _gravity_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "gravity"),
            _terrainHMax_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "terrainHMax"),
            _waterHMax_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "waterHMax"),
            _samplerWater_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "samplerWater"),
            _samplerTerrain_gpgpu = _gl.getUniformLocation(_shader_program_gpgpu, "samplerTerrain");
            
            _position_gpgpu = _gl.getAttribLocation(_shader_program_gpgpu, "position");
            
            //init some uniforms
            _gl.useProgram(_shader_program_gpgpu);
            _gl.uniform1i(_samplerWater_gpgpu, 0);
            _gl.uniform1i(_samplerTerrain_gpgpu, 1);
            
            
            //RENDERING SHADER PROGRAM
            var shader_fragment_source_rendering="precision highp float;\n\
\n\
uniform sampler2D samplerWater, samplerMaterial, samplerWaterPrevious;\n\
uniform float dx,dy;\n\
\n\
varying vec2 vUV; \n\
const float EDGE=0.1;\n\
\n\
void main(void) {\n\
    vec4 waterData=texture2D(samplerWater, vUV)\n\
                  +texture2D(samplerWater, vUV+vec2(dx,0.))\n\
                  +.5*texture2D(samplerWater, vUV+vec2(dx,dy))\n\
                  +texture2D(samplerWater, vUV+vec2(0.,dy))\n\
                  +.5*texture2D(samplerWater, vUV+vec2(-dx,dy))\n\
                  +texture2D(samplerWater, vUV+vec2(-dx,0.))\n\
                  +.5*texture2D(samplerWater, vUV+vec2(-dx,-dy))\n\
                  +texture2D(samplerWater, vUV+vec2(0.,-dy))\n\
                  +.5*texture2D(samplerWater, vUV+vec2(dx,-dy));\n\
\n\
\n\
    float waterHeight=waterData.r/7.;\n\
\n\
   // vec3 waterSpeed=waterData.gba;\n\
\n\
    vec4 waterColor=texture2D(samplerMaterial, vUV);\n\
    \n\
    //waterColor=vec4(1.,0.,0.,1.); //for debug only\n\
    \n\
    //vec4 color=vec4(waterHeight, 0., 0.,1.);\n\
    //vec4 color=vec4(waterSpeed.xy,0.,1.);\n\
\n\
    //vec4 color=vec4(waterData.gba, 1.);\n\
    //vec4 color=vec4(waterColor.rgb,min(smoothstep(0.15, 0.20, waterHeight)*(waterHeight*0.8+0.08), 0.5));\n\
    vec4 color=vec4(waterColor.rgb,step(EDGE, waterHeight)*(waterHeight));\n\
\n\
    //vec4 color=vec4(waterColor.rgb,0.5*smoothstep(0.05, 0.2, waterHeight));\n\
    //vec4 color=vec4(waterHeight, texture2D(samplerWater, vUV).r,0.,1.);\n\
\n\
    vec4 previousColor=texture2D(samplerWaterPrevious, vUV);\n\
    gl_FragColor=previousColor*0.95+0.05*color;\n\
} \n\
",
                shader_vertex_source_rendering="attribute vec2 position;\n\
\n\
varying vec2 vUV;\n\
\n\
void main(void) {\n\
    vUV=0.5*position+vec2(0.5,0.5);\n\
    gl_Position=vec4(position,0.,1.);\n\
} \n\
 \n\
";
            
            _shader_program_rendering=get_shaderProgram(shader_vertex_source_rendering, shader_fragment_source_rendering, "RIVERSYSTEM RENDERING");
            
            _dx_rendering = _gl.getUniformLocation(_shader_program_rendering, "dx"),
            _dy_rendering = _gl.getUniformLocation(_shader_program_rendering, "dy"),
            _samplerWater_rendering = _gl.getUniformLocation(_shader_program_rendering, "samplerWater"),
            _samplerWaterPrevious_rendering = _gl.getUniformLocation(_shader_program_rendering, "samplerWaterPrevious"),
            _samplerMaterial_rendering = _gl.getUniformLocation(_shader_program_rendering, "samplerMaterial");
            
            _position_rendering = _gl.getAttribLocation(_shader_program_rendering, "position");
            
            //init some uniforms
            _gl.useProgram(_shader_program_rendering);
            _gl.uniform1i(_samplerWater_rendering, 0);
            _gl.uniform1i(_samplerMaterial_rendering, 1);
            _gl.uniform1i(_samplerWaterPrevious_rendering, 2);
            
            
            //QUAD VBOs
            _quadVerticesVBO = _gl.createBuffer ();
            _gl.bindBuffer(_gl.ARRAY_BUFFER, _quadVerticesVBO);
            _gl.bufferData(_gl.ARRAY_BUFFER, new Float32Array([
                -1,-1,
                -1,1,
                1,1,
                1,-1
            ]),_gl.STATIC_DRAW);
            
            _quadIndicesVBO = _gl.createBuffer ();
            _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, _quadIndicesVBO);
            _gl.bufferData(_gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2, 0,2,3]),_gl.STATIC_DRAW);
            
            
            //WATER MATERIAL TEXTURE
            _waterMaterialTexture=_gl.createTexture();
            var waterMaterialImage=new Image();
            waterMaterialImage.onload=function() {
                _gl.bindTexture(_gl.TEXTURE_2D, _waterMaterialTexture);
                _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.LINEAR);
                _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
                _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA, _gl.RGBA, _gl.UNSIGNED_BYTE, waterMaterialImage);
                _gl.bindTexture(_gl.TEXTURE_2D, null);
            };
            waterMaterialImage.src=_waterMaterialImageSrc;
            
        },
        
        instance: function(spec){
            if (!_initialized) {
                console.log("Error : RiverSystem must be initialized first with RiverSystem.init(gl context)");
                return false;
            }
            
            //set default parameters
            spec.simuSizePx = spec.simuSizePx || spec.sizePx,
            spec.rain = spec.rain || 0.0000001,
            spec.nPass = spec.nPass || 2,
            spec.gravity = spec.gravity ||0.9,
            spec.waterHMax = spec.waterHMax || 5;
            
            //INIT WATER HEIGHTAND SPEED TEXTURE
            //WATER HEIGHT is stored into red channel
            //SPEED is stored into green, blue, alpha channels
            //it is a floating point texture
            var heightSpeed_texture=_gl.createTexture();
            _gl.bindTexture(_gl.TEXTURE_2D, heightSpeed_texture);            
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
            _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,spec.simuSizePx,spec.simuSizePx, 0, _gl.RGBA, _gl.FLOAT, null);
            _gl.bindTexture(_gl.TEXTURE_2D, null);
            
            //create a framebuffer linked to heightSpeed texture
             var heightSpeed_FBO=_gl.createFramebuffer();
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, heightSpeed_FBO);
            _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, heightSpeed_texture, 0);
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
            
            //INIT WATER HEIGHTAND SPEED TEXTURE COPY
            //WATER HEIGHT is stored into red channel
            //SPEED is stored into green, blue, alpha channels
            //it is a floating point texture
            var heightSpeed_texture_copy=_gl.createTexture();
            _gl.bindTexture(_gl.TEXTURE_2D, heightSpeed_texture_copy);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
            _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,spec.simuSizePx,spec.simuSizePx, 0, _gl.RGBA, _gl.FLOAT, null);
            _gl.bindTexture(_gl.TEXTURE_2D, null);
            
            //create a framebuffer linked to heightSpeed texture copy
             var heightSpeed_FBO_copy=_gl.createFramebuffer();
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, heightSpeed_FBO_copy);
            _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, heightSpeed_texture_copy, 0);
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
            
            //INIT WATER RENDERING TEXTURE
            var rendering_texture=_gl.createTexture();
            _gl.bindTexture(_gl.TEXTURE_2D, rendering_texture);            
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
            _gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
            _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA,spec.simuSizePx,spec.simuSizePx, 0, _gl.RGBA, _gl.FLOAT, null);
            _gl.bindTexture(_gl.TEXTURE_2D, null);
            
            //create a framebuffer linked to water rendering texture
             var rendering_FBO=_gl.createFramebuffer();
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, rendering_FBO);
            _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, rendering_texture, 0);
            _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
            
            var dx=0.5/spec.simuSizePx;
            var dy=dx*spec.height/spec.width;
            
            var scaleXY=[spec.width, spec.height];
            var rainTimer=0;
            
            var that={
                //draw the rivers on a colormap
                draw: function(){
                    _gl.bindTexture(_gl.TEXTURE_2D, rendering_texture);
                },
                
                //compute a pass with delta time dt in seconds
                compute: function(dt){
                    rainTimer+=dt;
                    var rain=0;
                    if (rainTimer>1){ //apply rain every second
                        rainTimer=0;
                        rain=spec.rain;
                    }
                    _gl.disable(_gl.BLEND); //to use alpha channel like a normal channel
                    
                    _gl.clearColor(0,0,0,0);
                    _gl.depthMask(false);
                    _gl.viewport(0,0,spec.simuSizePx,spec.simuSizePx);
                  
                  //bind quad buffers
                    _gl.bindBuffer(_gl.ARRAY_BUFFER, _quadVerticesVBO) ;
                    _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);
                    _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, _quadIndicesVBO);
                    
                 var i;  
                 for (i=0; i<spec.nPass; i++){ 
                  //FIRST PASS : COPY PHYSICS TEXTURE
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, heightSpeed_FBO_copy); 
                    _gl.useProgram(_shader_program_copy);
                    _gl.enableVertexAttribArray(_position_copy);
                    
                    //bind texture
                    _gl.bindTexture(_gl.TEXTURE_2D, heightSpeed_texture);
                    
                    //draw quad
                    _gl.vertexAttribPointer(_position_copy, 2, _gl.FLOAT, false,8,0);
                    _gl.drawElements(_gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0);
                                        
                    _gl.disableVertexAttribArray(_position_copy);
                    
                    
                  //SECOND PASS : UPDATE PHYSICS
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, heightSpeed_FBO);
                    _gl.useProgram(_shader_program_gpgpu);
                    _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);
                    _gl.enableVertexAttribArray(_position_gpgpu);
                    
                    //set uniforms
                    if (!i) {
                    _gl.uniform1f(_dx_gpgpu, dx);
                    _gl.uniform1f(_dy_gpgpu, dy);
                    _gl.uniform2fv(_scaleXY_gpgpu, scaleXY);
                    _gl.uniform1f(_dt_gpgpu, dt/spec.nPass);
                    _gl.uniform1f(_rain_gpgpu, rain);
                    _gl.uniform1f(_gravity_gpgpu, spec.gravity);
                    _gl.uniform1f(_waterHMax_gpgpu, spec.waterHMax);
                    _gl.uniform1f(_terrainHMax_gpgpu, spec.hMax);
                    } else if (i===1) {
                        _gl.uniform1f(_rain_gpgpu, 0);
                    }
                    
                    
                    //bind textures
                    _gl.activeTexture(_gl.TEXTURE1);
                    _gl.bindTexture(_gl.TEXTURE_2D, spec.heightMapTexture);
                    
                    _gl.activeTexture(_gl.TEXTURE0);
                    _gl.bindTexture(_gl.TEXTURE_2D, heightSpeed_texture_copy);
                    
                    //draw quad
                    //_gl.bindBuffer(_gl.ARRAY_BUFFER, _quadVerticesVBO) ;
                    _gl.vertexAttribPointer(_position_gpgpu, 2, _gl.FLOAT, false,8,0);
                    //_gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, _quadIndicesVBO);
                    _gl.drawElements(_gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0);
                    
                    _gl.disableVertexAttribArray(_position_gpgpu);
                    
                    }//end for i
                    
                  //THIRD PASS : COMPUTE WATER RENDERING
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER,rendering_FBO);
                    _gl.useProgram(_shader_program_rendering);
                    _gl.enableVertexAttribArray(_position_rendering);
                    
                    _gl.uniform1f(_dx_rendering, dx*2.1);
                    _gl.uniform1f(_dy_rendering, dy*2.1);
                    
                    //bind textures
                    _gl.activeTexture(_gl.TEXTURE2);
                    _gl.bindTexture(_gl.TEXTURE_2D, rendering_texture);
                    
                    _gl.activeTexture(_gl.TEXTURE1);
                    _gl.bindTexture(_gl.TEXTURE_2D, _waterMaterialTexture);
                    
                    _gl.activeTexture(_gl.TEXTURE0);
                    _gl.bindTexture(_gl.TEXTURE_2D, heightSpeed_texture);
                    
                    //draw quad
                    //_gl.bindBuffer(_gl.ARRAY_BUFFER, _quadVerticesVBO) ;
                    _gl.vertexAttribPointer(_position_rendering, 2, _gl.FLOAT, false,8,0);
                    //_gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, _quadIndicesVBO);
                    _gl.drawElements(_gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0);
                    
                    _gl.disableVertexAttribArray(_position_rendering);
                    
                    _gl.bindFramebuffer(_gl.FRAMEBUFFER, null);
                    _gl.enable(_gl.BLEND); 
                    _gl.flush();
                    _gl.depthMask(true);
                    _gl.clearColor(1,1,1,1);
                }
                
                
            };//end that
            return that;
        }
        
        
    };
})();
var LodGrids=(function() {
    var _initialized=false,
        _grids=[],
        _currentLod=0,
        _Nlods;
    
    return {
        init: function() {
            _initialized=true;
            
            _Nlods=SETTINGS.grids.nLods;
            var i, size;
            for (i=1; i<=_Nlods; i++){
                size=Math.round(SETTINGS.grids.LOD0Size/Math.pow(2, (i-1)));
                _grids.push(
                        Grid.instance({
                            x: size,
                            y: size
                        })
                );
            } //end for nLods
            
        }, //end init function
        
        //called for Lsystem grid in HeightMapSurface
        drawAsHeightMapSurface: function(matrix, distance) {
            //compute current LOD
            _currentLod=Math.round(distance*_Nlods/SETTINGS.Lsystems.gridDistanceLodMin);
            _currentLod=Math.min(_currentLod, _Nlods-1);
            
            //draw
            _grids[_currentLod].drawAsHeightMapSurface(matrix);
        },
        
        //called for island in SuperIsland
        drawAsIslandHeightMapSurface: function(matrix, distance){
             //compute current LOD
            _currentLod=Math.round(distance*_Nlods/SETTINGS.islands.gridDistanceLodMin);
            _currentLod=Math.min(_currentLod, _Nlods-1);
            
            //draw
            _grids[_currentLod].drawAsIslandHeightMapSurface(matrix);
        }
        
    };
})();var LodSpheres=(function() {
    var initialized=false;
    var spheres=[];
    var weights=[];
    
    var currentLod=0,
        scale=-1,
        Nlods;
    
    return {
        init: function() {
            initialized=true;
            
            Nlods=SETTINGS.sphere.nLods;
            var i, nBands, nCrowns;
            for (i=1; i<=Nlods; i++){
                nBands=SETTINGS.sphere.nBands/i,
                nCrowns=SETTINGS.sphere.nCrowns/i;
                spheres.push(
                        Sphere.instance({
                            centre: [0,0,0],
                            rayon: 1,
                            bandes: nBands,
                            couronnes: nCrowns
                        })
                );
                weights.push(
                    SETTINGS.sphere.lodMinWeight
                    +(SETTINGS.sphere.lodMaxWeight-SETTINGS.sphere.lodMinWeight)/SETTINGS.sphere.nLods
                    *(SETTINGS.sphere.nLods-i+1)
                );
            } //end for nLods
            
        }, //end init function
        
        reset: function() { //called before drawing a Lsystem
            currentLod=-1,
            scale=-1;
        },
        
        draw: function(node) {
            if ((currentLod===-1 || node.weight<weights[currentLod])
                 && currentLod<Nlods-1   ){
                
                currentLod++;
              
                spheres[currentLod].drawResources();
            }
            
            if (node.scale!==scale){
                scale=node.scale;
                Shaders.set_scale(scale);
            }
            spheres[currentLod].drawInstance(node.position);
        }
        
    };
})();

"use strict"
var LABEL;
var main=function() {
    LABEL=document.getElementById("label");
    Contexte.instance({canvas_id: "mon_canvas"});
};