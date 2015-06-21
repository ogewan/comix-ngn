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
    var pluginname = "[[Name]]";
    cG.REPO[key_to_change];/*object initialization*/
    cG[key_to_change] = cG.REPO[key_to_change][pluginname] = value_to_change_to;
    
    var srcs = document.getElementsByTagName("src");
    for (i = 0; i < srcs.length; i++) { 
        cG.root=src[i].getAttribute("plugin");/*this overwrites any previous root setting*/
        if(cG.root!="") break;
    }
    if(cG.root=="") cG.root = pluginname;/*if root gets reset, then simply set the plugin as the new root*/
    /*use domReady if you need anything that runs after the DOM has loaded*/
    if(0){/*if you are changing the stage, store the old one in the repo*/
        var mystyle = '[[Minified CSS Sheet/Rules]]';/*you will probably need to modify the CSS as well*/
        var mystage = {
            id: pluginname,
            function:'',/*stage handler*/
            controls: '',/*carousel controls*/
            scenography: document.createElement("style"),/*css rules*/
            body: '',/*stage template*/
        };
        cG.stage[pluginname] = mystage;
        cG.stage.scenography.textContent = mystyle; /*overwrites previous stylesheet with mystyle*/
        document.head.removeChild(document.getElementById("scenography"));/*remove old <style> from page*/
        document.head.appendChild(cG.stage.scenography);/*Add new <style> to the page*/
    }
    domReady(function(){
        /*runs once the DOM is ready*/
    }
});
}
else console.error("CNG Plug-in: [[Name]] must be loaded after comixngn.js");
/*If you can, minify the plug-in. 
/*Including this file (plugin.cng.js) in to the HTML will have no effect.*/