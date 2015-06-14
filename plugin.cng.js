/*! [[Name]]: Comix-Ngn plugin
[[description| Plug-in template]]
[[License/dependency licenses]]
Order: [[before comixngn.js, first or last after comixngn.js]]
*/
/*Delete one of the following if/else blocks*/
if(typeof cG === 'undefined'){
/*if the plug in must do an action at the beginning of runtime. This is rare and typically for modifying script loading. This plugin WILL be overwritten*/
    if(typeof $GPC === 'undefined') var $GPC = 1;
    else $GPC++;}
else console.error("CNG Plug-in: [[Name]] must be loaded before comixngn.js");

if(typeof cG !== 'undefined'){
/*if the plug in modifies comic-ngn.js once it has loaded. This is typical, and will assume that cG is already instantiated.
key_to_change will overwrite the named property.
value_to_change_to will overwrite the named property with this variable.
NOTE: It is is preferable to simply enter in "cG.property = value"
*/
    if(typeof $GPC === 'undefined') var $GPC = 1;/*Global Plug in count*/
    else $GPC++;
    /*If you need to load an external library, you can add the dependency with the following:
    document.getElementsByTagName("head")[0].appendChild(document.createElement('script').setAttribute("type","text/javascript").setAttribute("src", filename))
    */
    var key_to_change = "";
    var value_to_change_to = "";
    cG[key_to_change] = value_to_change_to;
    /*use domReady if you need anything that runs after the DOM has loaded*/
    if(0){/*if you are changing the stage, you will probably need to modify the CSS as well*/
        var mystyle = '[[Minified CSS Sheet/Rules]]';
        cG.scenography.textContent = mystyle; /*overwrites previous stylesheet with mystyle*/
        document.head.removeChild(document.getElementById("scenography"));/*remove old <style> from page*/
        document.head.appendChild(cG.scenography);/*Add new <style> to the page*/
    }
    domReady(function(){
        /*runs once the DOM is ready*/
    }
});
}
else console.error("CNG Plug-in: [[Name]] must be loaded after comixngn.js");
/*If you can, minify the plug-in. Including this in to the HTML will have no effect.*/