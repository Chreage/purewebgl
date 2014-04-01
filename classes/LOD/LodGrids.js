var LodGrids=(function() {
    var _initialized=false,
        _grids=[],
        _currentLod=0,
        _Nlods;
    
    return {
        init: function() {
            _initialized=true;
            
            _Nlods=SETTINGS.grids.nLods;
            var i, size;
            for (i=1; i<=_Nlods; i++){
                size=Math.round(SETTINGS.grids.LOD0Size/Math.pow(2, (i-1)));
                _grids.push(
                        Grid.instance({
                            x: size,
                            y: size
                        })
                );
            } //end for nLods
            
        }, //end init function
        
        //called for Lsystem grid in HeightMapSurface
        drawAsHeightMapSurface: function(matrix, distance) {
            //compute current LOD
            _currentLod=Math.round(distance*_Nlods/SETTINGS.Lsystems.gridDistanceLodMin);
            _currentLod=Math.min(_currentLod, _Nlods-1);
            
            //draw
            _grids[_currentLod].drawAsHeightMapSurface(matrix);
        },
        
        //called for island in SuperIsland
        drawAsIslandHeightMapSurface: function(matrix, distance){
             //compute current LOD
            _currentLod=Math.round(distance*_Nlods/SETTINGS.islands.gridDistanceLodMin);
            _currentLod=Math.min(_currentLod, _Nlods-1);
            
            //draw
            _grids[_currentLod].drawAsIslandHeightMapSurface(matrix);
        }
        
    };
})();