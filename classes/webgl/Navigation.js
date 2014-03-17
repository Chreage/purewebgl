/*
 * spec.vue: vue associée à la navigation
 */
var RAY=false;
var Navigation=(function () {
    return {
        instance: function(spec) {
            var sensibilite_x=0.0007,
                sensibilite_y=0.0005,
                sensibilite_touche=0.09,
                sensibilite_wheel=0.5,
                amortissement_coeff=0.85,
                theta=0,
                phi=0,                
                dX=0,
                dY=0;

            RAY=Rayon.instance({});
            RAY.set(spec.vue.get_projectionMatrix(), CV.width, CV.height);
            
            var touches=[], eventHandlers=[], clic=false, mouseX0=0, mouseY0=0;
            var add_eventHandler=function(type, handler) {
                window.addEventListener(type, handler, false);
                eventHandlers.push({type: type, handler: handler});
            }



            //MOUSE EVENTS
            var mouseDown=function(e) {
                clic=true;
                mouseX0=e.pageX;
                mouseY0=e.pageY;
            }

            var mouseUp=function(e) {
                clic=false;
            }

            var mouseMove=function(e) {
                RAY.lance(e.pageX, e.pageY, spec.vue.get_vueMatrix(), spec.vue.get_cameraPosition() );
                
                if (!clic) return false;
                dX=(e.pageX-mouseX0)*sensibilite_x,
                dY=(e.pageY-mouseY0)*sensibilite_y;
                phi+=dX;
                theta+=dY;

                spec.vue.set_angles(theta, phi);

                mouseX0=e.pageX;
                mouseY0=e.pageY;
            }

            var mouseWheel=function(e){
                var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));               
                spec.vue.translateYVue(sensibilite_wheel*delta);
                return false;
            }

            //KEYBOARD EVENTS
            var keyDown=function(e) {                
                e.preventDefault();
                if (touches.indexOf(e.keyCode)!=-1) return false;
                touches.push(e.keyCode);
                return false;
            }

            var keyUp=function(e) {
                var position=touches.indexOf(e.keyCode);
                if (position!=-1) touches.splice(position, 1);
                e.preventDefault();
                return false;
            }



            var manage_touche=function(touche) {
                switch(touche) {
                    case 37: //fleche de gauche                        
                        spec.vue.translateXVue(sensibilite_touche);
                    break;
                    case 39: //fleche de droite
                        spec.vue.translateXVue(-sensibilite_touche);
                    break;
                    case 38: //fleche du haut
                        spec.vue.translateZVue(-sensibilite_touche);
                    break;
                    case 40: //fleche du bas
                        spec.vue.translateZVue(sensibilite_touche);
                    break;
                }
            }

            var that={
                   drawPhysics: function() {
                      touches.map(manage_touche);

                      if (clic) return false;
                      dX*=amortissement_coeff;
                      dY*=amortissement_coeff;                      
                      phi+=dX;
                      theta+=dY;
                      spec.vue.set_angles(theta, phi);
                      return true;
                   },
                   
                   set: function() {
                       add_eventHandler("mousedown", mouseDown);
                       add_eventHandler("mouseup", mouseUp);
                       add_eventHandler("mousemove", mouseMove);

                       add_eventHandler("keyup", keyUp);
                       add_eventHandler("keydown", keyDown);
                       
                       add_eventHandler("mousewheel", mouseWheel);
                       add_eventHandler("DOMMouseScroll", mouseWheel);
                   },

                   unset: function() {
                       eventHandlers.map(function(e) { window.removeEventListener(e.type, e.handler, false);})
                       eventHandlers=[];
                   }
                   
            };
            return that;
        }
    };
})();


