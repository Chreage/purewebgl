/*
 * spec.camera : position de la caméra. defaut : [0,0,0]
 * spec.theta : angle horizontal en radians. defaut : 0
 * spec.phi : angle vertical en radians. defaut : 0
 * spec.angle : angle de vue en degrés. Utilisé pour la matrice de projection. defaut : 45
 * spec.zMin : zMin de la matrice de projection. defaut : 1
 * spec. zMax : zMax de la matrice de projection. defaut : 10
 * spec.a : rapport L/H du canvas. defaut : CV.width/CV.height
 */
var VUE;
var Vue=(function() {
    return {
        instance: function(spec) {
            spec.camera=spec.camera || [0,0,0];
            spec.theta=spec.theta || 0;
            spec.phi=spec.phi ||0;
            spec.angle=spec.angle || 45;
            spec.zMin=spec.zMin || 1;
            spec.zMax=spec.zMax || 10;
            spec.a=CV.width/CV.height;

            var matrice_vue=lib_matrix4.get_I4(), matrice_projection;
            
            var calcule_matrice_projection=function(a) {
                matrice_projection=(spec.ortho)?lib_matrix_projection.getOrtho(spec.largeur, spec.a, spec.zMin, spec.zMax):lib_matrix_projection.get(spec.angle, a, spec.zMin, spec.zMax);
                if (RAY) RAY.set(matrice_projection, CV.width, CV.height);
            };
            calcule_matrice_projection(spec.a);

           
            var calcule_matrice=function() {
                lib_matrix4.set_I4(matrice_vue);
                //lib_matrix_rot4.rotateZ(matrice_vue, -spec.theta*Math.sin(spec.phi));
                lib_matrix_rot4.rotateY(matrice_vue, spec.theta);
                

                lib_matrix_rot4.rotateX(matrice_vue, spec.phi);
                lib_matrix_mv.translateRot(matrice_vue, spec.camera);
            }

            var that={
                draw: function() {
                    SHADERS.set_matriceVue(matrice_vue);
                },
                drawHeightMapSurface: function() {
                    SHADERS.set_matriceVue_heightMapSurface(matrice_vue);
                    SHADERS.set_matriceProjection_heightMapSurface(matrice_projection);
                },
                drawPhysics: function() {

                },
                plein_ecran: function() {
                    var dimensionne_canvas=function(event) {
                        CV.width=window.innerWidth;
                        CV.height=window.innerHeight;
                        calcule_matrice_projection(CV.width/CV.height);
                        SHADERS.set_matriceProjection(matrice_projection);
                    }
                    window.addEventListener("resize", dimensionne_canvas, true);
                    dimensionne_canvas();
                },
                set_angles: function(phi, theta){
                    spec.theta=theta,
                    spec.phi=phi;
                    calcule_matrice();
                },

                translateXVue: function(d)  {
                    spec.camera[0]+=d;
                    calcule_matrice();
                },

                translateYVue: function(d)  {
                    spec.camera[2]+=d;
                    calcule_matrice();
                },

                translateZVue: function(d)  {
                    spec.camera[1]+=d;
                    calcule_matrice();
                },

                get_projectionMatrix: function() {
                    return matrice_projection;
                },

                get_vueMatrix: function(){
                    return matrice_vue;
                },

                get_cameraPosition: function() {
                    return spec.camera;
                }
            }
            calcule_matrice();
            SHADERS.set_matriceProjection(matrice_projection);
            VUE=that;
            return that;
        }
    };
})();

