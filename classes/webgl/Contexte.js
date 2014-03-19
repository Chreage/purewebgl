/*
 * spec.canvas_id : id of the canvas
 */
var GL, CV, CURRENTGEN=0, LSYSTEMS=[];

var NNODESDISPLAYEDMAX=SETTINGS.culling.NSpheres;
var WEIGHTNODEMIN=-165;
var WEIGHTALPHATOL=SETTINGS.culling.weightAlphaTol;
var WEIGHTGCTOL=SETTINGS.culling.weightGCTol;
var WEIGHTNODEINCREASE=SETTINGS.culling.weightNodeIncrease;
var NNODESDISPLAYED=0;

var MAXIMAGEREQS=SETTINGS.culling.maxImageReqs,
    NIMAGEREQS=0;

var Contexte=(function() {
    return {
        instance: function(spec) {
            var canvas=document.getElementById(spec.canvas_id);
            CV=canvas;
            
            try {
		GL = canvas.getContext("experimental-webgl",
                    {antialias: true,
                     premultipliedAlpha: false });
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
            
            var vue=Vue.instance({camera: [0,0,-50], theta: 0, phi: 0, angle: 45, zMin: 2, zMax: 300});
            vue.plein_ecran();

            var nav=Navigation.instance({vue: vue});
            nav.set();
            scene.set_navigation(nav);

            var N=SETTINGS.Lsystems.number; //number of Lsystems
            var n=SETTINGS.Lsystems.rank; //rank of 1 lsystem

            var dAngle=Math.PI/N; //angle between 2 Lsystems
            var R=50; //radius
            

            lib_ajax.get("php/alexa/alexa.json", function(data){
                var dataObj=JSON.parse(data);
                var alexa=dataObj.alexa;
                for (var i=0; i<N; i++){
                    var lsystem=Lsystem.instance({nGenerations: n, centre: [R*Math.cos(dAngle*i),R*Math.sin(dAngle*i),0], list: alexa, offset: i, gap: N});
                    LSYSTEMS.push(lsystem);
                    scene.add_Lsystem(lsystem);
                }
                console.log("Done !");
                scene.start();
                var timer_physics=setInterval(SCENE.drawPhysics, SETTINGS.physics.dt);

                var showGen=function() {
                    CURRENTGEN++;
                    if (CURRENTGEN>20) clearInterval(timerGen);
                }
                var timerGen=setInterval(showGen, SETTINGS.Lsystems.showGenDt);
            }); 

            /* lib_ajax.get("php/alexa/alexa.json", function(data){
                var dataObj=JSON.parse(data);
                var alexa=dataObj.alexa;

                scene.start();
                var lsystem=Lsystem.instance({nGenerations: 12, centre: [20,20,0], list: alexa, offset: 0, gap: 1});
                scene.add_Lsystem(lsystem);

                console.log("Done !");
                //scene.start();
                
                var timer_physics=setInterval(SCENE.drawPhysics, 16);

                var showGen=function() {
                    CURRENTGEN++;
                    if (CURRENTGEN>20) clearInterval(timerGen);
                }
                var timerGen=setInterval(showGen, 1000);
            });*/

            var eau=SurfaceLiquide.instance({
               URLciel: SETTINGS.water.sky,
               URLfond: SETTINGS.water.ground
            });

            scene.set_water(eau);
                        
            return true;
        }
    }
})();