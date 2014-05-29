<?php
    //parse csv
    $csv=file_get_contents('islands.csv');
    $lines=explode("\n", $csv);
    //print_r($lines);
    $islands=[];
    foreach($lines as $i=>$line){
        $rows=explode(',',$line);
        if (count($rows)<3) continue;
        array_push($islands, array('i' =>$rows[0],
                                   'xy'=>array(floatval($rows[1]), floatval($rows[2]))));
    }
    
    //export to JSON
    $json=json_encode($islands);
    file_put_contents('islands.json', "{\"islands\":$json}");
    
    echo 'Exported to islands.json. Done :)';
    
            

