/*
 * spec : empty
 */
var Rayon=(function() {
    var A,B, Ps=[0,0,0], coeff_Xva, coeff_Xvb, coeff_Yva, coeff_Yvb, camera=[0,0,0];
    return {

        instance: function(spec) {
            return {
                set: function(Mp,w,h) {                    
                    A=Mp[0];
                    B=Mp[5];
                    coeff_Xva=(-1/A)*(2/w);
                    coeff_Xvb=1/A;
                    coeff_Yva=(1/B)*(2/h);
                    coeff_Yvb=-1/B;
                },
                 // Xp,Yp: coordonnées en pixel par rapport au coin supérieur gauche du canvas
                 // M : matrice de mouvement scene->vue
                 // cam : position de la camera
                lance: function(Xp, Yp, M, cam) {
                    //calcule dans le référentiel vue                    
                    Ps[0]=(coeff_Xva*Xp+coeff_Xvb);
                    Ps[1]=(coeff_Yva*Yp+coeff_Yvb);
                    Ps[2]=1;
                    lib_vector.normalize(Ps);

                    //passe au référentiel scène
                    lib_matrix_mv.do_inv_rot(M, Ps);

                    camera[0]=-cam[0];
                    camera[1]=-cam[1];
                    camera[2]=-cam[2];

                    SCENE.pick(camera, Ps, Xp, Yp);
                }
            }
        }
    }
})();



