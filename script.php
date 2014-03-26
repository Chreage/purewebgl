<?php
header('content-type: text/javascript');
readfile('settings.js');

include('libs/libs.php');

readfile('classes/webgl/Contexte.js');
readfile('classes/webgl/Maillage.js');
readfile('classes/webgl/Scene.js');
include('classes/webgl/shaders.php');
readfile('classes/webgl/Texture.js');

readfile('classes/webgl/buffers/VBO.js');
readfile('classes/webgl/buffers/VBO_indices.js');

readfile('classes/webgl/objets/Objet.js');
readfile('classes/webgl/objets/Cube.js');
readfile('classes/webgl/objets/Sphere.js');
readfile('classes/webgl/objets/Grid.js');

readfile('classes/webgl/UI/Vue.js');
readfile('classes/webgl/UI/Navigation.js');

readfile('classes/webgl/collisions/Boite.js');
readfile('classes/webgl/collisions/Octree.js');
readfile('classes/webgl/collisions/Rayon.js');

readfile('classes/Lsystem/Gauss.js');
readfile('classes/Lsystem/Heightmap.js');
readfile('classes/Lsystem/HeightmapSurface.js');
readfile('classes/Lsystem/Lsystem.js');
readfile('classes/Lsystem/SuperIsland.js');

readfile('classes/water/SurfaceLiquide.js');

readfile('classes/LOD/LodGrids.js');
readfile('classes/LOD/LodSpheres.js');

readfile('main.js');