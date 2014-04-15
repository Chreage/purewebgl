<?php
/*
 * Needs GD and CURL PHP extensions
 * needs to remake to not call google each time
 */
header('Cache-Control: no-cache, must-revalidate'); // HTTP/1.1
header('Expires: Sat, 26 Jul 1997 05:00:00 GMT');

$csv=file_get_contents('../alexa/alexa.csv');
$rows=explode("\n", $csv);

$Nmax=2000;
$ATLASURL='favicons.png';

$N=0;

$DIM=16384;
$imAtlas=imagecreatetruecolor ( $DIM, $DIM );

$X=0;
$Y=0;

ob_start();
foreach ($rows as $row){
    if ($N>$Nmax) break;
    
    //get URL
    $cols=explode(",", $row);
    if (count($cols)<2) continue;
    $url=$cols[1];
    //$name='./favicons/'.str_replace('.', '_', $url).'.png'; //because google request
    $request="http://www.google.com/s2/favicons?domain=$url";
    
    //COMPUTE POSITION
    $X+=16;
    if ($X>=$DIM){
        $X=0;
        $Y+=16;
    }
    
    //COPY IMAGE
    $imTmp=imagecreatefrompng($request);
    imagecopy($imAtlas, $imTmp, $X, $Y,0,0,16,16);
    imagedestroy($imTmp);
    
    //copy($request, $name);
    if (!($N%100)) {
        echo "number : $N <br/>\n";
        ob_flush();
        flush();
    }
    $N++;
} //end for each domain

@unlink($ATLASURL);
imagepng($imAtlas, $ATLASURL);
imagedestroy($imAtlas);