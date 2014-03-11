/*
 * spec.centre : position du centre du cube. defaut : [0,0,0]
 * spec.rayon : rayon de la sphere. defaut : 1,
 * bandes : nombre de bandes. defaut : 16
 * couronnes : nombre de couronnes. defaut : 16
 */
var Sphere=(function() {
    return {
        instance: function(spec) {
            var centre=spec.centre || [0,0,0],
                rayon=spec.rayon || 1,
                bandes=spec.bandes ||16,
                couronnes=spec.couronnes || 16,
                vertices=[],
                indices=[];

            var c, b, theta, phi;
            for (c=0; c<=couronnes; c++) {
                phi=((c/couronnes)-0.5)*Math.PI;
                for (b=0; b<=bandes; b++) {
                    theta=(b/bandes)*2*Math.PI;
                    vertices.push(centre[0]+Math.cos(theta)*Math.cos(phi)*rayon, //X
                                  centre[1]+Math.sin(theta)*Math.cos(phi)*rayon, //Y
                                  centre[2]+Math.sin(phi)*rayon,                 //Z
                                  theta/(2*Math.PI),                             //U
                                  (phi+Math.PI/2)/Math.PI                        //V
                                  );
                    
                    if (c!=0 ) {
                        if (c!=couronnes) indices.push(c*(bandes+1)+b, c*(bandes+1)+b-1, (c-1)*(bandes+1)+b);
                        if (c!=1) indices.push(c*(bandes+1)+b-1, (c-1)*(bandes+1)+b, (c-1)*(bandes+1)+b-1);
                    }
                }
                if (c==0 || c==couronnes) continue; //premiere ou derniere couronne

            }
            return Objet.instance({
                    texture: spec.texture,
                    maillage: Maillage.instance({
                    vertices: vertices,
                    indices: indices
            })});
        }
    }
})();

