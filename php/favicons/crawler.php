<?php
/*
 * Needs GD and CURL PHP extensions
 * needs to remake to not call google each time
 */
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");

$csv=file_get_contents("../alexa/alexa.csv");
$rows=explode("\n", $csv);

$Nmax=100000;

$N=0;
foreach ($rows as $row){
    if ($N>$Nmax) break;
    $cols=explode(",", $row);
    if (count($cols)<2) continue;
    $url=$cols[1];
    $name="./favicons/".str_replace('.', '_', $url).".png"; //because google request
    $request="http://www.google.com/s2/favicons?domain=$url";
    copy($request, $name);
    if ($N%100==0) {
        echo "number : $N <br/>\n";
        flush();
    }
    

    $N++;
}


?>
