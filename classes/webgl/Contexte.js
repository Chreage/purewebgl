/*
 * spec.canvas_id : id of the canvas
 */
var GL, CV, CURRENTGEN=0, LSYSTEMS=[];
var EXT_FLOAT, EXT_FLOAT2, EXT_UINT, EXT_FLOAT_LINEAR;

var NNODESDISPLAYEDMAX=SETTINGS.culling.NSpheres,
    NNODESTEXTUREDDISPLAYEDMAX=SETTINGS.culling.NSpheresTextured;
        
var NNODES=0;
var WEIGHTNODEMIN=-165;
var WEIGHTNODETEXTUREDMIN=-150;

var WEIGHTALPHATOL=SETTINGS.culling.weightAlphaTol;
var WEIGHTGCTOL=SETTINGS.culling.weightGCTol;
var WEIGHTNODEINCREASE=SETTINGS.culling.weightNodeIncrease;

var NNODESDISPLAYED=0,
    NNODESTEXTUREDDISPLAYED=0;

var MAXIMAGEREQS=SETTINGS.culling.maxImageReqs,
    NIMAGEREQS=0;

var ERODETEXTURESSET, MOUNTAINTEXTURESSET, ALEXADATA=false, STOP=false;


var Contexte=(function() {
    var nLoaded=0;
    
    return {
        instance: function(spec) {
            var canvas=document.getElementById(spec.canvas_id);
            CV=canvas;
            
            try {
		GL = canvas.getContext("webgl",
                    {antialias: true,
                     premultipliedAlpha: true,
                     alpha: true});
                //Init WebGL native extensions : 
                 
                //allow mesh point indexing with 32 bits integers 
                EXT_UINT = GL.getExtension("OES_element_index_uint") ||
                           GL.getExtension("MOZ_OES_element_index_uint") ||
                           GL.getExtension("WEBKIT_OES_element_index_uint");
        
                //allow texture float, useful for heightmaps
                EXT_FLOAT = GL.getExtension('OES_texture_float') ||
                            GL.getExtension('MOZ_OES_texture_float') ||
                            GL.getExtension('WEBKIT_OES_texture_float');
                
                EXT_FLOAT2 = GL.getExtension('OES_texture_half_float') ||
                             GL.getExtension('MOZ_OES_texture_half_float') ||
                             GL.getExtension('WEBKIT_OES_texture_half_float');
                     
                //enable linear filtering on floating point textures     
                EXT_FLOAT_LINEAR = GL.getExtension('OES_texture_float_linear') ||
                                   GL.getExtension('MOZ_OES_texture_float_linear') ||
                                   GL.getExtension('WEBKIT_OES_texture_float_linear');     
                 
                if (!EXT_FLOAT || !EXT_FLOAT2 || !EXT_UINT || !EXT_FLOAT_LINEAR){
                    console.log("Warning : some extension are lacking :(");
                }
            } catch (e) {
		alert("Webgl not found") ;
                return false;
            } ; //end GL initialisation
            
            Texture.init();
            LodSpheres.init();
            LodGrids.init();
            RiverSystem.init(GL);
            Heightmap.init(GL);
            ErodeTexturesSet.init();
            
            var scene=Scene.instance({});
            var shaders=Shaders.instance({});
            Shaders.set_defaultShader();
            
            var vue=Vue.instance({camera: SETTINGS.camera.position0,
                                  angle: SETTINGS.camera.viewAngle,
                                  zMin: SETTINGS.camera.zNear,
                                  zMax: SETTINGS.camera.zFar});
            vue.plein_ecran();

            var nav=Navigation.instance({vue: vue});
            nav.set();
            scene.set_navigation(nav);

            var N=SETTINGS.Lsystems.number; //number of Lsystems
            var n=SETTINGS.Lsystems.rank; //rank of 1 lsystem

            var checkLoaded=function() {
                nLoaded++;
                if (nLoaded!==3) return;
                
                
                var dataObj=JSON.parse(ALEXADATA);
                var alexa=dataObj.alexa;
                /*
                var specs=[], specs2=[];
                for (var i=0; i<N; i++){
                    specs.push({nGenerations: n, list: alexa, offset: 2*i, gap: 2*N});
                    specs2.push({nGenerations: n, list: alexa, offset: 2*i+1, gap: 2*N});
                }

                var myIsland=SuperIsland.instance({
                    Lsystems: specs,
                    centre: [90,0,0],
                    LsystemRadius: 25,
                    size: 160
                });

                scene.add_island(myIsland);

                var myIsland2=SuperIsland.instance({
                    Lsystems: specs2,
                    centre: [-90,0,0],
                    LsystemRadius: 25,
                    size: 160
                });

                scene.add_island(myIsland2);

                */
                var myIsland=SuperIsland.instance({
                    Lsystems: [{nGenerations: n, list: alexa, offset: 0, gap: N},
                               {nGenerations: n, list: alexa, offset: 1, gap: N},
                               {nGenerations: n, list: alexa, offset: 2, gap: N},
                               {nGenerations: n, list: alexa, offset: 3, gap: N}],
                    centre: [0,0,0],
                    LsystemRadius: SETTINGS.islands.collisionRadius,
                    LsystemRadiusMargin: SETTINGS.islands.collisionRadiusMargin,
                    size: SETTINGS.islands.size,
                    mountainTexturesSet: MOUNTAINTEXTURESSET
                    //mountainHeightMapURL: lib_array.get_random(SETTINGS.islands.mountainTexturesURL)
                }); 
                scene.add_island(myIsland);

                scene.start();

                var showGen=function() {
                    CURRENTGEN++;
                    if (CURRENTGEN>20) clearInterval(timerGen);
                };
                var timerGen=setInterval(showGen, SETTINGS.Lsystems.showGenDt);
                //}); //end ajax get

             }; //end checkLoaded()
             
             lib_ajax.get("php/alexa/alexa.json", function(data){
                 ALEXADATA=data;
                 checkLoaded();
             });
             
             MOUNTAINTEXTURESSET=ErodeTexturesSet.instance({
                    onload: checkLoaded,
                    texturesURL: SETTINGS.islands.mountainTexturesURL
             }); //end moutaintextureset instance
             
             ERODETEXTURESSET=ErodeTexturesSet.instance({
                    onload: checkLoaded,
                   texturesURL: SETTINGS.Lsystems.erodeTexturesURL
             }); //end ERODETEXTURESSET instanciation



            if(SETTINGS.water.enable) {
                var eau=SurfaceLiquide.instance({
                   URLciel: SETTINGS.water.sky,
                   URLfond: SETTINGS.water.ground
                });

                scene.set_water(eau);
            } //end if water enable
                        
            return true;
        }
    };
})();