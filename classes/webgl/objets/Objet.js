/*
 * spec.maillage : maillage de l'objet (type Maillage)
 * spec.matrix: matrice de mouvement (defaut : I4)
 * spec.texture : Texture
 */
var Objet=(function() {
    return {
        instance: function(spec) {
            spec.matrix=spec.matrix || lib_matrix4.get_I4();
            var texture=spec.texture || false;
            var matrix=lib_matrix4.copyNew(spec.matrix);
            var that={
                drawAsHeightMapSurface: function(mat) {
                    Shaders.set_matriceObjet_heightMapSurface(mat);
                    spec.maillage.drawAsHeightMapSurface();
                },
                drawAsIslandHeightMapSurface: function(mat) {
                    Shaders.set_matriceObjet_islandHeightMapSurface(mat);
                    spec.maillage.drawAsIslandHeightMapSurface();
                },
            
                draw: function() {
                    if (texture) texture.draw();
                    Shaders.set_matriceObjet(matrix);
                    spec.maillage.draw();
                },
                rotateX: function(dTheta) {
                    lib_matrix_rot4.rotateX(matrix, dTheta);
                },
                rotateY: function(dTheta) {
                    lib_matrix_rot4.rotateY(matrix, dTheta);
                },
                rotateZ: function(dTheta) {
                    lib_matrix_rot4.rotateZ(matrix, dTheta);
                },

                drawPhysics: false,

                set_physics: function(phyFunc) {
                    that.drawPhysics=phyFunc;
                },

                set_position: function(pos){
                    lib_matrix_mv.set_position(matrix, pos);
                },

                drawResources: function() {
                    if (texture) texture.draw();
                    Shaders.set_matriceObjet(matrix);
                    spec.maillage.drawVBO();
                    spec.maillage.bindVBOIndices();
                    
                },

                drawInstance: function(position) {
                    Shaders.set_position(position);
                    spec.maillage.drawVBOIndices_opt();
                }
            };
            return that;
        }
    };
})();

