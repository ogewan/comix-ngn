/*_comixngn is a development only JavaScript file that compiles the seperate modules in factory into a single core file.
It is only for testing purposes to ensure the modules work together as intended.
Suggested order:
1. intialize - initializes the name space and commonly used objects
2. rollbar_dev - sets up the rollbar environment(Development ONLY), when building use rollbar.js
3. retrieval - retrieves external resources such as script.JSON and other templates
4. def_stage - defines the default stage creation function (using Direction.js)
5. def_stagechange - defines the experimental stage change functions
6. methods - defines commonly used cG methods
7. def_libs - defines global libraries that cannot be included in the cG namespace, Path, DomReady
8. helpers - defines special cG helper methods in the helpers repository*/
!function(){
   var sLoad = function(imp,fnt){
       var script= document.createElement('script');
       script.type= 'text/javascript';
       script.src= imp;
       if(fnt!==void 0) void(script.addEventListener ? script.addEventListener("load", fnt, !1) : script.attachEvent ? script.attachEvent("onload", fnt) : script.onload = fnt);
       document.getElementsByTagName('head')[0].appendChild(script);
   }
   sLoad('../factory/def_libs.js',function(){
       sLoad('../factory/initialize.js',function(){
           sLoad('../factory/rollbar_dev.js');
           sLoad('../factory/retrieval.js');
           sLoad('../factory/def_stage.js');
           sLoad('../factory/def_stagechange.js'); 
           sLoad('../factory/methods.js',function(){sLoad('../factory/start.js');});
           sLoad('../factory/helpers.js');
       });
   });
}()