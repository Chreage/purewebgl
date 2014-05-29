/*
 * spec.canvas_id : id of the canvas
 */
var GL, CV, CURRENTGEN=0, LSYSTEMS=[];
var EXT_FLOAT, EXT_FLOAT2, EXT_UINT, EXT_FLOAT_LINEAR;

var NNODESDISPLAYEDMAX=SETTINGS.culling.NSpheres;
        
var NNODES=0;
var WEIGHTNODEMIN=-165;

var WEIGHTALPHATOL=SETTINGS.culling.weightAlphaTol;
var WEIGHTNODEINCREASE=SETTINGS.culling.weightNodeIncrease;

var NNODESDISPLAYED=0;

var ERODETEXTURESSET, MOUNTAINTEXTURESSET, ISLANDSDATA=false, STOP=false;


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
            SuperIsland.init();
            HeightmapSurface.init();
            RiverSystem.init(GL);
            Heightmap.init(GL);
            ErodeTexturesSet.init();
            Gauss.initChreageTextures(GL);
            
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

            var checkLoaded=function() {
                nLoaded++;
                if (nLoaded!==3) return;
                nLoaded=0;
                
                SuperIsland.set_islandsData(ISLANDSDATA.islands);
                
                //var dataObj=JSON.parse(ALEXADATA);
                //var alexa=dataObj.alexa;
                /*var angle=0, radius=700;
                dataObj.islands.map(function(island, index){
                    if (SETTINGS.debug.NislandsMax && index>=SETTINGS.debug.NislandsMax) return;
                    if (SETTINGS.debug.NlsystemsMax && island.lsystems.length>SETTINGS.debug.NlsystemsMax) {
                        island.lsystems=island.lsystems.slice(0,SETTINGS.debug.NlsystemsMax);
                    }
                
                    angle+=2*Math.PI/5, radius-=30;
                    var builtIsland=SuperIsland.instance({
                        number: index,
                        Lsystems: island.lsystems,
                        centre: [radius*Math.cos(angle),radius*Math.sin(angle),0],
                        LsystemRadius: SETTINGS.islands.collisionRadius,
                        LsystemRadiusMargin: SETTINGS.islands.collisionRadiusMargin,
                        size: SETTINGS.islands.size,
                        mountainTexturesSet: MOUNTAINTEXTURESSET
                    }); 
                    scene.add_island(builtIsland);
                }); //end islands map
                */
                
		//delete(dataObj);
		//delete(ALEXADATA);
                setTimeout(scene.start, 100);
		
                //show Lsystem generations progressivly
                var showGen=function() {
                    CURRENTGEN++;
                    if (CURRENTGEN>20) clearInterval(timerGen);
                };
                var timerGen=setInterval(showGen, SETTINGS.Lsystems.showGenDt);
                

             }; //end checkLoaded()
            
             /*lib_ajax.get(SETTINGS.Lsystems.world+'json/world.json', function(data){
                 ALEXADATA=data;
                 checkLoaded();
             });*/
             lib_ajax.get(SETTINGS.Lsystems.world+'../islandPos/islands.json', function(data){
                 ISLANDSDATA=JSON.parse(data);
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