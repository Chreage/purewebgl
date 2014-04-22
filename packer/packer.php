 
<?php
$baseURL=dirname("http://$_SERVER[SERVER_NAME]$_SERVER[SCRIPT_NAME]/");
echo"<!DOCTYPE html><html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'><title>Compression...</title></head><body>";
echo "Code packing...<br/>
     You should have the <b>system()</b> command enabled in your PHP server.<br/>
     The path <b>$baseURL</b> must be open for writting to the PHP user ( <i>www-data</i> )<br/>";

echo "Application path : <b>$baseURL</b><br/>";

$tmpFile='tmp/tmp.js';
$outputFile='packed/script.js';

copy("$baseURL/../script.php", $tmpFile); //création d'un fichier temporaire
system("java -jar jar/yuicompressor-2.4.7.jar -v -o $outputFile $tmpFile");

@chmod($outputFile, 0777);
@chmod($tmpFile, 0777);

echo '</body></html>';
