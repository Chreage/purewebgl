<?php
header("content-type: text/javascript");
include("libs/libs.php");

readfile("classes/webgl/Contexte.js");
readfile("classes/webgl/Maillage.js");
readfile("classes/webgl/Objet.js");
readfile("classes/webgl/Vue.js");
readfile("classes/webgl/Scene.js");
include("classes/webgl/shaders.php");
readfile("classes/webgl/VBO.js");
readfile("classes/webgl/VBO_indices.js");
readfile("classes/webgl/Cube.js");
readfile("classes/webgl/Sphere.js");
readfile("classes/webgl/Grid.js");

readfile("classes/webgl/Texture.js");
readfile("classes/webgl/Navigation.js");

readfile("classes/webgl/collisions/Boite.js");
readfile("classes/webgl/collisions/Octree.js");
readfile("classes/webgl/collisions/Rayon.js");

readfile("classes/Lsystem/Gauss.js");
readfile("classes/Lsystem/Heightmap.js");
readfile("classes/Lsystem/HeightmapSurface.js");
readfile("classes/Lsystem/Lsystem.js");

readfile("classes/water/SurfaceLiquide.js");

readfile("main.js");
?>