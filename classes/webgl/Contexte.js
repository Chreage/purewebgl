/*
 * spec.canvas_id : id of the canvas
 */
var GL, CV, CURRENTGEN=0;
var Contexte=(function() {
    return {
        instance: function(spec) {
            var canvas=document.getElementById(spec.canvas_id);
            CV=canvas;
            
            try {
		GL = canvas.getContext("experimental-webgl", {antialias: true});
                var EXT = GL.getExtension("OES_element_index_uint") ||
                GL.getExtension("MOZ_OES_element_index_uint") ||
                GL.getExtension("WEBKIT_OES_element_index_uint");
            } catch (e) {
		alert("Webgl not found") ;
                return false;
            } ;
            
            var scene=Scene.instance({});
            var shaders=Shaders.instance({});
            Shaders.set_defaultShader();
            
            var vue=Vue.instance({camera: [0,0,-50], theta: 0, phi: 0, angle: 45, zMin: 2, zMax: 100});
            vue.plein_ecran();

            var nav=Navigation.instance({vue: vue});
            //nav.linkObjet(vue);
            nav.set();
            scene.set_navigation(nav);

            /* var N=10; //number of Lsystems
            var n=10; //rank of 1 lsystem

            var dAngle=Math.PI/N; //angle between 2 Lsystems
            var R=20; //radius

            lib_ajax.get("php/alexa/alexa.json", function(data){
                var dataObj=JSON.parse(data);
                var alexa=dataObj.alexa;
                for (var i=0; i<N; i++){
                    var lsystem=Lsystem.instance({nGenerations: n, centre: [R*Math.cos(dAngle*i),R*Math.sin(dAngle*i),0], list: alexa, offset: i, gap: N});
                    scene.add_Lsystem(lsystem);
                }
                console.log("Done !");
                scene.draw();
                var timer_physics=setInterval(SCENE.drawPhysics, 16);

            }); */

            lib_ajax.get("php/alexa/alexa.json", function(data){
                var dataObj=JSON.parse(data);
                var alexa=dataObj.alexa;

                scene.start();
                var lsystem=Lsystem.instance({nGenerations: 12, centre: [0,0,0], list: alexa, offset: 0, gap: 1});
                scene.add_Lsystem(lsystem);

                console.log("Done !");
                //scene.start();
                
                var timer_physics=setInterval(SCENE.drawPhysics, 16);

                var showGen=function() {
                    CURRENTGEN++;
                    if (CURRENTGEN>20) clearInterval(timerGen);
                }
                var timerGen=setInterval(showGen, 1000);
            });
            
                        
            return true;
        }
    }
})();



