var SETTINGS={
    //debug settings : all must be set to false for release version
    debug: {
        LsystemHeightMap: false, //if true, display Lsystem heighmap and exit
        LsystemNormalMap: false, //if true, display Lsystem normalmap and exit
        islandHeightMap: false,  //if true, display island heighmap and exit
        islandNormalMap: false   //if true, display island normalmap and exit
    },
    
    //mouse and keyboard
    navigation: {
        mouse_sensibility_x: 0.0007, //mouse sensibility for horizontal rotation
        mouse_sensibility_y: 0.0005, //mouse sensibility for vertical rotation
        keyboard_sensibility: 0.19,  //keyboard move speed
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
        NSpheres : 700,    //number of sphere to display on a simple rendering
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
        
        heightmapSizePx: 512,                 //heightmap size in pixels. must be POT
        heightmapMargin: 2,                   //heightmap margin in world units
        hMax: 5,                              //max height of the Lsystem, excluding island height
        heightMapGaussPatchSizePx: 16,        //size of a gauss patch in pixels. Must be POT
        heightMapPatchSizePx: 40,             //max size of the gauss patch in pixels on the heightmap. Will be multiplied by the node radius
        heightMapPatchAlphaMin: 0.05,         //min alpha of a gauss patch. Must be between 0 (fully transparent) and 1 (opaque)
        heightMapPatchAlphaRandom: 0.05,      //random part of the gauss patch transparency.
        
        defaultTextureImageURL: "images/tux.jpg",  //when there is no favicon, use this. must be POT
        textureColorURL:"images/textures/white.jpg", //for heightmap surface - must be POT
        textureNormalsURL :"images/textures/white_normal.jpg" //normal texture for previous texture. must match previous texture
    },
    
    //super island settings
    islands : {
        sizePx: 1024,                               //size in pixels of the heightmap of the island. must be POT
        hMax: 20,                                   //max height of the island
        nPatch: 80,                                 //number of gaussian patch applied to build the heightmap
        patchSizeAvgPx: 500,                        //average size of a patch in pixels
        patchSizeRandomPx: 300,
        patchGaussSizePx: 512,                      //size of a gaussian patch texture in pixel. must be POT
        textureColorURL:"images/textures/red.jpg", //for heightmap surface - must be POT
        textureNormalsURL :"images/textures/white_normal.jpg" //normal texture for previous texture. must match previous texture
    },
    
    sphere: {
        zOffset: 0.1,     //vertical offset of a sphere, to avoid collision with the ground
        nBands: 24,       //number of bands in a sphere mesh
        nCrowns: 24       //number of crowns in a sphere mesh
    },
    
    //water surface settings
    water: {
        enable : false,                             //if false, water won't be displayed on the final scene
        sky : "images/textures/water/ciel_white.jpg",   //texture used for sky reflection - must be POT
        ground : "images/textures/water/sand2.jpg", //texture used for ground refraction - must be POT
        refractionIndice: 1.33,
        depth : 20,
        gridSize : 700,                            //water surface is a square with gridSize*gridSize points
        dimension : 200,                          //size of the water surface
        color: [1., 1., 1., 1.0], //[0.1, 0.2, 0.2, 1.0],               //water color
        visibility: 1.5,                           //visibility under water
        center: [0,0,0.1],                          //water surface center
        speed: 0.01
    },
    
    light: {
        direction: [0,0,1]  // [0,0,1] -> vertical light
    }
    
};

