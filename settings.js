var SETTINGS={
    //debug settings : all must be set to false for release version
    debug: {
        LsystemHeightMap: false, //if true, display Lsystem heighmap and exit
        LsystemNormalMap: false, //if true, display Lsystem normalmap and exit
        islandHeightMap: false,  //if true, display island heighmap and exit
        islandNormalMap: false,  //if true, display island normalmap and exit
        hideSpheres :     false,   //if true, hide Spheres
        ErodeTexture:     false,  //if true, display Lsystem heighmap with erosion and exit
        noErosionLsystems: false,  //if true, do not erode Lsystems
        noOctree:          false,   //if true, do not compute L-system octree
        NnodesMax:         0,    //max spheres number. 0 to disable it
        NnodesMaxPerLsystem:0,    //max nodes per lsystem. 0 to disable it
        NislandsMax:       0,       //max islands number. 0 to disable it
        NlsystemsMax:      0        //max lsystems per island. 0 to disable it
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
        NSpheres : 4000,    //total number of sphere to display on a simple rendering
        weightAlphaTol: 10, //spheres between weightmin and this weight are semi-transp
        weightNodeIncrease: 1.1, //used in Scene class in render loop to adjust weightmin. higher value -> reactivity but may be unstable
        maxTextureDistance: 180, //load texture atlas only if center of the Lsystem is closer to the camera than this distance in world units
	maxSpheresTextureAtlasReqs: 4, //max simultaneous texture atlas request for lsystems
        maxLsystemTextureAtlasLoaded: 48, //max Lsystem texture atlas loaded
        lsystemTextureAtlasUnload: 12    //when there are more than maxLsystemTextureAtlasLoaded texture atlas loaded, how texture atlas to remove
    },
    
    //lsystems settings
    Lsystems : {
        world: "world/output/",        //Used only for autogen=false
        faviconSizePx: 16,
        
        showGenDt: 800,   //at loading, show next generation after ... ms. Used only for autogen=true
        
        heightmapSizePx: 512,                 //heightmap size in pixels. must be POT
        heightmapMargin: 4,                   //heightmap margin in world units
        hMax: 3,                              //max height of the Lsystem, excluding island height
        heightMapGaussPatchSizePx: 128,        //size of a gauss patch in pixels. Must be POT
        heightMapPatchSizePx: 35,  //50            //max size of the gauss patch in pixels on the heightmap. Will be multiplied by the node radius
        heightMapPatchAlphaMin: 0.1,//0.05         //min alpha of a gauss patch. Must be between 0 (fully transparent) and 1 (opaque)
        heightMapPatchAlphaRandom: 0.1,      //random part of the gauss patch transparency.
        heightMapPatchMaxGen:6,               //draw patch for L systems generation < this level
        
        defaultTextureImageURL: "images/textures/pixelBlack.jpg",  //when there is no favicon, use this. must be POT
        textureColorURL:"images/textures/sand.png",                //for heightmap surface - must be POT
        textureNormalsURL :"images/textures/sand_normal.png",      //normal texture for previous texture. must match previous texture
        textureTileInWidth: 10,                                    //number of color texture repeatition in width
        
        gridDistanceLodMin: 200,                                     //distance from the camera to the center of the grid from which grid is display with its minimum LOD
        erodeTexturesURL: ['images/textures/erosion/grandcan2.jpg'],  //list of erosion texture which will be randomly applied to Lsystem heightmaps (1 texture per heightmap)
        
        enableRivers: false,
        riversRefreshDistance: 40                                   //refresh rivers system only if distance to camera is smaller than this distance
        
    },
    
    //super island settings
    islands : {
        sizePx: 1024,                               //size in pixels of the heightmap of the island. must be POT
        size: 180,                                  //size of an island (length of a side) in world units
        hMax: 16,                                   //max height of the island
        nPatch: 80,                                //number of gaussian patch applied to build the heightmap
        patchSizeAvgPx: 400,                        //average size of a patch in pixels
        patchSizeRandomPx: 300,                     //random delta size of a patch in pixels
        patchGaussSizePx: 256,                      //size of a gaussian patch texture in pixel. must be POT
        patchAlphaAvg: 0.005,                        //average transparency of a patch. 0->fully transparent, 1-> fully opaque
        patchAlphaRandom: 0.005,
        patchDistanceMaxRandom: 10,                  //distance max to add to the patch position
        textureColorURL:"images/textures/sand.png", //for heightmap surface - must be POT
        textureNormalsURL :"images/textures/sand_normal.png", //normal texture for previous texture. must match previous texture
        textureTileInWidth: 100,                                    //number of color texture repeatition in width
        vtOffset: 0.001,                                  //vertical positive offset of the island
        collisionRadius: 25,                              //minimum distance between 2 Lsystems, in world units
        collisionRadiusMargin: 35,                        //minimum distance between a Lsystem and the border of the island, in world units
        centerExclusionRadius: 35,                         //minimum distance between the center of a Lsystem and the center of the island
        patchExclusionRadius: 8,                            //minimum distance between the center of a Lsystem and a patch
        mountainTexturesURL: ['images/textures/erosion/mountain1024.png'],  //list of mountain heightmaps which will be randomly applied to the island heightmap
        
        
        gridDistanceLodMin: 300,                        //distance from the camera to the center of the grid from which grid is display with its minimum LOD
        hideDistance: 250,                              //do not draw the island if it is more distant than this distance
        enableRivers: true,                            //enable/disable rivers simulation
        riversRefreshDistance: 100                      //refresh rivers system only if distance to camera is smaller than this distance
    },
    
    sphere: {
        zOffset: 1,     //vertical offset of a sphere, to avoid collision with the ground
        nBands: 32,       //number of bands in a sphere mesh for LOD 0
        nCrowns: 32,      //number of crowns in a sphere mesh for LOD 0
        nLods: 4,          //number of LOD levels
        changeLodDWeight: 10,
        lodMinWeight: -200,
        lodMaxWeight: -50
    },
    
    //works for super island grid and Lsystem grid
    grids: {
       LOD0Size: 300, //size of the grid at LOD0
       nLods: 6       //number of LOD levels
    },
    
    //water surface settings
    water: {
        enable : true,                             //if false, water won't be displayed on the final scene
        sky : "images/textures/water/ciel_white.jpg",   //texture used for sky reflection - must be POT
        ground : "images/textures/water/sand2.jpg", //texture used for ground refraction - must be POT
        refractionIndice: 1.5,
        depth : 3,
        gridSize : 400,                            //water surface is a square with gridSize*gridSize points
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

