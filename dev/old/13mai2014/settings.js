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
        autoGen:false,    //if true, generate L-system client side
        world: "world/output/",        //Used only for autogen=false
        
        number: 5,        //number of L-systems. Used only for autogen=true
        rank: 15,         //rank of each L-system. Used only for autogen=true
        showGenDt: 800,   //at loading, show next generation after ... ms. Used only for autogen=true
        
        scaleAdjust: 0.8, //scale factor of a sphere between 2 generations. Used only for autogen=true
        scaleBranch: 6,   //scale of a branch at gen 0. Used only for autogen=true
        angle: Math.PI/5,  //angle. Used only for autogen=true
        
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

