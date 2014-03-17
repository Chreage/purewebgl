var lib_vector={
    size: function(v) {
        return Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
    },

    distance: function(A,B) {
        return Math.sqrt((A[0]-B[0])*(A[0]-B[0])+(A[1]-B[1])*(A[1]-B[1])+(A[2]-B[2])*(A[2]-B[2]));
    },

    distance2: function(A,B) {
        return (A[0]-B[0])*(A[0]-B[0])+(A[1]-B[1])*(A[1]-B[1])+(A[2]-B[2])*(A[2]-B[2]);
    },

    size2: function(v) {
        return v[0]*v[0]+v[1]*v[1]+v[2]*v[2];
    },


    add: function(u,v) {
        u[0]+=v[0]; u[1]+=v[1]; u[2]+=v[2];
    },

    normalize: function(v) {
        var n=this.size(v);
        v[0]/=n; v[1]/=n; v[2]/=n;
    },

    //produit vectoriel
    prodVect: function(u,v) {
        return [u[1]*v[2]-v[1]*u[2],
                u[2]*v[0]-u[0]*v[2],
                u[0]*v[1]-u[1]*v[0]];
    },

    to_spherical: function(u) {
        var r=this.size(u);
        var phi=Math.acos(u[2]/r);
        var q=Math.acos(u[1]/Math.sqrt(u[0]*u[0]+u[1]*u[1]));
        var theta=(u[0]>=0)?q:2*Math.PI-q;
        return [r,theta, phi];
    },

    //produit scalaire
    dot: function(u, v) {
        return u[0]*v[0]+u[1]*v[1]+u[2]*v[2];
    },

    subNew: function(u,v) {
        return ([u[0]-v[0], u[1]-v[1], u[2]-v[2]]);
    },

    halfNew: function(u) {
        return [u[0]*0.5, u[1]*0.5, u[2]*0.5];
    },

    copy: function(src, dst) {
        dst[0]=src[0]; dst[1]=src[1]; dst[2]=src[2];
    },

    copyNew: function(u) {
        return [u[0], u[1], u[2]];
    },

    addHalfNew: function(u,v) {
        return [u[0]+0.5*v[0], u[1]+0.5*v[1], u[2]+0.5*v[2]];
    },

    //dÃ©terminant
    det: function(u,v,w) {
        return u[0]*(v[1]*w[2]-v[2]*w[1])-u[1]*(v[0]*w[2]-v[2]*w[0])+u[2]*(v[0]*w[1]-v[1]*w[0]);
    },

    fmaNew: function(u,v,a) {
        return [u[0]+a*v[0], u[1]+a*v[1], u[2]+a*v[2]];
    }
};

