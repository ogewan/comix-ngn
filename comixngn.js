/** @preserve comix-ngn v1.2.1 | (c) 2015 Oluwaseun Ogedengbe| ogewan.github.io/comix-ngn/ |License: MIT|
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
    var deft = {fstrun: true, pgepsh: true, pgesve: true, rtepge: true, protect: true, noverwrite: true, arrow: true, addme: true};
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
* arrow - toggles arrow key navigation */
cG.info = {vix: "1.2.1",vwr: "1.0.0",vpr: "0.1.0"};/*version settings*/
cG.dis = cG.dis||{};//disables statistic and error reporting
cG.recyclebin = cG.recyclebin||{};//variables that are used in initialization, disposed at stage injection
cG.queue = cG.queue||{};//stores functions that are called incertain events
cG.comicID = cG.comicID||window.location.host;//unique comic ID, defaults to host
cG.prePage = cG.prePage||-1;//page given to the engine before initialization finishes, navigates if 0 or higher
cG.controllers = cG.controllers||{};//stores all nav bars that control stages here
//self executable function (SEF): retrieve additional parameters from script tag
!function(){
    //get all scripts
    var selfScript = document.getElementsByTagName("SCRIPT"),
        pass=0;//checks if search is succesful
    //if no scripts can be found ATM, simply quit
    if(void 0!==selfScript||selfScript!==null){
        //iterate over all scripts till you find this one, (comixngn.min) matches as well
        for(var q = 0;q<selfScript.length;q++){
            if(selfScript[q].src.indexOf("comixngn")>=0){//found one
                selfScript = selfScript[q];
                pass=1;
                break;
            }
        }
        if(!pass) return -1;//return if not found
        //check for comicID, no getAttribute if we have cG.comicID
        cG.comicID = cG.comicID||selfScript.getAttribute("comicID");
        //change default plugin
        if(selfScript.getAttribute("plugin") !== void 0&&selfScript.getAttribute("plugin")!==null){
            var plugin = selfScript.getAttribute("plugin").replace(/\s+/g, '').split(',');
            cG.root = plugin;
            /*mutliplugin priority not implemented*/
            /*for(var w = 0;w<disables.length;w++){
                if(disables[w]==""||disables[w]===void 0||disables[w]==" ") continue;
                cG.dis[disables[w]]=true;
            }*/
        }
        if(selfScript.getAttribute("disable") !== void 0&&selfScript.getAttribute("disable")!==null){
            var disables = selfScript.getAttribute("disable").replace(/\s+/g, '').split(',');
            for(var w = 0;w<disables.length;w++){
                if(disables[w]==""||disables[w]===void 0||disables[w]==" ") continue;
                cG.dis[disables[w]]=true;
            }
        }
        if(selfScript.getAttribute("VERSION") !== void 0&&selfScript.getAttribute("VERSION")!==null){
            cG.info.vix=selfScript.getAttribute("VERSION");//version override
        }
        if(selfScript.getAttribute("air") !== void 0&&selfScript.getAttribute("air")!==null){
            cG.recyclebin.air=selfScript.getAttribute("air");//asset path override
        }
        if(selfScript.getAttribute("fBox") !== void 0&&selfScript.getAttribute("fBox")!==null){
            cG.fBox = JSON.parse(selfScript.getAttribute("fBox"));//asset path override
        }
    }
}()

