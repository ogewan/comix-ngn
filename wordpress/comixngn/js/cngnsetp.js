/** @preserve Comix-ngn Patroler: Comix-Ngn plugin(wordpress)
Provides Wordpress functionality
(c) 2015 ogewan.github.io/comix-ngn/ Oluwaseun Ogedengbe
Order: after comixngn.js
*/
!function(){
    console.log(PJSON);
    if(typeof cG !== 'undefined'){
        if(typeof $GPC === 'undefined') var $GPC = 1;/*Global Plug in count*/
        else $GPC++;
        domReady(function(){
            /*runs once the DOM is ready*/
        });
    }
    else console.error("CNG Plug-in: Comix-ngn Patroller must be loaded after comixngn.js");
}();