var lib_matrix_mv={
    translateRot: function(m,v) {
       m[12]+=v[0]*m[0]+v[1]*m[4]+v[2]*m[8];
       m[13]+=v[0]*m[1]+v[1]*m[5]+v[2]*m[9];
       m[14]+=v[0]*m[2]+v[1]*m[6]+v[2]*m[10];
    },


    /*
     * effectue la rotation inverse Ã  celle de m pour le vecteur v
     */
    do_inv_rot: function(m,v) {
        var v0=v[0], v1=v[1];
        v[0]=v0*m[0]+v1*m[1]+v[2]*m[2];
        v[1]=v0*m[4]+v1*m[5]+v[2]*m[6];
        v[2]=v0*m[8]+v1*m[9]+v[2]*m[10];
    },

    do_inv_rotNew: function(m,v) {
        return [v[0]*m[0]+v[1]*m[1]+v[2]*m[2],
                v[0]*m[4]+v[1]*m[5]+v[2]*m[6],
                v[0]*m[8]+v[1]*m[9]+v[2]*m[10]];
    },

    /*
     * effectue le mouvement inverse Ã  m :
     */
    do_inv_mvNew: function(m, v) {
        return [m[0]*v[0]+m[1]*v[1]+m[2]*v[2]-m[12]*m[0]-m[13]*m[1]-m[14]*m[2],
                m[4]*v[0]+m[5]*v[1]+m[6]*v[2]-m[12]*m[4]-m[13]*m[5]-m[14]*m[6],
                m[8]*v[0]+m[9]*v[1]+m[10]*v[2]-m[12]*m[8]-m[13]*m[9]-m[14]*m[10]];

    },

    set_position: function(m,v) {
        m[12]=v[0];
        m[13]=v[1];
        m[14]=v[2];
    }
};