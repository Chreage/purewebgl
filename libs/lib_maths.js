var lib_maths={
    degToRad: function(angle) {
        return angle*Math.PI/180;
    },
    
    /*
     * Bilinear interpolation
     * see : http://en.wikipedia.org/wiki/Bilinear_interpolation
     * 
     * F11=f(x1,y1),
     * F12=f(x1,y2),
     * F21=f(x2,y1),
     * F22=f(x2,y2)
     * 
     * return f(x,y)
     * 
     * wikipedia test - must return 146.1 :
     * lib_maths.bilinear_interpolation(14.5,20.2,
                                        14,20,15,21,
                                        91,162,210,95);
     */
    bilinear_interpolation: function(x,y,   x1,y1,x2,y2,    F11,F12,F21,F22) {
        return (1/((x2-x1)*(y2-y1)))*(
               F11 * (x2-x)*(y2-y)
               + F21 * (x-x1)*(y2-y)
               + F12 * (x2-x)*(y-y1)
               + F22 * (x-x1)*(y-y1));
    }
    
    

};