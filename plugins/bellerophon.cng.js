/*! Bellerophon: Comix-Ngn plugin
Wraps pegasus.js to load files asynchronously
pegasus: typicode.github.io/pegasus (MIT) (c) 2014 typicode
Order: before comixNgn.js
*/
if(typeof cG === 'undefined'){
    var dir = "";
    var tir = "";
    var srcs = document.getElementsByTagName("src");
    for (i = 0; i < srcs.length; i++) { 
        dir=src[i].getAttribute("dir");
        if(dir!="") break;
    }
    for (i = 0; i < srcs.length; i++) { 
        tir=src[i].getAttribute("template");
        if(tir!="") break;
    }
    if(typeof $GPC === 'undefined') var $GPC = 1;
    else $GPC++;
    var cG = {/*comic-ng*/
        agent: function(t,e){return e=new XMLHttpRequest,e.open("GET",t),t=[],e.onreadystatechange=e.then=function(n,o,i){if(n&&n.call&&(t=[,n,o]),4==e.readyState&&(i=t[0|e.status/200]))try{i(JSON.parse(e.responseText),e)}catch(r){i(e.responseText,e)}},e.send(),e},
        templates: {}
    };
    var getScript = cG.agent(dir+'script.json');
    var getStage = cG.agent(tir+'stage.html');
    var getCostumes = cG.agent(tir+'costumes.html');
    var getActor = cG.agent(tir+'actor.html');
    getScript.then(
    function(data, xhr) {
        cG.script = data;
        /*console.log(cG.script);*/
    },
    function(data, xhr) {
        console.error(data, xhr.status);
        cG.script = 0;/*adds redundancy on failure; so fallback can be processed*/
    });
    getStage.then(
    function(data, xhr) {
        cG.templates.stage = data;
        /*console.log(cG.templates.stage);
        console.log(cG.templates);*/
    },
    function(data, xhr) {
        console.error(data, xhr.status);
        cG.templates.stage = 0;
    });
    getCostumes.then(
    function(data, xhr) {
        cG.costumes = data;
    },
    function(data, xhr) {
        console.error(data, xhr.status);
        cG.costumes = 0;
    });
    getActor.then(
    function(data, xhr) {
        cG.templates.actor = data;
        /*console.log(cG.templates.actor);*/
    },
    function(data, xhr) {
        console.error(data, xhr.status);
        cG.templates.actor = 0;
    });
}
else window.console.debug("CNG Plug-in: Bellerophon must be loaded before comixngn.js");