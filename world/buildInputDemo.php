<?php
require_once('demo/LSystem.php');
header('Cache-Control: no-cache, must-revalidate'); // HTTP/1.1
header('Expires: Sat, 26 Jul 1997 05:00:00 GMT');

//PARAMETERS
$NIslands=10;    //number of islands
$NLSystemsMin=3; //min number of LSystems for 1 island (included)
$NLSystemsMax=6; //max number of LSystems for 1 island (included)
$inputFile='demo/alexa.csv';   //input CSV
$outputFile='input/world.csv'; //output CSV
$maxURL=50000;       //max URL extracted from input CSV.0 -> extract all

//get the CSV file downloaded from official Alexa website
$csv=file_get_contents($inputFile);

//read it
$urlArray=array();
$rows=explode("\n", $csv);
foreach ($rows as $nRow=>$row){
    if ($maxURL && $nRow>$maxURL) break;
    $cols=explode(',', $row);
    if (count($cols)<2) continue; //not a valid CSV line
    array_push($urlArray,$cols[1]);
}

//init islands (LSystem arrays) and Lsystems
$ISLANDS=array();
for($i=0;$i<$NIslands;$i++){
    $LSystems=array();
    $NLSystems=rand($NLSystemsMin,$NLSystemsMax); //number of LSystems in this 
    for ($j=0;$j<$NLSystems;$j++){
        array_push($LSystems, new LSystem($i, $j) );
    }
    array_push($ISLANDS, array(
        'LSystems'=>$LSystems,
        'counter'=>0,
        'NLSystems'=>$NLSystems
    ));
}

//build L-Systems
$OUTPUT=array();
ob_start();
foreach($urlArray as $i=>$url){
    if (!($i%10000)){
        echo "Number of nodes processed : $i<br/>\n";
        ob_flush();
        flush();
    }
    
    $islandId=$i%$NIslands; //id of the island
    $island=$ISLANDS[$islandId];
    
    $lsystemId=$ISLANDS[$islandId]['counter'];
    $ISLANDS[$islandId]['counter']=($ISLANDS[$islandId]['counter']+1)%$ISLANDS[$islandId]['NLSystems'];
    $lsystem=$ISLANDS[$islandId]['LSystems'][$lsystemId];
    
    $xyp=$lsystem->append($url);
    
    $row=array($url, $islandId, $lsystemId, $xyp['x'], $xyp['y'], $xyp['p']);
    array_push($OUTPUT, $row);
} //end foreach url

    
//parse $OUTPUT into csv string
$outputCsv='';
foreach($OUTPUT as $row){
    $outputCsv.=implode(',', $row)."\n";
}
$outputCsv=rtrim($outputCsv);


//export OUTPUT to CSV
file_put_contents($outputFile, $outputCsv);
chmod($outputFile, 0777);