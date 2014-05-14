var lib_matrix4= {
    get_I4: function() { return new Float32Array([1,0,0,0,
                                 0,1,0,0,
                                 0,0,1,0,
                                 0,0,0,1]);},
    set_I4: function(m) {
        m[0]=1; m[1]=0; m[2]=0; m[3]=0;
        m[4]=0; m[5]=1; m[6]=0; m[7]=0;
        m[8]=0; m[9]=0; m[10]=1; m[11]=0;
        m[12]=0; m[13]=0; m[14]=0; m[15]=1;
    },

    copyNew: function(m) {
        return new Float32Array([m[0], m[1], m[2], m[3],
                m[4], m[5], m[6], m[7],
                m[8], m[9], m[10], m[11],
                m[12], m[13], m[14], m[15]]);
    }
};