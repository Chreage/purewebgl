/*
 * spec.centre : centre de la surface liquide
 * spec.URLciel : URL de la texture de la projection equirectangulaire du ciel
 * spec.URLfond : URL de la texture du fond. morceau de 1m * 1m du fond
 * spec.i : indice de réfraction
 * spec.d : dimension de la surface (elle est carrée)
 * spec.N : nombre de sous divisions de la surface sur un coté (nombre total : spec.N²)
 * spec.profondeur : profondeur
 * spec.lambda : longueur d'onde maximale
 * spec.couleur : couleur sous forme d'un vecteur3
 * spec.visibilite : distance de visibilité sous l'eau
 * spec.lumiere : position de la lumiere dans le référentiel objet
 */
var SurfaceLiquide=(function() {
    return {
        instance: function(spec) {
            spec.centre=spec.centre || SETTINGS.water.center;
            spec.i=spec.i || SETTINGS.water.refractionIndice; //1.33;
            spec.N=spec.N || SETTINGS.water.gridSize;
            spec.profondeur=spec.profondeur || SETTINGS.water.depth;
            spec.d=spec.d || SETTINGS.water.dimension;
            spec.lambda=spec.lambda || 8;
            spec.couleur=spec.couleur || SETTINGS.water.color;
            spec.visibilite=spec.visibilite || SETTINGS.water.visibility;
            spec.lumiere=spec.lumiere ||SETTINGS.light.direction; //[0,10,0];

            var matrix=lib_matrix4.get_I4(),
                matrix_inv=lib_matrix4.get_I4();

            lib_matrix_rot4.rotateX(matrix, -Math.PI/2);
            lib_matrix_mv.set_position(matrix, spec.centre);
            lib_matrix_mv.inv(matrix, matrix_inv);



            //création des indices
            var vertices=[], indices=[], x,z;

            for (z=0; z<spec.N; z++) {
                for (x=0; x<spec.N; x++) {
                    vertices.push(
                        spec.d*(x/spec.N-0.5), //x
                        0,                     //y
                        spec.d*(z/spec.N-0.5)  //z
                    );
                    if (x!=0 && z!=0) {
                        indices.push(spec.N*z+x, spec.N*z+x-1,     spec.N*(z-1)+x-1,
                                     spec.N*z+x, spec.N*(z-1)+x-1, spec.N*(z-1)+x);
                    }
                }
            }

            var maillage=Maillage.instance({
                vertices: vertices,
                indices: indices,
                int32Indices: true
            });

            //paramètrage des vagues de la forme amplitude*cos(k.X + wt)
            var ks=[],          //vecteurs d'onde
                ws=[],          //celerités
                amplitudes=[];  //amplitudes

            var i,L,k, theta, kvec,c,w, A;
            var dispersion=Math.PI/2;                        //angle de dispersion en radians
            var theta0=Math.random()*2*Math.PI;              //direction des vagues
            for (i=0; i<8; i++) {                            //on utilise 8 vagues
                L=spec.lambda/Math.pow(1.4,i);               //longueur d'onde de la houle
                k=2*Math.PI/L;                               //norme du vecteur d'onde
                theta=theta0+(Math.random()-0.5)*dispersion; //orientation de la vague
                kvec=[Math.cos(theta)*k, Math.sin(theta)*k]; //vecteur d'onde
                ks.push(kvec[0], kvec[1]);

                c=1.25*Math.sqrt(L);                         //célérité de la vague - relation empirique
                w=c*k;                                       //frequence angulaire
                ws.push(w);

                A=0.01*L;                                   //amplitude - relation empirique
                amplitudes.push(A);                
            }

            var textureCiel=Texture.instance({url: spec.URLciel}),
                textureFond=Texture.instance({url: spec.URLfond});


            var that=Objet.instance({maillage: maillage, matrix: matrix});

            var time=0;
            that.draw=function() {
                Shaders.set_water_shader();
                GL.clearColor(1.,1.,1.,1.);
                GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
                GL.enable(GL.BLEND);
                VUE.draw_water();

                Shaders.set_time_water(time);
                Shaders.set_matriceObjet_water(matrix, matrix_inv);
                Shaders.set_vagues_water(amplitudes, ks, ws);
                Shaders.set_liquid_water(1/spec.i, spec.profondeur, spec.couleur, spec.visibilite, spec.lumiere);

                GL.activeTexture(GL.TEXTURE1);
                textureFond.draw();
                GL.activeTexture(GL.TEXTURE0);
                textureCiel.draw();
                
                maillage.draw_water();

                Shaders.unset_water_shader();
                
                GL.disable(GL.BLEND);
            };
            
            that.drawPhysics=function() {
                time+=SETTINGS.water.speed;
            }
                
            
            return that;
        }
    }
})();
