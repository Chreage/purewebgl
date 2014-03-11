<?php
$csv=file_get_contents("alexa.csv");
$rows=explode("\n", $csv);
$r="{\"alexa\":[";
foreach ($rows as $row){
    $cols=explode(",", $row);
    if (count($cols)<2) continue;
    $r.="\"$cols[1]\",\n";
}
$r.="]}";
file_put_contents("alexa.json", $r);
chmod("alexa.json", 0777);
?>
