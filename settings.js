var SETTINGS={
    debug: {
        LsystemHeightMap: false, //if true, display Lsystem heighmap and exit
        LsystemNormalMap: false, //if true, display Lsystem normalmap and exit
        islandHeightMap: false,  //if true, display island heighmap and exit
        islandNormalMap: false    //if true, display island normalmap and exit
    },
    
    navigation: {
        mouse_sensibility_x: 0.0007,
        mouse_sensibility_y: 0.0005,
        keyboard_sensibility: 0.19,
        wheel_sensibility: -0.5,
        mouse_amortization: 0.85 //0->no armotization 1->full amortization
    },
    
    camera: {
        position0: [0,0,-50], //initial position of the camera (X,Y,Z)
        phi0: 0, //initial angle between the camera axis and the vertical axis in rad
        theta0: -Math.PI/6, //initial angle between the camera axis and the horizontal plane in rad
        zNear: 2, //elements between the camera and this distance plane are hidden
        zFar: 300, //elements after this distance plane are hidden
        viewAngle: 45 //camera view angle in degrees
    },
    
    physics: {
        dt: 16   //DT in ms
    },
    
    culling: {
        NSpheres : 700,    //number of sphere to display on a simple rendering
        weightAlphaTol: 20, //spheres between weightmin and this weight are semi-transp
        weightGCTol: 100,   //sphere with weight < weightmin-this value are unloaded
        weightNodeIncrease: 1.1, //used in Scene class in render loop to adjust weightmin. higher value -> reactivity but may be unstable
        maxImageReqs: 30       //max number of simultaneous image requests
    },
    
    Lsystems : {
        number: 5,        //number of L-systems
        rank: 15,         //rank of each L-system
        showGenDt: 800,   //at loading, show next generation after ... ms
        
        scaleAdjust: 0.8, //scale factor of a sphere between 2 generations
        scaleBranch: 6,   //scale of a branch at gen 0
        angle: Math.PI/5,  //angle
        
        heightmapSizePx: 512,  //heightmap size in pixels. must be POT
        heightmapMargin: 2,    //heightmap margin in world units
        hMax: 4,               //max height
        heightMapGaussPatchSizePx: 16, //size of a gauss patch in pixels. Must be POT
        heightMapPatchSizePx: 35, //max size of the gauss patch in pixels on the heightmap. Will be multiplied by the node radius
        heightMapPatchAlphaMin: 0.05, //min alpha of a gauss patch. Must be between 0 (fully transparent) and 1 (opaque)
        heightMapPatchAlphaRandom: 0.05, //random part of the gauss patch transparency.
        
        defaultTextureImageURL: "images/tux.jpg",  //when there is no favicon, use this. must be POT
        textureColorURL:"images/textures/white.jpg", //for heightmap surface - must be POT
        textureNormalsURL :"images/textures/white_normal.jpg" //normal texture for previous texture. must match previous texture
    },
    
    islands : {
        textureColorURL:"images/textures/red.jpg", //for heightmap surface - must be POT
        textureNormalsURL :"images/textures/white_normal.jpg" //normal texture for previous texture. must match previous texture
    },
    
    sphere: {
        nBands: 24,       //number of bands in a sphere mesh
        nCrowns: 24       //number of crowns in a sphere mesh
    },
    
    water: {
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
        direction: [0,1,0]  // [0,1,0] -> vertical light
    }
    
}

