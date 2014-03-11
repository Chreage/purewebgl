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
                draw: function() {
                    if (texture) texture.draw();
                    SHADERS.set_matriceObjet(matrix);
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

                drawResources: function() {
                    if (texture) texture.draw();
                    SHADERS.set_matriceObjet(matrix);
                    spec.maillage.drawVBO();
                },

                drawInstance: function(scale, position) {
                    SHADERS.set_scale(scale);
                    SHADERS.set_position(position);
                    spec.maillage.drawVBOIndices();
                }
            };
            return that;
        }
    }
})();

