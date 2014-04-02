<?php
//replace shader sources in RiverSystem.js
//stripShader function have already been declared in Shaders.php

    $replaceWater=array(
        stripShader('classes/water/shaders/copy/copy_fragment.gl'),
        stripShader('classes/water/shaders/copy/copy_vertex.gl'),
        
        stripShader('classes/water/shaders/gpgpu/gpgpu_fragment.gl'),
        stripShader('classes/water/shaders/gpgpu/gpgpu_vertex.gl'),
        
        stripShader('classes/water/shaders/rendering/rendering_fragment.gl'),
        stripShader('classes/water/shaders/rendering/rendering_vertex.gl'),
        
    );

    $searchWater=array(
        '$SHADER_FRAGMENT_COPY$',
        '$SHADER_VERTEX_COPY$',
        
        '$SHADER_FRAGMENT_GPGPU$',
        '$SHADER_VERTEX_GPGPU$',
        
        '$SHADER_FRAGMENT_RENDERING$',
        '$SHADER_VERTEX_RENDERING$'
    );

    $shaders=file_get_contents('classes/water/RiverSystem.js');
    $shaders=str_replace($searchWater, $replaceWater, $shaders);
    
    echo $shaders;