cG.avx = cG.avx||cG.info.vix.split(".");
//if(cG.avx[0]>1&&cG.avx[1]>0){}
cG.info.vrb = 1;
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
if(cG.dis.rollbar!=true){
    /*rollbar*/
    var _rollbarConfig = _rollbarConfig||{
        accessToken: "3e8e8ecb63a04b5798e1d02adf2608cb",
        ignoredMessages: ["CNG Plug-in:","status:"],
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
!function(r){function t(o){if(e[o])return e[o].exports;var n=e[o]={exports:{},id:o,loaded:!1};return r[o].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var e={};return t.m=r,t.c=e,t.p="",t(0)}([function(r,t,e){"use strict";var o=e(1).Rollbar,n=e(2),a="https://d37gvrvc0wt4s1.cloudfront.net/js/v1.4/rollbar.min.js";_rollbarConfig.rollbarJsUrl=_rollbarConfig.rollbarJsUrl||a;var i=o.init(window,_rollbarConfig),l=n(i,_rollbarConfig);i.loadFull(window,document,!1,_rollbarConfig,l)},function(r,t){"use strict";function e(){var r=window.console;r&&"function"==typeof r.log&&r.log.apply(r,arguments)}function o(r){this.shimId=++u,this.notifier=null,this.parentShim=r,this.logger=e,this._rollbarOldOnError=null}function n(r,t,e){window._rollbarWrappedError&&(e[4]||(e[4]=window._rollbarWrappedError),e[5]||(e[5]=window._rollbarWrappedError._rollbarContext),window._rollbarWrappedError=null),r.uncaughtError.apply(r,e),t&&t.apply(window,e)}function a(r){var t=o;return l(function(){if(this.notifier)return this.notifier[r].apply(this.notifier,arguments);var e=this,o="scope"===r;o&&(e=new t(this));var n=Array.prototype.slice.call(arguments,0),a={shim:e,method:r,args:n,ts:new Date};return window._rollbarShimQueue.push(a),o?e:void 0})}function i(r,t){if(t.hasOwnProperty&&t.hasOwnProperty("addEventListener")){var e=t.addEventListener;t.addEventListener=function(t,o,n){e.call(this,t,r.wrap(o),n)};var o=t.removeEventListener;t.removeEventListener=function(r,t,e){o.call(this,r,t&&t._wrapped?t._wrapped:t,e)}}}function l(r,t){return t=t||e,function(){try{return r.apply(this,arguments)}catch(e){t("Rollbar internal error:",e)}}}var u=0;o.init=function(r,t){var e=t.globalAlias||"Rollbar";if("object"==typeof r[e])return r[e];r._rollbarShimQueue=[],r._rollbarWrappedError=null,t=t||{};var a=new o;return l(function(){if(a.configure(t),t.captureUncaught){a._rollbarOldOnError=r.onerror,r.onerror=function(){var r=Array.prototype.slice.call(arguments,0);n(a,a._rollbarOldOnError,r)};var o,l,u="EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");for(o=0;o<u.length;++o)l=u[o],r[l]&&r[l].prototype&&i(a,r[l].prototype)}return r[e]=a,a},a.logger)()},o.prototype.loadFull=function(r,t,e,o,n){var a=l(function(){var r=t.createElement("script"),n=t.getElementsByTagName("script")[0];r.src=o.rollbarJsUrl,r.async=!e,r.onload=i,n.parentNode.insertBefore(r,n)},this.logger),i=l(function(){var t;if(void 0===r._rollbarPayloadQueue){var e,o,a,i;for(t=new Error("rollbar.js did not load");e=r._rollbarShimQueue.shift();)for(a=e.args,i=0;i<a.length;++i)if(o=a[i],"function"==typeof o){o(t);break}}"function"==typeof n&&n(t)},this.logger);l(function(){e?a():r.addEventListener?r.addEventListener("load",a,!1):r.attachEvent("onload",a)},this.logger)()},o.prototype.wrap=function(r,t){try{var e;if(e="function"==typeof t?t:function(){return t||{}},"function"!=typeof r)return r;if(r._isWrap)return r;if(!r._wrapped){r._wrapped=function(){try{return r.apply(this,arguments)}catch(t){throw t._rollbarContext=e()||{},t._rollbarContext._wrappedSource=r.toString(),window._rollbarWrappedError=t,t}},r._wrapped._isWrap=!0;for(var o in r)r.hasOwnProperty(o)&&(r._wrapped[o]=r[o])}return r._wrapped}catch(n){return r}};for(var s="log,debug,info,warn,warning,error,critical,global,configure,scope,uncaughtError".split(","),p=0;p<s.length;++p)o.prototype[s[p]]=a(s[p]);r.exports={Rollbar:o,_rollbarWindowOnError:n}},function(r,t){"use strict";r.exports=function(r,t){return function(e){if(!e&&!window._rollbarInitialized){var o=window.RollbarNotifier,n=t||{},a=n.globalAlias||"Rollbar",i=window.Rollbar.init(n,r);i._processShimQueue(window._rollbarShimQueue||[]),window[a]=i,window._rollbarInitialized=!0,o.processPayloads()}}}}]);/*end rollbar*/}
else window.console.debug("status: rollbar disabled")
/*DEFAULT LIB FUNCTIONS*/
var Path={version:"0.8.4",map:function(a){if(Path.routes.defined.hasOwnProperty(a)){return Path.routes.defined[a]}else{return new Path.core.route(a)}},root:function(a){Path.routes.root=a},rescue:function(a){Path.routes.rescue=a},history:{initial:{},pushState:function(a,b,c){if(Path.history.supported){if(Path.dispatch(c)){history.pushState(a,b,c)}}else{if(Path.history.fallback){window.location.hash="#"+c}}},popState:function(a){var b=!Path.history.initial.popped&&location.href==Path.history.initial.URL;Path.history.initial.popped=true;if(b)return;Path.dispatch(document.location.pathname)},listen:function(a){Path.history.supported=!!(window.history&&window.history.pushState);Path.history.fallback=a;if(Path.history.supported){Path.history.initial.popped="state"in window.history,Path.history.initial.URL=location.href;window.onpopstate=Path.history.popState}else{if(Path.history.fallback){for(route in Path.routes.defined){if(route.charAt(0)!="#"){Path.routes.defined["#"+route]=Path.routes.defined[route];Path.routes.defined["#"+route].path="#"+route}}Path.listen()}}}},match:function(a,b){var c={},d=null,e,f,g,h,i;for(d in Path.routes.defined){if(d!==null&&d!==undefined){d=Path.routes.defined[d];e=d.partition();for(h=0;h<e.length;h++){f=e[h];i=a;if(f.search(/:/)>0){for(g=0;g<f.split("/").length;g++){if(g<i.split("/").length&&f.split("/")[g].charAt(0)===":"){c[f.split("/")[g].replace(/:/,"")]=i.split("/")[g];i=i.replace(i.split("/")[g],f.split("/")[g])}}}if(f===i){if(b){d.params=c}return d}}}}return null},dispatch:function(a){var b,c;if(Path.routes.current!==a){Path.routes.previous=Path.routes.current;Path.routes.current=a;c=Path.match(a,true);if(Path.routes.previous){b=Path.match(Path.routes.previous);if(b!==null&&b.do_exit!==null){b.do_exit()}}if(c!==null){c.run();return true}else{if(Path.routes.rescue!==null){Path.routes.rescue()}}}},listen:function(){var a=function(){Path.dispatch(location.hash)};if(location.hash===""){if(Path.routes.root!==null){location.hash=Path.routes.root}}if("onhashchange"in window&&(!document.documentMode||document.documentMode>=8)){window.onhashchange=a}else{setInterval(a,50)}if(location.hash!==""){Path.dispatch(location.hash)}},core:{route:function(a){this.path=a;this.action=null;this.do_enter=[];this.do_exit=null;this.params={};Path.routes.defined[a]=this}},routes:{current:null,root:null,rescue:null,previous:null,defined:{}}};Path.core.route.prototype={to:function(a){this.action=a;return this},enter:function(a){if(a instanceof Array){this.do_enter=this.do_enter.concat(a)}else{this.do_enter.push(a)}return this},exit:function(a){this.do_exit=a;return this},partition:function(){var a=[],b=[],c=/\(([^}]+?)\)/g,d,e;while(d=c.exec(this.path)){a.push(d[1])}b.push(this.path.split("(")[0]);for(e=0;e<a.length;e++){b.push(b[b.length-1]+a[e])}return b},run:function(){var a=false,b,c,d;if(Path.routes.defined[this.path].hasOwnProperty("do_enter")){if(Path.routes.defined[this.path].do_enter.length>0){for(b=0;b<Path.routes.defined[this.path].do_enter.length;b++){c=Path.routes.defined[this.path].do_enter[b]();if(c===false){a=true;break}}}}if(!a){Path.routes.defined[this.path].action()}}};
(function(){"use strict";var router=function(){var _routes={},_namedParam=/:\w+/g,_splatParam=/\*\w+/g,_prepareRoute,_stripTrailingSlash,module;_stripTrailingSlash=function(str){if(str.substr(-1)=="/"){return str.substr(0,str.length-1)}return str};_prepareRoute=function(route){if(!route){return null}return _stripTrailingSlash(route).replace(_namedParam,"([^/]+)").replace(_splatParam,"(.*?)")};module=function(base,routes){base||(base="/");this.base=_prepareRoute(base);if(typeof routes==="object"){_routes=routes;this.dispatch()}};module.prototype={on:function(route,callback){if(!route){throw new Error("A route needs to be defined")}callback||(callback=function(){});route=this.base+_prepareRoute(route);_routes["^"+route+"$"]=callback;return route},dispatch:function(event){var regex,regexText,callback,path;for(regexText in _routes){if(_routes.hasOwnProperty(regexText)){callback=_routes[regexText];regex=new RegExp(regexText);path=_prepareRoute(window.location.pathname);if(regex.test(path)){callback.call(false,regexText,path,event)}}}}};return module}();if(typeof module!=="undefined"&&module.exports){module.exports=router}else if(typeof this!=="undefined"){this.router=router}}).call(this);//location init

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
/*Set repo defaults - ASSUMES defaults aren't set, will overwrite them*/
cG.REPO.agent = {def:/*pegasus.js*/function(t,e){return e=new XMLHttpRequest,e.open("GET",t),t=[],e.onreadystatechange=e.then=function(n,o,i){if(n&&n.call&&(t=[,n,o]),4==e.readyState&&(i=t[0|e.status/200]))try{i(JSON.parse(e.responseText),e)}catch(r){i(e.responseText,e)}},e.send(),e}};

cG.REPO.director = {"def":Path};

cG.REPO.producer = {"def":cG.N};

