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
    var cG = {/*comic-ng pre everything here will be overwritten*/
        agent: function(t,e){return e=new XMLHttpRequest,e.open("GET",t),t=[],e.onreadystatechange=e.then=function(n,o,i){if(n&&n.call&&(t=[,n,o]),4==e.readyState&&(i=t[0|e.status/200]))try{i(JSON.parse(e.responseText),e)}catch(r){i(e.responseText,e)}},e.send(),e},
        REPO: {},
    };
    var getScript = cG.agent(dir+'script.json');
    var getStage = cG.agent(tir+'stage.html');
    var getDecor = cG.agent(tir+'costumes.html');
    var getActor = cG.agent(tir+'actor.html');
    getScript.then(
    function(data, xhr) {
        if(void 0===cG.REPO.script) cG.REPO.script = {default:data};
        else cG.REPO.script.default = data;
        cG.script = cG.REPO.script.default;
    },
    function(data, xhr) {
        console.error(data, xhr.status);
        if(void 0===cG.REPO.script) cG.REPO.script = {default:0};
        else cG.REPO.script.default = data;
        cG.script = cG.REPO.script.default;
    });
    getStage.then(
    function(data, xhr) {
        if(void 0===cG.REPO.stage) cG.REPO.stage = {default:{body:data}};
        else cG.REPO.stage.default.body = data;
        cG.stage = cG.REPO.stage.default;
    },
    function(data, xhr) {
        console.error(data, xhr.status);
        if(void 0===cG.REPO.stage) cG.REPO.stage = {default:{body:0}};
        else cG.REPO.stage.default.body = 0;
        cG.stage = cG.REPO.stage.default;
    });
    getDecor.then(
    function(data, xhr) {
        if(void 0===cG.REPO.decor) cG.REPO.decor = {default:data};
        else cG.REPO.decor.default = data;
        cG.decor = cG.REPO.decor.default;
    },
    function(data, xhr) {
        console.error(data, xhr.status);
        if(void 0===cG.REPO.decor) cG.REPO.decor = {default:0};
        else cG.REPO.decor.default = 0;
        cG.decor = cG.REPO.decor.default;
    });
    getActor.then(
    function(data, xhr) {
        if(void 0===cG.REPO.actor) cG.REPO.actor = {default:data};
        else cG.REPO.actor.default = data;
        cG.actor = cG.REPO.actor.default;
    },
    function(data, xhr) {
        console.error(data, xhr.status);
        if(void 0===cG.REPO.actor) cG.REPO.actor = {default:0};
        else cG.REPO.actor.default = 0;
        cG.actor = cG.REPO.actor.default;
    });
}
else window.console.debug("CNG Plug-in: Bellerophon must be loaded before comixngn.js");