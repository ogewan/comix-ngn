//TODO: --rewrite_polyfills=false
/*TODO: 
(()=>{return this['cG'] = this['cG'] || new (function cG(){
this.voice = "Welcome to the World";
})()})();
*/

///INITIALIZE///
/*The namespace of comix-ngn
all variables should be properties of this to prevent global namespace pollution*/
var cG:any = cG || {};/*Instantiate cG if not*/
/*comix-ngn default properties*/
/*IMMUTABLE*/
cG.N =()=>{return 0};/*null function*/
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
      cG.comix.internals = script;
      cG.comix.frst();
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
cG.REPO.director = {def: (()=>{var Path={version:"0.8.4",map:function(a){if(Path.routes.defined.hasOwnProperty(a)){return Path.routes.defined[a]}else{return new Path.core.route(a)}},root:function(a){Path.routes.root=a},rescue:function(a){Path.routes.rescue=a},history:{initial:{},pushState:function(a,b,c){if(Path.history.supported){if(Path.dispatch(c)){history.pushState(a,b,c)}}else{if(Path.history.fallback){window.location.hash="#"+c}}},popState:function(a){var b=!Path.history.initial.popped&&location.href==Path.history.initial.URL;Path.history.initial.popped=true;if(b)return;Path.dispatch(document.location.pathname)},listen:function(a){Path.history.supported=!!(window.history&&window.history.pushState);Path.history.fallback=a;if(Path.history.supported){Path.history.initial.popped="state"in window.history,Path.history.initial.URL=location.href;window.onpopstate=Path.history.popState}else{if(Path.history.fallback){for(route in Path.routes.defined){if(route.charAt(0)!="#"){Path.routes.defined["#"+route]=Path.routes.defined[route];Path.routes.defined["#"+route].path="#"+route}}Path.listen()}}}},match:function(a,b){var c={},d=null,e,f,g,h,i;for(d in Path.routes.defined){if(d!==null&&d!==undefined){d=Path.routes.defined[d];e=d.partition();for(h=0;h<e.length;h++){f=e[h];i=a;if(f.search(/:/)>0){for(g=0;g<f.split("/").length;g++){if(g<i.split("/").length&&f.split("/")[g].charAt(0)===":"){c[f.split("/")[g].replace(/:/,"")]=i.split("/")[g];i=i.replace(i.split("/")[g],f.split("/")[g])}}}if(f===i){if(b){d.params=c}return d}}}}return null},dispatch:function(a){var b,c;if(Path.routes.current!==a){Path.routes.previous=Path.routes.current;Path.routes.current=a;c=Path.match(a,true);if(Path.routes.previous){b=Path.match(Path.routes.previous);if(b!==null&&b.do_exit!==null){b.do_exit()}}if(c!==null){c.run();return true}else{if(Path.routes.rescue!==null){Path.routes.rescue()}}}},listen:function(){var a=function(){Path.dispatch(location.hash)};if(location.hash===""){if(Path.routes.root!==null){location.hash=Path.routes.root}}if("onhashchange"in window&&(!document.documentMode||document.documentMode>=8)){window.onhashchange=a}else{setInterval(a,50)}if(location.hash!==""){Path.dispatch(location.hash)}},core:{route:function(a){this.path=a;this.action=null;this.do_enter=[];this.do_exit=null;this.params={};Path.routes.defined[a]=this}},routes:{current:null,root:null,rescue:null,previous:null,defined:{}}};Path.core.route.prototype={to:function(a){this.action=a;return this},enter:function(a){if(a instanceof Array){this.do_enter=this.do_enter.concat(a)}else{this.do_enter.push(a)}return this},exit:function(a){this.do_exit=a;return this},partition:function(){var a=[],b=[],c=/\(([^}]+?)\)/g,d,e;while(d=c.exec(this.path)){a.push(d[1])}b.push(this.path.split("(")[0]);for(e=0;e<a.length;e++){b.push(b[b.length-1]+a[e])}return b},run:function(){var a=false,b,c,d;if(Path.routes.defined[this.path].hasOwnProperty("do_enter")){if(Path.routes.defined[this.path].do_enter.length>0){for(b=0;b<Path.routes.defined[this.path].do_enter.length;b++){c=Path.routes.defined[this.path].do_enter[b]();if(c===false){a=true;break}}}}if(!a){Path.routes.defined[this.path].action()}}};return Path;})()};
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