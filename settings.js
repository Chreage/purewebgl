var SETTINGS={
    navigation: {
        mouse_sensibility_x: 0.0007,
        mouse_sensibility_y: 0.0005,
        keyboard_sensibility: 0.19,
        wheel_sensibility: -0.5,
        mouse_amortization: 0.85 //0->no armotization 1->full amortization
    },
    
    camera: {
        
    },
    
    physics: {
        dt: 16   //DT in ms
    },
    
    culling: {
        NSpheres : 1000,    //number of sphere to display on a simple rendering
        weightAlphaTol: 30, //spheres between weightmin and this weight are semi-transp
        weightGCTol: 200,   //sphere with weight < weightmin-this value are unloaded
        weightNodeIncrease: 1.1, //used in Scene class in render loop to adjust weightmin. higher value -> reactivity but may be unstable
        maxImageReqs: 40       //max number of simultaneous image requests
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
        hMax: 4,                //max height
        
        defaultTextureImageURL: "images/tux.jpg",  //when there is no favicon, use this. must be POT
        textureColorURL:"images/textures/stones.jpg", //for heightmap surface - must be POT
        textureNormalsURL :"images/textures/stones_normal.jpg" //normal texture for previous texture. must match previous texture
    },
    
    sphere: {
        nBands: 24,       //number of bands in a sphere mesh
        nCrowns: 24       //number of crowns in a sphere mesh
    },
    
    water: {
        sky : "images/textures/water/ciel.jpg",   //texture used for sky reflection - must be POT
        ground : "images/textures/water/fond.jpg", //texture used for ground refraction - must be POT
        refractionIndice: 1.33,
        depth : 20,
        gridSize : 700,                            //water surface is a square with gridSize*gridSize points
        dimentsion : 200,                          //size of the water surface
        color: [0.1, 0.2, 0.2, 1.0],               //water color
        visibility: 1.5,                           //visibility under water
        center: [0,0,0.1]                          //water surface center
    },
    
    light: {
        direction: [0,1,0]  // [0,1,0] -> vertical light
    }
    
}

