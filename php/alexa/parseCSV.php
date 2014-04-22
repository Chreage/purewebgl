<?php
//get the CSV file downloaded from official Alexa website
$csv=file_get_contents('alexa.csv');

//parse it into JSON
$rows=explode("\n", $csv);
$r="{\"alexa\":[";
foreach ($rows as $row){
    $cols=explode(",", $row);
    if (count($cols)<2) continue; //not a valid CSV line
    $r.="\"$cols[1]\",";
}
$r=rtrim($r, ", \n");
$r.=']}';

//export it to JSON
file_put_contents('alexa.json', $r);
chmod('alexa.json', 0777);

