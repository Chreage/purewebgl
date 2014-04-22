<?php
/*
 * Read readme.txt for more information about the use of this code
 * 
 */

//parameters
$inputFile='input/world.csv';
$outputFile='output/json/world.json';
$maxURL=0;
$atlasURL='../php/favicons/favicons.png';
$alexaCSVURL='../php/alexa/alexa.csv';
$iconSize=16; //favicon size in pixels

//get input file
$csv=file_get_contents($inputFile);

//parse csv into PHP array
$csvArray=array();
$rows=explode("\n", $csv);
foreach ($rows as $nRow=>$row){
    if ($maxURL && $nRow>$maxURL) break;
    $cols=explode(',', $row);
    if (count($cols)<6) continue; //not a valid CSV line
    array_push($csvArray,$cols);
}

//build world object
$world=array('islands'=>array());
$islandNumAlias=array();
$lsystemsNumAlias=array();

foreach($csvArray as $node){
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
    $nodeObj=array('x'=>$x,
                   'y'=>$y,
                   'p'=>$p);
    
    //push node
    array_push($world['islands'][$islandNum]['lsystems'][$lsystemNum],$nodeObj);
} //end for each node

//open the big texture atlas
$atlas=imagecreatefrompng($atlasURL);
$atlasWidth=imagesx($atlas)/$iconSize;
$atlasHeight=imagesy($atlas)/$iconSize;

//parse alexa raw csv to php array
$alexaArray=array();
$alexaRows=explode("\n", file_get_contents($alexaCSVURL));
foreach ($rows as $nRow=>$row){
    $alexaCols=explode(',', $alexaRows);
    if (count($alexaCols)<2) continue; //not a valid CSV line
    $alexaArray[$alexaCols[1]]=$nRow; //very associative array :)
}

//create 1 texture atlas per lsystem
foreach ($world['islands'] as $islandNum=>$island){
    foreach ($island['lsystems'] as $lsystemNum=>$lsystem){
        //path of the texture atlas
        $texture_url='output/textures/atlas_'.$islandNum.'_'.$lsystemNum.'.jpg';
        
        //compute width and height of the lsystem texture atlas
        $Nnodes=count($lsystem);
        $width=2048;
        $heightPower2=ceil(log($Nnodes/$width)/log(2));
        $height=pow(2,$heightPower2);
        
        
        //create lsystem texture atlas
        $im=imagecreatetruecolor($width, $height);
        
        //add nodes to texture atlas
        $x=0;
        $y=0;
        foreach($lsystem as $node){
            //compute x and y of the node on the lsystem texture atlas
            $x+=$iconSize;
            if ($x+$iconSize>$width){
                $x=0;
                $y+=$iconSize;
            }
            
            //get x and y of the node on the texture atlas
            $alexaRank=$alexaArray[$node['url']];
            $atlas_y=floor($alexaRank/$alexaWidth);
            $atlas_x=$alexaRank-$alexaWidth*atlas_y;
                    
            $atlas_x*=$iconSize;
            $atlas_y*=$iconSize;
            
            imagecopy($im, $atlas, $x, $y,$atlas_x,$atlas_y,$iconSize,$iconSize);
        }
        
        //save the lsystem texture atlas
        imagejpeg($im);
        imagedestroy($im);
        
    } //end for each lsystem
} //end for each island

imagedestroy($atlas);


//export output object as JSON
$jsonWorld=json_encode($world);
file_put_contents($outputFile, $jsonWorld);

echo "Done :)<br/>\n";