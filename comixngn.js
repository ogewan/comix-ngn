/*! comix-ngn v1.7.5 | (c) 2015 Oluwaseun Ogedengbe| seun40.github.io/comic-ng/ |License: MIT|
embeds domReady: github.com/ded/domready (MIT) (c) 2013 Dustin Diaz, pegasus: typicode.github.io/pegasus (MIT) (c) 2014 typicode, pathjs (MIT) (c) 2011 Mike Trpcic, HTMLparser (MIT) (c) 2015 Oluwaseun Ogedengbe, swipe: swipejs.com (MIT) (c) 2013 Brad Birdsall*/
if(void 0===cG) var cG = {};/*check if cG is already is instantiated*/
/*comix-ngn default properties*/
/*IMMUTABLE*/
/*version settings*/
function N(){return 0};/*null function*/
cG.root = '';
cG.info = {
    vers_ix: {/*comix-ngn version info*/
        status: 1,//beta
        major: 7,
        minor: 5,
        version: function() {return this.status.toString()+"."+this.major.toString()+"."+this.minor.toString();},
        changelog: {
            "0.5.0": "Initial Setup, Versioning",
            "0.7.5": "Added Dependencies (JS): (jquery.min, angular-touch.min, angular.min[Update],bootstrap.min), Carousel for slides, real-time reactivity",
            "0.7.7": "Retooled carousel buttons, added page count checker",
            "0.7.8": "Minor Modifications, page is aligned to center, index.html is cleaned up",
            "0.8.2": "caruso updated, controls are now hid automatically, date is now formated, appifying the stage",
            "0.9.8": "stage.html template created, index html cleaned up, added isrc(imaginary source) attribute to preload images but not implemented yet",
            "1.0.0": "routing and page updating works???Page loading works, navigate by url and back button work",
            "1.1.0": "code refactor, all external dependencies removed, new micro lib dependencies are embedded",
            "1.1.1": "iCanHaz replaced with HTMLparser",
            "1.2.0": "created machinery for initing stageInjection, created new template: costumes.html, that creates multiple pages for the app, added dir and script specification, added redundancy checks so that the program isn't broken when data fails to load, or there is a conflict.",
            "1.3.0": "Depreciating HTMLparser b/c it is to unreliable.",
            "1.4.1": "Reorganize CG structure to allow plugins to simply append rather than replace. Reorganize directory",
            "1.7.5": "Complete addition of REPO system",
        },
    },
    vers_wr: {/*comix-ngn writer version info*/
        status: 0,//alpha
        major: 9,
        minor: 6,
        version: function() {return this.status.toString()+"."+this.major.toString()+"."+this.minor.toString();},
        changelog: {
            "0.5.0": "Initial Setup, Versioning",
            "0.8.0": "Huge implementations, Object config by dynamic form injection for Page and Chapter, Setting config compartmentalized, design config added",
            "0.9.0": "added pyoofreader configuration, added continue a config file, but its not implemented script wise yet, pyoofreader not fully implemented yet",
            "0.9.6": "pyoofreader gets its own version, continue config fully implemented, cosmetic changes, now able to download a stage and a template index.html",
            "1.0.0": "Ready for beta",
        },
    },
    vers_pr: {/*comix-ngn pyoofreader version info*/
        status: 0,//alpha
        major: 1,
        minor: 0,
        version: function() {return this.status.toString()+"."+this.major.toString()+"."+this.minor.toString();},
        changelog: {
            "0.1.0": "Implemented version, counts page dif and warns of Mismatch",
        },
    },
};
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
cG.REPO.agent = {default:/*pegasus.js*/function(t,e){return e=new XMLHttpRequest,e.open("GET",t),t=[],e.onreadystatechange=e.then=function(n,o,i){if(n&&n.call&&(t=[,n,o]),4==e.readyState&&(i=t[0|e.status/200]))try{i(JSON.parse(e.responseText),e)}catch(r){i(e.responseText,e)}},e.send(),e}};

cG.REPO.director = {"default":Path};

cG.REPO.producer = {"default":N};

