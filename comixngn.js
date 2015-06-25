/*@preserve comix-ngn v1.8.0 | (c) 2015 Oluwaseun Ogedengbe| seun40.github.io/comic-ng/ |License: MIT|
embeds domReady: github.com/ded/domready (MIT) (c) 2013 Dustin Diaz, pegasus: typicode.github.io/pegasus (MIT) (c) 2014 typicode, pathjs (MIT) (c) 2011 Mike Trpcic, HTMLparser (MIT) (c) 2015 Oluwaseun Ogedengbe, swipe: swipejs.com (MIT) (c) 2013 Brad Birdsall*/

if(void 0===cG) var cG = {};/*check if cG is already is instantiated*/
/*comix-ngn default properties*/
/*IMMUTABLE*/
/*version settings*/
function N(){return 0};/*null function*/
if(void 0===$GPC){var $GPC=0;}
cG.root = '';
cG.info = {vix: "1.8.0",vwr: "1.0.0",vpr: "0.1.0"};
/*rollbar*/
if(_rollbarConfig===void 0){
    var _rollbarConfig = {
        accessToken: "3e8e8ecb63a04b5798e1d02adf2608cb",
        ignoredMessages: ["CNG Plug-in:"],
        captureUncaught: true,
        payload: {
            environment: "development",
            client: {
                javascript: {
                    source_map_enabled: true,
                    code_version: cG.info.vix,
                    // Optionally have Rollbar guess which frames the error was thrown from
                    // when the browser does not provide line and column numbers.
                    guess_uncaught_frames: true
                }
            }
        }
    };
    !function(r){function o(e){if(t[e])return t[e].exports;var n=t[e]={exports:{},id:e,loaded:!1};return r[e].call(n.exports,n,n.exports,o),n.loaded=!0,n.exports}var t={};return o.m=r,o.c=t,o.p="",o(0)}([function(r,o,t){"use strict";var e=t(1).Rollbar,n=t(2),i="https://d37gvrvc0wt4s1.cloudfront.net/js/v1.3/rollbar.umd.min.js";_rollbarConfig.rollbarJsUrl=_rollbarConfig.rollbarJsUrl||i;var a=e.init(window,_rollbarConfig),l=n(a,_rollbarConfig);a.loadFull(window,document,!1,_rollbarConfig,l)},function(r,o,t){"use strict";function e(r){this.shimId=++s,this.notifier=null,this.parentShim=r,this.logger=function(){},window.console&&void 0===window.console.shimId&&(this.logger=window.console.log)}function n(r,o,t){window._rollbarWrappedError&&(t[4]||(t[4]=window._rollbarWrappedError),t[5]||(t[5]=window._rollbarWrappedError._rollbarContext),window._rollbarWrappedError=null),r.uncaughtError.apply(r,t),o&&o.apply(window,t)}function i(r){var o=e;return l(function(){if(this.notifier)return this.notifier[r].apply(this.notifier,arguments);var t=this,e="scope"===r;e&&(t=new o(this));var n=Array.prototype.slice.call(arguments,0),i={shim:t,method:r,args:n,ts:new Date};return window._rollbarShimQueue.push(i),e?t:void 0})}function a(r,o){if(o.hasOwnProperty&&o.hasOwnProperty("addEventListener")){var t=o.addEventListener;o.addEventListener=function(o,e,n){t.call(this,o,r.wrap(e),n)};var e=o.removeEventListener;o.removeEventListener=function(r,o,t){e.call(this,r,o&&o._wrapped?o._wrapped:o,t)}}}function l(r,o){return o=o||window.console.log||function(){},function(){try{return r.apply(this,arguments)}catch(t){o("Rollbar internal error:",t)}}}var s=0;e.init=function(r,o){var t=o.globalAlias||"Rollbar";if("object"==typeof r[t])return r[t];r._rollbarShimQueue=[],r._rollbarWrappedError=null,o=o||{};var i=new e;return l(function(){if(i.configure(o),o.captureUncaught){var e=r.onerror;r.onerror=function(){var r=Array.prototype.slice.call(arguments,0);n(i,e,r)};var l,s,u="EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");for(l=0;l<u.length;++l)s=u[l],r[s]&&r[s].prototype&&a(i,r[s].prototype)}return r[t]=i,i},i.logger)()},e.prototype.loadFull=function(r,o,t,e,n){var i=l(function(){var r=o.createElement("script"),n=o.getElementsByTagName("script")[0];r.src=e.rollbarJsUrl,r.async=!t,r.onload=a,n.parentNode.insertBefore(r,n)},this.logger),a=l(function(){var o;if(void 0===r._rollbarPayloadQueue){var t,e,i,a;for(o=new Error("rollbar.js did not load");t=r._rollbarShimQueue.shift();)for(i=t.args,a=0;a<i.length;++a)if(e=i[a],"function"==typeof e){e(o);break}}"function"==typeof n&&n(o)},this.logger);l(function(){t?i():r.addEventListener?r.addEventListener("load",i,!1):r.attachEvent("onload",i)},this.logger)()},e.prototype.wrap=function(r,o){try{var t;if(t="function"==typeof o?o:function(){return o||{}},"function"!=typeof r)return r;if(r._isWrap)return r;if(!r._wrapped){r._wrapped=function(){try{return r.apply(this,arguments)}catch(o){throw o._rollbarContext=t()||{},o._rollbarContext._wrappedSource=r.toString(),window._rollbarWrappedError=o,o}},r._wrapped._isWrap=!0;for(var e in r)r.hasOwnProperty(e)&&(r._wrapped[e]=r[e])}return r._wrapped}catch(n){return r}};for(var u="log,debug,info,warn,warning,error,critical,global,configure,scope,uncaughtError".split(","),p=0;p<u.length;++p)e.prototype[u[p]]=i(u[p]);r.exports={Rollbar:e,_rollbarWindowOnError:n}},function(r,o,t){"use strict";r.exports=function(r,o){return function(t){if(!t&&!window._rollbarInitialized){var e=window.RollbarNotifier,n=o||{},i=n.globalAlias||"Rollbar",a=window.Rollbar.init(n,r);a._processShimQueue(window._rollbarShimQueue||[]),window[i]=a,window._rollbarInitialized=!0,e.processPayloads()}}}}]);
}/*end rollbar*/
/*DEFAULT LIB FUNCTIONS*/
var Path={version:"0.8.4",map:function(a){if(Path.routes.defined.hasOwnProperty(a)){return Path.routes.defined[a]}else{return new Path.core.route(a)}},root:function(a){Path.routes.root=a},rescue:function(a){Path.routes.rescue=a},history:{initial:{},pushState:function(a,b,c){if(Path.history.supported){if(Path.dispatch(c)){history.pushState(a,b,c)}}else{if(Path.history.fallback){window.location.hash="#"+c}}},popState:function(a){var b=!Path.history.initial.popped&&location.href==Path.history.initial.URL;Path.history.initial.popped=true;if(b)return;Path.dispatch(document.location.pathname)},listen:function(a){Path.history.supported=!!(window.history&&window.history.pushState);Path.history.fallback=a;if(Path.history.supported){Path.history.initial.popped="state"in window.history,Path.history.initial.URL=location.href;window.onpopstate=Path.history.popState}else{if(Path.history.fallback){for(route in Path.routes.defined){if(route.charAt(0)!="#"){Path.routes.defined["#"+route]=Path.routes.defined[route];Path.routes.defined["#"+route].path="#"+route}}Path.listen()}}}},match:function(a,b){var c={},d=null,e,f,g,h,i;for(d in Path.routes.defined){if(d!==null&&d!==undefined){d=Path.routes.defined[d];e=d.partition();for(h=0;h<e.length;h++){f=e[h];i=a;if(f.search(/:/)>0){for(g=0;g<f.split("/").length;g++){if(g<i.split("/").length&&f.split("/")[g].charAt(0)===":"){c[f.split("/")[g].replace(/:/,"")]=i.split("/")[g];i=i.replace(i.split("/")[g],f.split("/")[g])}}}if(f===i){if(b){d.params=c}return d}}}}return null},dispatch:function(a){var b,c;if(Path.routes.current!==a){Path.routes.previous=Path.routes.current;Path.routes.current=a;c=Path.match(a,true);if(Path.routes.previous){b=Path.match(Path.routes.previous);if(b!==null&&b.do_exit!==null){b.do_exit()}}if(c!==null){c.run();return true}else{if(Path.routes.rescue!==null){Path.routes.rescue()}}}},listen:function(){var a=function(){Path.dispatch(location.hash)};if(location.hash===""){if(Path.routes.root!==null){location.hash=Path.routes.root}}if("onhashchange"in window&&(!document.documentMode||document.documentMode>=8)){window.onhashchange=a}else{setInterval(a,50)}if(location.hash!==""){Path.dispatch(location.hash)}},core:{route:function(a){this.path=a;this.action=null;this.do_enter=[];this.do_exit=null;this.params={};Path.routes.defined[a]=this}},routes:{current:null,root:null,rescue:null,previous:null,defined:{}}};Path.core.route.prototype={to:function(a){this.action=a;return this},enter:function(a){if(a instanceof Array){this.do_enter=this.do_enter.concat(a)}else{this.do_enter.push(a)}return this},exit:function(a){this.do_exit=a;return this},partition:function(){var a=[],b=[],c=/\(([^}]+?)\)/g,d,e;while(d=c.exec(this.path)){a.push(d[1])}b.push(this.path.split("(")[0]);for(e=0;e<a.length;e++){b.push(b[b.length-1]+a[e])}return b},run:function(){var a=false,b,c,d;if(Path.routes.defined[this.path].hasOwnProperty("do_enter")){if(Path.routes.defined[this.path].do_enter.length>0){for(b=0;b<Path.routes.defined[this.path].do_enter.length;b++){c=Path.routes.defined[this.path].do_enter[b]();if(c===false){a=true;break}}}}if(!a){Path.routes.defined[this.path].action()}}};

