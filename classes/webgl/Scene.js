/*
 * spec: empty
 */
var SCENE;
var Scene=(function () {
    return {
        instance: function(spec) {
            var objets=[], lsystems=[], navigation=false;

            var drawObjet=function(objet) {
                objet.draw();
            }

            var drawObjetPhysics=function(objet) {                
                if (objet.drawPhysics) objet.drawPhysics(objet);
            }

            GL.enable(GL.DEPTH_TEST);
            GL.depthFunc(GL.LEQUAL);
            GL.clearColor(1.0, 1.0, 1.0, 1.0);
            GL.clearDepth(1.0);

            var highlightedNode=false;

            var that={
                   draw: function(timestamp) {
                       GL.viewport(0.0, 0.0, CV.width, CV.height);
                       GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
                       VUE.draw();

                       objets.map(drawObjet);
                       lsystems.map(drawObjet);
                       
                       GL.flush();
                       window.requestAnimationFrame(SCENE.draw);
                   },

                   drawPhysics: function() {                       
                       VUE.drawPhysics();
                       if (navigation) navigation.drawPhysics();
                       objets.map(drawObjetPhysics);
                   },

                   add_objet: function(objet) {
                       objets.push(objet);
                   },

                   add_Lsystem: function(ls){
                       lsystems.push(ls);
                   },

                   set_navigation: function(nav){
                       navigation=nav;
                   },

                   pick: function(camera, u, Xp, Yp){
                       var lsystempicked=false, dpick=1e10;
                       lsystems.map(function(lsystem) {
                           var pick=lsystem.pick(camera, u);
                           if (!pick) return;
                           if (pick.d<dpick){
                            lsystempicked=lsystem;
                            dpick=pick.d;
                            if (highlightedNode) {
                                highlightedNode.highlight=0;
                            } else {                                
                                LABEL.style.display="block";
                            }
                            LABEL.style.top=Yp+"px",
                            LABEL.style.left=Xp+"px";

                            highlightedNode=pick.node;
                            pick.node.highlight=1;
                           }
                       });

                       if (highlightedNode){
                           LABEL.innerHTML=highlightedNode.label;
                       }

                       if (!lsystempicked && highlightedNode){
                           highlightedNode.highlight=0;
                           highlightedNode=false;
                           LABEL.style.display="none";
                       }
                   }
            };
            SCENE=that;
            return that;
        }
    };
})();


