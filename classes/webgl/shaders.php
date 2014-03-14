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
        stripShader("classes/webgl/shaders/shader_fragment_heightMapSurface.gl"),
        stripShader("classes/webgl/shaders/shader_vertex_heightMapSurface.gl"),
        
        stripShader("classes/webgl/shaders/shader_fragment_heightMap.gl"),
        stripShader("classes/webgl/shaders/shader_vertex_heightMap.gl"),
        
        stripShader("classes/webgl/shaders/shader_fragment.gl"),
        stripShader("classes/webgl/shaders/shader_vertex.gl")
    );

    $search=array(
        "\$SHADER_FRAGMENT_HEIGHTMAPSURFACE\$",
        "\$SHADER_VERTEX_HEIGHTMAPSURFACE\$",
        
        "\$SHADER_FRAGMENT_HEIGHTMAP\$",
        "\$SHADER_VERTEX_HEIGHTMAP\$",
        
        "\$SHADER_FRAGMENT\$",
        "\$SHADER_VERTEX\$"
    );

    $shaders=file_get_contents("classes/webgl/Shaders.js");

    $shaders=str_replace($search, $replace, $shaders);
    
    echo $shaders;
?>