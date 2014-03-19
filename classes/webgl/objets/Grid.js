/* Inherit from Objet class
 * 
 * grid object
 * 
 * spec.x : number of x
 * spec.y : number of y
 * 
 */
var Grid=(function() {
    return {
        instance: function(spec){
            var x,y, i=0;
            var vertices=[], indices=[];
            for (x=0; x<=spec.x; x++){
                for (y=0; y<=spec.y; y++){
                    vertices.push(x/spec.x, y/spec.y);
                    if (x!==0 && y!==0){
                        indices.push(
                        i, i-1, i-1-(spec.y+1),
                        
                        i, i-1-(spec.y+1), i-(spec.y+1));
                    }
                    i++;
                }
            }
            
            console.log(vertices.length, indices.length);
            var that=Objet.instance({
                maillage: Maillage.instance({
                    vertices: vertices,
                    indices: indices,
                    int32Indices: true
                })
            });
           
            return that;
        }
    }
    
})();