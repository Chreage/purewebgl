<?php
$radiusMax=560;
$minDistance=75; //minimal distance between 2 islands

//build island array
$islands=array();
for ($i=0; $i<128; $i++) { //for the demo there are 128 islands
    
    $count=0;
   do {

        //compute random position
        $r=$radiusMax*rand() / getrandmax();
        $theta=2*pi()*rand() / getrandmax();
        $x=$r*cos($theta);
        $y=$r*sin($theta);

        //test collision
        $collide=false;
        foreach ($islands as $island){
            $dx=$island['x']-$x;
            $dy=$island['y']-$y;
            if ($dx*$dx+$dy*$dy<$minDistance*$minDistance){
                $collide=true;
                break;
            }
        }
        
        $count++;
        if ($count>20000) exit("Error when positionning island number $i : infinite loop.");
    } while($collide);
    
    array_push($islands, array('x'=>$x, 'y'=>$y));
} //end for islands
        
//export it into CSV
$csv="";
foreach($islands as $i=>$island){
    $csv.="$i,$island[x],$island[y]\n";
}
file_put_contents('islands.csv', $csv);


echo "Put random islands position to island.csv :).
    Now launch <a href='buildIslandsOutput.php'>buildIslandsOutput.php</a> to build islands.json";