///////
cG.REPO.stage = {"def":{id:"def",construct:function(name,scriptt,anchor,options){   
var direction = function(input,anchor,owrite,c,mode){
        //input - an object, list, or string
        //anchor - the html object to append
        //INITIAL SETUP - Ensures input is the correct format, or dies trying
        c=c||{};
        //holdr is a template, formatted as comix-ngn JSON
        var holdr = {parent:null,
                     offset:0,
                     loading:
                     {lines:c.lines||16,
                      rate:c.rate||1000 / 30,
                      diameter:c.diameter||250,
                      back:c.loaderback||"#FFF",
                      color:c.color||"#373737"},
                     config:
                     {dir:c.dir||"assets/",
                      pagestartnum:!1,
                      chapterstartnum:!1,
                      imgprebuffer:c.imgprebuffer||5,
                      imgpostbuffer:c.imgpostbuffer||5,
                      startpage:0,
                      back:c.back||"#FFF"},
                     pages:[]};
        if(void 0===input){
            return -1;
        } else if(typeof input==='string'){
            holdr.pages.push({alt:"",
                              hover:"",
                              title:"",
                              url:[input],
                              release:0,
                              note:"",
                              perm:!1,
                              anim8:!1});
            input = holdr;
        } else if(Array.isArray(input)){
            for(var q = 0;q<input.length;q++){
                holdr.pages.push({alt:"",
                                  hover:"",
                                  title:"",
                                  url:[],
                                  release:0,
                                  note:"",
                                  perm:!1,
                                  anim8:!1});
                if(Array.isArray(input[q])){
                    for(var w = 0;w<input[q].length;w++){
                        holdr.pages[q].url.push(input[q][w]);
                    }
                } else holdr.pages[q].url.push(input[q]);
            }
            input = holdr;
        } else if(!input.pages.length) 
            input.pages.push({alt:"",
                              hover:"",
                              title:"",
                              url:[],
                              release:0,
                              note:"",
                              perm:!1,
                              anim8:!1});
        else if(void 0 === input.pages[0].url) return -1;
        if(void 0 === anchor||anchor == null) anchor = 0;
        //PROPERTIES - private
        var iimg = input.pages,
            count= input.pages.length, 
            spinning=true,//is the spinner spinning?
            current= -1,//-1 for unset, corresponds to current page,
            spinner = input.loading,
            config = input.config,
            parent = input.parent,
            offset = input.offset,
            pstload = [],
            preload = [],
            master = new Image(),
            skroll = true,
            layers = [document.createElement("canvas"), document.createElement("canvas")],
            context = layers[1].getContext('2d'),
            //METHODS - private
            n = function(){return 0},//this null fuction save us some bytes
            cb = {
                run: function(a){for(var b=0;b<cb[a].length;b++){cb[a][b]();}},
                start: [],
                slidn: [],
                slidd: []
            },
            //slidestart=n,
            //sliding=n,
            //slidend=n,
            object = {
                context: layers[0].getContext('2d'),
                color: spinner.color,
                start: Date.now(),
                lines: spinner.lines,
                diameter: spinner.diameter,
                rate: spinner.rate
            },
            spin = function(a) {
                layers[0].style.paddingLeft=((layers[1].width-300)/2)+"px";
                var rotation = Math.floor(((Date.now() - a.start) / 1000) * a.lines) / a.lines,
                    c = a.color.substr(1);
                a.context.save();
                a.context.clearRect(0, 0, 300, layers[1].height);
                a.context.translate(150, layers[1].height/2);
                a.context.rotate(Math.PI * 2 * rotation);
                if (c.length == 3) c = c[0] + C[0] + c[1] + c[1] + c[2] + c[2];
                var red = parseInt(c.substr(0, 2), 16).toString(),
                    green = parseInt(c.substr(2, 2), 16).toString(),
                    blue = parseInt(c.substr(4, 2), 16).toString();
                for (var i = 0; i < a.lines; i++) {
                    a.context.beginPath();
                    a.context.rotate(Math.PI * 2 / a.lines);
                    a.context.moveTo(a.diameter / 10, 0);
                    a.context.lineTo(a.diameter / 4, 0);
                    a.context.lineWidth = a.diameter / 30;
                    a.context.strokeStyle = "rgba(" + red + "," + green + "," + blue + "," + i / a.lines + ")";
                    a.context.stroke();
                }
                a.context.restore();
                if(spinning) window.setTimeout(spin, a.rate, object);
                else a.context.clearRect(0, 0, 300, layers[1].height);
            },
            scrollit = function(to,time){
                //format inputs
                if(to===null||void 0===to) to={x:0,y:0};
                else if (!isNaN(to)) to={x:0,y:to};//if to is num assume its y
                else {
                    if(to.y===null||void 0===to.y) to.y=0;
                    if(to.x===null||void 0===to.x) to.x=0;
                }
                if(time===null||void 0===time||time<=0) time=400;//ignore given zero time
                //if x or y is less than 0 then go to the bottom
                if(to.y<0) to.y=window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
                if(to.x<0) to.x=window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
                //calculate distance needed to travel
                var dis = {x:(window.pageXOffset!==void 0)?to.x-window.pageXOffset:to.x-document.documentElement.scrollLeft,y:(window.pageYOffset!==void 0)?to.y-window.pageYOffset:to.y-document.documentElement.scrollTop};
                /*dis.x=(window.pageXOffset===void 0)?to.x-window.pageXOffset:to.x-document.documentElement.scrollLeft;
                dis.y=(window.pageYOffset===void 0)?to.y-window.pageYOffset:to.y-document.documentElement.scrollTop;*/
                //console.log("to",to,"dis",dis,"(x",window.pageXOffset,document.documentElement.scrollLeft,"| y",window.pageYOffset,document.documentElement.scrollTop,")",time,time/5);
                if(dis=={x:0,y:0}) return dis;//if that distance is 0 on both x and y, no scrolling required
                var clock = function(c,b,a){
                    window.scrollBy(Math.floor(c.x)/b, Math.floor(c.y)/b);
                    if(a+1<b*5) window.setTimeout(clock,5,c,b,a+1);
                }
                window.setTimeout(clock,5,dis,Math.floor(time/5),0);
                //window.clearInterval(clock);
                return dis;
            },
            preloadGeneric = function(){
                iimg[this.imaginaryID].loaded = true;
                /*possible implementation - Delete it when we are done, possibly saves memory, since its been cached?
            this.imaginaryID=-1;
            this.src="";*/
            },
            preloadMaster = function(){//actually a misnomer, master doesnt actually preload, it loads and draws
                if(iimg[this.imaginaryID].loaded) context.clearRect(0, 0, this.width, this.height);
                else iimg[this.imaginaryID].loaded = true;
                cb.run("slidn");//sliding();
                //conviently, this callback draws the image as soon as master's src is changed and image loaded
                layers[1].width /*= layers[0].width = objref.acW */= this.width;
                layers[1].height = layers[0].height /*= objref.acH*/ = this.height;
                context.drawImage(this,0,0);
                //current = this.imaginaryID;//do not wait on load for page change, do not change page on page load
                /*console.log("killing",intervall);
                window.clearInterval(intervall);
                intervall=-1;*/
                spinning=0;
                if(skroll) scrollit();
                cb.run("slidd");//slidend();
            },
            assign = function(imagething,idd){//assign helper, assigns an src and iid according to given id
                //console.log("World");
                /*console.log("dead",intervall);
                if(intervall<0) intervall = window.setInterval(spin, spinner.rate, object);
                console.log("started",intervall);*/
                spinning=true;
                window.setTimeout(spin, spinner.rate, object);
                cb.run("start");//slidestart();
                if(idd<0) idd=0;//if lower than zero set to zero
                if(idd>=count) idd=count-1; //can not be equal to our higher than the amount of pages
                if(!iimg[idd].loaded) context.clearRect(0, 0, layers[1].width, layers[1].height);
                imagething.imaginaryID = idd;
                imagething.src = config.dir+iimg[idd].url[0];
                current = idd;//we change page as soon as it is assigned, so that page still changes even if it never loads
                /*console.log("----");
            for(var q = idd-1;q>idd-self.config.imgprebuffer-1&&q>=0;q--){
                console.log(q);
            }
            console.log("//");
            for(var q = idd+1;q<self.config.imgpostbuffer+idd+1&&q<self.count;q++){
                console.log(q);
             continue;

            console.log("----");*/
                var r = 0;
                for(var q = idd-1;q>idd-config.imgprebuffer-1&&q>=0;q--){
                    if(iimg[q].loaded) continue;
                    preload[r].imaginaryID = q;
                    preload[r].src = config.dir+iimg[q].url;
                    r++;
                }
                r = 0;
                for(var q = idd+1;q<config.imgpostbuffer+idd+1&&q<count;q++){
                    if(iimg[q].loaded) continue;
                    pstload[r].imaginaryID = q;
                    pstload[r].src = config.dir+iimg[q].url;
                    r++;
                }
            }/*,
            jq = function(){
                this.attempts = 0||this.attempts+1;
                if(window.jQuery===void 0&&this.attempts<10) return window.setTimeout(jq,300);
                jQuery.fn.direction = function(a,b,c) {
                    return this.each( function() {
                        direction(a,$(this),b,c);
                    });
                }
            }
        if(c.jq) jq();*/
        //METHODS - public
        this.count = function(){return count;}
        this.current = function(){return current;}
        this.callback = function(type,callback,index){
            if(type===null||void 0===type) return cb.slidn;
            if(callback===null||void 0===callback){
                return (index===null||void 0===index)?(type)?(type>0)?cb.slidd[index]:cb.start[index]:cb.slidn[index]:(type)?(type>0)?cb.slidd:cb.start:cb.slidn;
            }
            if(type&&(index===null||void 0===index))
                if(type>0) cb.slidd.push(callback);
                else cb.start.push(callback);
            else if (index===null||void 0===index) cb.slidn.push(callback);
            return 1;
            /*if(type===null||void 0===type) return sliding;
            if(callback===null||void 0===callback) return (type)?(type>0)?slidend:slidestart:sliding;
            if(type)
                if(type>0) slidend = callback;
                else slidestart = callback;
            else sliding = callback;
            return 1;*/
        }
        this.go = function(to){
            var sre = (to===null||void 0===to)?0:parseInt(to,10);
            //console.log(sre);
            sre = (isNaN(sre))?0:sre;
            assign(master,(Math.floor(Math.max(0,Math.min(count-1,sre)))));
            return sre;
        }
        this.prev = function(){
            var sre = current-1;//avoids possible race condition, assign loads in new image which can call preloadMaster which can change self.current before it gets to the return call. storing it premptively will preserve the value
            if(sre>=0) assign(master,sre);
            return sre;
        }
        this.next = function(){
            //console.log("Hello");
            var sre = current+1;
            if(sre<count) assign(master,sre);
            return sre;
        }
        this.frst = function(){
            if(current>=0) assign(master,0);
            return 0;
        }
        this.last = function(){
            assign(master,count-1);
            return count-1;
        }
        this.rand = function(){
            var sre = Math.floor(Math.random() * (count-1));
            //console.log(sre);
            assign(master,sre);
            return sre;
        }
        this.data = function(to){//returns info about slide
            var sre = (to===null||void 0===to)?current:parseInt(to,10);
            return (isNaN(sre))?iimg[current]:iimg[(Math.floor(Math.max(0,Math.min(count-1,sre))))];
        }
        this.scroll = function(bool){//toggles Auto Scrolling
            if(bool===null||void 0===bool) return skroll;
            return skroll=bool;
        }
        this.scrollTo = function(to,time){return scrollit(to,time);}//public wrapper for scrollit
        //LOADER - setup
        layers[0].height=480;
        //layers[0].width=640;
        layers[0].style.background=spinner.back;
        layers[0].style.paddingLeft="170px";
        layers[0].style.zIndex=0;
        layers[0].style.position="absolute";

        //objref = object;
        //console.log(layers[1]);
        if(anchor) anchor.appendChild(layers[0]);
        else document.body.appendChild(layers[0]);
        //console.log(object);
        //intervall=window.setInterval(spin, spinner.rate, object);
        window.setTimeout(spin, spinner.rate, object);
        //DISPLAY - setup
        master = new Image();
        master.imaginaryID = -1;//unset to an imaginary image
        master.addEventListener("load", preloadMaster, false);
        //console.log(this.master);
        for(var q = 0;q<iimg.length;q++){
            //iimg[q].btog = 0; a holdover from the old html based canvas
            iimg[q].desig = (q)?(q==iimg.length-1)?1:0:-1;//-1 means first, 0 means middle, 1 means last: true if endpoint, false if middle
            iimg[q].loaded = false;
        }
        for(var q = 0;q<input.config.imgprebuffer;q++){
            preload.push(new Image());
            preload[q].imaginaryID = -1;//unset to an imaginary image
            preload[q].addEventListener("load", preloadGeneric, false);
        }
        for(var q = 0;q<input.config.imgpostbuffer;q++){
            pstload.push(new Image());
            pstload[q].imaginaryID = -1;//unset to an imaginary image
            pstload[q].addEventListener("load", preloadGeneric, false);
        }
        //preload[0].imaginaryID = 0;
        //preload[0].src = input.pages[0].url;
        //init
        assign(master,(owrite===void 0||owrite===null||isNaN(owrite))?config.startpage:owrite);
        //end init
        layers[1].height=480;
        layers[1].width=640;
        layers[1].background = config.back;
        layers[1].style.zIndex=1;
        layers[1].style.position="relative";
        //layers[1].style.visibility="hidden";
        if(anchor) anchor.appendChild(layers[1]);
        else document.body.appendChild(layers[1]);
        this.canvi=layers;
        this.internals = input;
        this.cb = cb;
    }/**/
    var get;//still undefined
    if(typeof(Storage) !== "undefined") {
        get = parseInt(localStorage.getItem(cG.comicID+"|"+name+"|curPage"),10);
        /*if(cG.avx[0]>0&&cG.avx[1]>0) */cG.verbose(1,cG.comicID+"|"+name+"|curPage",":",get);
        /*else console.log(cG.comicID+"|"+name+"|curPage",":",get);*/
    }
    if(cG.comix===void 0&&cG.prePage>=0) get = cG.prePage;//prepage, which is from router, overwrites localStorage if over -1, only works on comix
    var main = new direction(scriptt,anchor,get);
    main.name = name;
    main.type = "def";
    //if(cG.avx[0]>1&&cG.avx[1]>0){}
    main.pg = [anchor]
    main.at = 0;
    main.my = 0;
    main.navto = function(a){
        if(a<main.pg.length&&a!==null&a!==void 0) return main.pg[a]._nav();
        else return main.pg[main.my]._nav();
    }
    main.ch_data = function(a){
        var c = main.internals.chapters;
        var sre = (a===null||void 0===a)?main.ch_current():parseInt(a,10);
        return (main.ch_current()==-1)?{}:(isNaN(sre))?c[main.ch_current()]:c[sre];
    }
    main.ch_count = function(){
        return main.internals.chapters.length;
    }
    main.ch_current = function(){
        var c = main.internals.chapters,
            d = main.current();
        for(var a=0;a<c.length;a++){
            if(c[a].start<=d&&d<=c[a].end) return a;
        }
        return -1;
    }
    main.ch_go = function(a,b){
        var sre = (a===null||void 0===a)?0:parseInt(a,10);
        sre = (isNaN(sre))?0:sre;
        var g;
        if(b===null&&b===void 0) g = "start";
        else g = "end"
        if (main.ch_current()==-1) return main.go()
        return main.go(main.internals.chapters[Math.floor(Math.max(0,Math.min(main.internals.chapters.length-1,sre)))][g]);
    }
    main.ch_prev = function(b){
        if (main.ch_current()==-1) return main.go();
        var g;
        if(b===null&&b===void 0) g = "start";
        else g = "end"
        return main.go(main.internals.chapters[Math.max(0,main.ch_current()-1)][g]);
    }
    main.ch_next = function(b){
        if (main.ch_current()==-1) return main.go();
        var g;
        if(b===null&&b===void 0) g = "start";
        else g = "end"
        return main.go(main.internals.chapters[Math.min(main.ch_count()-1,main.ch_current()+1)][g]);
    }
    main.ch_frst = function(b){
        if (main.ch_current()==-1) return main.go();
        var g;
        if(b===null&&b===void 0) g = "start";
        else g = "end"
        return main.go(main.internals.chapters[0][g]);
    }
    main.ch_last = function(b){
        if (main.ch_current()==-1) return main.go();
        var g;
        if(b===null&&b===void 0) g = "start";
        else g = "end"
        return main.go(main.internals.chapters[main.ch_count()-1][g]);
    }
    var lscurrent = function(){
        if(typeof(Storage) !== void 0&&cG.fBox.pgesve) {
            localStorage.setItem(cG.comicID+"|"+name+"|curPage",cG.cPanel[/*"def_"+*/name].current().toString());
        }
        if(cG.comix===cG.cPanel[/*"def_"+*/name]){//if comic is the comix, then push its state
            var chpmod = (cG.script.config.chapterstartnum)?1:0,
                modify = (cG.script.config.pagestartnum)?1:0,
                result = cG.cPanel[/*"def_"+*/name].current();
            switch(cG.script.config.orderby) {
                case 1:
                    console.log(result);
                    var mechp = cG.cPanel[/*"def_"+*/name].ch_current();
                    result=(mechp+chpmod)+"/"+(result-cG.cPanel[/*"def_"+*/name].internals.chapters[mechp].start+modify)
                    break;
                case 2:
                    var nT = new Date(cG.cPanel[/*"def_"+*/name].data().release*1000);
                    var guide=cG.script.config.dateformat.split("/");
                    for(var tim=0;tim<3;tim++){
                        if(guide[tim].indexOf("Y")+1) guide[tim]=nT.getYear()-100;
                        else if(guide[tim].indexOf("M")+1) guide[tim]=nT.getMonth()+1;
                        else if(guide[tim].indexOf("D")+1) guide[tim]=nT.getDate();
                    }
                    result=guide.join("/");
                    //console.log(result,guide,nT);
                    break;
                default:
                    result+=modify;
            }
            //if(cG.avx[0]>0&&cG.avx[1]>0) 
            cG.verbose(1,name,"Pushing state:",result);
            if(cG.fBox.pgepsh) history.pushState({}, null, "#/"+result);
        }
        if(cG.queue.stageChange!==void 0)
            for(var ftn in cG.queue.stageChange){
                if (cG.queue.stageChange.hasOwnProperty(ftn)) cG.queue.stageChange[ftn](cG.cPanel[/*"def_"+*/name]);
            }
        var strct = cG.cPanel[/*"def_"+*/name].data(cG.cPanel[/*"def_"+*/name].current()).special;
        var zombie = document.getElementById(name+"_tempScript");//fetch zombie child
        var preload = cG.HELPERS.stick(cG.cPanel[/*"def_"+*/name].canvi[0],null,null,0);
        var display = cG.HELPERS.stick(cG.cPanel[/*"def_"+*/name].canvi[1],null,null,1);
        if(zombie!==void 0&&zombie!==null){
            anchor.removeChild(zombie);//kill the zombie
            //if(cG.avx[0]>1&&cG.avx[1]>0){}
            preload._show();
            display._show();
        }
        if(strct!==null&&strct!==void 0&&strct!=""){
            //anchor.innerHTML += anchor.innerHTML+strct;//this breaks the cavases
            var spanr = document.createElement("SPAN");
            spanr.setAttribute("id", name+"_tempScript");
            spanr.innerHTML=strct;
            anchor.appendChild(spanr);
            //if(cG.avx[0]>1&&cG.avx[1]>0){}
            preload._hide();
            display._hide();
        }
    }
    main.callback(1,lscurrent);
    cG.comix = (cG.fBox.protect)?cG.comix||main:main;
    //if protect is true - set the comix on the first call
    //else always overwrite comix
    return main;
}}};
///////
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
cG.stage = cG.REPO.stage.def;
/*HELPERS*/
cG.HELPERS = {};
/*END comix-ngn properties*/
! function(){
    /*AJAX Calls*/
    /*debugging: ensures cG is correctly instaniated*//*console.log(cG);*/
    var dir,
        tir,
        src = document.getElementsByTagName("SCRIPT");
    for (var i = 0; i < src.length; i++) {
        if(src[i].src.indexOf("comixngn")>=0||src[i].src.indexOf(".cng.")>=0){
            dir=src[i].getAttribute("dir");
            tir=src[i].getAttribute("tir");
            break;
        }
    }
    dir=dir||"";
    tir=tir||"";
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
    if(void 0===cG.REPO.scReq.getCtrls){
        cG.REPO.scReq.getCtrls = cG.agent(tir+'ctrls.html');
        cG.REPO.scReq.getCtrls.then(
            function(data, xhr) {
                cG.ctrls = cG.REPO.ctrls.def = data;
            },
            function(data, xhr) {
                console.error(data, xhr.status);
                cG.ctrls = cG.REPO.ctrls.def = 0;
            });
    }
    /*END AJAX calls*/
}();
/*STAGE creation-REDACTED*/
cG.HELPERS.jstagecreate = cG.N;
cG.queue.stageChange=cG.queue.stageChange||{};
cG.queue.stageChange.hotcontent=function(){
    var hotstuff = document.getElementsByClassName("cg-hot");
    var hotqueue = [];//window.hotqueue||[];
    for (var i = 0; i < hotstuff.length; i++) { 
        hotqueue.push({place:hotstuff[i].parentNode,time:hotstuff[i]});
    }
    while (hotstuff.length) {
        hotstuff[0].parentNode.removeChild(hotstuff[0]);
    }
    for (var j = 0; j < hotqueue.length; j++) { 
        console.log("queued stuff",cG.info.vrb,hotqueue[j])
            hotqueue[j].place.appendChild(hotqueue[j].time);/*
        if(cG.info.vrb!=500){
            hotqueue[j].place.appendChild(hotqueue[j].time);
        } else window.hotqueue = hotqueue;*/
    }    
}
cG.queue.stageChange.controller=function(target){
    //console.log(target.data().desig);
    var b,
        c,
        key,
        mykey,
        bcollect=[],
        check = target.data().desig;
    for(var o=0;o<target.brains.length;o++){
        bcollect = cG.HELPERS.FindClassesInside(target.brains[o],["frst","last","prev","next","rand"]);
        //console.log(bcollect);
        for(var p=0;p<bcollect.length;p++){
            b=bcollect[p];
            c=b.getAttribute("class");
            //console.log(b,p,bcollect);
            //console.log(target.brains[o],b.getAttribute("nohide"))
            key = target.brains[o].getAttribute("nohide");
            if(key) mykey = key;
            else mykey = "disable";
            //console.log(check)
            if((c=="frst"||c=="prev")&&check==-1){
                if(c=="frst") b.setAttribute("class","frst "+mykey);
                else b.setAttribute("class","prev "+mykey);
                if(!key) b.setAttribute("style","display:none;");
            }
            else if((c=="frst "+mykey||c=="prev "+mykey)){
                if(c=="frst "+mykey) b.setAttribute("class","frst");
                else b.setAttribute("class","prev");
                if(!key) b.setAttribute("style","display:inline;");
            }
            if((c=="last"||c=="next")&&check==1){
                if(c=="last") b.setAttribute("class","last "+mykey);
                else b.setAttribute("class","next "+mykey);
                if(!key) b.setAttribute("style","display:none;");
            }
            else if((c=="last "+mykey||c=="next "+mykey)){
                if(c=="last "+mykey) b.setAttribute("class","last");
                else b.setAttribute("class","next");
                if(!key) b.setAttribute("style","display:inline;");
            }
        }
    }
};
cG.addRender = function(addme,dest,name){
    //dest = script obj
    var pushonpages = function(tget){
        //convert data to page array
        var work;
        for(var i =0;i<tget.length;i++){
            if(Array.isArray(tget[i]))
                work = {alt:"",hover:"",title:"",url:tget[i],release:0,note:"",perm:!1,anim8:!1};
            else
                work = {alt:"",hover:"",title:"",url:[tget[i]],release:0,note:"",perm:!1,anim8:!1};
            if(dest!==void 0&&dest!==null)
                dest.pages.push(work);
            else
                cG.REPO.script.def.pages.push(work);
        }
        //this overwrites cG.script, if it it changed by something other than def
        if(dest===void 0||dest===null)
            cG.script = cG.REPO.script.def;
        else
            return dest;
        return cG.script;
    }
    if(void 0===addme||addme===null){
        if(void 0===name||name===null) name = "additive";
        var data = syncJSON(cG.REPO.scReq.address+name+'.json');
        return pushonpages(data.p);
        /*cG.REPO.scReq.getAdd = cG.agent(cG.REPO.scReq.address+name+'.json');
        cG.REPO.scReq.getAdd.then(
            function(data, xhr) {
                return pushonpages(data.p);
            },
            function(data, xhr) {
                console.error(data, xhr.status);
                console.log("addRender has failed")
                //cG.script = cG.REPO.script.def = 0;
            });*/
    } else return pushonpages(addme.p);
};
cG.controlInjection = function(SPECIFIC){
    if(!cG.documentcontrolkeyset&&cG.fBox.arrow){
        cG.documentcontrolkeyset = true;
        document.onkeyup = function(e){
            //console.log("keydown");
            e = e || window.event;
            if (e.keyCode == '37') cG.comix.prev()
            else if (e.keyCode == '39') cG.comix.next();
            else if (e.keyCode == '82') cG.comix.rand();
        }
    }
    var stages = [],
        ctrls = (cG.ctrls)?cG.ctrls:'<ul><li style="display: inline;"><button class="frst" >|&lt;</button></li><li style="display: inline;"><button class="prev" rel="prev" accesskey="p">&lt; Prev</button></li><li style="display: inline;"><button class="rand" >Random</button></li><li style="display: inline;"><button class="next" rel="next" accesskey="n">Next &gt;</button></li><li style="display: inline;"><button class="last" >&gt;|</button></li></ul>',
        antictrl = '<ul><li style="display: inline;"><button class="last" >&lt;|</button></li><li style="display: inline;"><button class="next" rel="next" accesskey="n">Next &lt;</button></li><li style="display: inline;"><button class="rand" >Random</button></li><li style="display: inline;"><button class="prev" rel="prev" accesskey="p">&gt; Prev</button></li><li style="display: inline;"><button class="frst" >|&gt;</button></li></ul>',
        pod,podling,
        errr = "controlInjection can only operate on elements or arrays of elements",
        eventer=function(par,chd){
            par.setAttribute("mind",1);
            document.getElementById(par.id+"_location").title=cG.cPanel[par.id].data().hover;
            var classstuff = (par.getAttribute("comix"))?document.getElementsByClassName("cgtitle"):[],
                working,
                classdate = (par.getAttribute("comix"))?document.getElementsByClassName("cgdate"):[];
            for(var eq=0;eq<classstuff.length;eq++)
                classstuff[eq].innerHTML=cG.cPanel[par.id].data().title;
            for(var eq=0;eq<classdate.length;eq++){
                working=new Date(cG.cPanel[par.id].data().release*1000);
                classdate[eq].innerHTML = working.toDateString();
            }
            var q=document.getElementsByClassName("frst"),
                w=document.getElementsByClassName("prev"),
                e=document.getElementsByClassName("rand"),
                r=document.getElementsByClassName("next"),
                t=document.getElementsByClassName("last"),
                getme=""+par.id;
            //console.log(q,w,e,r,t,cG.cPanel["def_"+name]);
            //console.log(arguments.callee,chd);
            for (var y = 0; y < q.length; y++){
                if(chd.getAttribute("cglink")==getme&&!q[y].getAttribute("cgae")) q[y].addEventListener("click", function() {  
                    var box = cG.cPanel[getme].data(cG.cPanel[getme].frst());
                    document.getElementById(getme+"_location").title = box.hover;
                    var boe = document.getElementById(getme);
                    classstuff = (boe.getAttribute("comix"))?document.getElementsByClassName("cgtitle"):[];
                    for(var eq=0;eq<classstuff.length;eq++) classstuff[eq].innerHTML=box.title;
                    classdate = (boe.getAttribute("comix"))?document.getElementsByClassName("cgdate"):[];
                    for(var eq=0;eq<classdate.length;eq++){
                        working=new Date(cG.cPanel[par.id].data().release*1000);
                        classdate[eq].innerHTML = working.toDateString();
                    }
                });                                                                
                q[y].setAttribute("cgae","1");
            }
            for (var y = 0; y < w.length; y++){
                if(chd.getAttribute("cglink")==getme&&!w[y].getAttribute("cgae")) w[y].addEventListener("click", function() {
                    var box = cG.cPanel[getme].data(cG.cPanel[getme].prev());
                    document.getElementById(getme+"_location").title = box.hover;
                    var boe = document.getElementById(getme);
                    classstuff = (boe.getAttribute("comix"))?document.getElementsByClassName("cgtitle"):[];
                    for(var eq=0;eq<classstuff.length;eq++) classstuff[eq].innerHTML=box.title;
                    classdate = (boe.getAttribute("comix"))?document.getElementsByClassName("cgdate"):[];
                    for(var eq=0;eq<classdate.length;eq++){
                        working=new Date(cG.cPanel[par.id].data().release*1000);
                        classdate[eq].innerHTML = working.toDateString();
                    }
                }); 
                w[y].setAttribute("cgae","1");
            }
            for (var y = 0; y < e.length; y++){
                if(chd.getAttribute("cglink")==getme&&!e[y].getAttribute("cgae")) e[y].addEventListener("click", function() {
                    var box = cG.cPanel[getme].data(cG.cPanel[getme].rand());
                    document.getElementById(getme+"_location").title = box.hover;
                    var boe = document.getElementById(getme);
                    classstuff = (boe.getAttribute("comix"))?document.getElementsByClassName("cgtitle"):[];
                    for(var eq=0;eq<classstuff.length;eq++) classstuff[eq].innerHTML=box.title;
                    classdate = (boe.getAttribute("comix"))?document.getElementsByClassName("cgdate"):[];
                    for(var eq=0;eq<classdate.length;eq++){
                        working=new Date(cG.cPanel[par.id].data().release*1000);
                        classdate[eq].innerHTML = working.toDateString();
                    }
                });
                e[y].setAttribute("cgae","1");
            }
            for (var y = 0; y < r.length; y++){
                if(chd.getAttribute("cglink")==getme&&!r[y].getAttribute("cgae")) r[y].addEventListener("click", function() {
                    var box = cG.cPanel[getme].data(cG.cPanel[getme].next());
                    document.getElementById(getme+"_location").title = box.hover;
                    var boe = document.getElementById(getme);
                    classstuff = (boe.getAttribute("comix"))?document.getElementsByClassName("cgtitle"):[];
                    for(var eq=0;eq<classstuff.length;eq++) classstuff[eq].innerHTML=box.title;
                    classdate = (boe.getAttribute("comix"))?document.getElementsByClassName("cgdate"):[];
                    for(var eq=0;eq<classdate.length;eq++){
                        working=new Date(cG.cPanel[par.id].data().release*1000);
                        classdate[eq].innerHTML = working.toDateString();
                    }
                });
                r[y].setAttribute("cgae","1");
            }
            for (var y = 0; y < t.length; y++){
                if(chd.getAttribute("cglink")==getme&&!t[y].getAttribute("cgae")) t[y].addEventListener("click", function() {
                    var box = cG.cPanel[getme].data(cG.cPanel[getme].last());
                    document.getElementById(getme+"_location").title = box.hover;
                    var boe = document.getElementById(getme);
                    classstuff = (boe.getAttribute("comix"))?document.getElementsByClassName("cgtitle"):[];
                    for(var eq=0;eq<classstuff.length;eq++) classstuff[eq].innerHTML=box.title;
                    classdate = (boe.getAttribute("comix"))?document.getElementsByClassName("cgdate"):[];
                    for(var eq=0;eq<classdate.length;eq++){
                        working=new Date(cG.cPanel[par.id].data().release*1000);
                        classdate[eq].innerHTML = working.toDateString();
                    }
                });
                t[y].setAttribute("cgae","1");
            }
        };
    if(void 0 === SPECIFIC) stages = document.getElementsByClassName("venue");/*get all entry points*/
    else if(Array.isArray(SPECIFIC)){
        if(SPECIFIC.length>0) if(void 0 ===SPECIFIC[0].nodeName) return console.error(errr);
            else return console.error(errr);
        stages = stages.concat(SPECIFIC);
    } else{
        if(void 0 === SPECIFIC.nodeName) return console.error(errr);
        stages.push(SPECIFIC);/*if not array and not undefined, assume it is a Element*/
    }
    var exist = document.querySelectorAll('[cglink]'),
        linkcg;
    //console.log(exist)
    for(var v=0;v<exist.length;v++){
        linkcg = exist[v].getAttribute("cglink");
        if(cG.cPanel[linkcg]!==void 0&&cG.cPanel[linkcg]!==null){
            cG.cPanel[linkcg].brains = cG.cPanel[linkcg].brains || [];
            cG.cPanel[linkcg].brains.push(exist[v]);
            eventer(document.getElementById(linkcg),exist[v]);
        }
    }
    for(var u=0;u<stages.length;u++){
        if(!stages[u].getAttribute("mind")){//add event handlers
            pod = document.createElement("DIV");
            pod.innerHTML=((stages[u].getAttribute("readdir")||cG.script.config.readdir)&&!cG.ctrls)?antictrl:ctrls;
            podling = pod.children[0];
            if(!stages[u].getAttribute("comix")) podling.setAttribute("style","display:none;");
            else podling.setAttribute("style","display:block;");
            podling.setAttribute("cglink",stages[u].id);
            stages[u].parentNode.insertBefore(podling, stages[u].nextSibling);
            //console.log(stages[u],stages[u].nextSibling)
            cG.cPanel[stages[u].id].brains = cG.cPanel[stages[u].id].brains || [];
            cG.cPanel[stages[u].id].brains.push(podling);
            eventer(stages[u],podling);
        }
    }
}
cG.stageInjection = function(SPECIFIC){
    if(cG.script === '' || cG.decor === ''|| cG.ctrls === '') {//although we don't need decor, if there is a template, we prioritize it
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
    if(cG.recyclebin.air!=""&&cG.recyclebin.air!==void 0&&cG.recyclebin.air!==null) cG.script.config.dir=cG.recyclebin.air;
    cG.REPO.scReq.address = cG.REPO.scReq.address||cG.recyclebin.dir;
    for(var p in cG.recyclebin)
        if(cG.recyclebin.hasOwnProperty(p)&&p!==null)
            cG.recyclebin[p] = null;
    var final_res = cG.cPanel,
        decor = (cG.decor)?cG.decor:'<div id="location"></div><div id="archive">Archive</div><div id="me">About Me</div>',
        ctrls = (cG.ctrls)?cG.ctrls:'<div>NOT IMPLEMENTED YET</div>',
        reqQueue = [],
        request = function(iD,source){//,srcScript,srcScriptReq){            
            /*initial setup*/
            /*////get attributes */
            /*////////async request the script if it is specified, else use default*/
            if(!cG.fBox.noverwrite) stages[iD].innerHTML = "";
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
            if(myScript.config.additive&&cG.fBox.addme){
                cG.addRender(null,null,myScript.config.additive);
                myScript.config.additive = "";
            }
            /*////////get the rest of the attributes*/
            var id_attr = stages[iD].getAttribute("id"),
                use_attr = stages[iD].getAttribute("use"),
                config_attr = stages[iD].getAttribute("config"),
                add_attr = stages[iD].getAttribute("additive");
            /*////attribute processing */
            //cgcij tells cG that a stage has already been injectted on this element, and you should skip it normally
            if(add_attr!=""&&void 0!==add_attr&&add_attr!==null&&cG.fBox.addme){
                if(source===null||source===void 0){
                    myScript = cG.addRender(null,null,add_attr);
                    stages[iD].removeAttribute("additive");
                } else {
                    myScript = cG.addRender(null,source,add_attr)
                }
            }
            stages[iD].setAttribute("cgcij",1);
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
            //if(cG.avx[0]>1&&cG.avx[1]>0){}
            var sbvenue = [],
                nstpost = [],
                nestcom = stages[iD].children;
            for(var h = 0;h<nestcom.length; h++){
                if(nestcom[h].getAttribute("class")=="venue") sbvenue.push(nestcom[h]);
                else nstpost.push(nestcom[h]);
            }
            stages[iD].innerHTML = decor;
            //console.log(stages[iD],decor)
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
            //if(cG.avx[0]>1&&cG.avx[1]>0){}
            var archival = document.getElementById(id_attr+"_archive");
            if(archival!==void 0&&archival!==null){
                var transcriptPG = "<ul>";
                var transcriptCH = "<ul>";
                var transcriptBH = "<ul>";
                var chpapp = 0;
                var pagapp = 0;
                if(myScript.config.pagestartnum) pagapp=1;
                if(myScript.config.chapterstartnum) chpapp=1;
                for(var y=0;y<myScript.pages.length;y++){
                    transcriptPG=transcriptPG+'<li onclick="cG.cPanel['+"'"/*+'def_'*/+id_attr+"'"+'].go('+y+');this.parentElement.parentElement.style.display='+"'none'"+';document.getElementById('+"'"+id_attr+"_location'"+').style.display='+"'block'"+';" style="display:block;">'+(y+pagapp)+'</li>';
                    //console.log(transcriptPG)
                }
                for(var x=0;x<myScript.chapters.length;x++){
                    transcriptCH=transcriptCH+'<li onclick="cG.cPanel['+"'"/*+'def_'*/+id_attr+"'"+'].ch_go('+x+');this.parentElement.parentElement.style.display='+"'none'"+';document.getElementById('+"'"+id_attr+"_location'"+').style.display='+"'block'"+';" style="display:block;">'+(x+chpapp)+'</li>';
                    transcriptBH=transcriptBH+'<li onclick="cG.cPanel['+"'"/*+'def_'*/+id_attr+"'"+'].ch_go('+x+');this.parentElement.parentElement.style.display='+"'none'"+';document.getElementById('+"'"+id_attr+"_location'"+').style.display='+"'block'"+';" style="display:block;">'+(x+chpapp)+'<ul>';
                    for(var u=myScript.chapters[x].start;u<myScript.chapters[x].end+1;u++){
                        transcriptBH=transcriptBH+'<li onclick="cG.cPanel['+"'"/*+'def_'*/+id_attr+"'"+'].go('+u+');this.parentElement.parentElement.parentElement.style.display='+"'none'"+';document.getElementById('+"'"+id_attr+"_location'"+').style.display='+"'block'"+';" style="display:block;">'+(u+pagapp)+'</li>';
                    }
                    transcriptBH=transcriptBH+'</ul></li>';
                }
                transcriptPG=transcriptPG+'</ul>';
                transcriptCH=transcriptCH+'</ul>';
                transcriptBH=transcriptBH+'</ul>';
                if(archival.innerHTML==''||archival.innerHTML=='Archive') archival.innerHTML=transcriptBH+transcriptPG+transcriptCH;
            }
            var srch = /*use_attr+"_"+*/id_attr;
            final_res[srch] = cG.stage.construct(id_attr,myScript,anchorto,config_attr);
            //console.log(sbvenue,nstpost)
            //if(cG.avx[0]>1&&cG.avx[1]>0){}
            //console.log(stages[iD])
            if(!cG.fBox.protect) stages[iD].setAttribute("comix",-1);//comix protection disabled, all stages are comix
            else if(stages[iD].getAttribute("id")==cG.comix.name) stages[iD].setAttribute("comix",1);
            var chl = stages[iD].children;
            for(var t = 1;t<chl.length;t++){
                if(chl[t]==anchorto) continue;
                final_res[srch].pg.push(chl[t]);
            }
            for(var y = 0;y<nstpost.length;y++){
                nstpost[y].style="display: none;"
                stages[iD].appendChild(nstpost[y]);
                final_res[srch].pg.push(nstpost[y]);
            }
            //console.log(sbvenue,nstpost);
            for(var z = 0;z<sbvenue.length;z++){
                var sia = sbvenue[z].getAttribute("id"),
                    sua = sbvenue[z].getAttribute("use"),
                    sca = sbvenue[z].getAttribute("config");
                //console.log(sia,sia||id_attr+"_"+z,id_attr+"_"+z)
                //console.log(final_res[srch])
                var childling = document.createElement("DIV");
                childling.setAttribute("id",sia||id_attr+"_"+z)
                childling.setAttribute("style","display:none;");
                childling.my = z;
                final_res[srch+"_"+z] = cG.stage.construct(sia||id_attr+"_"+z,sua||myScript,childling,sca||config_attr);
                stages[iD].appendChild(childling);
                final_res[srch].pg.push(childling);
                final_res[srch+"_"+z].my = z;
                //console.log()
            }
            for(var r = 0;r<final_res[srch].pg.length;r++){
                var frspr = cG.HELPERS.stick(final_res[srch].pg[r],final_res[srch].pg,final_res[srch],r);
            }
        };
    for (var i = 0; i < stages.length; i++) if(!stages[i].getAttribute("cgcij")==true||!cG.fBox.noverwrite) request(i);
    cG.cPanel=final_res;
    cG.controlInjection();
    return final_res;
};
/*end STAGE creation*/
/*ROUTING*/
cG.route2page = cG.route2page||function(orgvalue){
    //var com = cG.script.config.orderby,
    if(!cG.fBox.rtepge) return 0;
    var value;
    if(orgvalue===null||orgvalue===void 0||!orgvalue){
        var z = 0;
        value=[];
        for(var y in this.params){
            if(this.params.hasOwnProperty(y)&&y!==null&&y!==void 0){
                z=Number(this.params[y]);
                if(isNaN(z)) value.push(this.params[y]);
                else value.push(z);
            }
        }
        if(!value.length) value=0;
    } else {
        value = orgvalue
    }
    if(cG.script === '') return setTimeout(cG.route2page,300,value);
    if(!cG.script) return -1;
    var chpmod = (cG.script.config.chapterstartnum)?1:0;
    var modify = (cG.script.config.pagestartnum)?1:0;
    if(Array.isArray(value)){
        if(value.length==1&&!isNaN(value[0]%1)&&value[0]>=cG.script.pages.length){
            value=value[0];
        } else{
            var query,
                b=cG.script.pages;
            switch(value.length) {
                case 1: 
                    value=value[0]
                    break;
                case 2:
                    if(value[0]<cG.script.chapters.length)
                        query=cG.script.chapters[value[0]].start+(value[1]-modify)+modify;
                    else {
                        value=-1
                        b=[];
                    }
                    break;
                case 3:
                    var guide=cG.script.config.dateformat.split("/");
                    if(isNaN(value[0]%1)||isNaN(value[1]%1)||isNaN(value[2]%1)){
                        value=-1
                        b=[];
                        break;
                    }
                    for(var tim=0;tim<3;tim++){
                        if(guide[tim].indexOf("Y")+1) guide[tim]=0;
                        else if(guide[tim].indexOf("M")+1) guide[tim]=1;
                        else if(guide[tim].indexOf("D")+1) guide[tim]=2; //2,1,0
                    }
                    if(value[guide[0]].length > 1900) value[guide[0]]+=2000;
                    var timme = new Date(value[guide[0]], value[guide[1]], value[guide[2]]);
                    value=timme.getTime();
                    break;
            }
            query=String(value);
            for(var a=0;a<b.length;a++){
                if(b[a].alt.indexOf(query)+1||b[a].hover.indexOf(query)+1||b[a].title.indexOf(query)+1||b[a].release==Number(query)){
                    //console.log(b[a].alt.indexOf(query),b[a].hover.indexOf(query),b[a].title.indexOf(query),b[a].release==Number(query))
                    value=a+modify;
                    break;
                }
            }
        }
    }
    cG.prePage = value-modify;
    //search for page mismatch
    if(cG.comix!==void 0&&cG.prePage!=cG.comix.current()){
        cG.comix.go(cG.prePage);
        var box = cG.comix.data(cG.prePage);
        document.getElementById(cG.comix.name+"_location").title = box.hover;
        var boe = document.getElementById(cG.comix.name+"_location");
        var csf = document.getElementsByClassName("cgtitle");
        for(var eq=0;eq<csf.length;eq++) csf[eq].innerHTML=box.title;
        //console.log(cG.comix.name+"_location");
    }
    /*if(cG.avx[0]>1&&cG.avx[1]>0)*/
    cG.verbose(1,"AutoPage: "+cG.prePage)
}
Path.map("#/:v1(/:v2/:v3/:v4/:v5/:v6/:v7/:v8/:v9)").to(cG.route2page);
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
            for(var y=0;y<base.length;y++){
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
cG.HELPERS.stick = function(obj,parent,sauce,pos){
    var ftns = [
        function(a){//order
            if(parent!==void 0||parent!==null){
                parent.splice(a, 0, this);
                this._pos = a;
                return a;
            }
        },
        function(a){//switch
            if(parent!==void 0||parent!==null){
                var b = parent[this._pos];
                parent[this._pos] = parent[a];
                parent[a] = b;
                this._pos = a;
                return a;
            }
        },
        function(){//nav
            if(sauce!==void 0||sauce!==null){
                sauce.at = this._pos;
                this._show();
                var b = this._pos;
                for(var y=0;y<parent.length;y++){
                    if(this._pos==y) continue;
                    parent[y]._hide();
                }
                if(this._chain.length) b = [b];
                for(var x=0;x<this._chain.length;x++){
                    //console.log(this,this._chain,x,this._chain[x]);
                    this._chain[x]._show();
                    b.push(x);
                }
                return b;
            }
        },
        function(){//show
            if(this.style.display===null||this.style.display===void 0)
                this.setAttribute("style",this.getAttribute("style")+"display: block;");
            else this.style.display="block";
            return this._pos;
        },
        function(){//hide
            if(this.style.display===null||this.style.display===void 0)
                this.setAttribute("style",this.getAttribute("style")+"display: none;");
            else this.style.display="none";
            return this._pos;
        },
        function(){//cloak
            if(this.style.visibility===null||this.style.visibility===void 0)
                this.setAttribute("style",this.getAttribute("style")+"visibility:hidden;");
            else this.style.visibility="hidden";
            return this._pos;
        },
        function(){//uncloak
            if(this.style.visibility===null||this.style.visibility===void 0)
                this.setAttribute("style",this.getAttribute("style")+"visibility: visible;");
            else this.style.visibility="visible";
            return this._pos;
        },
        function(a){//link
            if(parent!==void 0||parent!==null){
                this._chain.push(parent[a]);
                return a;
            }
        },
        function(a){//unlink
            if(parent!==void 0||parent!==null){
                return this._chain.splice(this._chain.indexOf(parent[a]),1);
            }
        },
        function(a){//bind
            if(parent!==void 0||parent!==null){
                this._chain.push(parent[a]);
                parent[a]._chain.push(this);
                return [a,this._pos]
            }
        },
        function(a){//unbind
            if(parent!==void 0||parent!==null){
                return this._chain.splice(this._chain.indexOf(parent[a]),1).concat(parent[a]._chain.splice(parent[a]._chain.indexOf(this._pos), 1));
            }
        }
    ]
    obj._order = ftns[0];
    obj._switch = ftns[1];
    obj._nav = ftns[2];
    obj._show = ftns[3];
    obj._hide = ftns[4];
    obj._cloak = ftns[5];
    obj._uncloak = ftns[6];
    obj._link = ftns[7];
    obj._unlink = ftns[8];
    obj._bind = ftns[9];
    obj._unbind = ftns[10];
    obj._pos = pos;
    obj._chain = [];
    return obj;
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
cG.HELPERS.FindClassesInside = function(source,cls){
    //console.log(source);
    var ret = [],
        q,
        w = source.className.split(" ");
    for(var u=0;u<w.length;u++){
        //console.log(cls,w[u]);
        q=cls.indexOf(w[u])+1;
        if(q) break;
    }
    if(q){
        ret.push(source);
    }
    for(var a=0;a<source.children.length;a++){
        ret = ret.concat(cG.HELPERS.FindClassesInside(source.children[a],cls));
    }
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
    Path.listen();
    //Path.history.listen(true);
    /*everything else occurs here*/
    if(!document.getElementById("$COMICNGWRITER$$$")){/*prints version information*/
        console.log("%c %c %c comix-ngn v"+ cG.info.vix +" %c \u262F %c \u00A9 2015 Oluwaseun Ogedengbe %c Plugins: "+cG.$GPC, "color:white; background:#2EB531", "background:purple","color:white; background:#32E237", 'color:red; background:black', "color:white; background:#2EB531", "color:white; background:purple");}
    //console.log(JSON.stringify(cG, null, 2) );
    var a = document.getElementsByTagName("SCRIPT");
    var b;
    for (var i = 0; i < a.length; i++) {
        if(void 0==a[i].getAttribute("src")) continue;
        if(a[i].getAttribute("src").indexOf("comixngn")>=0){
            b=a[i].getAttribute("auto");
            break;
        };
    }
    if((b===null||b||b===void 0||b=="")&&cG.fBox.fstrun){
        //cG.HELPERS.jstagecreate();
        //cG.cPanel=cG.stageInjection();
        cG.stageInjection();
        //console.log(cG.cPanel);
    }
});