/*DEFAULT LIB FUNCTIONS-contains Path(Router) DEPRECATED*/
//Moved to initialize
//var Path={version:"0.8.4",map:function(a){if(Path.routes.defined.hasOwnProperty(a)){return Path.routes.defined[a]}else{return new Path.core.route(a)}},root:function(a){Path.routes.root=a},rescue:function(a){Path.routes.rescue=a},history:{initial:{},pushState:function(a,b,c){if(Path.history.supported){if(Path.dispatch(c)){history.pushState(a,b,c)}}else{if(Path.history.fallback){window.location.hash="#"+c}}},popState:function(a){var b=!Path.history.initial.popped&&location.href==Path.history.initial.URL;Path.history.initial.popped=true;if(b)return;Path.dispatch(document.location.pathname)},listen:function(a){Path.history.supported=!!(window.history&&window.history.pushState);Path.history.fallback=a;if(Path.history.supported){Path.history.initial.popped="state"in window.history,Path.history.initial.URL=location.href;window.onpopstate=Path.history.popState}else{if(Path.history.fallback){for(route in Path.routes.defined){if(route.charAt(0)!="#"){Path.routes.defined["#"+route]=Path.routes.defined[route];Path.routes.defined["#"+route].path="#"+route}}Path.listen()}}}},match:function(a,b){var c={},d=null,e,f,g,h,i;for(d in Path.routes.defined){if(d!==null&&d!==undefined){d=Path.routes.defined[d];e=d.partition();for(h=0;h<e.length;h++){f=e[h];i=a;if(f.search(/:/)>0){for(g=0;g<f.split("/").length;g++){if(g<i.split("/").length&&f.split("/")[g].charAt(0)===":"){c[f.split("/")[g].replace(/:/,"")]=i.split("/")[g];i=i.replace(i.split("/")[g],f.split("/")[g])}}}if(f===i){if(b){d.params=c}return d}}}}return null},dispatch:function(a){var b,c;if(Path.routes.current!==a){Path.routes.previous=Path.routes.current;Path.routes.current=a;c=Path.match(a,true);if(Path.routes.previous){b=Path.match(Path.routes.previous);if(b!==null&&b.do_exit!==null){b.do_exit()}}if(c!==null){c.run();return true}else{if(Path.routes.rescue!==null){Path.routes.rescue()}}}},listen:function(){var a=function(){Path.dispatch(location.hash)};if(location.hash===""){if(Path.routes.root!==null){location.hash=Path.routes.root}}if("onhashchange"in window&&(!document.documentMode||document.documentMode>=8)){window.onhashchange=a}else{setInterval(a,50)}if(location.hash!==""){Path.dispatch(location.hash)}},core:{route:function(a){this.path=a;this.action=null;this.do_enter=[];this.do_exit=null;this.params={};Path.routes.defined[a]=this}},routes:{current:null,root:null,rescue:null,previous:null,defined:{}}};Path.core.route.prototype={to:function(a){this.action=a;return this},enter:function(a){if(a instanceof Array){this.do_enter=this.do_enter.concat(a)}else{this.do_enter.push(a)}return this},exit:function(a){this.do_exit=a;return this},partition:function(){var a=[],b=[],c=/\(([^}]+?)\)/g,d,e;while(d=c.exec(this.path)){a.push(d[1])}b.push(this.path.split("(")[0]);for(e=0;e<a.length;e++){b.push(b[b.length-1]+a[e])}return b},run:function(){var a=false,b,c,d;if(Path.routes.defined[this.path].hasOwnProperty("do_enter")){if(Path.routes.defined[this.path].do_enter.length>0){for(b=0;b<Path.routes.defined[this.path].do_enter.length;b++){c=Path.routes.defined[this.path].do_enter[b]();if(c===false){a=true;break}}}}if(!a){Path.routes.defined[this.path].action()}}};
//TODO: not sure what this code does
//(function(){"use strict";var router=function(){var _routes={},_namedParam=/:\w+/g,_splatParam=/\*\w+/g,_prepareRoute,_stripTrailingSlash,module;_stripTrailingSlash=function(str){if(str.substr(-1)=="/"){return str.substr(0,str.length-1)}return str};_prepareRoute=function(route){if(!route){return null}return _stripTrailingSlash(route).replace(_namedParam,"([^/]+)").replace(_splatParam,"(.*?)")};module=function(base,routes){base||(base="/");this.base=_prepareRoute(base);if(typeof routes==="object"){_routes=routes;this.dispatch()}};module.prototype={on:function(route,callback){if(!route){throw new Error("A route needs to be defined")}callback||(callback=function(){});route=this.base+_prepareRoute(route);_routes["^"+route+"$"]=callback;return route},dispatch:function(event){var regex,regexText,callback,path;for(regexText in _routes){if(_routes.hasOwnProperty(regexText)){callback=_routes[regexText];regex=new RegExp(regexText);path=_prepareRoute(window.location.pathname);if(regex.test(path)){callback.call(false,regexText,path,event)}}}}};return module}();if(typeof module!=="undefined"&&module.exports){module.exports=router}else if(typeof this!=="undefined"){this.router=router}}).call(this);//location init

//DEPRECATED
function syncJSON(filePath) {/*! http://stackoverflow.com/a/4117299*/
    // Load json file;
    var json = loadTextFileAjaxSync(filePath, "application/json");
    // Parse json
    return (json)?JSON.parse(json):0;
}   

//DEPRECATED
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