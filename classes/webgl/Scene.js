/*
 * spec: empty
 */
var SCENE;
var Scene=(function () {
    return {
        instance: function(spec) {
            var lsystems=[], islands=[],
                navigation=false, stop=false, running=false, cursor="auto", water=false;
            var currentLsystemIndex=0;
            var timer_physics;

            var drawObjet=function(objet) {
                objet.draw();
            },
            drawObjetPhysics=function(objet){
                objet.drawPhysics();
            };

            //set initial WebGL states
            GL.enable(GL.DEPTH_TEST);
            GL.depthFunc(GL.LEQUAL);
            GL.clearDepth(1.0);
            
            GL.enable(GL.BLEND);
            GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);

            var highlightedNode=false;
            
            var that={
                
                   start: function(){
                       running=true;
                       that.draw();
                       timer_physics=setInterval(that.drawPhysics, SETTINGS.physics.dt);
                   },
                   
                   pause: function() {
                       running=false;
                   },
                   
                   stop: function(){
                       //for debug only
                       STOP=true;
                       stop=true;
                       running=false;
                       if (timer_physics) clearInterval(timer_physics);
                   },
                   
                   draw: function(timestamp) {
                       if (!running || stop) return;
                       NNODESDISPLAYED=0,
                       NNODESTEXTUREDDISPLAYED=0;
                       
                       Shaders.set_defaultShader();
                       GL.viewport(0.0, 0.0, CV.width, CV.height);
                       GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
                       VUE.draw();

                       
                       Shaders.unset_defaultShader();
                       
                       lsystems.map(drawObjet);
                       islands.map(drawObjet);                       
                       if (water) water.draw();

                       GL.flush();
                       
                       var dNodesDisplayed=Math.min(NNODESDISPLAYED-NNODESDISPLAYEDMAX, NNODESDISPLAYEDMAX);
                        WEIGHTNODEMIN+=((dNodesDisplayed>0)?1:-1)
                                     * WEIGHTNODEINCREASE
                                    * Math.abs(dNodesDisplayed/NNODESDISPLAYEDMAX);
                     
                        var dNodesTexturedDisplayed=Math.min(NNODESTEXTUREDDISPLAYED-NNODESTEXTUREDDISPLAYEDMAX, NNODESTEXTUREDDISPLAYEDMAX);
                        WEIGHTNODETEXTUREDMIN+=((dNodesTexturedDisplayed>0)?1:-1)
                                     * WEIGHTNODEINCREASE
                                    * Math.abs(dNodesTexturedDisplayed/NNODESTEXTUREDDISPLAYEDMAX);
                            
                            
                       window.requestAnimationFrame(that.draw);
                   },

                   drawPhysics: function() {    
                       if (stop) return;
                       
                       //camera movement amortization
                       VUE.drawPhysics();
                       
                       //water movement
                       if (water) water.drawPhysics();

                       //rivers updates
                       islands.map(drawObjetPhysics);

                       //picking
                       if (navigation) navigation.drawPhysics();
                       
                       currentLsystemIndex=(currentLsystemIndex+1)%LSYSTEMS.length;
                       LSYSTEMS[currentLsystemIndex].sort(VUE.get_cameraPosition());
                   },

                   add_Lsystem: function(ls){
                       lsystems.push(ls);
                   },
                   
                   add_island: function(island){
                       islands.push(island);
                   },

                   set_navigation: function(nav){
                       navigation=nav;
                   },

                   set_water: function(eau){
                       water=eau;
                   },

                   pick: function(camera, u, Xp, Yp){
                       var lsystempicked=false, dpick=1e10;
                       LSYSTEMS.map(function(lsystem) {
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
                            LABEL.style.top=(Yp+24)+"px",
                            LABEL.style.left=(Xp+24)+"px";

                            highlightedNode=pick.node;
                            pick.node.highlight=1;
                           }
                       });

                       if (highlightedNode){
                           if (cursor!=="pointer"){
                                CV.style.cursor="pointer";
                                cursor="pointer";
                           }
                           LABEL.innerHTML=highlightedNode.label;
                       } else {
                           if (cursor!=="auto"){
                               cursor="auto";
                               CV.style.cursor="auto";
                           }
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


