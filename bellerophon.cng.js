/*! Bellerophon: Comix-Ngn plugin
Wraps pegasus.js to load files asynchronously
pegasus: typicode.github.io/pegasus (MIT) (c) 2014 typicode
Order: before comixNgn.js
*/
if(typeof cG === 'undefined'){
    if(typeof $GPC === 'undefined') var $GPC = 1;
    else $GPC++;
    var cG = {/*comic-ng*/
        agent: function(t,e){return e=new XMLHttpRequest,e.open("GET",t),t=[],e.onreadystatechange=e.then=function(n,o,i){if(n&&n.call&&(t=[,n,o]),4==e.readyState&&(i=t[0|e.status/200]))try{i(JSON.parse(e.responseText),e)}catch(r){i(e.responseText,e)}},e.send(),e}};
    var getScript = cG.agent('script.json');
    var getStage = cG.agent('stage.html');
    var getActor = cG.agent('actor.html');
    getScript.then(
    function(data, xhr) {
        cG.script = data;
        /*console.log(cG.script);*/
    },
    function(data, xhr) {
      console.error(data, xhr.status)
    });
    getStage.then(
    function(data, xhr) {
        cG.templates.stage = data;
        /*console.log(cG.templates.stage);
        console.log(cG.templates);*/
    },
    function(data, xhr) {
      console.error(data, xhr.status)
    });
    getActor.then(
    function(data, xhr) {
        cG.templates.actor = data;
        /*console.log(cG.templates.actor);*/
    },
    function(data, xhr) {
      console.error(data, xhr.status)
    });
}
else window.console.debug("CNG Plug-in: Bellerophon must be loaded before comixngn.js");