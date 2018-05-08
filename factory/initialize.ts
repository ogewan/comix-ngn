//TODO: --rewrite_polyfills=false
/** @preserve comix-ngn v1.4.0 | (c) 2015 Oluwaseun Ogedengbe| ogewan.github.io/comix-ngn/ |License: MIT|
embeds domReady: github.com/ded/domready (MIT) (c) 2013 Dustin Diaz, pegasus: typicode.github.io/pegasus (MIT) (c) 2014 typicode, pathjs (MIT) (c) 2011 Mike Trpcic, direction.js*/
/*The namespace of comix-ngn
all variables should be properties of this to prevent global namespace pollution*/
var cG = cG||{};/*Instantiate cG if not*/
/*comix-ngn default properties*/
/*IMMUTABLE*/
cG.N =function(){return 0};/*null function*/
if(void 0===cG.$GPC){cG.$GPC=0;}/*Global Plugin Counter (no longer global)*/
cG.root = '';/*current default settings of cng, overwritten by plugins*/
cG.cPanel = cG.cPanel||{};/*cG control panel, all stages are stored here*/
(function(){//this function dynamically adds missing properties to fBox
    var deft = {fstrun: true, pgepsh: true, pgesve: true, rtepge: true, protect: true, noverwrite: true, arrow: true, addme: true, vscript: false, click: true};
    if(cG.fBox){
        for(var u in deft){
                if (!cG.fBox.hasOwnProperty(u)) cG.fBox[u] = deft[u];
        }
    } else {
        cG.fBox = deft;
    }
})();/*cG fuse box, toggles various options
* fstrun - toggles automatic stage injection on document ready
* pgepsh - toggles page url push to urlbar and history
* pgesve - toggles page saving in localstorage
* rtepge - toggles routing
* protect - toggles comix settings
* noverwrite - by default, stageInjection cannot overwrite already inserted comics, set to false to allow overwriting
* arrow - toggles arrow key navigation
* click - toggles click navigation
* vscript - virtual script allows, a script defined as a JS variable to overwrite the script request (Writer)
* addme = supports additive jsons*/
cG.info = {vix: "1.3.0",vwr: "2.0.0",vpr: "0.1.0", vxx: "0.0.1"};/*version settings*/
cG.dis = cG.dis||{};//disables statistic and error reporting
cG.recyclebin = cG.recyclebin||{};//variables that are used in initialization, disposed at stage injection
cG.queue = cG.queue||{};//stores functions that are called incertain events
cG.comicID = cG.comicID||window.location.host;//unique comic ID, defaults to host
cG.prePage = cG.prePage||-1;//page given to the engine before initialization finishes, navigates if 0 or higher
cG.controllers = cG.controllers||{};//stores all nav bars that control stages here
cG.avx = cG.avx||cG.info.vix.split(".");
cG.info.vrb = 1;
Object.defineProperty(cG, 'script$', {
  get() { return cG.script; },
  set(script) { 
      if (typeof script === 'string') {
          try {script = JSON.parse(script)}
          catch (e) { console.error("Script must be valid JSON")};
      }
      //TODO: validate JSON schema

   },
});
//TODO: ES6 shorthand function support
cG.verbose = function(a){
    var submit = [];
    var b=1,c,d=1;
    if(a===null||a===void 0||isNaN(parseInt(a,10))) d = 0;
    else b=a;
    for(var k=d;k < arguments.length;k++){
        submit.push(arguments[k]);
    }
    if(cG.info.vrb===null||cG.info.vrb===void 0) c = 0;
    else c=cG.info.vrb
    if(c>=b) console.log([].concat(submit).join(" "));
}
/*MUTABLE REPOS*/
/*Repos are objects that assign a key to a plug-in's version of function*/
/*Check repo existence*/
cG.REPO = cG.REPO||{};
/*Set repo defaults - ASSUMES defaults aren't set, will overwrite them*/
//TODO: REPLACE pegasus and domReady to support electron app
cG.REPO.rdy = {def:/*domready (c) Dustin Diaz 2014 - License MIT _ogewan fork*/(a=>("undefined"!=typeof module&&module.exports?module.exports=a():"function"==typeof define&&"object"==define.amd&&define(a),a()))(()=>{var a,b=[],c="object"==typeof document&&document,d=c&&c.documentElement.doScroll,e=c&&(d?/^loaded|^c/:/^loaded|^i|^c/).test(c.readyState);return!e&&c&&c.addEventListener("DOMContentLoaded",a=()=>{for(c.removeEventListener("DOMContentLoaded",a),e=1;a=b.shift();)a()}),a=>{e?setTimeout(a,0):b.push(a)}})};
cG.REPO.agent = {def:/*pegasus.js*/function(t,e){return e=new XMLHttpRequest,e.open("GET",t),t=[],e.onreadystatechange=e.then=function(n,o,i){if(n&&n.call&&(t=[,n,o]),4==e.readyState&&(i=t[0|e.status/200]))try{i(JSON.parse(e.responseText),e)}catch(r){i(e.responseText,e)}},e.send(),e}};
cG.REPO.director = {"def":Path};
cG.REPO.producer = {"def":cG.N};
cG.REPO.scReq = cG.REPO.scReq||{};
cG.REPO.ctrls = cG.REPO.ctrls||{def: ""};
cG.REPO.decor = cG.REPO.decor||{def: ""};
cG.REPO.script = cG.REPO.script||{def: ""};
/*SHORTCUTS*/
cG.agent = cG.REPO.agent.def;
cG.director = cG.REPO.director.def;
cG.producer = cG.REPO.producer.def;
cG.ctrls = cG.REPO.ctrls.def;
cG.decor = cG.REPO.decor.def;
cG.script = cG.REPO.script.def;
cG.rdy = cG.REPO.rdy.def;
/*END comix-ngn properties*/
/*STAGE creation-REDACTED*/
//cG.HELPERS.jstagecreate = cG.N;