/*domReady.js*/!function(e,t){typeof module!="undefined"?module.exports=t():typeof define=="function"&&typeof define.amd=="object"?define(t):this[e]=t()}("domReady",function(e){function p(e){h=1;while(e=t.shift())e()}var t=[],n,r=!1,i=document,s=i.documentElement,o=s.doScroll,u="DOMContentLoaded",a="addEventListener",f="onreadystatechange",l="readyState",c=o?/^loaded|^c/:/^loaded|c/,h=c.test(i[l]);return i[a]&&i[a](u,n=function(){i.removeEventListener(u,n,r),p()},r),o&&i.attachEvent(f,n=function(){/^c/.test(i[l])&&(i.detachEvent(f,n),p())}),e=o?function(n){self!=top?h?n():t.push(n):function(){try{s.doScroll("left")}catch(t){return setTimeout(function(){e(n)},50)}n()}()}:function(e){h?e():t.push(e)}});
/*domready cannot be embedded into the cG object, which means it is not replacable via plugin*/

function syncJSON(filePath) {/*! http://stackoverflow.com/a/4117299*/
  // Load json file;
  var json = loadTextFileAjaxSync(filePath, "application/json");
  // Parse json
  return (json)?JSON.parse(json):0;
}   

// Load text with Ajax synchronously: takes path to file and optional MIME type
function loadTextFileAjaxSync(filePath, mimeType){
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET",filePath,false);
  if (mimeType != null) {
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType(mimeType);
    }
  }
  xmlhttp.send();
  if (xmlhttp.status>=200&&xmlhttp.status<=304)
  {
    return xmlhttp.responseText;
  }
  else {
    // TODO Throw exception
    return null;
  }
}
/*MUTABLE REPOS*/
/*Repos are objects that assign a key to a plug-in's version of function*/
/*Check repo existence*/
if(void 0===cG.REPO) cG.REPO = {};
/*var q = ["agent","director","stage","scenography","producer","actor","decor","stage"];
for (p in q) {
    if(void 0===cG.REPO[q[p]]) cG.REPO[q[p]] = {};
}
q = void 0;*/
/*Set repo defaults - ASSUMES defaults aren't set, will overwrite them*/
cG.REPO.agent = {def:/*pegasus.js*/function(t,e){return e=new XMLHttpRequest,e.open("GET",t),t=[],e.onreadystatechange=e.then=function(n,o,i){if(n&&n.call&&(t=[,n,o]),4==e.readyState&&(i=t[0|e.status/200]))try{i(JSON.parse(e.responseText),e)}catch(r){i(e.responseText,e)}},e.send(),e}};

