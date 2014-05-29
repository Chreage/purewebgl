<?php
/*
 * Read readme.txt for more information about the use of this code
 * 
 */

//parameters
$inputFile='input/world.csv';
$outputFile='output/json/island';
$maxURL=0;
//$atlasURL='../php/favicons/favicons.png';
$atlasURL='../../horsGitHub/favicons.png';
$alexaCSVURL='../php/alexa/alexa.csv';
$iconSize=16; //favicon size in pixels
$LsystemTextureAtlasWidth=2048; //width in pixels of a Lsystem texture atlas. Must be POT

//no cache and HTTP 1.1 -> progressive output
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Sat, 26 Jul 1997 05:00:00 GMT'); //in the past
ob_start();

function echoFlush($s){
    echo $s."<br>\n";
    ob_flush();
    flush();
};

//get input file
echoFlush("get $inputFile ...");
$csv=file_get_contents($inputFile);

//parse csv into PHP array
echoFlush('Parse it as array ...');
$csvArray=array();
$rows=explode("\n", $csv);
foreach ($rows as $nRow=>$row){
    if ($maxURL && $nRow>$maxURL) break;
    $cols=explode(',', $row);
    if (count($cols)<6) continue; //not a valid CSV line
    array_push($csvArray,$cols);
}
$csv=null;

//build world object
echoFlush('Init world, Lsystems and Island arrays...');
$world=array('islands'=>array());
$islandNumAlias=array();
$lsystemsNumAlias=array();

echoFlush('Processing nodes ...');
$counter=0;
foreach($csvArray as $node){
    if ($counter%10000===0) echoFlush("Number of processed nodes : $counter");
    $url=$node[0];
    $islandId=$node[1];
    $lsystemId=$node[2];
    $x=$node[3];
    $y=$node[4];
    $p=$node[5];
    
    //create island if it does not exist
    if (!array_key_exists($islandId, $islandNumAlias)){
        echo "Create Island $islandId <br/>\n";
        $islandNumAlias[$islandId]=count($world['islands']);
        $lsystemsNumAlias[$islandId]=array();
        array_push($world['islands'], array('lsystems'=>array()));
    }
    
    $islandNum=$islandNumAlias[$islandId];
            
    //create Lsystem if it does not exist
    if (!array_key_exists($lsystemId,$lsystemsNumAlias[$islandId])){
        $lsystemsNumAlias[$islandId][$lsystemId]=count($world['islands'][$islandNum]['lsystems']);
        array_push($world['islands'][$islandNum]['lsystems'], array());
    }
    
    $lsystemNum=$lsystemsNumAlias[$islandId][$lsystemId];
    
    //create node 
    $nodeObj=array('x'=>floatval($x),
                   'y'=>floatval($y),
                   'p'=>intval($p),
		   'url'=>$url,
                   'u'=>0,
                   'v'=>0);
    
    //push node
    array_push($world['islands'][$islandNum]['lsystems'][$lsystemNum],$nodeObj);
    $counter++;
} //end for each node

//open the big texture atlas
echoFlush("Open favicons texture altas $atlasURL");
$atlas=imagecreatefrompng($atlasURL);
$atlasWidth=imagesx($atlas)/$iconSize;
$atlasHeight=imagesy($atlas)/$iconSize;

//parse alexa raw csv to php array
echoFlush("Parse Alexa raw CSV $alexaCSVURL");
$alexaArray=array();
$alexaRows=explode("\n", file_get_contents($alexaCSVURL));
foreach ($alexaRows as $nRow=>$row){
    $alexaCols=explode(',', $row);
    if (count($alexaCols)<2) continue; //not a valid CSV line
    $alexaArray[$alexaCols[1]]=$nRow; //very associative array :)
}

//create 1 texture atlas per lsystem
echoFlush("Create 1 texture atlas per Lsystem");
foreach ($world['islands'] as $islandNum=>$island){
    foreach ($island['lsystems'] as $lsystemNum=>$lsystem){
        //path of the texture atlas
        $texture_url='output/textures/atlas_'.$islandNum.'_'.$lsystemNum.'.jpg';
        
        //compute width and height of the lsystem texture atlas
        $Nnodes=count($lsystem);
        $width=$LsystemTextureAtlasWidth/$iconSize;
        $heightPower2=ceil(log($Nnodes/$width)/log(2));
        $height=pow(2,$heightPower2);

        $widthPx=$width*$iconSize;
        $heightPx=$height*$iconSize;
        
        if ($heightPx>2048) echoFlush("Warning : height $heightPx is larger than 2048px. It may not display on low devices.");
        
        //create lsystem texture atlas
        $im=imagecreatetruecolor($widthPx, $heightPx);
        
        //add nodes to texture atlas
        $x=0;
        $y=0;
        foreach($lsystem as $nodeIndex=>$node){
            //compute x and y of the node on the lsystem texture atlas
            $x+=$iconSize;
            if ($x+$iconSize>$widthPx){
                $x=0;
                $y+=$iconSize;
            }
            
            //get x and y of the node on the texture atlas
	    if (!array_key_exists($node['url'], $alexaArray)) {
		var_dump($node);
		exit("Node which URL $node[url] is not in the Alexa rank array. Abort");
	    }
            $alexaRank=$alexaArray[$node['url']];
            $atlas_y=floor($alexaRank/$atlasWidth);
            $atlas_x=$alexaRank-$atlasWidth*$atlas_y;
                    
            $atlas_x*=$iconSize;
            $atlas_y*=$iconSize;
            $world['islands'][$islandNum]['lsystems'][$lsystemNum][$nodeIndex]['u']=$x/$widthPx;
            $world['islands'][$islandNum]['lsystems'][$lsystemNum][$nodeIndex]['v']=$y/$heightPx;
            
            imagecopy($im,                   //destination
                      $atlas,                //source
                      $x, $y,                //destination XY
                      $atlas_x,$atlas_y,     //source XY
                      $iconSize,$iconSize);  //size dest and src
        }
        
        //save the lsystem texture atlas
        imagejpeg($im, $texture_url);
        imagedestroy($im);
	chmod($texture_url, 0777);
	echoFlush("TextureAtlas $texture_url saved :)");
        
    } //end for each lsystem
} //end for each island

echoFlush('Free big texture altas memory');
imagedestroy($atlas);


//export output object as JSON
echoFlush("Encode \$word object to JSON and export it to $outputFile");
//$jsonWorld=json_encode($world);
//file_put_contents($outputFile, $jsonWorld);
//chmod($outputFile, 0777);
//jsonWorld=null;
foreach($world['islands'] as $islandNumber=>$island) {
    $jsonIsland=json_encode($island);
    $jsonURL=$outputFile.'_'.$islandNumber.'.json';
    file_put_contents($jsonURL, $jsonIsland);
    chmod($jsonURL, 0777);
//jsonWorld=null;
}

echoFlush('Done bro :)');
ob_end_flush();