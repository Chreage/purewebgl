<?php
/*
 * Server side progressive Lsystem creation.
 * 
 * Used in ../buildInputDemo.php
 */

class LSystem {
    var $nodes;
    var $generation;
    var $firstNode;
    var $scaleBranch;
    var $scaleAdjust;
    var $islandId;
    var $id;
    var $counter;
    
    //constructor
    function LSystem($islandId, $id) {
        $this->nodes=array();
        array_push($this->nodes, array()); //for the first generation nodes
        $this->generation=0;
        $this->firstNode=TRUE;
        $this->scaleBranch=6;
        $this->scaleAdjust=0.8;
        $this->islandId=$islandId;
        $this->id=$id;
        $this->counter=0;
    }
    
    //add a node and returns its position
    function append($url) {
        $newNode=$newNode=array('children'=>array(),
                                'x'=>0,
                                'y'=>0,
                                'url'=>$url);
        $nodeAdded=FALSE;
        
        //foreach($this->nodes[$this->generation] as $nodeKey=>$node){
        for($nodeKey=$this->counter; $nodeKey<count($this->nodes[$this->generation]); $nodeKey++){
            $node=$this->nodes[$this->generation][$nodeKey];
            $children=$node['children'];
            $c=count($children);
            if ($c!==2){
                $this->counter+=$c;
                
                //compute x and y
                $angle=$this->generation*3.14/5;
                $cRotate=cos($angle); $sRotate=sin($angle);
                $sign=(count($children))?1:-1;
                $scale=$this->scaleBranch*pow($this->scaleAdjust, $this->generation);
                
                $newNode['x']=$node['x']+$sign*$scale*$sRotate;
                $newNode['y']=$node['y']+$sign*$scale*$cRotate;
                
                //add new node
                //array_push($children, $newNode);
                array_push($this->nodes[$this->generation][$nodeKey]['children'], $newNode);
                
                array_push($this->nodes[$this->generation+1], $newNode);
                $nodeAdded=TRUE;
                break;
            }
        } //end for each generation nodes
        
        if (!$nodeAdded) { //all nodes are full -> create new generation
            array_push($this->nodes, array());
            if (!$this->firstNode) {
                $this->generation++;
                $this->counter=0;
                echo "Island $this->islandId - Lsystem $this->id create generation $this->generation<br/>\n";
                //echo 'generation '.$this->generation.'<br>';
                return $this->append($url);
            
            } else { 
                //echo 'firstNode<br/>';
                $this->firstNode=FALSE;
                array_push($this->nodes[$this->generation], $newNode);
            }
            
            //array_push($this->nodes[$this->generation], $newNode);
        }
        
        return array('p'=>$this->generation,
                     'x'=> sprintf("%.4f", $newNode['x']),
                     'y'=> sprintf("%.4f", $newNode['y']));
    }
}
