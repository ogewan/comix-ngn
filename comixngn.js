/** @preserve comix-ngn v1.9.3 | (c) 2015 Oluwaseun Ogedengbe| seun40.github.io/comic-ng/ |License: MIT|
embeds domReady: github.com/ded/domready (MIT) (c) 2013 Dustin Diaz, pegasus: typicode.github.io/pegasus (MIT) (c) 2014 typicode, pathjs (MIT) (c) 2011 Mike Trpcic, direction.js*/

var cG = cG||{};/*if(void 0===cG) var cG = {};*//*check if cG is already is instantiated*/
/*comix-ngn default properties*/
/*IMMUTABLE*/
/*version settings*/
function N(){return 0};/*null function*/
if(void 0===$GPC){var $GPC=0;}
cG.root = '';
cG.cPanel = cG.cPanel||{};
cG.info = {vix: "1.9.3",vwr: "1.2.0",vpr: "0.1.0"};
/*rollbar*/
var _rollbarConfig = _rollbarConfig||{
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
    !function(r){function o(e){if(t[e])return t[e].exports;var n=t[e]={exports:{},id:e,loaded:!1};return r[e].call(n.exports,n,n.exports,o),n.loaded=!0,n.exports}var t={};return o.m=r,o.c=t,o.p="",o(0)}([function(r,o,t){"use strict";var e=t(1).Rollbar,n=t(2),i="https://d37gvrvc0wt4s1.cloudfront.net/js/v1.3/rollbar.umd.min.js";_rollbarConfig.rollbarJsUrl=_rollbarConfig.rollbarJsUrl||i;var a=e.init(window,_rollbarConfig),l=n(a,_rollbarConfig);a.loadFull(window,document,!1,_rollbarConfig,l)},function(r,o,t){"use strict";function e(r){this.shimId=++s,this.notifier=null,this.parentShim=r,this.logger=function(){},window.console&&void 0===window.console.shimId&&(this.logger=window.console.log)}function n(r,o,t){window._rollbarWrappedError&&(t[4]||(t[4]=window._rollbarWrappedError),t[5]||(t[5]=window._rollbarWrappedError._rollbarContext),window._rollbarWrappedError=null),r.uncaughtError.apply(r,t),o&&o.apply(window,t)}function i(r){var o=e;return l(function(){if(this.notifier)return this.notifier[r].apply(this.notifier,arguments);var t=this,e="scope"===r;e&&(t=new o(this));var n=Array.prototype.slice.call(arguments,0),i={shim:t,method:r,args:n,ts:new Date};return window._rollbarShimQueue.push(i),e?t:void 0})}function a(r,o){if(o.hasOwnProperty&&o.hasOwnProperty("addEventListener")){var t=o.addEventListener;o.addEventListener=function(o,e,n){t.call(this,o,r.wrap(e),n)};var e=o.removeEventListener;o.removeEventListener=function(r,o,t){e.call(this,r,o&&o._wrapped?o._wrapped:o,t)}}}function l(r,o){return o=o||window.console.log||function(){},function(){try{return r.apply(this,arguments)}catch(t){o("Rollbar internal error:",t)}}}var s=0;e.init=function(r,o){var t=o.globalAlias||"Rollbar";if("object"==typeof r[t])return r[t];r._rollbarShimQueue=[],r._rollbarWrappedError=null,o=o||{};var i=new e;return l(function(){if(i.configure(o),o.captureUncaught){var e=r.onerror;r.onerror=function(){var r=Array.prototype.slice.call(arguments,0);n(i,e,r)};var l,s,u="EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");for(l=0;l<u.length;++l)s=u[l],r[s]&&r[s].prototype&&a(i,r[s].prototype)}return r[t]=i,i},i.logger)()},e.prototype.loadFull=function(r,o,t,e,n){var i=l(function(){var r=o.createElement("script"),n=o.getElementsByTagName("script")[0];r.src=e.rollbarJsUrl,r.async=!t,r.onload=a,n.parentNode.insertBefore(r,n)},this.logger),a=l(function(){var o;if(void 0===r._rollbarPayloadQueue){var t,e,i,a;for(o=new Error("rollbar.js did not load");t=r._rollbarShimQueue.shift();)for(i=t.args,a=0;a<i.length;++a)if(e=i[a],"function"==typeof e){e(o);break}}"function"==typeof n&&n(o)},this.logger);l(function(){t?i():r.addEventListener?r.addEventListener("load",i,!1):r.attachEvent("onload",i)},this.logger)()},e.prototype.wrap=function(r,o){try{var t;if(t="function"==typeof o?o:function(){return o||{}},"function"!=typeof r)return r;if(r._isWrap)return r;if(!r._wrapped){r._wrapped=function(){try{return r.apply(this,arguments)}catch(o){throw o._rollbarContext=t()||{},o._rollbarContext._wrappedSource=r.toString(),window._rollbarWrappedError=o,o}},r._wrapped._isWrap=!0;for(var e in r)r.hasOwnProperty(e)&&(r._wrapped[e]=r[e])}return r._wrapped}catch(n){return r}};for(var u="log,debug,info,warn,warning,error,critical,global,configure,scope,uncaughtError".split(","),p=0;p<u.length;++p)e.prototype[u[p]]=i(u[p]);r.exports={Rollbar:e,_rollbarWindowOnError:n}},function(r,o,t){"use strict";r.exports=function(r,o){return function(t){if(!t&&!window._rollbarInitialized){var e=window.RollbarNotifier,n=o||{},i=n.globalAlias||"Rollbar",a=window.Rollbar.init(n,r);a._processShimQueue(window._rollbarShimQueue||[]),window[i]=a,window._rollbarInitialized=!0,e.processPayloads()}}}}]);/*end rollbar*/
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
cG.REPO = cG.REPO||{};
/*var q = ["agent","director","stage","scenography","producer","actor","decor","stage"];
for (p in q) {
    if(void 0===cG.REPO[q[p]]) cG.REPO[q[p]] = {};
}
q = void 0;*/
/*Set repo defaults - ASSUMES defaults aren't set, will overwrite them*/
cG.REPO.agent = {def:/*pegasus.js*/function(t,e){return e=new XMLHttpRequest,e.open("GET",t),t=[],e.onreadystatechange=e.then=function(n,o,i){if(n&&n.call&&(t=[,n,o]),4==e.readyState&&(i=t[0|e.status/200]))try{i(JSON.parse(e.responseText),e)}catch(r){i(e.responseText,e)}},e.send(),e}};

