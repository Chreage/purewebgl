var LodSpheres=(function() {
    var initialized=false;
    var spheres=[];
    var weights=[];
    
    var currentLod=0,
        scale=-1,
        Nlods;
    
    return {
        init: function() {
            initialized=true;
            
            Nlods=SETTINGS.sphere.nLods;
            var i, nBands, nCrowns;
            for (i=1; i<=Nlods; i++){
                nBands=SETTINGS.sphere.nBands/i,
                nCrowns=SETTINGS.sphere.nCrowns/i;
                spheres.push(
                        Sphere.instance({
                            centre: [0,0,0],
                            rayon: 1,
                            bandes: nBands,
                            couronnes: nCrowns
                        })
                );
                weights.push(
                    SETTINGS.sphere.lodMinWeight
                    +(SETTINGS.sphere.lodMaxWeight-SETTINGS.sphere.lodMinWeight)/SETTINGS.sphere.nLods
                    *(SETTINGS.sphere.nLods-i+1)
                );
            } //end for nLods
            
        }, //end init function
        
        reset: function() { //called before drawing a Lsystem
            currentLod=-1,
            scale=-1;
        },
        
        draw: function(node) {
            if ((currentLod===-1 || node.weight<weights[currentLod])
                 && currentLod<Nlods-1   ){
                
                currentLod++;
              
                spheres[currentLod].drawResources();
            }
            
            if (node.scale!==scale){
                scale=node.scale;
                Shaders.set_scale(scale);
            }
            spheres[currentLod].drawInstance(node.position);
        }
        
    };
})();

