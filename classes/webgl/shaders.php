<?php
    function stripShader($shaderURL) {
        $shader=file_get_contents($shaderURL);

        $jsShader=$shader;
	$jsShader=str_replace("\r\n", "\n", $jsShader);      //pour windows
	$jsShader=str_replace("\r", "\n", $jsShader);        //pour mac
        $jsShader=str_replace("\n", "\\n\\\n", $jsShader);   //pour linux

        return $jsShader;
    }

    $replace=array(

        stripShader("classes/webgl/shaders/water/shader_fragment_water.gl"),
        stripShader("classes/webgl/shaders/water/shader_vertex_water.gl"),

        stripShader("classes/webgl/shaders/textureRead/shader_fragment_textureRead.gl"),
        stripShader("classes/webgl/shaders/textureRead/shader_vertex_textureRead.gl"),

        stripShader("classes/webgl/shaders/normalMap/shader_fragment_normals.gl"),
        stripShader("classes/webgl/shaders/normalMap/shader_vertex_normals.gl"),

        stripShader("classes/webgl/shaders/heightMap/shader_fragment_heightMapSurface.gl"),
        stripShader("classes/webgl/shaders/heightMap/shader_vertex_heightMapSurface.gl"),
        
        stripShader("classes/webgl/shaders/island/shader_fragment_islandHeightMapSurface.gl"),
        stripShader("classes/webgl/shaders/island/shader_vertex_islandHeightMapSurface.gl"),
        
        stripShader("classes/webgl/shaders/heightMap/shader_fragment_heightMap.gl"),
        stripShader("classes/webgl/shaders/heightMap/shader_vertex_heightMap.gl"),
        
        stripShader("classes/webgl/shaders/default/shader_fragment.gl"),
        stripShader("classes/webgl/shaders/default/shader_vertex.gl")
    );

    $search=array(
        "\$SHADER_FRAGMENT_WATER\$",
        "\$SHADER_VERTEX_WATER\$",

        "\$SHADER_FRAGMENT_TEXTUREREAD\$",
        "\$SHADER_VERTEX_TEXTUREREAD\$",

        "\$SHADER_FRAGMENT_NORMALS\$",
        "\$SHADER_VERTEX_NORMALS\$",

        "\$SHADER_FRAGMENT_HEIGHTMAPSURFACE\$",
        "\$SHADER_VERTEX_HEIGHTMAPSURFACE\$",
        
        "\$SHADER_FRAGMENT_ISLANDHEIGHTMAPSURFACE\$",
        "\$SHADER_VERTEX_ISLANDHEIGHTMAPSURFACE\$",
        
        "\$SHADER_FRAGMENT_HEIGHTMAP\$",
        "\$SHADER_VERTEX_HEIGHTMAP\$",
        
        "\$SHADER_FRAGMENT\$",
        "\$SHADER_VERTEX\$"
    );

    $shaders=file_get_contents("classes/webgl/Shaders.js");
    $shaders=str_replace($search, $replace, $shaders);
    
    echo $shaders;