cG.REPO.director = {"def":Path};

cG.REPO.producer = {"def":N};

///////
cG.REPO.stage = {"def":{id:"def",construct:function(name,scriptt,anchor,options){
    var direction=function(c,k,v){var h={parent:null,offset:0,loading:{lines:16,rate:1E3/30,diameter:250,xpos:.5,ypos:.5,back:"#FFF",color:"#373737"},config:{dir:"assets/",pagestartnum:!1,chapterstartnum:!1,imgprebuffer:5,imgpostbuffer:5,startpage:0,back:"#FFF"},pages:[]};if(void 0===c)return-1;if("string"===typeof c)h.pages.push({alt:"",hover:"",title:"",url:[c],release:0,note:"",perm:!1,anim8:!1}),c=h;else if(Array.isArray(c)){for(var b=0;b<c.length;b++)if(h.pages.push({alt:"",hover:"",title:"",url:[],
release:0,note:"",perm:!1,anim8:!1}),Array.isArray(c[b]))for(var w=0;w<c[b].length;w++)h.pages[b].url.push(c[b][w]);else h.pages[b].url.push(c[b]);c=h}else if(void 0===c.pages[0].url)return-1;if(void 0===k||null==k)k=0;var f=c.pages,l=c.pages.length,x=!0,m=-1,n=c.loading,p=c.config,r=[],t=[],g=new Image,y=!0,e=[document.createElement("canvas"),document.createElement("canvas")],z=e[1].getContext("2d"),A=b=function(){return 0},u=b,B=b,D={context:e[0].getContext("2d"),color:n.color,start:Date.now(),
lines:n.lines,diameter:n.diameter,cheight:e[1].height,rate:n.rate},E=function(a){e[0].style.paddingLeft=(e[1].width-300)/2+"px";var b=Math.floor((Date.now()-a.start)/1E3*a.lines)/a.lines,d=a.color.substr(1);a.context.save();a.context.clearRect(0,0,300,d.height/2);a.context.translate(150,d.height/2);a.context.rotate(2*Math.PI*b);3==d.length&&(d=d[0]+C[0]+d[1]+d[1]+d[2]+d[2]);for(var b=parseInt(d.substr(0,2),16).toString(),c=parseInt(d.substr(2,2),16).toString(),d=parseInt(d.substr(4,2),16).toString(),
f=0;f<a.lines;f++)a.context.beginPath(),a.context.rotate(2*Math.PI/a.lines),a.context.moveTo(a.diameter/10,0),a.context.lineTo(a.diameter/4,0),a.context.lineWidth=a.diameter/30,a.context.strokeStyle="rgba("+b+","+c+","+d+","+f/a.lines+")",a.context.stroke();a.context.restore();x&&window.setTimeout(E,a.rate,D)},F=function(a,b){if(null===a||void 0===a)a={x:0,y:0};else if(isNaN(a)){if(null===a.y||void 0===a.y)a.y=0;if(null===a.x||void 0===a.x)a.x=0}else a={x:0,y:a};if(null===b||void 0===b)b=400;0>a.y&&
(a.y=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight);0>a.x&&(a.x=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth);var d={x:void 0!==window.pageXOffset?a.x-window.pageXOffset:a.x-document.documentElement.scrollLeft,y:void 0!==window.pageYOffset?a.y-window.pageYOffset:a.y-document.documentElement.scrollTop};if(d=={x:0,y:0})return d;var e=function(a,b,d){window.scrollBy(Math.floor(a.x)/b,Math.floor(a.y)/b);d+1<5*b&&window.setTimeout(e,
5,a,b,d+1)};window.setTimeout(e,5,d,Math.floor(b/5),0);return d},h=function(){f[this.imaginaryID].loaded=!0},q=function(a,b){x=!0;window.setTimeout(E,n.rate,D);A();f[b].loaded||z.clearRect(0,0,e[1].width,e[1].height);a.imaginaryID=b;a.src=p.dir+f[b].url[0];for(var d=0,c=b-1;c>b-p.imgprebuffer-1&&0<=c;c--)f[c].loaded||(t[d].imaginaryID=c,t[d].src=p.dir+f[c].url,d++);d=0;for(c=b+1;c<p.imgpostbuffer+b+1&&c<l;c++)f[c].loaded||(r[d].imaginaryID=c,r[d].src=p.dir+f[c].url,d++)};this.count=function(){return l};
this.current=function(){return m};this.callback=function(a,b){if(null===a||void 0===a)return u;if(null===b||void 0===b)return a?0<a?A:B:u;a?0<a?A=b:B=b:u=b;return 1};this.go=function(a){a=null===a||void 0===a?0:parseInt(a,10);a=isNaN(a)?0:a;q(g,Math.floor(Math.max(0,Math.min(l-1,a))));return a};this.prev=function(){var a=m-1;0<=a&&q(g,a);return a};this.next=function(){var a=m+1;a<l&&q(g,a);return a};this.frst=function(){0<=m&&q(g,0);return 0};this.last=function(){q(g,l-1);return l-1};this.rand=function(){var a=
Math.floor(Math.random()*(l-1));q(g,a);return a};this.data=function(a){a=null===a||void 0===a?m:parseInt(a,10);return isNaN(a)?f[m]:f[a]};this.scroll=function(a){return null===a||void 0===a?y:y=a};this.scrollTo=function(a,b){return F(a,b)};e[0].height=480;e[0].style.background=n.back;e[0].style.paddingLeft="170px";e[0].style.zIndex=0;e[0].style.position="absolute";k?k.appendChild(e[0]):document.body.appendChild(e[0]);window.setTimeout(E,n.rate,D);g=new Image;g.imaginaryID=-1;g.addEventListener("load",
function(){f[this.imaginaryID].loaded?z.clearRect(0,0,this.width,this.height):f[this.imaginaryID].loaded=!0;u();e[1].width=this.width;e[1].height=e[0].height=this.height;z.drawImage(this,0,0);m=this.imaginaryID;x=0;y&&F();B()},!1);for(b=0;b<f.length;b++)f[b].desig=b?b==f.length-1?1:0:-1,f[b].loaded=!1;for(b=0;b<c.config.imgprebuffer;b++)t.push(new Image),t[b].imaginaryID=-1,t[b].addEventListener("load",h,!1);for(b=0;b<c.config.imgpostbuffer;b++)r.push(new Image),r[b].imaginaryID=-1,r[b].addEventListener("load",
h,!1);q(g,void 0===v||null===v?p.startpage:v);e[1].height=480;e[1].width=640;e[1].background=p.back;e[1].style.zIndex=1;e[1].style.position="relative";k?k.appendChild(e[1]):document.body.appendChild(e[1])};

    /**/
    this.main = new direction(scriptt,anchor);
    this.name = name;
    this.type = "def";
}}};
///////
cG.REPO.scReq = cG.REPO.scReq||{};
cG.REPO.actor = cG.REPO.actor||{def: ""};
cG.REPO.decor = cG.REPO.decor||{def: ""};
cG.REPO.script = cG.REPO.script||{def: ""};
/*SHORTCUTS*/
cG.agent = cG.REPO.agent.def;
cG.director = cG.REPO.director.def;
cG.producer = cG.REPO.producer.def;
cG.actor = cG.REPO.actor.def;
cG.decor = cG.REPO.decor.def;
cG.script = cG.REPO.script.def;
cG.stage = cG.REPO.stage.def;
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
if(void 0===cG.REPO.scReq.getScript){/*create script.json promise if not already created*/
    cG.REPO.scReq.getScript = cG.agent(dir+'script.json');
    cG.REPO.scReq.getScript.then(
        function(data, xhr) {
            cG.script = cG.REPO.script.def = data;
        },
        function(data, xhr) {
            console.error(data, xhr.status);
        cG.script = cG.REPO.script.def = 0;
    });
}
if(void 0===cG.REPO.scReq.getDecor){
    cG.REPO.scReq.getDecor = cG.agent(tir+'decor.html');
    cG.REPO.scReq.getDecor.then(
    function(data, xhr) {
        cG.decor = cG.REPO.decor.def = data;
    },
    function(data, xhr) {
        console.error(data, xhr.status);
        cG.decor = cG.REPO.decor.def = 0;
    });
}
/*END AJAX calls*/
/*STAGE creation-REDACTED*/
cG.HELPERS.jstagecreate = N;
cG.stageInjection = function(SPECIFIC){
    if(cG.script === '' || cG.decor === '') {//although we don't need decor, if there is a template, we prioritize it
        /*if are stuff isn't ready yet we are going to wait for it*/
        setTimeout(cG.stageInjection, 300,SPECIFIC); 
        return cG.cPanel;
    }
    if(!cG.script) return console.error("No script.JSON found. script.JSON is REQUIRED to create any stage. Please create a script.JSON or move it to the directory specified in the script tag for comix-ngn or bellerophon if it is added.");
    var stages = [],
        errr = "stageInjection can only operate on elements or arrays of elements";
    if(void 0 === SPECIFIC) stages = document.getElementsByClassName("venue");/*get all entry points*/
    else if(Array.isArray(SPECIFIC)){
        if(SPECIFIC.length>0) if(void 0 ===SPECIFIC[0].nodeName) return console.error(errr);
            else return console.error(errr);
        stages = stages.concat(SPECIFIC);
    } else{
        if(void 0 === SPECIFIC.nodeName) return console.error(errr);
        stages.push(SPECIFIC);/*if not array and not undefined, assume it is a Element*/
    }
    var final_res = cG.cPanel,
        decor = (cG.decor)?cG.decor:'<div id="location"></div><div id="archive">Archive</div><div id="me">About Me</div>',
        reqQueue = [],
        request = function(iD,source){//,srcScript,srcScriptReq){            
            /*initial setup*/
            /*////get attributes */
            /*////////async request the script if it is specified, else use default*/
            var myScript;
            if(source===null||source===void 0){
                var script_attr = stages[iD].getAttribute("script");
                if(script_attr==""||script_attr=="script.json"||void 0===script_attr||script_attr===null){/*if no script, use the default*/
                    myScript = cG.script;
                } else {
                    reqQueue.push(cG.agent(script_attr).then(
                        function(data, xhr) {
                            request(iD,data);
                        },
                        function(data, xhr) {
                            console.error(data, xhr.status);
                            request(iD,"");
                        }));
                    return 0;//stop execution
                }
            } else if(source=="") myScript=cG.script;
            else myScript=source;
            /*////////get the rest of the attributes*/
            var id_attr = stages[iD].getAttribute("id"),
                use_attr = stages[iD].getAttribute("use"),
                config_attr = stages[iD].getAttribute("config");
            /*////attribute processing */
            if(id_attr==""||void 0===id_attr||id_attr===null){/*if no ID, make one*/
                var name = "STG"+iD;
                var j = 1;
                while(document.getElementById(name)) name = "STG"+(iD+j++);
                id_attr = name.toString();
                stages[iD].setAttribute("id", id_attr);
            }
            if(use_attr==""||void 0===use_attr||use_attr===null) use_attr="def";/*if no use specified, use current*/
            if(config_attr!=""){
                try {
                    config_attr=JSON.parse(config_attr);
                }
                catch(err) {
                    console.debug("The following configuration settings are malformed for plugin["+use_attr+"]: ",config_attr,"\nIt has been ignored");
                    config_attr={};
                }
            } else config_attr={};
            /*END initial set up*/
            stages[iD].innerHTML = decor;
            cG.HELPERS.renameEles(false,stages[iD],id_attr);
            var anchorto = document.getElementById(id_attr+"_location");
            if(anchorto===void 0||anchorto===null) anchorto = stages[iD];
            else {//we only use the helpers if anchorto is actually correctly set
                cG.HELPERS.smartAttrib(stages[iD],{
                    div: {
                        style:"display: none;"
                    }
                },1);
            }
            anchorto.style.display = "block";
            //console.log(anchorto,anchorto.style)
            final_res[use_attr+"_"+iD] = new cG.stage.construct(id_attr,myScript,
                                                                anchorto,config_attr);
        };
    for (var i = 0; i < stages.length; i++) request(i);
    return final_res;
};
/*end STAGE creation*/
/*ROUTING*/
Path.map("#/:page").to(function(){
    cG.stage.controls(window[document.getElementsByClassName("venue")[0].getAttribute("id")],{value:this.params['page']});
});
/*end routing*/
/*/////////////////////////////////////////////////
HELPER FUNCTIONS*/
cG.HELPERS.smartAttrib = function(source,mapper,ignore){
    var base;
    var ig = parseInt(ignore);
    ig = (isNaN(ig))?0:ig;
    var srch = mapper[source.nodeName.toLowerCase()];
    if(void 0 !== srch&&ig<=0){
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
    } else ig--;
    for(var x=0;x<source.children.length;x++) cG.HELPERS.smartAttrib(source.children[x],mapper,ig);
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
        if(source.className!="") source.className = " "+pre+source.className; 
    }
}
/* setup complete
/////////////////////////////////////////////////*/
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
        cG.cPanel=cG.stageInjection();
        console.log(cG.cPanel);
    }
});