if(void 0===cG.REPO.stage) cG.REPO.stage = {default:{body:""}};
cG.REPO.stage.default.id = "default";
cG.REPO.stage.default.function = /*swipe.js*/function(t,e){"use strict";function o(){P=m.children,v=P.length,P.length<2&&(e.continuous=!1),f.transitions&&e.continuous&&P.length<3&&(m.appendChild(P[0].cloneNode(!0)),m.appendChild(m.children[1].cloneNode(!0)),P=m.children),y=Array(P.length),w=t.getBoundingClientRect().width||t.offsetWidth,m.style.width=P.length*w+"px";for(var o=P.length;o--;){var i=P[o];i.style.width=w+"px",i.setAttribute("data-index",o),f.transitions&&(i.style.left=o*-w+"px",a(o,_>o?-w:o>_?w:0,0))}e.continuous&&f.transitions&&(a(r(_-1),-w,0),a(r(_+1),w,0)),f.transitions||(m.style.left=_*-w+"px"),t.style.visibility="visible"}function i(){e.continuous?h(_-1):_&&h(_-1)}function n(){e.continuous?h(_+1):_<P.length-1&&h(_+1)}function r(t){return(P.length+t%P.length)%P.length}function h(t,o){if(_!=t){if(f.transitions){var i=Math.abs(_-t)/(_-t);if(e.continuous){var n=i;i=-y[r(t)]/w,i!==n&&(t=-i*P.length+t)}for(var h=Math.abs(_-t)-1;h--;)a(r((t>_?t:_)-h-1),w*i,0);t=r(t),a(_,w*i,o||g),a(t,0,o||g),e.continuous&&a(r(t-i),-(w*i),0)}else t=r(t),u(_*-w,t*-w,o||g);_=t,p(e.callback&&e.callback(_,P[_]))}}function a(t,e,o){s(t,e,o),y[t]=e}function s(t,e,o){var i=P[t],n=i&&i.style;n&&(n.webkitTransitionDuration=n.MozTransitionDuration=n.msTransitionDuration=n.OTransitionDuration=n.transitionDuration=o+"ms",n.webkitTransform="translate("+e+"px,0)translateZ(0)",n.msTransform=n.MozTransform=n.OTransform="translateX("+e+"px)")}function u(t,o,i){if(!i)return void(m.style.left=o+"px");var n=+new Date,r=setInterval(function(){var h=+new Date-n;return h>i?(m.style.left=o+"px",b&&l(),e.transitionEnd&&e.transitionEnd.call(event,_,P[_]),void clearInterval(r)):void(m.style.left=(o-t)*(Math.floor(h/i*100)/100)+t+"px")},4)}function l(){x=setTimeout(n,b)}function d(){b=0,clearTimeout(x)}var c=function(){},p=function(t){setTimeout(t||c,0)},f={addEventListener:!!window.addEventListener,touch:"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,transitions:function(t){var e=["transitionProperty","WebkitTransition","MozTransition","OTransition","msTransition"];for(var o in e)if(void 0!==t.style[e[o]])return!0;return!1}(document.createElement("swipe"))};if(t){var P,y,w,v,m=t.children[0];e=e||{};var _=parseInt(e.startSlide,10)||0,g=e.speed||300;e.continuous=void 0!==e.continuous?e.continuous:!0;var x,S,b=e.auto||0,k={},A={},L={handleEvent:function(t){switch(t.type){case"touchstart":this.start(t);break;case"touchmove":this.move(t);break;case"touchend":p(this.end(t));break;case"webkitTransitionEnd":case"msTransitionEnd":case"oTransitionEnd":case"otransitionend":case"transitionend":p(this.transitionEnd(t));break;case"resize":p(o)}e.stopPropagation&&t.stopPropagation()},start:function(t){var e=t.touches[0];k={x:e.pageX,y:e.pageY,time:+new Date},S=void 0,A={},m.addEventListener("touchmove",this,!1),m.addEventListener("touchend",this,!1)},move:function(t){if(!(t.touches.length>1||t.scale&&1!==t.scale)){e.disableScroll&&t.preventDefault();var o=t.touches[0];A={x:o.pageX-k.x,y:o.pageY-k.y},void 0===S&&(S=!(!S&&Math.abs(A.x)>=Math.abs(A.y))),S||(t.preventDefault(),d(),e.continuous?(s(r(_-1),A.x+y[r(_-1)],0),s(_,A.x+y[_],0),s(r(_+1),A.x+y[r(_+1)],0)):(A.x=A.x/(!_&&A.x>0||_==P.length-1&&A.x<0?Math.abs(A.x)/w+1:1),s(_-1,A.x+y[_-1],0),s(_,A.x+y[_],0),s(_+1,A.x+y[_+1],0)))}},end:function(){var t=+new Date-k.time,o=250>+t&&Math.abs(A.x)>20||Math.abs(A.x)>w/2,i=!_&&A.x>0||_==P.length-1&&A.x<0;e.continuous&&(i=!1);var n=A.x<0;S||(o&&!i?(n?(e.continuous?(a(r(_-1),-w,0),a(r(_+2),w,0)):a(_-1,-w,0),a(_,y[_]-w,g),a(r(_+1),y[r(_+1)]-w,g),_=r(_+1)):(e.continuous?(a(r(_+1),w,0),a(r(_-2),-w,0)):a(_+1,w,0),a(_,y[_]+w,g),a(r(_-1),y[r(_-1)]+w,g),_=r(_-1)),e.callback&&e.callback(_,P[_])):e.continuous?(a(r(_-1),-w,g),a(_,0,g),a(r(_+1),w,g)):(a(_-1,-w,g),a(_,0,g),a(_+1,w,g))),m.removeEventListener("touchmove",L,!1),m.removeEventListener("touchend",L,!1)},transitionEnd:function(t){parseInt(t.target.getAttribute("data-index"),10)==_&&(b&&l(),e.transitionEnd&&e.transitionEnd.call(t,_,P[_]))}};return o(),b&&l(),f.addEventListener?(f.touch&&m.addEventListener("touchstart",L,!1),f.transitions&&(m.addEventListener("webkitTransitionEnd",L,!1),m.addEventListener("msTransitionEnd",L,!1),m.addEventListener("oTransitionEnd",L,!1),m.addEventListener("otransitionend",L,!1),m.addEventListener("transitionend",L,!1)),window.addEventListener("resize",L,!1)):window.onresize=function(){o()},{setup:function(){o()},slide:function(t,e){d(),h(t,e)},prev:function(){d(),i()},next:function(){d(),n()},stop:function(){d()},getPos:function(){return _},getNumSlides:function(){return v},kill:function(){d(),m.style.width="",m.style.left="";for(var t=P.length;t--;){var e=P[t];e.style.width="",e.style.left="",f.transitions&&s(t,0,0)}f.addEventListener?(m.removeEventListener("touchstart",L,!1),m.removeEventListener("webkitTransitionEnd",L,!1),m.removeEventListener("msTransitionEnd",L,!1),m.removeEventListener("oTransitionEnd",L,!1),m.removeEventListener("otransitionend",L,!1),m.removeEventListener("transitionend",L,!1),window.removeEventListener("resize",L,!1)):window.onresize=null}}}};
cG.REPO.stage.default.controls = function(holder){
    var controlops = ["frst","left","rght","last","rand"];
    var slideops = ["slide(0, 400)","prev()","next()","slide(39,400)","slide(Math.floor(Math.random() * 39),400)"];
    for (var i=0; i<controlops.length; i++) {
        holder[controlops[i]] = function(){holder[slideops[i]]};
    }
    holder["indx"] = function(val){
        holder.slide(Math.max(0, Math.min(val, 39)),400);
    };
};
cG.REPO.stage.default.scenography = document.createElement("style");
/*cG.REPO.stage.default.scenography.setAttribute("media", "screen");*/
cG.REPO.stage.default.scenography.setAttribute("id", "scenography");
cG.REPO.stage.default.scenography.appendChild(document.createTextNode('article,aside,b,body,dd,del,dfn,div,dl,dt,em,fieldset,footer,form,h1,h2,h3,h4,h5,h6,header,html,i,iframe,img,ins,kbd,label,li,nav,object,ol,p,q,samp,section,small,span,strong,table,tbody,td,tfoot,th,thead,tr,ul{margin:0;padding:0;border:0;outline:0;font-size:100%;vertical-align:baseline;background:0 0}body{-webkit-text-size-adjust:none;font-family:sans-serif;min-height:416px}h1{font-size:33px;margin:50px 0 15px;text-align:center;color:#212121}h2{font-size:14px;font-weight:700;color:#3c3c3c;margin:20px 10px 10px}small{margin:0 10px 30px;display:block;font-size:12px}a{margin:0 0 0 10px;font-size:12px;color:#3c3c3c}body,html{background:#f3f3f3}#console{font-size:12px;font-family:Inconsolata,Monaco,Consolas,"Andale Mono","Bitstream Vera Sans Mono","Courier New",Courier,monospace;color:#999;line-height:18px;margin-top:20px;max-height:150px;overflow:auto}#mySwipe div b{display:block;font-weight:700;color:#14ADE5;font-size:20px;text-align:center;margin:10px;padding:100px 10px;box-shadow:0 1px #EBEBEB;background:#fff;border-radius:3px;border:1px solid;border-color:#E5E5E5 #D3D3D3 #B9C1C6}.swipe{overflow:hidden;visibility:hidden;position:relative}.swipe-wrap{overflow:hidden;position:relative}.swipe-wrap>div{float:left;width:100%;position:relative}'));

if(void 0===cG.REPO.actor) cG.REPO.actor = {default: ""};
if(void 0===cG.REPO.decor) cG.REPO.decor = {default: ""};
if(void 0===cG.REPO.script) cG.REPO.script = {default: ""};
/*SHORTCUTS*/
cG.agent = cG.REPO.agent.default;
cG.director = cG.REPO.director.default;
cG.producer = cG.REPO.producer.default;
cG.actor = cG.REPO.actor.default;
cG.decor = cG.REPO.decor.default;
cG.script = cG.REPO.script.default;
cG.stage = cG.REPO.stage.default;
document.head.appendChild(cG.stage.scenography);/*Add the <style> element to the page*/
/*END comix-ngn properties*/

/*AJAX Calls*/
/*debugging: ensures cG is correctly instaniated*//*console.log(cG);*/
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
for (i = 0; i < srcs.length; i++) { 
    cG.root=src[i].getAttribute("plugin");
    if(cG.root!="") break;
}
if(cG.root=="") cG.root="default";
if(typeof getScript === 'undefined'){/*create script.json promise if not already created*/
    var getScript = cG.agent(dir+'script.json');
    getScript.then(
    function(data, xhr) {
        cG.script = cG.REPO.script.default = data;
    },
    function(data, xhr) {
        console.error(data, xhr.status);
        cG.script = cG.REPO.script.default = 0;
    });
}
if(typeof getStage === 'undefined'){
    var getStage = cG.agent(tir+'stage.html');
    getStage.then(
    function(data, xhr) {
        cG.stage.body = cG.REPO.stage.default.body = data;
    },
    function(data, xhr) {
        console.error(data, xhr.status);
        cG.stage.body = cG.REPO.stage.default.body = 0;
    });
}
if(typeof getDecor === 'undefined'){
    var getDecor = cG.agent(tir+'costumes.html');
    getDecor.then(
    function(data, xhr) {
        cG.decor = cG.REPO.decor.default = data;
    },
    function(data, xhr) {
        console.error(data, xhr.status);
        cG.decor = cG.REPO.decor.default = 0;
    });
}
if(typeof getActor === 'undefined'){
    var getActor = cG.agent(tir+'actor.html');
    getActor.then(
    function(data, xhr) {
        cG.actor = cG.REPO.actor.default = data;
    },
    function(data, xhr) {
        console.error(data, xhr.status);
        cG.actor = cG.REPO.actor.default = 0;
    });
}
/*END AJAX calls*/
/*STAGE creation*/
function jstagecreate(){
    if(cG.script == '' || cG.actor == '' || cG.stage.body == '') { //if are stuff isn't yet we are going to wait for it
        setTimeout(jstagecreate, 300); 
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
    window.mySwipe = new cG.stage.function(document.getElementById('stage'), {
        startSlide: 0,
        speed: 400,
        auto: 3000,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        callback: function(index, elem) {},
        transitionEnd: function(index, elem) {}
    });
    cG.stage.controls(window.mySwipe);
};

function stageInjection(){
    if(cG.script == '' || cG.actor == '' || cG.stage.body == '' || cG.decor == '') {
        /*if are stuff isn't ready yet we are going to wait for it*/
        setTimeout(stageInjection, 300); 
        return;
    }
    if(!cG.script) return console.error("No script.JSON found. script.JSON is REQUIRED to create stage. Please create a script.JSON or move it to the directory specified in the script tag for comix-ngn or bellerophon if it is added.");
    var idealStage = (cG.stage.body)?cG.stage.body:'<p class="controls"></p><div id="stage" class="swipe"><div id="target" class="swipe-wrap"></div></div>';
    var idealStar = (cG.actor)?cG.actor:'<div><h1></h1><p><img id="ig" isrc src title alt btog></p></div>';
    var idealCostumes = (cG.decor)?cG.decor:'<div id="location"></div><div id="archive">Archive</div><div id="me">About Me</div>';
    var stages = document.getElementsByClassName("venue");/*get all entry points*/
    //console.log(stages);
    
    var id_attr = "";
    var script_attr = "";
    var use_attr = "";
    
    var result;
    var myScript;
    var subclone;
    var clone;
    var links;
    var target = '';
    var myStage = {};
    for (i = 0; i < stages.length; i++) {
        /*initial setup*/
        /*get attributes */
        id_attr = stages[i].getAttribute("id");
        script_attr = stages[i].getAttribute("script");
        use_attr = stages[i].getAttribute("use");
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
                myScript = cG.script.extras[parseInt(script_attr,10)];/*search for that ID in the script*/
                if(void 0===myScript) myScript = cG.script;/*if not found use default*/
                else if(void 0!==myScript.link){/*if the found script is a reference, load it*/
                    myScript = syncJSON(myScript.link);
                    if(!myScript) myScript = cG.script;/*if not found use default*/
                }
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
        /*END initial set up*/
        /*index.html(venue)<-costumes.html(location)<-stage.html(target)<-actor.html*/
        clone = stages[i].cloneNode(false);
        //console.log(clone);
        links = FEbyIdAI(clone,["venue","location","target"],[idealCostumes,idealStage],id_attr);
        //console.log(links);
        for (t = 0; t < links.length; t++) {
            if(links[t].getAttribute("id")=="target"){
                target = links[t];
                break;
            }
        }
        if(!target) console.error("target fallback not implemented");
        renameEles(false,clone,id_attr);
        //console.log(clone);
        /*append the slides*/
        console.log(cG.script);
        target.innerHTML=idealStar;
        subclone=target.children[0].cloneNode(true);
        renameEles(true,subclone,id_attr,"0");
        
        for (f = 0; f < cG.script.pages.length; f++) {
            target.innerHTML+=idealStar;
            //console.log(target);
            console.log(cG.script.pages[f].url);
        }
        
    } //console.log("TEST",idealStage,idealStar,idealCostumes,stages,clone,id_attr,script_attr,use_attr,result,myScript,myStage);
};
/*end STAGE creation*/

domReady(function(){
    /*everything else occurs here*/
    if(!document.getElementById("$COMICNGWRITER$$$")){if(void 0===$GPC){$GPC=0;}/*prints version information*/ console.log("%c %c %c comix-ngn  v"+ cG.info.vers_ix.version() +" %c \u262F %c \u00A9 2015 Oluwaseun Ogedengbe %c Plugins: "+$GPC, "color:white; background:#2EB531", "background:purple","color:white; background:#32E237", 'color:red; background:black', "color:white; background:#2EB531", "color:white; background:purple");}
    console.log(JSON.stringify(cG, null, 2) );
    jstagecreate();
    //stageInjection();
});

/*/////////////////////////////////////////////////
HELPER FUNCTIONS*/
function FEbyIdAI(source,ids,inner){
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
    //console.log(q);
    if(q){
        source.innerHTML = inner[q-1];
        ret.push(source);
    }
    //console.log(ret)
    //if(source.innerHTML=='') ret.push(source.innerHTML);
    //console.log("called",q,source.children.length);
    for(a=0;a<source.children.length;a++){
        ret = ret.concat(FEbyIdAI(source.children[a],ids,inner,name));
    }
    //console.log(q,ret,source);
    return ret;
}
function renameEles(bool,source,prepend,append){
    for(var x=0;x<source.children.length;x++) renameEles(true,source.children[x],prepend,append);
    if(bool) {
        var pre = (void 0===prepend)?'':prepend+"_";
        var app = (void 0===append)?'':"_"+append;
        source.setAttribute("id",pre+source.getAttribute("id")+app);
    }
}