cG.REPO.director = {"def":Path};

cG.REPO.producer = {"def":N};

if(void 0===cG.REPO.stage) cG.REPO.stage = {def:{body:""}};
cG.REPO.stage.def.id = "def";
cG.REPO.stage.def.fnt= /*swipe.js*/function(t,e){"use strict";function o(){P=m.children,v=P.length,P.length<2&&(e.continuous=!1),f.transitions&&e.continuous&&P.length<3&&(m.appendChild(P[0].cloneNode(!0)),m.appendChild(m.children[1].cloneNode(!0)),P=m.children),y=Array(P.length),w=t.getBoundingClientRect().width||t.offsetWidth,m.style.width=P.length*w+"px";for(var o=P.length;o--;){var i=P[o];i.style.width=w+"px",i.setAttribute("data-index",o),f.transitions&&(i.style.left=o*-w+"px",a(o,_>o?-w:o>_?w:0,0))}e.continuous&&f.transitions&&(a(r(_-1),-w,0),a(r(_+1),w,0)),f.transitions||(m.style.left=_*-w+"px"),t.style.visibility="visible"}function i(){e.continuous?h(_-1):_&&h(_-1)}function n(){e.continuous?h(_+1):_<P.length-1&&h(_+1)}function r(t){return(P.length+t%P.length)%P.length}function h(t,o){if(_!=t){if(f.transitions){var i=Math.abs(_-t)/(_-t);if(e.continuous){var n=i;i=-y[r(t)]/w,i!==n&&(t=-i*P.length+t)}for(var h=Math.abs(_-t)-1;h--;)a(r((t>_?t:_)-h-1),w*i,0);t=r(t),a(_,w*i,o||g),a(t,0,o||g),e.continuous&&a(r(t-i),-(w*i),0)}else t=r(t),u(_*-w,t*-w,o||g);_=t,p(e.callback&&e.callback(_,P[_]))}}function a(t,e,o){s(t,e,o),y[t]=e}function s(t,e,o){var i=P[t],n=i&&i.style;n&&(n.webkitTransitionDuration=n.MozTransitionDuration=n.msTransitionDuration=n.OTransitionDuration=n.transitionDuration=o+"ms",n.webkitTransform="translate("+e+"px,0)translateZ(0)",n.msTransform=n.MozTransform=n.OTransform="translateX("+e+"px)")}function u(t,o,i){if(!i)return void(m.style.left=o+"px");var n=+new Date,r=setInterval(function(){var h=+new Date-n;return h>i?(m.style.left=o+"px",b&&l(),e.transitionEnd&&e.transitionEnd.call(event,_,P[_]),void clearInterval(r)):void(m.style.left=(o-t)*(Math.floor(h/i*100)/100)+t+"px")},4)}function l(){x=setTimeout(n,b)}function d(){b=0,clearTimeout(x)}var c=function(){},p=function(t){setTimeout(t||c,0)},f={addEventListener:!!window.addEventListener,touch:"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,transitions:function(t){var e=["transitionProperty","WebkitTransition","MozTransition","OTransition","msTransition"];for(var o in e)if(void 0!==t.style[e[o]])return!0;return!1}(document.createElement("swipe"))};if(t){var P,y,w,v,m=t.children[0];e=e||{};var _=parseInt(e.startSlide,10)||0,g=e.speed||300;e.continuous=void 0!==e.continuous?e.continuous:!0;var x,S,b=e.auto||0,k={},A={},L={handleEvent:function(t){switch(t.type){case"touchstart":this.start(t);break;case"touchmove":this.move(t);break;case"touchend":p(this.end(t));break;case"webkitTransitionEnd":case"msTransitionEnd":case"oTransitionEnd":case"otransitionend":case"transitionend":p(this.transitionEnd(t));break;case"resize":p(o)}e.stopPropagation&&t.stopPropagation()},start:function(t){var e=t.touches[0];k={x:e.pageX,y:e.pageY,time:+new Date},S=void 0,A={},m.addEventListener("touchmove",this,!1),m.addEventListener("touchend",this,!1)},move:function(t){if(!(t.touches.length>1||t.scale&&1!==t.scale)){e.disableScroll&&t.preventDefault();var o=t.touches[0];A={x:o.pageX-k.x,y:o.pageY-k.y},void 0===S&&(S=!(!S&&Math.abs(A.x)>=Math.abs(A.y))),S||(t.preventDefault(),d(),e.continuous?(s(r(_-1),A.x+y[r(_-1)],0),s(_,A.x+y[_],0),s(r(_+1),A.x+y[r(_+1)],0)):(A.x=A.x/(!_&&A.x>0||_==P.length-1&&A.x<0?Math.abs(A.x)/w+1:1),s(_-1,A.x+y[_-1],0),s(_,A.x+y[_],0),s(_+1,A.x+y[_+1],0)))}},end:function(){var t=+new Date-k.time,o=250>+t&&Math.abs(A.x)>20||Math.abs(A.x)>w/2,i=!_&&A.x>0||_==P.length-1&&A.x<0;e.continuous&&(i=!1);var n=A.x<0;S||(o&&!i?(n?(e.continuous?(a(r(_-1),-w,0),a(r(_+2),w,0)):a(_-1,-w,0),a(_,y[_]-w,g),a(r(_+1),y[r(_+1)]-w,g),_=r(_+1)):(e.continuous?(a(r(_+1),w,0),a(r(_-2),-w,0)):a(_+1,w,0),a(_,y[_]+w,g),a(r(_-1),y[r(_-1)]+w,g),_=r(_-1)),e.callback&&e.callback(_,P[_])):e.continuous?(a(r(_-1),-w,g),a(_,0,g),a(r(_+1),w,g)):(a(_-1,-w,g),a(_,0,g),a(_+1,w,g))),m.removeEventListener("touchmove",L,!1),m.removeEventListener("touchend",L,!1)},transitionEnd:function(t){parseInt(t.target.getAttribute("data-index"),10)==_&&(b&&l(),e.transitionEnd&&e.transitionEnd.call(t,_,P[_]))}};return o(),b&&l(),f.addEventListener?(f.touch&&m.addEventListener("touchstart",L,!1),f.transitions&&(m.addEventListener("webkitTransitionEnd",L,!1),m.addEventListener("msTransitionEnd",L,!1),m.addEventListener("oTransitionEnd",L,!1),m.addEventListener("otransitionend",L,!1),m.addEventListener("transitionend",L,!1)),window.addEventListener("resize",L,!1)):window.onresize=function(){o()},{setup:function(){o()},slide:function(t,e){d(),h(t,e)},prev:function(){d(),i()},next:function(){d(),n()},stop:function(){d()},getPos:function(){return _},getNumSlides:function(){return v},kill:function(){d(),m.style.width="",m.style.left="";for(var t=P.length;t--;){var e=P[t];e.style.width="",e.style.left="",f.transitions&&s(t,0,0)}f.addEventListener?(m.removeEventListener("touchstart",L,!1),m.removeEventListener("webkitTransitionEnd",L,!1),m.removeEventListener("msTransitionEnd",L,!1),m.removeEventListener("oTransitionEnd",L,!1),m.removeEventListener("otransitionend",L,!1),m.removeEventListener("transitionend",L,!1),window.removeEventListener("resize",L,!1)):window.onresize=null}}}};
cG.REPO.stage.def.controls = function(holder,instruction,dur){
     /*if(cG.script === '') {
        setTimeout(cG.REPO.stage.def.controls, 300,holder,instruction,dur); 
        return;
    }
    if(!cG.script) return console.error("No script.JSON found. script.JSON is REQUIRED for Routing support");*/
    if(void 0===holder) return console.error("holder - the stage to which the button will be attached, is required");
    if(void 0===dur) dur = 400;
    //console.log(window[holder],holder);
    switch(instruction){
        case "a"://first
            holder.slide(0,dur);//window[holder].slide(0,dur);
            break;
        case "b"://left
            holder.prev();//window[holder].prev();
            break;
        case "c"://rght
            holder.next();//window[holder].next();
            break;
        case "d"://last
            holder.slide(cG.script.pages.length-1,dur);//window[holder].slide(cG.script.pages.length-1,dur);
            break;
        case "e"://rand
            holder.slide(Math.floor(Math.random() * cG.script.pages.length-1),dur);//window[holder].slide(Math.floor(Math.random() * cG.script.pages.length-1),dur);
            break;
        case "z":
            break;
        default:
            //if(event.keyCode == 13) {
            instruction = parseInt(instruction.value);
            //console.log(instruction)
            if(isNaN(instruction)) instruction = 0
            holder.slide(Math.floor(Math.max(0,Math.min(cG.script.pages.length-1,instruction))),dur);//window[holder].slide(Math.floor(Math.max(0,Math.min(cG.script.pages.length-1,instruction))),dur);
            //}
            break;
    }
};
cG.REPO.stage.def.scenography = document.createElement("style");
/*cG.REPO.stage.def.scenography.setAttribute("media", "screen");*/
cG.REPO.stage.def.scenography.setAttribute("id", "scenography");
cG.REPO.stage.def.scenography.appendChild(document.createTextNode('article,aside,b,body,dd,del,dfn,div,dl,dt,em,fieldset,footer,form,h1,h2,h3,h4,h5,h6,header,html,i,iframe,img,ins,kbd,label,li,nav,object,ol,p,q,samp,section,small,span,strong,table,tbody,td,tfoot,th,thead,tr,ul{margin:0;padding:0;border:0;outline:0;font-size:100%;vertical-align:baseline;background:0 0}body{-webkit-text-size-adjust:none;font-family:sans-serif;min-height:416px}h1{font-size:33px;margin:50px 0 15px;text-align:center;color:#212121}h2{font-size:14px;font-weight:700;color:#3c3c3c;margin:20px 10px 10px}small{margin:0 10px 30px;display:block;font-size:12px}a{margin:0 0 0 10px;font-size:12px;color:#3c3c3c}body,html{background:#f3f3f3}#console{font-size:12px;font-family:Inconsolata,Monaco,Consolas,"Andale Mono","Bitstream Vera Sans Mono","Courier New",Courier,monospace;color:#999;line-height:18px;margin-top:20px;max-height:150px;overflow:auto}#mySwipe div b{display:block;font-weight:700;color:#14ADE5;font-size:20px;text-align:center;margin:10px;padding:100px 10px;box-shadow:0 1px #EBEBEB;background:#fff;border-radius:3px;border:1px solid;border-color:#E5E5E5 #D3D3D3 #B9C1C6}.swipe{overflow:hidden;visibility:hidden;position:relative}.swipe-wrap{overflow:hidden;position:relative}.swipe-wrap>div{float:left;width:100%;position:relative}'));

if(void 0===cG.REPO.actor) cG.REPO.actor = {def: ""};
if(void 0===cG.REPO.decor) cG.REPO.decor = {def: ""};
if(void 0===cG.REPO.script) cG.REPO.script = {def: ""};
/*SHORTCUTS*/
cG.agent = cG.REPO.agent.def;
cG.director = cG.REPO.director.def;
cG.producer = cG.REPO.producer.def;
cG.actor = cG.REPO.actor.def;
cG.decor = cG.REPO.decor.def;
cG.script = cG.REPO.script.def;
cG.stage = cG.REPO.stage.def;
document.head.appendChild(cG.stage.scenography);/*Add the <style> element to the page
/*HELPERS*/
cG.HELPERS = {};
/*END comix-ngn properties*/

/*AJAX Calls*/
/*debugging: ensures cG is correctly instaniated*//*console.log(cG);*/
var dir = "";
var tir = "";
var src = document.getElementsByTagName("SCRIPT");
for (i = 0; i < src.length; i++) { 
    dir=src[i].getAttribute("dir");
    if(dir!="") break;
}
for (i = 0; i < src.length; i++) { 
    tir=src[i].getAttribute("template");
    if(tir!="") break;
}
for (i = 0; i < src.length; i++) { 
    cG.root=src[i].getAttribute("plugin");
    if(cG.root!="") break;
}
if (1||void 0==dir) dir="";
//if (dir[dir.length-1]!="/") dir +="/";
if (1||void 0==tir) tir="";
if(cG.root=="") cG.root="def";
if(typeof getScript === 'undefined'){/*create script.json promise if not already created*/
    var getScript = cG.agent(dir+'script.json');
    getScript.then(
        function(data, xhr) {
            cG.script = cG.REPO.script.def = data;
        },
        function(data, xhr) {
            console.error(data, xhr.status);
        cG.script = cG.REPO.script.def = 0;
    });
}
if(typeof getStage === 'undefined'){
    var getStage = cG.agent(tir+'stage.html');
    getStage.then(
    function(data, xhr) {
        cG.stage.body = cG.REPO.stage.def.body = data;
    },
    function(data, xhr) {
        console.error(data, xhr.status);
        cG.stage.body = cG.REPO.stage.def.body = 0;
    });
}
if(typeof getDecor === 'undefined'){
    var getDecor = cG.agent(tir+'costumes.html');
    getDecor.then(
    function(data, xhr) {
        cG.decor = cG.REPO.decor.def = data;
    },
    function(data, xhr) {
        console.error(data, xhr.status);
        cG.decor = cG.REPO.decor.def = 0;
    });
}
if(typeof getActor === 'undefined'){
    var getActor = cG.agent(tir+'actor.html');
    getActor.then(
    function(data, xhr) {
        cG.actor = cG.REPO.actor.def = data;
    },
    function(data, xhr) {
        console.error(data, xhr.status);
        cG.actor = cG.REPO.actor.def = 0;
    });
}
/*END AJAX calls*/
/*STAGE creation*/
cG.HELPERS.jstagecreate = function(){
    if(cG.script == '' || cG.actor == '' || cG.stage.body == '') { //if are stuff isn't yet we are going to wait for it
        setTimeout(cG.HELPERS.jstagecreate, 300); 
        return;
    }
    /*pure JS-testing purposes*/
    var stg = document.createElement("div");
    stg.setAttribute("id", "stage");
    stg.setAttribute("class", "swipe");
    /*stg.setAttribute("style", 'max-width:500px;margin:0 auto');*/
    var sce = document.createElement("div");
    sce.setAttribute("class", "swipe-wrap");
    for (i = 0; i < cG.script.pages.length; i++) { 
        var act = document.createElement("div");
        var sld = document.createElement("img");
        /*<img id isrc src title alt btog>*/
        sld.setAttribute("src", "assets/"+cG.script.pages[i].url);
        act.appendChild(sld);
        sce.appendChild(act);
    }
    stg.appendChild(sce);
    var ctrls = document.createElement("p");
    ctrls.setAttribute("class", "controls");
    var butfirs = document.createElement("button");
    var butprev = document.createElement("button");
    var butrand = document.createElement("button");
    var butindx = document.createElement("input");
    var butnext = document.createElement("button");
    var butlast = document.createElement("button");
    butfirs.setAttribute("class", "frs");
    butprev.setAttribute("class", "frs");
    butnext.setAttribute("class", "las");
    butlast.setAttribute("class", "las");
    butfirs.setAttribute("onclick", "window.mySwipe.slide(0, 400);");
    butfirs.appendChild(document.createTextNode("FIRST"));
    butprev.setAttribute("onclick", "window.mySwipe.prev();");
    butprev.appendChild(document.createTextNode("PREV"));
    butnext.setAttribute("onclick", "window.mySwipe.next();");
    butnext.appendChild(document.createTextNode("NEXT"));
    butrand.setAttribute("onclick", "window.mySwipe.slide(Math.floor(Math.random() * 39),400);");
    butrand.appendChild(document.createTextNode("?"));
    butlast.setAttribute("onclick", "window.mySwipe.slide(window.mySwipe.getNumSlides()-1,400);");
    butlast.appendChild(document.createTextNode("LAST"));
    ctrls.appendChild(butfirs);
    ctrls.appendChild(butprev);
    ctrls.appendChild(butnext);
    ctrls.appendChild(butlast);
    ctrls.appendChild(butrand);
    document.body.appendChild(ctrls);
    document.body.appendChild(stg);
    /*<p><button class="frs" id="bfrs" onclick="caruso.frst()">|<</button>
        <button class="frs" id="bpre" onclick="caruso.left()">< Prev</button>
        <button id="bran" onclick="caruso.rand()">?</button>
        <input id="snum" type="number" class="tiny" onkeydown="caruso.indx(this)"/>
        <button class="las" id="bnex" onclick="caruso.rght()">Next ></button>
        <button class="las" id="blas" onclick="caruso.last()">>|</button></p>
*/
    document.body.appendChild(stg);
    window.mySwipe = new cG.stage.fnt(document.getElementById('stage'), {
        startSlide: 0,
        speed: 400,
        auto: 3000,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        callback: function(index, elem) {},
        transitionEnd: function(index, elem) {}
    });
    //cG.stage.controls(window.mySwipe);
};

cG.stageInjection = function(SPECIFIC){
    if(cG.script === '' || cG.actor === '' || cG.stage.body === '' || cG.decor === '') {
        /*if are stuff isn't ready yet we are going to wait for it*/
        setTimeout(cG.stageInjection, 300); 
        return;
    }
    if(!cG.script) return console.error("No script.JSON found. script.JSON is REQUIRED to create stage. Please create a script.JSON or move it to the directory specified in the script tag for comix-ngn or bellerophon if it is added.");

    var stages = [];
    var errr = "stageInjection can only operate on elements or arrays of elements";
    if(void 0 === SPECIFIC) stages = document.getElementsByClassName("venue");/*get all entry points*/
    else if(Array.isArray(SPECIFIC)){
        if(SPECIFIC.length>0) if(void 0 ===SPECIFIC[0].nodeName) return console.error(errr);
        else return console.error(errr);
        stages = stages.concat(SPECIFIC);
    }
    else{
        if(void 0 === SPECIFIC.nodeName) return console.error(errr);
        stages.push(SPECIFIC);/*if not array and not undefined, assume it is a Element*/
    }
    var idealStage = (cG.stage.body)?cG.stage.body:'<p class="controls"></p><div id="stage" class="swipe"><div id="target" class="swipe-wrap"></div></div>';
    var idealStar = (cG.actor)?cG.actor:'<div><h1></h1><p><img id="ig" isrc src title alt btog></p></div>';
    var idealCostumes = (cG.decor)?cG.decor:'<div id="location"></div><div id="archive">Archive</div><div id="me">About Me</div>';
    
    var id_attr = "";
    var script_attr = "";
    var use_attr = "";
    var config_attr = "";
    
    var result;
    var myScript;
    var subclone;
    var dipclone;
    var clone;
    var links;
    var target = '';
    var control = '';
    var cset = [[],[]];
    var myStage = {};
    for (i = 0; i < stages.length; i++) {
        /*initial setup*/
        /*get attributes */
        id_attr = stages[i].getAttribute("id");
        script_attr = stages[i].getAttribute("script");
        use_attr = stages[i].getAttribute("use");
        config_attr = stages[i].getAttribute("config");
        if(id_attr==""){/*if no ID, make one*/
            var name = "STG"+i;
            var j = 1;
            while(document.getElementById(name)) name = "STG"+(i+j++);
            id_attr = name.toString();
            stages[i].setAttribute("id", id_attr);
        }
        if(script_attr==""){/*if no script, use the default*/
            myScript = cG.script;
        } else {
            myScript = syncJSON(script_attr);/*if given, assume it is a src*/
            if(!myScript){/*if you get a 404, assume its an ID*/
                if(0){//not implemeneted yet
                myScript = cG.script.extras[parseInt(script_attr,10)];/*search for that ID in the script*/
                if(void 0===myScript) myScript = cG.script;/*if not found use default*/
                else if(void 0!==myScript.link){/*if the found script is a reference, load it*/
                    myScript = syncJSON(myScript.link);
                    if(!myScript) myScript = cG.script;/*if not found use default*/
                }
                } else myScript = cG.script;
            }
        }
        if(use_attr==""){/*if no use specified, use current*/
            myStage.stage = cG.stage;
            myStage.stageID = cG.stageID;
            myStage.scenography = cG.scenography;
            myStage.stage_ctrls = cG.stage_ctrls;
            myStage.templates = cG.templates;
        } else {
            myStage = cG.stageREPO[use_attr];/*use the id of the plug in to set stage*/
            if(void 0===myStage){/*if not found specified, use current*/
                myStage.stage = cG.stage;
                myStage.stageID = cG.stageID;
                myStage.scenography = cG.scenography;
                myStage.stage_ctrls = cG.stage_ctrls;
                myStage.templates = cG.templates;
            } else myStage.stageID = use_attr;
        }
        if(config_attr!=""){
            try {
                config_attr=JSON.parse(config_attr);
            }
            catch(err) {
                console.debug("The following configuration settings are malformed: ",config_attr,"It has been ignored");
                config_attr={};
            }
        } else config_attr={};
        /*END initial set up*/
        /*index.html(venue)<-costumes.html(location)<-stage.html(target)<-actor.html*/
        cset = [["<|","<","?","index",">",">|"],["cG.stage.controls("+id_attr+",'a')","cG.stage.controls("+id_attr+",'b')","cG.stage.controls("+id_attr+",'e')","cG.stage.controls("+id_attr+",this)","cG.stage.controls("+id_attr+",'c')","cG.stage.controls("+id_attr+",'d')"]];
        clone = stages[i].cloneNode(false);
        
        links = cG.HELPERS.FEbyIdAI(clone,["venue","location","target","controls"],[idealCostumes,idealStage]);
        //console.log(links);
        for (t = 0; t < links.length; t++) {
            if(links[t].getAttribute("id")=="target"){
                target = links[t];
                continue;
            }
            if(links[t].getAttribute("id")=="ctrl"){
                control = links[t];
                continue;
            }
            if(control!="" && target!="") break;
        }
        if(!target) console.error("target fallback not implemented");
        cG.HELPERS.renameEles(false,clone,id_attr);
        //console.log(clone);
        /*append the slides*/
        //console.log(cG.script);
        target.innerHTML=idealStar;
        subclone=target.children[0].cloneNode(true);/*original clone*/
        target.innerHTML="";
        for (f = 0; f < cG.script.pages.length; f++) {
            dipclone=subclone.cloneNode(true);
            cG.HELPERS.renameEles(true,dipclone,id_attr,f);
            cG.HELPERS.smartAttrib(dipclone,{
                img: {
                    isrc:cG.script.pages[f].url,
                    src:cG.script.config.dir+cG.script.pages[f].url
                },
                h1: {
                    innerHTML: cG.script.pages[f].title
                }
            });
            target.appendChild(dipclone);
            //console.log(dipclone);
        }
        //console.log(target);
        cG.HELPERS.smartAttrib(control,{
                p: {
                    innerHTML: '<button class="'+id_attr+'_frs" id="'+id_attr+'_bfrs" onclick="'+cset[1][0]+'">'+cset[0][0]+'</button><button class="'+id_attr+'_frs" id="'+id_attr+'_bpre" onclick="'+cset[1][1]+'">'+cset[0][1]+'</button><button id="'+id_attr+'_bran" onclick="'+cset[1][2]+'">'+cset[0][2]+'</button><input id="'+id_attr+'_snum" type="number" class="tiny" onkeydown="'+cset[1][3]+'"/><button class="'+id_attr+'_las" id="'+id_attr+'_bnex" onclick="'+cset[1][4]+'">'+cset[0][4]+'</button><button class="'+id_attr+'_las" id="'+id_attr+'_blas" onclick="'+cset[1][5]+'">'+cset[0][5]+'</button>'
                }
            });
        //console.log(clone);
        stages[i].parentNode.replaceChild(clone, stages[i]);
        window[id_attr] = new cG.stage.fnt(target.parentNode, config_attr);
        
    Path.root("#");
    Path.listen();
    
        //console.log(window[id_attr],id_attr);
    } //console.log("TEST",idealStage,idealStar,idealCostumes,stages,clone,id_attr,script_attr,use_attr,result,myScript,myStage);
};
/*end STAGE creation*/
/*ROUTING*/
Path.map("#/:page").to(function(){
    cG.stage.controls(window[document.getElementsByClassName("venue")[0].getAttribute("id")],{value:this.params['page']});
});
/*end routing*/
domReady(function(){
    /*everything else occurs here*/
    if(!document.getElementById("$COMICNGWRITER$$$")){/*prints version information*/ console.log("%c %c %c comix-ngn v"+ cG.info.vix +" %c \u262F %c \u00A9 2015 Oluwaseun Ogedengbe %c Plugins: "+$GPC, "color:white; background:#2EB531", "background:purple","color:white; background:#32E237", 'color:red; background:black', "color:white; background:#2EB531", "color:white; background:purple");}
    //console.log(JSON.stringify(cG, null, 2) );
    var a = document.getElementsByTagName("SCRIPT");
    var b;
    for (i = 0; i < a.length; i++) {
        if(void 0==a[i].getAttribute("src")) continue;
        if(a[i].getAttribute("src").indexOf("comixngn")>=0){
            b=a[i].getAttribute("auto");
            break;
        };
    }
    if(b||b==void 0||b==""){
        //cG.HELPERS.jstagecreate();
        cG.stageInjection();
    }
});

/*/////////////////////////////////////////////////
HELPER FUNCTIONS*/
cG.HELPERS.smartAttrib = function(source,mapper){
    var base;
    var srch = mapper[source.nodeName.toLowerCase()];
    if(void 0 !== srch){
        if(srch.count === void 0 || srch.count != 0){/*as long as count != 0 we can set the attribute*/
            base = Object.keys(srch);
            for(y=0;y<base.length;y++){
                if(base[y]=="count") continue;
                if(base[y]=="innerHTML"){
                    source.innerHTML = srch[base[y]];
                    continue;
                }
                source.setAttribute(base[y],srch[base[y]]);         
            }
            if(srch.count > 0) mapper[source.nodeType.toLowerCase()].count--;/*if count is above 0, decrement it (this limits the amount of sets)*/
        }
    }
    for(var x=0;x<source.children.length;x++) cG.HELPERS.smartAttrib(source.children[x],mapper);
}
cG.HELPERS.FEbyIdAI = function(source,ids,inner){
    var ret = [];
    var w;
    var j;
    var q = ids.indexOf(source.getAttribute("id"))+1;
    if(!q){
        w = source.className.split(" ");
        //console.log(q,w);
        for(b=0;b<w.length;b++){
            //console.log(ids,w,ids.indexOf(w[b]));
            q = ids.indexOf(w[b]);
            if(q>=0) break;
        }
        q++;
    }
    if(q){
        source.innerHTML = inner[q-1];
        ret.push(source);
    }
    
    for(var a=0;a<source.children.length;a++){
        ret = ret.concat(cG.HELPERS.FEbyIdAI(source.children[a],ids,inner));
    }
    //console.log(q,ret,source);
    return ret;
}
cG.HELPERS.renameEles = function(bool,source,prepend,append){
    for(var x=0;x<source.children.length;x++) cG.HELPERS.renameEles(true,source.children[x],prepend,append);
    if(bool) {
        var pre = (void 0===prepend)?'':prepend+"_";
        var app = (void 0===append)?'':"_"+append;
        source.setAttribute("id",pre+source.getAttribute("id")+app);
    }
}
//# sourceMappingURL=https://raw.githubusercontent.com/seun40/comix-ngn/dev/comixngn.js.map