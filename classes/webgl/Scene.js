/*
 * spec: empty
 */
var SCENE;
var Scene=(function () {
    return {
        instance: function(spec) {
            var objets=[], lsystems=[], navigation=false, running=false, cursor="auto", water=false;
            var currentLsystemIndex=0;

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
                
                   start: function(){
                       running=true;
                       that.draw();
                   },
                   
                   stop: function(){
                       running=false;
                   },
                   
                   draw: function(timestamp) {
                       if (!running) return;
                       NNODESDISPLAYED=0;
                       
                       GL.viewport(0.0, 0.0, CV.width, CV.height);
                       GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
                       VUE.draw();

                       objets.map(drawObjet);
                       lsystems.map(drawObjet);
                       
                       if (water) water.draw();

                       GL.flush();
                       if (NNODESDISPLAYED>NNODESDISPLAYEDMAX){
                           WEIGHTNODEMIN/=WEIGHTNODEINCREASE;
                       } else {
                           WEIGHTNODEMIN*=WEIGHTNODEINCREASE;
                       }
                       window.requestAnimationFrame(that.draw);
                   },

                   drawPhysics: function() {                       
                       VUE.drawPhysics();
                       if (water) water.drawPhysics();

                       if (navigation) navigation.drawPhysics();
                       objets.map(drawObjetPhysics);

                       currentLsystemIndex=(currentLsystemIndex+1)%LSYSTEMS.length;
                       LSYSTEMS[currentLsystemIndex].sort(VUE.get_cameraPosition());
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

                   set_water: function(eau){
                       water=eau;
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
                           if (cursor!="pointer"){
                                CV.style.cursor="pointer";
                                cursor="pointer";
                           }
                           LABEL.innerHTML=highlightedNode.label;
                       }

                       if (!lsystempicked && highlightedNode){
                           highlightedNode.highlight=0;
                           highlightedNode=false;
                           LABEL.style.display="none";
                           if (cursor!="auto"){
                               cursor="auto";
                               CV.style.cursor="auto";
                           }
                       }
                   }
            };
            SCENE=that;
            return that;
        }
    };
})();


